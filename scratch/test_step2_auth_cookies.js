import { sql } from "../src/lib/db.ts";
import {
  registerDbCustomer,
  loginDbCustomer,
  validateDbCustomerSession,
  logoutDbCustomer,
  getDbCustomerOrders,
  getDbCustomerQuotes,
  getDbCustomerBookings,
  createDbOrder,
  createDbQuote,
  createDbBooking,
} from "../src/lib/db-queries.ts";
import { COOKIE_NAMES } from "../src/lib/auth-session.ts";

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
  console.log(bold("   STEP 2: AUTH ENGINE & DATA ISOLATION VERIFICATION   "));
  console.log(bold("=======================================================\n"));

  // Ensure test stock available
  await sql`UPDATE products SET warehouse_qty = 20 WHERE slug IN ('heavy-duty-2-post-lift-4t', 'pro-tyre-changer-assist-arm')`;

  // 1. Verify Cookie Names & Security Architecture
  console.log(bold("1. Cookie Standard & Security Specs"));
  assert(COOKIE_NAMES.admin === "page_admin_session", "Admin cookie name is standard");
  assert(COOKIE_NAMES.customer === "page_customer_session", "Customer cookie name is standard");

  // 2. Multi-tenant Customer Account Creation
  console.log(bold("\n2. Customer A vs Customer B Isolation Setup"));
  const emailA = "customer_a_" + Date.now() + "@workshop-a.bd";
  const emailB = "customer_b_" + Date.now() + "@workshop-b.bd";

  const userA = await registerDbCustomer({
    email: emailA,
    password: "PasswordA123!",
    fullName: "Customer A",
    phone: "+8801711111111",
    companyName: "Workshop Alpha",
    city: "Dhaka",
  });
  assert(userA.success, "Customer A registered");

  const userB = await registerDbCustomer({
    email: emailB,
    password: "PasswordB123!",
    fullName: "Customer B",
    phone: "+8801722222222",
    companyName: "Workshop Beta",
    city: "Chattogram",
  });
  assert(userB.success, "Customer B registered");

  const idA = userA.customer.id;
  const idB = userB.customer.id;

  // 3. Create discrete orders for A and B
  console.log(bold("\n3. Discrete Customer Orders & Privacy Isolation"));
  const orderA_Id = `PG-ORD-A-${Date.now().toString().slice(-4)}`;
  const orderB_Id = `PG-ORD-B-${Date.now().toString().slice(-4)}`;

  await createDbOrder({
    id: orderA_Id,
    customerId: idA,
    fullName: "Customer A",
    phone: "+8801711111111",
    streetAddress: "Tejgaon Road",
    subtotal: 50000,
    total: 50000,
    lines: [
      {
        product: { slug: "heavy-duty-2-post-lift-4t", name: "Lift", sku: "TQ-LIFT-4000", price: 50000 },
        qty: 1,
      },
    ],
  });

  await createDbOrder({
    id: orderB_Id,
    customerId: idB,
    fullName: "Customer B",
    phone: "+8801722222222",
    streetAddress: "Agrabad",
    city: "Chattogram",
    subtotal: 75000,
    total: 75000,
    lines: [
      {
        product: { slug: "pro-tyre-changer-assist-arm", name: "Tyre Changer", sku: "TQ-TC-24", price: 75000 },
        qty: 1,
      },
    ],
  });

  // Verify Customer A sees ONLY Order A
  const ordersForA = await getDbCustomerOrders(idA);
  assert(ordersForA.length === 1, "Customer A has exactly 1 order");
  assert(ordersForA[0].id === orderA_Id, "Customer A sees order A");
  assert(!ordersForA.some((o) => o.id === orderB_Id), "Customer A CANNOT see Customer B's order (Data Isolation)");

  // Verify Customer B sees ONLY Order B
  const ordersForB = await getDbCustomerOrders(idB);
  assert(ordersForB.length === 1, "Customer B has exactly 1 order");
  assert(ordersForB[0].id === orderB_Id, "Customer B sees order B");
  assert(!ordersForB.some((o) => o.id === orderA_Id), "Customer B CANNOT see Customer A's order (Data Isolation)");

  // 4. RFQ Quotes Isolation
  console.log(bold("\n4. Discrete RFQ Quotes & Privacy Isolation"));
  const quoteA_Id = `q-a-${Date.now().toString().slice(-4)}`;
  const quoteB_Id = `q-b-${Date.now().toString().slice(-4)}`;

  await createDbQuote({
    id: quoteA_Id,
    customerId: idA,
    companyName: "Workshop Alpha",
    phone: "+8801711111111",
    email: emailA,
    items: [{ productSlug: "heavy-duty-2-post-lift-4t", productName: "Lift", qty: 2 }],
  });

  await createDbQuote({
    id: quoteB_Id,
    customerId: idB,
    companyName: "Workshop Beta",
    phone: "+8801722222222",
    email: emailB,
    items: [{ productSlug: "pro-tyre-changer-assist-arm", productName: "Changer", qty: 1 }],
  });

  const quotesForA = await getDbCustomerQuotes(idA);
  assert(quotesForA.length === 1 && quotesForA[0].id === quoteA_Id, "Customer A sees only Quote A");
  assert(!quotesForA.some((q) => q.id === quoteB_Id), "Customer A CANNOT see Customer B's quote");

  // 5. Session Expiration & Invalidation
  console.log(bold("\n5. Session Invalidation & Token Cleanup"));
  await logoutDbCustomer(userA.token);
  const validatedA = await validateDbCustomerSession(userA.token);
  assert(validatedA === null, "Revoked session is completely nullified");

  // 6. Cleanup
  console.log(bold("\n6. Teardown Test Records"));
  await sql`DELETE FROM orders WHERE id IN (${orderA_Id}, ${orderB_Id})`;
  await sql`DELETE FROM quote_requests WHERE id IN (${quoteA_Id}, ${quoteB_Id})`;
  await sql`DELETE FROM customers WHERE id IN (${idA}, ${idB})`;
  console.log(`  ${green("✔")} Cleaned up test data.`);

  console.log(bold("\n======================================================="));
  console.log(bold(`   ALL TESTS PASSED: ${green(passed + " / " + total)}`));
  console.log(bold("=======================================================\n"));

  await sql.end();
}

run().catch(async (err) => {
  console.error(red("\nTest failed:"), err);
  await sql.end();
  process.exit(1);
});
