-- =============================================================================
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
