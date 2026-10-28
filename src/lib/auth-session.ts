import { getCookie, setCookie, deleteCookie, getRequestIP } from "@tanstack/react-start/server";
import { sql } from "./db.ts";
import type { AdminUser } from "./admin-data.ts";
import type { CustomerProfile } from "./db-queries.ts";
import { validateDbCustomerSession } from "./db-queries.ts";

export const COOKIE_NAMES = {
  admin: "page_admin_session",
  customer: "page_customer_session",
} as const;

const isProd = process.env.NODE_ENV === "production";

/**
 * Standard cookie configuration for enterprise security.
 * - HttpOnly: Inaccessible to document.cookie (prevents XSS theft)
 * - SameSite=Lax: Prevents cross-site request forgery
 * - Secure: True in production (HTTPS only)
 * - Path=/: Available across all routes
 */
const DEFAULT_COOKIE_OPTIONS = {
  httpOnly: true,
  secure: isProd,
  sameSite: "lax" as const,
  path: "/",
};

// -----------------------------------------------------------------------------
// ADMIN SESSION COOKIE MANAGEMENT
// -----------------------------------------------------------------------------

export function setAdminSessionCookie(token: string) {
  try {
    setCookie(COOKIE_NAMES.admin, token, {
      ...DEFAULT_COOKIE_OPTIONS,
      maxAge: 7 * 24 * 60 * 60, // 7 days
    });
  } catch (err) {
    console.warn("setAdminSessionCookie outside request context:", err);
  }
}

export function clearAdminSessionCookie() {
  try {
    deleteCookie(COOKIE_NAMES.admin, { path: "/" });
  } catch (err) {
    console.warn("clearAdminSessionCookie outside request context:", err);
  }
}

export async function getAdminAuthContext(): Promise<AdminUser | null> {
  let token: string | undefined;
  try {
    token = getCookie(COOKIE_NAMES.admin);
  } catch {
    return null;
  }

  if (!token) return null;

  try {
    const rows = await sql`
      SELECT u.id, u.email, u.name, u.role, u.status, u.avatar_url, u.created_at, u.last_login
      FROM admin_sessions s
      JOIN admin_users u ON u.id = s.user_id
      WHERE s.token = ${token} AND s.expires_at > NOW() AND u.status = 'active'
      LIMIT 1
    `;

    if (!rows.length) return null;

    const u = rows[0];
    return {
      id: u.id,
      email: u.email,
      name: u.name,
      role: u.role,
      status: u.status,
      avatar: u.avatar_url,
      createdAt: new Date(u.created_at).toISOString(),
      lastLogin: u.last_login ? new Date(u.last_login).toISOString() : "Never",
    };
  } catch (err) {
    console.error("Error validating admin session:", err);
    return null;
  }
}

// -----------------------------------------------------------------------------
// CUSTOMER SESSION COOKIE MANAGEMENT
// -----------------------------------------------------------------------------

export function setCustomerSessionCookie(token: string) {
  try {
    setCookie(COOKIE_NAMES.customer, token, {
      ...DEFAULT_COOKIE_OPTIONS,
      maxAge: 30 * 24 * 60 * 60, // 30 days
    });
  } catch (err) {
    console.warn("setCustomerSessionCookie outside request context:", err);
  }
}

export function clearCustomerSessionCookie() {
  try {
    deleteCookie(COOKIE_NAMES.customer, { path: "/" });
  } catch (err) {
    console.warn("clearCustomerSessionCookie outside request context:", err);
  }
}

export async function getCustomerAuthContext(): Promise<CustomerProfile | null> {
  let token: string | undefined;
  try {
    token = getCookie(COOKIE_NAMES.customer);
  } catch {
    return null;
  }

  if (!token) return null;

  try {
    return await validateDbCustomerSession(token);
  } catch (err) {
    console.error("Error validating customer session:", err);
    return null;
  }
}

// -----------------------------------------------------------------------------
// UNIFIED AUTH RESOLVER
// -----------------------------------------------------------------------------

export type AuthContext = {
  role: "admin" | "product_manager" | "staff" | "viewer" | "customer" | "anon";
  user: AdminUser | CustomerProfile | null;
  userId: string | null;
  isAdmin: boolean;
  isCustomer: boolean;
};

export async function getUnifiedAuthContext(): Promise<AuthContext> {
  // Check admin first
  const admin = await getAdminAuthContext();
  if (admin) {
    return {
      role: admin.role,
      user: admin,
      userId: admin.id,
      isAdmin: true,
      isCustomer: false,
    };
  }

  // Check customer second
  const customer = await getCustomerAuthContext();
  if (customer) {
    return {
      role: "customer",
      user: customer,
      userId: customer.id,
      isAdmin: false,
      isCustomer: true,
    };
  }

  // Anonymous guest
  return {
    role: "anon",
    user: null,
    userId: null,
    isAdmin: false,
    isCustomer: false,
  };
}
