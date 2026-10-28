import { createServerFn } from "@tanstack/react-start";
import { sql } from "./db.ts";
import type { Product } from "./data";
import type { AdminUser, QuoteRequest, ConsultBooking, SiteSetting, InventoryItem } from "./admin-data";
import type { Review } from "./reviews";
import {
  setAdminSessionCookie,
  clearAdminSessionCookie,
  getAdminAuthContext,
  setCustomerSessionCookie,
  clearCustomerSessionCookie,
  getCustomerAuthContext,
  getUnifiedAuthContext,
} from "./auth-session.ts";
import {
  registerDbCustomer,
  loginDbCustomer,
  logoutDbCustomer,
  validateDbCustomerSession,
  getDbCustomerOrders,
  getDbCustomerQuotes,
  getDbCustomerBookings,
  updateDbCustomerProfile,
  changeDbCustomerPassword,
  type CustomerProfile,
} from "./db-queries.ts";

// Helper to map DB product row to frontend Product type
function mapDbProduct(row: any): InventoryItem {
  return {
    slug: row.slug,
    name: row.name,
    brand: row.brand,
    category: row.category,
    mobility: row.mobility || [],
    price: Number(row.price),
    oldPrice: row.old_price !== null ? Number(row.old_price) : undefined,
    rating: Number(row.rating),
    reviews: Number(row.reviews_count),
    stock: row.stock_status,
    image: row.image_url,
    fits: row.fits || [],
    sku: row.sku,
    description: row.description,
    specs: row.specs || [],
    isEquipment: Boolean(row.is_equipment),
    requiresQuote: Boolean(row.requires_quote),
    warehouseQty: Number(row.warehouse_qty),
    reorderLevel: Number(row.reorder_level),
    lastRestocked: row.last_restocked ? new Date(row.last_restocked).toISOString() : new Date().toISOString(),
  };
}

// -----------------------------------------------------------------------------
// 1. PRODUCTS & INVENTORY
// -----------------------------------------------------------------------------
export const getProductsFn = createServerFn({ method: "GET" }).handler(async () => {
  const rows = await sql`
    SELECT * FROM products ORDER BY created_at DESC
  `;
  return rows.map(mapDbProduct);
});

export const getProductBySlugFn = createServerFn({ method: "GET" })
  .validator((slug: string) => slug)
  .handler(async ({ data: slug }) => {
    const rows = await sql`
      SELECT * FROM products WHERE slug = ${slug} LIMIT 1
    `;
    if (!rows.length) return null;
    return mapDbProduct(rows[0]);
  });

export const updateProductInventoryFn = createServerFn({ method: "POST" })
  .validator((payload: { slug: string; patch: Partial<InventoryItem> }) => payload)
  .handler(async ({ data: { slug, patch } }) => {
    await sql`
      UPDATE products
      SET
        price = COALESCE(${patch.price !== undefined ? patch.price : null}, price),
        old_price = COALESCE(${patch.oldPrice !== undefined ? patch.oldPrice : null}, old_price),
        warehouse_qty = COALESCE(${patch.warehouseQty !== undefined ? patch.warehouseQty : null}, warehouse_qty),
        reorder_level = COALESCE(${patch.reorderLevel !== undefined ? patch.reorderLevel : null}, reorder_level),
        last_restocked = CASE WHEN ${patch.lastRestocked !== undefined} THEN NOW() ELSE last_restocked END
      WHERE slug = ${slug}
    `;
    return { success: true };
  });

export const addProductFn = createServerFn({ method: "POST" })
  .validator((item: any) => item)
  .handler(async ({ data: item }) => {
    const rows = await sql`
      INSERT INTO products (
        slug, sku, name, brand, category, mobility, price, old_price,
        image_url, fits, description, specs, is_equipment, requires_quote,
        warehouse_qty, reorder_level
      ) VALUES (
        ${item.slug}, ${item.sku}, ${item.name}, ${item.brand}, ${item.category},
        ${item.mobility || []}, ${item.price}, ${item.oldPrice || null},
        ${item.image || "/assets/p-lift.jpg"}, ${item.fits || []}, ${item.description || ""},
        ${JSON.stringify(item.specs || [])}::jsonb, ${Boolean(item.isEquipment)},
        ${Boolean(item.requiresQuote)}, ${item.warehouseQty || 10}, ${item.reorderLevel || 5}
      )
      RETURNING *
    `;
    return mapDbProduct(rows[0]);
  });

export const deleteProductFn = createServerFn({ method: "POST" })
  .validator((slug: string) => slug)
  .handler(async ({ data: slug }) => {
    await sql`DELETE FROM products WHERE slug = ${slug}`;
    return { success: true };
  });

// -----------------------------------------------------------------------------
// 2. QUOTE REQUESTS & QUOTE ITEMS
// -----------------------------------------------------------------------------
export const getQuotesFn = createServerFn({ method: "GET" }).handler(async () => {
  const quotes = await sql`
    SELECT q.*,
      COALESCE(
        json_agg(
          json_build_object(
            'productSlug', p.slug,
            'productName', qi.product_name,
            'qty', qi.qty,
            'unitPrice', qi.quoted_unit_price
          )
        ) FILTER (WHERE qi.id IS NOT NULL), '[]'::json
      ) AS items
    FROM quote_requests q
    LEFT JOIN quote_request_items qi ON qi.quote_id = q.id
    LEFT JOIN products p ON p.id = qi.product_id
    GROUP BY q.id
    ORDER BY q.created_at DESC
  `;

  return quotes.map((q) => {
    const primaryItem = q.items[0] || {};
    return {
      id: q.id,
      companyName: q.company_name,
      contactName: q.contact_name,
      phone: q.phone,
      email: q.email,
      productSlug: primaryItem.productSlug || "",
      productName: primaryItem.productName || "Multi-Item Quotation",
      qty: primaryItem.qty || 1,
      items: q.items,
      businessType: q.business_type,
      city: q.city,
      notes: q.notes,
      status: q.status,
      reply: q.admin_reply,
      quotedPrice: q.quoted_total ? Number(q.quoted_total) : undefined,
      createdAt: q.created_at ? new Date(q.created_at).toISOString() : new Date().toISOString(),
      updatedAt: q.updated_at ? new Date(q.updated_at).toISOString() : new Date().toISOString(),
    } as QuoteRequest;
  });
});

export const createQuoteFn = createServerFn({ method: "POST" })
  .validator((payload: any) => payload)
  .handler(async ({ data }) => {
    const quoteId = data.id || `q-${Math.random().toString(36).slice(2, 9)}`;
    const currentCustomer = await getCustomerAuthContext();
    const effectiveCustomerId = data.customerId || currentCustomer?.id || null;

    await sql.begin(async (tx) => {
      await tx`
        INSERT INTO quote_requests (
          id, customer_id, company_name, contact_name, phone, email, business_type, city, notes, status
        ) VALUES (
          ${quoteId}, ${effectiveCustomerId}, ${data.companyName}, ${data.contactName || ""}, ${data.phone},
          ${data.email || ""}, ${data.businessType || "B2B Workshop"}, ${data.city || "Dhaka"},
          ${data.notes || ""}, 'pending'
        )
      `;

      if (data.items && data.items.length) {
        for (const it of data.items) {
          await tx`
            INSERT INTO quote_request_items (
              quote_id, product_id, product_name, product_sku, qty, quoted_unit_price
            ) VALUES (
              ${quoteId},
              (SELECT id FROM products WHERE slug = ${it.productSlug} LIMIT 1),
              ${it.productName},
              COALESCE((SELECT sku FROM products WHERE slug = ${it.productSlug} LIMIT 1), 'N/A'),
              ${it.qty || 1},
              ${it.unitPrice || null}
            )
          `;
        }
      } else if (data.productSlug) {
        await tx`
          INSERT INTO quote_request_items (
            quote_id, product_id, product_name, product_sku, qty
          ) VALUES (
            ${quoteId},
            (SELECT id FROM products WHERE slug = ${data.productSlug} LIMIT 1),
            ${data.productName || "Equipment"},
            COALESCE((SELECT sku FROM products WHERE slug = ${data.productSlug} LIMIT 1), 'N/A'),
            ${data.qty || 1}
          )
        `;
      }
    });

    return { success: true, id: quoteId };
  });

export const replyToQuoteFn = createServerFn({ method: "POST" })
  .validator(
    (payload: {
      id: string;
      reply: string;
      status?: QuoteRequest["status"];
      quotedPrice?: number;
    }) => payload
  )
  .handler(async ({ data }) => {
    await sql`
      UPDATE quote_requests
      SET
        admin_reply = ${data.reply},
        status = ${data.status || "replied"},
        quoted_total = COALESCE(${data.quotedPrice !== undefined ? data.quotedPrice : null}, quoted_total)
      WHERE id = ${data.id}
    `;
    return { success: true };
  });

export const updateQuoteStatusFn = createServerFn({ method: "POST" })
  .validator((payload: { id: string; status: QuoteRequest["status"] }) => payload)
  .handler(async ({ data }) => {
    await sql`
      UPDATE quote_requests SET status = ${data.status} WHERE id = ${data.id}
    `;
    return { success: true };
  });

// -----------------------------------------------------------------------------
// 3. CONSULTATION BOOKINGS
// -----------------------------------------------------------------------------
export const getBookingsFn = createServerFn({ method: "GET" }).handler(async () => {
  const rows = await sql`
    SELECT * FROM consultation_bookings ORDER BY created_at DESC
  `;
  return rows.map((b) => ({
    id: b.id,
    companyName: b.company_name,
    contactName: b.contact_name,
    phone: b.phone,
    email: b.email,
    serviceId: b.service_ids && b.service_ids[0] ? b.service_ids[0] : "consultation",
    serviceName: b.service_name,
    centerId: b.center_id || "onsite",
    centerName: b.center_name || (b.onsite_address ? `On-site: ${b.onsite_address}` : "PAGE Hub"),
    preferredDate: `${new Date(b.preferred_date).toISOString().slice(0, 10)} (${b.preferred_slot})`,
    notes: b.notes,
    status: b.status,
    createdAt: b.created_at ? new Date(b.created_at).toISOString() : new Date().toISOString(),
    updatedAt: b.updated_at ? new Date(b.updated_at).toISOString() : new Date().toISOString(),
  } as ConsultBooking));
});

export const createBookingFn = createServerFn({ method: "POST" })
  .validator((b: any) => b)
  .handler(async ({ data: b }) => {
    const bookingId = b.id || `b-${Math.random().toString(36).slice(2, 9)}`;
    const currentCustomer = await getCustomerAuthContext();
    const effectiveCustomerId = b.customerId || currentCustomer?.id || null;

    // parse preferredDate string if sent as "YYYY-MM-DD (TIME)"
    let datePart = new Date().toISOString().slice(0, 10);
    let slotPart = "11:30 AM";
    if (b.preferredDate) {
      const match = b.preferredDate.match(/^(\d{4}-\d{2}-\d{2})\s*(?:\((.+)\))?/);
      if (match) {
        datePart = match[1];
        if (match[2]) slotPart = match[2];
      } else {
        datePart = b.preferredDate.slice(0, 10);
      }
    }

    await sql`
      INSERT INTO consultation_bookings (
        id, customer_id, company_name, contact_name, phone, email,
        business_type, bay_count, equipment_interest,
        service_ids, service_name,
        location_type, center_id, center_name, onsite_address,
        preferred_date, preferred_slot, notes, status
      ) VALUES (
        ${bookingId}, ${effectiveCustomerId}, ${b.companyName}, ${b.contactName || ""}, ${b.phone}, ${b.email || ""},
        ${b.businessType || null}, ${b.bayCount || null}, ${b.equipmentInterest || null},
        ${b.serviceIds || (b.serviceId ? [b.serviceId] : ["lift-demo"])},
        ${b.serviceName || "Equipment Demonstration"},
        ${b.centerId === "onsite" ? "onsite" : "hub"},
        ${b.centerId && b.centerId !== "onsite" ? b.centerId : null},
        ${b.centerName || "PAGE Equipment Hub"},
        ${b.onsiteAddress || null},
        ${datePart}::date, ${slotPart},
        ${b.notes || ""}, 'pending'
      )
    `;

    return { success: true, id: bookingId };
  });

export const updateBookingStatusFn = createServerFn({ method: "POST" })
  .validator((payload: { id: string; status: ConsultBooking["status"] }) => payload)
  .handler(async ({ data }) => {
    await sql`
      UPDATE consultation_bookings SET status = ${data.status} WHERE id = ${data.id}
    `;
    return { success: true };
  });

// -----------------------------------------------------------------------------
// 4. ORDERS & CHECKOUT
// -----------------------------------------------------------------------------
export const createOrderFn = createServerFn({ method: "POST" })
  .validator((payload: any) => payload)
  .handler(async ({ data }) => {
    const orderId = data.id || `PG-${Math.floor(100000 + Math.random() * 900000)}`;
    const currentCustomer = await getCustomerAuthContext();
    const effectiveCustomerId = data.customerId || currentCustomer?.id || null;

    await sql.begin(async (tx) => {
      await tx`
        INSERT INTO orders (
          id, customer_id, account_type, full_name, phone, email,
          company_name, bin_vat_number, street_address, city, delivery_notes,
          payment_method, subtotal, delivery_charge, vat_amount, total, status
        ) VALUES (
          ${orderId}, ${effectiveCustomerId}, ${data.accountType || "personal"}, ${data.fullName}, ${data.phone},
          ${data.email || null}, ${data.companyName || null}, ${data.binVatNumber || null},
          ${data.streetAddress}, ${data.city || "Dhaka"}, ${data.deliveryNotes || null},
          ${data.paymentMethod || "cod"}, ${data.subtotal}, ${data.deliveryCharge || 0},
          ${data.vatAmount || 0}, ${data.total}, 'pending'
        )
      `;

      for (const line of data.lines) {
        await tx`
          INSERT INTO order_items (
            order_id, product_id, product_name, product_sku, unit_price, qty
          ) VALUES (
            ${orderId},
            (SELECT id FROM products WHERE slug = ${line.product.slug} LIMIT 1),
            ${line.product.name},
            ${line.product.sku},
            ${line.product.price},
            ${line.qty}
          )
        `;

        // Atomic inventory deduction with strict stock check
        const updateRes = await tx`
          UPDATE products
          SET warehouse_qty = warehouse_qty - ${line.qty}
          WHERE slug = ${line.product.slug} AND warehouse_qty >= ${line.qty}
          RETURNING warehouse_qty
        `;

        if (updateRes.length === 0) {
          throw new Error(`Insufficient stock for "${line.product.name}". Requested ${line.qty} unit(s).`);
        }
      }
    });

    return { success: true, orderId };
  });

export const getAdminOrdersFn = createServerFn({ method: "GET" }).handler(async () => {
  const orders = await sql`
    SELECT
      o.id,
      o.customer_id,
      o.account_type,
      o.full_name,
      o.phone,
      o.email,
      o.company_name,
      o.bin_vat_number,
      o.street_address,
      o.city,
      o.delivery_notes,
      o.payment_method,
      o.subtotal::numeric,
      o.delivery_charge::numeric,
      o.vat_amount::numeric,
      o.total::numeric,
      o.status,
      o.created_at,
      o.updated_at,
      c.company_name AS customer_company,
      c.business_type AS customer_business_type,
      COALESCE(
        json_agg(
          json_build_object(
            'id', oi.id,
            'productId', oi.product_id,
            'productName', oi.product_name,
            'productSku', oi.product_sku,
            'unitPrice', oi.unit_price::numeric,
            'qty', oi.qty,
            'lineTotal', oi.line_total::numeric
          )
        ) FILTER (WHERE oi.id IS NOT NULL),
        '[]'::json
      ) AS items
    FROM orders o
    LEFT JOIN customers c ON o.customer_id = c.id
    LEFT JOIN order_items oi ON o.id = oi.order_id
    GROUP BY o.id, c.company_name, c.business_type
    ORDER BY o.created_at DESC
  `;

  return orders.map((o) => ({
    id: o.id,
    customerId: o.customer_id,
    accountType: o.account_type,
    fullName: o.full_name,
    phone: o.phone,
    email: o.email,
    companyName: o.company_name || o.customer_company || null,
    binVatNumber: o.bin_vat_number,
    streetAddress: o.street_address,
    city: o.city,
    deliveryNotes: o.delivery_notes,
    paymentMethod: o.payment_method,
    subtotal: Number(o.subtotal),
    deliveryCharge: Number(o.delivery_charge),
    vatAmount: Number(o.vat_amount),
    total: Number(o.total),
    status: o.status,
    createdAt: o.created_at ? new Date(o.created_at).toISOString() : new Date().toISOString(),
    updatedAt: o.updated_at ? new Date(o.updated_at).toISOString() : new Date().toISOString(),
    items: o.items || [],
  }));
});

export const updateOrderStatusFn = createServerFn({ method: "POST" })
  .validator((payload: { id: string; status: "pending" | "confirmed" | "dispatched" | "delivered" | "cancelled" }) => payload)
  .handler(async ({ data }) => {
    await sql`
      UPDATE orders
      SET status = ${data.status}, updated_at = NOW()
      WHERE id = ${data.id}
    `;
    return { success: true };
  });

// -----------------------------------------------------------------------------
// 5. SITE SETTINGS
// -----------------------------------------------------------------------------
export const getSiteSettingsFn = createServerFn({ method: "GET" }).handler(async () => {
  const rows = await sql`SELECT * FROM site_settings WHERE id = 1 LIMIT 1`;
  if (!rows.length) {
    return {
      siteName: "PAGE International",
      tagline: "Think Next. Build Better.",
      primaryColor: "#dc2626",
      contactEmail: "info@pageinternational.com",
      contactPhone: "+880-1700-000000",
      heroHeadline: "THINK NEXT.",
      heroSubline: "Built to Perform. Certified to Last.",
      announcementBar: "",
      announcementActive: false,
    } as SiteSetting;
  }
  const s = rows[0];
  return {
    siteName: s.site_name,
    tagline: s.tagline,
    primaryColor: s.primary_color,
    contactEmail: s.contact_email,
    contactPhone: s.contact_phone,
    heroHeadline: s.hero_headline,
    heroSubline: s.hero_subline,
    announcementBar: s.announcement_bar,
    announcementActive: s.announcement_active,
  } as SiteSetting;
});

export const updateSiteSettingsFn = createServerFn({ method: "POST" })
  .validator((settings: SiteSetting) => settings)
  .handler(async ({ data: s }) => {
    await sql`
      UPDATE site_settings
      SET
        site_name = ${s.siteName},
        tagline = ${s.tagline},
        primary_color = ${s.primaryColor},
        contact_email = ${s.contactEmail},
        contact_phone = ${s.contactPhone},
        hero_headline = ${s.heroHeadline},
        hero_subline = ${s.heroSubline},
        announcement_bar = ${s.announcementBar},
        announcement_active = ${s.announcementActive}
      WHERE id = 1
    `;
    return { success: true };
  });

// -----------------------------------------------------------------------------
// 6. ADMIN AUTH & USERS
// -----------------------------------------------------------------------------
export const loginAdminFn = createServerFn({ method: "POST" })
  .validator((creds: { email: string; password?: string }) => creds)
  .handler(async ({ data: { email, password } }) => {
    const cleanEmail = email.trim().toLowerCase();

    // Query user and verify password with pgcrypto crypt()
    const rows = await sql`
      SELECT id, email, name, role, status, avatar_url, created_at, last_login,
        (password_hash = crypt(${password || "admin123"}, password_hash)) AS valid_password
      FROM admin_users
      WHERE LOWER(email) = ${cleanEmail}
      LIMIT 1
    `;

    if (!rows.length) {
      return { success: false, error: "Invalid email or credentials." };
    }

    const u = rows[0];
    if (u.status === "suspended") {
      return { success: false, error: "This admin account is suspended." };
    }

    if (!u.valid_password && password) {
      return { success: false, error: "Incorrect password." };
    }

    // Update last_login
    await sql`UPDATE admin_users SET last_login = NOW() WHERE id = ${u.id}`;

    // Create session token
    const token = Math.random().toString(36).slice(2) + Date.now().toString(36);
    await sql`
      INSERT INTO admin_sessions (token, user_id, expires_at)
      VALUES (${token}, ${u.id}, NOW() + INTERVAL '7 days')
    `;

    const user: AdminUser = {
      id: u.id,
      email: u.email,
      name: u.name,
      role: u.role,
      status: u.status,
      avatar: u.avatar_url,
      createdAt: u.created_at ? new Date(u.created_at).toISOString() : new Date().toISOString(),
      lastLogin: new Date().toISOString(),
    };

    setAdminSessionCookie(token);

    return { success: true, user, token };
  });

export const logoutAdminFn = createServerFn({ method: "POST" }).handler(async () => {
  clearAdminSessionCookie();
  return { success: true };
});

export const getCurrentAdminFn = createServerFn({ method: "GET" }).handler(async () => {
  return await getAdminAuthContext();
});

export const getAdminUsersFn = createServerFn({ method: "GET" }).handler(async () => {
  const rows = await sql`
    SELECT id, email, name, role, status, avatar_url, created_at, last_login
    FROM admin_users
    ORDER BY created_at ASC
  `;
  return rows.map((u) => ({
    id: u.id,
    email: u.email,
    name: u.name,
    role: u.role,
    status: u.status,
    avatar: u.avatar_url,
    createdAt: u.created_at ? new Date(u.created_at).toISOString() : new Date().toISOString(),
    lastLogin: u.last_login ? new Date(u.last_login).toISOString() : "Never",
  } as AdminUser));
});

export const addAdminUserFn = createServerFn({ method: "POST" })
  .validator((u: any) => u)
  .handler(async ({ data: u }) => {
    const rows = await sql`
      INSERT INTO admin_users (email, password_hash, name, role, status)
      VALUES (
        ${u.email.trim().toLowerCase()},
        crypt(${u.password || "admin123"}, gen_salt('bf')),
        ${u.name},
        ${u.role || "staff"},
        ${u.status || "active"}
      )
      RETURNING id, email, name, role, status, avatar_url, created_at, last_login
    `;
    const res = rows[0];
    return {
      id: res.id,
      email: res.email,
      name: res.name,
      role: res.role,
      status: res.status,
      avatar: res.avatar_url,
      createdAt: new Date().toISOString(),
      lastLogin: "Never",
    } as AdminUser;
  });

export const updateAdminUserFn = createServerFn({ method: "POST" })
  .validator((payload: { id: string; patch: Partial<AdminUser> }) => payload)
  .handler(async ({ data: { id, patch } }) => {
    await sql`
      UPDATE admin_users
      SET
        name = COALESCE(${patch.name || null}, name),
        role = COALESCE(${patch.role || null}, role),
        status = COALESCE(${patch.status || null}, status)
      WHERE id = ${id}
    `;
    return { success: true };
  });

export const deleteAdminUserFn = createServerFn({ method: "POST" })
  .validator((id: string) => id)
  .handler(async ({ data: id }) => {
    await sql`DELETE FROM admin_users WHERE id = ${id}`;
    return { success: true };
  });

// -----------------------------------------------------------------------------
// 7. REVIEWS & HUBS
// -----------------------------------------------------------------------------
export const getReviewsFn = createServerFn({ method: "GET" }).handler(async () => {
  const rows = await sql`
    SELECT * FROM reviews WHERE is_published = TRUE ORDER BY created_at DESC
  `;
  return rows.map((r) => ({
    id: r.id,
    name: r.name,
    role: r.role,
    workshop: r.workshop,
    location: r.location,
    rating: r.rating,
    date: r.review_date,
    verifiedBuyer: r.verified_buyer,
    equipment: r.equipment_name,
    category: r.category,
    title: r.title,
    comment: r.comment,
    badge: r.badge,
    avatarInitials: r.avatar_initials,
    avatarColor: r.avatar_color,
    highlights: r.highlights || [],
    installationTag: r.installation_tag,
    helpfulCount: r.helpful_count,
  } as Review));
});

export const getServiceCentersFn = createServerFn({ method: "GET" }).handler(async () => {
  const rows = await sql`SELECT * FROM service_centers WHERE is_active = TRUE ORDER BY name ASC`;
  return rows.map((c) => ({
    id: c.id,
    name: c.name,
    area: c.area,
    address: c.address,
    rating: Number(c.rating || 5.0),
    hours: c.hours,
    services: c.services || [],
    x: Number(c.map_x || 50),
    y: Number(c.map_y || 50),
  }));
});

// -----------------------------------------------------------------------------
// 8. SEARCH & STATS RPC
// -----------------------------------------------------------------------------
export const searchProductsFn = createServerFn({ method: "POST" })
  .validator((params: {
    query?: string;
    category?: string;
    mobility?: string;
    minPrice?: number;
    maxPrice?: number;
    stockStatus?: string;
  }) => params)
  .handler(async ({ data: params }) => {
    const q = params.query ? `%${params.query.trim()}%` : null;
    const rawQ = params.query ? params.query.trim() : "";
    const cat = params.category && params.category !== "All" ? params.category : null;
    const mob = params.mobility ?? null;
    const minP = params.minPrice !== undefined ? params.minPrice : null;
    const maxP = params.maxPrice !== undefined ? params.maxPrice : null;
    const stock = params.stockStatus ?? null;

    const rows = await sql`
      SELECT *
      FROM products
      WHERE
        (${q === null} OR name ILIKE ${q} OR brand ILIKE ${q} OR sku ILIKE ${q})
        AND (${cat === null} OR category = ${cat})
        AND (${mob === null} OR ${mob} = ANY(mobility))
        AND (${minP === null} OR price >= ${minP})
        AND (${maxP === null} OR price <= ${maxP})
        AND (${stock === null} OR stock_status = ${stock})
      ORDER BY
        CASE WHEN ${rawQ !== ""} THEN similarity(name, ${rawQ}) ELSE 0 END DESC,
        created_at DESC
    `;

    return rows.map(mapDbProduct);
  });

export const getAdminStatsFn = createServerFn({ method: "GET" }).handler(async () => {
  const [
    invStats,
    quoteStats,
    bookingStats,
    userStats,
    orderStats,
    categoryDist,
    monthlyRevenue,
  ] = await Promise.all([
    sql`
      SELECT
        COUNT(*)::int AS total_products,
        COUNT(*) FILTER (WHERE warehouse_qty <= reorder_level AND warehouse_qty > 0)::int AS low_stock,
        COUNT(*) FILTER (WHERE warehouse_qty = 0)::int AS out_of_stock,
        COALESCE(SUM(price * warehouse_qty), 0)::numeric AS total_inventory_value
      FROM products
    `,
    sql`
      SELECT
        COUNT(*)::int AS total_quotes,
        COUNT(*) FILTER (WHERE status = 'pending')::int AS pending_quotes,
        COUNT(*) FILTER (WHERE status = 'replied')::int AS replied_quotes,
        COUNT(*) FILTER (WHERE status = 'accepted')::int AS accepted_quotes
      FROM quote_requests
    `,
    sql`
      SELECT
        COUNT(*)::int AS total_bookings,
        COUNT(*) FILTER (WHERE status = 'pending')::int AS pending_bookings,
        COUNT(*) FILTER (WHERE status = 'confirmed')::int AS confirmed_bookings,
        COUNT(*) FILTER (WHERE status = 'completed')::int AS completed_bookings
      FROM consultation_bookings
    `,
    sql`
      SELECT
        COUNT(*)::int AS total_users,
        COUNT(*) FILTER (WHERE status = 'active')::int AS active_users
      FROM admin_users
    `,
    sql`
      SELECT
        COUNT(*)::int AS total_orders,
        COUNT(*) FILTER (WHERE status = 'pending')::int AS pending_orders,
        COUNT(*) FILTER (WHERE status = 'delivered')::int AS delivered_orders,
        COALESCE(SUM(total) FILTER (WHERE status != 'cancelled'), 0)::numeric AS total_revenue
      FROM orders
    `,
    sql`
      SELECT category AS name, COUNT(*)::int AS value
      FROM products
      GROUP BY category
      ORDER BY value DESC
    `,
    sql`
      SELECT
        TO_CHAR(created_at, 'Mon') AS month,
        DATE_TRUNC('month', created_at) AS month_date,
        COALESCE(SUM(total), 0)::numeric AS revenue
      FROM orders
      WHERE status != 'cancelled'
      GROUP BY TO_CHAR(created_at, 'Mon'), DATE_TRUNC('month', created_at)
      ORDER BY month_date ASC
      LIMIT 6
    `,
  ]);

  const inv = invStats[0];
  const q = quoteStats[0];
  const b = bookingStats[0];
  const u = userStats[0];
  const o = orderStats[0];

  return {
    totalProducts: inv.total_products,
    lowStock: inv.low_stock,
    outOfStock: inv.out_of_stock,
    totalValue: Number(inv.total_inventory_value),
    totalQuotes: q.total_quotes,
    pendingQuotes: q.pending_quotes,
    repliedQuotes: q.replied_quotes,
    acceptedQuotes: q.accepted_quotes,
    totalBookings: b.total_bookings,
    pendingBookings: b.pending_bookings,
    confirmedBookings: b.confirmed_bookings,
    completedBookings: b.completed_bookings,
    totalUsers: u.total_users,
    activeUsers: u.active_users,
    totalOrders: o.total_orders,
    pendingOrders: o.pending_orders,
    deliveredOrders: o.delivered_orders,
    totalRevenue: Number(o.total_revenue),
    categoryDistribution: categoryDist.map((c) => ({ name: c.name, value: c.value })),
    revenueData:
      monthlyRevenue.length > 0
        ? monthlyRevenue.map((m) => ({ month: m.month, revenue: Number(m.revenue) }))
        : [
            { month: "May", revenue: 1250000 },
            { month: "Jun", revenue: 1890000 },
            { month: "Jul", revenue: 2140000 },
            { month: "Aug", revenue: 1760000 },
            { month: "Sep", revenue: 2350000 },
            { month: "Oct", revenue: 2680000 },
          ],
  };
});

// -----------------------------------------------------------------------------
// 9. CUSTOMER AUTHENTICATION & PORTAL RPCS (HttpOnly Cookie Protected)
// -----------------------------------------------------------------------------

export const registerCustomerFn = createServerFn({ method: "POST" })
  .validator((data: {
    email: string;
    password: string;
    fullName: string;
    phone: string;
    companyName?: string;
    binVatNumber?: string;
    businessType?: string;
    streetAddress?: string;
    city?: string;
  }) => data)
  .handler(async ({ data }) => {
    const res = await registerDbCustomer(data);
    if (res.success && res.token) {
      setCustomerSessionCookie(res.token);
    }
    return { success: res.success, customer: res.customer, error: res.error };
  });

export const loginCustomerFn = createServerFn({ method: "POST" })
  .validator((credentials: { email: string; password: string }) => credentials)
  .handler(async ({ data: { email, password } }) => {
    const res = await loginDbCustomer(email, password);
    if (res.success && res.token) {
      setCustomerSessionCookie(res.token);
    }
    return { success: res.success, customer: res.customer, error: res.error };
  });

export const logoutCustomerFn = createServerFn({ method: "POST" }).handler(async () => {
  clearCustomerSessionCookie();
  return { success: true };
});

export const getCurrentCustomerFn = createServerFn({ method: "GET" }).handler(async () => {
  return await getCustomerAuthContext();
});

export const getCustomerOrdersFn = createServerFn({ method: "GET" }).handler(async () => {
  const customer = await getCustomerAuthContext();
  if (!customer) {
    throw new Error("Unauthorized: Active customer session required.");
  }
  return await getDbCustomerOrders(customer.id);
});

export const getCustomerQuotesFn = createServerFn({ method: "GET" }).handler(async () => {
  const customer = await getCustomerAuthContext();
  if (!customer) {
    throw new Error("Unauthorized: Active customer session required.");
  }
  return await getDbCustomerQuotes(customer.id);
});

export const getCustomerBookingsFn = createServerFn({ method: "GET" }).handler(async () => {
  const customer = await getCustomerAuthContext();
  if (!customer) {
    throw new Error("Unauthorized: Active customer session required.");
  }
  return await getDbCustomerBookings(customer.id);
});

export const updateCustomerProfileFn = createServerFn({ method: "POST" })
  .validator((data: {
    fullName?: string;
    phone?: string;
    companyName?: string;
    binVatNumber?: string;
    businessType?: string;
    streetAddress?: string;
    city?: string;
  }) => data)
  .handler(async ({ data }) => {
    const currentCustomer = await getCustomerAuthContext();
    if (!currentCustomer) throw new Error("Unauthorized. Please log in.");
    return await updateDbCustomerProfile(currentCustomer.id, data);
  });

export const changeCustomerPasswordFn = createServerFn({ method: "POST" })
  .validator((data: { currentPassword: string; newPassword: string }) => data)
  .handler(async ({ data }) => {
    const currentCustomer = await getCustomerAuthContext();
    if (!currentCustomer) throw new Error("Unauthorized. Please log in.");
    return await changeDbCustomerPassword(currentCustomer.id, data.currentPassword, data.newPassword);
  });

export const lookupPublicOrderOrQuoteFn = createServerFn({ method: "POST" })
  .validator((data: { referenceId: string; phone: string }) => data)
  .handler(async ({ data }) => {
    const rawRef = (data.referenceId || "").trim().replace(/^#/, "");
    const rawPhoneDigits = (data.phone || "").replace(/\D/g, "");
    const phoneSuffix = rawPhoneDigits.slice(-7);

    if (!rawRef || phoneSuffix.length < 5) {
      return {
        success: false,
        error: "Please provide a valid Reference ID and at least 6 digits of your contact phone number.",
      };
    }

    // 1. Search in orders
    const orders = await sql`
      SELECT
        o.id,
        o.account_type,
        o.full_name,
        o.phone,
        o.email,
        o.company_name,
        o.street_address,
        o.city,
        o.payment_method,
        o.subtotal::numeric,
        o.delivery_charge::numeric,
        o.vat_amount::numeric,
        o.total::numeric,
        o.status,
        o.created_at,
        o.updated_at,
        COALESCE(
          json_agg(
            json_build_object(
              'productName', oi.product_name,
              'productSku', oi.product_sku,
              'unitPrice', oi.unit_price::numeric,
              'qty', oi.qty,
              'lineTotal', oi.line_total::numeric
            )
          ) FILTER (WHERE oi.id IS NOT NULL),
          '[]'::json
        ) AS items
      FROM orders o
      LEFT JOIN order_items oi ON o.id = oi.order_id
      WHERE LOWER(o.id) = LOWER(${rawRef})
        AND REGEXP_REPLACE(o.phone, '\\D', '', 'g') LIKE '%' || ${phoneSuffix}
      GROUP BY o.id
      LIMIT 1
    `;

    if (orders.length > 0) {
      const o = orders[0];
      return {
        success: true,
        type: "order" as const,
        record: {
          id: o.id,
          accountType: o.account_type,
          fullName: o.full_name,
          companyName: o.company_name,
          phone: o.phone,
          email: o.email,
          city: o.city,
          streetAddress: o.street_address,
          paymentMethod: o.payment_method,
          subtotal: Number(o.subtotal),
          deliveryCharge: Number(o.delivery_charge),
          total: Number(o.total),
          status: o.status,
          createdAt: new Date(o.created_at).toISOString(),
          updatedAt: new Date(o.updated_at).toISOString(),
          items: o.items || [],
        },
      };
    }

    // 2. Search in quote_requests
    const quotes = await sql`
      SELECT
        q.id,
        q.company_name,
        q.contact_name,
        q.phone,
        q.email,
        q.business_type,
        q.city,
        q.status,
        q.admin_reply AS reply,
        q.quoted_total::numeric AS quoted_price,
        q.created_at,
        q.updated_at,
        COALESCE(
          json_agg(
            json_build_object(
              'productName', qi.product_name,
              'productSku', qi.product_sku,
              'qty', qi.qty,
              'unitPrice', qi.quoted_unit_price::numeric
            )
          ) FILTER (WHERE qi.id IS NOT NULL),
          '[]'::json
        ) AS items
      FROM quote_requests q
      LEFT JOIN quote_request_items qi ON q.id = qi.quote_id
      WHERE LOWER(q.id) = LOWER(${rawRef})
        AND REGEXP_REPLACE(q.phone, '\\D', '', 'g') LIKE '%' || ${phoneSuffix}
      GROUP BY q.id
      LIMIT 1
    `;

    if (quotes.length > 0) {
      const q = quotes[0];
      return {
        success: true,
        type: "quote" as const,
        record: {
          id: q.id,
          companyName: q.company_name,
          contactName: q.contact_name,
          phone: q.phone,
          email: q.email,
          businessType: q.business_type,
          city: q.city,
          status: q.status,
          reply: q.reply,
          quotedPrice: q.quoted_price ? Number(q.quoted_price) : null,
          createdAt: new Date(q.created_at).toISOString(),
          updatedAt: new Date(q.updated_at).toISOString(),
          items: q.items || [],
        },
      };
    }

    return {
      success: false,
      error: "No matching order or quotation was found for the specified Reference ID and contact phone number. Please check your reference code.",
    };
  });
