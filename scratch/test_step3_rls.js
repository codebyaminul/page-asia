import { sql } from "../src/lib/db.ts";

const green = (s) => `\x1b[32m${s}\x1b[0m`;
const red = (s) => `\x1b[31m${s}\x1b[0m`;
const cyan = (s) => `\x1b[36m${s}\x1b[0m`;
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

async function withContext(role, userId, fn) {
  return await sql.begin(async (tx) => {
    await tx`SET ROLE page_app_user`;
    await tx`SELECT set_config('app.current_user_role', ${role || 'anon'}, true)`;
    await tx`SELECT set_config('app.current_user_id', ${userId || ''}, true)`;
    return await fn(tx);
  });
}

async function run() {
  console.log(bold("\n======================================================="));
  console.log(bold("   STEP 3: POSTGRESQL ROW-LEVEL SECURITY (RLS) SUITE   "));
  console.log(bold("=======================================================\n"));

  // ---------------------------------------------------------------------------
  // 1. PUBLIC CATALOG vs ADMIN PERMISSIONS
  // ---------------------------------------------------------------------------
  console.log(bold("1. Catalog RLS Policies (Public Read vs Admin Write)"));
  
  // Anon can read products
  const anonProds = await withContext('anon', null, async (tx) => {
    return await tx`SELECT id, name, price FROM products LIMIT 5`;
  });
  assert(anonProds.length > 0, "Anonymous user can read public product catalog");

  // Anon CANNOT insert or update products
  let anonWriteBlocked = false;
  try {
    await withContext('anon', null, async (tx) => {
      await tx`
        INSERT INTO products (slug, sku, name, brand, category, price, image_url)
        VALUES ('hacked-prod', 'HACK-01', 'Hacked Product', 'FakeBrand', 'Garage Equipment', 100, '/assets/test.jpg')
      `;
    });
  } catch (err) {
    anonWriteBlocked = true;
  }
  assert(anonWriteBlocked, "RLS blocks anonymous user from creating catalog products");

  // Admin CAN insert and manage products
  const adminProdSlug = "qa-admin-rls-item";
  await withContext('admin', null, async (tx) => {
    await tx`
      INSERT INTO products (slug, sku, name, brand, category, price, image_url)
      VALUES (${adminProdSlug}, 'QA-RLS-01', 'Admin Managed Hoist', 'Torq', 'Garage Equipment', 150000, '/assets/test.jpg')
      ON CONFLICT (slug) DO NOTHING;
    `;
  });
  const adminRead = await sql`SELECT slug FROM products WHERE slug = ${adminProdSlug}`;
  assert(adminRead.length === 1, "Admin role successfully creates product via RLS policy");
  await sql`DELETE FROM products WHERE slug = ${adminProdSlug}`;

  // ---------------------------------------------------------------------------
  // 2. CUSTOMER ORDERS MULTI-TENANT ISOLATION
  // ---------------------------------------------------------------------------
  console.log(bold("\n2. Orders Multi-Tenant Data Isolation (Engine-Enforced)"));

  const custId1 = "c0000000-0000-0000-0000-000000000001"; // Tanvir (AutoFix Garage)
  const custId2 = "c0000000-0000-0000-0000-000000000002"; // Rashid (Dhaka Tyre)

  const order1_Id = "PG-RLS-C1-" + Date.now();
  const order2_Id = "PG-RLS-C2-" + Date.now();

  // Create two orders for different customers
  await withContext('admin', null, async (tx) => {
    await tx`DELETE FROM orders WHERE id IN (${order1_Id}, ${order2_Id})`;
    await tx`
      INSERT INTO orders (id, customer_id, full_name, phone, street_address, subtotal, total, payment_method)
      VALUES 
        (${order1_Id}, ${custId1}, 'Tanvir Ahmed', '+8801711123456', 'Tejgaon', 285000, 285000, 'b2b'),
        (${order2_Id}, ${custId2}, 'Rashid Khan', '+8801911654321', 'Mohakhali', 195000, 195000, 'cod')
    `;
  });

  // Customer 1 queries orders: PostgreSQL RLS MUST return only Order 1
  const ordersSeenByCust1 = await withContext('customer', custId1, async (tx) => {
    return await tx`SELECT id, customer_id, full_name FROM orders WHERE id IN (${order1_Id}, ${order2_Id})`;
  });
  assert(ordersSeenByCust1.length === 1, "Customer 1 sees exactly 1 order in PostgreSQL");
  assert(ordersSeenByCust1[0].id === order1_Id, "Customer 1 sees their own order");
  assert(!ordersSeenByCust1.some((o) => o.id === order2_Id), "Customer 1 CANNOT see Customer 2's order (Filtered by RLS)");

  // Customer 2 queries orders: PostgreSQL RLS MUST return only Order 2
  const ordersSeenByCust2 = await withContext('customer', custId2, async (tx) => {
    return await tx`SELECT id, customer_id, full_name FROM orders WHERE id IN (${order1_Id}, ${order2_Id})`;
  });
  assert(ordersSeenByCust2.length === 1, "Customer 2 sees exactly 1 order in PostgreSQL");
  assert(ordersSeenByCust2[0].id === order2_Id, "Customer 2 sees their own order");
  assert(!ordersSeenByCust2.some((o) => o.id === order1_Id), "Customer 2 CANNOT see Customer 1's order (Filtered by RLS)");

  // Anon queries orders: PostgreSQL RLS returns 0 rows (Private data protection)
  const ordersSeenByAnon = await withContext('anon', null, async (tx) => {
    return await tx`SELECT id FROM orders WHERE id IN (${order1_Id}, ${order2_Id})`;
  });
  assert(ordersSeenByAnon.length === 0, "Anonymous user cannot read customer orders (0 rows returned by RLS)");

  // Admin queries orders: Admin sees ALL orders
  const ordersSeenByAdmin = await withContext('admin', null, async (tx) => {
    return await tx`SELECT id FROM orders WHERE id IN (${order1_Id}, ${order2_Id})`;
  });
  assert(ordersSeenByAdmin.length === 2, "Admin sees all customer orders across tenants");

  // Clean up orders
  await withContext('admin', null, async (tx) => {
    await tx`DELETE FROM orders WHERE id IN (${order1_Id}, ${order2_Id})`;
  });

  // ---------------------------------------------------------------------------
  // 3. ADMIN USERS & SESSIONS SHIELD
  // ---------------------------------------------------------------------------
  console.log(bold("\n3. Administrative Shield (admin_users & admin_sessions)"));

  // Anon attempting to view admin_users returns 0 rows
  const anonAdminView = await withContext('anon', null, async (tx) => {
    return await tx`SELECT id, email FROM admin_users`;
  });
  assert(anonAdminView.length === 0, "Anonymous user cannot see admin accounts (0 rows returned by RLS)");

  // Customer attempting to view admin_users returns 0 rows
  const custAdminView = await withContext('customer', custId1, async (tx) => {
    return await tx`SELECT id, email FROM admin_users`;
  });
  assert(custAdminView.length === 0, "Customer cannot see admin accounts (0 rows returned by RLS)");

  // Admin querying admin_users returns active admins
  const adminView = await withContext('admin', null, async (tx) => {
    return await tx`SELECT id, email, role FROM admin_users`;
  });
  assert(adminView.length >= 5, "Admin role accesses admin users table");

  // ---------------------------------------------------------------------------
  // 4. QUOTES & BOOKINGS MULTI-TENANT ISOLATION
  // ---------------------------------------------------------------------------
  console.log(bold("\n4. RFQ Quotes & Bookings Multi-Tenant Isolation"));

  const quote1_Id = "q-rls-c1-" + Date.now();
  const quote2_Id = "q-rls-c2-" + Date.now();
  await withContext('admin', null, async (tx) => {
    await tx`
      INSERT INTO quote_requests (id, customer_id, company_name, contact_name, phone, email, business_type, city)
      VALUES 
        (${quote1_Id}, ${custId1}, 'AutoFix Garage', 'Tanvir', '+8801711123456', 'tanvir@autofixbd.com', 'Workshop', 'Dhaka'),
        (${quote2_Id}, ${custId2}, 'Dhaka Tyre', 'Rashid', '+8801911654321', 'rashid@dhakatyre.com', 'Tyre Center', 'Dhaka')
    `;
  });

  const quotesCust1 = await withContext('customer', custId1, async (tx) => {
    return await tx`SELECT id FROM quote_requests WHERE id IN (${quote1_Id}, ${quote2_Id})`;
  });
  assert(quotesCust1.length === 1 && quotesCust1[0].id === quote1_Id, "Customer 1 sees only their own RFQ quote");

  const quotesAnon = await withContext('anon', null, async (tx) => {
    return await tx`SELECT id FROM quote_requests WHERE id IN (${quote1_Id}, ${quote2_Id})`;
  });
  assert(quotesAnon.length === 0, "Anonymous user blocked from reading RFQ quotes");

  await withContext('admin', null, async (tx) => {
    await tx`DELETE FROM quote_requests WHERE id IN (${quote1_Id}, ${quote2_Id})`;
  });

  console.log(bold("\n======================================================="));
  console.log(bold(`   ALL RLS TESTS PASSED: ${green(passed + " / " + total)}`));
  console.log(bold("=======================================================\n"));

  await sql.end();
}

run().catch(async (err) => {
  console.error(red("\nRLS Suite failed:"), err);
  await sql.end();
  process.exit(1);
});
