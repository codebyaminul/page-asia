const fs = require('fs');

const dropHeader = `-- =============================================================================
-- PART 1: SCHEMA, CONSTRAINTS, INDEXES, TRIGGERS & ROW LEVEL SECURITY
-- =============================================================================
DROP TABLE IF EXISTS audit_logs CASCADE;
DROP TABLE IF EXISTS consultation_requests CASCADE;
DROP TABLE IF EXISTS service_bookings CASCADE;
DROP TABLE IF EXISTS order_items CASCADE;
DROP TABLE IF EXISTS orders CASCADE;
DROP TABLE IF EXISTS quote_items CASCADE;
DROP TABLE IF EXISTS quotes CASCADE;
DROP TABLE IF EXISTS reviews CASCADE;
DROP TABLE IF EXISTS products CASCADE;
DROP TABLE IF EXISTS branches CASCADE;
DROP TABLE IF EXISTS admin_users CASCADE;
DROP TABLE IF EXISTS brands CASCADE;
DROP TABLE IF EXISTS categories CASCADE;
DROP TABLE IF EXISTS customer_sessions CASCADE;
DROP TABLE IF EXISTS customers CASCADE;
DROP TABLE IF EXISTS schema_migrations CASCADE;

`;

const f1 = fs.readFileSync('C:/Users/glafi/.gemini/antigravity/scratch/pixel-perfect/db/migrations/0001_initial_schema.sql', 'utf8');
const f2 = fs.readFileSync('C:/Users/glafi/.gemini/antigravity/scratch/pixel-perfect/db/migrations/0002_seed_data.sql', 'utf8');
const f3 = fs.readFileSync('C:/Users/glafi/.gemini/antigravity/scratch/pixel-perfect/db/migrations/0003_customer_identity.sql', 'utf8');
const f4 = fs.readFileSync('C:/Users/glafi/.gemini/antigravity/scratch/pixel-perfect/db/migrations/0004_row_level_security.sql', 'utf8');
const f5 = fs.readFileSync('C:/Users/glafi/.gemini/antigravity/scratch/pixel-perfect/db/migrations/0005_app_user_role.sql', 'utf8');

// In f3, separate table creation from seed insertion
const f3SeedIdx = f3.indexOf('-- 4. SEED SAMPLE B2B WORKSHOP CUSTOMERS');
if (f3SeedIdx === -1) {
  throw new Error('Could not find seed header in 0003_customer_identity.sql');
}
const f3Schema = f3.substring(0, f3SeedIdx);
const f3Seed = f3.substring(f3SeedIdx);

const part1 = dropHeader + f1 + '\n\n' + f3Schema + '\n\n' + f4 + '\n\n' + f5;
fs.writeFileSync('C:/Users/glafi/.gemini/antigravity/scratch/pixel-perfect/db/supabase_part1_schema.sql', part1, 'utf8');

const part2Header = `-- =============================================================================
-- PART 2: CATALOG DATA, DEMO ACCOUNTS & SEED RECORD
-- =============================================================================\n`;
const part2Migrations = `
CREATE TABLE IF NOT EXISTS schema_migrations (
  version           TEXT PRIMARY KEY,
  applied_at        TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  execution_time_ms INT NOT NULL DEFAULT 0
);

INSERT INTO schema_migrations (version, applied_at, execution_time_ms)
VALUES
  ('0001_initial_schema.sql', NOW(), 0),
  ('0002_seed_data.sql', NOW(), 0),
  ('0003_customer_identity.sql', NOW(), 0),
  ('0004_row_level_security.sql', NOW(), 0),
  ('0005_app_user_role.sql', NOW(), 0)
ON CONFLICT (version) DO NOTHING;
`;

const part2 = part2Header + f2 + '\n\n' + f3Seed + '\n\n' + part2Migrations;
fs.writeFileSync('C:/Users/glafi/.gemini/antigravity/scratch/pixel-perfect/db/supabase_part2_seed.sql', part2, 'utf8');

console.log('Part 1 bytes:', part1.length);
console.log('Part 2 bytes:', part2.length);
