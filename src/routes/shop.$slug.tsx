import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import {
  Bike,
  Car,
  Check,
  CheckCircle2,
  Clock,
  Download,
  FileSpreadsheet,
  FileText,
  HelpCircle,
  Minus,
  Plus,
  RotateCcw,
  Send,
  ShieldCheck,
  Star,
  Truck,
  Wrench,
  X,
  Zap,
} from "lucide-react";
import { useState } from "react";
import { ProductCard } from "@/components/site/ProductCard";
import { products, type Product } from "@/lib/data";
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
          { title: "Product Not Found — PAGE International" },
          { name: "robots", content: "noindex" },
        ],
      };
    }
    const { p } = loaderData;
    return {
      meta: [
        {
          title: `${p.name} (${p.sku}) — Technical Specifications | PAGE International`,
        },
        { name: "description", content: p.description },
        { property: "og:title", content: `${p.name} — PAGE International B2B` },
        { property: "og:description", content: p.description },
        { property: "og:type", content: "product" },
      ],
    };
  },
  notFoundComponent: () => (
    <div className="container-page py-40 text-center">
      <h1 className="display-lg">Product Not Found</h1>
      <p className="mt-2 text-muted-foreground">
        The equipment or spare part you requested is not in the active catalogue.
      </p>
      <Link to="/shop" className="btn btn-primary mt-6">
        Back to Products
      </Link>
    </div>
  ),
  component: ProductPage,
});

type TabType =
  | "specs"
  | "overview"
  | "fit"
  | "applications"
  | "warranty"
  | "downloads";

export function ProductPage() {
  const { p } = Route.useLoaderData();
  const { add, vehicle, lines } = useCart();
  const [qty, setQty] = useState(1);
  const [tab, setTab] = useState<TabType>("specs");
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);
  const [quoteSent, setQuoteSent] = useState(false);
  const inCart = lines.some((l) => l.slug === p.slug);

  // Quote Form State
  const [quoteData, setQuoteData] = useState({
    businessName: "",
    contactPerson: "",
    phone: "",
    email: "",
    businessType: "Workshop",
    quantity: String(qty),
    notes: "",
  });

  const handleQuoteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!quoteData.businessName || !quoteData.phone) return;
    setQuoteSent(true);
  };

  const out = p.stock === "Out of stock";
  const low = p.stock === "Low stock";

  // Related products from same category or equipment
  const related = products
    .filter(
      (x) =>
        x.slug !== p.slug &&
        (x.category === p.category || (p.isEquipment && x.isEquipment))
    )
    .concat(products.filter((x) => x.slug !== p.slug))
    .slice(0, 4);

  // Vehicle compatibility match status
  const isVehicleCompatible = vehicle
    ? p.fits.some(
        (f) =>
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
        <nav
          aria-label="Breadcrumb"
          className="container-page text-xs text-muted-foreground flex items-center gap-1.5 flex-wrap"
        >
          <Link to="/" className="hover:text-foreground">
            Home
          </Link>
          <span>/</span>
          <Link to="/shop" className="hover:text-foreground">
            Products
          </Link>
          <span>/</span>
          <Link
            to="/shop"
            search={{ cat: p.category }}
            className="hover:text-foreground font-medium text-foreground"
          >
            {p.category}
          </Link>
          <span>/</span>
          <span className="text-muted-foreground truncate max-w-xs">
            {p.name}
          </span>
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
              {p.isEquipment ? (
                <span className="absolute right-4 top-4 flex items-center gap-1.5 rounded bg-ink px-3 py-1 text-xs font-bold uppercase tracking-wider text-ink-foreground border border-ink-border">
                  <Wrench className="h-3.5 w-3.5 text-primary" /> Garage Equipment
                </span>
              ) : (
                <span className="absolute right-4 top-4 rounded bg-secondary px-3 py-1 text-xs font-bold uppercase tracking-wider text-muted-foreground border border-border">
                  Genuine Spare Part
                </span>
              )}
            </div>

            {/* Thumbnail Row */}
            <div className="mt-4 grid grid-cols-4 gap-3">
              {[p.image, p.image, p.image, p.image].map((img, i) => (
                <div
                  key={i}
                  className={`aspect-square rounded border p-2 cursor-pointer transition-all ${
                    i === 0
                      ? "border-primary bg-secondary/50"
                      : "border-border bg-card hover:border-foreground/40 opacity-70"
                  }`}
                >
                  <img
                    src={img}
                    alt=""
                    className="h-full w-full object-contain mix-blend-multiply"
                  />
                </div>
              ))}
            </div>

            {/* Technical Highlights Quick Pill Box */}
            <div className="mt-6 rounded border border-border bg-secondary/40 p-4">
              <p className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground mb-2">
                Commercial Supply Guarantee & Services
              </p>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <span className="flex items-center gap-1.5 text-foreground font-medium">
                  <ShieldCheck className="h-3.5 w-3.5 text-primary" /> 100% Genuine OEM / OES
                </span>
                <span className="flex items-center gap-1.5 text-foreground font-medium">
                  <Truck className="h-3.5 w-3.5 text-primary" /> Direct Workshop Dispatch
                </span>
                <span className="flex items-center gap-1.5 text-foreground font-medium">
                  <Wrench className="h-3.5 w-3.5 text-primary" /> Anchoring & Rigging Available
                </span>
                <span className="flex items-center gap-1.5 text-foreground font-medium">
                  <RotateCcw className="h-3.5 w-3.5 text-primary" /> 2-Year Equipment Warranty
                </span>
              </div>
            </div>
          </div>

          {/* RIGHT: Commercial Details & Purchase Panel */}
          <div className="flex flex-col">
            {/* Top Brand, Category & Mobility Badges */}
            <div className="flex flex-wrap items-center gap-2 text-xs font-bold uppercase tracking-wider">
              <span className="text-primary">{p.brand}</span>
              <span className="text-muted-foreground">•</span>
              <span className="text-muted-foreground">{p.category}</span>
              <span className="text-muted-foreground">•</span>
              <span className="font-mono text-muted-foreground">SKU: {p.sku}</span>
            </div>

            {/* Mobility Platforms Supported */}
            {p.mobility && p.mobility.length > 0 && (
              <div className="mt-2 flex flex-wrap items-center gap-1.5">
                <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                  Platforms:
                </span>
                {p.mobility.map((m) => (
                  <span
                    key={m}
                    className="inline-flex items-center gap-1 rounded bg-secondary px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-foreground"
                  >
                    {m === "4-Wheeler" && <Car className="h-3 w-3" />}
                    {m === "2-Wheeler" && <Bike className="h-3 w-3" />}
                    {m === "3-Wheeler" && <Truck className="h-3 w-3" />}
                    {m === "EV" && <Zap className="h-3 w-3 text-amber-500" />}
                    <span>{m}</span>
                  </span>
                ))}
              </div>
            )}

            <h1 className="display-lg mt-3 text-foreground font-bold leading-tight">
              {p.name}
            </h1>

            {/* Rating and Stock Row */}
            <div className="mt-3 flex flex-wrap items-center gap-4 text-xs">
              <div className="flex items-center gap-1 text-amber-500 font-bold">
                <Star className="h-4 w-4 fill-current" />
                <span className="text-foreground text-sm">{p.rating}</span>
                <span className="text-muted-foreground font-normal">
                  ({p.reviews} verified business ratings)
                </span>
              </div>
              <span className="text-muted-foreground">•</span>
              <span
                className={`font-bold uppercase tracking-wider ${
                  out
                    ? "text-destructive"
                    : low
                    ? "text-amber-600"
                    : "text-emerald-600"
                }`}
              >
                ● {p.stock}
              </span>
            </div>

            {/* Price / Official Quotation Box */}
            <div className="mt-6 rounded-2xl border border-primary/30 bg-primary/5 p-4 sm:p-5">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />
                <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-primary">
                  Official Trade Pricing
                </span>
              </div>
              <div className="mt-1 flex flex-wrap items-baseline gap-3">
                <span className="font-display text-2xl sm:text-3xl font-bold text-foreground tracking-tight">
                  Quotation on Request
                </span>
                <span className="text-xs text-muted-foreground">
                  (B2B Commercial Pricing · Admin Pro-Forma Invoice)
                </span>
              </div>
              <p className="mt-2 text-xs text-muted-foreground leading-relaxed">
                Direct trade pricing is calculated based on required quantities, fleet specifications, site freight, and warranty commissioning.
              </p>
            </div>

            {/* Vehicle Compatibility Banner */}
            <div
              className={`mt-6 rounded border p-4 text-xs ${
                vehicle
                  ? isVehicleCompatible
                    ? "border-emerald-500/50 bg-emerald-500/10 text-emerald-800 dark:text-emerald-300"
                    : "border-amber-500/50 bg-amber-500/10 text-amber-800 dark:text-amber-300"
                  : "border-border bg-secondary/60 text-foreground"
              }`}
            >
              {vehicle ? (
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="h-4 w-4 shrink-0 mt-0.5 text-emerald-600" />
                  <div>
                    <p className="font-bold">
                      {isVehicleCompatible
                        ? "Verified Platform Compatibility"
                        : "Fitment Notice"}
                    </p>
                    <p className="mt-0.5 text-foreground/80">
                      Checking against selected platform:{" "}
                      <strong>
                        {vehicle.make} {vehicle.model} ({vehicle.year})
                      </strong>
                      .
                      {isVehicleCompatible
                        ? " This item is confirmed compatible."
                        : " Please review the fitment list below or request technical confirmation."}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-between gap-3">
                  <span className="flex items-center gap-2">
                    <Car className="h-4 w-4 text-primary shrink-0" />
                    <span>Check compatibility against specific vehicle platform?</span>
                  </span>
                  <Link
                    to="/garage"
                    className="font-bold text-primary hover:underline whitespace-nowrap"
                  >
                    Set Platform in My Garage →
                  </Link>
                </div>
              )}
            </div>

            {/* Description */}
            <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
              {p.description}
            </p>

            {/* Dual B2B Quotation Action Panel */}
            <div className="mt-8 space-y-3">
              <div className="flex flex-col sm:flex-row gap-3">
                {/* Quantity Stepper */}
                <div className="flex h-11 items-center rounded-xl border border-input bg-card shadow-xs shrink-0 w-fit">
                  <button
                    type="button"
                    onClick={() => setQty(Math.max(1, qty - 1))}
                    aria-label="Decrease quantity"
                    className="grid h-full w-10 place-items-center hover:bg-secondary text-foreground transition-colors"
                  >
                    <Minus className="h-3.5 w-3.5" />
                  </button>
                  <span
                    className="w-10 text-center font-bold font-mono text-sm"
                    aria-live="polite"
                  >
                    {qty}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQty(qty + 1)}
                    aria-label="Increase quantity"
                    className="grid h-full w-10 place-items-center hover:bg-secondary text-foreground transition-colors"
                  >
                    <Plus className="h-3.5 w-3.5" />
                  </button>
                </div>

                {/* Direct Single Product Quote Button */}
                <button
                  type="button"
                  onClick={() => setQuoteModalOpen(true)}
                  className="btn btn-primary flex-1 h-11 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-md rounded-xl"
                >
                  <FileSpreadsheet className="h-4 w-4" />
                  <span>Request Instant Quotation ({qty} {qty === 1 ? "Unit" : "Units"})</span>
                </button>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {/* Add to RFQ Cart Button */}
                <button
                  type="button"
                  disabled={out}
                  onClick={() => add(p.slug, qty)}
                  className={`h-10.5 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 rounded-xl shadow-xs transition-all ${
                    inCart
                      ? "bg-emerald-600 text-white hover:bg-emerald-700"
                      : "btn btn-outline border-primary/50 text-primary hover:bg-primary hover:text-white"
                  }`}
                >
                  <Plus className="h-3.5 w-3.5" />
                  <span>{inCart ? "✓ In RFQ Cart" : "Add to RFQ Cart"}</span>
                </button>

                <Link
                  to="/cart"
                  className="btn btn-dark h-10.5 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 rounded-xl shadow-xs"
                >
                  <FileSpreadsheet className="h-3.5 w-3.5 text-primary" />
                  <span>View Quotation Cart</span>
                </Link>
              </div>
            </div>

            {/* Service & Delivery Metrics */}
            <div className="mt-8 border-t border-border pt-6 grid grid-cols-3 gap-4 text-xs text-muted-foreground">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-primary shrink-0" />
                <span>2–4 Day Hub Logistics</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-primary shrink-0" />
                <span>B2B Commercial Warranty</span>
              </div>
              <div className="flex items-center gap-2">
                <Wrench className="h-4 w-4 text-primary shrink-0" />
                <span>Engineering Commissioning</span>
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
        <div
          role="tablist"
          className="flex gap-2 sm:gap-6 border-b border-border overflow-x-auto pb-px"
        >
          {[
            { id: "specs", label: "Technical Specifications" },
            { id: "overview", label: "Commercial Overview" },
            { id: "fit", label: "Vehicle Compatibility" },
            { id: "applications", label: "Workshop Applications" },
            { id: "warranty", label: "Warranty & Engineering" },
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
                Technical Specifications & Operating Parameters
              </h3>
              <div className="rounded border border-border overflow-hidden">
                <table className="w-full text-xs">
                  <tbody className="divide-y divide-border">
                    {p.specs.map(([key, val], idx) => (
                      <tr
                        key={key}
                        className={idx % 2 === 0 ? "bg-card" : "bg-secondary/40"}
                      >
                        <td className="w-1/3 py-3 px-4 font-bold text-foreground/80">
                          {key}
                        </td>
                        <td className="py-3 px-4 font-medium text-foreground">
                          {val}
                        </td>
                      </tr>
                    ))}
                    <tr className="bg-card">
                      <td className="py-3 px-4 font-bold text-foreground/80">
                        Brand / Manufacturer
                      </td>
                      <td className="py-3 px-4 font-medium text-foreground">
                        {p.brand}
                      </td>
                    </tr>
                    <tr className="bg-secondary/40">
                      <td className="py-3 px-4 font-bold text-foreground/80">
                        Part / Model Number
                      </td>
                      <td className="py-3 px-4 font-mono font-medium text-foreground">
                        {p.sku}
                      </td>
                    </tr>
                    <tr className="bg-card">
                      <td className="py-3 px-4 font-bold text-foreground/80">
                        Supported Platforms
                      </td>
                      <td className="py-3 px-4 font-medium text-foreground">
                        {p.mobility.join(", ")}
                      </td>
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
                Supplied directly to professional workshops, service centers, and dealerships. Every unit is checked against factory quality benchmarks and safety certifications prior to container dispatch.
              </p>
              <div className="mt-6 rounded border border-border p-4 bg-secondary/30">
                <h4 className="font-bold text-xs uppercase tracking-wider text-foreground mb-2">
                  What is included in the supply shipment:
                </h4>
                <ul className="list-disc pl-5 space-y-1 text-xs text-muted-foreground">
                  <li>
                    1x {p.name} (SKU: {p.sku})
                  </li>
                  <li>Official PAGE International inspection certificate & warranty passport</li>
                  <li>Technical operation manual with hydraulic/wiring schematic diagrams</li>
                  <li>Standard accessories & installation hardware where specified</li>
                </ul>
              </div>
            </div>
          )}

          {/* TAB: Compatibility */}
          {tab === "fit" && (
            <div>
              <h3 className="font-display text-2xl font-bold uppercase text-foreground mb-2">
                Compatible Vehicles & Platforms
              </h3>
              <p className="text-xs text-muted-foreground mb-6">
                Verified against manufacturer technical tolerances. For specialized fleet inquiries, consult our technical applications engineers.
              </p>
              <div className="grid gap-2 sm:grid-cols-2">
                {p.fits.map((f) => (
                  <div
                    key={f}
                    className="flex items-center gap-2 rounded border border-border bg-card p-3 text-xs"
                  >
                    <Check className="h-4 w-4 text-emerald-600 shrink-0" />
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
                Target Business Applications
              </h3>
              <div className="grid gap-3 sm:grid-cols-2 text-xs">
                <div className="rounded border border-border p-4 bg-card">
                  <h4 className="font-bold text-primary uppercase tracking-wider">
                    Automotive Service Centers
                  </h4>
                  <p className="mt-1 text-muted-foreground">
                    Engineered for high daily turnover, continuous multi-bay operation, and minimal downtime.
                  </p>
                </div>
                <div className="rounded border border-border p-4 bg-card">
                  <h4 className="font-bold text-primary uppercase tracking-wider">
                    Commercial Fleet Maintenance Depots
                  </h4>
                  <p className="mt-1 text-muted-foreground">
                    High-durability build to keep delivery vans, corporate fleets, and passenger carriers on schedule.
                  </p>
                </div>
                <div className="rounded border border-border p-4 bg-card">
                  <h4 className="font-bold text-primary uppercase tracking-wider">
                    Authorized Dealership Workshops
                  </h4>
                  <p className="mt-1 text-muted-foreground">
                    Compliant with manufacturer warranty requirements, diagnostic protocols, and CE safety standards.
                  </p>
                </div>
                <div className="rounded border border-border p-4 bg-card">
                  <h4 className="font-bold text-primary uppercase tracking-wider">
                    EV & Hybrid Specialized Garages
                  </h4>
                  <p className="mt-1 text-muted-foreground">
                    Rated for high-voltage testing, battery pack handling, and advanced sensor recalibration.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB: Warranty */}
          {tab === "warranty" && (
            <div className="space-y-4 text-xs text-muted-foreground">
              <h3 className="font-display text-2xl font-bold uppercase text-foreground">
                Warranty & Engineering Support
              </h3>
              <p>
                This unit is covered under the PAGE International Commercial Warranty agreement. Claims include authorized replacement parts and dispatch of certified technicians where required.
              </p>
              <div className="rounded border border-border p-4 bg-secondary/40 space-y-2">
                <p className="font-bold text-foreground">Commercial Claim Procedure:</p>
                <p>
                  1. Contact PAGE B2B Technical Desk with your Commercial Invoice # and equipment serial.
                </p>
                <p>
                  2. Our technical service engineers verify diagnostic telemetry or inspect the machinery on site.
                </p>
                <p>
                  3. Replacement parts or engineer deployment is executed within 24–48 working hours.
                </p>
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
                {
                  title: "Technical Datasheet & Dimensional Drawing (PDF)",
                  size: "1.4 MB",
                },
                {
                  title: "Installation & Maintenance Operating Manual (PDF)",
                  size: "3.2 MB",
                },
                {
                  title: "CE & ISO Quality Compliance Certificate (PDF)",
                  size: "0.8 MB",
                },
              ].map((doc) => (
                <div
                  key={doc.title}
                  className="flex items-center justify-between rounded border border-border bg-card p-3.5 text-xs"
                >
                  <div className="flex items-center gap-3">
                    <FileText className="h-5 w-5 text-primary" />
                    <div>
                      <span className="font-semibold text-foreground block">
                        {doc.title}
                      </span>
                      <span className="text-[11px] text-muted-foreground">
                        {doc.size}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() =>
                      alert("Datasheet PDF download available from B2B customer portal.")
                    }
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
              <p className="eyebrow">Complementary Workshop Products</p>
              <h2 className="display-md mt-1 text-foreground">
                COMMERCIAL WORKSHOP COMPLEMENTS
              </h2>
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

      {/* ======================================================== */}
      {/* QUICK B2B QUOTE MODAL                                    */}
      {/* ======================================================== */}
      {quoteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-xs">
          <div className="relative w-full max-w-lg rounded-lg border border-border bg-card p-6 shadow-2xl sm:p-8">
            <button
              onClick={() => {
                setQuoteModalOpen(false);
                setQuoteSent(false);
              }}
              aria-label="Close modal"
              className="absolute right-4 top-4 text-muted-foreground hover:text-foreground"
            >
              <X className="h-5 w-5" />
            </button>

            {quoteSent ? (
              <div className="py-8 text-center">
                <div className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-emerald-500/10 text-emerald-600 mb-3">
                  <CheckCircle2 className="h-6 w-6" />
                </div>
                <h3 className="font-heading text-2xl uppercase text-foreground">
                  Quotation Request Sent
                </h3>
                <p className="text-xs text-muted-foreground mt-2 max-w-sm mx-auto">
                  Thank you! Our B2B equipment desk has logged your request for{" "}
                  <strong>{p.name}</strong>. A formal commercial quote with tax details will be sent within 24 hours.
                </p>
                <button
                  onClick={() => {
                    setQuoteModalOpen(false);
                    setQuoteSent(false);
                  }}
                  className="btn btn-primary h-10 px-6 text-xs font-bold uppercase tracking-wider mt-6"
                >
                  Close
                </button>
              </div>
            ) : (
              <form onSubmit={handleQuoteSubmit} className="space-y-4">
                <div>
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-primary">
                    B2B Commercial Desk
                  </span>
                  <h3 className="font-heading text-xl uppercase text-foreground mt-0.5">
                    Request Quote for: {p.name}
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    Model: {p.sku} · Brand: {p.brand}
                  </p>
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-1">
                      Business Name *
                    </label>
                    <input
                      required
                      type="text"
                      placeholder="e.g. Dhaka Auto Tech Ltd."
                      className="field text-xs"
                      value={quoteData.businessName}
                      onChange={(e) =>
                        setQuoteData({ ...quoteData, businessName: e.target.value })
                      }
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-1">
                      Contact Person
                    </label>
                    <input
                      type="text"
                      placeholder="Name"
                      className="field text-xs"
                      value={quoteData.contactPerson}
                      onChange={(e) =>
                        setQuoteData({ ...quoteData, contactPerson: e.target.value })
                      }
                    />
                  </div>
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-1">
                      Phone / WhatsApp *
                    </label>
                    <input
                      required
                      type="tel"
                      placeholder="+880 17XXXXXXXX"
                      className="field text-xs"
                      value={quoteData.phone}
                      onChange={(e) =>
                        setQuoteData({ ...quoteData, phone: e.target.value })
                      }
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-1">
                      Business Email
                    </label>
                    <input
                      type="email"
                      placeholder="procurement@workshop.com"
                      className="field text-xs"
                      value={quoteData.email}
                      onChange={(e) =>
                        setQuoteData({ ...quoteData, email: e.target.value })
                      }
                    />
                  </div>
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-1">
                      Business Type
                    </label>
                    <select
                      className="field text-xs"
                      value={quoteData.businessType}
                      onChange={(e) =>
                        setQuoteData({ ...quoteData, businessType: e.target.value })
                      }
                    >
                      <option value="Workshop">Independent Workshop</option>
                      <option value="Service Center">Service Center Hub</option>
                      <option value="Dealership">Dealership Workshop</option>
                      <option value="Distributor">Wholesale Distributor</option>
                      <option value="Fleet">Commercial Fleet Operator</option>
                      <option value="EV Business">EV Workshop / Specialized</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-1">
                      Quantity Required
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. 1 unit / 5 sets"
                      className="field text-xs"
                      value={quoteData.quantity}
                      onChange={(e) =>
                        setQuoteData({ ...quoteData, quantity: e.target.value })
                      }
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-1">
                    Bay Specifications / Delivery Timeline
                  </label>
                  <textarea
                    rows={2}
                    placeholder="Bay dimensions, ceiling height, or power requirements..."
                    className="field text-xs"
                    value={quoteData.notes}
                    onChange={(e) =>
                      setQuoteData({ ...quoteData, notes: e.target.value })
                    }
                  />
                </div>

                <button
                  type="submit"
                  className="btn btn-primary h-11 w-full text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2"
                >
                  <Send className="h-4 w-4" />
                  <span>Send Quotation Request</span>
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
