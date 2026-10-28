const postgres = require('postgres');
const sql = postgres({ host: 'localhost', port: 5432, database: 'page_db', username: 'postgres', password: 'postgres' });

async function check() {
  const rows = await sql`SELECT id, company_name, phone, status FROM quote_requests`;
  console.table(rows);
  await sql.end();
}
check();
