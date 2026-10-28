const postgres = require('postgres');
const fs = require('fs');

async function test() {
  const root = postgres('postgresql://postgres:postgres@localhost:5432/postgres');
  await root.unsafe('DROP DATABASE IF EXISTS test_supabase_db');
  await root.unsafe('CREATE DATABASE test_supabase_db');
  await root.end();

  const sql = postgres('postgresql://postgres:postgres@localhost:5432/test_supabase_db');
  console.log('Running Part 1 (Schema & RLS)...');
  const part1 = fs.readFileSync('db/supabase_part1_schema.sql', 'utf8');
  await sql.unsafe(part1);
  console.log('Part 1 passed!');

  console.log('Running Part 2 (Seed data)...');
  const part2 = fs.readFileSync('db/supabase_part2_seed.sql', 'utf8');
  await sql.unsafe(part2);
  console.log('Part 2 passed!');

  const [products] = await sql`SELECT count(*) FROM products`;
  const [admins] = await sql`SELECT count(*) FROM admin_users`;
  const [customers] = await sql`SELECT count(*) FROM customers`;
  console.log('Row counts:', { products: products.count, admins: admins.count, customers: customers.count });
  await sql.end();
}
test().catch(e => { console.error('Error:', e); process.exit(1); });
