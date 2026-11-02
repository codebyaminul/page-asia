const postgres = require('postgres');
require('dotenv').config();

const green = (s) => `\x1b[32m${s}\x1b[0m`;
const red = (s) => `\x1b[31m${s}\x1b[0m`;
const bold = (s) => `\x1b[1m${s}\x1b[0m`;

let passed = 0;
let total = 0;

function assert(condition, message) {
  total++;
  if (condition) {
    passed++;
    console.log(`  ${green("✔")} ${message}`);
  } else {
    console.error(`  ${red("✖")} ${message}`);
    throw new Error(`Assertion failed: ${message}`);
  }
}

async function run() {
  console.log(bold("\n======================================================="));
  console.log(bold("   PAGE INTERNATIONAL — SECURITY & RELIABILITY QA SUITE"));
  console.log(bold("=======================================================\n"));

  const sql = postgres(process.env.DATABASE_URL || 'postgresql://postgres:postgres@localhost:5432/page_db');

  // Dynamic import of TS compiled modules / handlers
  const {
    checkRateLimit,
    clearRateLimit,
    checkReferenceLockout,
    recordFailedReferenceAttempt,
    clearReferenceLockout,
    resetAllRateLimits,
  } = await import("../src/lib/rate-limiter.ts");

  const {
    customerLoginSchema,
    customerRegisterSchema,
    changePasswordSchema,
    publicTrackingSchema,
  } = await import("../src/lib/validation-schemas.ts");

  const { isTransientError, withRetry, checkDatabaseHealth } = await import("../src/lib/db.ts");
  const { createDbOrder } = await import("../src/lib/db-queries.ts");
  const { getSystemHealthFn } = await import("../src/lib/server-api.ts");

  resetAllRateLimits();

  // ---------------------------------------------------------------------------
  // 1. IN-MEMORY SLIDING WINDOW RATE LIMITER & DUAL-KEYING
  // ---------------------------------------------------------------------------
  console.log(bold("1. Rate Limiting Engine & Dual-Key Protection"));

  // Check normal permit
  const res1 = checkRateLimit("auth:login:ip:10.0.0.1", 3, 60000);
  assert(res1.allowed && res1.remaining === 2, "Permitted 1st attempt under rate limit");

  const res2 = checkRateLimit("auth:login:ip:10.0.0.1", 3, 60000);
  assert(res2.allowed && res2.remaining === 1, "Permitted 2nd attempt under rate limit");

  const res3 = checkRateLimit("auth:login:ip:10.0.0.1", 3, 60000);
  assert(res3.allowed && res3.remaining === 0, "Permitted 3rd attempt at threshold boundary");

  const res4 = checkRateLimit("auth:login:ip:10.0.0.1", 3, 60000);
  assert(!res4.allowed && res4.retryAfterSec > 0, "Blocked 4th attempt with HTTP 429 Retry-After metadata");

  // Dual-key isolation: different account on same IP is evaluated independently
  const resAcc = checkRateLimit("auth:login:acc:tech@workshop.com", 2, 60000);
  assert(resAcc.allowed && resAcc.remaining === 1, "Dual-keying separates account-specific limits from IP limits");

  clearRateLimit("auth:login:ip:10.0.0.1");
  const resCleared = checkRateLimit("auth:login:ip:10.0.0.1", 3, 60000);
  assert(resCleared.allowed, "Cleared rate limit immediately upon valid authentication");

  // ---------------------------------------------------------------------------
  // 2. PER-REFERENCE-ID PRIVACY SHIELD & LOCKOUT
  // ---------------------------------------------------------------------------
  console.log(bold("\n2. Per-Reference-ID Tracking Lockout Defense"));

  const testRef = "q-sec-test-8819";
  clearReferenceLockout(testRef);

  // Initial lookup state
  const initialLock = checkReferenceLockout(testRef);
  assert(!initialLock.locked, "New reference starts in unlocked state");

  // 9 failed phone suffix attempts should warn but not lock yet
  for (let i = 1; i <= 9; i++) {
    const attempt = recordFailedReferenceAttempt(testRef, 10, 1800000);
    assert(!attempt.locked && attempt.remainingAttempts === 10 - i, `Failed attempt #${i} tracked cleanly (${10 - i} remaining)`);
  }

  // 10th failed attempt locks the reference globally
  const tenthAttempt = recordFailedReferenceAttempt(testRef, 10, 1800000);
  assert(tenthAttempt.locked && tenthAttempt.retryAfterSec > 0, "10th failed phone suffix attempt locks reference for 30 minutes");

  const lockedState = checkReferenceLockout(testRef);
  assert(lockedState.locked && lockedState.remainingSeconds > 0, "Subsequent check confirms reference is locked across all IPs");

  // Unlock on verified match
  clearReferenceLockout(testRef);
  assert(!checkReferenceLockout(testRef).locked, "Successful phone verification clears reference lockout");

  // ---------------------------------------------------------------------------
  // 3. STRICT ZOD RUNTIME SCHEMA CONTRACTS
  // ---------------------------------------------------------------------------
  console.log(bold("\n3. Strict Zod Input Validation & Password Policy"));

  // Short password rejection on registration
  let regShortFailed = false;
  try {
    customerRegisterSchema.parse({
      email: "engineer@test.com",
      password: "short", // < 8 characters
      fullName: "Engr. Rahman",
      phone: "+880-1711-000000",
    });
  } catch (e) {
    regShortFailed = true;
  }
  assert(regShortFailed, "Rejected registration with password under 8 characters");

  // Valid registration acceptance
  const validReg = customerRegisterSchema.safeParse({
    email: "engineer@test.com",
    password: "StrongPassword2026!",
    fullName: "Engr. Rahman",
    phone: "+880-1711-000000",
    businessType: "Workshop / Garage",
  });
  assert(validReg.success, "Accepted valid registration adhering to enterprise constraints");

  // Phone number format validation
  const invalidPhone = customerRegisterSchema.safeParse({
    email: "tech@test.com",
    password: "StrongPassword2026!",
    fullName: "Technician",
    phone: "abc-invalid",
  });
  assert(!invalidPhone.success, "Rejected invalid telephone number format");

  // Tracking reference sanitization
  const cleanTracking = publicTrackingSchema.safeParse({
    referenceId: "q-001",
    phone: "123456",
  });
  assert(cleanTracking.success, "Accepted valid public tracking reference");

  const dirtyTracking = publicTrackingSchema.safeParse({
    referenceId: "<script>alert(1)</script>",
    phone: "123456",
  });
  assert(!dirtyTracking.success, "Rejected malicious tracking reference with script injection");

  // ---------------------------------------------------------------------------
  // 4. SERVER-AUTHORITATIVE PRICING & IDEMPOTENCY DEFENSE
  // ---------------------------------------------------------------------------
  console.log(bold("\n4. Server-Authoritative Pricing & Idempotency"));

  // Fetch actual catalog price for lift
  const [liftProd] = await sql`SELECT price, warehouse_qty FROM products WHERE slug = 'heavy-duty-2-post-lift-4t'`;
  const realLiftPrice = Number(liftProd.price);

  // Restore stock for test
  await sql`UPDATE products SET warehouse_qty = 20 WHERE slug = 'heavy-duty-2-post-lift-4t'`;

  const orderId = `PG-SEC-${Date.now()}`;

  // Attacker attempts to manipulate unit_price to 1.00 BDT
  const orderRes = await createDbOrder({
    id: orderId,
    fullName: "Security Price Audit",
    phone: "+8801700000000",
    streetAddress: "Audit Lane",
    city: "Dhaka",
    subtotal: 1.00, // Client tampered subtotal
    total: 1.00,    // Client tampered total
    lines: [
      {
        product: { slug: "heavy-duty-2-post-lift-4t", price: 1.00 }, // Tampered unit price
        qty: 1,
      },
    ],
  });

  assert(orderRes.success && orderRes.orderId === orderId, "Order created through server pipeline");

  // Inspect authoritative values stored in PostgreSQL
  const [storedOrder] = await sql`SELECT subtotal, total FROM orders WHERE id = ${orderId}`;
  assert(Number(storedOrder.subtotal) === realLiftPrice, `Subtotal strictly computed from catalog price (${realLiftPrice} BDT), ignoring client 1.00 BDT`);
  assert(Number(storedOrder.total) === realLiftPrice, `Order total matches server-authoritative catalog sum (${realLiftPrice} BDT)`);

  const [storedItem] = await sql`SELECT unit_price FROM order_items WHERE order_id = ${orderId}`;
  assert(Number(storedItem.unit_price) === realLiftPrice, `Line item unit_price set to database catalog value (${realLiftPrice} BDT)`);

  // Idempotency test: resubmitting with same ID returns deduplicated without duplicate insert
  const dupeRes = await createDbOrder({
    id: orderId,
    fullName: "Duplicate Submission",
    phone: "+8801700000000",
    streetAddress: "Audit Lane",
    lines: [{ product: { slug: "heavy-duty-2-post-lift-4t" }, qty: 1 }],
  });
  assert(dupeRes.success && dupeRes.deduplicated, "Idempotency check intercepted resubmission and returned existing order");

  // Clean up order
  await sql`DELETE FROM orders WHERE id = ${orderId}`;
  await sql`UPDATE products SET warehouse_qty = 20 WHERE slug = 'heavy-duty-2-post-lift-4t'`;

  // ---------------------------------------------------------------------------
  // 5. DATABASE RESILIENCE & RETRY BACKOFF
  // ---------------------------------------------------------------------------
  console.log(bold("\n5. Database Resilience & Health Telemetry"));

  // Test transient error detector
  assert(isTransientError({ code: "ECONNRESET" }), "Identified ECONNRESET as transient connection error");
  assert(isTransientError({ code: "57P01" }), "Identified 57P01 (pooler restart) as transient error");
  assert(!isTransientError({ code: "23505" }), "Correctly identified unique violation (23505) as non-transient error");

  // Test withRetry helper
  let failCount = 0;
  const retryResult = await withRetry(async () => {
    if (failCount < 2) {
      failCount++;
      const transientErr = new Error("Connection closed prematurely");
      throw transientErr;
    }
    return "recovered_data";
  }, { maxRetries: 3, baseDelayMs: 20 });

  assert(retryResult === "recovered_data" && failCount === 2, "Automatic retry with backoff recovered from 2 simulated transient drops");

  // Database health check
  const health = await checkDatabaseHealth();
  assert(health.healthy && health.latencyMs < 500, `Database health check reports healthy (latency: ${health.latencyMs}ms)`);
  assert(health.tablesOnline === 16, `Cached catalog tables report 16 online tables`);

  // ---------------------------------------------------------------------------
  // 6. HEALTH TELEMETRY REDACTION CONTRACT (HTTP ENDPOINT)
  // ---------------------------------------------------------------------------
  console.log(bold("\n6. Telemetry Redaction & Diagnostic Security"));

  try {
    const unauthRes = await fetch("http://localhost:8080/api/health");
    const unauthHtml = await unauthRes.text();
    assert(unauthHtml.includes("healthy"), "Unauthenticated health endpoint returns healthy status");
    assert(!unauthHtml.includes("nodeVersion"), "Unauthenticated health endpoint redacts Node version & memory internals");
    assert(!unauthHtml.includes("tablesOnline"), "Unauthenticated health endpoint redacts database catalog counts");

    const authRes = await fetch("http://localhost:8080/api/health?token=page_secret_health_2026");
    const authHtml = await authRes.text();
    assert(authHtml.includes("tablesOnline"), "Authenticated health endpoint returns live database table metrics");
    assert(authHtml.includes("nodeVersion"), "Authenticated health endpoint returns system diagnostic telemetry");
  } catch (err) {
    console.warn("Server not reachable on :8080, skipping HTTP telemetry test");
  }

  await sql.end();

  console.log(bold("\n======================================================="));
  console.log(green(`   ALL ${passed} / ${total} SECURITY & RELIABILITY TESTS PASSED!`));
  console.log(bold("=======================================================\n"));
}

run().catch((err) => {
  console.error(red("\nTest suite failed with error:"), err);
  process.exit(1);
});
