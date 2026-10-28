const fs = require('fs');
const path = require('path');

const root = 'C:/Users/glafi/.gemini/antigravity/scratch/pixel-perfect';

// -----------------------------------------------------------------------------
// 1. UPDATE src/lib/server-api.ts
// -----------------------------------------------------------------------------
{
  const filePath = path.join(root, 'src/lib/server-api.ts');
  let content = fs.readFileSync(filePath, 'utf8');

  if (!content.includes('export const lookupPublicOrderOrQuoteFn')) {
    const trackingRpc = `
export const lookupPublicOrderOrQuoteFn = createServerFn({ method: "POST" })
  .validator((data: { referenceId: string; phone: string }) => data)
  .handler(async ({ data }) => {
    const rawRef = (data.referenceId || "").trim().replace(/^#/, "");
    const rawPhoneDigits = (data.phone || "").replace(/\\D/g, "");
    const phoneSuffix = rawPhoneDigits.slice(-7);

    if (!rawRef || phoneSuffix.length < 5) {
      return {
        success: false,
        error: "Please provide a valid Reference ID and at least 6 digits of your contact phone number.",
      };
    }

    // 1. Search in orders
    const orders = await sql\`
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
      WHERE LOWER(o.id) = LOWER(\${rawRef})
        AND REGEXP_REPLACE(o.phone, '\\\\D', '', 'g') LIKE '%' || \${phoneSuffix}
      GROUP BY o.id
      LIMIT 1
    \`;

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
    const quotes = await sql\`
      SELECT
        q.id,
        q.company_name,
        q.contact_name,
        q.phone,
        q.email,
        q.business_type,
        q.city,
        q.status,
        q.reply,
        q.quoted_price::numeric,
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
      WHERE LOWER(q.id) = LOWER(\${rawRef})
        AND REGEXP_REPLACE(q.phone, '\\\\D', '', 'g') LIKE '%' || \${phoneSuffix}
      GROUP BY q.id
      LIMIT 1
    \`;

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
`;

    content += trackingRpc;
    fs.writeFileSync(filePath, content, 'utf8');
    console.log("Updated src/lib/server-api.ts with lookupPublicOrderOrQuoteFn");
  }
}

// -----------------------------------------------------------------------------
// 2. UPDATE src/components/site/Header.tsx
// -----------------------------------------------------------------------------
{
  const filePath = path.join(root, 'src/components/site/Header.tsx');
  let content = fs.readFileSync(filePath, 'utf8');

  if (!content.includes('to: "/track"')) {
    content = content.replace(
      '  { to: "/solutions", label: "Solutions" },',
      '  { to: "/solutions", label: "Solutions" },\n  { to: "/track", label: "Track" },'
    );
    fs.writeFileSync(filePath, content, 'utf8');
    console.log("Updated src/components/site/Header.tsx with Track link");
  }
}
