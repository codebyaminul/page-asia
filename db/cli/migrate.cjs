#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
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
const migrationsDir = path.join(__dirname, '../migrations');

async function migrate() {
  console.log("\n=======================================================");
  console.log("   PAGE INTERNATIONAL — POSTGRESQL MIGRATION RUNNER    ");
  console.log("=======================================================\n");

  const isDryRun = process.argv.includes('--dry-run');
  if (isDryRun) {
    console.log("🔍 Running in DRY-RUN mode. No changes will be applied.\n");
  }

  try {
    // 1. Ensure tracking table exists
    await sql`
      CREATE TABLE IF NOT EXISTS schema_migrations (
        version           TEXT PRIMARY KEY,
        applied_at        TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        execution_time_ms INT NOT NULL DEFAULT 0
      )
    `;

    // 2. Fetch already applied migrations
    const appliedRows = await sql`SELECT version, applied_at, execution_time_ms FROM schema_migrations ORDER BY version ASC`;
    const appliedSet = new Set(appliedRows.map((r) => r.version));

    // Detect if this is an existing database with legacy pre-applied tables
    const [existingProducts] = await sql`
      SELECT 1 FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'products'
    `;
    const isPreExistingDb = Boolean(existingProducts);

    // 3. Scan migrations directory
    const files = fs
      .readdirSync(migrationsDir)
      .filter((f) => f.endsWith('.sql'))
      .sort();

    console.log(`Found ${files.length} migration file(s) in db/migrations/\n`);

    let appliedCount = 0;

    for (const file of files) {
      if (appliedSet.has(file)) {
        console.log(`  ✔ Already applied: ${file}`);
        continue;
      }

      // If database already has tables from prior phases, record baseline
      if (isPreExistingDb && appliedRows.length === 0 && (file === '0001_initial_schema.sql' || file === '0002_seed_data.sql' || file === '0003_customer_identity.sql' || file === '0004_row_level_security.sql' || file === '0005_app_user_role.sql')) {
        console.log(`  ℹ Baseline sync: Recording pre-applied migration ${file}...`);
        if (!isDryRun) {
          await sql`
            INSERT INTO schema_migrations (version, applied_at, execution_time_ms)
            VALUES (${file}, NOW(), 0)
            ON CONFLICT (version) DO NOTHING
          `;
        }
        appliedCount++;
        continue;
      }

      console.log(`  🚀 Applying: ${file}...`);
      if (isDryRun) {
        console.log(`     [DRY RUN] Would execute ${file}`);
        appliedCount++;
        continue;
      }

      const filePath = path.join(migrationsDir, file);
      const content = fs.readFileSync(filePath, 'utf8');

      const startTime = Date.now();
      try {
        await sql.unsafe(content);
        const duration = Date.now() - startTime;

        await sql`
          INSERT INTO schema_migrations (version, applied_at, execution_time_ms)
          VALUES (${file}, NOW(), ${duration})
        `;

        console.log(`  ✔ Successfully applied ${file} (${duration}ms)`);
        appliedCount++;
      } catch (err) {
        console.error(`\n❌ Migration failed on ${file}:`, err.message);
        process.exit(1);
      }
    }

    console.log("\n=======================================================");
    if (appliedCount === 0) {
      console.log("   DATABASE IS UP TO DATE (No pending migrations)");
    } else {
      console.log(`   SUCCESSFULLY PROCESSED ${appliedCount} MIGRATION(S)`);
    }
    console.log("=======================================================\n");

  } catch (err) {
    console.error("Migration runner fatal error:", err);
    process.exit(1);
  } finally {
    await sql.end();
  }
}

migrate();
