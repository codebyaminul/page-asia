const postgres = require('postgres');
const fs = require('fs');

async function testScript() {
  const adminSql = postgres({ host: 'localhost', port: 5432, database: 'postgres', username: 'postgres', password: 'postgres' });
  try {
    await adminSql`DROP DATABASE IF EXISTS test_supabase_db`;
    await adminSql`CREATE DATABASE test_supabase_db`;
    console.log("Created test_supabase_db");
  } finally {
    await adminSql.end();
  }

  const testDb = postgres({ host: 'localhost', port: 5432, database: 'test_supabase_db', username: 'postgres', password: 'postgres' });
  try {
    const sqlContent = fs.readFileSync('db/supabase_migration.sql', 'utf8');
    const start = Date.now();
    await testDb.unsafe(sqlContent);
    console.log(`✔ Entire db/supabase_migration.sql executed cleanly in ${Date.now() - start}ms!`);

    const tables = await testDb`SELECT table_name FROM information_schema.tables WHERE table_schema = 'public'`;
    console.log(`Created ${tables.length} tables in test database:`);
    console.log(tables.map(t => t.table_name).join(', '));
  } finally {
    await testDb.end();
    const adminSql2 = postgres({ host: 'localhost', port: 5432, database: 'postgres', username: 'postgres', password: 'postgres' });
    await adminSql2`DROP DATABASE test_supabase_db`;
    await adminSql2.end();
    console.log("Cleaned up test_supabase_db");
  }
}

testScript().catch(err => {
  console.error("Test failed:", err);
  process.exit(1);
});
