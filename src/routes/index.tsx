import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  ArrowUpRight,
  BatteryCharging,
  Bike,
  Building2,
  Car,
  CheckCircle2,
  Cpu,
  FileSpreadsheet,
  Gauge,
  Layers,
  Send,
  ShieldCheck,
  Sparkles,
  Truck,
  Wrench,
  Zap,
} from "lucide-react";
import { useState } from "react";
import { VehicleFinder } from "@/components/site/VehicleFinder";
import { ProductCard } from "@/components/site/ProductCard";
import { SectionHeader } from "@/components/site/PageHeader";
import {
  brands,
  garageEquipmentCategories,
  images,
  mobilitySegments,
  products,
  shopVisualCategories,
  taka,
  whoWeServe,
  type MobilityType,
} from "@/lib/data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      {
        title:
          "PAGE International — Automotive Equipment, Parts & Workshop Solutions",
      },
      {
        name: "description",
        content:
          "PAGE International is a B2B supplier of automotive garage equipment, spare parts, diagnostics, tools, and workshop solutions to service centers, workshops, dealers, and EV businesses.",
      },
      {
        property: "og:title",
        content:
          "PAGE International — Automotive Equipment, Parts & Workshop Solutions",
      },
      {
        property: "og:description",
        content:
          "The company behind the workshop. Commercial automotive machinery, spare parts, and workshop engineering.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Home,
});

export function Home() {
  const [activeCategoryTab, setActiveCategoryTab] = useState<string>("All");
  const [activeMobilityTab, setActiveMobilityTab] = useState<string>("All");

  // B2B Quote Form State
  const [quoteForm, setQuoteForm] = useState({
    businessName: "",
    contactPerson: "",
    phone: "",
    email: "",
    businessType: "Workshop",
    location: "",
    category: "Garage Equipment",
    products: "",
    quantity: "1",
    message: "",
  });
  const [quoteSubmitted, setQuoteSubmitted] = useState(false);

  const handleQuoteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!quoteForm.businessName || !quoteForm.phone) return;
    setQuoteSubmitted(true);
  };

  // Filter products for featured section
  const filteredProducts = products.filter((p) => {
    if (activeMobilityTab !== "All") {
      if (!p.mobility.includes(activeMobilityTab as MobilityType)) return false;
    }
    if (activeCategoryTab !== "All") {
      if (activeCategoryTab === "Equipment" && !p.isEquipment) return false;
      if (activeCategoryTab === "Diagnostics" && p.category !== "Diagnostic Systems")
        return false;
      if (activeCategoryTab === "Brakes" && p.category !== "Brake Systems")
        return false;
      if (activeCategoryTab === "Batteries" && p.category !== "Batteries & Power")
        return false;
      if (activeCategoryTab === "EV Tools" && !p.mobility.includes("EV"))
        return false;
    }
    return true;
  }).slice(0, 8);

  return (
    <div className="bg-background text-foreground">
      {/* ======================================================== */}
      {/* 01 — HERO: WHAT PAGE SELLS + B2B CONVERSION HOOKS        */}
      {/* ======================================================== */}
      <section className="relative overflow-hidden bg-ink pt-28 text-ink-foreground lg:pt-36 border-b border-ink-border">
        {/* Background Image: Commercial Workshop Environment */}
        <div className="absolute inset-0 z-0">
          <img
            src={images.heroWorkshop}
            alt="Commercial automotive workshop facility equipped with vehicle lifts and diagnostic equipment"
            fetchPriority="high"
            width={1920}
            height={1080}
            className="h-full w-full object-cover object-center opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/90 to-ink/70" />
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-transparent" />
        </div>

        <div className="container-page relative z-10 py-12 lg:py-20">
          <div className="grid gap-12 lg:grid-cols-[1.25fr_1fr] lg:items-center">
            {/* Left Column: Direct Commercial Positioning */}
            <div>
              <div className="inline-flex items-center gap-2 rounded bg-primary/20 border border-primary/40 px-3 py-1 text-xs font-bold uppercase tracking-wider text-primary">
                <ShieldCheck className="h-3.5 w-3.5" />
                <span>PAGE INTERNATIONAL · B2B AUTOMOTIVE SUPPLIER</span>
              </div>

              <h1 className="display-hero mt-5 text-ink-foreground max-w-2xl">
                AUTOMOTIVE EQUIPMENT. <br />
                PARTS. <br />
                <span className="text-primary">WORKSHOP SOLUTIONS.</span>
              </h1>

              <p className="mt-5 max-w-xl text-base sm:text-lg leading-relaxed text-ink-muted">
                Professional equipment, spare parts, and turnkey solutions supplied
                directly to automotive service centers, workshops, dealerships,
                fleet depots, and EV businesses. We equip the businesses that service
                vehicles.
              </p>

              {/* Main CTAs */}
              <div className="mt-8 flex flex-wrap items-center gap-3.5">
                <Link
                  to="/shop"
                  className="btn btn-primary h-12 px-7 text-xs sm:text-sm font-bold uppercase tracking-wider"
                >
                  Explore Products <ArrowRight className="h-4 w-4" />
                </Link>
                <a
                  href="#request-quote"
                  className="btn btn-outline border-ink-border text-ink-foreground hover:bg-ink-2 h-12 px-6 text-xs sm:text-sm font-bold uppercase tracking-wider"
                >
                  <FileSpreadsheet className="h-4 w-4 text-primary" /> Request a Quote
                </a>
                <Link
                  to="/solutions"
                  className="btn btn-ghost-light h-12 px-5 text-xs sm:text-sm font-bold uppercase tracking-wider"
                >
                  <Wrench className="h-4 w-4 text-primary" /> Workshop Solutions
                </Link>
              </div>

              {/* B2B Supply Proof Points */}
              <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-4 border-t border-ink-border/60 pt-6 text-xs">
                <div>
                  <span className="font-display text-2xl font-bold text-ink-foreground">
                    10,000+
                  </span>
                  <p className="text-ink-muted font-medium">B2B Spares & SKUs</p>
                </div>
                <div>
                  <span className="font-display text-2xl font-bold text-ink-foreground">
                    4-MOBILITY
                  </span>
                  <p className="text-ink-muted font-medium">4W · 2W · 3W · EV</p>
                </div>
                <div>
                  <span className="font-display text-2xl font-bold text-ink-foreground">
                    TURNKEY
                  </span>
                  <p className="text-ink-muted font-medium">Bay Installation & Rig</p>
                </div>
                <div>
                  <span className="font-display text-2xl font-bold text-ink-foreground">
                    NATIONWIDE
                  </span>
                  <p className="text-ink-muted font-medium">Commercial Distribution</p>
                </div>
              </div>
            </div>

            {/* Right Column: Hero Commercial Equipment Feature Card */}
            <div className="relative">
              <div className="rounded-lg border border-ink-border bg-ink-2/95 p-6 shadow-2xl backdrop-blur-xs">
                <div className="flex items-center justify-between border-b border-ink-border pb-3">
                  <span className="text-[11px] font-bold uppercase tracking-widest text-primary flex items-center gap-1.5">
                    <Sparkles className="h-3 w-3" /> Featured Commercial Equipment
                  </span>
                  <span className="rounded bg-emerald-500/20 text-emerald-400 px-2 py-0.5 text-[10px] font-bold uppercase">
                    Commercial Supply Ready
                  </span>
                </div>

                <div className="mt-4 aspect-[4/3] overflow-hidden rounded bg-black/40 p-4">
                  <img
                    src={images.lift}
                    alt="Torq Heavy-duty 2-post clear floor workshop lift"
                    className="h-full w-full object-contain"
                  />
                </div>

                <div className="mt-4">
                  <div className="flex items-baseline justify-between">
                    <div>
                      <p className="text-xs font-bold text-primary uppercase tracking-wider">
                        Torq Workshop Equipment · 4W & LCV
                      </p>
                      <h3 className="font-display text-xl font-bold text-ink-foreground mt-0.5">
                        Heavy-Duty 2-Post Lift 4.0T Clear Floor
                      </h3>
                    </div>
                    <span className="font-display text-2xl font-bold text-ink-foreground">
                      {taka(285000)}
                    </span>
                  </div>

                  <div className="mt-2.5 flex flex-wrap gap-2 text-[11px] font-mono text-ink-muted">
                    <span className="bg-black/40 px-2 py-0.5 rounded border border-ink-border">
                      Cap: 4,000 kg
                    </span>
                    <span className="bg-black/40 px-2 py-0.5 rounded border border-ink-border">
                      Power: 2.2 kW / 380V
                    </span>
                    <span className="bg-black/40 px-2 py-0.5 rounded border border-ink-border">
                      Height: 1900 mm
                    </span>
                  </div>

                  <p className="mt-2.5 text-xs text-ink-muted line-clamp-2">
                    Heavy-duty electro-hydraulic vehicle lift engineered for continuous
                    duty in automotive workshops, dealership bays, and tyre centers.
                  </p>

                  <div className="mt-4 flex gap-2">
                    <Link
                      to="/shop/$slug"
                      params={{ slug: "heavy-duty-2-post-lift-4t" }}
                      className="btn btn-primary h-9 flex-1 text-xs font-bold uppercase tracking-wider"
                    >
                      View Specs & Data
                    </Link>
                    <a
                      href="#request-quote"
                      className="btn btn-ghost-light h-9 px-4 text-xs font-bold uppercase tracking-wider"
                    >
                      Request Quote
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 02 — SHOP BY APPLICATION: 4W · 2W · 3W · EV               */}
      {/* ======================================================== */}
      <section className="container-page py-16 lg:py-20">
        <SectionHeader
          eyebrow="Mobility Platforms & Applications"
          title="SHOP BY VEHICLE PLATFORM"
          description="PAGE equips businesses across passenger cars, commercial vehicles, two-wheelers, three-wheelers, and electric mobility."
          action={
            <Link to="/shop" className="link-arrow">
              View All Platforms <ArrowRight className="h-4 w-4" />
            </Link>
          }
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {mobilitySegments.map((seg) => {
            const Icon =
              seg.id === "4-Wheeler"
                ? Car
                : seg.id === "2-Wheeler"
                ? Bike
                : seg.id === "3-Wheeler"
                ? Truck
                : Zap;

            return (
              <Link
                key={seg.id}
                to="/shop"
                search={{ mobility: seg.id }}
                className="group flex flex-col justify-between rounded border border-border bg-card p-5 transition-all duration-200 hover:border-foreground/50 hover:shadow-md"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="grid h-10 w-10 place-items-center rounded bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                      <Icon className="h-5 w-5" />
                    </span>
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-muted-foreground bg-secondary px-2 py-0.5 rounded">
                      B2B Supply
                    </span>
                  </div>

                  <h3 className="font-heading text-2xl tracking-wide uppercase text-foreground mt-4 group-hover:text-primary transition-colors">
                    {seg.label}
                  </h3>

                  <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
                    {seg.desc}
                  </p>

                  <div className="mt-4 border-t border-border/50 pt-3">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-1.5">
                      Supported Platforms:
                    </p>
                    <div className="flex flex-wrap gap-1">
                      {seg.types.map((t) => (
                        <span
                          key={t}
                          className="text-[10px] bg-secondary/80 text-foreground px-2 py-0.5 rounded"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex items-center justify-between border-t border-border pt-3 text-xs font-bold uppercase tracking-wider text-foreground group-hover:text-primary transition-colors">
                  <span>Equip {seg.id} Bays</span>
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* ======================================================== */}
      {/* 03 — SHOP BY CATEGORY: CORE B2B CATALOGUE SECTIONS       */}
      {/* ======================================================== */}
      <section className="bg-secondary/40 py-16 lg:py-20 border-y border-border">
        <div className="container-page">
          <SectionHeader
            eyebrow="Commercial Equipment & Spares"
            title="SHOP BY PRODUCT CATEGORY"
            description="Source garage machinery, computerized diagnostic tools, heavy lifting systems, and OEM replacement parts."
            action={
              <Link to="/shop" className="link-arrow">
                Full Catalogue Index <ArrowRight className="h-4 w-4" />
              </Link>
            }
          />

          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {shopVisualCategories.map((cat) => (
              <Link
                key={cat.name}
                to={cat.link}
                className="group relative flex flex-col overflow-hidden rounded border border-border bg-card p-4 transition-all duration-200 hover:border-foreground/50 hover:shadow-md"
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
        </div>
      </section>

      {/* ======================================================== */}
      {/* 04 — FEATURED PRODUCTS: B2B COMMERCIAL GRID               */}
      {/* ======================================================== */}
      <section className="container-page py-16 lg:py-24">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8 border-b border-border pb-5">
          <div>
            <p className="eyebrow">Professional Products & Machinery</p>
            <h2 className="display-md mt-1 text-foreground">
              FEATURED EQUIPMENT, PARTS & TOOLS
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground mt-1">
              Dual-action purchasing: add off-the-shelf tools and parts to cart, or
              request commercial engineering quotes for heavy machinery.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-1.5">
            {[
              { id: "All", label: "All Items" },
              { id: "Equipment", label: "Machinery" },
              { id: "Diagnostics", label: "Diagnostics" },
              { id: "EV Tools", label: "EV Equipment" },
              { id: "Brakes", label: "Brakes" },
              { id: "Batteries", label: "Batteries" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveCategoryTab(tab.id)}
                className={`rounded px-3 py-1.5 text-xs font-bold uppercase tracking-wider transition-colors ${
                  activeCategoryTab === tab.id
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "bg-secondary text-foreground/80 hover:bg-secondary/80"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Mobility Filter Pills */}
        <div className="mb-6 flex flex-wrap items-center gap-2">
          <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground mr-1">
            Filter by Platform:
          </span>
          {["All", "4-Wheeler", "2-Wheeler", "3-Wheeler", "EV"].map((mob) => (
            <button
              key={mob}
              onClick={() => setActiveMobilityTab(mob)}
              className={`text-xs px-2.5 py-1 rounded border transition-colors ${
                activeMobilityTab === mob
                  ? "border-foreground bg-foreground text-background font-bold"
                  : "border-border bg-card text-muted-foreground hover:text-foreground"
              }`}
            >
              {mob}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-3.5 sm:gap-5 lg:grid-cols-4">
          {filteredProducts.map((p) => (
            <ProductCard key={p.slug} p={p} />
          ))}
        </div>

        <div className="mt-12 text-center flex flex-wrap justify-center gap-4">
          <Link
            to="/shop"
            className="btn btn-outline h-11 px-8 text-xs font-bold uppercase"
          >
            Browse Full B2B Catalogue ({products.length} Items){" "}
            <ArrowRight className="h-4 w-4" />
          </Link>
          <a
            href="#request-quote"
            className="btn btn-primary h-11 px-8 text-xs font-bold uppercase"
          >
            Request Volume Quotation <FileSpreadsheet className="h-4 w-4" />
          </a>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 05 — GARAGE EQUIPMENT: LARGE COMMERCIAL SHOWCASE          */}
      {/* ======================================================== */}
      <section className="bg-ink py-16 lg:py-24 text-ink-foreground border-y border-ink-border">
        <div className="container-page">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-12 border-b border-ink-border/60 pb-6">
            <div>
              <p className="eyebrow flex items-center gap-1.5">
                <Wrench className="h-3.5 w-3.5 text-primary" /> Major Workshop Machinery
              </p>
              <h2 className="display-lg mt-2 text-ink-foreground">
                PROFESSIONAL GARAGE EQUIPMENT & MACHINERY
              </h2>
              <p className="text-sm text-ink-muted max-w-2xl mt-2 leading-relaxed">
                PAGE supplies heavy-duty lifts, pneumatic tyre changers, computerized
                balancers, rotary screw air compressors, and AC service stations.
                Complete with foundation anchoring, commissioning, and technician operation training.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                to="/shop"
                search={{ cat: "Equipment" }}
                className="btn btn-primary h-11 text-xs font-bold uppercase"
              >
                Explore All Garage Equipment
              </Link>
              <a
                href="#request-quote"
                className="btn btn-ghost-light h-11 text-xs font-bold uppercase"
              >
                Request Turnkey Quote
              </a>
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
                    <span>View Specifications & Models</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Turnkey Workshop Callout */}
          <div className="mt-12 rounded border border-ink-border bg-black/40 p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="max-w-2xl">
              <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-primary block">
                Turnkey Workshop Engineering
              </span>
              <h3 className="font-display text-2xl font-bold uppercase text-ink-foreground mt-1">
                Setting Up a New Workshop or Upgrading Service Bays?
              </h3>
              <p className="text-xs sm:text-sm text-ink-muted mt-1 leading-relaxed">
                Our workshop engineers provide 2D/3D bay layouts, compressed air line sizing,
                electrical load planning, and multi-post lift anchoring for independent
                workshops, quick-fit tyre centers, and commercial fleets.
              </p>
            </div>
            <Link
              to="/solutions"
              className="btn btn-primary h-11 px-7 text-xs font-bold uppercase whitespace-nowrap"
            >
              Explore Workshop Setup Solutions
            </Link>
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 06 — EV WORKSHOP SOLUTIONS: 2W · 3W · 4W EV SHOWCASE     */}
      {/* ======================================================== */}
      <section className="container-page py-16 lg:py-24">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-10 border-b border-border pb-6">
          <div>
            <div className="inline-flex items-center gap-2 rounded bg-amber-500/10 border border-amber-500/30 px-3 py-1 text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
              <Zap className="h-3.5 w-3.5" />
              <span>Next-Gen Mobility Transition</span>
            </div>
            <h2 className="display-lg mt-3 text-foreground">
              EV WORKSHOP SOLUTIONS & EQUIPMENT
            </h2>
            <p className="text-sm text-muted-foreground max-w-2xl mt-1.5 leading-relaxed">
              Equip your workshop for the next generation of electric mobility. PAGE
              supplies high-voltage certified safety tools, traction battery cell analyzers,
              insulated benches, and specialized diagnostics for 2W, 3W, and 4W EV platforms.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              to="/shop"
              search={{ mobility: "EV" }}
              className="btn btn-primary h-11 text-xs font-bold uppercase"
            >
              Explore EV Equipment
            </Link>
            <Link
              to="/solutions"
              className="btn btn-outline h-11 text-xs font-bold uppercase"
            >
              EV Workshop Setup Plan
            </Link>
          </div>
        </div>

        {/* 2W / 3W / 4W EV Pathway Cards */}
        <div className="grid gap-6 md:grid-cols-3 mb-10">
          <div className="rounded border border-border bg-card p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between text-xs font-bold uppercase text-muted-foreground">
                <span className="flex items-center gap-1.5 text-primary">
                  <Bike className="h-4 w-4" /> 2-Wheeler EV
                </span>
                <span className="bg-secondary px-2 py-0.5 rounded text-[10px]">
                  Bikes & Scooters
                </span>
              </div>
              <h3 className="font-heading text-2xl uppercase mt-3 text-foreground">
                2W EV Workshop Tooling
              </h3>
              <p className="text-xs text-muted-foreground mt-2 leading-relaxed">
                Insulated battery swap benches, 48V–72V BMS diagnostic harnesses,
                high-precision cell balancers, and electro-hydraulic motorcycle lift platforms.
              </p>
              <ul className="mt-4 space-y-1.5 text-xs text-foreground/80">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
                  <span>Motorcycle hydraulic scissor lifts</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
                  <span>48V–72V LFP / NMC battery testers</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
                  <span>BLDC motor controller oscilloscopes</span>
                </li>
              </ul>
            </div>
            <Link
              to="/shop"
              search={{ mobility: "2-Wheeler" }}
              className="btn btn-outline h-9 w-full text-xs font-bold uppercase mt-6"
            >
              Equip 2W EV Bays
            </Link>
          </div>

          <div className="rounded border border-border bg-card p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between text-xs font-bold uppercase text-muted-foreground">
                <span className="flex items-center gap-1.5 text-primary">
                  <Truck className="h-4 w-4" /> 3-Wheeler EV
                </span>
                <span className="bg-secondary px-2 py-0.5 rounded text-[10px]">
                  E-Rickshaw & Cargo
                </span>
              </div>
              <h3 className="font-heading text-2xl uppercase mt-3 text-foreground">
                3W EV Workshop Tooling
              </h3>
              <p className="text-xs text-muted-foreground mt-2 leading-relaxed">
                Heavy duty underbody lift ramps for commercial 3-wheelers, high-current
                fast charge test units, lead-acid to lithium retrofit test benches.
              </p>
              <ul className="mt-4 space-y-1.5 text-xs text-foreground/80">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
                  <span>3-Wheeler commercial lift benches</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
                  <span>High-amperage battery charging units</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
                  <span>Differential and motor diagnostic rigs</span>
                </li>
              </ul>
            </div>
            <Link
              to="/shop"
              search={{ mobility: "3-Wheeler" }}
              className="btn btn-outline h-9 w-full text-xs font-bold uppercase mt-6"
            >
              Equip 3W EV Bays
            </Link>
          </div>

          <div className="rounded border border-border bg-card p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between text-xs font-bold uppercase text-muted-foreground">
                <span className="flex items-center gap-1.5 text-primary">
                  <Car className="h-4 w-4" /> 4-Wheeler EV
                </span>
                <span className="bg-secondary px-2 py-0.5 rounded text-[10px]">
                  Cars, SUVs & Vans
                </span>
              </div>
              <h3 className="font-heading text-2xl uppercase mt-3 text-foreground">
                4W EV & Hybrid Tooling
              </h3>
              <p className="text-xs text-muted-foreground mt-2 leading-relaxed">
                1000V VDE tool sets, traction battery pack lifting tables, high-voltage
                insulation resistance testers, and full-vehicle EV OBD diagnostic tablets.
              </p>
              <ul className="mt-4 space-y-1.5 text-xs text-foreground/80">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
                  <span>1000V VDE safety insulated tool sets</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
                  <span>Battery pack hydraulic lowering tables</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
                  <span>BYD, MG & Toyota Hybrid OBD scanners</span>
                </li>
              </ul>
            </div>
            <Link
              to="/shop"
              search={{ mobility: "EV" }}
              className="btn btn-outline h-9 w-full text-xs font-bold uppercase mt-6"
            >
              Equip 4W EV Bays
            </Link>
          </div>
        </div>

        {/* Featured EV Equipment Grid */}
        <div className="rounded border border-border bg-secondary/30 p-6">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-foreground">
              Specialized EV & Hybrid Workshop Machinery
            </span>
            <Link
              to="/shop"
              search={{ mobility: "EV" }}
              className="text-xs text-primary font-bold uppercase hover:underline"
            >
              View All EV Equipment →
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {products
              .filter((p) => p.mobility.includes("EV") || p.category === "Diagnostic Systems")
              .slice(0, 4)
              .map((p) => (
                <ProductCard key={p.slug} p={p} />
              ))}
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 07 — FIND THE RIGHT PRODUCT: MULTI-MOBILITY FINDER       */}
      {/* ======================================================== */}
      <section className="bg-secondary/70 py-14 lg:py-16 border-y border-border">
        <div className="container-page">
          <div className="max-w-2xl mb-6">
            <p className="eyebrow">Product Compatibility & Fitment</p>
            <h2 className="display-md mt-1 text-foreground">
              FIND EXACT PRODUCTS FOR YOUR VEHICLE PLATFORM
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground mt-1">
              Select 4-Wheeler, 2-Wheeler, 3-Wheeler, or EV to quickly locate
              compatible replacement parts, lubricants, filters, and tooling.
            </p>
          </div>

          <VehicleFinder dark={false} />
        </div>
      </section>

      {/* ======================================================== */}
      {/* 08 — WHO WE SERVE: B2B TARGET CUSTOMERS                  */}
      {/* ======================================================== */}
      <section className="container-page py-16 lg:py-24">
        <SectionHeader
          eyebrow="Target B2B Customer Sectors"
          title="WHO WE SERVE"
          description="Whatever your automotive business, PAGE helps you equip it. Reliable equipment supply, commercial spares, and technical engineering."
        />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {whoWeServe.map((item) => (
            <div
              key={item.title}
              className="flex flex-col justify-between rounded border border-border bg-card p-6 transition-all hover:border-foreground/40 hover:shadow-sm"
            >
              <div>
                <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-primary">
                  {item.subtitle}
                </span>
                <h3 className="font-heading text-2xl uppercase mt-2 text-foreground">
                  {item.title}
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                  {item.desc}
                </p>

                <div className="mt-4 border-t border-border/50 pt-3">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-1.5">
                    Common PAGE Supplies:
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {item.supplies.map((s) => (
                      <span
                        key={s}
                        className="text-[11px] bg-secondary text-foreground px-2 py-0.5 rounded"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-3 border-t border-border">
                <a
                  href="#request-quote"
                  className="btn btn-outline h-8.5 w-full text-[11px] font-bold uppercase tracking-wider"
                >
                  Request Supply Terms
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ======================================================== */}
      {/* 09 — BRANDS: AUTHORIZED MANUFACTURERS                    */}
      {/* ======================================================== */}
      <section className="py-14 border-y border-border bg-background">
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
      {/* 10 — REQUEST A QUOTE: SERIOUS B2B CONVERSION SECTION      */}
      {/* ======================================================== */}
      <section
        id="request-quote"
        className="bg-secondary/60 py-16 lg:py-24 border-b border-border scroll-mt-20"
      >
        <div className="container-page">
          <div className="grid gap-12 lg:grid-cols-[1fr_1.3fr] lg:items-start">
            {/* Left Column: B2B Quote Information */}
            <div>
              <div className="inline-flex items-center gap-2 rounded bg-primary/10 border border-primary/30 px-3 py-1 text-xs font-bold uppercase tracking-wider text-primary">
                <FileSpreadsheet className="h-3.5 w-3.5" />
                <span>Commercial B2B Inquiry</span>
              </div>

              <h2 className="display-lg mt-3 text-foreground">
                REQUEST A COMMERCIAL QUOTE
              </h2>

              <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                Large workshop machinery, multi-bay setups, and container-scale spare
                parts orders require technical consultation and commercial invoicing.
                Submit your project requirements for an official quote within 24 hours.
              </p>

              <div className="mt-8 space-y-4">
                <div className="flex items-start gap-3">
                  <div className="grid h-8 w-8 place-items-center rounded bg-primary/10 text-primary shrink-0">
                    <CheckCircle2 className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-foreground">
                      Registered Tax Invoice & VAT Compliance
                    </h4>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      Full corporate documentation for workshop capital expenditure and commercial expense deduction.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="grid h-8 w-8 place-items-center rounded bg-primary/10 text-primary shrink-0">
                    <CheckCircle2 className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-foreground">
                      On-Site Bay Planning & Installation
                    </h4>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      Certified technician deployment for heavy lift anchoring, pneumatic line rigging, and initial calibration.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="grid h-8 w-8 place-items-center rounded bg-primary/10 text-primary shrink-0">
                    <CheckCircle2 className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-foreground">
                      Volume B2B & Wholesale Discounts
                    </h4>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      Tiered discount schedules for fleet depots, regional spare parts retailers, and expanding garage networks.
                    </p>
                  </div>
                </div>
              </div>

              {/* Direct Hotline Box */}
              <div className="mt-8 rounded border border-border bg-card p-4">
                <span className="text-[11px] font-mono uppercase tracking-wider text-muted-foreground font-bold block">
                  Direct B2B Commercial Desk
                </span>
                <p className="text-base font-bold text-foreground mt-1">
                  +880 9612-724346 · b2b@page-intl.com
                </p>
                <p className="text-xs text-muted-foreground">
                  Tejgaon Industrial Area, Dhaka · Sunday–Thursday 09:00–18:00
                </p>
              </div>
            </div>

            {/* Right Column: Serious B2B Form */}
            <div className="rounded-lg border border-border bg-card p-6 sm:p-8 shadow-sm">
              {quoteSubmitted ? (
                <div className="py-12 text-center">
                  <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-emerald-500/10 text-emerald-600 mb-4">
                    <CheckCircle2 className="h-7 w-7" />
                  </div>
                  <h3 className="font-heading text-2xl uppercase text-foreground">
                    Quote Request Received
                  </h3>
                  <p className="text-sm text-muted-foreground max-w-md mx-auto mt-2 leading-relaxed">
                    Thank you, {quoteForm.contactPerson || quoteForm.businessName}. Our B2B
                    equipment and parts desk will review your specifications and contact
                    you with a formal commercial quotation.
                  </p>
                  <button
                    onClick={() => {
                      setQuoteSubmitted(false);
                      setQuoteForm({
                        businessName: "",
                        contactPerson: "",
                        phone: "",
                        email: "",
                        businessType: "Workshop",
                        location: "",
                        category: "Garage Equipment",
                        products: "",
                        quantity: "1",
                        message: "",
                      });
                    }}
                    className="btn btn-outline h-10 text-xs font-bold uppercase tracking-wider mt-6"
                  >
                    Submit Another Inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleQuoteSubmit} className="space-y-4">
                  <div className="border-b border-border pb-3 mb-4">
                    <h3 className="font-heading text-xl uppercase text-foreground">
                      Commercial Quotation Form
                    </h3>
                    <p className="text-xs text-muted-foreground">
                      Please provide your business and equipment / parts requirements:
                    </p>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-muted-foreground mb-1">
                        Business / Workshop Name *
                      </label>
                      <input
                        required
                        type="text"
                        placeholder="e.g. Apex Auto Workshop Ltd."
                        className="field"
                        value={quoteForm.businessName}
                        onChange={(e) =>
                          setQuoteForm({ ...quoteForm, businessName: e.target.value })
                        }
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-muted-foreground mb-1">
                        Contact Person *
                      </label>
                      <input
                        required
                        type="text"
                        placeholder="e.g. Engr. Tanvir Ahmed"
                        className="field"
                        value={quoteForm.contactPerson}
                        onChange={(e) =>
                          setQuoteForm({ ...quoteForm, contactPerson: e.target.value })
                        }
                      />
                    </div>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-muted-foreground mb-1">
                        Phone / WhatsApp *
                      </label>
                      <input
                        required
                        type="tel"
                        placeholder="+880 17XXXXXXXX"
                        className="field"
                        value={quoteForm.phone}
                        onChange={(e) =>
                          setQuoteForm({ ...quoteForm, phone: e.target.value })
                        }
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-muted-foreground mb-1">
                        Business Email
                      </label>
                      <input
                        type="email"
                        placeholder="procurement@company.com"
                        className="field"
                        value={quoteForm.email}
                        onChange={(e) =>
                          setQuoteForm({ ...quoteForm, email: e.target.value })
                        }
                      />
                    </div>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-muted-foreground mb-1">
                        Business Type
                      </label>
                      <select
                        className="field"
                        value={quoteForm.businessType}
                        onChange={(e) =>
                          setQuoteForm({ ...quoteForm, businessType: e.target.value })
                        }
                      >
                        <option value="Workshop">Workshop / Garage</option>
                        <option value="Service Center">Service Center Hub</option>
                        <option value="Dealer">Automotive Dealership</option>
                        <option value="Distributor">Wholesale Distributor</option>
                        <option value="Fleet">Commercial Fleet Operator</option>
                        <option value="EV Business">EV Workshop / Business</option>
                        <option value="Other">Other Automotive Entity</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-muted-foreground mb-1">
                        Workshop Location / City
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Dhaka, Chattogram, Bogura"
                        className="field"
                        value={quoteForm.location}
                        onChange={(e) =>
                          setQuoteForm({ ...quoteForm, location: e.target.value })
                        }
                      />
                    </div>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-muted-foreground mb-1">
                        Interested Category
                      </label>
                      <select
                        className="field"
                        value={quoteForm.category}
                        onChange={(e) =>
                          setQuoteForm({ ...quoteForm, category: e.target.value })
                        }
                      >
                        <option value="Garage Equipment">Garage Equipment & Machinery</option>
                        <option value="Spare Parts">Spare Parts & Consumables</option>
                        <option value="EV Equipment">EV Diagnostics & High-Voltage Tools</option>
                        <option value="Turnkey Setup">Turnkey Bay Planning & Setup</option>
                        <option value="Wholesale">Bulk Wholesale Supply</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-muted-foreground mb-1">
                        Estimated Quantity / Units
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. 2 Units / 50 Sets / Container"
                        className="field"
                        value={quoteForm.quantity}
                        onChange={(e) =>
                          setQuoteForm({ ...quoteForm, quantity: e.target.value })
                        }
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-muted-foreground mb-1">
                      Target Equipment or Parts Model(s)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Torq 2-Post Lift 4.0T, Tyre Changer TC-820, VDE EV Tool Kit"
                      className="field"
                      value={quoteForm.products}
                      onChange={(e) =>
                        setQuoteForm({ ...quoteForm, products: e.target.value })
                      }
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-muted-foreground mb-1">
                      Project Notes / Bay Dimensions / Requirements
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Describe your workshop bays, ceiling height, current electrical phase (single/three phase), or delivery timeline..."
                      className="field"
                      value={quoteForm.message}
                      onChange={(e) =>
                        setQuoteForm({ ...quoteForm, message: e.target.value })
                      }
                    />
                  </div>

                  <button
                    type="submit"
                    className="btn btn-primary h-12 w-full text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow"
                  >
                    <Send className="h-4 w-4" />
                    <span>Submit Commercial Quotation Request</span>
                  </button>
                  <p className="text-[11px] text-muted-foreground text-center">
                    Official quote with technical specifications returned within 24 working hours.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 11 — THINK NEXT: RESTRAINED BRAND STATEMENT SIGNATURE     */}
      {/* ======================================================== */}
      <section className="bg-ink py-16 lg:py-20 text-ink-foreground border-t border-ink-border">
        <div className="container-page text-center max-w-3xl">
          <p className="eyebrow">PAGE International Ltd.</p>
          <h2 className="display-giant mt-3 text-ink-foreground">
            THINK NEXT<span className="text-primary">.</span>
          </h2>
          <p className="mt-3 text-base text-ink-muted leading-relaxed max-w-xl mx-auto">
            The company behind the workshop. Equipping the automotive industry with
            heavy-duty machinery, precision spare parts, and dedicated workshop engineering.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              to="/shop"
              className="btn btn-primary h-11 px-7 text-xs font-bold uppercase"
            >
              Shop Automotive Products
            </Link>
            <a
              href="#request-quote"
              className="btn btn-ghost-light h-11 px-7 text-xs font-bold uppercase"
            >
              Request Commercial Quote
            </a>
            <Link
              to="/solutions"
              className="btn btn-outline border-ink-border text-ink-foreground hover:bg-ink-2 h-11 px-7 text-xs font-bold uppercase"
            >
              Explore B2B Solutions
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
