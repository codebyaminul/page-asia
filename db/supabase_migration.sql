-- =============================================================================
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


-- =============================================================================
-- PAGE INTERNATIONAL (PIXEL-PERFECT) - DATABASE MIGRATION 0001
-- Target Engine: PostgreSQL 15+
-- Description: Initial schema creation for all 12 core tables, indexes,
--              triggers, and constraints.
-- =============================================================================

-- -----------------------------------------------------------------------------
-- EXTENSIONS
-- -----------------------------------------------------------------------------
CREATE EXTENSION IF NOT EXISTS "pgcrypto";
CREATE EXTENSION IF NOT EXISTS "pg_trgm";

-- -----------------------------------------------------------------------------
-- REUSABLE TIMESTAMP TRIGGER
-- -----------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- -----------------------------------------------------------------------------
-- 1. PRODUCTS & INVENTORY
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS products (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug            TEXT NOT NULL UNIQUE,
  sku             TEXT NOT NULL UNIQUE,
  name            TEXT NOT NULL,
  brand           TEXT NOT NULL,
  category        TEXT NOT NULL CHECK (
                    category IN (
                      'Garage Equipment',
                      'Tyre & Wheel',
                      'Diagnostic Equipment',
                      'EV Equipment',
                      'Brakes',
                      'Batteries',
                      'Lubricants & Fluids'
                    )
                  ),
  mobility        TEXT[] NOT NULL DEFAULT '{}',
  price           NUMERIC(12, 2) NOT NULL CHECK (price >= 0),
  old_price       NUMERIC(12, 2) CHECK (old_price IS NULL OR old_price >= 0),
  image_url       TEXT NOT NULL,
  fits            TEXT[] NOT NULL DEFAULT '{}',
  description     TEXT NOT NULL DEFAULT '',
  specs           JSONB NOT NULL DEFAULT '[]'::jsonb,
  is_equipment    BOOLEAN NOT NULL DEFAULT FALSE,
  requires_quote  BOOLEAN NOT NULL DEFAULT FALSE,
  rating          NUMERIC(3, 2) NOT NULL DEFAULT 0.00 CHECK (rating BETWEEN 0.00 AND 5.00),
  reviews_count   INT NOT NULL DEFAULT 0 CHECK (reviews_count >= 0),
  warehouse_qty   INT NOT NULL DEFAULT 0 CHECK (warehouse_qty >= 0),
  reorder_level   INT NOT NULL DEFAULT 5 CHECK (reorder_level >= 0),
  stock_status    TEXT GENERATED ALWAYS AS (
                    CASE
                      WHEN warehouse_qty = 0 THEN 'Out of stock'
                      WHEN warehouse_qty <= reorder_level THEN 'Low stock'
                      ELSE 'In stock'
                    END
                  ) STORED,
  last_restocked  TIMESTAMPTZ,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_products_category ON products(category);
CREATE INDEX IF NOT EXISTS idx_products_price ON products(price);
CREATE INDEX IF NOT EXISTS idx_products_mobility ON products USING GIN(mobility);
CREATE INDEX IF NOT EXISTS idx_products_search ON products USING GIN(name gin_trgm_ops);

DROP TRIGGER IF EXISTS trg_products_updated_at ON products;
CREATE TRIGGER trg_products_updated_at
  BEFORE UPDATE ON products
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

-- -----------------------------------------------------------------------------
-- 2. SERVICE CENTERS
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS service_centers (
  id          TEXT PRIMARY KEY,
  name        TEXT NOT NULL,
  area        TEXT NOT NULL,
  address     TEXT NOT NULL,
  rating      NUMERIC(3, 2) CHECK (rating IS NULL OR (rating BETWEEN 0.00 AND 5.00)),
  hours       TEXT,
  services    TEXT[] NOT NULL DEFAULT '{}',
  map_x       NUMERIC(5, 2),
  map_y       NUMERIC(5, 2),
  is_active   BOOLEAN NOT NULL DEFAULT TRUE,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- -----------------------------------------------------------------------------
-- 3. SERVICES (Catalogue of Engineering Offerings)
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS services (
  slug        TEXT PRIMARY KEY,
  name        TEXT NOT NULL,
  description TEXT NOT NULL DEFAULT '',
  price_from  NUMERIC(12, 2) CHECK (price_from IS NULL OR price_from >= 0),
  duration    TEXT NOT NULL,
  sort_order  INT NOT NULL DEFAULT 0,
  is_active   BOOLEAN NOT NULL DEFAULT TRUE
);

-- -----------------------------------------------------------------------------
-- 4. BOOKING SERVICE OPTIONS (Demonstration / Bay Audit Wizard Options)
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS booking_service_options (
  id          TEXT PRIMARY KEY,
  name        TEXT NOT NULL,
  description TEXT NOT NULL DEFAULT '',
  sort_order  INT NOT NULL DEFAULT 0,
  is_active   BOOLEAN NOT NULL DEFAULT TRUE
);

-- -----------------------------------------------------------------------------
-- 5. ORDERS
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS orders (
  id              TEXT PRIMARY KEY, -- "PG-XXXXXX"
  account_type    TEXT NOT NULL DEFAULT 'personal' CHECK (account_type IN ('personal', 'business')),
  full_name       TEXT NOT NULL,
  phone           TEXT NOT NULL,
  email           TEXT,
  company_name    TEXT,
  bin_vat_number  TEXT,
  street_address  TEXT NOT NULL,
  city            TEXT NOT NULL DEFAULT 'Dhaka',
  delivery_notes  TEXT,
  payment_method  TEXT NOT NULL CHECK (payment_method IN ('cod', 'b2b', 'card')),
  subtotal        NUMERIC(14, 2) NOT NULL CHECK (subtotal >= 0),
  delivery_charge NUMERIC(12, 2) NOT NULL DEFAULT 0.00 CHECK (delivery_charge >= 0),
  vat_amount      NUMERIC(12, 2) NOT NULL DEFAULT 0.00 CHECK (vat_amount >= 0),
  total           NUMERIC(14, 2) NOT NULL CHECK (total >= 0),
  status          TEXT NOT NULL DEFAULT 'pending' CHECK (
                    status IN ('pending', 'confirmed', 'dispatched', 'delivered', 'cancelled')
                  ),
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);
CREATE INDEX IF NOT EXISTS idx_orders_created ON orders(created_at DESC);

DROP TRIGGER IF EXISTS trg_orders_updated_at ON orders;
CREATE TRIGGER trg_orders_updated_at
  BEFORE UPDATE ON orders
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

-- -----------------------------------------------------------------------------
-- 6. ORDER ITEMS (Immutable Historical Lines)
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS order_items (
  id            SERIAL PRIMARY KEY,
  order_id      TEXT NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  product_id    UUID REFERENCES products(id) ON DELETE SET NULL,
  product_name  TEXT NOT NULL,
  product_sku   TEXT NOT NULL,
  unit_price    NUMERIC(12, 2) NOT NULL CHECK (unit_price >= 0),
  qty           INT NOT NULL CHECK (qty > 0),
  line_total    NUMERIC(14, 2) GENERATED ALWAYS AS (unit_price * qty) STORED
);

CREATE INDEX IF NOT EXISTS idx_order_items_order ON order_items(order_id);
CREATE INDEX IF NOT EXISTS idx_order_items_product ON order_items(product_id);

-- -----------------------------------------------------------------------------
-- 7. QUOTE REQUESTS (B2B Request For Quotation Master)
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS quote_requests (
  id            TEXT PRIMARY KEY, -- "q-XXXXXX" or "RFQ-XXXXXX"
  company_name  TEXT NOT NULL,
  contact_name  TEXT NOT NULL,
  phone         TEXT NOT NULL,
  email         TEXT NOT NULL,
  business_type TEXT NOT NULL,
  city          TEXT NOT NULL,
  notes         TEXT NOT NULL DEFAULT '',
  status        TEXT NOT NULL DEFAULT 'pending' CHECK (
                  status IN ('pending', 'replied', 'accepted', 'declined')
                ),
  admin_reply   TEXT,
  quoted_total  NUMERIC(14, 2) CHECK (quoted_total IS NULL OR quoted_total >= 0),
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_quotes_status ON quote_requests(status);
CREATE INDEX IF NOT EXISTS idx_quotes_created ON quote_requests(created_at DESC);

DROP TRIGGER IF EXISTS trg_quote_requests_updated_at ON quote_requests;
CREATE TRIGGER trg_quote_requests_updated_at
  BEFORE UPDATE ON quote_requests
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

-- -----------------------------------------------------------------------------
-- 8. QUOTE REQUEST ITEMS (Normalized Multi-Item Lines)
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS quote_request_items (
  id                SERIAL PRIMARY KEY,
  quote_id          TEXT NOT NULL REFERENCES quote_requests(id) ON DELETE CASCADE,
  product_id        UUID REFERENCES products(id) ON DELETE SET NULL,
  product_name      TEXT NOT NULL,
  product_sku       TEXT NOT NULL,
  qty               INT NOT NULL CHECK (qty > 0),
  quoted_unit_price NUMERIC(12, 2) CHECK (quoted_unit_price IS NULL OR quoted_unit_price >= 0),
  line_total        NUMERIC(14, 2) GENERATED ALWAYS AS (
                      COALESCE(quoted_unit_price, 0.00) * qty
                    ) STORED
);

CREATE INDEX IF NOT EXISTS idx_quote_items_quote ON quote_request_items(quote_id);
CREATE INDEX IF NOT EXISTS idx_quote_items_product ON quote_request_items(product_id);

-- -----------------------------------------------------------------------------
-- 9. CONSULTATION BOOKINGS (All 5 Wizard Steps Captured)
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS consultation_bookings (
  id                  TEXT PRIMARY KEY, -- "b-XXXXXX"
  company_name        TEXT NOT NULL,
  contact_name        TEXT NOT NULL,
  phone               TEXT NOT NULL,
  email               TEXT,
  business_type       TEXT CHECK (
                        business_type IS NULL OR business_type IN (
                          'Workshop', 'Service Center', 'Dealer', 'Fleet', 'EV Business', 'Distributor'
                        )
                      ),
  bay_count           TEXT,
  equipment_interest  TEXT,
  service_ids         TEXT[] NOT NULL DEFAULT '{}',
  service_name        TEXT NOT NULL,
  location_type       TEXT NOT NULL DEFAULT 'hub' CHECK (location_type IN ('hub', 'onsite')),
  center_id           TEXT REFERENCES service_centers(id) ON DELETE SET NULL,
  center_name         TEXT,
  onsite_address      TEXT,
  preferred_date      DATE NOT NULL,
  preferred_slot      TEXT NOT NULL,
  notes               TEXT NOT NULL DEFAULT '',
  status              TEXT NOT NULL DEFAULT 'pending' CHECK (
                        status IN ('pending', 'confirmed', 'completed', 'cancelled')
                      ),
  created_at          TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at          TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_bookings_status ON consultation_bookings(status);
CREATE INDEX IF NOT EXISTS idx_bookings_date ON consultation_bookings(preferred_date);

DROP TRIGGER IF EXISTS trg_consultation_bookings_updated_at ON consultation_bookings;
CREATE TRIGGER trg_consultation_bookings_updated_at
  BEFORE UPDATE ON consultation_bookings
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

-- -----------------------------------------------------------------------------
-- 10. ADMIN USERS & AUTHENTICATION
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS admin_users (
  id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email          TEXT NOT NULL UNIQUE,
  password_hash  TEXT NOT NULL,
  name           TEXT NOT NULL,
  role           TEXT NOT NULL DEFAULT 'staff' CHECK (
                   role IN ('admin', 'product_manager', 'staff', 'viewer')
                 ),
  status         TEXT NOT NULL DEFAULT 'active' CHECK (
                   status IN ('active', 'suspended')
                 ),
  avatar_url     TEXT,
  created_at     TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  last_login     TIMESTAMPTZ
);

CREATE TABLE IF NOT EXISTS admin_sessions (
  token       TEXT PRIMARY KEY,
  user_id     UUID NOT NULL REFERENCES admin_users(id) ON DELETE CASCADE,
  expires_at  TIMESTAMPTZ NOT NULL,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_admin_sessions_user ON admin_sessions(user_id);
CREATE INDEX IF NOT EXISTS idx_admin_sessions_expires ON admin_sessions(expires_at);

-- -----------------------------------------------------------------------------
-- 11. REVIEWS
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS reviews (
  id                 TEXT PRIMARY KEY, -- "rev-1", "rev-2"...
  product_id         UUID REFERENCES products(id) ON DELETE SET NULL,
  name               TEXT NOT NULL,
  role               TEXT NOT NULL,
  workshop           TEXT NOT NULL,
  location           TEXT NOT NULL,
  rating             INT NOT NULL CHECK (rating BETWEEN 1 AND 5),
  review_date        TEXT NOT NULL,
  verified_buyer     BOOLEAN NOT NULL DEFAULT FALSE,
  equipment_name     TEXT NOT NULL,
  category           TEXT CHECK (
                       category IN (
                         'Garage Equipment', 'Diagnostics', 'Tyre & Wheel', 'EV Solutions', 'Spare Parts'
                       )
                     ),
  title              TEXT NOT NULL,
  comment            TEXT NOT NULL,
  badge              TEXT,
  avatar_initials    TEXT,
  avatar_color       TEXT,
  highlights         TEXT[] NOT NULL DEFAULT '{}',
  installation_tag   TEXT,
  helpful_count      INT NOT NULL DEFAULT 0 CHECK (helpful_count >= 0),
  is_published       BOOLEAN NOT NULL DEFAULT TRUE,
  created_at         TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_reviews_product ON reviews(product_id);
CREATE INDEX IF NOT EXISTS idx_reviews_published ON reviews(is_published) WHERE is_published = TRUE;

-- -----------------------------------------------------------------------------
-- 12. SITE SETTINGS (Single-Row Configuration Enforced)
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS site_settings (
  id                   INT PRIMARY KEY DEFAULT 1 CHECK (id = 1),
  site_name            TEXT NOT NULL DEFAULT 'PAGE International',
  tagline              TEXT NOT NULL DEFAULT 'Think Next. Build Better.',
  primary_color        TEXT NOT NULL DEFAULT '#dc2626',
  contact_email        TEXT NOT NULL DEFAULT 'info@pageinternational.com',
  contact_phone        TEXT NOT NULL DEFAULT '+880-1700-000000',
  hero_headline        TEXT NOT NULL DEFAULT 'THINK NEXT.',
  hero_subline         TEXT NOT NULL DEFAULT 'Built to Perform. Certified to Last.',
  announcement_bar     TEXT NOT NULL DEFAULT '',
  announcement_active  BOOLEAN NOT NULL DEFAULT FALSE,
  updated_at           TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

INSERT INTO site_settings (id) VALUES (1) ON CONFLICT (id) DO NOTHING;

DROP TRIGGER IF EXISTS trg_site_settings_updated_at ON site_settings;
CREATE TRIGGER trg_site_settings_updated_at
  BEFORE UPDATE ON site_settings
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();


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


-- =============================================================================
-- PAGE INTERNATIONAL (PIXEL-PERFECT) - SEED DATA MIGRATION 0002
-- Target Engine: PostgreSQL 15+
-- =============================================================================

-- -----------------------------------------------------------------------------
-- 1. SERVICE CENTERS (3 Hubs)
-- -----------------------------------------------------------------------------
INSERT INTO service_centers (id, name, area, address, rating, hours, services, map_x, map_y, is_active)
VALUES (
  'dhaka-tejgaon',
  'PAGE Equipment Hub — Tejgaon',
  'Dhaka',
  'Tejgaon Industrial Area, Dhaka',
  4.9,
  'Sat–Thu 9:00–19:00',
  ARRAY['Vehicle Lifts Demo', 'Tyre Bay Machinery', 'EV Tooling Benches', 'Spare Parts Pickup']::text[],
  48,
  42,
  TRUE
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  area = EXCLUDED.area,
  address = EXCLUDED.address,
  rating = EXCLUDED.rating,
  hours = EXCLUDED.hours,
  services = EXCLUDED.services,
  map_x = EXCLUDED.map_x,
  map_y = EXCLUDED.map_y;

INSERT INTO service_centers (id, name, area, address, rating, hours, services, map_x, map_y, is_active)
VALUES (
  'chattogram-port',
  'PAGE Regional Hub — Chattogram',
  'Chattogram',
  'Agrabad Commercial Area, Chattogram',
  4.8,
  'Sat–Thu 9:00–19:00',
  ARRAY['Heavy Machinery Stock', 'Diagnostic Scanner Demo', 'Wholesale Spares', 'Field Engineer Dispatch']::text[],
  76,
  74,
  TRUE
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  area = EXCLUDED.area,
  address = EXCLUDED.address,
  rating = EXCLUDED.rating,
  hours = EXCLUDED.hours,
  services = EXCLUDED.services,
  map_x = EXCLUDED.map_x,
  map_y = EXCLUDED.map_y;

INSERT INTO service_centers (id, name, area, address, rating, hours, services, map_x, map_y, is_active)
VALUES (
  'bogura-north',
  'PAGE North Hub — Bogura',
  'Bogura',
  'Sherpur Road Industrial Belt, Bogura',
  4.7,
  'Sat–Thu 9:00–18:00',
  ARRAY['Tyre Changers & Balancers', 'Commercial Fleet Spares', 'Lift Anchoring Support']::text[],
  38,
  32,
  TRUE
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  area = EXCLUDED.area,
  address = EXCLUDED.address,
  rating = EXCLUDED.rating,
  hours = EXCLUDED.hours,
  services = EXCLUDED.services,
  map_x = EXCLUDED.map_x,
  map_y = EXCLUDED.map_y;

-- -----------------------------------------------------------------------------
-- 2. SERVICES (8 Engineering Offerings)
-- -----------------------------------------------------------------------------
INSERT INTO services (slug, name, description, price_from, duration, sort_order, is_active)
VALUES (
  'general-service',
  'Turnkey Bay Planning',
  '2D/3D workshop layout modeling, electrical load, and equipment placement.',
  NULL,
  '3–5 days',
  1,
  TRUE
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  price_from = EXCLUDED.price_from,
  duration = EXCLUDED.duration,
  sort_order = EXCLUDED.sort_order;

INSERT INTO services (slug, name, description, price_from, duration, sort_order, is_active)
VALUES (
  'diagnostics',
  'Lift Anchoring & Rigging',
  'Chemical torque anchoring, hydraulic synchronization, and load testing.',
  NULL,
  '1–2 days',
  2,
  TRUE
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  price_from = EXCLUDED.price_from,
  duration = EXCLUDED.duration,
  sort_order = EXCLUDED.sort_order;

INSERT INTO services (slug, name, description, price_from, duration, sort_order, is_active)
VALUES (
  'ac-service',
  'Machinery Calibration',
  '3D aligner, digital balancer, and diagnostic tablet calibration.',
  NULL,
  'Half day',
  3,
  TRUE
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  price_from = EXCLUDED.price_from,
  duration = EXCLUDED.duration,
  sort_order = EXCLUDED.sort_order;

INSERT INTO services (slug, name, description, price_from, duration, sort_order, is_active)
VALUES (
  'brake-service',
  'Air Line Installation',
  'Aluminum pipe ring-main line, dryer, and drop installation.',
  NULL,
  '2–3 days',
  4,
  TRUE
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  price_from = EXCLUDED.price_from,
  duration = EXCLUDED.duration,
  sort_order = EXCLUDED.sort_order;

INSERT INTO services (slug, name, description, price_from, duration, sort_order, is_active)
VALUES (
  'wheel-alignment',
  'Technician Training',
  'Hands-on operator training for automated changers and lifts.',
  NULL,
  '1 day',
  5,
  TRUE
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  price_from = EXCLUDED.price_from,
  duration = EXCLUDED.duration,
  sort_order = EXCLUDED.sort_order;

INSERT INTO services (slug, name, description, price_from, duration, sort_order, is_active)
VALUES (
  'battery-service',
  'Annual Maintenance (AMC)',
  'Scheduled preventive maintenance contracts for workshop machinery.',
  NULL,
  'Quarterly',
  6,
  TRUE
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  price_from = EXCLUDED.price_from,
  duration = EXCLUDED.duration,
  sort_order = EXCLUDED.sort_order;

INSERT INTO services (slug, name, description, price_from, duration, sort_order, is_active)
VALUES (
  'ev-service',
  'EV Workshop Audit',
  'High-voltage safety zone setup, rescue hook, and PPE compliance.',
  NULL,
  '1–2 days',
  7,
  TRUE
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  price_from = EXCLUDED.price_from,
  duration = EXCLUDED.duration,
  sort_order = EXCLUDED.sort_order;

INSERT INTO services (slug, name, description, price_from, duration, sort_order, is_active)
VALUES (
  'adas-calibration',
  'Diagnostic Subscriptions',
  'Cloud protocol updates and ECU software renewals.',
  NULL,
  'Immediate',
  8,
  TRUE
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  price_from = EXCLUDED.price_from,
  duration = EXCLUDED.duration,
  sort_order = EXCLUDED.sort_order;

-- -----------------------------------------------------------------------------
-- 3. BOOKING SERVICE OPTIONS (6 Wizard Demonstration Options)
-- -----------------------------------------------------------------------------
INSERT INTO booking_service_options (id, name, description, sort_order, is_active)
VALUES (
  'bay-planning',
  'Turnkey Workshop Bay Planning & 2D/3D Layout',
  'Architectural consultation for new workshop investments or bay expansions.',
  1,
  TRUE
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  sort_order = EXCLUDED.sort_order;

INSERT INTO booking_service_options (id, name, description, sort_order, is_active)
VALUES (
  'lift-demo',
  'Vehicle Lift Machinery Demonstration',
  'Live demonstration of 2-post, 4-post, or scissor lifts under load.',
  2,
  TRUE
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  sort_order = EXCLUDED.sort_order;

INSERT INTO booking_service_options (id, name, description, sort_order, is_active)
VALUES (
  'tyre-demo',
  'Tyre Changer & 3D Wheel Alignment Demo',
  'Testing run-flat tyre mounting and computerized 4-wheel alignment cameras.',
  3,
  TRUE
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  sort_order = EXCLUDED.sort_order;

INSERT INTO booking_service_options (id, name, description, sort_order, is_active)
VALUES (
  'diag-demo',
  'Diagnostic Tablet & ADAS Calibration Live Trial',
  'Live ECU scanning, bidirectional tests, and radar/camera target calibration.',
  4,
  TRUE
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  sort_order = EXCLUDED.sort_order;

INSERT INTO booking_service_options (id, name, description, sort_order, is_active)
VALUES (
  'ev-audit',
  'EV Workshop Transition & 1000V Tooling Consultation',
  'High-voltage safety auditing, battery balancer inspection, and PPE setup.',
  5,
  TRUE
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  sort_order = EXCLUDED.sort_order;

INSERT INTO booking_service_options (id, name, description, sort_order, is_active)
VALUES (
  'installation',
  'Machinery Foundation Anchoring & Rigging Service',
  'Deployment of certified engineers to install and anchor workshop lifts on site.',
  6,
  TRUE
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  sort_order = EXCLUDED.sort_order;

-- -----------------------------------------------------------------------------
-- 4. PRODUCTS & INVENTORY (28 Catalog Items)
-- -----------------------------------------------------------------------------
INSERT INTO products (
  slug,
  sku,
  name,
  brand,
  category,
  mobility,
  price,
  old_price,
  image_url,
  fits,
  description,
  specs,
  is_equipment,
  requires_quote,
  rating,
  reviews_count,
  warehouse_qty,
  reorder_level,
  last_restocked
) VALUES (
  'heavy-duty-2-post-lift-4t',
  'TQ-LIFT-4000',
  'Heavy-Duty 2-Post Electro-Hydraulic Lift 4.0T',
  'Torq',
  'Garage Equipment',
  ARRAY['4-Wheeler', 'EV']::text[],
  285000,
  310000,
  '/src/assets/p-lift.jpg',
  ARRAY['Commercial Workshop Bay', 'Passenger Cars, SUVs & Light Vans']::text[],
  'Clear-floor electro-hydraulic 2-post lift with 4,000 kg capacity. Features automatic arm restraint locks, dual hydraulic synchronization cylinders, and CE-certified electromagnetic release safety latches for heavy commercial workshop use.',
  '[["Lifting Capacity","4,000 kg (4.0 Ton)"],["Max Lifting Height","1,900 mm"],["Min Lifting Height","100 mm"],["Overall Height","3,840 mm"],["Motor Power","2.2 kW / 3.0 HP"],["Power Supply","380V 3-Phase / 50Hz"],["Lifting Time","50 seconds"],["Warranty","24 months commercial warranty"]]'::jsonb,
  TRUE,
  TRUE,
  4.9,
  34,
  12,
  3,
  NOW() - INTERVAL '15 days'
) ON CONFLICT (slug) DO UPDATE SET
  sku = EXCLUDED.sku,
  name = EXCLUDED.name,
  brand = EXCLUDED.brand,
  category = EXCLUDED.category,
  mobility = EXCLUDED.mobility,
  price = EXCLUDED.price,
  old_price = EXCLUDED.old_price,
  image_url = EXCLUDED.image_url,
  fits = EXCLUDED.fits,
  description = EXCLUDED.description,
  specs = EXCLUDED.specs,
  is_equipment = EXCLUDED.is_equipment,
  requires_quote = EXCLUDED.requires_quote,
  rating = EXCLUDED.rating,
  reviews_count = EXCLUDED.reviews_count;

INSERT INTO products (
  slug,
  sku,
  name,
  brand,
  category,
  mobility,
  price,
  old_price,
  image_url,
  fits,
  description,
  specs,
  is_equipment,
  requires_quote,
  rating,
  reviews_count,
  warehouse_qty,
  reorder_level,
  last_restocked
) VALUES (
  'motorcycle-hydraulic-scissor-lift-500kg',
  'TQ-ML-500',
  'Motorcycle & Scooter Hydraulic Scissor Lift 500kg',
  'Torq',
  'Garage Equipment',
  ARRAY['2-Wheeler', 'EV']::text[],
  68000,
  75000,
  '/src/assets/p-moto-lift.jpg',
  ARRAY['Two-Wheeler Garages', 'Motorcycles, Scooters & E-Bikes']::text[],
  'Heavy-duty 2-wheeler workshop scissor lift table with pneumatic foot pedal control, integrated mechanical wheel vise, and drop-out tail plate for rear wheel servicing on motorcycles and scooters.',
  '[["Lifting Capacity","500 kg"],["Max Lifting Height","1,200 mm"],["Platform Dimensions","2,200 mm × 680 mm"],["Drive System","Pneumatic-Hydraulic Foot Pedal"],["Safety Mechanism","Multi-position mechanical lock bar"],["Wheel Clamp","Heavy-duty rubber-lined vise clamp included"],["Warranty","18 months commercial warranty"]]'::jsonb,
  TRUE,
  FALSE,
  4.8,
  19,
  12,
  3,
  NOW() - INTERVAL '15 days'
) ON CONFLICT (slug) DO UPDATE SET
  sku = EXCLUDED.sku,
  name = EXCLUDED.name,
  brand = EXCLUDED.brand,
  category = EXCLUDED.category,
  mobility = EXCLUDED.mobility,
  price = EXCLUDED.price,
  old_price = EXCLUDED.old_price,
  image_url = EXCLUDED.image_url,
  fits = EXCLUDED.fits,
  description = EXCLUDED.description,
  specs = EXCLUDED.specs,
  is_equipment = EXCLUDED.is_equipment,
  requires_quote = EXCLUDED.requires_quote,
  rating = EXCLUDED.rating,
  reviews_count = EXCLUDED.reviews_count;

INSERT INTO products (
  slug,
  sku,
  name,
  brand,
  category,
  mobility,
  price,
  old_price,
  image_url,
  fits,
  description,
  specs,
  is_equipment,
  requires_quote,
  rating,
  reviews_count,
  warehouse_qty,
  reorder_level,
  last_restocked
) VALUES (
  'pro-tyre-changer-assist-arm',
  'TQ-TC-9000',
  'Pro Automatic Tyre Changer with Dual Assist Arm',
  'Torq',
  'Tyre & Wheel',
  ARRAY['4-Wheeler', '3-Wheeler', 'EV']::text[],
  175000,
  195000,
  '/src/assets/p-tyre-changer.jpg',
  ARRAY['Tyre Service Centers', '10"–24" Passenger & Commercial Rims']::text[],
  'Heavy-duty commercial tyre changer equipped with pneumatic tilt-back column and dual power assist arms for effortless demounting of stiff run-flat and ultra-low-profile tyres without rim scratch.',
  '[["Clamping Range","10\"–24\" (Internal/External)"],["Max Wheel Diameter","1,040 mm"],["Max Wheel Width","355 mm (14\")"],["Working Pressure","8–10 bar (115–145 psi)"],["Motor Power","1.1 kW / 220V or 380V"],["Bead Breaker Force","2,500 kg"],["Warranty","18 months commercial warranty"]]'::jsonb,
  TRUE,
  TRUE,
  4.8,
  29,
  12,
  3,
  NOW() - INTERVAL '15 days'
) ON CONFLICT (slug) DO UPDATE SET
  sku = EXCLUDED.sku,
  name = EXCLUDED.name,
  brand = EXCLUDED.brand,
  category = EXCLUDED.category,
  mobility = EXCLUDED.mobility,
  price = EXCLUDED.price,
  old_price = EXCLUDED.old_price,
  image_url = EXCLUDED.image_url,
  fits = EXCLUDED.fits,
  description = EXCLUDED.description,
  specs = EXCLUDED.specs,
  is_equipment = EXCLUDED.is_equipment,
  requires_quote = EXCLUDED.requires_quote,
  rating = EXCLUDED.rating,
  reviews_count = EXCLUDED.reviews_count;

INSERT INTO products (
  slug,
  sku,
  name,
  brand,
  category,
  mobility,
  price,
  old_price,
  image_url,
  fits,
  description,
  specs,
  is_equipment,
  requires_quote,
  rating,
  reviews_count,
  warehouse_qty,
  reorder_level,
  last_restocked
) VALUES (
  'digital-wheel-balancer-laser',
  'AX-WB-900',
  'Microprocessor Digital Wheel Balancer with Laser',
  'Axion',
  'Tyre & Wheel',
  ARRAY['4-Wheeler', '3-Wheeler', 'EV']::text[],
  145000,
  NULL,
  '/src/assets/p-wheel-balancer.jpg',
  ARRAY['Automotive Workshop Tyre Bays', 'Light Commercial & Passenger Wheels']::text[],
  'High-precision digital wheel balancing system featuring automatic 3D distance and rim diameter sensor input, multi-mode alloy balancing cycles, and laser beam pointer for adhesive weight positioning.',
  '[["Rim Diameter","10\"–24\""],["Balancing Accuracy","±1 g"],["Cycle Time","7 seconds"],["Max Wheel Weight","65 kg"],["Shaft Diameter","40 mm high-grade steel"],["Display","Digital LED with interactive wheel graphic"],["Warranty","24 months warranty"]]'::jsonb,
  TRUE,
  TRUE,
  4.9,
  22,
  12,
  3,
  NOW() - INTERVAL '15 days'
) ON CONFLICT (slug) DO UPDATE SET
  sku = EXCLUDED.sku,
  name = EXCLUDED.name,
  brand = EXCLUDED.brand,
  category = EXCLUDED.category,
  mobility = EXCLUDED.mobility,
  price = EXCLUDED.price,
  old_price = EXCLUDED.old_price,
  image_url = EXCLUDED.image_url,
  fits = EXCLUDED.fits,
  description = EXCLUDED.description,
  specs = EXCLUDED.specs,
  is_equipment = EXCLUDED.is_equipment,
  requires_quote = EXCLUDED.requires_quote,
  rating = EXCLUDED.rating,
  reviews_count = EXCLUDED.reviews_count;

INSERT INTO products (
  slug,
  sku,
  name,
  brand,
  category,
  mobility,
  price,
  old_price,
  image_url,
  fits,
  description,
  specs,
  is_equipment,
  requires_quote,
  rating,
  reviews_count,
  warehouse_qty,
  reorder_level,
  last_restocked
) VALUES (
  'commercial-truck-bus-tyre-changer-56in',
  'AX-TC-5600',
  'Heavy-Duty Commercial Truck & Bus Tyre Changer 14"–56"',
  'Axion',
  'Tyre & Wheel',
  ARRAY['4-Wheeler']::text[],
  385000,
  420000,
  '/src/assets/p-tyre-changer.jpg',
  ARRAY['Commercial Fleet Depots', 'Truck, Bus, Tractor & Earthmover Wheels']::text[],
  'Universal electro-hydraulic commercial tyre changer designed for demounting and mounting tubed and tubeless truck, bus, agricultural, and industrial wheels up to 56 inches in diameter.',
  '[["Clamping Rim Capacity","14\"–56\" with extension clamps"],["Max Wheel Weight","1,500 kg"],["Max Wheel Diameter","2,300 mm"],["Max Wheel Width","1,050 mm"],["Hydraulic Motor","1.5 kW / 380V 3-Phase"],["Chuck Motor","2.2 kW dual speed"],["Warranty","24 months commercial warranty"]]'::jsonb,
  TRUE,
  TRUE,
  4.8,
  17,
  12,
  3,
  NOW() - INTERVAL '15 days'
) ON CONFLICT (slug) DO UPDATE SET
  sku = EXCLUDED.sku,
  name = EXCLUDED.name,
  brand = EXCLUDED.brand,
  category = EXCLUDED.category,
  mobility = EXCLUDED.mobility,
  price = EXCLUDED.price,
  old_price = EXCLUDED.old_price,
  image_url = EXCLUDED.image_url,
  fits = EXCLUDED.fits,
  description = EXCLUDED.description,
  specs = EXCLUDED.specs,
  is_equipment = EXCLUDED.is_equipment,
  requires_quote = EXCLUDED.requires_quote,
  rating = EXCLUDED.rating,
  reviews_count = EXCLUDED.reviews_count;

INSERT INTO products (
  slug,
  sku,
  name,
  brand,
  category,
  mobility,
  price,
  old_price,
  image_url,
  fits,
  description,
  specs,
  is_equipment,
  requires_quote,
  rating,
  reviews_count,
  warehouse_qty,
  reorder_level,
  last_restocked
) VALUES (
  'precision-3d-hd-wheel-alignment-system',
  'AX-WA-3DPRO',
  'High-Definition 3D Optical Wheel Alignment System',
  'Axion',
  'Tyre & Wheel',
  ARRAY['4-Wheeler', 'EV']::text[],
  430000,
  NULL,
  '/src/assets/p-wheel-balancer.jpg',
  ARRAY['Precision Alignment Bays', 'All Passenger & Light Commercial Vehicles']::text[],
  'Industrial high-definition dual-camera 3D wheel alignment system with passive target reflectors, automatic vehicle tracking beam, and comprehensive global OEM vehicle database.',
  '[["Camera Resolution","Dual 5.0 Megapixel Industrial CMOS Sensors"],["Measuring Accuracy","Camber: ±0.02°, Caster: ±0.04°, Toe: ±0.02°"],["Target Clamps","Non-contact rim-grip target clamps (11\"–25\")"],["Database","Over 45,000 OEM vehicle chassis specifications with annual updates"],["Software","3D animated alignment adjustment wizard on 32\" LED display"],["Warranty","24 months warranty with calibration certificate"]]'::jsonb,
  TRUE,
  TRUE,
  4.9,
  31,
  12,
  3,
  NOW() - INTERVAL '15 days'
) ON CONFLICT (slug) DO UPDATE SET
  sku = EXCLUDED.sku,
  name = EXCLUDED.name,
  brand = EXCLUDED.brand,
  category = EXCLUDED.category,
  mobility = EXCLUDED.mobility,
  price = EXCLUDED.price,
  old_price = EXCLUDED.old_price,
  image_url = EXCLUDED.image_url,
  fits = EXCLUDED.fits,
  description = EXCLUDED.description,
  specs = EXCLUDED.specs,
  is_equipment = EXCLUDED.is_equipment,
  requires_quote = EXCLUDED.requires_quote,
  rating = EXCLUDED.rating,
  reviews_count = EXCLUDED.reviews_count;

INSERT INTO products (
  slug,
  sku,
  name,
  brand,
  category,
  mobility,
  price,
  old_price,
  image_url,
  fits,
  description,
  specs,
  is_equipment,
  requires_quote,
  rating,
  reviews_count,
  warehouse_qty,
  reorder_level,
  last_restocked
) VALUES (
  'rotary-screw-air-compressor-10hp',
  'KW-SC-10HP',
  'Rotary Screw Air Compressor 10HP / 300L Tank',
  'Kraftwerk',
  'Garage Equipment',
  ARRAY['4-Wheeler', '2-Wheeler', '3-Wheeler', 'EV']::text[],
  240000,
  NULL,
  '/src/assets/p-compressor.jpg',
  ARRAY['Full Workshop Air Line Supply', 'Pneumatic Tools, Lifts & Changers']::text[],
  'Continuous-duty rotary screw compressor unit mounted on a 300L air receiver vessel with integrated refrigerated dryer and inline filtration. Engineered for 100% duty cycle commercial workshop pneumatic demands.',
  '[["Motor Power","7.5 kW / 10 HP"],["Working Pressure","10 bar (145 psi)"],["Air Delivery","1,050 L/min (37 CFM)"],["Tank Volume","300 Litres ASME Certified"],["Noise Level","65 dB(A) whisper quiet acoustic cabinet"],["Warranty","36 months on screw air end"]]'::jsonb,
  TRUE,
  TRUE,
  4.7,
  18,
  12,
  3,
  NOW() - INTERVAL '15 days'
) ON CONFLICT (slug) DO UPDATE SET
  sku = EXCLUDED.sku,
  name = EXCLUDED.name,
  brand = EXCLUDED.brand,
  category = EXCLUDED.category,
  mobility = EXCLUDED.mobility,
  price = EXCLUDED.price,
  old_price = EXCLUDED.old_price,
  image_url = EXCLUDED.image_url,
  fits = EXCLUDED.fits,
  description = EXCLUDED.description,
  specs = EXCLUDED.specs,
  is_equipment = EXCLUDED.is_equipment,
  requires_quote = EXCLUDED.requires_quote,
  rating = EXCLUDED.rating,
  reviews_count = EXCLUDED.reviews_count;

INSERT INTO products (
  slug,
  sku,
  name,
  brand,
  category,
  mobility,
  price,
  old_price,
  image_url,
  fits,
  description,
  specs,
  is_equipment,
  requires_quote,
  rating,
  reviews_count,
  warehouse_qty,
  reorder_level,
  last_restocked
) VALUES (
  'heavy-duty-4-post-alignment-lift-5t',
  'TQ-4PL-5000',
  'Heavy-Duty 4-Post Wheel Alignment Lift 5.0T',
  'Torq',
  'Garage Equipment',
  ARRAY['4-Wheeler', 'EV']::text[],
  360000,
  395000,
  '/src/assets/p-lift.jpg',
  ARRAY['Commercial Alignment Bays', 'Passenger Cars, SUVs & Light Trucks']::text[],
  'Precision 4-post commercial vehicle hoist with integrated slip plates, turntable recesses, and secondary pneumatic scissor jack beam for heavy-duty 3D wheel alignment operations.',
  '[["Lifting Capacity","5,000 kg (5.0 Ton)"],["Runway Length","5,100 mm"],["Lifting Height","1,850 mm"],["Drive System","Electro-hydraulic with cable synchronization"],["Safety Locks","Multi-position pneumatic mechanical ladder locks"],["Secondary Jacking Beam","3,000 kg pneumatic rolling jack included"],["Warranty","24 months commercial warranty"]]'::jsonb,
  TRUE,
  TRUE,
  4.9,
  26,
  12,
  3,
  NOW() - INTERVAL '15 days'
) ON CONFLICT (slug) DO UPDATE SET
  sku = EXCLUDED.sku,
  name = EXCLUDED.name,
  brand = EXCLUDED.brand,
  category = EXCLUDED.category,
  mobility = EXCLUDED.mobility,
  price = EXCLUDED.price,
  old_price = EXCLUDED.old_price,
  image_url = EXCLUDED.image_url,
  fits = EXCLUDED.fits,
  description = EXCLUDED.description,
  specs = EXCLUDED.specs,
  is_equipment = EXCLUDED.is_equipment,
  requires_quote = EXCLUDED.requires_quote,
  rating = EXCLUDED.rating,
  reviews_count = EXCLUDED.reviews_count;

INSERT INTO products (
  slug,
  sku,
  name,
  brand,
  category,
  mobility,
  price,
  old_price,
  image_url,
  fits,
  description,
  specs,
  is_equipment,
  requires_quote,
  rating,
  reviews_count,
  warehouse_qty,
  reorder_level,
  last_restocked
) VALUES (
  'ev-1000v-insulated-tool-kit',
  'KW-EV-1000V',
  '1000V VDE Insulated EV Safety Tool Kit (42-Piece)',
  'Kraftwerk',
  'EV Equipment',
  ARRAY['EV', '2-Wheeler', '3-Wheeler', '4-Wheeler']::text[],
  48500,
  54000,
  '/src/assets/p-ev-tools.jpg',
  ARRAY['EV Workshops', 'Electric Cars, E-Bikes, E-Rickshaws & Hybrids']::text[],
  'Certified IEC 60900 / DIN EN 60900 1000V insulated hand tool set in a heavy-duty IP67 protective case. Crucial safety equipment for mechanics and technicians working on high-voltage battery disconnects, inverters, and EV wiring.',
  '[["Insulation Rating","1000V AC / 1500V DC tested"],["Standard Compliance","IEC 60900:2018 / VDE GS"],["Tool Count","42 precision insulated tools"],["Case","Heavy-duty impact-resistant foam cut organizer"],["Included","Insulated ratchet, sockets (8-22mm), open wrenches, screwdrivers, pliers, torque wrench"],["Warranty","Lifetime warranty on steel forging"]]'::jsonb,
  FALSE,
  FALSE,
  4.9,
  41,
  45,
  8,
  NOW() - INTERVAL '15 days'
) ON CONFLICT (slug) DO UPDATE SET
  sku = EXCLUDED.sku,
  name = EXCLUDED.name,
  brand = EXCLUDED.brand,
  category = EXCLUDED.category,
  mobility = EXCLUDED.mobility,
  price = EXCLUDED.price,
  old_price = EXCLUDED.old_price,
  image_url = EXCLUDED.image_url,
  fits = EXCLUDED.fits,
  description = EXCLUDED.description,
  specs = EXCLUDED.specs,
  is_equipment = EXCLUDED.is_equipment,
  requires_quote = EXCLUDED.requires_quote,
  rating = EXCLUDED.rating,
  reviews_count = EXCLUDED.reviews_count;

INSERT INTO products (
  slug,
  sku,
  name,
  brand,
  category,
  mobility,
  price,
  old_price,
  image_url,
  fits,
  description,
  specs,
  is_equipment,
  requires_quote,
  rating,
  reviews_count,
  warehouse_qty,
  reorder_level,
  last_restocked
) VALUES (
  'ev-battery-pack-diagnostic-analyzer',
  'DT-EV-BT950',
  'High-Voltage EV Battery Pack Diagnostic Station',
  'Diagtek',
  'EV Equipment',
  ARRAY['EV', '3-Wheeler', '4-Wheeler']::text[],
  380000,
  NULL,
  '/src/assets/p-ev-battery-analyzer.jpg',
  ARRAY['EV Repair Centers', 'Lithium-ion Battery Modules & Packs']::text[],
  'Mobile commercial testing workstation for high-voltage traction batteries. Measures module State of Health (SOH), individual cell voltage consistency, internal resistance, and automated cell equalization balancing for 4W and 3W electric vehicles.',
  '[["Voltage Range","0–800V DC High Voltage"],["Cell Measurement","Up to 32S simultaneously with CAN/RS485 logging"],["Max Current","100A Charge / Discharge Testing"],["Interface","10.1\" Rugged Industrial Touchscreen"],["Protocols","CAN Bus, OBD2, K-Line, UDS EV Protocol"],["Safety","Emergency shutoff, reverse polarity, overtemp interlock"],["Warranty","24 months manufacturer warranty"]]'::jsonb,
  TRUE,
  TRUE,
  4.9,
  14,
  12,
  3,
  NOW() - INTERVAL '15 days'
) ON CONFLICT (slug) DO UPDATE SET
  sku = EXCLUDED.sku,
  name = EXCLUDED.name,
  brand = EXCLUDED.brand,
  category = EXCLUDED.category,
  mobility = EXCLUDED.mobility,
  price = EXCLUDED.price,
  old_price = EXCLUDED.old_price,
  image_url = EXCLUDED.image_url,
  fits = EXCLUDED.fits,
  description = EXCLUDED.description,
  specs = EXCLUDED.specs,
  is_equipment = EXCLUDED.is_equipment,
  requires_quote = EXCLUDED.requires_quote,
  rating = EXCLUDED.rating,
  reviews_count = EXCLUDED.reviews_count;

INSERT INTO products (
  slug,
  sku,
  name,
  brand,
  category,
  mobility,
  price,
  old_price,
  image_url,
  fits,
  description,
  specs,
  is_equipment,
  requires_quote,
  rating,
  reviews_count,
  warehouse_qty,
  reorder_level,
  last_restocked
) VALUES (
  'ev-traction-battery-cell-balancer',
  'VT-EQ-800',
  'Automated EV Battery Cell Equalizer & Module Balancer',
  'Voltis',
  'EV Equipment',
  ARRAY['EV', '3-Wheeler', '4-Wheeler']::text[],
  295000,
  NULL,
  '/src/assets/p-ev-battery-analyzer.jpg',
  ARRAY['EV Battery Service Garages', 'NMC, LFP & LTO Lithium Modules']::text[],
  'Professional high-precision multi-channel battery cell equalizer designed for workshop battery reconditioning, cell replacement matching, and active pack balancing.',
  '[["Channels","16 independent bi-directional balancing channels"],["Equalization Current","Up to 10A per channel programmable"],["Voltage Accuracy","±1 mV high-precision sampling"],["Cooling","Intelligent variable-speed forced-air thermal system"],["Protection","Overvoltage, undervoltage, reverse polarity, and short-circuit"],["Warranty","18 months manufacturer warranty"]]'::jsonb,
  TRUE,
  TRUE,
  4.8,
  16,
  12,
  3,
  NOW() - INTERVAL '15 days'
) ON CONFLICT (slug) DO UPDATE SET
  sku = EXCLUDED.sku,
  name = EXCLUDED.name,
  brand = EXCLUDED.brand,
  category = EXCLUDED.category,
  mobility = EXCLUDED.mobility,
  price = EXCLUDED.price,
  old_price = EXCLUDED.old_price,
  image_url = EXCLUDED.image_url,
  fits = EXCLUDED.fits,
  description = EXCLUDED.description,
  specs = EXCLUDED.specs,
  is_equipment = EXCLUDED.is_equipment,
  requires_quote = EXCLUDED.requires_quote,
  rating = EXCLUDED.rating,
  reviews_count = EXCLUDED.reviews_count;

INSERT INTO products (
  slug,
  sku,
  name,
  brand,
  category,
  mobility,
  price,
  old_price,
  image_url,
  fits,
  description,
  specs,
  is_equipment,
  requires_quote,
  rating,
  reviews_count,
  warehouse_qty,
  reorder_level,
  last_restocked
) VALUES (
  'high-voltage-ev-motor-insulation-tester',
  'DT-HV-5KV',
  '5000V High-Voltage EV Motor Insulation Tester & Megohmmeter',
  'Diagtek',
  'EV Equipment',
  ARRAY['EV', '2-Wheeler', '3-Wheeler', '4-Wheeler']::text[],
  115000,
  128000,
  '/src/assets/p-ev-tools.jpg',
  ARRAY['EV Powertrain Diagnostic Bays', 'Permanent Magnet AC & Induction Traction Motors']::text[],
  'High-voltage diagnostic insulation resistance tester certified for testing stator windings, inverter DC bus isolation, and chassis leak resistance up to 5kV DC.',
  '[["Test Voltages","250V, 500V, 1000V, 2500V, 5000V DC"],["Resistance Range","0.01 MΩ to 10.0 TΩ"],["Dielectric Discharge","Automatic polarization index (PI) and DAR calculation"],["Safety Rating","CAT IV 600V / CAT III 1000V EN 61010-1"],["Display","Dual backlit analog bargraph & digital LCD display"],["Warranty","24 months manufacturer warranty"]]'::jsonb,
  FALSE,
  FALSE,
  4.9,
  23,
  45,
  8,
  NOW() - INTERVAL '15 days'
) ON CONFLICT (slug) DO UPDATE SET
  sku = EXCLUDED.sku,
  name = EXCLUDED.name,
  brand = EXCLUDED.brand,
  category = EXCLUDED.category,
  mobility = EXCLUDED.mobility,
  price = EXCLUDED.price,
  old_price = EXCLUDED.old_price,
  image_url = EXCLUDED.image_url,
  fits = EXCLUDED.fits,
  description = EXCLUDED.description,
  specs = EXCLUDED.specs,
  is_equipment = EXCLUDED.is_equipment,
  requires_quote = EXCLUDED.requires_quote,
  rating = EXCLUDED.rating,
  reviews_count = EXCLUDED.reviews_count;

INSERT INTO products (
  slug,
  sku,
  name,
  brand,
  category,
  mobility,
  price,
  old_price,
  image_url,
  fits,
  description,
  specs,
  is_equipment,
  requires_quote,
  rating,
  reviews_count,
  warehouse_qty,
  reorder_level,
  last_restocked
) VALUES (
  'pro-obd2-diagnostic-scanner',
  'DT-PRO-5',
  'Pro OBD2 / CAN Universal Diagnostic Scanner Tablet',
  'Diagtek',
  'Diagnostic Equipment',
  ARRAY['4-Wheeler', 'EV']::text[],
  32500,
  36000,
  '/src/assets/p-scanner.jpg',
  ARRAY['Automotive Workshop Diagnostics', '1996+ OBD2 / CAN / EOBD Vehicles']::text[],
  'Multi-brand workshop diagnostic tool with 5" touchscreen. Read and clear manufacturer DTCs, live PID data graphing, automated service resets, EPB calibration, battery registration, and bi-directional component actuation.',
  '[["Screen","5.0\" IPS Color Touchscreen"],["Coverage","90+ Global vehicle manufacturers"],["Updates","2 Years Free Wi-Fi Software Updates"],["Protocols","CAN-FD, DoIP, ISO9141, KWP2000, J1850"],["Warranty","12 months commercial warranty"]]'::jsonb,
  FALSE,
  FALSE,
  4.7,
  71,
  45,
  8,
  NOW() - INTERVAL '15 days'
) ON CONFLICT (slug) DO UPDATE SET
  sku = EXCLUDED.sku,
  name = EXCLUDED.name,
  brand = EXCLUDED.brand,
  category = EXCLUDED.category,
  mobility = EXCLUDED.mobility,
  price = EXCLUDED.price,
  old_price = EXCLUDED.old_price,
  image_url = EXCLUDED.image_url,
  fits = EXCLUDED.fits,
  description = EXCLUDED.description,
  specs = EXCLUDED.specs,
  is_equipment = EXCLUDED.is_equipment,
  requires_quote = EXCLUDED.requires_quote,
  rating = EXCLUDED.rating,
  reviews_count = EXCLUDED.reviews_count;

INSERT INTO products (
  slug,
  sku,
  name,
  brand,
  category,
  mobility,
  price,
  old_price,
  image_url,
  fits,
  description,
  specs,
  is_equipment,
  requires_quote,
  rating,
  reviews_count,
  warehouse_qty,
  reorder_level,
  last_restocked
) VALUES (
  'bluetooth-obd-dongle',
  'DT-BT-1',
  'Heavy-Duty Workshop Bluetooth Diagnostic Interface',
  'Diagtek',
  'Diagnostic Equipment',
  ARRAY['4-Wheeler', 'EV']::text[],
  3900,
  NULL,
  '/src/assets/p-scanner.jpg',
  ARRAY['Technicians & Quick Diagnostics', 'Universal OBD2 Vehicles']::text[],
  'Pocket wireless adapter connecting vehicle OBD port directly to Android/iOS tablet or smartphone for rapid bay triage, readiness monitors, and fault code scanning.',
  '[["Connection","Bluetooth 5.0 Low Energy"],["Compatibility","Android / iOS / Windows PC"],["Supported Protocols","All standard OBD2 & CAN protocols"],["Warranty","12 months warranty"]]'::jsonb,
  FALSE,
  FALSE,
  4.4,
  203,
  45,
  8,
  NOW() - INTERVAL '15 days'
) ON CONFLICT (slug) DO UPDATE SET
  sku = EXCLUDED.sku,
  name = EXCLUDED.name,
  brand = EXCLUDED.brand,
  category = EXCLUDED.category,
  mobility = EXCLUDED.mobility,
  price = EXCLUDED.price,
  old_price = EXCLUDED.old_price,
  image_url = EXCLUDED.image_url,
  fits = EXCLUDED.fits,
  description = EXCLUDED.description,
  specs = EXCLUDED.specs,
  is_equipment = EXCLUDED.is_equipment,
  requires_quote = EXCLUDED.requires_quote,
  rating = EXCLUDED.rating,
  reviews_count = EXCLUDED.reviews_count;

INSERT INTO products (
  slug,
  sku,
  name,
  brand,
  category,
  mobility,
  price,
  old_price,
  image_url,
  fits,
  description,
  specs,
  is_equipment,
  requires_quote,
  rating,
  reviews_count,
  warehouse_qty,
  reorder_level,
  last_restocked
) VALUES (
  'commercial-adas-radar-camera-calibration-station',
  'DT-ADAS-CAL',
  'Commercial ADAS Radar & Camera Target Calibration Station',
  'Diagtek',
  'Diagnostic Equipment',
  ARRAY['4-Wheeler', 'EV']::text[],
  395000,
  NULL,
  '/src/assets/p-scanner.jpg',
  ARRAY['Collision Repair Centers & Windshield Replacement Hubs', 'Camera & Radar ADAS Systems']::text[],
  'Multi-target optical and millimeter-wave radar calibration rig for Lane Departure Warning (LDW), Adaptive Cruise Control (ACC), and Around View Monitoring (AVM) sensor calibration.',
  '[["Target Coverage","Toyota, Honda, Nissan, Hyundai, VAG, Mercedes, BMW"],["Laser Alignment","High-accuracy dual millimeter laser centering"],["Frame Structure","Heavy-duty aluminum alloy mobile crossbeam with micro-height adjuster"],["Compatibility","Integrates seamlessly with Diagtek Pro diagnostic tablets"],["Warranty","24 months commercial warranty with target boards"]]'::jsonb,
  TRUE,
  TRUE,
  4.9,
  19,
  12,
  3,
  NOW() - INTERVAL '15 days'
) ON CONFLICT (slug) DO UPDATE SET
  sku = EXCLUDED.sku,
  name = EXCLUDED.name,
  brand = EXCLUDED.brand,
  category = EXCLUDED.category,
  mobility = EXCLUDED.mobility,
  price = EXCLUDED.price,
  old_price = EXCLUDED.old_price,
  image_url = EXCLUDED.image_url,
  fits = EXCLUDED.fits,
  description = EXCLUDED.description,
  specs = EXCLUDED.specs,
  is_equipment = EXCLUDED.is_equipment,
  requires_quote = EXCLUDED.requires_quote,
  rating = EXCLUDED.rating,
  reviews_count = EXCLUDED.reviews_count;

INSERT INTO products (
  slug,
  sku,
  name,
  brand,
  category,
  mobility,
  price,
  old_price,
  image_url,
  fits,
  description,
  specs,
  is_equipment,
  requires_quote,
  rating,
  reviews_count,
  warehouse_qty,
  reorder_level,
  last_restocked
) VALUES (
  'heavy-duty-fleet-commercial-scanner-tablet',
  'DT-HD-10',
  'Commercial Fleet Heavy Truck & Bus Diagnostic Scanner 10"',
  'Diagtek',
  'Diagnostic Equipment',
  ARRAY['4-Wheeler']::text[],
  185000,
  205000,
  '/src/assets/p-scanner.jpg',
  ARRAY['Commercial Fleets, Bus Depots & Heavy Transport Garages', 'J1939, J1708, OBD Heavy Duty']::text[],
  'Ruggedized IP65 industrial 10-inch Android diagnostic tablet with full bi-directional actuation, DPF regeneration, SCR/AdBlue reset, cylinder cut-out, and injector coding for commercial diesel engines.',
  '[["Hardware","10.1\" Sunlight-Readable Gorilla Glass Display, 8-Core CPU"],["Protocols","SAE J1939, SAE J1708, J1587, ISO 15765-4, CAN 2.0"],["Engine Coverage","Cummins, Isuzu, Hino, Mitsubishi Fuso, Caterpillar, Detroit Diesel, Volvo"],["Battery Life","12,000 mAh rechargeable lithium pack (10+ hours continuous use)"],["Warranty","24 months commercial warranty + 2 years free software updates"]]'::jsonb,
  FALSE,
  FALSE,
  4.8,
  35,
  45,
  8,
  NOW() - INTERVAL '15 days'
) ON CONFLICT (slug) DO UPDATE SET
  sku = EXCLUDED.sku,
  name = EXCLUDED.name,
  brand = EXCLUDED.brand,
  category = EXCLUDED.category,
  mobility = EXCLUDED.mobility,
  price = EXCLUDED.price,
  old_price = EXCLUDED.old_price,
  image_url = EXCLUDED.image_url,
  fits = EXCLUDED.fits,
  description = EXCLUDED.description,
  specs = EXCLUDED.specs,
  is_equipment = EXCLUDED.is_equipment,
  requires_quote = EXCLUDED.requires_quote,
  rating = EXCLUDED.rating,
  reviews_count = EXCLUDED.reviews_count;

INSERT INTO products (
  slug,
  sku,
  name,
  brand,
  category,
  mobility,
  price,
  old_price,
  image_url,
  fits,
  description,
  specs,
  is_equipment,
  requires_quote,
  rating,
  reviews_count,
  warehouse_qty,
  reorder_level,
  last_restocked
) VALUES (
  'ceramic-brake-pad-set-front',
  'SL-BP-2210',
  'Commercial Grade Ceramic Brake Pad Set — Front Axle',
  'Stopline',
  'Brakes',
  ARRAY['4-Wheeler']::text[],
  4850,
  5600,
  '/src/assets/p-brakepads.jpg',
  ARRAY['Toyota Corolla 2014–2022', 'Toyota Axio 2015–2023', 'Toyota Allion']::text[],
  'Low-dust, high-temperature ceramic friction compound formulated for long rotor life and consistent coefficient of friction under heavy stop-and-go fleet driving. Chamfered with multi-layer noise damping shims.',
  '[["Compound","High-Friction Ceramic Formulation"],["Position","Front Axle"],["Backing Plate","Anti-Corrosion Powder Coated"],["Wear Sensor","Included in pack"],["Warranty","12 months / 20,000 km warranty"]]'::jsonb,
  FALSE,
  FALSE,
  4.8,
  214,
  45,
  8,
  NOW() - INTERVAL '15 days'
) ON CONFLICT (slug) DO UPDATE SET
  sku = EXCLUDED.sku,
  name = EXCLUDED.name,
  brand = EXCLUDED.brand,
  category = EXCLUDED.category,
  mobility = EXCLUDED.mobility,
  price = EXCLUDED.price,
  old_price = EXCLUDED.old_price,
  image_url = EXCLUDED.image_url,
  fits = EXCLUDED.fits,
  description = EXCLUDED.description,
  specs = EXCLUDED.specs,
  is_equipment = EXCLUDED.is_equipment,
  requires_quote = EXCLUDED.requires_quote,
  rating = EXCLUDED.rating,
  reviews_count = EXCLUDED.reviews_count;

INSERT INTO products (
  slug,
  sku,
  name,
  brand,
  category,
  mobility,
  price,
  old_price,
  image_url,
  fits,
  description,
  specs,
  is_equipment,
  requires_quote,
  rating,
  reviews_count,
  warehouse_qty,
  reorder_level,
  last_restocked
) VALUES (
  'ceramic-brake-pad-set-rear',
  'SL-BP-2280',
  'Commercial Grade Ceramic Brake Pad Set — Rear Axle',
  'Stopline',
  'Brakes',
  ARRAY['4-Wheeler']::text[],
  4200,
  NULL,
  '/src/assets/p-brakepads.jpg',
  ARRAY['Honda Civic 2016–2021', 'Honda CR-V 2017–2022']::text[],
  'Rear-axle ceramic pads engineered for passenger cars and light commercial applications. Minimum dust and zero rotor scoring.',
  '[["Compound","Ceramic Low-Metallic"],["Position","Rear Axle"],["Hardware","Stainless steel abutment clips included"],["Warranty","12 months warranty"]]'::jsonb,
  FALSE,
  FALSE,
  4.7,
  132,
  45,
  8,
  NOW() - INTERVAL '15 days'
) ON CONFLICT (slug) DO UPDATE SET
  sku = EXCLUDED.sku,
  name = EXCLUDED.name,
  brand = EXCLUDED.brand,
  category = EXCLUDED.category,
  mobility = EXCLUDED.mobility,
  price = EXCLUDED.price,
  old_price = EXCLUDED.old_price,
  image_url = EXCLUDED.image_url,
  fits = EXCLUDED.fits,
  description = EXCLUDED.description,
  specs = EXCLUDED.specs,
  is_equipment = EXCLUDED.is_equipment,
  requires_quote = EXCLUDED.requires_quote,
  rating = EXCLUDED.rating,
  reviews_count = EXCLUDED.reviews_count;

INSERT INTO products (
  slug,
  sku,
  name,
  brand,
  category,
  mobility,
  price,
  old_price,
  image_url,
  fits,
  description,
  specs,
  is_equipment,
  requires_quote,
  rating,
  reviews_count,
  warehouse_qty,
  reorder_level,
  last_restocked
) VALUES (
  'high-carbon-ventilated-brake-rotors-front',
  'SL-DR-4100',
  'Commercial High-Carbon Ventilated Front Brake Disc Rotors (Pair)',
  'Stopline',
  'Brakes',
  ARRAY['4-Wheeler']::text[],
  9800,
  11200,
  '/src/assets/p-brakepads.jpg',
  ARRAY['Toyota HiAce 2010–2023', 'Toyota Premio / Allion', 'Nissan NV200']::text[],
  'High-carbon grey cast iron brake disc pair engineered with directional cooling vanes for thermal warp resistance, noise suppression, and long service life in commercial delivery fleets.',
  '[["Material","High-Carbon G3000 Grey Cast Iron"],["Vane Type","Curved Directional Ventilation Vanes"],["Coating","Geomet anti-rust zinc flake surface treatment"],["Runout Tolerance","< 0.02 mm precision balanced"],["Warranty","12 months / 30,000 km warranty"]]'::jsonb,
  FALSE,
  FALSE,
  4.8,
  94,
  45,
  8,
  NOW() - INTERVAL '15 days'
) ON CONFLICT (slug) DO UPDATE SET
  sku = EXCLUDED.sku,
  name = EXCLUDED.name,
  brand = EXCLUDED.brand,
  category = EXCLUDED.category,
  mobility = EXCLUDED.mobility,
  price = EXCLUDED.price,
  old_price = EXCLUDED.old_price,
  image_url = EXCLUDED.image_url,
  fits = EXCLUDED.fits,
  description = EXCLUDED.description,
  specs = EXCLUDED.specs,
  is_equipment = EXCLUDED.is_equipment,
  requires_quote = EXCLUDED.requires_quote,
  rating = EXCLUDED.rating,
  reviews_count = EXCLUDED.reviews_count;

INSERT INTO products (
  slug,
  sku,
  name,
  brand,
  category,
  mobility,
  price,
  old_price,
  image_url,
  fits,
  description,
  specs,
  is_equipment,
  requires_quote,
  rating,
  reviews_count,
  warehouse_qty,
  reorder_level,
  last_restocked
) VALUES (
  'synthetic-dot4-high-boiling-brake-fluid-12l',
  'SL-BF-DOT4-12',
  'Synthetic DOT 4 High-Boiling Brake Fluid (Commercial Case 12×1L)',
  'Stopline',
  'Brakes',
  ARRAY['4-Wheeler', '2-Wheeler', '3-Wheeler']::text[],
  11400,
  NULL,
  '/src/assets/p-oil.jpg',
  ARRAY['All Hydraulic Disc & Drum Brake Systems', 'ABS, ESP & TCS Equipped Fleets']::text[],
  'Premium glycol-ether synthetic hydraulic brake fluid with high dry and wet boiling points to prevent vapor lock and pedal fade under severe braking conditions in commercial service.',
  '[["Standard","DOT 4 / SAE J1704 / ISO 4925 Class 4"],["Dry Boiling Point","265°C (509°F) minimum"],["Wet Boiling Point","165°C (329°F) minimum"],["Packaging","Workshop case of 12 sealed 1-Litre bottles"],["Corrosion Inhibitor","Protects cast iron, steel, copper, and aluminum brake lines"]]'::jsonb,
  FALSE,
  FALSE,
  4.9,
  118,
  45,
  8,
  NOW() - INTERVAL '15 days'
) ON CONFLICT (slug) DO UPDATE SET
  sku = EXCLUDED.sku,
  name = EXCLUDED.name,
  brand = EXCLUDED.brand,
  category = EXCLUDED.category,
  mobility = EXCLUDED.mobility,
  price = EXCLUDED.price,
  old_price = EXCLUDED.old_price,
  image_url = EXCLUDED.image_url,
  fits = EXCLUDED.fits,
  description = EXCLUDED.description,
  specs = EXCLUDED.specs,
  is_equipment = EXCLUDED.is_equipment,
  requires_quote = EXCLUDED.requires_quote,
  rating = EXCLUDED.rating,
  reviews_count = EXCLUDED.reviews_count;

INSERT INTO products (
  slug,
  sku,
  name,
  brand,
  category,
  mobility,
  price,
  old_price,
  image_url,
  fits,
  description,
  specs,
  is_equipment,
  requires_quote,
  rating,
  reviews_count,
  warehouse_qty,
  reorder_level,
  last_restocked
) VALUES (
  'agm-battery-70ah',
  'VT-AGM-70',
  'Heavy-Duty AGM Start-Stop Battery 70Ah / 760 CCA',
  'Voltis',
  'Batteries',
  ARRAY['4-Wheeler', 'EV']::text[],
  18900,
  NULL,
  '/src/assets/p-battery.jpg',
  ARRAY['Honda Vezel Hybrid', 'Toyota Premio', 'European Start-Stop Models']::text[],
  'Absorbent Glass Mat (AGM) battery engineered for commercial vehicles, start-stop regenerative braking systems, and high electronic accessory loads.',
  '[["Capacity","70 Ah"],["Cold Cranking Amps (CCA)","760 A (EN standard)"],["Chemistry","VRLA / AGM Sealed Maintenance-Free"],["Cycle Life","3x standard flooded battery life"],["Warranty","24 months commercial replacement warranty"]]'::jsonb,
  FALSE,
  FALSE,
  4.8,
  96,
  3,
  8,
  NOW() - INTERVAL '15 days'
) ON CONFLICT (slug) DO UPDATE SET
  sku = EXCLUDED.sku,
  name = EXCLUDED.name,
  brand = EXCLUDED.brand,
  category = EXCLUDED.category,
  mobility = EXCLUDED.mobility,
  price = EXCLUDED.price,
  old_price = EXCLUDED.old_price,
  image_url = EXCLUDED.image_url,
  fits = EXCLUDED.fits,
  description = EXCLUDED.description,
  specs = EXCLUDED.specs,
  is_equipment = EXCLUDED.is_equipment,
  requires_quote = EXCLUDED.requires_quote,
  rating = EXCLUDED.rating,
  reviews_count = EXCLUDED.reviews_count;

INSERT INTO products (
  slug,
  sku,
  name,
  brand,
  category,
  mobility,
  price,
  old_price,
  image_url,
  fits,
  description,
  specs,
  is_equipment,
  requires_quote,
  rating,
  reviews_count,
  warehouse_qty,
  reorder_level,
  last_restocked
) VALUES (
  'efb-battery-60ah',
  'VT-EFB-60',
  'Enhanced Flooded EFB Battery 60Ah / 560 CCA',
  'Voltis',
  'Batteries',
  ARRAY['4-Wheeler', '3-Wheeler']::text[],
  13400,
  NULL,
  '/src/assets/p-battery.jpg',
  ARRAY['Toyota Corolla', 'Commercial 3-Wheelers', 'Passenger Cars']::text[],
  'Enhanced flooded battery designed for entry-level start-stop vehicles, commercial delivery fleets, and high-temperature operating conditions.',
  '[["Capacity","60 Ah"],["Cold Cranking Amps (CCA)","560 A"],["Type","Enhanced Flooded (EFB)"],["Warranty","18 months warranty"]]'::jsonb,
  FALSE,
  FALSE,
  4.6,
  58,
  45,
  8,
  NOW() - INTERVAL '15 days'
) ON CONFLICT (slug) DO UPDATE SET
  sku = EXCLUDED.sku,
  name = EXCLUDED.name,
  brand = EXCLUDED.brand,
  category = EXCLUDED.category,
  mobility = EXCLUDED.mobility,
  price = EXCLUDED.price,
  old_price = EXCLUDED.old_price,
  image_url = EXCLUDED.image_url,
  fits = EXCLUDED.fits,
  description = EXCLUDED.description,
  specs = EXCLUDED.specs,
  is_equipment = EXCLUDED.is_equipment,
  requires_quote = EXCLUDED.requires_quote,
  rating = EXCLUDED.rating,
  reviews_count = EXCLUDED.reviews_count;

INSERT INTO products (
  slug,
  sku,
  name,
  brand,
  category,
  mobility,
  price,
  old_price,
  image_url,
  fits,
  description,
  specs,
  is_equipment,
  requires_quote,
  rating,
  reviews_count,
  warehouse_qty,
  reorder_level,
  last_restocked
) VALUES (
  'commercial-fleet-heavy-duty-battery-200ah',
  'VT-HD-200',
  'Commercial Heavy Fleet & Bus Battery 200Ah / 1200 CCA',
  'Voltis',
  'Batteries',
  ARRAY['4-Wheeler']::text[],
  28500,
  31000,
  '/src/assets/p-battery.jpg',
  ARRAY['Commercial Buses, Heavy Cargo Haulers & Generators', 'Hino, Isuzu, Tata, Ashok Leyland']::text[],
  'Commercial heavy-duty lead-calcium battery with vibration-resistant anchor bonded plates and reinforced labyrinth lid designed for long service life in extreme tropical operating climates.',
  '[["Capacity","200 Ah @ 20Hr Rate"],["Cold Cranking Amps (CCA)","1,200 A (EN)"],["Terminal Type","Standard Heavy Commercial A-Post"],["Vibration Resistance","V3 vibration proof certified"],["Warranty","18 months commercial warranty"]]'::jsonb,
  FALSE,
  FALSE,
  4.8,
  77,
  45,
  8,
  NOW() - INTERVAL '15 days'
) ON CONFLICT (slug) DO UPDATE SET
  sku = EXCLUDED.sku,
  name = EXCLUDED.name,
  brand = EXCLUDED.brand,
  category = EXCLUDED.category,
  mobility = EXCLUDED.mobility,
  price = EXCLUDED.price,
  old_price = EXCLUDED.old_price,
  image_url = EXCLUDED.image_url,
  fits = EXCLUDED.fits,
  description = EXCLUDED.description,
  specs = EXCLUDED.specs,
  is_equipment = EXCLUDED.is_equipment,
  requires_quote = EXCLUDED.requires_quote,
  rating = EXCLUDED.rating,
  reviews_count = EXCLUDED.reviews_count;

INSERT INTO products (
  slug,
  sku,
  name,
  brand,
  category,
  mobility,
  price,
  old_price,
  image_url,
  fits,
  description,
  specs,
  is_equipment,
  requires_quote,
  rating,
  reviews_count,
  warehouse_qty,
  reorder_level,
  last_restocked
) VALUES (
  'lifepo4-auxiliary-lithium-battery-100ah',
  'VT-LFP-100',
  'Deep-Cycle LiFePO4 Lithium Auxiliary Battery 12V 100Ah',
  'Voltis',
  'Batteries',
  ARRAY['EV', '3-Wheeler', '4-Wheeler']::text[],
  38500,
  NULL,
  '/src/assets/p-battery.jpg',
  ARRAY['Electric 3-Wheelers, Workshop Test Benches & Service Shuttles']::text[],
  'Grade-A prismatic lithium iron phosphate auxiliary battery with built-in 100A smart Bluetooth BMS for cell monitoring, thermal protection, and 4,000+ deep-discharge cycles.',
  '[["Nominal Voltage","12.8V DC"],["Capacity","100 Ah (1,280 Wh)"],["Cycle Life","4,000+ cycles @ 80% DOD"],["BMS","Integrated Smart Bluetooth BMS with mobile telemetry app"],["Weight","11.2 kg (60% lighter than equivalent lead-acid)"],["Warranty","36 months manufacturer warranty"]]'::jsonb,
  FALSE,
  FALSE,
  4.9,
  43,
  45,
  8,
  NOW() - INTERVAL '15 days'
) ON CONFLICT (slug) DO UPDATE SET
  sku = EXCLUDED.sku,
  name = EXCLUDED.name,
  brand = EXCLUDED.brand,
  category = EXCLUDED.category,
  mobility = EXCLUDED.mobility,
  price = EXCLUDED.price,
  old_price = EXCLUDED.old_price,
  image_url = EXCLUDED.image_url,
  fits = EXCLUDED.fits,
  description = EXCLUDED.description,
  specs = EXCLUDED.specs,
  is_equipment = EXCLUDED.is_equipment,
  requires_quote = EXCLUDED.requires_quote,
  rating = EXCLUDED.rating,
  reviews_count = EXCLUDED.reviews_count;

INSERT INTO products (
  slug,
  sku,
  name,
  brand,
  category,
  mobility,
  price,
  old_price,
  image_url,
  fits,
  description,
  specs,
  is_equipment,
  requires_quote,
  rating,
  reviews_count,
  warehouse_qty,
  reorder_level,
  last_restocked
) VALUES (
  'synthetic-engine-oil-5w30-4l',
  'LX-5W30-4',
  'Full Synthetic Engine Oil 5W-30 (4L Commercial Pack)',
  'Lubrix',
  'Lubricants & Fluids',
  ARRAY['4-Wheeler', '3-Wheeler']::text[],
  5200,
  NULL,
  '/src/assets/p-oil.jpg',
  ARRAY['Petrol & Turbo Diesel Engines', 'Toyota, Honda, Nissan, Mitsubishi']::text[],
  'Advanced PAO full synthetic formulation engineered for thermal stability, anti-wear valve-train protection, and sludge control in commercial service operations.',
  '[["Viscosity Grade","SAE 5W-30"],["Specifications","API SP / ILSAC GF-6A / ACEA C3"],["Base Stock","Full Synthetic Group III / PAO"],["Volume","4 Litres (Also available in 208L workshop drums)"]]'::jsonb,
  FALSE,
  FALSE,
  4.9,
  388,
  45,
  8,
  NOW() - INTERVAL '15 days'
) ON CONFLICT (slug) DO UPDATE SET
  sku = EXCLUDED.sku,
  name = EXCLUDED.name,
  brand = EXCLUDED.brand,
  category = EXCLUDED.category,
  mobility = EXCLUDED.mobility,
  price = EXCLUDED.price,
  old_price = EXCLUDED.old_price,
  image_url = EXCLUDED.image_url,
  fits = EXCLUDED.fits,
  description = EXCLUDED.description,
  specs = EXCLUDED.specs,
  is_equipment = EXCLUDED.is_equipment,
  requires_quote = EXCLUDED.requires_quote,
  rating = EXCLUDED.rating,
  reviews_count = EXCLUDED.reviews_count;

INSERT INTO products (
  slug,
  sku,
  name,
  brand,
  category,
  mobility,
  price,
  old_price,
  image_url,
  fits,
  description,
  specs,
  is_equipment,
  requires_quote,
  rating,
  reviews_count,
  warehouse_qty,
  reorder_level,
  last_restocked
) VALUES (
  'synthetic-engine-oil-0w20-4l',
  'LX-0W20-4',
  'Hybrid Low-Viscosity Engine Oil 0W-20 (4L Pack)',
  'Lubrix',
  'Lubricants & Fluids',
  ARRAY['4-Wheeler', 'EV']::text[],
  5600,
  NULL,
  '/src/assets/p-oil.jpg',
  ARRAY['Toyota Aqua, Prius, Honda Hybrid Platforms']::text[],
  'Ultra-low viscosity synthetic fluid tailored for hybrid electric powertrains with frequent cold stop-start ignition cycles.',
  '[["Viscosity Grade","SAE 0W-20"],["Standard","API SP Resource Conserving"],["Volume","4 Litres"]]'::jsonb,
  FALSE,
  FALSE,
  4.8,
  144,
  0,
  8,
  NOW() - INTERVAL '15 days'
) ON CONFLICT (slug) DO UPDATE SET
  sku = EXCLUDED.sku,
  name = EXCLUDED.name,
  brand = EXCLUDED.brand,
  category = EXCLUDED.category,
  mobility = EXCLUDED.mobility,
  price = EXCLUDED.price,
  old_price = EXCLUDED.old_price,
  image_url = EXCLUDED.image_url,
  fits = EXCLUDED.fits,
  description = EXCLUDED.description,
  specs = EXCLUDED.specs,
  is_equipment = EXCLUDED.is_equipment,
  requires_quote = EXCLUDED.requires_quote,
  rating = EXCLUDED.rating,
  reviews_count = EXCLUDED.reviews_count;

INSERT INTO products (
  slug,
  sku,
  name,
  brand,
  category,
  mobility,
  price,
  old_price,
  image_url,
  fits,
  description,
  specs,
  is_equipment,
  requires_quote,
  rating,
  reviews_count,
  warehouse_qty,
  reorder_level,
  last_restocked
) VALUES (
  'heavy-duty-diesel-engine-oil-15w40-20l',
  'LX-15W40-20',
  'Commercial Heavy-Duty Diesel Engine Oil 15W-40 (20L Pail)',
  'Lubrix',
  'Lubricants & Fluids',
  ARRAY['4-Wheeler', '3-Wheeler']::text[],
  14800,
  16500,
  '/src/assets/p-oil.jpg',
  ARRAY['Commercial Fleet Vans, Light Trucks, Buses & Heavy Equipment']::text[],
  'Heavy-duty diesel engine oil formulated with high soot-dispersancy additives and shear-stable polymers for extended oil-drain intervals in commercial transport operations.',
  '[["Viscosity Grade","SAE 15W-40"],["Specifications","API CK-4 / CJ-4 / CI-4 PLUS / ACEA E9"],["Base Stock","Hydro-cracked Group II+ Mineral Formulation"],["Packaging","20 Litre industrial workshop pail with pour spout"],["TBN","10.2 mg KOH/g for acid neutralization"]]'::jsonb,
  FALSE,
  FALSE,
  4.9,
  162,
  45,
  8,
  NOW() - INTERVAL '15 days'
) ON CONFLICT (slug) DO UPDATE SET
  sku = EXCLUDED.sku,
  name = EXCLUDED.name,
  brand = EXCLUDED.brand,
  category = EXCLUDED.category,
  mobility = EXCLUDED.mobility,
  price = EXCLUDED.price,
  old_price = EXCLUDED.old_price,
  image_url = EXCLUDED.image_url,
  fits = EXCLUDED.fits,
  description = EXCLUDED.description,
  specs = EXCLUDED.specs,
  is_equipment = EXCLUDED.is_equipment,
  requires_quote = EXCLUDED.requires_quote,
  rating = EXCLUDED.rating,
  reviews_count = EXCLUDED.reviews_count;

INSERT INTO products (
  slug,
  sku,
  name,
  brand,
  category,
  mobility,
  price,
  old_price,
  image_url,
  fits,
  description,
  specs,
  is_equipment,
  requires_quote,
  rating,
  reviews_count,
  warehouse_qty,
  reorder_level,
  last_restocked
) VALUES (
  'universal-full-synthetic-atf-cvt-fluid-4l',
  'LX-ATFCVT-4',
  'Multi-Vehicle Full Synthetic ATF & CVT Transmission Fluid 4L',
  'Lubrix',
  'Lubricants & Fluids',
  ARRAY['4-Wheeler', 'EV']::text[],
  6400,
  NULL,
  '/src/assets/p-oil.jpg',
  ARRAY['Toyota, Honda, Nissan, Mitsubishi Automatic & CVT Transmissions']::text[],
  'Universal full synthetic transmission fluid engineered with friction-durability modifiers for smooth torque-converter lockup and anti-shudder belt grip in modern automatic and CVT gearboxes.',
  '[["Compatibility","Toyota WS/T-IV, Honda ATF-Z1/DW-1, Nissan Matic-D/J/S & CVT NS-2/NS-3"],["Base Stock","Full Synthetic Group IV PAO"],["Volume","4 Litres"],["Viscosity Index","175 high viscosity index for thermal resistance"]]'::jsonb,
  FALSE,
  FALSE,
  4.8,
  110,
  45,
  8,
  NOW() - INTERVAL '15 days'
) ON CONFLICT (slug) DO UPDATE SET
  sku = EXCLUDED.sku,
  name = EXCLUDED.name,
  brand = EXCLUDED.brand,
  category = EXCLUDED.category,
  mobility = EXCLUDED.mobility,
  price = EXCLUDED.price,
  old_price = EXCLUDED.old_price,
  image_url = EXCLUDED.image_url,
  fits = EXCLUDED.fits,
  description = EXCLUDED.description,
  specs = EXCLUDED.specs,
  is_equipment = EXCLUDED.is_equipment,
  requires_quote = EXCLUDED.requires_quote,
  rating = EXCLUDED.rating,
  reviews_count = EXCLUDED.reviews_count;

-- -----------------------------------------------------------------------------
-- 5. ADMIN USERS (Standard Initial Accounts with bcrypt password "admin123")
-- -----------------------------------------------------------------------------
INSERT INTO admin_users (email, password_hash, name, role, status, created_at, last_login)
VALUES (
  'admin@pageinternational.com',
  crypt('admin123', gen_salt('bf')),
  'Master Administrator',
  'admin',
  'active',
  NOW() - INTERVAL '30 days',
  NOW() - INTERVAL '1 day'
) ON CONFLICT (email) DO UPDATE SET
  name = EXCLUDED.name,
  role = EXCLUDED.role,
  status = EXCLUDED.status;

INSERT INTO admin_users (email, password_hash, name, role, status, created_at, last_login)
VALUES (
  'rafiq@pageinternational.com',
  crypt('admin123', gen_salt('bf')),
  'Rafiq Hossain',
  'admin',
  'active',
  NOW() - INTERVAL '30 days',
  NOW() - INTERVAL '1 day'
) ON CONFLICT (email) DO UPDATE SET
  name = EXCLUDED.name,
  role = EXCLUDED.role,
  status = EXCLUDED.status;

INSERT INTO admin_users (email, password_hash, name, role, status, created_at, last_login)
VALUES (
  'nusrat@pageinternational.com',
  crypt('admin123', gen_salt('bf')),
  'Nusrat Akhter',
  'product_manager',
  'active',
  NOW() - INTERVAL '30 days',
  NOW() - INTERVAL '1 day'
) ON CONFLICT (email) DO UPDATE SET
  name = EXCLUDED.name,
  role = EXCLUDED.role,
  status = EXCLUDED.status;

INSERT INTO admin_users (email, password_hash, name, role, status, created_at, last_login)
VALUES (
  'staff@pageinternational.com',
  crypt('admin123', gen_salt('bf')),
  'Tanvir Ahmed',
  'staff',
  'active',
  NOW() - INTERVAL '30 days',
  NOW() - INTERVAL '1 day'
) ON CONFLICT (email) DO UPDATE SET
  name = EXCLUDED.name,
  role = EXCLUDED.role,
  status = EXCLUDED.status;

INSERT INTO admin_users (email, password_hash, name, role, status, created_at, last_login)
VALUES (
  'kamal@pageinternational.com',
  crypt('admin123', gen_salt('bf')),
  'Kamal Uddin',
  'viewer',
  'active',
  NOW() - INTERVAL '30 days',
  NOW() - INTERVAL '1 day'
) ON CONFLICT (email) DO UPDATE SET
  name = EXCLUDED.name,
  role = EXCLUDED.role,
  status = EXCLUDED.status;

-- -----------------------------------------------------------------------------
-- 6. REVIEWS (9 Verified Customer Reviews)
-- -----------------------------------------------------------------------------
INSERT INTO reviews (
  id,
  name,
  role,
  workshop,
  location,
  rating,
  review_date,
  verified_buyer,
  equipment_name,
  category,
  title,
  comment,
  badge,
  avatar_initials,
  avatar_color,
  highlights,
  installation_tag,
  helpful_count,
  is_published
) VALUES (
  'rev-1',
  'Engr. Rafiqul Islam',
  'Managing Director',
  'Apex Master Garage & Fleet Hub',
  'Tejgaon Industrial Area, Dhaka',
  5,
  'March 2026',
  TRUE,
  'TORQ-4000 · 4.0T Electro-Hydraulic 2-Post Lift',
  'Garage Equipment',
  'Faultless lifting power and outstanding structural steel build',
  'We installed two PAGE 4-Ton electro-hydraulic lifts six months ago. They handle everything from compact sedans to commercial delivery vans without breaking a sweat. The dual-cylinder synchronization is flawless, and PAGE International''s engineering team handled the foundation certification on-site.',
  'Commercial Fleet Depot',
  'RI',
  'from-blue-600 to-indigo-700',
  ARRAY['4.0 Ton Capacity', 'Dual-Cylinder Sync', 'Zero Creep']::text[],
  'Verified 6-Month Installation',
  28,
  TRUE
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  role = EXCLUDED.role,
  workshop = EXCLUDED.workshop,
  location = EXCLUDED.location,
  rating = EXCLUDED.rating,
  title = EXCLUDED.title,
  comment = EXCLUDED.comment,
  helpful_count = EXCLUDED.helpful_count;

INSERT INTO reviews (
  id,
  name,
  role,
  workshop,
  location,
  rating,
  review_date,
  verified_buyer,
  equipment_name,
  category,
  title,
  comment,
  badge,
  avatar_initials,
  avatar_color,
  highlights,
  installation_tag,
  helpful_count,
  is_published
) VALUES (
  'rev-2',
  'Mahmud Hasan Chowdhury',
  'Head of After-Sales Operations',
  'Autobahn Multi-Brand German Service Hub',
  'Uttara Sector 7, Dhaka',
  5,
  'February 2026',
  TRUE,
  'AERO-10 · Rotary Screw Air Compressor 10HP (Silent)',
  'Garage Equipment',
  'Quiet enough to install inside the main customer-facing workshop bay',
  'Pneumatic impact wrenches, bead breakers and paint guns consume serious continuous CFM. The 10HP rotary screw compressor from PAGE provides continuous clean 10-bar pressure with zero pressure drop. Noise level is remarkably low—our technicians can talk right beside the unit.',
  'Authorized Service Hub',
  'MC',
  'from-red-600 to-rose-700',
  ARRAY['10 Bar Continuous', 'Silent Enclosure', 'Clean Air Dryers']::text[],
  'Verified Commercial Buyer',
  21,
  TRUE
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  role = EXCLUDED.role,
  workshop = EXCLUDED.workshop,
  location = EXCLUDED.location,
  rating = EXCLUDED.rating,
  title = EXCLUDED.title,
  comment = EXCLUDED.comment,
  helpful_count = EXCLUDED.helpful_count;

INSERT INTO reviews (
  id,
  name,
  role,
  workshop,
  location,
  rating,
  review_date,
  verified_buyer,
  equipment_name,
  category,
  title,
  comment,
  badge,
  avatar_initials,
  avatar_color,
  highlights,
  installation_tag,
  helpful_count,
  is_published
) VALUES (
  'rev-3',
  'Tanvir Ahmed',
  'Chief Diagnostician & Owner',
  'SpeedPulse Diagnostics & Performance Lab',
  'Chittagong Port Commercial Zone',
  5,
  'January 2026',
  TRUE,
  'SCAN-PRO X9 · Bidirectional OE Diagnostic Tablet',
  'Diagnostics',
  'OE-level bidirectional coding for Asian, European and hybrid platforms',
  'Fast, responsive tablet with up-to-date CAN-FD and DoIP protocols. We routinely program steering angle sensors, ECU adaptations, and diesel DPF regenerations. The technical helpline from PAGE is always ready with calibration guidance and remote assistance.',
  'Diagnostics Center',
  'TA',
  'from-emerald-600 to-teal-700',
  ARRAY['CAN-FD & DoIP', 'ECU Online Coding', 'ADAS Calibration']::text[],
  'Verified Specialist Bay',
  34,
  TRUE
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  role = EXCLUDED.role,
  workshop = EXCLUDED.workshop,
  location = EXCLUDED.location,
  rating = EXCLUDED.rating,
  title = EXCLUDED.title,
  comment = EXCLUDED.comment,
  helpful_count = EXCLUDED.helpful_count;

INSERT INTO reviews (
  id,
  name,
  role,
  workshop,
  location,
  rating,
  review_date,
  verified_buyer,
  equipment_name,
  category,
  title,
  comment,
  badge,
  avatar_initials,
  avatar_color,
  highlights,
  installation_tag,
  helpful_count,
  is_published
) VALUES (
  'rev-4',
  'Sajid Karim',
  'Proprietor',
  'Express Tyre & Alignment Center',
  'Mirpur 10, Dhaka',
  5,
  'January 2026',
  TRUE,
  'TORQ-TC26 · Automatic Tyre Changer with Dual Assist Arms',
  'Tyre & Wheel',
  'Zero rim scratches even on 22-inch low-profile run-flats',
  'The pneumatic assist arms make mounting stiff run-flat tires an effortless one-man job. Paired with the laser-guided wheel balancer, our throughput doubled within the first month. Essential machinery for high-volume tyre shops.',
  'Tyre Specialist',
  'SK',
  'from-amber-600 to-orange-700',
  ARRAY['Dual Assist Arms', 'Laser Positioning', '22-Inch Capability']::text[],
  'Verified High-Volume Hub',
  19,
  TRUE
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  role = EXCLUDED.role,
  workshop = EXCLUDED.workshop,
  location = EXCLUDED.location,
  rating = EXCLUDED.rating,
  title = EXCLUDED.title,
  comment = EXCLUDED.comment,
  helpful_count = EXCLUDED.helpful_count;

INSERT INTO reviews (
  id,
  name,
  role,
  workshop,
  location,
  rating,
  review_date,
  verified_buyer,
  equipment_name,
  category,
  title,
  comment,
  badge,
  avatar_initials,
  avatar_color,
  highlights,
  installation_tag,
  helpful_count,
  is_published
) VALUES (
  'rev-5',
  'Kazi Nayeem',
  'Technical Operations Manager',
  'GreenVolt Mobility Depot',
  'Savar EPZ Commercial Hub',
  5,
  'December 2025',
  TRUE,
  'VDE-1000 · 1000V Insulated Tool Set & Battery Diagnostic Station',
  'EV Solutions',
  'Certified 1000V safety tooling for commercial EV fleet servicing',
  'With electric 3-wheelers and commercial delivery vans growing fast, PAGE provided our technicians with fully certified VDE insulated toolkits and high-voltage battery cell testers. Excellent compliance standards and safety training support.',
  'EV Fleet Hub',
  'KN',
  'from-cyan-600 to-blue-700',
  ARRAY['1000V VDE Certified', 'Cell Balancing', 'Isolation PPE']::text[],
  'Verified EV Depot',
  15,
  TRUE
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  role = EXCLUDED.role,
  workshop = EXCLUDED.workshop,
  location = EXCLUDED.location,
  rating = EXCLUDED.rating,
  title = EXCLUDED.title,
  comment = EXCLUDED.comment,
  helpful_count = EXCLUDED.helpful_count;

INSERT INTO reviews (
  id,
  name,
  role,
  workshop,
  location,
  rating,
  review_date,
  verified_buyer,
  equipment_name,
  category,
  title,
  comment,
  badge,
  avatar_initials,
  avatar_color,
  highlights,
  installation_tag,
  helpful_count,
  is_published
) VALUES (
  'rev-6',
  'Farhan Siddique',
  'Senior Workshop Engineer',
  'Crescent Motors Commercial Vehicle Depots',
  'Gazipur Industrial Zone',
  5,
  'November 2025',
  TRUE,
  'HYDRA-JACK 1.5 · Heavy-Duty Low-Profile Transmission Jack',
  'Garage Equipment',
  'Rugged hydraulic performance, fast delivery and solid build',
  'Handles truck and commercial gearbox drops with great stability. The wide base and smooth swiveling ball-bearing casters allow safe maneuvering across workshop floor tiles. Prompt delivery directly to our Gazipur depot.',
  'Commercial Depot',
  'FS',
  'from-purple-600 to-violet-700',
  ARRAY['1.5T Capacity', 'Universal Saddle', '360-Degree Casters']::text[],
  'Verified Industrial Bay',
  12,
  TRUE
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  role = EXCLUDED.role,
  workshop = EXCLUDED.workshop,
  location = EXCLUDED.location,
  rating = EXCLUDED.rating,
  title = EXCLUDED.title,
  comment = EXCLUDED.comment,
  helpful_count = EXCLUDED.helpful_count;

INSERT INTO reviews (
  id,
  name,
  role,
  workshop,
  location,
  rating,
  review_date,
  verified_buyer,
  equipment_name,
  category,
  title,
  comment,
  badge,
  avatar_initials,
  avatar_color,
  highlights,
  installation_tag,
  helpful_count,
  is_published
) VALUES (
  'rev-7',
  'Hasanur Rahman',
  'Managing Partner',
  'Precision Track Wheel Alignment & Tyre Care',
  'Agrabad Commercial Area, Chittagong',
  5,
  'November 2025',
  TRUE,
  'TORQ-ALIGN 3D · High-Definition 3D Camera Wheel Aligner',
  'Tyre & Wheel',
  'Instant 2-minute roll-back calibration and pinpoint laser accuracy',
  'Our alignment bay speed tripled after switching to the PAGE 3D HD camera aligner. The software database covers all Japanese imports, European sedans, and domestic fleet SUVs with automatic target recognition. Customers love the color-coded before/after alignment printout.',
  'Alignment Center',
  'HR',
  'from-teal-600 to-cyan-700',
  ARRAY['2-Min Roll-Back', 'HD Optical Cameras', 'OE Vehicle Specs']::text[],
  'Verified High-Volume Bay',
  17,
  TRUE
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  role = EXCLUDED.role,
  workshop = EXCLUDED.workshop,
  location = EXCLUDED.location,
  rating = EXCLUDED.rating,
  title = EXCLUDED.title,
  comment = EXCLUDED.comment,
  helpful_count = EXCLUDED.helpful_count;

INSERT INTO reviews (
  id,
  name,
  role,
  workshop,
  location,
  rating,
  review_date,
  verified_buyer,
  equipment_name,
  category,
  title,
  comment,
  badge,
  avatar_initials,
  avatar_color,
  highlights,
  installation_tag,
  helpful_count,
  is_published
) VALUES (
  'rev-8',
  'Kamrul Hassan',
  'Technical Director',
  'Apex Prestige Auto Hub',
  'Kandirpar, Comilla',
  5,
  'October 2025',
  TRUE,
  'TORQ-SC45 · 4.5T Heavy-Duty In-Ground Scissor Lift',
  'Garage Equipment',
  'Flush floor design saves workshop space without compromising stability',
  'When lowered, the lift sits flush with our epoxy workshop flooring, creating extra drive-over space in our busy service lanes. Pneumatic lock releases and dual hydraulic circuits provide maximum safety for our technicians working on luxury SUVs and armored pickups.',
  'Prestige Auto Hub',
  'KH',
  'from-indigo-600 to-blue-700',
  ARRAY['Flush In-Ground', '4.5T Heavy Duty', 'Pneumatic Safety Locks']::text[],
  'Verified Certified Installation',
  23,
  TRUE
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  role = EXCLUDED.role,
  workshop = EXCLUDED.workshop,
  location = EXCLUDED.location,
  rating = EXCLUDED.rating,
  title = EXCLUDED.title,
  comment = EXCLUDED.comment,
  helpful_count = EXCLUDED.helpful_count;

INSERT INTO reviews (
  id,
  name,
  role,
  workshop,
  location,
  rating,
  review_date,
  verified_buyer,
  equipment_name,
  category,
  title,
  comment,
  badge,
  avatar_initials,
  avatar_color,
  highlights,
  installation_tag,
  helpful_count,
  is_published
) VALUES (
  'rev-9',
  'Syed Golam Kibria',
  'Chief EV Engineer',
  'VoltZone Commercial Fleet & Battery Workshop',
  'Tongi Industrial Area, Gazipur',
  5,
  'September 2025',
  TRUE,
  'EV-PACK 750 · High-Voltage Battery Pack Lifting Table & Cell Tester',
  'EV Solutions',
  'Safely handles 1,200kg battery drop-outs with zero tilt',
  'Dropping and reinstalling EV powertrain packs requires precise tilt adjustments and insulated safety barriers. The PAGE hydraulic EV lifting table has adjustable tilting pads and insulated mechanical safety locks. An indispensable tool for our EV bus and commercial van fleet.',
  'Certified EV Depot',
  'SK',
  'from-emerald-600 to-green-700',
  ARRAY['1200kg Lift Capacity', 'Adjustable Multi-Axis Table', '1000V Insulated']::text[],
  'Verified Commercial Fleet Hub',
  31,
  TRUE
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  role = EXCLUDED.role,
  workshop = EXCLUDED.workshop,
  location = EXCLUDED.location,
  rating = EXCLUDED.rating,
  title = EXCLUDED.title,
  comment = EXCLUDED.comment,
  helpful_count = EXCLUDED.helpful_count;

-- -----------------------------------------------------------------------------
-- 7. SEED QUOTE REQUESTS & QUOTE ITEMS
-- -----------------------------------------------------------------------------
INSERT INTO quote_requests (
  id,
  company_name,
  contact_name,
  phone,
  email,
  business_type,
  city,
  notes,
  status,
  admin_reply,
  quoted_total,
  created_at
) VALUES (
  'q-001',
  'AutoFix Garage Ltd.',
  'Tanvir Ahmed',
  '+880-1711-123456',
  'tanvir@autofixbd.com',
  'Workshop / Garage',
  'Dhaka',
  'Need installation service as well.',
  'pending',
  NULL,
  NULL,
  NOW() - INTERVAL '7 days'
) ON CONFLICT (id) DO UPDATE SET
  company_name = EXCLUDED.company_name,
  contact_name = EXCLUDED.contact_name,
  phone = EXCLUDED.phone,
  email = EXCLUDED.email,
  status = EXCLUDED.status,
  admin_reply = EXCLUDED.admin_reply,
  quoted_total = EXCLUDED.quoted_total;

INSERT INTO quote_request_items (
  quote_id,
  product_id,
  product_name,
  product_sku,
  qty,
  quoted_unit_price
) VALUES (
  'q-001',
  (SELECT id FROM products WHERE slug = 'heavy-duty-2-post-lift-4t'),
  'Heavy-Duty 2-Post Electro-Hydraulic Lift 4.0T',
  'TQ-LIFT-4000',
  2,
  NULL
);

INSERT INTO quote_requests (
  id,
  company_name,
  contact_name,
  phone,
  email,
  business_type,
  city,
  notes,
  status,
  admin_reply,
  quoted_total,
  created_at
) VALUES (
  'q-002',
  'Dhaka Tyre Center',
  'Rashid Khan',
  '+880-1911-654321',
  'rashid@dhakatyre.com',
  'Tyre Service Center',
  'Dhaka',
  '',
  'replied',
  'Thank you for your interest. We can offer a 5% bulk discount for 2+ units. Please confirm to proceed.',
  166250,
  NOW() - INTERVAL '7 days'
) ON CONFLICT (id) DO UPDATE SET
  company_name = EXCLUDED.company_name,
  contact_name = EXCLUDED.contact_name,
  phone = EXCLUDED.phone,
  email = EXCLUDED.email,
  status = EXCLUDED.status,
  admin_reply = EXCLUDED.admin_reply,
  quoted_total = EXCLUDED.quoted_total;

INSERT INTO quote_request_items (
  quote_id,
  product_id,
  product_name,
  product_sku,
  qty,
  quoted_unit_price
) VALUES (
  'q-002',
  (SELECT id FROM products WHERE slug = 'pro-tyre-changer-assist-arm'),
  'Pro Automatic Tyre Changer with Dual Assist Arm',
  'TQ-TC-9000',
  1,
  166250
);

INSERT INTO quote_requests (
  id,
  company_name,
  contact_name,
  phone,
  email,
  business_type,
  city,
  notes,
  status,
  admin_reply,
  quoted_total,
  created_at
) VALUES (
  'q-003',
  'Green Fleet BD',
  'Selim Reza',
  '+880-1611-987654',
  'selim@greenfleetbd.com',
  'Fleet Operator',
  'Chattogram',
  'Need urgent for our EV fleet expansion.',
  'accepted',
  'Confirmed at ৳3,60,000 with free installation. Delivery in 5 business days.',
  360000,
  NOW() - INTERVAL '7 days'
) ON CONFLICT (id) DO UPDATE SET
  company_name = EXCLUDED.company_name,
  contact_name = EXCLUDED.contact_name,
  phone = EXCLUDED.phone,
  email = EXCLUDED.email,
  status = EXCLUDED.status,
  admin_reply = EXCLUDED.admin_reply,
  quoted_total = EXCLUDED.quoted_total;

INSERT INTO quote_request_items (
  quote_id,
  product_id,
  product_name,
  product_sku,
  qty,
  quoted_unit_price
) VALUES (
  'q-003',
  (SELECT id FROM products WHERE slug = 'ev-battery-pack-diagnostic-analyzer'),
  'High-Voltage EV Battery Pack Diagnostic Station',
  'EV-BAT-8000',
  1,
  360000
);

-- -----------------------------------------------------------------------------
-- 8. CONSULTATION BOOKINGS (Seed Appointments)
-- -----------------------------------------------------------------------------
INSERT INTO consultation_bookings (
  id,
  company_name,
  contact_name,
  phone,
  email,
  business_type,
  bay_count,
  equipment_interest,
  service_ids,
  service_name,
  location_type,
  center_id,
  center_name,
  onsite_address,
  preferred_date,
  preferred_slot,
  notes,
  status,
  created_at
) VALUES (
  'b-001',
  'Speed Motors Workshop',
  'Arif Hossain',
  '+880-1811-111111',
  'arif@speedmotors.com',
  'Workshop',
  '3-5 Bays',
  '4-post alignment lift',
  ARRAY['lift-demo']::text[],
  'Vehicle Lift Machinery Demonstration',
  'hub',
  'dhaka-tejgaon',
  'PAGE Equipment Hub — Tejgaon',
  NULL,
  '2026-10-25'::date,
  '11:30 AM',
  'Interested in 4-post alignment lift demonstration with heavy load.',
  'confirmed',
  NOW() - INTERVAL '3 days'
) ON CONFLICT (id) DO UPDATE SET
  company_name = EXCLUDED.company_name,
  contact_name = EXCLUDED.contact_name,
  phone = EXCLUDED.phone,
  status = EXCLUDED.status;

INSERT INTO consultation_bookings (
  id,
  company_name,
  contact_name,
  phone,
  email,
  business_type,
  bay_count,
  equipment_interest,
  service_ids,
  service_name,
  location_type,
  center_id,
  center_name,
  onsite_address,
  preferred_date,
  preferred_slot,
  notes,
  status,
  created_at
) VALUES (
  'b-002',
  'EcoRide EV Center',
  'Fariha Begum',
  '+880-1511-222222',
  'fariha@ecoride.com',
  'EV Business',
  '2-4 Bays',
  'EV diagnostic table & balancer',
  ARRAY['ev-audit']::text[],
  'EV Workshop Transition & 1000V Tooling Consultation',
  'hub',
  'chattogram-port',
  'PAGE Regional Hub — Chattogram',
  NULL,
  '2026-10-28'::date,
  '02:00 PM',
  'Planning to set up 3 EV bays with certified 1000V insulation.',
  'pending',
  NOW() - INTERVAL '3 days'
) ON CONFLICT (id) DO UPDATE SET
  company_name = EXCLUDED.company_name,
  contact_name = EXCLUDED.contact_name,
  phone = EXCLUDED.phone,
  status = EXCLUDED.status;

-- -----------------------------------------------------------------------------
-- 9. SITE SETTINGS
-- -----------------------------------------------------------------------------
INSERT INTO site_settings (
  id,
  site_name,
  tagline,
  primary_color,
  contact_email,
  contact_phone,
  hero_headline,
  hero_subline,
  announcement_bar,
  announcement_active,
  updated_at
) VALUES (
  1,
  'PAGE International',
  'Think Next. Build Better.',
  '#dc2626',
  'info@pageinternational.com',
  '+880-1700-000000',
  'THINK NEXT.',
  'Built to Perform. Certified to Last.',
  '🔥 Free installation on all 2-post lifts this month!',
  TRUE,
  NOW()
) ON CONFLICT (id) DO UPDATE SET
  site_name = EXCLUDED.site_name,
  tagline = EXCLUDED.tagline,
  announcement_bar = EXCLUDED.announcement_bar,
  announcement_active = EXCLUDED.announcement_active,
  updated_at = NOW();


-- =============================================================================
-- PAGE INTERNATIONAL (PIXEL-PERFECT) - DATABASE MIGRATION 0004
-- Target Engine: PostgreSQL 15+
-- Description: Row-Level Security (RLS) Policies, Security Context Functions,
--              and Multi-Tenant Access Boundary Enforcement.
-- =============================================================================

-- -----------------------------------------------------------------------------
-- 1. SECURITY CONTEXT HELPER FUNCTIONS
-- -----------------------------------------------------------------------------
-- Returns the UUID of the currently authenticated customer or admin in this transaction
CREATE OR REPLACE FUNCTION current_user_id() RETURNS UUID AS $$
BEGIN
  RETURN NULLIF(current_setting('app.current_user_id', true), '')::UUID;
EXCEPTION WHEN OTHERS THEN
  RETURN NULL;
END;
$$ LANGUAGE plpgsql STABLE;

-- Returns the active role: 'admin', 'product_manager', 'staff', 'viewer', 'customer', or 'anon'
CREATE OR REPLACE FUNCTION current_user_role() RETURNS TEXT AS $$
BEGIN
  RETURN COALESCE(NULLIF(current_setting('app.current_user_role', true), ''), 'anon');
EXCEPTION WHEN OTHERS THEN
  RETURN 'anon';
END;
$$ LANGUAGE plpgsql STABLE;

-- Helper to check if caller has elevated administrative privileges
CREATE OR REPLACE FUNCTION is_admin_or_staff() RETURNS BOOLEAN AS $$
BEGIN
  RETURN current_user_role() IN ('admin', 'product_manager', 'staff');
END;
$$ LANGUAGE plpgsql STABLE;

-- Helper to check if caller is an admin
CREATE OR REPLACE FUNCTION is_admin() RETURNS BOOLEAN AS $$
BEGIN
  RETURN current_user_role() = 'admin';
END;
$$ LANGUAGE plpgsql STABLE;

-- -----------------------------------------------------------------------------
-- 2. ENABLE AND FORCE ROW-LEVEL SECURITY ON ALL CORE TABLES
-- -----------------------------------------------------------------------------
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE products FORCE ROW LEVEL SECURITY;

ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders FORCE ROW LEVEL SECURITY;

ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items FORCE ROW LEVEL SECURITY;

ALTER TABLE quote_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE quote_requests FORCE ROW LEVEL SECURITY;

ALTER TABLE quote_request_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE quote_request_items FORCE ROW LEVEL SECURITY;

ALTER TABLE consultation_bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE consultation_bookings FORCE ROW LEVEL SECURITY;

ALTER TABLE customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE customers FORCE ROW LEVEL SECURITY;

ALTER TABLE customer_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE customer_sessions FORCE ROW LEVEL SECURITY;

ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_users FORCE ROW LEVEL SECURITY;

ALTER TABLE admin_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_sessions FORCE ROW LEVEL SECURITY;

ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews FORCE ROW LEVEL SECURITY;

ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_settings FORCE ROW LEVEL SECURITY;

ALTER TABLE service_centers ENABLE ROW LEVEL SECURITY;
ALTER TABLE service_centers FORCE ROW LEVEL SECURITY;

ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE services FORCE ROW LEVEL SECURITY;

ALTER TABLE booking_service_options ENABLE ROW LEVEL SECURITY;
ALTER TABLE booking_service_options FORCE ROW LEVEL SECURITY;

-- -----------------------------------------------------------------------------
-- 3. PRODUCTS & CATALOG POLICIES
-- -----------------------------------------------------------------------------
DROP POLICY IF EXISTS p_products_read ON products;
CREATE POLICY p_products_read ON products
  FOR SELECT
  USING (TRUE); -- Products are public catalog items

DROP POLICY IF EXISTS p_products_write ON products;
CREATE POLICY p_products_write ON products
  FOR ALL
  USING (current_user_role() IN ('admin', 'product_manager'))
  WITH CHECK (current_user_role() IN ('admin', 'product_manager'));

-- -----------------------------------------------------------------------------
-- 4. STATIC / REFERENCE ENTITIES (Service Centers, Services, Options, Settings)
-- -----------------------------------------------------------------------------
DROP POLICY IF EXISTS p_service_centers_read ON service_centers;
CREATE POLICY p_service_centers_read ON service_centers FOR SELECT USING (TRUE);
DROP POLICY IF EXISTS p_service_centers_write ON service_centers;
CREATE POLICY p_service_centers_write ON service_centers FOR ALL USING (is_admin()) WITH CHECK (is_admin());

DROP POLICY IF EXISTS p_services_read ON services;
CREATE POLICY p_services_read ON services FOR SELECT USING (TRUE);
DROP POLICY IF EXISTS p_services_write ON services;
CREATE POLICY p_services_write ON services FOR ALL USING (is_admin()) WITH CHECK (is_admin());

DROP POLICY IF EXISTS p_booking_options_read ON booking_service_options;
CREATE POLICY p_booking_options_read ON booking_service_options FOR SELECT USING (TRUE);
DROP POLICY IF EXISTS p_booking_options_write ON booking_service_options;
CREATE POLICY p_booking_options_write ON booking_service_options FOR ALL USING (is_admin()) WITH CHECK (is_admin());

DROP POLICY IF EXISTS p_site_settings_read ON site_settings;
CREATE POLICY p_site_settings_read ON site_settings FOR SELECT USING (TRUE);
DROP POLICY IF EXISTS p_site_settings_write ON site_settings;
CREATE POLICY p_site_settings_write ON site_settings FOR ALL USING (is_admin()) WITH CHECK (is_admin());

-- -----------------------------------------------------------------------------
-- 5. REVIEWS POLICIES
-- -----------------------------------------------------------------------------
DROP POLICY IF EXISTS p_reviews_read ON reviews;
CREATE POLICY p_reviews_read ON reviews
  FOR SELECT
  USING (is_published = TRUE OR is_admin_or_staff());

DROP POLICY IF EXISTS p_reviews_insert ON reviews;
CREATE POLICY p_reviews_insert ON reviews
  FOR INSERT
  WITH CHECK (TRUE); -- Customers and guests can submit reviews

DROP POLICY IF EXISTS p_reviews_manage ON reviews;
CREATE POLICY p_reviews_manage ON reviews
  FOR UPDATE
  USING (is_admin_or_staff())
  WITH CHECK (is_admin_or_staff());

DROP POLICY IF EXISTS p_reviews_delete ON reviews;
CREATE POLICY p_reviews_delete ON reviews
  FOR DELETE
  USING (is_admin());

-- -----------------------------------------------------------------------------
-- 6. CUSTOMER PROFILE & SESSION POLICIES
-- -----------------------------------------------------------------------------
DROP POLICY IF EXISTS p_customers_insert ON customers;
CREATE POLICY p_customers_insert ON customers
  FOR INSERT
  WITH CHECK (TRUE); -- Public registration

DROP POLICY IF EXISTS p_customers_select ON customers;
CREATE POLICY p_customers_select ON customers
  FOR SELECT
  USING (is_admin_or_staff() OR id = current_user_id());

DROP POLICY IF EXISTS p_customers_update ON customers;
CREATE POLICY p_customers_update ON customers
  FOR UPDATE
  USING (is_admin() OR id = current_user_id())
  WITH CHECK (is_admin() OR id = current_user_id());

DROP POLICY IF EXISTS p_customers_delete ON customers;
CREATE POLICY p_customers_delete ON customers
  FOR DELETE
  USING (is_admin());

DROP POLICY IF EXISTS p_customer_sessions ON customer_sessions;
CREATE POLICY p_customer_sessions ON customer_sessions
  FOR ALL
  USING (is_admin_or_staff() OR customer_id = current_user_id())
  WITH CHECK (is_admin_or_staff() OR customer_id = current_user_id());

-- -----------------------------------------------------------------------------
-- 7. ORDERS & ORDER ITEMS POLICIES
-- -----------------------------------------------------------------------------
DROP POLICY IF EXISTS p_orders_insert ON orders;
CREATE POLICY p_orders_insert ON orders
  FOR INSERT
  WITH CHECK (TRUE); -- Public checkout (guest or customer)

DROP POLICY IF EXISTS p_orders_select ON orders;
CREATE POLICY p_orders_select ON orders
  FOR SELECT
  USING (
    is_admin_or_staff()
    OR (customer_id IS NOT NULL AND customer_id = current_user_id())
  );

DROP POLICY IF EXISTS p_orders_update ON orders;
CREATE POLICY p_orders_update ON orders
  FOR UPDATE
  USING (is_admin_or_staff())
  WITH CHECK (is_admin_or_staff());

DROP POLICY IF EXISTS p_orders_delete ON orders;
CREATE POLICY p_orders_delete ON orders
  FOR DELETE
  USING (is_admin());

-- Order Items inherit visibility from their parent order
DROP POLICY IF EXISTS p_order_items_insert ON order_items;
CREATE POLICY p_order_items_insert ON order_items
  FOR INSERT
  WITH CHECK (TRUE);

DROP POLICY IF EXISTS p_order_items_select ON order_items;
CREATE POLICY p_order_items_select ON order_items
  FOR SELECT
  USING (
    is_admin_or_staff()
    OR EXISTS (
      SELECT 1 FROM orders
      WHERE orders.id = order_items.order_id
        AND orders.customer_id = current_user_id()
    )
  );

DROP POLICY IF EXISTS p_order_items_manage ON order_items;
CREATE POLICY p_order_items_manage ON order_items
  FOR ALL
  USING (is_admin_or_staff())
  WITH CHECK (is_admin_or_staff());

-- -----------------------------------------------------------------------------
-- 8. QUOTE REQUESTS & QUOTE ITEMS POLICIES
-- -----------------------------------------------------------------------------
DROP POLICY IF EXISTS p_quotes_insert ON quote_requests;
CREATE POLICY p_quotes_insert ON quote_requests
  FOR INSERT
  WITH CHECK (TRUE); -- Public RFQ submission

DROP POLICY IF EXISTS p_quotes_select ON quote_requests;
CREATE POLICY p_quotes_select ON quote_requests
  FOR SELECT
  USING (
    is_admin_or_staff()
    OR (customer_id IS NOT NULL AND customer_id = current_user_id())
  );

DROP POLICY IF EXISTS p_quotes_update ON quote_requests;
CREATE POLICY p_quotes_update ON quote_requests
  FOR UPDATE
  USING (is_admin_or_staff())
  WITH CHECK (is_admin_or_staff());

DROP POLICY IF EXISTS p_quotes_delete ON quote_requests;
CREATE POLICY p_quotes_delete ON quote_requests
  FOR DELETE
  USING (is_admin());

-- Quote Items inherit visibility from parent quote
DROP POLICY IF EXISTS p_quote_items_insert ON quote_request_items;
CREATE POLICY p_quote_items_insert ON quote_request_items
  FOR INSERT
  WITH CHECK (TRUE);

DROP POLICY IF EXISTS p_quote_items_select ON quote_request_items;
CREATE POLICY p_quote_items_select ON quote_request_items
  FOR SELECT
  USING (
    is_admin_or_staff()
    OR EXISTS (
      SELECT 1 FROM quote_requests
      WHERE quote_requests.id = quote_request_items.quote_id
        AND quote_requests.customer_id = current_user_id()
    )
  );

DROP POLICY IF EXISTS p_quote_items_manage ON quote_request_items;
CREATE POLICY p_quote_items_manage ON quote_request_items
  FOR ALL
  USING (is_admin_or_staff())
  WITH CHECK (is_admin_or_staff());

-- -----------------------------------------------------------------------------
-- 9. CONSULTATION BOOKINGS POLICIES
-- -----------------------------------------------------------------------------
DROP POLICY IF EXISTS p_bookings_insert ON consultation_bookings;
CREATE POLICY p_bookings_insert ON consultation_bookings
  FOR INSERT
  WITH CHECK (TRUE); -- Public booking wizard

DROP POLICY IF EXISTS p_bookings_select ON consultation_bookings;
CREATE POLICY p_bookings_select ON consultation_bookings
  FOR SELECT
  USING (
    is_admin_or_staff()
    OR (customer_id IS NOT NULL AND customer_id = current_user_id())
  );

DROP POLICY IF EXISTS p_bookings_update ON consultation_bookings;
CREATE POLICY p_bookings_update ON consultation_bookings
  FOR UPDATE
  USING (is_admin_or_staff())
  WITH CHECK (is_admin_or_staff());

DROP POLICY IF EXISTS p_bookings_delete ON consultation_bookings;
CREATE POLICY p_bookings_delete ON consultation_bookings
  FOR DELETE
  USING (is_admin());

-- -----------------------------------------------------------------------------
-- 10. ADMIN USERS & SESSIONS POLICIES
-- -----------------------------------------------------------------------------
DROP POLICY IF EXISTS p_admin_users_access ON admin_users;
CREATE POLICY p_admin_users_access ON admin_users
  FOR ALL
  USING (is_admin_or_staff())
  WITH CHECK (is_admin());

DROP POLICY IF EXISTS p_admin_sessions_access ON admin_sessions;
CREATE POLICY p_admin_sessions_access ON admin_sessions
  FOR ALL
  USING (is_admin_or_staff())
  WITH CHECK (is_admin_or_staff());


-- =============================================================================
-- PAGE INTERNATIONAL - DATABASE MIGRATION 0005
-- Description: Create non-superuser application role 'page_app_user'
--              so PostgreSQL RLS is strictly enforced without superuser bypass.
-- =============================================================================

DO $$
BEGIN
  IF NOT EXISTS (SELECT FROM pg_roles WHERE rolname = 'page_app_user') THEN
    CREATE ROLE page_app_user WITH LOGIN PASSWORD 'page_app_pass_2026' NOSUPERUSER NOCREATEDB NOCREATEROLE;
  END IF;
END
$$;

DO $$
BEGIN
  EXECUTE format('GRANT CONNECT ON DATABASE %I TO page_app_user', current_database());
END
$$;
GRANT USAGE ON SCHEMA public TO page_app_user;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO page_app_user;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO page_app_user;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON TABLES TO page_app_user;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON SEQUENCES TO page_app_user;


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
