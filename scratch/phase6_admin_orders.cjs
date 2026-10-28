const fs = require('fs');
const path = require('path');

const root = 'C:/Users/glafi/.gemini/antigravity/scratch/pixel-perfect';

// -----------------------------------------------------------------------------
// 1. UPDATE src/lib/server-api.ts
// -----------------------------------------------------------------------------
{
  const filePath = path.join(root, 'src/lib/server-api.ts');
  let content = fs.readFileSync(filePath, 'utf8');

  if (!content.includes('export const getAdminOrdersFn')) {
    const targetAnchor = '    return { success: true, orderId };\n  });';
    const targetAnchorCRLF = '    return { success: true, orderId };\r\n  });';

    const orderFns = `\n\nexport const getAdminOrdersFn = createServerFn({ method: "GET" }).handler(async () => {
  const orders = await sql\`
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
  \`;

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
    await sql\`
      UPDATE orders
      SET status = \${data.status}, updated_at = NOW()
      WHERE id = \${data.id}
    \`;
    return { success: true };
  });`;

    if (content.includes(targetAnchorCRLF)) {
      content = content.replace(targetAnchorCRLF, targetAnchorCRLF + orderFns.replace(/\n/g, '\r\n'));
    } else if (content.includes(targetAnchor)) {
      content = content.replace(targetAnchor, targetAnchor + orderFns);
    } else {
      console.warn("Could not find targetAnchor in server-api.ts");
    }

    fs.writeFileSync(filePath, content, 'utf8');
    console.log("Updated src/lib/server-api.ts with getAdminOrdersFn and updateOrderStatusFn");
  }
}

// -----------------------------------------------------------------------------
// 2. UPDATE src/lib/admin-data.ts
// -----------------------------------------------------------------------------
{
  const filePath = path.join(root, 'src/lib/admin-data.ts');
  let content = fs.readFileSync(filePath, 'utf8');

  if (!content.includes('export type AdminOrder')) {
    // Add imports from server-api
    content = content.replace(
      '  createOrderFn,',
      '  createOrderFn,\n  getAdminOrdersFn,\n  updateOrderStatusFn,'
    );

    // Add AdminOrder types
    const typeTarget = 'export type ConsultBooking = {';
    const typeTargetCRLF = 'export type ConsultBooking = {';
    const orderTypes = `export type OrderLineItem = {
  id: number;
  productId?: string | undefined;
  productName: string;
  productSku: string;
  unitPrice: number;
  qty: number;
  lineTotal: number;
};

export type AdminOrder = {
  id: string;
  customerId?: string | null | undefined;
  accountType: "personal" | "business";
  fullName: string;
  phone: string;
  email?: string | null | undefined;
  companyName?: string | null | undefined;
  binVatNumber?: string | null | undefined;
  streetAddress: string;
  city: string;
  deliveryNotes?: string | null | undefined;
  paymentMethod: "cod" | "b2b" | "card";
  subtotal: number;
  deliveryCharge: number;
  vatAmount: number;
  total: number;
  status: "pending" | "confirmed" | "dispatched" | "delivered" | "cancelled";
  createdAt: string;
  updatedAt: string;
  items: OrderLineItem[];
};

`;

    content = content.replace(typeTarget, orderTypes + typeTarget);

    // Add orders to LS_KEYS
    content = content.replace(
      'settings: "page_admin_settings",',
      'settings: "page_admin_settings",\n  orders: "page_admin_orders",'
    );

    // Add seedOrders and order helper methods
    const helpersTarget = '// Settings\nexport function getSettings(): SiteSetting {';
    const helpersTargetCRLF = '// Settings\r\nexport function getSettings(): SiteSetting {';
    const orderHelpers = `// Orders
export function getOrders(): AdminOrder[] {
  return load(LS_KEYS.orders, []);
}
export function saveOrders(orders: AdminOrder[]) {
  save(LS_KEYS.orders, orders);
}
export function updateOrderStatus(id: string, status: AdminOrder["status"]) {
  const orders = getOrders().map((o) =>
    o.id === id ? { ...o, status, updatedAt: now() } : o
  );
  saveOrders(orders);
  try {
    updateOrderStatusFn({ data: { id, status } }).catch((err) => console.warn("DB order status sync failed:", err));
  } catch (e) {}
}

`;

    if (content.includes(helpersTargetCRLF)) {
      content = content.replace(helpersTargetCRLF, orderHelpers.replace(/\n/g, '\r\n') + helpersTargetCRLF);
    } else if (content.includes(helpersTarget)) {
      content = content.replace(helpersTarget, orderHelpers + helpersTarget);
    }

    // Add orders to syncWithDatabase()
    content = content.replace(
      'const [inv, quotes, bookings, settings, users] = await Promise.allSettled([',
      'const [inv, quotes, bookings, settings, users, orders] = await Promise.allSettled([\n      getAdminOrdersFn(),'
    );
    content = content.replace(
      'if (users.status === "fulfilled" && users.value && users.value.length) {\n      save(LS_KEYS.users, users.value);\n    }',
      'if (users.status === "fulfilled" && users.value && users.value.length) {\n      save(LS_KEYS.users, users.value);\n    }\n    if (orders.status === "fulfilled" && orders.value) {\n      save(LS_KEYS.orders, orders.value);\n    }'
    );

    // Update getAdminStats() to count orders
    content = content.replace(
      '  const users = getUsers();',
      '  const users = getUsers();\n  const orders = getOrders();'
    );
    content = content.replace(
      '    activeUsers: users.filter((u) => u.status === "active").length,',
      `    activeUsers: users.filter((u) => u.status === "active").length,
    totalOrders: orders.length,
    pendingOrders: orders.filter((o) => o.status === "pending").length,
    deliveredOrders: orders.filter((o) => o.status === "delivered").length,
    totalRevenue: orders.filter((o) => o.status !== "cancelled").reduce((acc, o) => acc + o.total, 0),`
    );

    fs.writeFileSync(filePath, content, 'utf8');
    console.log("Updated src/lib/admin-data.ts with AdminOrder and order helper functions");
  }
}

// -----------------------------------------------------------------------------
// 3. UPDATE src/components/admin/AdminLayout.tsx
// -----------------------------------------------------------------------------
{
  const filePath = path.join(root, 'src/components/admin/AdminLayout.tsx');
  let content = fs.readFileSync(filePath, 'utf8');

  if (!content.includes('label: "Orders"')) {
    content = content.replace(
      'import {\n  LayoutDashboard,',
      'import {\n  LayoutDashboard,\n  ShoppingBag,'
    );

    content = content.replace(
      '  { to: "/admin", icon: LayoutDashboard, label: "Dashboard", exact: true },',
      '  { to: "/admin", icon: LayoutDashboard, label: "Dashboard", exact: true },\n  { to: "/admin/orders", icon: ShoppingBag, label: "Orders" },'
    );

    // Add Orders pending badge
    const badgeTarget = '{!collapsed && item.label === "Quotations" && stats.pendingQuotes > 0 && (';
    const orderBadge = `{!collapsed && item.label === "Orders" && (stats as any).pendingOrders > 0 && (
                  <span className="ml-auto text-[10px] bg-emerald-500/20 text-emerald-400 px-1.5 py-0.5 rounded-full font-bold">
                    {(stats as any).pendingOrders}
                  </span>
                )}\n                `;
    content = content.replace(badgeTarget, orderBadge + badgeTarget);

    fs.writeFileSync(filePath, content, 'utf8');
    console.log("Updated src/components/admin/AdminLayout.tsx with Orders navigation item");
  }
}

console.log("Backend RPCs and layout updated successfully.");
