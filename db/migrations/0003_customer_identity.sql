-- =============================================================================
-- PAGE INTERNATIONAL (PIXEL-PERFECT) - DATABASE MIGRATION 0003
-- Target Engine: PostgreSQL 15+
-- Description: Customer Identity, Customer Sessions, and Relational Foreign Keys
--              connecting Orders, Quotes, and Bookings to Customers.
-- =============================================================================

-- -----------------------------------------------------------------------------
-- 1. CUSTOMERS TABLE
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS customers (
  id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email               TEXT NOT NULL UNIQUE,
  password_hash       TEXT NOT NULL,
  full_name           TEXT NOT NULL,
  phone               TEXT NOT NULL,
  company_name        TEXT,
  bin_vat_number      TEXT,
  business_type       TEXT CHECK (
                        business_type IS NULL OR business_type IN (
                          'Workshop / Garage',
                          'Tyre Service Center',
                          'Dealership Workshop',
                          'Fleet Operator',
                          'EV Business',
                          'Distributor',
                          'Independent Technician'
                        )
                      ),
  street_address      TEXT,
  city                TEXT NOT NULL DEFAULT 'Dhaka',
  status              TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'suspended', 'pending_verification')),
  email_verified      BOOLEAN NOT NULL DEFAULT FALSE,
  created_at          TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at          TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  last_login          TIMESTAMPTZ
);

CREATE INDEX IF NOT EXISTS idx_customers_email ON customers(LOWER(email));
CREATE INDEX IF NOT EXISTS idx_customers_status ON customers(status);

DROP TRIGGER IF EXISTS trg_customers_updated_at ON customers;
CREATE TRIGGER trg_customers_updated_at
  BEFORE UPDATE ON customers
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

-- -----------------------------------------------------------------------------
-- 2. CUSTOMER SESSIONS TABLE
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS customer_sessions (
  token       TEXT PRIMARY KEY,
  customer_id UUID NOT NULL REFERENCES customers(id) ON DELETE CASCADE,
  ip_address  TEXT,
  user_agent  TEXT,
  expires_at  TIMESTAMPTZ NOT NULL,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_customer_sessions_user ON customer_sessions(customer_id);
CREATE INDEX IF NOT EXISTS idx_customer_sessions_expires ON customer_sessions(expires_at);

-- -----------------------------------------------------------------------------
-- 3. LINK ORDERS, QUOTES, AND BOOKINGS TO CUSTOMER IDENTITY
-- -----------------------------------------------------------------------------
ALTER TABLE orders 
  ADD COLUMN IF NOT EXISTS customer_id UUID REFERENCES customers(id) ON DELETE SET NULL;
CREATE INDEX IF NOT EXISTS idx_orders_customer ON orders(customer_id);

ALTER TABLE quote_requests 
  ADD COLUMN IF NOT EXISTS customer_id UUID REFERENCES customers(id) ON DELETE SET NULL;
CREATE INDEX IF NOT EXISTS idx_quotes_customer ON quote_requests(customer_id);

ALTER TABLE consultation_bookings 
  ADD COLUMN IF NOT EXISTS customer_id UUID REFERENCES customers(id) ON DELETE SET NULL;
CREATE INDEX IF NOT EXISTS idx_bookings_customer ON consultation_bookings(customer_id);

-- -----------------------------------------------------------------------------
-- 4. SEED SAMPLE B2B WORKSHOP CUSTOMERS (Password: customer123)
-- -----------------------------------------------------------------------------
INSERT INTO customers (
  id, email, password_hash, full_name, phone, company_name, bin_vat_number, business_type, street_address, city, email_verified
) VALUES 
(
  'c0000000-0000-0000-0000-000000000001',
  'tanvir@autofixbd.com',
  crypt('customer123', gen_salt('bf')),
  'Tanvir Ahmed',
  '+880-1711-123456',
  'AutoFix Garage Ltd.',
  '123456789-0101',
  'Workshop / Garage',
  '42 Tejgaon Commercial Area',
  'Dhaka',
  TRUE
),
(
  'c0000000-0000-0000-0000-000000000002',
  'rashid@dhakatyre.com',
  crypt('customer123', gen_salt('bf')),
  'Rashid Khan',
  '+880-1911-654321',
  'Dhaka Tyre Center',
  '987654321-0202',
  'Tyre Service Center',
  '18 Mohakhali C/A',
  'Dhaka',
  TRUE
),
(
  'c0000000-0000-0000-0000-000000000003',
  'selim@greenfleet.bd',
  crypt('customer123', gen_salt('bf')),
  'Selim Reza',
  '+880-1611-987654',
  'Green Fleet BD',
  '456789123-0303',
  'Fleet Operator',
  'GEC Circle',
  'Chattogram',
  TRUE
)
ON CONFLICT (email) DO NOTHING;

-- Link existing seed quotes to customer accounts
UPDATE quote_requests
SET customer_id = 'c0000000-0000-0000-0000-000000000001'
WHERE email = 'tanvir@autofixbd.com' AND customer_id IS NULL;

UPDATE quote_requests
SET customer_id = 'c0000000-0000-0000-0000-000000000002'
WHERE email = 'rashid@dhakatyre.com' AND customer_id IS NULL;

UPDATE quote_requests
SET customer_id = 'c0000000-0000-0000-0000-000000000003'
WHERE email = 'selim@greenfleet.bd' AND customer_id IS NULL;
