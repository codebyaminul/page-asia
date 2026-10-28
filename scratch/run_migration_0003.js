import fs from "fs";
import path from "path";
import { sql } from "../src/lib/db.ts";

async function run() {
  console.log("Applying Migration 0003: Customer Identity & Foreign Keys...");
  const migrationPath = path.resolve("./db/migrations/0003_customer_identity.sql");
  const sqlContent = fs.readFileSync(migrationPath, "utf-8");

  await sql.unsafe(sqlContent);
  console.log("Migration 0003 applied successfully.");

  // Verify tables and counts
  const customers = await sql`SELECT id, email, full_name, company_name FROM customers`;
  console.log("Seeded Customers:", customers);

  const quotesWithCustomers = await sql`
    SELECT id, email, company_name, customer_id 
    FROM quote_requests 
    WHERE customer_id IS NOT NULL
  `;
  console.log("Quotes linked to customers:", quotesWithCustomers);

  await sql.end();
}

run().catch((err) => {
  console.error("Migration 0003 failed:", err);
  process.exit(1);
});
