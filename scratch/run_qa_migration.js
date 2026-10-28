import { sql } from "../src/lib/db.ts";

async function run() {
  console.log("Applying Phase 5 index optimizations...");
  
  await sql`
    CREATE INDEX IF NOT EXISTS idx_products_brand_trgm 
    ON products USING GIN(brand gin_trgm_ops);
  `;
  
  await sql`
    CREATE INDEX IF NOT EXISTS idx_products_sku_trgm 
    ON products USING GIN(sku gin_trgm_ops);
  `;

  console.log("Phase 5 indexes successfully applied.");
  await sql.end();
}

run().catch((err) => {
  console.error("Migration error:", err);
  process.exit(1);
});
