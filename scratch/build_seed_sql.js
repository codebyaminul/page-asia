import { createServer } from "vite";
import fs from "fs";
import path from "path";

function sqlEscape(str) {
  if (str === null || str === undefined) return "NULL";
  return "'" + String(str).replace(/'/g, "''") + "'";
}

function sqlArray(arr) {
  if (!arr || !arr.length) return "'{}'::text[]";
  const items = arr.map((item) => sqlEscape(item)).join(", ");
  return `ARRAY[${items}]::text[]`;
}

function sqlJson(obj) {
  if (obj === null || obj === undefined) return "'[]'::jsonb";
  return sqlEscape(JSON.stringify(obj)) + "::jsonb";
}

async function generate() {
  const server = await createServer();
  const dataModule = await server.ssrLoadModule("./src/lib/data.ts");
  const reviewsModule = await server.ssrLoadModule("./src/lib/reviews.ts");
  await server.close();

  const { products, centers, services } = dataModule;
  const { reviewsData } = reviewsModule;

  const lines = [];
  lines.push(`-- =============================================================================`);
  lines.push(`-- PAGE INTERNATIONAL (PIXEL-PERFECT) - SEED DATA MIGRATION 0002`);
  lines.push(`-- Target Engine: PostgreSQL 15+`);
  lines.push(`-- =============================================================================\n`);

  // 1. Service Centers
  lines.push(`-- -----------------------------------------------------------------------------`);
  lines.push(`-- 1. SERVICE CENTERS (3 Hubs)`);
  lines.push(`-- -----------------------------------------------------------------------------`);
  for (const c of centers) {
    lines.push(`INSERT INTO service_centers (id, name, area, address, rating, hours, services, map_x, map_y, is_active)
VALUES (
  ${sqlEscape(c.id)},
  ${sqlEscape(c.name)},
  ${sqlEscape(c.area)},
  ${sqlEscape(c.address)},
  ${c.rating || "NULL"},
  ${sqlEscape(c.hours)},
  ${sqlArray(c.services)},
  ${c.x || "NULL"},
  ${c.y || "NULL"},
  TRUE
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  area = EXCLUDED.area,
  address = EXCLUDED.address,
  rating = EXCLUDED.rating,
  hours = EXCLUDED.hours,
  services = EXCLUDED.services,
  map_x = EXCLUDED.map_x,
  map_y = EXCLUDED.map_y;\n`);
  }

  // 2. Services (Engineering Offerings)
  lines.push(`-- -----------------------------------------------------------------------------`);
  lines.push(`-- 2. SERVICES (8 Engineering Offerings)`);
  lines.push(`-- -----------------------------------------------------------------------------`);
  services.forEach((s, idx) => {
    lines.push(`INSERT INTO services (slug, name, description, price_from, duration, sort_order, is_active)
VALUES (
  ${sqlEscape(s.slug)},
  ${sqlEscape(s.name)},
  ${sqlEscape(s.desc)},
  ${s.from !== undefined ? s.from : "NULL"},
  ${sqlEscape(s.duration)},
  ${idx + 1},
  TRUE
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  price_from = EXCLUDED.price_from,
  duration = EXCLUDED.duration,
  sort_order = EXCLUDED.sort_order;\n`);
  });

  // 3. Booking Service Options
  lines.push(`-- -----------------------------------------------------------------------------`);
  lines.push(`-- 3. BOOKING SERVICE OPTIONS (6 Wizard Demonstration Options)`);
  lines.push(`-- -----------------------------------------------------------------------------`);
  const b2bOptions = [
    {
      id: "bay-planning",
      name: "Turnkey Workshop Bay Planning & 2D/3D Layout",
      desc: "Architectural consultation for new workshop investments or bay expansions.",
    },
    {
      id: "lift-demo",
      name: "Vehicle Lift Machinery Demonstration",
      desc: "Live demonstration of 2-post, 4-post, or scissor lifts under load.",
    },
    {
      id: "tyre-demo",
      name: "Tyre Changer & 3D Wheel Alignment Demo",
      desc: "Testing run-flat tyre mounting and computerized 4-wheel alignment cameras.",
    },
    {
      id: "diag-demo",
      name: "Diagnostic Tablet & ADAS Calibration Live Trial",
      desc: "Live ECU scanning, bidirectional tests, and radar/camera target calibration.",
    },
    {
      id: "ev-audit",
      name: "EV Workshop Transition & 1000V Tooling Consultation",
      desc: "High-voltage safety auditing, battery balancer inspection, and PPE setup.",
    },
    {
      id: "installation",
      name: "Machinery Foundation Anchoring & Rigging Service",
      desc: "Deployment of certified engineers to install and anchor workshop lifts on site.",
    },
  ];

  b2bOptions.forEach((o, idx) => {
    lines.push(`INSERT INTO booking_service_options (id, name, description, sort_order, is_active)
VALUES (
  ${sqlEscape(o.id)},
  ${sqlEscape(o.name)},
  ${sqlEscape(o.desc)},
  ${idx + 1},
  TRUE
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  sort_order = EXCLUDED.sort_order;\n`);
  });

  // 4. Products & Inventory
  lines.push(`-- -----------------------------------------------------------------------------`);
  lines.push(`-- 4. PRODUCTS & INVENTORY (${products.length} Catalog Items)`);
  lines.push(`-- -----------------------------------------------------------------------------`);
  for (const p of products) {
    const warehouseQty = p.stock === "Out of stock" ? 0 : p.stock === "Low stock" ? 3 : p.isEquipment ? 12 : 45;
    const reorderLevel = p.isEquipment ? 3 : 8;
    lines.push(`INSERT INTO products (
  slug,
  sku,
  name,
  brand,
  category,
  mobility,
  price,
  old_price,
  image_url,
  fits,
  description,
  specs,
  is_equipment,
  requires_quote,
  rating,
  reviews_count,
  warehouse_qty,
  reorder_level,
  last_restocked
) VALUES (
  ${sqlEscape(p.slug)},
  ${sqlEscape(p.sku)},
  ${sqlEscape(p.name)},
  ${sqlEscape(p.brand)},
  ${sqlEscape(p.category)},
  ${sqlArray(p.mobility)},
  ${p.price},
  ${p.oldPrice !== undefined ? p.oldPrice : "NULL"},
  ${sqlEscape(p.image)},
  ${sqlArray(p.fits)},
  ${sqlEscape(p.description)},
  ${sqlJson(p.specs)},
  ${p.isEquipment ? "TRUE" : "FALSE"},
  ${p.requiresQuote ? "TRUE" : "FALSE"},
  ${p.rating || 0.0},
  ${p.reviews || 0},
  ${warehouseQty},
  ${reorderLevel},
  NOW() - INTERVAL '15 days'
) ON CONFLICT (slug) DO UPDATE SET
  sku = EXCLUDED.sku,
  name = EXCLUDED.name,
  brand = EXCLUDED.brand,
  category = EXCLUDED.category,
  mobility = EXCLUDED.mobility,
  price = EXCLUDED.price,
  old_price = EXCLUDED.old_price,
  image_url = EXCLUDED.image_url,
  fits = EXCLUDED.fits,
  description = EXCLUDED.description,
  specs = EXCLUDED.specs,
  is_equipment = EXCLUDED.is_equipment,
  requires_quote = EXCLUDED.requires_quote,
  rating = EXCLUDED.rating,
  reviews_count = EXCLUDED.reviews_count;\n`);
  }

  // 5. Admin Users
  lines.push(`-- -----------------------------------------------------------------------------`);
  lines.push(`-- 5. ADMIN USERS (Standard Initial Accounts with bcrypt password "admin123")`);
  lines.push(`-- -----------------------------------------------------------------------------`);
  const adminUsers = [
    {
      name: "Master Administrator",
      email: "admin@pageinternational.com",
      role: "admin",
      status: "active",
    },
    {
      name: "Rafiq Hossain",
      email: "rafiq@pageinternational.com",
      role: "admin",
      status: "active",
    },
    {
      name: "Nusrat Akhter",
      email: "nusrat@pageinternational.com",
      role: "product_manager",
      status: "active",
    },
    {
      name: "Tanvir Ahmed",
      email: "staff@pageinternational.com",
      role: "staff",
      status: "active",
    },
    {
      name: "Kamal Uddin",
      email: "kamal@pageinternational.com",
      role: "viewer",
      status: "active",
    },
  ];

  for (const u of adminUsers) {
    lines.push(`INSERT INTO admin_users (email, password_hash, name, role, status, created_at, last_login)
VALUES (
  ${sqlEscape(u.email)},
  crypt('admin123', gen_salt('bf')),
  ${sqlEscape(u.name)},
  ${sqlEscape(u.role)},
  ${sqlEscape(u.status)},
  NOW() - INTERVAL '30 days',
  NOW() - INTERVAL '1 day'
) ON CONFLICT (email) DO UPDATE SET
  name = EXCLUDED.name,
  role = EXCLUDED.role,
  status = EXCLUDED.status;\n`);
  }

  // 6. Reviews
  lines.push(`-- -----------------------------------------------------------------------------`);
  lines.push(`-- 6. REVIEWS (${reviewsData.length} Verified Customer Reviews)`);
  lines.push(`-- -----------------------------------------------------------------------------`);
  for (const r of reviewsData) {
    lines.push(`INSERT INTO reviews (
  id,
  name,
  role,
  workshop,
  location,
  rating,
  review_date,
  verified_buyer,
  equipment_name,
  category,
  title,
  comment,
  badge,
  avatar_initials,
  avatar_color,
  highlights,
  installation_tag,
  helpful_count,
  is_published
) VALUES (
  ${sqlEscape(r.id)},
  ${sqlEscape(r.name)},
  ${sqlEscape(r.role)},
  ${sqlEscape(r.workshop)},
  ${sqlEscape(r.location)},
  ${r.rating},
  ${sqlEscape(r.date)},
  ${r.verifiedBuyer ? "TRUE" : "FALSE"},
  ${sqlEscape(r.equipment)},
  ${sqlEscape(r.category)},
  ${sqlEscape(r.title)},
  ${sqlEscape(r.comment)},
  ${sqlEscape(r.badge)},
  ${sqlEscape(r.avatarInitials)},
  ${sqlEscape(r.avatarColor)},
  ${sqlArray(r.highlights)},
  ${sqlEscape(r.installationTag)},
  ${r.helpfulCount || 0},
  TRUE
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  role = EXCLUDED.role,
  workshop = EXCLUDED.workshop,
  location = EXCLUDED.location,
  rating = EXCLUDED.rating,
  title = EXCLUDED.title,
  comment = EXCLUDED.comment,
  helpful_count = EXCLUDED.helpful_count;\n`);
  }

  // 7. Seed Quotes
  lines.push(`-- -----------------------------------------------------------------------------`);
  lines.push(`-- 7. SEED QUOTE REQUESTS & QUOTE ITEMS`);
  lines.push(`-- -----------------------------------------------------------------------------`);
  const quotes = [
    {
      id: "q-001",
      companyName: "AutoFix Garage Ltd.",
      contactName: "Tanvir Ahmed",
      phone: "+880-1711-123456",
      email: "tanvir@autofixbd.com",
      productSlug: "heavy-duty-2-post-lift-4t",
      productName: "Heavy-Duty 2-Post Electro-Hydraulic Lift 4.0T",
      sku: "TQ-LIFT-4000",
      qty: 2,
      businessType: "Workshop / Garage",
      city: "Dhaka",
      notes: "Need installation service as well.",
      status: "pending",
      reply: null,
      quotedTotal: null,
      unitPrice: null,
    },
    {
      id: "q-002",
      companyName: "Dhaka Tyre Center",
      contactName: "Rashid Khan",
      phone: "+880-1911-654321",
      email: "rashid@dhakatyre.com",
      productSlug: "pro-tyre-changer-assist-arm",
      productName: "Pro Automatic Tyre Changer with Dual Assist Arm",
      sku: "TQ-TC-9000",
      qty: 1,
      businessType: "Tyre Service Center",
      city: "Dhaka",
      notes: "",
      status: "replied",
      reply: "Thank you for your interest. We can offer a 5% bulk discount for 2+ units. Please confirm to proceed.",
      quotedTotal: 166250,
      unitPrice: 166250,
    },
    {
      id: "q-003",
      companyName: "Green Fleet BD",
      contactName: "Selim Reza",
      phone: "+880-1611-987654",
      email: "selim@greenfleetbd.com",
      productSlug: "ev-battery-pack-diagnostic-analyzer",
      productName: "High-Voltage EV Battery Pack Diagnostic Station",
      sku: "EV-BAT-8000",
      qty: 1,
      businessType: "Fleet Operator",
      city: "Chattogram",
      notes: "Need urgent for our EV fleet expansion.",
      status: "accepted",
      reply: "Confirmed at ৳3,60,000 with free installation. Delivery in 5 business days.",
      quotedTotal: 360000,
      unitPrice: 360000,
    },
  ];

  for (const q of quotes) {
    lines.push(`INSERT INTO quote_requests (
  id,
  company_name,
  contact_name,
  phone,
  email,
  business_type,
  city,
  notes,
  status,
  admin_reply,
  quoted_total,
  created_at
) VALUES (
  ${sqlEscape(q.id)},
  ${sqlEscape(q.companyName)},
  ${sqlEscape(q.contactName)},
  ${sqlEscape(q.phone)},
  ${sqlEscape(q.email)},
  ${sqlEscape(q.businessType)},
  ${sqlEscape(q.city)},
  ${sqlEscape(q.notes)},
  ${sqlEscape(q.status)},
  ${sqlEscape(q.reply)},
  ${q.quotedTotal !== null ? q.quotedTotal : "NULL"},
  NOW() - INTERVAL '7 days'
) ON CONFLICT (id) DO UPDATE SET
  company_name = EXCLUDED.company_name,
  contact_name = EXCLUDED.contact_name,
  phone = EXCLUDED.phone,
  email = EXCLUDED.email,
  status = EXCLUDED.status,
  admin_reply = EXCLUDED.admin_reply,
  quoted_total = EXCLUDED.quoted_total;

INSERT INTO quote_request_items (
  quote_id,
  product_id,
  product_name,
  product_sku,
  qty,
  quoted_unit_price
) VALUES (
  ${sqlEscape(q.id)},
  (SELECT id FROM products WHERE slug = ${sqlEscape(q.productSlug)}),
  ${sqlEscape(q.productName)},
  ${sqlEscape(q.sku)},
  ${q.qty},
  ${q.unitPrice !== null ? q.unitPrice : "NULL"}
);\n`);
  }

  // 8. Consultation Bookings
  lines.push(`-- -----------------------------------------------------------------------------`);
  lines.push(`-- 8. CONSULTATION BOOKINGS (Seed Appointments)`);
  lines.push(`-- -----------------------------------------------------------------------------`);
  const bookings = [
    {
      id: "b-001",
      companyName: "Speed Motors Workshop",
      contactName: "Arif Hossain",
      phone: "+880-1811-111111",
      email: "arif@speedmotors.com",
      businessType: "Workshop",
      bayCount: "3-5 Bays",
      equipmentInterest: "4-post alignment lift",
      serviceIds: ["lift-demo"],
      serviceName: "Vehicle Lift Machinery Demonstration",
      locationType: "hub",
      centerId: "dhaka-tejgaon",
      centerName: "PAGE Equipment Hub — Tejgaon",
      onsiteAddress: null,
      preferredDate: "2026-10-25",
      preferredSlot: "11:30 AM",
      notes: "Interested in 4-post alignment lift demonstration with heavy load.",
      status: "confirmed",
    },
    {
      id: "b-002",
      companyName: "EcoRide EV Center",
      contactName: "Fariha Begum",
      phone: "+880-1511-222222",
      email: "fariha@ecoride.com",
      businessType: "EV Business",
      bayCount: "2-4 Bays",
      equipmentInterest: "EV diagnostic table & balancer",
      serviceIds: ["ev-audit"],
      serviceName: "EV Workshop Transition & 1000V Tooling Consultation",
      locationType: "hub",
      centerId: "chattogram-port",
      centerName: "PAGE Regional Hub — Chattogram",
      onsiteAddress: null,
      preferredDate: "2026-10-28",
      preferredSlot: "02:00 PM",
      notes: "Planning to set up 3 EV bays with certified 1000V insulation.",
      status: "pending",
    },
  ];

  for (const b of bookings) {
    lines.push(`INSERT INTO consultation_bookings (
  id,
  company_name,
  contact_name,
  phone,
  email,
  business_type,
  bay_count,
  equipment_interest,
  service_ids,
  service_name,
  location_type,
  center_id,
  center_name,
  onsite_address,
  preferred_date,
  preferred_slot,
  notes,
  status,
  created_at
) VALUES (
  ${sqlEscape(b.id)},
  ${sqlEscape(b.companyName)},
  ${sqlEscape(b.contactName)},
  ${sqlEscape(b.phone)},
  ${sqlEscape(b.email)},
  ${sqlEscape(b.businessType)},
  ${sqlEscape(b.bayCount)},
  ${sqlEscape(b.equipmentInterest)},
  ${sqlArray(b.serviceIds)},
  ${sqlEscape(b.serviceName)},
  ${sqlEscape(b.locationType)},
  ${sqlEscape(b.centerId)},
  ${sqlEscape(b.centerName)},
  ${sqlEscape(b.onsiteAddress)},
  ${sqlEscape(b.preferredDate)}::date,
  ${sqlEscape(b.preferredSlot)},
  ${sqlEscape(b.notes)},
  ${sqlEscape(b.status)},
  NOW() - INTERVAL '3 days'
) ON CONFLICT (id) DO UPDATE SET
  company_name = EXCLUDED.company_name,
  contact_name = EXCLUDED.contact_name,
  phone = EXCLUDED.phone,
  status = EXCLUDED.status;\n`);
  }

  // 9. Site Settings
  lines.push(`-- -----------------------------------------------------------------------------`);
  lines.push(`-- 9. SITE SETTINGS`);
  lines.push(`-- -----------------------------------------------------------------------------`);
  lines.push(`INSERT INTO site_settings (
  id,
  site_name,
  tagline,
  primary_color,
  contact_email,
  contact_phone,
  hero_headline,
  hero_subline,
  announcement_bar,
  announcement_active,
  updated_at
) VALUES (
  1,
  'PAGE International',
  'Think Next. Build Better.',
  '#dc2626',
  'info@pageinternational.com',
  '+880-1700-000000',
  'THINK NEXT.',
  'Built to Perform. Certified to Last.',
  '🔥 Free installation on all 2-post lifts this month!',
  TRUE,
  NOW()
) ON CONFLICT (id) DO UPDATE SET
  site_name = EXCLUDED.site_name,
  tagline = EXCLUDED.tagline,
  announcement_bar = EXCLUDED.announcement_bar,
  announcement_active = EXCLUDED.announcement_active,
  updated_at = NOW();\n`);

  const outputPath = path.resolve("./db/migrations/0002_seed_data.sql");
  fs.writeFileSync(outputPath, lines.join("\n"), "utf-8");
  console.log(`Successfully generated ${outputPath} with ${products.length} products, ${reviewsData.length} reviews, centers, services, quotes, and bookings.`);
}

generate().catch((err) => {
  console.error("Error generating seed SQL:", err);
  process.exit(1);
});
