import postgres from "postgres";

const connectionString =
  process.env.DATABASE_URL ||
  "postgresql://postgres:postgres@localhost:5432/page_db";

// Detect if connecting to Supabase transaction pooler (port 6543 or pooler hostname)
const isTransactionPooler =
  connectionString.includes(":6543") ||
  connectionString.includes("pooler.supabase.com");

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
    // Critical: Disable prepared statements for Supabase transaction pooler / PgBouncer
    prepare: !isTransactionPooler,
    onnotice: () => {}, // Suppress non-critical DB notices
  });

if (process.env.NODE_ENV !== "production") {
  globalThis.__db_sql = sql;
}

/**
 * Checks if a thrown PostgreSQL or Node.js error is a transient connection error
 * eligible for retry with backoff.
 */
export function isTransientError(err: unknown): boolean {
  if (!err || typeof err !== "object") return false;
  const anyErr = err as { code?: string; message?: string };
  const transientCodes = new Set([
    "ECONNRESET",
    "ECONNREFUSED",
    "ETIMEDOUT",
    "57P01", // admin_shutdown (pooler recycling)
    "57P02", // crash_shutdown
    "57P03", // cannot_connect_now
    "08006", // connection_failure
    "08001", // sqlclient_unable_to_establish_sqlconnection
    "08004", // sqlserver_rejected_establishment_of_sqlconnection
  ]);

  if (anyErr.code && transientCodes.has(anyErr.code)) return true;
  if (
    anyErr.message &&
    (anyErr.message.includes("Connection closed prematurely") ||
      anyErr.message.includes("Connection terminated") ||
      anyErr.message.includes("timeout") ||
      anyErr.message.includes("fetch failed"))
  ) {
    return true;
  }

  return false;
}

/**
 * Executes an operation with exponential backoff and jitter for transient errors.
 */
export async function withRetry<T>(
  operation: () => Promise<T>,
  options: {
    maxRetries?: number;
    baseDelayMs?: number;
    maxDelayMs?: number;
    operationName?: string;
  } = {}
): Promise<T> {
  const maxRetries = options.maxRetries ?? 3;
  const baseDelayMs = options.baseDelayMs ?? 100;
  const maxDelayMs = options.maxDelayMs ?? 1500;
  const name = options.operationName ?? "database_op";

  let lastError: unknown;
  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      return await operation();
    } catch (err) {
      lastError = err;
      if (attempt < maxRetries && isTransientError(err)) {
        const jitter = Math.random() * 50;
        const delay = Math.min(
          maxDelayMs,
          baseDelayMs * Math.pow(2, attempt) + jitter
        );
        console.warn(
          `[DB Retry] Transient failure in "${name}" (attempt ${attempt + 1}/${maxRetries}). Retrying in ${Math.round(delay)}ms...`
        );
        await new Promise((resolve) => setTimeout(resolve, delay));
        continue;
      }
      throw err;
    }
  }
  throw lastError;
}

/**
 * In-memory 60-second cache for metadata diagnostics to avoid hitting PostgreSQL catalogs on every poll.
 */
let cachedMetadata: {
  timestamp: number;
  data: { tablesOnline: number; migrationsApplied: number };
} | null = null;

/**
 * Measures live database health and ping latency with cached catalog counts.
 */
export async function checkDatabaseHealth(): Promise<{
  healthy: boolean;
  latencyMs: number;
  tablesOnline: number;
  migrationsApplied: number;
  error?: string;
}> {
  const start = Date.now();
  try {
    // 1. Ultra-fast ping check (does not scan catalogs)
    await sql`SELECT 1 as ping`;
    const latencyMs = Date.now() - start;

    // 2. Fetch or reuse cached metadata
    const now = Date.now();
    if (!cachedMetadata || now - cachedMetadata.timestamp > 60_000) {
      const [tableCount] = await sql`
        SELECT count(*)::int as count
        FROM information_schema.tables
        WHERE table_schema = 'public'
      `;
      const [migrationCount] = await sql`
        SELECT count(*)::int as count
        FROM schema_migrations
      `;
      cachedMetadata = {
        timestamp: now,
        data: {
          tablesOnline: tableCount?.count ?? 0,
          migrationsApplied: migrationCount?.count ?? 0,
        },
      };
    }

    return {
      healthy: true,
      latencyMs,
      tablesOnline: cachedMetadata.data.tablesOnline,
      migrationsApplied: cachedMetadata.data.migrationsApplied,
    };
  } catch (err: any) {
    return {
      healthy: false,
      latencyMs: Date.now() - start,
      tablesOnline: 0,
      migrationsApplied: 0,
      error: err?.message || "Database connection failure",
    };
  }
}

/**
 * Executes a callback within a scoped database transaction setting PostgreSQL
 * security context (`app.current_user_role` and `app.current_user_id`),
 * strictly enforcing PostgreSQL Row-Level Security (RLS) policies.
 *
 * Scoped strictly to the active transaction with `is_local = true`
 * preventing session variable leaks across pooled connections.
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
