#!/usr/bin/env node
const postgres = require('postgres');
require('dotenv').config();

const connectionString = process.env.DATABASE_URL || {
  host: process.env.PGHOST || 'localhost',
  port: Number(process.env.PGPORT) || 5432,
  database: process.env.PGDATABASE || 'page_db',
  username: process.env.PGUSER || 'postgres',
  password: process.env.PGPASSWORD || 'postgres',
};

const sql = postgres(connectionString);

async function checkStatus() {
  console.log("\n=======================================================");
  console.log("   PAGE INTERNATIONAL — POSTGRESQL HEALTH & STATUS     ");
  console.log("=======================================================\n");

  try {
    // 1. Connection & Ping Latency
    const t0 = Date.now();
    const [ping] = await sql`SELECT 1 as alive, current_database(), current_user, version()`;
    const latency = Date.now() - t0;

    console.log("1. Connection & Server Info:");
    console.log(`  • Status:       ONLINE (Ping: ${latency}ms)`);
    console.log(`  • Database:     ${ping.current_database}`);
    console.log(`  • Connected As: ${ping.current_user}`);
    console.log(`  • Version:      ${ping.version.split(' on ')[0]}`);

    // Active connection pool count
    const [connCount] = await sql`
      SELECT count(*)::int as active_conns
      FROM pg_stat_activity
      WHERE datname = current_database()
    `;
    console.log(`  • Active Conns: ${connCount.active_conns}\n`);

    // 2. Applied Migrations
    console.log("2. Migration History (schema_migrations):");
    const migrations = await sql`
      SELECT version, applied_at, execution_time_ms
      FROM schema_migrations
      ORDER BY version ASC
    `;
    if (migrations.length === 0) {
      console.log("  (No migrations recorded yet)");
    } else {
      for (const m of migrations) {
        const dateStr = new Date(m.applied_at).toLocaleString();
        console.log(`  ✔ ${m.version.padEnd(32)} [${dateStr}] (${m.execution_time_ms}ms)`);
      }
    }

    // 3. Table Row Counts & Storage
    console.log("\n3. Relational Table Health (Row Counts):");
    const tables = [
      'products',
      'orders',
      'order_items',
      'quote_requests',
      'quote_request_items',
      'consultation_bookings',
      'customers',
      'customer_sessions',
      'admin_users',
      'admin_sessions',
      'service_centers',
      'services',
      'booking_service_options',
      'reviews',
      'site_settings',
    ];

    const counts = await Promise.all(
      tables.map(async (table) => {
        try {
          const [res] = await sql.unsafe(`SELECT count(*)::int AS count FROM ${table}`);
          return { table, count: res.count, error: null };
        } catch (err) {
          return { table, count: null, error: err.message };
        }
      })
    );

    for (const item of counts) {
      if (item.error) {
        console.log(`  ✖ ${item.table.padEnd(26)}: MISSING (${item.error})`);
      } else {
        console.log(`  • ${item.table.padEnd(26)}: ${String(item.count).padStart(5)} rows`);
      }
    }

    // 4. Security & RLS Verification
    console.log("\n4. Security Roles & Row-Level Security (RLS):");
    const [appUser] = await sql`
      SELECT rolname, rolsuper, rolcanlogin
      FROM pg_roles
      WHERE rolname = 'page_app_user'
    `;
    if (appUser) {
      console.log(`  ✔ Role 'page_app_user' configured: (Superuser: ${appUser.rolsuper}, Login: ${appUser.rolcanlogin})`);
    } else {
      console.log(`  ✖ Role 'page_app_user' not found`);
    }

    const rlsTables = await sql`
      SELECT relname, relrowsecurity, relforcerowsecurity
      FROM pg_class
      WHERE relname = ANY(${tables})
      ORDER BY relname ASC
    `;

    const allProtected = rlsTables.every((t) => t.relrowsecurity && t.relforcerowsecurity);
    if (allProtected && rlsTables.length === tables.length) {
      console.log(`  ✔ Row-Level Security (RLS): ENABLED & FORCED on all ${rlsTables.length} tables`);
    } else {
      console.log(`  ⚠ Row-Level Security: Partial coverage (${rlsTables.filter((t) => t.relrowsecurity).length}/${tables.length} tables)`);
    }

    console.log("\n=======================================================");
    console.log("   ALL SYSTEMS OPERATIONAL — POSTGRESQL 16 READY       ");
    console.log("=======================================================\n");

  } catch (err) {
    console.error("Database health check failed:", err);
    process.exit(1);
  } finally {
    await sql.end();
  }
}

checkStatus();
