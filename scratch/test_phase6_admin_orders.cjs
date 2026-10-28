const postgres = require('postgres');

const sql = postgres({
  host: 'localhost',
  port: 5432,
  database: 'page_db',
  username: 'postgres',
  password: 'postgres',
});

async function runPhase6Tests() {
  console.log("\n=======================================================");
  console.log("   PAGE INTERNATIONAL — PHASE 6 ADMIN ORDERS TEST SUITE ");
  console.log("=======================================================\n");

  let passed = 0;
  let failed = 0;

  function assert(cond, msg) {
    if (cond) {
      console.log(`  ✔ ${msg}`);
      passed++;
    } else {
      console.error(`  ✖ FAIL: ${msg}`);
      failed++;
    }
  }

  try {
    // 1. Create a demo test order in PostgreSQL
    console.log("1. Admin Orders Query & Relational Aggregation");
    const testOrderId = `PG-TEST-${Date.now()}`;
    const [cust] = await sql`SELECT id FROM customers WHERE email = 'tanvir@autofixbd.com' LIMIT 1`;
    const custId = cust ? cust.id : null;

    await sql.begin(async (tx) => {
      await tx`
        INSERT INTO orders (
          id, customer_id, account_type, full_name, phone, email,
          company_name, bin_vat_number, street_address, city, delivery_notes,
          payment_method, subtotal, delivery_charge, vat_amount, total, status
        ) VALUES (
          ${testOrderId}, ${custId}, 'business', 'Engr. Tanvir Ahmed', '+880-1711-234567',
          'tanvir@autofixbd.com', 'AutoFix Workshop Ltd', 'BIN-9928374-2026',
          'Plot 42, Tejgaon I/A', 'Dhaka', 'Ring security before offloading lift',
          'b2b', 570000.00, 0.00, 0.00, 570000.00, 'pending'
        )
      `;

      await tx`
        INSERT INTO order_items (
          order_id, product_id, product_name, product_sku, unit_price, qty
        ) VALUES (
          ${testOrderId},
          (SELECT id FROM products WHERE slug = 'torq-2-post-hydraulic-lift-4t' LIMIT 1),
          'Torq 2-Post Hydraulic Lift 4.0T Heavy Duty',
          'PAGE-EQ-001',
          285000.00,
          2
        )
      `;
    });

    // 2. Query orders via relational query matching getAdminOrdersFn
    const [fetchedOrder] = await sql`
      SELECT
        o.id,
        o.customer_id,
        o.account_type,
        o.full_name,
        o.phone,
        o.email,
        o.company_name,
        o.bin_vat_number,
        o.street_address,
        o.city,
        o.delivery_notes,
        o.payment_method,
        o.subtotal::numeric,
        o.delivery_charge::numeric,
        o.vat_amount::numeric,
        o.total::numeric,
        o.status,
        o.created_at,
        c.company_name AS customer_company,
        COALESCE(
          json_agg(
            json_build_object(
              'id', oi.id,
              'productId', oi.product_id,
              'productName', oi.product_name,
              'productSku', oi.product_sku,
              'unitPrice', oi.unit_price::numeric,
              'qty', oi.qty,
              'lineTotal', oi.line_total::numeric
            )
          ) FILTER (WHERE oi.id IS NOT NULL),
          '[]'::json
        ) AS items
      FROM orders o
      LEFT JOIN customers c ON o.customer_id = c.id
      LEFT JOIN order_items oi ON o.id = oi.order_id
      WHERE o.id = ${testOrderId}
      GROUP BY o.id, c.company_name
    `;

    assert(!!fetchedOrder, "Admin orders query found created order");
    assert(fetchedOrder.id === testOrderId, "Order ID matches test reference");
    assert(fetchedOrder.company_name === "AutoFix Workshop Ltd", "Company name correctly mapped");
    assert(fetchedOrder.items.length === 1, "Order items nested array contains 1 product line");
    assert(fetchedOrder.items[0].qty === 2, "Line item quantity is 2 units");
    assert(Number(fetchedOrder.items[0].lineTotal) === 570000, "Line item total computed accurately (285000 * 2)");

    // 3. Test Order Status Lifecycle Workflow
    console.log("\n2. Admin Order Status Workflow Transitions");
    // pending -> confirmed
    await sql`UPDATE orders SET status = 'confirmed', updated_at = NOW() WHERE id = ${testOrderId}`;
    const [s1] = await sql`SELECT status FROM orders WHERE id = ${testOrderId}`;
    assert(s1.status === "confirmed", "Transitioned to 'confirmed'");

    // confirmed -> dispatched
    await sql`UPDATE orders SET status = 'dispatched', updated_at = NOW() WHERE id = ${testOrderId}`;
    const [s2] = await sql`SELECT status FROM orders WHERE id = ${testOrderId}`;
    assert(s2.status === "dispatched", "Transitioned to 'dispatched' (In Transit)");

    // dispatched -> delivered
    await sql`UPDATE orders SET status = 'delivered', updated_at = NOW() WHERE id = ${testOrderId}`;
    const [s3] = await sql`SELECT status FROM orders WHERE id = ${testOrderId}`;
    assert(s3.status === "delivered", "Transitioned to 'delivered' (Settled)");

    // 4. Test HTTP response on /admin/orders route
    console.log("\n3. HTTP Server Route Accessibility");
    try {
      const res = await fetch("http://localhost:8080/admin/orders");
      assert(res.status === 200, `GET /admin/orders returned HTTP 200 OK (${res.status})`);
    } catch (e) {
      assert(false, `HTTP request failed: ${e.message}`);
    }

    // 5. Teardown
    console.log("\n4. Cleanup Test Order");
    await sql`DELETE FROM orders WHERE id = ${testOrderId}`;
    const [checkDeleted] = await sql`SELECT id FROM orders WHERE id = ${testOrderId}`;
    assert(!checkDeleted, "Cleaned up test order and cascading items");

  } catch (err) {
    console.error("Test error:", err);
    failed++;
  } finally {
    await sql.end();
  }

  console.log("\n=======================================================");
  console.log(`   PHASE 6 QA RESULT: ${passed} PASSED, ${failed} FAILED (Total: ${passed + failed})`);
  console.log("=======================================================\n");

  if (failed > 0) process.exit(1);
}

runPhase6Tests();
