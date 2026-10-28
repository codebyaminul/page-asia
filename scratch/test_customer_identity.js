import { sql } from "../src/lib/db.ts";
import {
  registerDbCustomer,
  loginDbCustomer,
  validateDbCustomerSession,
  logoutDbCustomer,
  createDbOrder,
  getDbCustomerOrders,
  createDbQuote,
  getDbCustomerQuotes,
  createDbBooking,
  getDbCustomerBookings,
} from "../src/lib/db-queries.ts";

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
  console.log(bold("   TESTING CUSTOMER IDENTITY & RELATIONAL INTEGRITY    "));
  console.log(bold("=======================================================\n"));

  // Ensure test stock available
  await sql`UPDATE products SET warehouse_qty = 20 WHERE slug = 'heavy-duty-2-post-lift-4t'`;

  const testEmail = "test_workshop_" + Date.now() + "@turbogarage.bd";

  // 1. Register new customer
  console.log(bold("1. Customer Registration & Bcrypt Hashing"));
  const regRes = await registerDbCustomer({
    email: testEmail,
    password: "SecretPassword123!",
    fullName: "Kamrul Hasan",
    phone: "+8801712345678",
    companyName: "Turbo Workshop BD",
    businessType: "Workshop / Garage",
    city: "Dhaka",
  });

  assert(regRes.success === true, "Customer registered successfully");
  assert(Boolean(regRes.customer?.id), "Customer returned with UUID");
  assert(Boolean(regRes.token), "Customer session token issued on registration");

  const customerId = regRes.customer.id;

  // 2. Duplicate registration rejection
  console.log(bold("\n2. Duplicate Email Prevention"));
  const dupRes = await registerDbCustomer({
    email: testEmail,
    password: "AnotherPassword!",
    fullName: "Duplicate User",
    phone: "+8801700000000",
  });
  assert(dupRes.success === false, "Duplicate email registration rejected");

  // 3. Login with correct password
  console.log(bold("\n3. Customer Login & Bcrypt Verification"));
  const loginRes = await loginDbCustomer(testEmail, "SecretPassword123!");
  assert(loginRes.success === true, "Valid credentials accepted");
  assert(Boolean(loginRes.token), "Valid session token generated on login");

  // 4. Login with incorrect password
  const badLogin = await loginDbCustomer(testEmail, "WrongPassword!");
  assert(badLogin.success === false, "Incorrect password rejected");

  // 5. Validate session token
  console.log(bold("\n4. Session Token Validation"));
  const sessionUser = await validateDbCustomerSession(loginRes.token);
  assert(Boolean(sessionUser), "Session token validated successfully");
  assert(sessionUser.email === testEmail, "Session matches customer email");

  // 6. Create customer order & verify relational link
  console.log(bold("\n5. Customer Orders Relational Link"));
  const orderId = `PG-CUST-${Date.now().toString().slice(-4)}`;
  const orderRes = await createDbOrder({
    id: orderId,
    customerId: customerId,
    accountType: "business",
    fullName: "Kamrul Hasan",
    phone: "+8801712345678",
    email: testEmail,
    companyName: "Turbo Workshop BD",
    streetAddress: "12 Mirpur Road",
    city: "Dhaka",
    subtotal: 285000,
    total: 285000,
    paymentMethod: "b2b",
    lines: [
      {
        product: {
          slug: "heavy-duty-2-post-lift-4t",
          name: "Heavy-Duty 2-Post Electro-Hydraulic Lift 4.0T",
          sku: "TQ-LIFT-4000",
          price: 285000,
        },
        qty: 1,
      },
    ],
  });
  assert(orderRes.success === true, "Order created with customer_id");

  const customerOrders = await getDbCustomerOrders(customerId);
  assert(customerOrders.length >= 1, "Customer order history retrieved");
  assert(customerOrders[0].id === orderId, "Retrieved order matches created order ID");
  assert(customerOrders[0].items.length === 1, "Order items nested in customer order record");

  // 7. Create customer quote & verify link
  console.log(bold("\n6. Customer Quote Request Link"));
  const quoteId = `q-cust-${Date.now().toString().slice(-4)}`;
  const quoteRes = await createDbQuote({
    id: quoteId,
    customerId: customerId,
    companyName: "Turbo Workshop BD",
    contactName: "Kamrul Hasan",
    phone: "+8801712345678",
    email: testEmail,
    businessType: "Workshop / Garage",
    city: "Dhaka",
    notes: "Requires installation",
    items: [
      {
        productSlug: "pro-tyre-changer-assist-arm",
        productName: "Pro Automatic Tyre Changer",
        qty: 1,
      },
    ],
  });
  assert(quoteRes.success === true, "Quote created with customer_id");

  const customerQuotes = await getDbCustomerQuotes(customerId);
  assert(customerQuotes.length >= 1, "Customer quotes retrieved");
  assert(customerQuotes[0].id === quoteId, "Retrieved quote matches created quote ID");

  // 8. Create customer booking & verify link
  console.log(bold("\n7. Customer Consultation Booking Link"));
  const bookingId = `b-cust-${Date.now().toString().slice(-4)}`;
  const bookingRes = await createDbBooking({
    id: bookingId,
    customerId: customerId,
    companyName: "Turbo Workshop BD",
    contactName: "Kamrul Hasan",
    phone: "+8801712345678",
    email: testEmail,
    businessType: "Workshop",
    bayCount: "2-4 Bays",
    serviceIds: ["heavy-lift-demo"],
    serviceName: "Heavy Lift Demonstration",
    preferredDate: "2026-11-20 (10:00 AM)",
  });
  assert(bookingRes.success === true, "Booking created with customer_id");

  const customerBookings = await getDbCustomerBookings(customerId);
  assert(customerBookings.length >= 1, "Customer bookings retrieved");
  assert(customerBookings[0].id === bookingId, "Retrieved booking matches created booking ID");

  // 9. Session Logout
  console.log(bold("\n8. Customer Logout & Session Invalidation"));
  await logoutDbCustomer(loginRes.token);
  const postLogout = await validateDbCustomerSession(loginRes.token);
  assert(postLogout === null, "Session invalid after logout");

  // 10. Clean up test records
  console.log(bold("\n9. Teardown Test Records"));
  await sql`DELETE FROM orders WHERE id = ${orderId}`;
  await sql`DELETE FROM quote_requests WHERE id = ${quoteId}`;
  await sql`DELETE FROM consultation_bookings WHERE id = ${bookingId}`;
  await sql`DELETE FROM customers WHERE id = ${customerId}`;
  console.log(`  ${green("✔")} Test records cleaned up successfully.`);

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
