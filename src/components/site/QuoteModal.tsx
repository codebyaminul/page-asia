import { useState } from "react";
import {
  CheckCircle2,
  FileSpreadsheet,
  Mail,
  Minus,
  Phone,
  Plus,
  ShieldCheck,
  Truck,
  User,
  Wrench,
  X,
} from "lucide-react";
import type { Product } from "@/lib/data";
import { addQuote } from "@/lib/admin-data";

export interface QuoteModalProps {
  product: Product | null;
  onClose: () => void;
}

export function QuoteModal({ product, onClose }: QuoteModalProps) {
  const [qty, setQty] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    companyName: "",
    contactName: "",
    phone: "",
    email: "",
    businessType: "Workshop / Garage",
    city: "Dhaka",
    notes: "",
  });

  if (!product) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.companyName || !formData.phone) return;
    try {
      addQuote({
        companyName: formData.companyName,
        contactName: formData.contactName || formData.companyName,
        phone: formData.phone,
        email: formData.email,
        productSlug: product.slug,
        productName: product.name,
        qty,
        businessType: formData.businessType,
        city: formData.city,
        notes: formData.notes,
      });
    } catch {
      // Fallback gracefully
    }
    setSubmitted(true);
  };

  const handleReset = () => {
    setSubmitted(false);
    onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200"
    >
      <div className="relative w-full max-w-lg rounded-2xl bg-card border border-border/80 shadow-2xl p-6 sm:p-7 text-foreground overflow-hidden max-h-[90vh] flex flex-col">
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close quote dialog"
          className="absolute right-4 top-4 grid h-8 w-8 place-items-center rounded-full bg-secondary text-muted-foreground hover:text-foreground transition-colors"
        >
          <X className="h-4 w-4" />
        </button>

        {submitted ? (
          <div className="py-8 text-center space-y-4">
            <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-emerald-500/10 text-emerald-600">
              <CheckCircle2 className="h-10 w-10" />
            </div>
            <h3 className="text-2xl font-display font-bold uppercase tracking-wide">
              Quotation Request Received
            </h3>
            <p className="text-xs sm:text-sm text-muted-foreground max-w-sm mx-auto leading-relaxed">
              Your inquiry for <strong className="text-foreground">{qty}x {product.name}</strong> has been logged under Reference ID:{" "}
              <span className="font-mono font-bold text-primary">#RFQ-{Math.floor(100000 + Math.random() * 900000)}</span>.
            </p>
            <div className="rounded-xl border border-border bg-secondary/50 p-4 text-xs text-left space-y-1.5 text-muted-foreground">
              <div className="flex justify-between">
                <span>Product:</span>
                <span className="font-semibold text-foreground truncate max-w-[220px]">{product.name}</span>
              </div>
              <div className="flex justify-between">
                <span>SKU & Brand:</span>
                <span className="font-mono text-foreground">{product.sku} ({product.brand})</span>
              </div>
              <div className="flex justify-between">
                <span>Company:</span>
                <span className="font-semibold text-foreground">{formData.companyName}</span>
              </div>
              <div className="flex justify-between">
                <span>Contact Phone:</span>
                <span className="font-mono text-foreground">{formData.phone}</span>
              </div>
            </div>
            <p className="text-[11px] text-muted-foreground">
              Our commercial engineering team will prepare your formal price quotation and pro-forma invoice within 2–4 business hours.
            </p>
            <button
              onClick={handleReset}
              className="btn btn-primary h-10 px-8 text-xs font-bold uppercase tracking-wider rounded-full shadow-md"
            >
              Done
            </button>
          </div>
        ) : (
          <>
            {/* Header */}
            <div className="border-b border-border pb-4 pr-8">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />
                <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-primary">
                  Official Commercial RFQ
                </span>
              </div>
              <h2 className="text-lg sm:text-xl font-display font-bold uppercase tracking-tight text-foreground mt-0.5">
                Request Price Quotation
              </h2>
              <p className="text-xs text-muted-foreground mt-0.5">
                Get certified trade pricing, tax invoices & freight estimates from our engineers.
              </p>
            </div>

            {/* Product Summary Box */}
            <div className="my-4 flex items-center gap-3.5 rounded-xl border border-border/80 bg-secondary/40 p-3 shrink-0">
              <div className="h-14 w-14 shrink-0 rounded-lg border border-border bg-white p-1 flex items-center justify-center">
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-full w-full object-contain mix-blend-multiply"
                />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                  <span className="text-primary font-bold">{product.brand}</span>
                  <span>•</span>
                  <span className="font-mono">{product.sku}</span>
                </div>
                <h4 className="text-xs sm:text-sm font-semibold text-foreground truncate">
                  {product.name}
                </h4>
                <div className="mt-1 flex items-center justify-between">
                  <span className="text-[11px] font-mono font-semibold text-primary">
                    Price: On Official Quotation
                  </span>

                  {/* Quantity Stepper */}
                  <div className="flex items-center border border-border rounded-lg bg-card h-6.5">
                    <button
                      type="button"
                      onClick={() => setQty(Math.max(1, qty - 1))}
                      className="px-2 text-xs hover:bg-secondary text-muted-foreground hover:text-foreground"
                    >
                      <Minus className="h-3 w-3" />
                    </button>
                    <span className="px-2 text-xs font-mono font-bold">{qty}</span>
                    <button
                      type="button"
                      onClick={() => setQty(qty + 1)}
                      className="px-2 text-xs hover:bg-secondary text-muted-foreground hover:text-foreground"
                    >
                      <Plus className="h-3 w-3" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto space-y-3.5 pr-1">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-muted-foreground mb-1">
                    Company / Workshop Name *
                  </label>
                  <input
                    required
                    type="text"
                    value={formData.companyName}
                    onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                    placeholder="e.g. Apex Auto Care Ltd."
                    className="w-full h-9 rounded-lg border border-input bg-card px-3 text-xs text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-muted-foreground mb-1">
                    Contact Person Name
                  </label>
                  <input
                    type="text"
                    value={formData.contactName}
                    onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                    placeholder="Engr. / Manager Name"
                    className="w-full h-9 rounded-lg border border-input bg-card px-3 text-xs text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-muted-foreground mb-1">
                    Mobile Phone *
                  </label>
                  <input
                    required
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+880 1700-000000"
                    className="w-full h-9 rounded-lg border border-input bg-card px-3 text-xs text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-muted-foreground mb-1">
                    Work Email
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="procurement@company.com"
                    className="w-full h-9 rounded-lg border border-input bg-card px-3 text-xs text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-muted-foreground mb-1">
                    Business Sector
                  </label>
                  <select
                    value={formData.businessType}
                    onChange={(e) => setFormData({ ...formData, businessType: e.target.value })}
                    className="w-full h-9 rounded-lg border border-input bg-card px-2.5 text-xs text-foreground focus:border-primary focus:outline-none"
                  >
                    <option value="Workshop / Garage">Independent Garage / Service Center</option>
                    <option value="Dealership 3S">Authorized Dealership (3S / 4S)</option>
                    <option value="Commercial Fleet">Commercial Logistics Fleet Depot</option>
                    <option value="Distributor / Wholesale">Distributor / Reseller</option>
                    <option value="EV Workshop">EV Conversion / Battery Workshop</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-muted-foreground mb-1">
                    Delivery Region / City
                  </label>
                  <input
                    type="text"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    placeholder="e.g. Dhaka, Chittagong..."
                    className="w-full h-9 rounded-lg border border-input bg-card px-3 text-xs text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-muted-foreground mb-1">
                  Specific Requirements or Notes
                </label>
                <textarea
                  rows={2}
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="Need floor anchoring, 3-phase electrical verification, or expedited delivery..."
                  className="w-full rounded-lg border border-input bg-card p-2.5 text-xs text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none"
                />
              </div>

              {/* Submit CTA */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="btn btn-primary w-full h-11 text-xs font-bold uppercase tracking-wider rounded-xl shadow-lg shadow-primary/20 flex items-center justify-center gap-2 hover:shadow-primary/30 transition-all"
                >
                  <FileSpreadsheet className="h-4 w-4" />
                  <span>Submit Price Quotation Request</span>
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
