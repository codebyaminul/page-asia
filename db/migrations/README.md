# Database Migrations — PAGE International

This folder contains the production-grade PostgreSQL migration scripts for the PAGE International application.

## Migration Files
- `0001_initial_schema.sql` — Creates all 12 core tables, extensions (`pgcrypto`, `pg_trgm`), stored generated columns, composite indexes, GIN array indexes, and automated timestamp triggers.

---

## How to Execute the Migration

### Option 1: Via Cloud Database Console (Neon / Supabase / Render / Railway)
1. Open your database dashboard's **SQL Editor**.
2. Open [`0001_initial_schema.sql`](./0001_initial_schema.sql), copy its contents, and execute.
3. Verify that all 12 tables and triggers are created.

### Option 2: Via `psql` Command Line
If you have `psql` installed and a connection string:
```bash
psql "postgres://USER:PASSWORD@HOST:PORT/DATABASE?sslmode=require" -f db/migrations/0001_initial_schema.sql
```

### Option 3: Via Local Docker Container
```bash
# Start a fresh PostgreSQL 16 container
docker run --name page-postgres -e POSTGRES_PASSWORD=postgres -e POSTGRES_DB=page_db -p 5432:5432 -d postgres:16-alpine

# Apply the migration
docker exec -i page-postgres psql -U postgres -d page_db < db/migrations/0001_initial_schema.sql
```

### Option 4: Via Node.js Migration Runner
If your environment does not have `psql` or Docker installed, you can apply migrations directly using Node.js and the `postgres` package:
```bash
# Set your DATABASE_URL in .env
npx tsx scratch/apply_migration.ts
```

---

## Verification Queries
After running the migration, verify the tables in PostgreSQL:
```sql
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
ORDER BY table_name;
```
Expected output: 12 tables (`admin_sessions`, `admin_users`, `booking_service_options`, `consultation_bookings`, `order_items`, `orders`, `products`, `quote_request_items`, `quote_requests`, `reviews`, `service_centers`, `services`, `site_settings`).
