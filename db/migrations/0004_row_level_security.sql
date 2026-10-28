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
