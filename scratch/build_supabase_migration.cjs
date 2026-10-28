const fs = require('fs');
const path = require('path');

const root = 'C:/Users/glafi/.gemini/antigravity/scratch/pixel-perfect';
const migDir = path.join(root, 'db/migrations');

const f1 = fs.readFileSync(path.join(migDir, '0001_initial_schema.sql'), 'utf8');
const f2 = fs.readFileSync(path.join(migDir, '0002_seed_data.sql'), 'utf8');
const f3 = fs.readFileSync(path.join(migDir, '0003_customer_identity.sql'), 'utf8');
const f4 = fs.readFileSync(path.join(migDir, '0004_row_level_security.sql'), 'utf8');
const f5 = fs.readFileSync(path.join(migDir, '0005_app_user_role.sql'), 'utf8');

const teardown = `-- =============================================================================
-- PAGE INTERNATIONAL — ALL-IN-ONE SUPABASE MIGRATION & SEED SCRIPT
-- =============================================================================
-- Compatible with: Supabase PostgreSQL 15+
-- Instructions:
-- 1. Open your Supabase Dashboard: SQL Editor (>_)
-- 2. Click "+ New query"
-- 3. Paste this ENTIRE script and click "Run" (or Ctrl + Enter)
-- 4. In the RLS prompt popup, click "Run and enable RLS"
-- =============================================================================

-- Clean Reset (Safe for fresh runs or re-runs)
DROP TABLE IF EXISTS order_items CASCADE;
DROP TABLE IF EXISTS quote_request_items CASCADE;
DROP TABLE IF EXISTS orders CASCADE;
DROP TABLE IF EXISTS quote_requests CASCADE;
DROP TABLE IF EXISTS consultation_bookings CASCADE;
DROP TABLE IF EXISTS customer_sessions CASCADE;
DROP TABLE IF EXISTS customers CASCADE;
DROP TABLE IF EXISTS admin_sessions CASCADE;
DROP TABLE IF EXISTS admin_users CASCADE;
DROP TABLE IF EXISTS booking_service_options CASCADE;
DROP TABLE IF EXISTS services CASCADE;
DROP TABLE IF EXISTS service_centers CASCADE;
DROP TABLE IF EXISTS products CASCADE;
DROP TABLE IF EXISTS reviews CASCADE;
DROP TABLE IF EXISTS site_settings CASCADE;
DROP TABLE IF EXISTS schema_migrations CASCADE;

`;

let consolidated = teardown + '\n' + f1 + '\n\n' + f3 + '\n\n' + f2 + '\n\n' + f4 + '\n\n' + f5 + `

-- DevOps Tracking Table
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

fs.writeFileSync(path.join(root, 'db/supabase_migration.sql'), consolidated, 'utf8');
console.log("Successfully compiled db/supabase_migration.sql (" + consolidated.length + " bytes)");
