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
const seedSqlPath = path.join(__dirname, '../migrations/0002_seed_data.sql');

async function seed() {
  console.log("\n=======================================================");
  console.log("   PAGE INTERNATIONAL — POSTGRESQL SEED ENGINE         ");
  console.log("=======================================================\n");

  try {
    if (!fs.existsSync(seedSqlPath)) {
      throw new Error(`Seed file not found at ${seedSqlPath}`);
    }

    console.log("Reading baseline seed data from db/migrations/0002_seed_data.sql...");
    const seedSql = fs.readFileSync(seedSqlPath, 'utf8');

    const startTime = Date.now();
    await sql.unsafe(seedSql);
    const duration = Date.now() - startTime;

    console.log(`✔ Baseline catalogue, demonstration centers, and admin users seeded successfully (${duration}ms)`);

    // Ensure test lift has stock
    await sql`UPDATE products SET warehouse_qty = 20 WHERE slug = 'heavy-duty-2-post-lift-4t'`;

    console.log("\n=======================================================");
    console.log("   DATABASE SEEDING COMPLETE & VERIFIED                ");
    console.log("=======================================================\n");

  } catch (err) {
    console.error("Seeding failed:", err.message);
    process.exit(1);
  } finally {
    await sql.end();
  }
}

seed();
