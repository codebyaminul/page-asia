import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  CheckCircle2,
  Clock,
  Compass,
  FileText,
  MapPin,
  Phone,
  ShieldCheck,
  Sparkles,
  Star,
  Truck,
  Wrench,
} from "lucide-react";
import { useState } from "react";
import { VehicleFinder } from "@/components/site/VehicleFinder";
import { ProductCard } from "@/components/site/ProductCard";
import { SectionHeader } from "@/components/site/PageHeader";
import {
  brands,
  centers,
  garageEquipmentCategories,
  guides,
  images,
  products,
  services,
  shopVisualCategories,
  taka,
} from "@/lib/data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "PAGE International — Automotive Parts, Garage Equipment & Workshop Solutions" },
      {
        name: "description",
        content: "Shop genuine automotive parts, heavy-duty garage equipment, diagnostics, and book certified vehicle servicing at PAGE International.",
      },
      { property: "og:title", content: "PAGE International — Automotive Parts & Garage Equipment" },
      {
        property: "og:description",
        content: "Commercial automotive parts, workshop machinery, and servicing ecosystem.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Home,
});

export function Home() {
  const [activeCategoryTab, setActiveCategoryTab] = useState<string>("All");

  const filteredProducts = activeCategoryTab === "All"
    ? products.slice(0, 8)
    : products.filter((p) => p.category === activeCategoryTab).concat(products).slice(0, 8);

  return (
    <div className="bg-background text-foreground">
      {/* ======================================================== */}
      {/* 01 / HERO: PROFESSIONAL AUTOMOTIVE EQUIPMENT & PARTS      */}
      {/* ======================================================== */}
      <section className="relative overflow-hidden bg-ink pt-28 text-ink-foreground lg:pt-36 border-b border-ink-border">
        {/* Background Image with Commercial Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src={images.heroWorkshop}
            alt="Modern commercial automotive workshop facility with vehicle lifts and service bays"
            fetchPriority="high"
            width={1920}
            height={1080}
            className="h-full w-full object-cover object-center opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/90 to-ink/65" />
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-transparent" />
        </div>

        <div className="container-page relative z-10 py-12 lg:py-20">
          <div className="grid gap-12 lg:grid-cols-[1.25fr_1fr] lg:items-center">
            {/* Left Column: Commercial Hook */}
            <div>
              <div className="inline-flex items-center gap-2 rounded bg-primary/20 border border-primary/40 px-3 py-1 text-xs font-bold uppercase tracking-wider text-primary">
                <ShieldCheck className="h-3.5 w-3.5" />
                <span>Commercial Automotive Spares & Equipment</span>
              </div>

              <h1 className="display-hero mt-5 text-ink-foreground max-w-2xl">
                AUTOMOTIVE EQUIPMENT & PARTS <span className="text-primary">FOR PROFESSIONALS</span>
              </h1>

              <p className="mt-5 max-w-xl text-base sm:text-lg leading-relaxed text-ink-muted">
                Everything your workshop needs. Heavy-duty 2-post lifts, electronic diagnostic systems, OEM replacement parts, and certified technician servicing for commercial workshops, fleets, and individual owners.
              </p>

              {/* Action Buttons */}
              <div className="mt-8 flex flex-wrap items-center gap-3.5">
                <Link to="/shop" className="btn btn-primary h-12 px-6 text-xs sm:text-sm">
                  Shop Products <ArrowRight className="h-4 w-4" />
                </Link>
                <Link to="/shop" search={{ cat: "Equipment" }} className="btn btn-ghost-light h-12 px-6 text-xs sm:text-sm">
                  <Wrench className="h-4 w-4 text-primary" /> Garage Equipment
                </Link>
                <Link to="/services/book" className="btn btn-outline border-ink-border text-ink-foreground hover:bg-ink-2 h-12 px-5 text-xs sm:text-sm">
                  Book a Service
                </Link>
              </div>

              {/* Trust Badges */}
              <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-4 border-t border-ink-border/60 pt-6 text-xs">
                <div>
                  <span className="font-display text-2xl font-bold text-ink-foreground">10,000+</span>
                  <p className="text-ink-muted font-medium">Spares in Stock</p>
                </div>
                <div>
                  <span className="font-display text-2xl font-bold text-ink-foreground">2-YEAR</span>
                  <p className="text-ink-muted font-medium">Equipment Warranty</p>
                </div>
                <div>
                  <span className="font-display text-2xl font-bold text-ink-foreground">100%</span>
                  <p className="text-ink-muted font-medium">Genuine Fitment</p>
                </div>
                <div>
                  <span className="font-display text-2xl font-bold text-ink-foreground">NATIONWIDE</span>
                  <p className="text-ink-muted font-medium">Hub Distribution</p>
                </div>
              </div>
            </div>

            {/* Right Column: Hero Equipment Feature Card */}
            <div className="relative">
              <div className="rounded-lg border border-ink-border bg-ink-2/95 p-6 shadow-2xl backdrop-blur-xs">
                <div className="flex items-center justify-between border-b border-ink-border pb-3">
                  <span className="text-[11px] font-bold uppercase tracking-widest text-primary flex items-center gap-1.5">
                    <Sparkles className="h-3 w-3" /> Commercial Highlight
                  </span>
                  <span className="rounded bg-success/20 px-2 py-0.5 text-[10px] font-bold text-success uppercase">
                    Ready for Delivery
                  </span>
                </div>

                <div className="mt-4 aspect-[4/3] overflow-hidden rounded bg-black/40 p-4">
                  <img
                    src={images.lift}
                    alt="Heavy-duty 2-post lift"
                    className="h-full w-full object-contain"
                  />
                </div>

                <div className="mt-4">
                  <div className="flex items-baseline justify-between">
                    <div>
                      <p className="text-xs font-bold text-primary uppercase tracking-wider">Torq Equipment</p>
                      <h3 className="font-display text-xl font-bold text-ink-foreground mt-0.5">
                        2-Post Clear Floor Lift 4.0T
                      </h3>
                    </div>
                    <span className="font-display text-2xl font-bold text-ink-foreground">
                      {taka(285000)}
                    </span>
                  </div>

                  <p className="mt-2 text-xs text-ink-muted line-clamp-2">
                    Heavy-duty electro-hydraulic workshop lift. 4,000 kg capacity with dual synchronization cylinders and electromagnetic safety release.
                  </p>

                  <div className="mt-4 flex gap-2">
                    <Link
                      to="/shop/$slug"
                      params={{ slug: "heavy-duty-2-post-lift-4t" }}
                      className="btn btn-primary h-9 flex-1 text-xs"
                    >
                      View Specifications
                    </Link>
                    <Link
                      to="/support"
                      className="btn btn-ghost-light h-9 px-3 text-xs"
                    >
                      Quote
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 02 / SHOP BY CATEGORY: LARGE VISUAL CATEGORIES            */}
      {/* ======================================================== */}
      <section className="container-page py-16 lg:py-24">
        <SectionHeader
          eyebrow="Direct Workshop Categories"
          title="SHOP BY AUTOMOTIVE CATEGORY"
          description="Source professional automotive equipment, replacement parts, and fluids tailored for automotive workshops and fleet maintenance."
          action={
            <Link to="/shop" className="link-arrow">
              View All Categories <ArrowRight className="h-4 w-4" />
            </Link>
          }
        />

        <div className="grid grid-cols-2 gap-3.5 sm:grid-cols-2 lg:grid-cols-4 sm:gap-5">
          {shopVisualCategories.map((cat) => (
            <Link
              key={cat.name}
              to={cat.link}
              className="group relative flex flex-col overflow-hidden rounded border border-border bg-card p-4 transition-all duration-200 hover:border-foreground/40 hover:shadow-md"
            >
              <div className="flex items-center justify-between">
                <span className="rounded bg-secondary px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-muted-foreground group-hover:text-primary">
                  {cat.badge}
                </span>
                <ArrowUpRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-primary" />
              </div>

              <div className="my-3 aspect-[4/3] overflow-hidden rounded bg-muted/40 p-2">
                <img
                  src={cat.img}
                  alt={cat.name}
                  loading="lazy"
                  className="h-full w-full object-contain mix-blend-multiply transition-transform duration-300 group-hover:scale-105"
                />
              </div>

              <div className="mt-auto">
                <h3 className="font-display text-lg sm:text-xl font-bold uppercase text-foreground group-hover:text-primary transition-colors">
                  {cat.name}
                </h3>
                <p className="mt-0.5 text-xs text-muted-foreground line-clamp-1">
                  {cat.desc}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ======================================================== */}
      {/* 03 / FIND PRODUCTS FOR YOUR VEHICLE: VEHICLE FINDER      */}
      {/* ======================================================== */}
      <section className="bg-secondary/70 py-14 lg:py-16 border-y border-border">
        <div className="container-page">
          <div className="max-w-2xl mb-6">
            <p className="eyebrow">Vehicle Compatibility Check</p>
            <h2 className="display-md mt-1 text-foreground">
              FIND EXACT PRODUCTS FOR YOUR VEHICLE
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground mt-1">
              Filter parts by exact make, model, year, and engine. Selected vehicle is saved in My Garage for one-click fitment verification across all catalog items.
            </p>
          </div>

          <VehicleFinder dark={false} />
        </div>
      </section>

      {/* ======================================================== */}
      {/* 04 / FEATURED PRODUCTS: REALISTIC ECOMMERCE GRID          */}
      {/* ======================================================== */}
      <section className="container-page py-16 lg:py-24">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8 border-b border-border pb-5">
          <div>
            <p className="eyebrow">Commercial & Retail Catalogue</p>
            <h2 className="display-md mt-1 text-foreground">FEATURED PARTS & EQUIPMENT</h2>
            <p className="text-xs sm:text-sm text-muted-foreground mt-1">
              Top-selling garage machinery, genuine replacement spares, and diagnostic tools with verified specifications.
            </p>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap gap-1.5">
            {["All", "Equipment", "Diagnostics", "Brakes", "Batteries", "Lubricants"].map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategoryTab(cat)}
                className={`rounded px-3 py-1.5 text-xs font-bold uppercase tracking-wider transition-colors ${
                  activeCategoryTab === cat
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-foreground/80 hover:bg-secondary/80"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3.5 sm:gap-5 lg:grid-cols-4">
          {filteredProducts.map((p) => (
            <ProductCard key={p.slug} p={p} />
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link to="/shop" className="btn btn-outline h-11 px-8 text-xs font-bold uppercase">
            Browse All Products & Equipment ({products.length} Items) <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 05 / GARAGE EQUIPMENT: LARGE COMMERCIAL EQUIPMENT SECTION */}
      {/* ======================================================== */}
      <section className="bg-ink py-16 lg:py-24 text-ink-foreground border-y border-ink-border">
        <div className="container-page">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-12 border-b border-ink-border/60 pb-6">
            <div>
              <p className="eyebrow flex items-center gap-1.5">
                <Wrench className="h-3.5 w-3.5" /> Professional Workshop Solutions
              </p>
              <h2 className="display-lg mt-2 text-ink-foreground">
                COMMERCIAL GARAGE EQUIPMENT & MACHINERY
              </h2>
              <p className="text-sm text-ink-muted max-w-2xl mt-2 leading-relaxed">
                PAGE supplies heavy-duty lifts, pneumatic tyre changers, computerised balancers, rotary screw compressors, and diagnostic tooling with certified installation and technician training.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link to="/shop" search={{ cat: "Equipment" }} className="btn btn-primary h-11 text-xs">
                Explore Garage Equipment
              </Link>
              <Link to="/support" className="btn btn-ghost-light h-11 text-xs">
                Request Turnkey Quote
              </Link>
            </div>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {garageEquipmentCategories.map((eq) => (
              <div
                key={eq.id}
                className="group relative flex flex-col rounded border border-ink-border bg-ink-2 p-5 transition-all hover:border-primary/60"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-primary">
                    {eq.count}
                  </span>
                  <span className="text-xs text-ink-muted group-hover:text-ink-foreground transition-colors">
                    Available in Stock
                  </span>
                </div>

                <div className="my-4 aspect-[4/3] overflow-hidden rounded bg-black/30 p-3">
                  <img
                    src={eq.img}
                    alt={eq.name}
                    loading="lazy"
                    className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-105"
                  />
                </div>

                <div className="mt-auto">
                  <h3 className="font-display text-2xl font-bold uppercase text-ink-foreground group-hover:text-primary transition-colors">
                    {eq.name}
                  </h3>
                  <p className="mt-1 text-xs text-ink-muted line-clamp-2">
                    {eq.desc}
                  </p>
                  <Link
                    to={eq.link}
                    className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-ink-foreground group-hover:text-primary transition-colors"
                  >
                    <span>View Specifications</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Turnkey Workshop Callout */}
          <div className="mt-12 rounded border border-ink-border bg-black/40 p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="max-w-2xl">
              <h3 className="font-display text-2xl font-bold uppercase text-ink-foreground">
                Planning a New Workshop or Modernizing Existing Bays?
              </h3>
              <p className="text-xs sm:text-sm text-ink-muted mt-1 leading-relaxed">
                Our workshop engineering team provides 2D/3D bay layouts, compressed air line sizing, electrical load planning, and turnkey equipment procurement.
              </p>
            </div>
            <Link to="/solutions" className="btn btn-primary h-11 px-6 text-xs whitespace-nowrap">
              Explore Garage Setup Solutions
            </Link>
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 06 / WORKSHOP SERVICES: CERTIFIED SERVICE ECOSYSTEM       */}
      {/* ======================================================== */}
      <section className="container-page py-16 lg:py-24">
        <SectionHeader
          eyebrow="Certified Technician Network"
          title="PROFESSIONAL WORKSHOP SERVICES"
          description="Documented vehicle inspections, advanced electronic diagnostics, and scheduled maintenance performed at PAGE service centers."
          action={
            <Link to="/services/book" className="btn btn-primary h-11 text-xs">
              Book a Service Appointment
            </Link>
          }
        />

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((s) => (
            <div
              key={s.slug}
              className="flex flex-col justify-between rounded border border-border bg-card p-5 transition-all hover:border-foreground/30 hover:shadow-xs"
            >
              <div>
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5 text-primary" /> {s.duration}
                  </span>
                  <span className="font-bold text-foreground">
                    {s.from ? `From ${taka(s.from)}` : "Quote Based"}
                  </span>
                </div>
                <h3 className="font-display text-xl font-bold uppercase text-foreground mt-3">
                  {s.name}
                </h3>
                <p className="mt-1.5 text-xs text-muted-foreground line-clamp-3 leading-relaxed">
                  {s.desc}
                </p>
              </div>

              <div className="mt-6 pt-3 border-t border-border">
                <Link
                  to="/services/book"
                  search={{ service: s.slug }}
                  className="btn btn-dark h-8.5 w-full text-[11px] font-bold uppercase tracking-wider"
                >
                  Book {s.name}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ======================================================== */}
      {/* 07 / WHY PAGE: PRACTICAL AUTOMOTIVE ADVANTAGES            */}
      {/* ======================================================== */}
      <section className="bg-secondary/60 py-16 lg:py-20 border-y border-border">
        <div className="container-page">
          <SectionHeader
            eyebrow="Commercial Standards"
            title="WHY AUTOMOTIVE PROFESSIONALS CHOOSE PAGE"
            description="Built to support mechanics, workshop operators, fleet managers, and car owners with uncompromising product integrity."
          />

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
            {[
              {
                icon: ShieldCheck,
                title: "100% Genuine Quality",
                desc: "Certified OEM and top-tier aftermarket spares with traceable source provenance.",
              },
              {
                icon: Wrench,
                title: "Technical Expertise",
                desc: "Machinery support, bay planning, and diagnostic troubleshooting by certified engineers.",
              },
              {
                icon: Truck,
                title: "Reliable Distribution",
                desc: "Hub-based regional stock with express dispatch across nationwide automotive hubs.",
              },
              {
                icon: FileText,
                title: "Commercial B2B Terms",
                desc: "Transparent wholesale quotes, volume pricing, and registered VAT tax invoicing.",
              },
              {
                icon: Compass,
                title: "Complete Ecosystem",
                desc: "A single dependable partner for spare parts, workshop equipment, and vehicle servicing.",
              },
            ].map((w) => (
              <div
                key={w.title}
                className="rounded border border-border bg-card p-5 flex flex-col justify-between"
              >
                <div>
                  <span className="grid h-10 w-10 place-items-center rounded bg-primary/10 text-primary mb-4">
                    <w.icon className="h-5 w-5" />
                  </span>
                  <h3 className="font-display text-lg font-bold uppercase text-foreground">
                    {w.title}
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                    {w.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 08 / BRANDS: CLEAN HORIZONTAL BRAND LIST                  */}
      {/* ======================================================== */}
      <section className="py-14 border-b border-border bg-background">
        <div className="container-page">
          <p className="text-center text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground mb-6">
            Authorized Partner Brands & Components
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-5 lg:grid-cols-10 gap-2 text-center">
            {brands.map((b) => (
              <div
                key={b}
                className="rounded border border-border/70 bg-card py-3.5 px-2 font-display text-lg font-bold uppercase tracking-wider text-muted-foreground hover:text-primary hover:border-primary/40 transition-colors"
              >
                {b}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 09 / WORKSHOP / SERVICE CENTER LOCATOR                    */}
      {/* ======================================================== */}
      <section className="container-page py-16 lg:py-24">
        <div className="grid gap-8 lg:grid-cols-[1.1fr_1.3fr] lg:items-center">
          <div>
            <p className="eyebrow">Service Center Network</p>
            <h2 className="display-lg mt-2 text-foreground">
              FIND A PAGE SERVICE CENTER
            </h2>
            <p className="mt-3 text-xs sm:text-sm text-muted-foreground leading-relaxed">
              Equipped with computerized diagnostic scanners, multi-bay vehicle lifts, and genuine spare parts inventory. Find your nearest location or book directly.
            </p>

            <div className="mt-6 divide-y divide-border border-y border-border">
              {centers.map((c) => (
                <div key={c.id} className="py-3.5 flex items-center justify-between gap-4">
                  <div>
                    <h3 className="font-semibold text-sm text-foreground flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-primary" />
                      {c.name}
                    </h3>
                    <p className="text-xs text-muted-foreground ml-6">
                      {c.address} • {c.hours}
                    </p>
                  </div>
                  <Link
                    to="/services/book"
                    search={{ center: c.id }}
                    className="btn btn-outline h-8 px-3 text-[11px]"
                  >
                    Book Here
                  </Link>
                </div>
              ))}
            </div>

            <div className="mt-6">
              <Link to="/service-centers" className="link-arrow">
                View Full Interactive Locator <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          {/* Interactive Map Visual */}
          <div className="relative min-h-[360px] overflow-hidden rounded border border-border bg-ink p-6 text-ink-foreground">
            <div className="grid-lines absolute inset-0 opacity-40" />
            <div className="relative z-10">
              <span className="text-[11px] font-bold uppercase tracking-wider text-primary">
                Network Coverage Map
              </span>
              <p className="text-xs text-ink-muted mt-1">
                Dhaka Hubs • Chattogram Port Distribution • Nationwide Partner Workshops
              </p>

              {centers.map((c) => (
                <div
                  key={c.id}
                  className="absolute -translate-x-1/2 -translate-y-1/2"
                  style={{ left: `${c.x}%`, top: `${c.y}%` }}
                >
                  <span className="relative flex h-4 w-4">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-50" />
                    <span className="relative inline-flex h-4 w-4 rounded-full border-2 border-ink-foreground bg-primary" />
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 10 / SUPPORT & TECHNICAL GUIDES                           */}
      {/* ======================================================== */}
      <section className="bg-secondary/60 py-16 lg:py-20 border-t border-border">
        <div className="container-page">
          <SectionHeader
            eyebrow="Technical Knowledge Hub"
            title="AUTOMOTIVE GUIDES & TECHNICAL ASSISTANCE"
            description="Guidance on component maintenance intervals, diagnostic error codes, and workshop machinery operation."
            action={
              <Link to="/support" className="link-arrow">
                Support Hub & FAQs <ArrowRight className="h-4 w-4" />
              </Link>
            }
          />

          <div className="grid gap-6 md:grid-cols-3">
            {guides.map((g) => (
              <article key={g.slug} className="group rounded border border-border bg-card overflow-hidden">
                <div className="aspect-[16/10] overflow-hidden bg-muted">
                  <img
                    src={g.img}
                    alt={g.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="p-5">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-primary">
                    {g.cat} • {g.mins} Min Read
                  </span>
                  <h3 className="mt-2 text-base font-bold text-foreground group-hover:text-primary transition-colors">
                    {g.title}
                  </h3>
                  <Link
                    to="/support"
                    className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-foreground hover:text-primary"
                  >
                    Read Guide <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 11 / FINAL BRAND STATEMENT: RESTRAINED "THINK NEXT."       */}
      {/* ======================================================== */}
      <section className="bg-ink py-16 lg:py-20 text-ink-foreground border-t border-ink-border">
        <div className="container-page text-center max-w-3xl">
          <p className="eyebrow">PAGE International Ltd.</p>
          <h2 className="display-giant mt-3 text-ink-foreground">
            THINK NEXT<span className="text-primary">.</span>
          </h2>
          <p className="mt-3 text-sm sm:text-base text-ink-muted leading-relaxed max-w-xl mx-auto">
            Empowering the automotive sector with reliable parts supply, modern garage machinery, and dedicated engineering support.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link to="/shop" className="btn btn-primary h-11 px-6 text-xs sm:text-sm">
              Shop Automotive Products
            </Link>
            <Link to="/support" className="btn btn-ghost-light h-11 px-6 text-xs sm:text-sm">
              Request Commercial Quote
            </Link>
            <Link to="/services/book" className="btn btn-outline border-ink-border text-ink-foreground hover:bg-ink-2 h-11 px-6 text-xs sm:text-sm">
              Book Vehicle Service
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
