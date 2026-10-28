import postgres from "postgres";

const connectionString =
  process.env.DATABASE_URL ||
  "postgresql://postgres:postgres@localhost:5432/page_db";

// Global singleton for server-side connection pool
declare global {
  // eslint-disable-next-line no-var
  var __db_sql: postgres.Sql | undefined;
}

export const sql =
  globalThis.__db_sql ||
  postgres(connectionString, {
    max: 10,
    idle_timeout: 20,
    connect_timeout: 10,
  });

if (process.env.NODE_ENV !== "production") {
  globalThis.__db_sql = sql;
}

/**
 * Executes a callback within a scoped database transaction setting PostgreSQL
 * security context (`app.current_user_role` and `app.current_user_id`),
 * strictly enforcing PostgreSQL Row-Level Security (RLS) policies.
 */
export async function withSecurityContext<T>(
  context: { role?: string; userId?: string | null },
  fn: (tx: postgres.Sql) => Promise<T>
): Promise<T> {
  const role = context.role || "anon";
  const userId = context.userId || "";

  return await sql.begin(async (tx) => {
    await tx`SET ROLE page_app_user`;
    await tx`SELECT set_config('app.current_user_role', ${role}, true)`;
    await tx`SELECT set_config('app.current_user_id', ${userId}, true)`;
    return await fn(tx);
  });
}

export default sql;
