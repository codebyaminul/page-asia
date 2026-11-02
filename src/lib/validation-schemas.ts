import { z } from "zod";

/**
 * PAGE INTERNATIONAL — ENTERPRISE RUNTIME VALIDATION SCHEMAS (ZOD)
 * Enforces strict input validation, length constraints, and security bounds.
 */

// Common string sanitizers
const trimmedString = (min: number, max: number) =>
  z.string().trim().min(min, `Must be at least ${min} characters`).max(max, `Must be at most ${max} characters`);

// Bangladeshi & International Phone Number Validator (+8801..., 01..., or standard E.164)
export const phoneRegex = /^(\+?[0-9]{1,4}[\s-]?)?(\(?[0-9]{2,4}\)?[\s-]?)?[0-9]{6,12}$/;

// 1. Customer Authentication Schemas
export const customerLoginSchema = z.object({
  email: z.string().trim().email("Invalid email format").max(255),
  password: z.string().min(6, "Password must be at least 6 characters").max(128),
});

export const customerRegisterSchema = z.object({
  email: z.string().trim().email("Invalid email format").max(255),
  password: z.string().min(8, "Password must be at least 8 characters").max(128),
  fullName: trimmedString(2, 100),
  phone: z.string().trim().regex(phoneRegex, "Please enter a valid phone number (e.g. +880 1711-123456)"),
  companyName: z.string().trim().max(150).optional(),
  binVatNumber: z.string().trim().max(50).optional(),
  businessType: z
    .enum([
      "Workshop / Garage",
      "Tyre Service Center",
      "Dealership Workshop",
      "Fleet Operator",
      "EV Business",
      "Distributor",
      "Independent Technician",
    ])
    .optional(),
  streetAddress: z.string().trim().max(255).optional(),
  city: z.string().trim().max(100).default("Dhaka"),
});

export const changePasswordSchema = z.object({
  currentPassword: z.string().min(1, "Current password is required"),
  newPassword: z.string().min(8, "New password must be at least 8 characters").max(128),
});

export const customerProfileUpdateSchema = z.object({
  fullName: trimmedString(2, 100).optional(),
  phone: z.string().trim().regex(phoneRegex, "Invalid phone number format").optional(),
  companyName: z.string().trim().max(150).optional(),
  binVatNumber: z.string().trim().max(50).optional(),
  businessType: z
    .enum([
      "Workshop / Garage",
      "Tyre Service Center",
      "Dealership Workshop",
      "Fleet Operator",
      "EV Business",
      "Distributor",
      "Independent Technician",
    ])
    .optional(),
  streetAddress: z.string().trim().max(255).optional(),
  city: z.string().trim().max(100).optional(),
});

// 2. Order Creation Schema (Server-Authoritative Pricing: Client NEVER submits prices)
export const orderItemSchema = z.object({
  productSlug: z.string().trim().min(1, "Product slug is required").max(100),
  qty: z.number().int().positive("Quantity must be a positive whole number").max(100, "Maximum order quantity is 100 units"),
});

export const orderCreateSchema = z.object({
  items: z.array(orderItemSchema).min(1, "Order must contain at least one item"),
  customerName: trimmedString(2, 100),
  customerPhone: z.string().trim().regex(phoneRegex, "Valid contact phone is required"),
  deliveryAddress: trimmedString(5, 300),
  companyName: z.string().trim().max(150).optional(),
  idempotencyKey: z.string().uuid("Invalid idempotency key format").optional(),
});

// 3. Quotation Request Schema
export const quoteItemSchema = z.object({
  productSlug: z.string().trim().min(1).max(100),
  productName: z.string().trim().max(200).optional(),
  qty: z.number().int().positive().max(100).default(1),
});

export const quoteRequestSchema = z.object({
  customerName: trimmedString(2, 100),
  email: z.string().trim().email("Valid email required").max(255),
  phone: z.string().trim().regex(phoneRegex, "Valid phone required"),
  companyName: z.string().trim().max(150).optional(),
  branch: z.string().trim().max(100).optional(),
  notes: z.string().trim().max(1000, "Notes cannot exceed 1000 characters").optional(),
  items: z.array(quoteItemSchema).min(1, "At least one item required in quotation request"),
  idempotencyKey: z.string().uuid().optional(),
});

// 4. Public Order & RFQ Tracking Schema
export const publicTrackingSchema = z.object({
  referenceId: z
    .string()
    .trim()
    .regex(/^[a-zA-Z0-9_-]{3,64}$/, "Invalid tracking reference format (e.g. q-001 or ord-abc)"),
  phone: z
    .string()
    .trim()
    .min(4, "Enter at least the last 4 digits of your phone number")
    .max(20, "Phone number exceeds maximum length"),
});

// 5. Product & Inventory Update Schema
export const productInventoryPatchSchema = z.object({
  price: z.number().nonnegative("Price must be non-negative").optional(),
  oldPrice: z.number().nonnegative("Old price must be non-negative").nullable().optional(),
  warehouseQty: z.number().int().nonnegative("Warehouse quantity must be non-negative").optional(),
  reorderLevel: z.number().int().nonnegative("Reorder level must be non-negative").optional(),
  lastRestocked: z.string().optional(),
});
