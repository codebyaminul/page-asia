import { createDbOrder, getDbProducts } from "../src/lib/db-queries.ts";
import { sql } from "../src/lib/db.ts";

async function main() {
  const prods = await getDbProducts();
  const lift = prods.find((p) => p.slug === "heavy-duty-2-post-lift-4t");
  console.log("Stock before order:", lift.warehouseQty);

  const res = await createDbOrder({
    id: "PG-TEST01",
    accountType: "business",
    fullName: "Automotive Hub Test",
    phone: "+8801700000000",
    email: "test@hub.bd",
    companyName: "Apex Hub Ltd",
    streetAddress: "Tejgaon Industrial Area",
    city: "Dhaka",
    paymentMethod: "cod",
    subtotal: lift.price * 2,
    total: lift.price * 2,
    lines: [{ product: lift, qty: 2 }],
  });

  console.log("Order created:", res);

  const orderInDb = await sql`SELECT * FROM orders WHERE id = 'PG-TEST01'`;
  const itemsInDb = await sql`SELECT * FROM order_items WHERE order_id = 'PG-TEST01'`;
  const prodsAfter = await getDbProducts();
  const liftAfter = prodsAfter.find((p) => p.slug === "heavy-duty-2-post-lift-4t");

  console.log("Order in DB:", orderInDb[0].id, "| Total:", orderInDb[0].total);
  console.log("Order items in DB:", itemsInDb.length, "| Line total:", itemsInDb[0].line_total);
  console.log("Stock after order:", liftAfter.warehouseQty);

  // Clean up test order
  await sql`DELETE FROM orders WHERE id = 'PG-TEST01'`;
  await sql`UPDATE products SET warehouse_qty = ${lift.warehouseQty} WHERE slug = 'heavy-duty-2-post-lift-4t'`;
  console.log("Cleaned up test record and restored stock successfully.");
  await sql.end();
}

main().catch((err) => {
  console.error("Test error:", err);
  process.exit(1);
});
