import fs from "fs";
import path from "path";
import { sql } from "../src/lib/db.ts";

async function run() {
  console.log("Applying Migration 0005: Create Application Role 'page_app_user'...");
  const migrationPath = path.resolve("./db/migrations/0005_app_user_role.sql");
  const sqlContent = fs.readFileSync(migrationPath, "utf-8");

  await sql.unsafe(sqlContent);
  console.log("Migration 0005 applied successfully.");

  const roles = await sql`
    SELECT rolname, rolsuper, rolbypassrls
    FROM pg_roles
    WHERE rolname IN ('postgres', 'page_app_user');
  `;
  console.log("Verified Roles:");
  console.table(roles);

  await sql.end();
}

run().catch((err) => {
  console.error("Migration 0005 failed:", err);
  process.exit(1);
});
