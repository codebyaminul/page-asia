const postgres = require('postgres');
const sql = postgres({ host: 'localhost', port: 5432, database: 'page_db', username: 'postgres', password: 'postgres' });

async function check() {
  const rows = await sql`SELECT slug, name, warehouse_qty, stock_status FROM products WHERE slug LIKE '%lift%'`;
  console.table(rows);
  await sql.end();
}
check();
