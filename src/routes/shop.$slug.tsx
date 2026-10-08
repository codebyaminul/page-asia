import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import {
  Car,
  Check,
  CheckCircle2,
  Clock,
  Download,
  FileText,
  HelpCircle,
  Minus,
  Plus,
  RotateCcw,
  ShieldCheck,
  Star,
  Truck,
  Wrench,
} from "lucide-react";
import { useState } from "react";
import { ProductCard } from "@/components/site/ProductCard";
import { products, taka, type Product } from "@/lib/data";
import { useCart } from "@/lib/cart";

export const Route = createFileRoute("/shop/$slug")({
  loader: ({ params }) => {
    const p = products.find((x) => x.slug === params.slug);
    if (!p) throw notFound();
    return { p };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [
          { title: "Product Not Found — PAGE" },
          { name: "robots", content: "noindex" },
        ],
      };
    }
    const { p } = loaderData;
    return {
      meta: [
        { title: `${p.name} — ${p.brand} | PAGE International` },
        { name: "description", content: p.description },
        { property: "og:title", content: `${p.name} — PAGE International` },
        { property: "og:description", content: p.description },
        { property: "og:type", content: "product" },
      ],
    };
  },
  notFoundComponent: () => (
    <div className="container-page py-40 text-center">
      <h1 className="display-lg">Product Not Found</h1>
      <p className="mt-2 text-muted-foreground">The product you are looking for is unavailable.</p>
      <Link to="/shop" className="btn btn-primary mt-6">
        Back to Products
      </Link>
    </div>
  ),
  component: ProductPage,
});

type TabType = "overview" | "specs" | "fit" | "applications" | "warranty" | "downloads";

export function ProductPage() {
  const { p } = Route.useLoaderData();
  const { add, vehicle } = useCart();
  const [qty, setQty] = useState(1);
  const [tab, setTab] = useState<TabType>("specs");
  const [quoteSent, setQuoteSent] = useState(false);

  const out = p.stock === "Out of stock";
  const low = p.stock === "Low stock";

  // Related products from same category or equipment
  const related = products
    .filter((x) => x.slug !== p.slug && (x.category === p.category || (p.isEquipment && x.isEquipment)))
    .concat(products.filter((x) => x.slug !== p.slug))
    .slice(0, 4);

  // Vehicle compatibility match status
  const isVehicleCompatible = vehicle
    ? p.fits.some((f) =>
        f.toLowerCase().includes(vehicle.model.toLowerCase()) ||
        f.toLowerCase().includes(vehicle.make.toLowerCase()) ||
        f.toLowerCase().includes("universal") ||
        f.toLowerCase().includes("most")
      )
    : false;

  return (
    <div className="bg-background text-foreground pt-24 lg:pt-32 min-h-screen">
      {/* Breadcrumb Navigation */}
      <div className="border-b border-border bg-secondary/40 py-3">
        <nav aria-label="Breadcrumb" className="container-page text-xs text-muted-foreground flex items-center gap-1.5 flex-wrap">
          <Link to="/" className="hover:text-foreground">Home</Link>
          <span>/</span>
          <Link to="/shop" className="hover:text-foreground">Shop</Link>
          <span>/</span>
          <Link to="/shop" search={{ cat: p.category }} className="hover:text-foreground font-medium text-foreground">
            {p.category}
          </Link>
          <span>/</span>
          <span className="text-muted-foreground truncate max-w-xs">{p.name}</span>
        </nav>
      </div>

      {/* Main Product Layout */}
      <section className="container-page py-10 lg:py-14">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-14">
          {/* LEFT: Product Gallery */}
          <div>
            <div className="relative aspect-square overflow-hidden rounded border border-border bg-card p-6 flex items-center justify-center">
              <img
                src={p.image}
                alt={p.name}
                width={816}
                height={816}
                className="h-full w-full object-contain mix-blend-multiply"
              />
              {p.oldPrice && (
                <span className="absolute left-4 top-4 rounded bg-primary px-2.5 py-1 text-xs font-bold uppercase tracking-wider text-primary-foreground">
                  Special Offer
                </span>
              )}
              {p.isEquipment && (
                <span className="absolute right-4 top-4 flex items-center gap-1.5 rounded bg-ink px-3 py-1 text-xs font-bold uppercase tracking-wider text-ink-foreground">
                  <Wrench className="h-3.5 w-3.5 text-primary" /> Commercial Machinery
                </span>
              )}
            </div>

            {/* Thumbnail Row */}
            <div className="mt-4 grid grid-cols-4 gap-3">
              {[p.image, p.image, p.image, p.image].map((img, i) => (
                <div
                  key={i}
                  className={`aspect-square rounded border p-2 cursor-pointer transition-all ${
                    i === 0 ? "border-primary bg-secondary/50" : "border-border bg-card hover:border-foreground/40 opacity-70"
                  }`}
                >
                  <img src={img} alt="" className="h-full w-full object-contain mix-blend-multiply" />
                </div>
              ))}
            </div>

            {/* Technical Highlights Quick Pill Box */}
            <div className="mt-6 rounded border border-border bg-secondary/40 p-4">
              <p className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground mb-2">
                Certified Supply Guarantee
              </p>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <span className="flex items-center gap-1.5 text-foreground font-medium">
                  <ShieldCheck className="h-3.5 w-3.5 text-primary" /> 100% Genuine OEM / OES
                </span>
                <span className="flex items-center gap-1.5 text-foreground font-medium">
                  <Truck className="h-3.5 w-3.5 text-primary" /> Direct Dispatch
                </span>
                <span className="flex items-center gap-1.5 text-foreground font-medium">
                  <Wrench className="h-3.5 w-3.5 text-primary" /> Installation Service
                </span>
                <span className="flex items-center gap-1.5 text-foreground font-medium">
                  <RotateCcw className="h-3.5 w-3.5 text-primary" /> 7-Day Return Policy
                </span>
              </div>
            </div>
          </div>

          {/* RIGHT: Commercial Details & Purchase Panel */}
          <div className="flex flex-col">
            {/* Top Brand & Category Line */}
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary">
              <span>{p.brand}</span>
              <span className="text-muted-foreground">•</span>
              <span className="text-muted-foreground">{p.category}</span>
              <span className="text-muted-foreground">•</span>
              <span className="font-mono text-muted-foreground">SKU: {p.sku}</span>
            </div>

            <h1 className="display-lg mt-2 text-foreground font-bold leading-tight">
              {p.name}
            </h1>

            {/* Rating and Stock Row */}
            <div className="mt-3 flex flex-wrap items-center gap-4 text-xs">
              <div className="flex items-center gap-1 text-amber-500 font-bold">
                <Star className="h-4 w-4 fill-current" />
                <span className="text-foreground text-sm">{p.rating}</span>
                <span className="text-muted-foreground font-normal">({p.reviews} customer reviews)</span>
              </div>
              <span className="text-muted-foreground">•</span>
              <span
                className={`font-bold uppercase tracking-wider ${
                  out
                    ? "text-destructive"
                    : low
                    ? "text-amber-600"
                    : "text-success"
                }`}
              >
                ● {p.stock}
              </span>
            </div>

            {/* Price Box */}
            <div className="mt-6 rounded border border-border bg-secondary/30 p-4">
              <div className="flex items-baseline gap-3">
                <span className="font-display text-4xl font-bold text-foreground">
                  {taka(p.price)}
                </span>
                {p.oldPrice && (
                  <span className="text-base text-muted-foreground line-through">
                    {taka(p.oldPrice)}
                  </span>
                )}
                <span className="text-xs text-muted-foreground">
                  (Incl. all taxes & warranty)
                </span>
              </div>
              {p.isEquipment && (
                <p className="mt-1 text-xs text-muted-foreground">
                  Commercial machinery pricing includes standard commissioning and nationwide dispatch.
                </p>
              )}
            </div>

            {/* Vehicle Compatibility Banner */}
            <div
              className={`mt-6 rounded border p-4 text-xs ${
                vehicle
                  ? isVehicleCompatible
                    ? "border-success bg-success/10 text-success"
                    : "border-amber-500/50 bg-amber-500/10 text-amber-800"
                  : "border-border bg-secondary/60 text-foreground"
              }`}
            >
              {vehicle ? (
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="h-4 w-4 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold">
                      {isVehicleCompatible ? "Guaranteed Fitment" : "Compatibility Check"}
                    </p>
                    <p className="mt-0.5 text-foreground/80">
                      Checking against your saved vehicle:{" "}
                      <strong>{vehicle.make} {vehicle.model} ({vehicle.year})</strong>.
                      {isVehicleCompatible
                        ? " This product is 100% compatible."
                        : " Please review the fitment list below or contact our parts specialists."}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-between gap-3">
                  <span className="flex items-center gap-2">
                    <Car className="h-4 w-4 text-primary shrink-0" />
                    <span>Want to check fitment for your vehicle?</span>
                  </span>
                  <Link to="/garage" className="font-bold text-primary hover:underline whitespace-nowrap">
                    Add Vehicle in My Garage →
                  </Link>
                </div>
              )}
            </div>

            {/* Description */}
            <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
              {p.description}
            </p>

            {/* Quantity and Purchase Action Controls */}
            <div className="mt-8 space-y-3">
              <div className="flex gap-3">
                <div className="flex h-11 items-center rounded border border-input bg-card">
                  <button
                    onClick={() => setQty(Math.max(1, qty - 1))}
                    aria-label="Decrease quantity"
                    className="grid h-full w-10 place-items-center hover:bg-secondary text-foreground"
                  >
                    <Minus className="h-3.5 w-3.5" />
                  </button>
                  <span className="w-9 text-center font-bold text-sm" aria-live="polite">
                    {qty}
                  </span>
                  <button
                    onClick={() => setQty(qty + 1)}
                    aria-label="Increase quantity"
                    className="grid h-full w-10 place-items-center hover:bg-secondary text-foreground"
                  >
                    <Plus className="h-3.5 w-3.5" />
                  </button>
                </div>

                <button
                  disabled={out}
                  onClick={() => add(p.slug, qty)}
                  className="btn btn-primary flex-1 h-11 text-xs font-bold uppercase tracking-wider"
                >
                  {out ? "Out of Stock" : "Add to Cart"}
                </button>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <Link
                  to="/support"
                  className="btn btn-outline h-10 text-xs font-bold uppercase"
                >
                  Request B2B Quotation
                </Link>
                <Link
                  to="/services/book"
                  className="btn btn-dark h-10 text-xs font-bold uppercase"
                >
                  Book Installation
                </Link>
              </div>
            </div>

            {/* Service & Delivery Metrics */}
            <div className="mt-8 border-t border-border pt-6 grid grid-cols-3 gap-4 text-xs text-muted-foreground">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-primary shrink-0" />
                <span>2–4 Day Hub Delivery</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-primary shrink-0" />
                <span>Manufacturer Warranty</span>
              </div>
              <div className="flex items-center gap-2">
                <Wrench className="h-4 w-4 text-primary shrink-0" />
                <span>Fitting Available</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* TECHNICAL TABS: SPECS, COMPATIBILITY, APPLICATIONS, ETC.  */}
      {/* ======================================================== */}
      <section className="container-page py-12 border-t border-border">
        {/* Tab Headers */}
        <div role="tablist" className="flex gap-2 sm:gap-6 border-b border-border overflow-x-auto pb-px">
          {[
            { id: "specs", label: "Specifications" },
            { id: "overview", label: "Detailed Overview" },
            { id: "fit", label: "Vehicle Compatibility" },
            { id: "applications", label: "Applications" },
            { id: "warranty", label: "Warranty & Support" },
            { id: "downloads", label: "Downloads & Manuals" },
          ].map((t) => (
            <button
              key={t.id}
              role="tab"
              aria-selected={tab === t.id}
              onClick={() => setTab(t.id as TabType)}
              className={`-mb-px border-b-2 py-3 px-1 text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-colors ${
                tab === t.id
                  ? "border-primary text-primary"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Tab Contents */}
        <div className="py-8 max-w-4xl">
          {/* TAB: Specifications */}
          {tab === "specs" && (
            <div>
              <h3 className="font-display text-2xl font-bold uppercase text-foreground mb-4">
                Technical Specifications
              </h3>
              <div className="rounded border border-border overflow-hidden">
                <table className="w-full text-xs">
                  <tbody className="divide-y divide-border">
                    {p.specs.map(([key, val], idx) => (
                      <tr key={key} className={idx % 2 === 0 ? "bg-card" : "bg-secondary/40"}>
                        <td className="w-1/3 py-3 px-4 font-bold text-foreground/80">{key}</td>
                        <td className="py-3 px-4 font-medium text-foreground">{val}</td>
                      </tr>
                    ))}
                    <tr className="bg-card">
                      <td className="py-3 px-4 font-bold text-foreground/80">Brand / Manufacturer</td>
                      <td className="py-3 px-4 font-medium text-foreground">{p.brand}</td>
                    </tr>
                    <tr className="bg-secondary/40">
                      <td className="py-3 px-4 font-bold text-foreground/80">Part / Model Number</td>
                      <td className="py-3 px-4 font-mono font-medium text-foreground">{p.sku}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB: Overview */}
          {tab === "overview" && (
            <div className="space-y-4 text-sm text-foreground/90 leading-relaxed">
              <h3 className="font-display text-2xl font-bold uppercase text-foreground">
                Product Overview & Commercial Purpose
              </h3>
              <p>{p.description}</p>
              <p>
                Manufactured to exceed original equipment performance thresholds and quality durability standards. Every unit passes factory electronic and pressure load diagnostics prior to packaging.
              </p>
              <div className="mt-6 rounded border border-border p-4 bg-secondary/30">
                <h4 className="font-bold text-xs uppercase tracking-wider text-foreground mb-2">
                  What is included in the package:
                </h4>
                <ul className="list-disc pl-5 space-y-1 text-xs text-muted-foreground">
                  <li>1x {p.name} (SKU: {p.sku})</li>
                  <li>Official PAGE International inspection certificate</li>
                  <li>Manufacturer technical manual and installation instructions</li>
                  <li>Standard mounting hardware / accessories where applicable</li>
                </ul>
              </div>
            </div>
          )}

          {/* TAB: Compatibility */}
          {tab === "fit" && (
            <div>
              <h3 className="font-display text-2xl font-bold uppercase text-foreground mb-2">
                Compatible Vehicles & Applications
              </h3>
              <p className="text-xs text-muted-foreground mb-6">
                Verified against OE part specifications. For custom or commercial fleet inquiries, verify with our technical support team.
              </p>
              <div className="grid gap-2 sm:grid-cols-2">
                {p.fits.map((f) => (
                  <div key={f} className="flex items-center gap-2 rounded border border-border bg-card p-3 text-xs">
                    <Check className="h-4 w-4 text-success shrink-0" />
                    <span className="font-medium text-foreground">{f}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB: Applications */}
          {tab === "applications" && (
            <div className="space-y-4">
              <h3 className="font-display text-2xl font-bold uppercase text-foreground mb-2">
                Recommended Operational Applications
              </h3>
              <div className="grid gap-3 sm:grid-cols-2 text-xs">
                <div className="rounded border border-border p-4 bg-card">
                  <h4 className="font-bold text-primary uppercase tracking-wider">
                    Independent Automotive Garages
                  </h4>
                  <p className="mt-1 text-muted-foreground">
                    Engineered for daily workshop cycles, heavy utilization, and rapid bay turnover.
                  </p>
                </div>
                <div className="rounded border border-border p-4 bg-card">
                  <h4 className="font-bold text-primary uppercase tracking-wider">
                    Commercial Fleet Depots
                  </h4>
                  <p className="mt-1 text-muted-foreground">
                    Reliable component life designed to minimize unexpected roadside fleet downtime.
                  </p>
                </div>
                <div className="rounded border border-border p-4 bg-card">
                  <h4 className="font-bold text-primary uppercase tracking-wider">
                    Dealership & Service Centers
                  </h4>
                  <p className="mt-1 text-muted-foreground">
                    Compliant with manufacturer warranty requirements and diagnostic protocols.
                  </p>
                </div>
                <div className="rounded border border-border p-4 bg-card">
                  <h4 className="font-bold text-primary uppercase tracking-wider">
                    DIY & Enthusiast Workshops
                  </h4>
                  <p className="mt-1 text-muted-foreground">
                    Straightforward fitment with included instructions and wear indicators.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB: Warranty */}
          {tab === "warranty" && (
            <div className="space-y-4 text-xs text-muted-foreground">
              <h3 className="font-display text-2xl font-bold uppercase text-foreground">
                Warranty Coverage & Support Policy
              </h3>
              <p>
                This product is covered under the official PAGE International Manufacturer Warranty program. Claims are valid with the original sales invoice or commercial order ID.
              </p>
              <div className="rounded border border-border p-4 bg-secondary/40 space-y-2">
                <p className="font-bold text-foreground">Warranty Procedure:</p>
                <p>1. Contact PAGE Support with your Invoice # and vehicle VIN / installation details.</p>
                <p>2. Our technical service team will verify fault logs or inspect the component at our Tejgaon Hub.</p>
                <p>3. Replacement or warranty repairs are executed within 48 business hours.</p>
              </div>
            </div>
          )}

          {/* TAB: Downloads */}
          {tab === "downloads" && (
            <div className="space-y-3">
              <h3 className="font-display text-2xl font-bold uppercase text-foreground mb-4">
                Technical Documentation & Downloads
              </h3>
              {[
                { title: "Technical Datasheet & Dimensional Drawing (PDF)", size: "1.4 MB" },
                { title: "Installation & Maintenance Operating Manual (PDF)", size: "3.2 MB" },
                { title: "CE & ISO Quality Compliance Certificate (PDF)", size: "0.8 MB" },
              ].map((doc) => (
                <div
                  key={doc.title}
                  className="flex items-center justify-between rounded border border-border bg-card p-3.5 text-xs"
                >
                  <div className="flex items-center gap-3">
                    <FileText className="h-5 w-5 text-primary" />
                    <div>
                      <span className="font-semibold text-foreground block">{doc.title}</span>
                      <span className="text-[11px] text-muted-foreground">{doc.size}</span>
                    </div>
                  </div>
                  <button
                    onClick={() => alert("Sample document download in prototype.")}
                    className="btn btn-outline h-8 px-3 text-[11px] flex items-center gap-1"
                  >
                    <Download className="h-3 w-3" /> Download
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ======================================================== */}
      {/* RELATED PRODUCTS SECTION                                  */}
      {/* ======================================================== */}
      <section className="bg-secondary/60 py-16 border-t border-border">
        <div className="container-page">
          <div className="mb-8 flex items-end justify-between">
            <div>
              <p className="eyebrow">Complementary Equipment & Parts</p>
              <h2 className="display-md mt-1 text-foreground">YOU MAY ALSO NEED</h2>
            </div>
            <Link to="/shop" className="link-arrow">
              View All Products
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-3.5 sm:gap-5 lg:grid-cols-4">
            {related.map((r) => (
              <ProductCard key={r.slug} p={r} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
