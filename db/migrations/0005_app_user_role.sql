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
