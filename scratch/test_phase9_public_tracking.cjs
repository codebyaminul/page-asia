const postgres = require('postgres');
require('dotenv').config();

const sql = postgres({
  host: 'localhost',
  port: 5432,
  database: 'page_db',
  username: 'postgres',
  password: 'postgres',
});

async function runTrackingTests() {
  console.log("\n=======================================================");
  console.log("   PAGE INTERNATIONAL — PUBLIC TRACKING QA SUITE       ");
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
    // 1. Query quote #q-001 with matching phone
    console.log("1. Public Quotation Tracking & Phone Suffix Match");
    const rawRef = "q-001";
    const phoneInput = "+880-1711-123456";
    const phoneDigits = phoneInput.replace(/\D/g, "").slice(-7);

    const [foundQuote] = await sql`
      SELECT
        q.id, q.company_name, q.phone, q.status, q.admin_reply AS reply,
        COALESCE(
          json_agg(
            json_build_object('productName', qi.product_name, 'qty', qi.qty)
          ) FILTER (WHERE qi.id IS NOT NULL),
          '[]'::json
        ) AS items
      FROM quote_requests q
      LEFT JOIN quote_request_items qi ON q.id = qi.quote_id
      WHERE LOWER(q.id) = LOWER(${rawRef})
        AND REGEXP_REPLACE(q.phone, '\\D', '', 'g') LIKE '%' || ${phoneDigits}
      GROUP BY q.id
    `;

    assert(Boolean(foundQuote), "Quote #q-001 found with valid phone suffix");
    assert(foundQuote && foundQuote.company_name.includes("AutoFix"), "Matched company name AutoFix");
    assert(foundQuote && Array.isArray(foundQuote.items), "Items array returned");

    // 2. Query with mismatched phone (Privacy Protection)
    console.log("\n2. Privacy Protection (Mismatched Phone Rejection)");
    const [wrongPhoneQuote] = await sql`
      SELECT id FROM quote_requests
      WHERE LOWER(id) = LOWER(${rawRef})
        AND REGEXP_REPLACE(phone, '\\D', '', 'g') LIKE '%' || '9999999'
    `;
    assert(!wrongPhoneQuote, "Mismatched phone rejected (record hidden)");

    // 3. Create a test order and verify order tracking
    console.log("\n3. Public Order Tracking & Stepper Verification");
    const testOrderId = `PG-TRK-${Date.now().toString().slice(-6)}`;
    const testPhone = "+880-1822-334455";
    const testPhoneDigits = testPhone.replace(/\D/g, "").slice(-7);

    await sql.begin(async (tx) => {
      await tx`
        INSERT INTO orders (
          id, account_type, full_name, phone, company_name,
          street_address, city, payment_method, subtotal, total, status
        ) VALUES (
          ${testOrderId}, 'business', 'Engr. Masud Alam', ${testPhone}, 'Apex Fleet Hub',
          '34 Agrabad C/A', 'Chattogram', 'cod', 145000.00, 145000.00, 'dispatched'
        )
      `;

      await tx`
        INSERT INTO order_items (
          order_id, product_name, product_sku, unit_price, qty
        ) VALUES (
          ${testOrderId}, 'Automatic Tyre Changer Machine', 'PAGE-TC-01', 145000.00, 1
        )
      `;
    });

    const [foundOrder] = await sql`
      SELECT
        o.id, o.company_name, o.status, o.total,
        COALESCE(
          json_agg(
            json_build_object('productName', oi.product_name, 'qty', oi.qty)
          ) FILTER (WHERE oi.id IS NOT NULL),
          '[]'::json
        ) AS items
      FROM orders o
      LEFT JOIN order_items oi ON o.id = oi.order_id
      WHERE LOWER(o.id) = LOWER(${testOrderId})
        AND REGEXP_REPLACE(o.phone, '\\D', '', 'g') LIKE '%' || ${testPhoneDigits}
      GROUP BY o.id
    `;

    assert(Boolean(foundOrder), "Order found via public reference and phone");
    assert(foundOrder.status === 'dispatched', "Status is 'dispatched' (In Transit milestone)");
    assert(foundOrder.items.length === 1, "Order items array mapped correctly");

    // 4. Test HTTP route accessibility
    console.log("\n4. HTTP Route Accessibility");
    try {
      const res = await fetch("http://localhost:8080/track");
      assert(res.status === 200, `GET /track returned HTTP 200 OK (${res.status})`);
    } catch (e) {
      assert(false, `HTTP request failed: ${e.message}`);
    }

    // 5. Cleanup
    console.log("\n5. Cleanup Test Order");
    await sql`DELETE FROM orders WHERE id = ${testOrderId}`;
    const [checkDeleted] = await sql`SELECT id FROM orders WHERE id = ${testOrderId}`;
    assert(!checkDeleted, "Cleaned up tracking test order");

  } catch (err) {
    console.error("Tracking QA error:", err);
    failed++;
  } finally {
    await sql.end();
  }

  console.log("\n=======================================================");
  console.log(`   TRACKING QA RESULT: ${passed} PASSED, ${failed} FAILED (Total: ${passed + failed})`);
  console.log("=======================================================\n");

  if (failed > 0) process.exit(1);
}

runTrackingTests();
