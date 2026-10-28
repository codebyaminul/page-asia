import fs from "fs";
import path from "path";
import { sql } from "../src/lib/db.ts";

async function run() {
  console.log("Applying Migration 0004: Row-Level Security (RLS) & Policies...");
  const migrationPath = path.resolve("./db/migrations/0004_row_level_security.sql");
  const sqlContent = fs.readFileSync(migrationPath, "utf-8");

  await sql.unsafe(sqlContent);
  console.log("Migration 0004 applied successfully.");

  // Verify RLS status on tables
  const rlsStatus = await sql`
    SELECT relname AS table_name, relrowsecurity AS rls_enabled, relforcerowsecurity AS rls_forced
    FROM pg_class
    WHERE relnamespace = (SELECT oid FROM pg_namespace WHERE nspname = 'public')
      AND relkind = 'r'
    ORDER BY relname;
  `;

  console.log("\nRLS Status Table:");
  console.table(rlsStatus);

  // Verify policies
  const policies = await sql`
    SELECT tablename, policyname, cmd
    FROM pg_policies
    ORDER BY tablename, policyname;
  `;
  console.log(`\nTotal Active Security Policies: ${policies.length}`);

  await sql.end();
}

run().catch((err) => {
  console.error("Migration 0004 failed:", err);
  process.exit(1);
});
