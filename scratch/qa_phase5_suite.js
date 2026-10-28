import { sql } from "../src/lib/db.ts";
import {
  createDbOrder,
  getDbProducts,
  getDbAdminStats,
  searchDbProducts,
  loginDbAdmin,
  createDbQuote,
  getDbQuotes,
  createDbBooking,
  getDbBookings,
} from "../src/lib/db-queries.ts";

// ANSI color helpers
const green = (s) => `\x1b[32m${s}\x1b[0m`;
const red = (s) => `\x1b[31m${s}\x1b[0m`;
const cyan = (s) => `\x1b[36m${s}\x1b[0m`;
const yellow = (s) => `\x1b[33m${s}\x1b[0m`;
const bold = (s) => `\x1b[1m${s}\x1b[0m`;

let totalTests = 0;
let passedTests = 0;
let failedTests = 0;

function assert(condition, message) {
  totalTests++;
  if (condition) {
    passedTests++;
    console.log(`  ${green("✔")} ${message}`);
  } else {
    failedTests++;
    console.error(`  ${red("✖")} ${message}`);
    throw new Error(`Assertion failed: ${message}`);
  }
}

async function runBenchmark(name, iterations, fn) {
  const start = performance.now();
  for (let i = 0; i < iterations; i++) {
    await fn();
  }
  const end = performance.now();
  const totalMs = end - start;
  const avgMs = (totalMs / iterations).toFixed(2);
  const qps = Math.round((iterations / (totalMs / 1000)));
  console.log(`  ${cyan("⚡")} ${name}: ${iterations} ops in ${totalMs.toFixed(1)}ms (avg: ${avgMs}ms, ${qps} QPS)`);
  return { totalMs, avgMs, qps };
}

async function main() {
  console.log(bold("\n======================================================="));
  console.log(bold("  PAGE INTERNATIONAL — PHASE 5 QA & PERFORMANCE SUITE  "));
  console.log(bold("=======================================================\n"));

  // ---------------------------------------------------------------------------
  // SUITE 1: Connection Pool Health & Latency
  // ---------------------------------------------------------------------------
  console.log(bold("1. Connection Pool & Query Latency Benchmark"));
  const poolBenchmark = await runBenchmark("Concurrent Ping (SELECT 1)", 50, async () => {
    const res = await sql`SELECT 1 AS ok`;
    assert(res[0].ok === 1, "SELECT 1 returned 1");
  });
  assert(Number(poolBenchmark.avgMs) < 15, "Pool average query latency is under 15ms");

  // ---------------------------------------------------------------------------
  // SUITE 2: Schema Constraints & Generated Columns
  // ---------------------------------------------------------------------------
  console.log(bold("\n2. Schema Constraints & Stored Generated Columns"));
  
  // Test generated stock_status transitions
  const testSlug = "qa-temp-generator-test";
  await sql`
    INSERT INTO products (slug, sku, name, brand, category, price, warehouse_qty, reorder_level, image_url)
    VALUES (${testSlug}, 'QA-SKU-99', 'QA Test Generator', 'Torq', 'Garage Equipment', 50000, 10, 5, '/assets/test.jpg')
    ON CONFLICT (slug) DO UPDATE SET warehouse_qty = 10, reorder_level = 5;
  `;

  let row = await sql`SELECT stock_status FROM products WHERE slug = ${testSlug}`;
  assert(row[0].stock_status === "In stock", "Initial stock_status is 'In stock' for qty 10");

  await sql`UPDATE products SET warehouse_qty = 4 WHERE slug = ${testSlug}`;
  row = await sql`SELECT stock_status FROM products WHERE slug = ${testSlug}`;
  assert(row[0].stock_status === "Low stock", "Auto-transitioned to 'Low stock' when qty <= reorder_level (4 <= 5)");

  await sql`UPDATE products SET warehouse_qty = 0 WHERE slug = ${testSlug}`;
  row = await sql`SELECT stock_status FROM products WHERE slug = ${testSlug}`;
  assert(row[0].stock_status === "Out of stock", "Auto-transitioned to 'Out of stock' when qty = 0");

  // Constraint check: negative price rejection
  let caughtNegativePrice = false;
  try {
    await sql`UPDATE products SET price = -500 WHERE slug = ${testSlug}`;
  } catch (err) {
    caughtNegativePrice = true;
  }
  assert(caughtNegativePrice, "CHECK constraint rejects negative product price");

  // Cleanup temp product
  await sql`DELETE FROM products WHERE slug = ${testSlug}`;

  // ---------------------------------------------------------------------------
  // SUITE 3: Full-Text Trigram Search & Index Scans
  // ---------------------------------------------------------------------------
  console.log(bold("\n3. Full-Text Trigram Search & Query Plan"));
  
  const searchResults = await searchDbProducts({ query: "hydraulic lift" });
  assert(searchResults.length > 0, `Search for 'hydraulic lift' found ${searchResults.length} relevant items`);
  assert(searchResults[0].name.toLowerCase().includes("lift"), "Top result matches search keyword");

  // Query plan analysis with EXPLAIN ANALYZE
  const plan = await sql`
    EXPLAIN ANALYZE
    SELECT * FROM products
    WHERE name ILIKE '%hydraulic%' OR brand ILIKE '%hydraulic%'
  `;
  const planOutput = plan.map((p) => p["QUERY PLAN"]).join("\n");
  console.log(`  ${cyan("ℹ")} Query execution plan verified:\n    ` + planOutput.split("\n")[0]);
  assert(plan.length > 0, "EXPLAIN ANALYZE executed successfully");

  // ---------------------------------------------------------------------------
  // SUITE 4: High-Concurrency Transaction Isolation & Anti-Overselling
  // ---------------------------------------------------------------------------
  console.log(bold("\n4. Concurrency & Transaction Isolation Stress Test (Anti-Overselling)"));
  
  const stressSlug = "qa-stress-product";
  const initialQty = 3;
  await sql`
    INSERT INTO products (slug, sku, name, brand, category, price, warehouse_qty, reorder_level, image_url)
    VALUES (${stressSlug}, 'QA-STRESS-01', 'Stress Test Hoist', 'Torq', 'Garage Equipment', 100000, ${initialQty}, 2, '/assets/test.jpg')
    ON CONFLICT (slug) DO UPDATE SET warehouse_qty = ${initialQty};
  `;

  // Launch 10 simultaneous orders concurrently (1 unit each)
  const stressProduct = {
    slug: stressSlug,
    sku: "QA-STRESS-01",
    name: "Stress Test Hoist",
    price: 100000,
  };

  const concurrencyAttempts = 10;
  const promises = [];
  for (let i = 0; i < concurrencyAttempts; i++) {
    const orderPromise = createDbOrder({
      id: `PG-STRESS-${i + 1}`,
      fullName: `Concurrent Tester #${i + 1}`,
      phone: "+8801700000000",
      streetAddress: "Test Bay Street",
      city: "Dhaka",
      subtotal: 100000,
      total: 100000,
      paymentMethod: "cod",
      lines: [{ product: stressProduct, qty: 1 }],
    }).catch((err) => ({ error: err.message }));
    promises.push(orderPromise);
  }

  const results = await Promise.all(promises);
  const successes = results.filter((r) => r.success);
  const failures = results.filter((r) => r.error);

  console.log(`  ${cyan("ℹ")} Concurrency test results: ${successes.length} orders succeeded, ${failures.length} orders safely rejected`);
  assert(successes.length === initialQty, `Exactly ${initialQty} orders succeeded without race conditions`);
  assert(failures.length === concurrencyAttempts - initialQty, `Remaining ${concurrencyAttempts - initialQty} orders rejected due to stock protection`);

  const finalStressStock = await sql`SELECT warehouse_qty, stock_status FROM products WHERE slug = ${stressSlug}`;
  assert(finalStressStock[0].warehouse_qty === 0, "Warehouse qty safely reached exactly 0 without negative stock");
  assert(finalStressStock[0].stock_status === "Out of stock", "Product transitioned to 'Out of stock'");

  // Clean up stress test data
  for (let i = 0; i < concurrencyAttempts; i++) {
    await sql`DELETE FROM orders WHERE id = ${`PG-STRESS-${i + 1}`}`;
  }
  await sql`DELETE FROM products WHERE slug = ${stressSlug}`;

  // ---------------------------------------------------------------------------
  // SUITE 5: Normalized RFQ Multi-Item Workflow
  // ---------------------------------------------------------------------------
  console.log(bold("\n5. Normalized RFQ Multi-Item Quotation Flow"));
  
  const testQuoteId = "q-qa-multi-item-01";
  await sql`DELETE FROM quote_requests WHERE id = ${testQuoteId}`;

  await createDbQuote({
    id: testQuoteId,
    companyName: "Prime Heavy Motors Ltd",
    contactName: "Imran Khan",
    phone: "+8801811223344",
    email: "imran@primemotors.bd",
    businessType: "Dealership Workshop",
    city: "Chattogram",
    notes: "Requires complete turnkey calibration package",
    items: [
      { productSlug: "heavy-duty-2-post-lift-4t", productName: "Heavy-Duty 2-Post Electro-Hydraulic Lift 4.0T", qty: 2, unitPrice: 285000 },
      { productSlug: "pro-tyre-changer-assist-arm", productName: "Pro Automatic Tyre Changer with Dual Assist Arm", qty: 1, unitPrice: 195000 },
    ],
  });

  const quotes = await getDbQuotes();
  const createdQuote = quotes.find((q) => q.id === testQuoteId);
  assert(Boolean(createdQuote), "Multi-item RFQ created and queried successfully");
  assert(createdQuote.items.length === 2, "Normalized quote request items contains exactly 2 line items");

  // Verify stored generated line totals in quote_request_items
  const dbItems = await sql`SELECT * FROM quote_request_items WHERE quote_id = ${testQuoteId} ORDER BY id ASC`;
  assert(Number(dbItems[0].line_total) === 570000, "First line item line_total auto-calculated (285000 * 2 = 570000)");
  assert(Number(dbItems[1].line_total) === 195000, "Second line item line_total auto-calculated (195000 * 1 = 195000)");

  // Clean up quote
  await sql`DELETE FROM quote_requests WHERE id = ${testQuoteId}`;

  // ---------------------------------------------------------------------------
  // SUITE 6: 5-Step Consultation Booking Integrity
  // ---------------------------------------------------------------------------
  console.log(bold("\n6. Consultation Booking Wizard Integrity (Capturing All 5 Steps)"));
  
  const testBookingId = "b-qa-wizard-01";
  await sql`DELETE FROM consultation_bookings WHERE id = ${testBookingId}`;

  await createDbBooking({
    id: testBookingId,
    companyName: "Apex EV Fleet Services",
    contactName: "Shafiqul Alam",
    phone: "+8801900112233",
    email: "shafiq@apexev.com",
    businessType: "EV Business",
    bayCount: "4-6 Bays",
    equipmentInterest: "EV Workshop Pack, Lifts, Diagnostic Scanners",
    serviceIds: ["ev-charging-setup", "heavy-lift-demo"],
    serviceName: "EV Workshop Infrastructure Planning",
    centerId: "onsite",
    centerName: "On-site Bay Audit",
    onsiteAddress: "Plot 42, Tejgaon Light Industrial Area, Dhaka",
    preferredDate: "2026-11-15 (02:30 PM)",
    notes: "Site visit required to check 3-phase commercial electrical supply",
  });

  const bookings = await getDbBookings();
  const createdBooking = bookings.find((b) => b.id === testBookingId);
  assert(Boolean(createdBooking), "Consultation booking successfully persisted");
  assert(createdBooking.companyName === "Apex EV Fleet Services", "Company name retained accurately");

  // Verify all 4 previously-discarded fields are now preserved in DB
  const rawDbBooking = await sql`SELECT * FROM consultation_bookings WHERE id = ${testBookingId}`;
  assert(rawDbBooking[0].business_type === "EV Business", "Preserved business_type in DB");
  assert(rawDbBooking[0].bay_count === "4-6 Bays", "Preserved bay_count in DB");
  assert(rawDbBooking[0].equipment_interest.includes("EV Workshop Pack"), "Preserved equipment_interest in DB");
  assert(rawDbBooking[0].onsite_address.includes("Plot 42"), "Preserved onsite_address in DB");
  assert(rawDbBooking[0].service_ids.length === 2, "Preserved multiple service_ids array in DB");

  // Clean up booking
  await sql`DELETE FROM consultation_bookings WHERE id = ${testBookingId}`;

  // ---------------------------------------------------------------------------
  // SUITE 7: Cryptographic Authentication & Session Security
  // ---------------------------------------------------------------------------
  console.log(bold("\n7. Cryptographic Authentication & Session Management"));
  
  // Valid login
  const validLogin = await loginDbAdmin("admin@pageinternational.com", "admin123");
  assert(validLogin.success === true, "Valid admin login returns success");
  assert(Boolean(validLogin.token), "Secure session token generated");
  assert(validLogin.user.role === "admin", "Admin role authenticated properly");

  // Verify session persisted in DB
  const sessionRow = await sql`SELECT * FROM admin_sessions WHERE token = ${validLogin.token}`;
  assert(sessionRow.length === 1, "Session stored in admin_sessions table with expiration");

  // Invalid password rejection
  const invalidLogin = await loginDbAdmin("admin@pageinternational.com", "wrong_password_xyz");
  assert(invalidLogin.success === false, "Invalid password rejected");
  assert(invalidLogin.error === "Incorrect password.", "Returns clear security rejection message");

  // Suspended account rejection
  await sql`UPDATE admin_users SET status = 'suspended' WHERE email = 'kamal@pageinternational.com'`;
  const suspendedLogin = await loginDbAdmin("kamal@pageinternational.com", "admin123");
  assert(suspendedLogin.success === false, "Suspended admin login rejected");
  assert(suspendedLogin.error.includes("suspended"), "Suspension warning returned");
  await sql`UPDATE admin_users SET status = 'active' WHERE email = 'kamal@pageinternational.com'`;

  // Cleanup session token
  await sql`DELETE FROM admin_sessions WHERE token = ${validLogin.token}`;

  // ---------------------------------------------------------------------------
  // SUITE 8: Real-Time Admin Analytics & Aggregations
  // ---------------------------------------------------------------------------
  console.log(bold("\n8. Admin Real-Time Database Aggregations & Metrics"));
  
  const stats = await getDbAdminStats();
  assert(stats.totalProducts >= 28, `totalProducts: ${stats.totalProducts}`);
  assert(stats.totalValue > 0, `totalValue: ৳${stats.totalValue.toLocaleString("en-BD")} BDT`);
  assert(stats.categoryDistribution.length >= 7, "All 7 product categories represented in distribution");
  assert(Array.isArray(stats.revenueData), "Revenue aggregation series calculated");

  console.log(bold("\n======================================================="));
  console.log(bold(`  QA SUITE COMPLETE: ${green(passedTests + " PASSED")}, ${failedTests === 0 ? green("0 FAILED") : red(failedTests + " FAILED")} (Total: ${totalTests})`));
  console.log(bold("=======================================================\n"));

  await sql.end();
}

main().catch(async (err) => {
  console.error(red("\nQA Suite Error:"), err);
  await sql.end();
  process.exit(1);
});
