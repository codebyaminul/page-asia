const postgres = require('postgres');
require('dotenv').config();

const sql = postgres({
  host: 'localhost',
  port: 5432,
  database: 'page_db',
  username: 'postgres',
  password: 'postgres',
});

async function runProfileTests() {
  console.log("\n=======================================================");
  console.log("   PAGE INTERNATIONAL — CUSTOMER PROFILE QA SUITE     ");
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

  const testEmail = `profile_test_${Date.now()}@workshop.bd`;

  try {
    // 1. Create a customer for profile testing
    console.log("1. Account Creation & Initial Credentials");
    const [c] = await sql`
      INSERT INTO customers (
        email, password_hash, full_name, phone, company_name,
        bin_vat_number, business_type, street_address, city
      ) VALUES (
        ${testEmail}, crypt('InitialPass123!', gen_salt('bf')), 'Md. Shahinur Rahman',
        '+880-1799-887766', 'Shahinur Auto Care', 'BIN-11223344',
        'Workshop / Garage', '99 Tongi Highway', 'Gazipur'
      )
      RETURNING id, email, full_name, company_name
    `;
    assert(Boolean(c && c.id), "Customer account created for profile test");

    // 2. Test Profile Update
    console.log("\n2. Customer Profile Self-Service Update");
    const [updated] = await sql`
      UPDATE customers
      SET
        company_name = 'Shahinur Precision Motors Ltd',
        phone = '+880-1899-776655',
        bin_vat_number = 'BIN-99887766-2026',
        city = 'Dhaka',
        business_type = 'Dealership Workshop',
        updated_at = NOW()
      WHERE id = ${c.id}
      RETURNING id, company_name, phone, bin_vat_number, city, business_type
    `;

    assert(updated.company_name === 'Shahinur Precision Motors Ltd', "Company name updated");
    assert(updated.phone === '+880-1899-776655', "Phone updated");
    assert(updated.bin_vat_number === 'BIN-99887766-2026', "BIN/VAT updated");
    assert(updated.business_type === 'Dealership Workshop', "Business sector updated to Dealership Workshop");

    // 3. Test Password Change Verification
    console.log("\n3. Password Change & Verification Workflow");
    // Attempt with incorrect current password
    const [invalidCheck] = await sql`
      SELECT (password_hash = crypt('WrongPass!', password_hash)) AS valid_password
      FROM customers WHERE id = ${c.id}
    `;
    assert(!invalidCheck.valid_password, "Incorrect current password safely rejected");

    // Attempt with correct current password
    const [validCheck] = await sql`
      SELECT (password_hash = crypt('InitialPass123!', password_hash)) AS valid_password
      FROM customers WHERE id = ${c.id}
    `;
    assert(validCheck.valid_password, "Correct current password validated");

    // Update to new password
    await sql`
      UPDATE customers
      SET password_hash = crypt('NewStrongPass2026!', gen_salt('bf')), updated_at = NOW()
      WHERE id = ${c.id}
    `;

    // Verify new password works
    const [newLoginCheck] = await sql`
      SELECT (password_hash = crypt('NewStrongPass2026!', password_hash)) AS valid_password
      FROM customers WHERE id = ${c.id}
    `;
    assert(newLoginCheck.valid_password, "New password verified successfully");

    // Verify old password no longer works
    const [oldLoginCheck] = await sql`
      SELECT (password_hash = crypt('InitialPass123!', password_hash)) AS valid_password
      FROM customers WHERE id = ${c.id}
    `;
    assert(!oldLoginCheck.valid_password, "Old password no longer valid");

    // 4. Teardown
    console.log("\n4. Cleanup Test Account");
    await sql`DELETE FROM customers WHERE id = ${c.id}`;
    const [checkDeleted] = await sql`SELECT id FROM customers WHERE id = ${c.id}`;
    assert(!checkDeleted, "Cleaned up test customer account");

  } catch (err) {
    console.error("Profile QA error:", err);
    failed++;
  } finally {
    await sql.end();
  }

  console.log("\n=======================================================");
  console.log(`   PROFILE QA RESULT: ${passed} PASSED, ${failed} FAILED (Total: ${passed + failed})`);
  console.log("=======================================================\n");

  if (failed > 0) process.exit(1);
}

runProfileTests();
