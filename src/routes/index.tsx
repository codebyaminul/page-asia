import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  ArrowUpRight,
  BatteryCharging,
  Bike,
  Building2,
  Car,
  CheckCircle2,
  ChevronRight,
  Cpu,
  FileSpreadsheet,
  Gauge,
  Layers,
  Phone,
  Send,
  ShieldCheck,
  Sparkles,
  Truck,
  Wrench,
  Zap,
} from "lucide-react";
import { useState } from "react";
import { VehicleFinder } from "@/components/site/VehicleFinder";
import {
  brands,
  images,
  products,
  taka,
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
          "PAGE International is a specialized B2B supplier and distributor of automotive garage equipment, spare parts, diagnostics, tools, and workshop solutions to service centers, workshops, dealers, fleets, and EV businesses.",
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

  // 4 Featured High-Impact Products
  const featuredEquipment = [
    products.find((p) => p.slug === "heavy-duty-2-post-lift-4t") || products[0],
    products.find((p) => p.slug === "pro-tyre-changer-assist-arm") || products[1],
    products.find((p) => p.slug === "digital-wheel-balancer-laser") || products[2],
    products.find((p) => p.slug === "rotary-screw-air-compressor-10hp") || products[3],
  ];

  return (
    <div className="bg-background text-foreground selection:bg-primary selection:text-white">
      {/* ======================================================== */}
      {/* 01 — HERO: ASYMMETRIC INDUSTRIAL COMPOSITION             */}
      {/* ======================================================== */}
      <section className="relative overflow-hidden bg-ink pt-28 text-ink-foreground lg:pt-36 border-b border-ink-border">
        {/* Subtle Workshop Background Texture */}
        <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
          <img
            src={images.heroWorkshop}
            alt=""
            fetchPriority="high"
            className="h-full w-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/95 to-ink/80" />
        </div>

        <div className="container-page relative z-10 pb-12 lg:pb-16 pt-4 lg:pt-8">
          <div className="grid gap-10 lg:grid-cols-[1.15fr_1fr] lg:items-center">
            {/* Left Column: Direct Commercial Positioning */}
            <div>
              <div className="inline-flex items-center gap-2 rounded bg-primary/20 border border-primary/40 px-3 py-1 text-xs font-bold uppercase tracking-wider text-primary">
                <ShieldCheck className="h-3.5 w-3.5 shrink-0" />
                <span>PAGE INTERNATIONAL · B2B AUTOMOTIVE EQUIPMENT & PARTS DISTRIBUTOR</span>
              </div>

              <h1 className="display-hero mt-5 text-ink-foreground max-w-2xl leading-[0.92]">
                AUTOMOTIVE EQUIPMENT. <br />
                PARTS. <br />
                <span className="text-primary">WORKSHOP SOLUTIONS.</span>
              </h1>

              <p className="mt-5 max-w-xl text-base sm:text-lg leading-relaxed text-ink-muted">
                Professional equipment, parts and workshop solutions for the businesses that keep vehicles moving.
              </p>

              {/* Main CTAs */}
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Link
                  to="/shop"
                  className="btn btn-primary h-12 px-8 text-xs sm:text-sm font-bold uppercase tracking-wider shadow-lg shadow-primary/20"
                >
                  Explore Products <ArrowRight className="h-4 w-4" />
                </Link>
                <a
                  href="#request-quote"
                  className="btn btn-outline border-ink-border text-ink-foreground hover:bg-ink-2 h-12 px-7 text-xs sm:text-sm font-bold uppercase tracking-wider"
                >
                  <FileSpreadsheet className="h-4 w-4 text-primary" /> Request a Quote
                </a>
              </div>

              {/* B2B Proof Markers */}
              <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-4 border-t border-ink-border/70 pt-6 text-xs">
                <div>
                  <span className="font-display text-2xl font-bold text-ink-foreground tracking-tight">
                    10,000+
                  </span>
                  <p className="text-ink-muted font-medium mt-0.5">B2B Spares & SKUs</p>
                </div>
                <div>
                  <span className="font-display text-2xl font-bold text-ink-foreground tracking-tight">
                    4-MOBILITY
                  </span>
                  <p className="text-ink-muted font-medium mt-0.5">4W · 2W · 3W · EV</p>
                </div>
                <div>
                  <span className="font-display text-2xl font-bold text-ink-foreground tracking-tight">
                    TURNKEY
                  </span>
                  <p className="text-ink-muted font-medium mt-0.5">Bay Installation</p>
                </div>
                <div>
                  <span className="font-display text-2xl font-bold text-ink-foreground tracking-tight">
                    NATIONWIDE
                  </span>
                  <p className="text-ink-muted font-medium mt-0.5">Direct Distribution</p>
                </div>
              </div>
            </div>

            {/* Right Column: Dominant High-Quality Workshop / Equipment Visual */}
            <div className="relative">
              <div className="relative overflow-hidden rounded-lg border border-ink-border/80 bg-ink-2 shadow-2xl">
                <div className="aspect-[16/11] w-full overflow-hidden">
                  <img
                    src={images.heroWorkshop}
                    alt="Commercial automotive workshop facility equipped with heavy-duty vehicle lifts"
                    className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                  />
                </div>
                {/* Floating Technical Badge Overlay */}
                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/95 via-black/80 to-transparent p-5">
                  <div className="flex items-center justify-between border-t border-white/15 pt-3">
                    <div>
                      <p className="text-[11px] font-bold uppercase tracking-widest text-primary">
                        Commercial Workshop Infrastructure
                      </p>
                      <p className="font-display text-lg font-bold text-white tracking-wide mt-0.5">
                        Turnkey Hydraulic Lifting Bays & Pneumatic Distribution
                      </p>
                    </div>
                    <span className="hidden sm:inline-flex rounded bg-primary/20 border border-primary/50 text-primary px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider">
                      B2B Supply Ready
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Subtle Trust & Value Marker Strip */}
        <div className="border-t border-ink-border bg-black/60">
          <div className="container-page py-3.5">
            <div className="grid grid-cols-2 md:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-ink-border text-center text-xs font-bold uppercase tracking-widest text-ink-muted">
              <div className="py-1 px-3 flex items-center justify-center gap-2 hover:text-ink-foreground transition-colors">
                <Wrench className="h-3.5 w-3.5 text-primary" />
                <span>GARAGE EQUIPMENT</span>
              </div>
              <div className="py-1 px-3 flex items-center justify-center gap-2 hover:text-ink-foreground transition-colors">
                <Layers className="h-3.5 w-3.5 text-primary" />
                <span>AUTOMOTIVE PARTS</span>
              </div>
              <div className="py-1 px-3 flex items-center justify-center gap-2 hover:text-ink-foreground transition-colors">
                <Zap className="h-3.5 w-3.5 text-primary" />
                <span>EV SOLUTIONS</span>
              </div>
              <div className="py-1 px-3 flex items-center justify-center gap-2 hover:text-ink-foreground transition-colors">
                <Building2 className="h-3.5 w-3.5 text-primary" />
                <span>WORKSHOP SYSTEMS</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 02 — PRODUCT ECOSYSTEM: WHAT WE SUPPLY                   */}
      {/* ======================================================== */}
      <section className="py-20 lg:py-28 bg-background border-b border-border">
        <div className="container-page">
          <div className="max-w-3xl mb-12">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-primary mb-2">
              <Layers className="h-3.5 w-3.5" />
              <span>Comprehensive Multi-Mobility Supply</span>
            </div>
            <h2 className="display-giant text-foreground tracking-tight">
              WHAT WE SUPPLY
            </h2>
            <p className="mt-3 text-base text-muted-foreground leading-relaxed">
              Direct distributor supply channels engineered for automotive repair garages,
              motorcycle workshops, commercial 3-wheelers, and electric mobility platforms.
            </p>
          </div>

          {/* Large Asymmetric Visual Category System */}
          <div className="grid gap-6 lg:grid-cols-12">
            {/* Panel 1: Four-Wheeler (Large, Dominant Panel - 7 Cols) */}
            <div className="group relative overflow-hidden rounded border border-border bg-ink text-white lg:col-span-7 flex flex-col justify-end min-h-[420px] lg:min-h-[480px]">
              <img
                src={images.heroWorkshop}
                alt="4-Wheeler vehicle lifted on electro-hydraulic lift in commercial workshop"
                className="absolute inset-0 h-full w-full object-cover opacity-50 transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent" />
              
              <div className="relative z-10 p-6 sm:p-10">
                <div className="flex items-center gap-2">
                  <span className="rounded bg-primary px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-widest text-white">
                    Primary Mobility
                  </span>
                  <span className="text-xs font-mono text-zinc-300">
                    Cars · SUVs · LCVs · Fleet Depots
                  </span>
                </div>
                <h3 className="font-display text-4xl sm:text-5xl font-bold uppercase text-white mt-3">
                  FOUR-WHEELER PLATFORMS
                </h3>
                <p className="mt-2 text-sm text-zinc-300 max-w-xl leading-relaxed">
                  Heavy-duty 2-post and 4-post lifts, ceramic brake friction, diagnostic tablets,
                  suspension components, and fluid exchange machinery for passenger cars and light commercial fleets.
                </p>
                <div className="mt-6 flex flex-wrap items-center gap-3">
                  <Link
                    to="/shop"
                    search={{ mobility: "4-Wheeler" }}
                    className="btn btn-primary h-10 px-5 text-xs font-bold uppercase tracking-wider"
                  >
                    Explore 4W Catalogue <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                  <Link
                    to="/vehicles"
                    className="btn btn-ghost-light h-10 px-4 text-xs font-bold uppercase tracking-wider"
                  >
                    4W Fitment Directory
                  </Link>
                </div>
              </div>
            </div>

            {/* Panels 2 & 3: Two-Wheeler & Three-Wheeler Paired (5 Cols) */}
            <div className="grid gap-6 lg:col-span-5 sm:grid-cols-2 lg:grid-cols-1">
              {/* 2-Wheeler */}
              <div className="group relative overflow-hidden rounded border border-border bg-ink text-white flex flex-col justify-end min-h-[220px]">
                <img
                  src={images.motoLift}
                  alt="Motorcycle workshop scissor lift table"
                  className="absolute inset-0 h-full w-full object-cover opacity-40 transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/75 to-transparent" />
                <div className="relative z-10 p-5 sm:p-6">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-primary">
                    Bikes & Scooters
                  </span>
                  <h3 className="font-display text-2xl font-bold uppercase text-white mt-0.5">
                    TWO-WHEELER WORKSHOPS
                  </h3>
                  <p className="mt-1 text-xs text-zinc-300 line-clamp-2">
                    Pneumatic scissor lift tables, motorcycle tyre changers, wheel vises, and multi-brand tuning tools.
                  </p>
                  <Link
                    to="/shop"
                    search={{ mobility: "2-Wheeler" }}
                    className="mt-3 inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-primary hover:text-white transition-colors"
                  >
                    <span>Equip 2W Bays</span>
                    <ArrowRight className="h-3 w-3" />
                  </Link>
                </div>
              </div>

              {/* 3-Wheeler */}
              <div className="group relative overflow-hidden rounded border border-border bg-ink text-white flex flex-col justify-end min-h-[220px]">
                <img
                  src={images.commercial3wHub}
                  alt="Commercial 3-wheeler service bay and lift"
                  className="absolute inset-0 h-full w-full object-cover opacity-40 transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/75 to-transparent" />
                <div className="relative z-10 p-5 sm:p-6">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-primary">
                    Commercial 3W & Cargo
                  </span>
                  <h3 className="font-display text-2xl font-bold uppercase text-white mt-0.5">
                    THREE-WHEELER TOOLING
                  </h3>
                  <p className="mt-1 text-xs text-zinc-300 line-clamp-2">
                    Commercial 3W hydraulic lift platforms, CNG auto-rickshaw tooling, and high-wear consumable reserves.
                  </p>
                  <Link
                    to="/shop"
                    search={{ mobility: "3-Wheeler" }}
                    className="mt-3 inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-primary hover:text-white transition-colors"
                  >
                    <span>Equip 3W Bays</span>
                    <ArrowRight className="h-3 w-3" />
                  </Link>
                </div>
              </div>
            </div>

            {/* Panel 4: Electric Mobility (EV) - Large Horizontal Panel Across All 12 Cols */}
            <div className="group relative overflow-hidden rounded border border-border bg-ink text-white lg:col-span-12 flex flex-col justify-end min-h-[300px]">
              <img
                src={images.evWorkshopBay}
                alt="Modern electric vehicle workshop facility with 1000V insulated tooling and battery testing equipment"
                className="absolute inset-0 h-full w-full object-cover opacity-45 transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/75 to-black/20" />
              
              <div className="relative z-10 p-6 sm:p-10 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
                <div className="max-w-2xl">
                  <div className="flex items-center gap-2">
                    <span className="rounded bg-amber-500/20 border border-amber-500/50 text-amber-400 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-widest">
                      Strategic Growth Category
                    </span>
                    <span className="text-xs font-mono text-zinc-300">
                      1000V VDE Certified · 2W / 3W / 4W EV
                    </span>
                  </div>
                  <h3 className="font-display text-3xl sm:text-4xl font-bold uppercase text-white mt-2">
                    ELECTRIC MOBILITY (EV) WORKSHOP ECOSYSTEM
                  </h3>
                  <p className="mt-2 text-sm text-zinc-300 leading-relaxed">
                    Complete transition packages for high-voltage servicing: 1000V insulated hand tools,
                    traction battery pack diagnostic analyzers, cell balancers, charging stations, and safety isolation gear.
                  </p>
                </div>
                <div className="shrink-0 flex flex-wrap gap-3">
                  <Link
                    to="/shop"
                    search={{ mobility: "EV" }}
                    className="btn btn-primary h-11 px-6 text-xs font-bold uppercase tracking-wider shadow-md"
                  >
                    Explore EV Equipment <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                  <Link
                    to="/solutions"
                    className="btn btn-ghost-light h-11 px-5 text-xs font-bold uppercase tracking-wider"
                  >
                    EV Workshop Transition Plan
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 03 — SHOP BY CATEGORY: CLEAN NAVIGATION SYSTEM           */}
      {/* ======================================================== */}
      <section className="py-20 lg:py-24 bg-zinc-50 border-b border-border">
        <div className="container-page">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
            <div>
              <p className="eyebrow">Direct Commercial Catalogues</p>
              <h2 className="display-lg mt-1 text-foreground">
                SHOP BY PRODUCT CATEGORY
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Source heavy garage machinery, diagnostic computers, lifting systems, and OEM replacement parts.
              </p>
            </div>
            <Link
              to="/shop"
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary hover:text-foreground transition-colors group"
            >
              <span>View All Products</span>
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          {/* 8 Visual Category Tiles with Strong Images */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {[
              {
                name: "Garage Equipment",
                desc: "Lifts, tyre changers, wheel balancers",
                img: images.lift,
                link: "/shop?cat=Garage+Equipment",
              },
              {
                name: "Diagnostic Equipment",
                desc: "OE-level scan tablets, code readers",
                img: images.scanner,
                link: "/shop?cat=Diagnostic+Equipment",
              },
              {
                name: "Tyre & Wheel Service",
                desc: "Automatic changers, dynamic balancers",
                img: images.tyreChanger,
                link: "/shop?cat=Tyre+%26+Wheel",
              },
              {
                name: "Lifting Equipment",
                desc: "2-Post, 4-Post, scissor & moto lifts",
                img: images.motoLift,
                link: "/shop?cat=Lifting+Equipment",
              },
              {
                name: "Workshop Air Systems",
                desc: "Rotary screw compressors & dryers",
                img: images.compressor,
                link: "/shop?cat=Garage+Equipment",
              },
              {
                name: "Brakes & Friction",
                desc: "Ceramic pads, vented rotors, fluid",
                img: images.brakepads,
                link: "/shop?cat=Brakes",
              },
              {
                name: "Commercial Batteries",
                desc: "Heavy-duty AGM, EFB & fleet batteries",
                img: images.battery,
                link: "/shop?cat=Batteries",
              },
              {
                name: "EV High-Voltage Tools",
                desc: "1000V VDE sets, battery analyzers",
                img: images.evTools,
                link: "/shop?mobility=EV",
              },
            ].map((cat) => (
              <Link
                key={cat.name}
                to={cat.link}
                className="group relative flex flex-col justify-between rounded border border-border bg-card p-4 sm:p-5 transition-all duration-200 hover:border-foreground hover:shadow-lg"
              >
                <div>
                  <div className="flex items-center justify-between text-muted-foreground group-hover:text-primary">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider">
                      PAGE Supply
                    </span>
                    <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>

                  <div className="my-3 aspect-[4/3] overflow-hidden rounded bg-muted/40 p-2">
                    <img
                      src={cat.img}
                      alt={cat.name}
                      loading="lazy"
                      className="h-full w-full object-contain mix-blend-multiply transition-transform duration-300 group-hover:scale-108"
                    />
                  </div>
                </div>

                <div className="pt-2 border-t border-border/60">
                  <h3 className="font-display text-xl font-bold uppercase text-foreground group-hover:text-primary transition-colors">
                    {cat.name}
                  </h3>
                  <p className="mt-0.5 text-xs text-muted-foreground line-clamp-1">
                    {cat.desc}
                  </p>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link
              to="/shop"
              className="btn btn-dark h-11 px-8 text-xs font-bold uppercase tracking-wider"
            >
              View Full Product Catalogue →
            </Link>
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 04 — FEATURED EQUIPMENT: 4 STRONG COMMODITIES            */}
      {/* ======================================================== */}
      <section className="py-20 lg:py-28 bg-background border-b border-border">
        <div className="container-page">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
            <div>
              <p className="eyebrow">Industrial Grade Machinery</p>
              <h2 className="display-lg mt-1 text-foreground">
                FEATURED EQUIPMENT & MACHINERY
              </h2>
              <p className="mt-1 text-sm text-muted-foreground max-w-2xl">
                Heavy-duty workshop installations complete with manufacturer warranties,
                chemical anchoring specifications, and commercial quotation terms.
              </p>
            </div>
            <Link
              to="/shop"
              search={{ cat: "Garage Equipment" }}
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary hover:text-foreground transition-colors group"
            >
              <span>Browse All Equipment</span>
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          {/* 4 Strong Products: 4-Column Grid, Large Images, Breathing Room */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredEquipment.map((p) => {
              const keySpec = p.specs && p.specs.length > 0 ? p.specs[0] : null;
              return (
                <article
                  key={p.slug}
                  className="group flex flex-col rounded border border-border bg-card p-5 transition-all duration-200 hover:border-foreground hover:shadow-xl"
                >
                  {/* Category & Brand */}
                  <div className="flex items-center justify-between text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                    <span className="text-primary">{p.brand}</span>
                    <span className="truncate">{p.category}</span>
                  </div>

                  {/* Product Image: Large & Dominant */}
                  <Link
                    to="/shop/$slug"
                    params={{ slug: p.slug }}
                    className="relative my-4 aspect-square overflow-hidden rounded bg-zinc-100 p-4 block"
                  >
                    <img
                      src={p.image}
                      alt={p.name}
                      loading="lazy"
                      className="h-full w-full object-contain mix-blend-multiply transition-transform duration-300 group-hover:scale-106"
                    />
                    <span className="absolute left-2.5 top-2.5 rounded bg-ink px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-white">
                      Commercial Spec
                    </span>
                  </Link>

                  {/* Product Name */}
                  <Link
                    to="/shop/$slug"
                    params={{ slug: p.slug }}
                    className="font-display text-2xl font-bold uppercase text-foreground leading-tight group-hover:text-primary transition-colors line-clamp-2"
                  >
                    {p.name}
                  </Link>

                  {/* Technical Spec Row */}
                  {keySpec && (
                    <div className="mt-3 rounded bg-zinc-100 px-2.5 py-1.5 text-xs text-foreground font-mono">
                      <span className="text-muted-foreground">{keySpec[0]}: </span>
                      <span className="font-bold">{keySpec[1]}</span>
                    </div>
                  )}

                  {/* Pricing or Quote Notice */}
                  <div className="mt-auto pt-4 border-t border-border mt-4">
                    <div className="flex items-baseline justify-between">
                      <span className="text-xs text-muted-foreground font-medium">Commercial Price</span>
                      <span className="font-display text-2xl font-bold text-foreground">
                        {taka(p.price)}
                      </span>
                    </div>

                    <div className="mt-3 flex gap-2">
                      <a
                        href="#request-quote"
                        className="btn btn-primary h-10 flex-1 text-xs font-bold uppercase tracking-wider"
                      >
                        Request Quote
                      </a>
                      <Link
                        to="/shop/$slug"
                        params={{ slug: p.slug }}
                        className="btn btn-outline h-10 px-3 text-xs font-bold uppercase"
                      >
                        Specs
                      </Link>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 05 — BIG INDUSTRIAL VISUAL: MEMORABLE VISUAL MOMENT      */}
      {/* ======================================================== */}
      <section className="relative overflow-hidden bg-ink py-28 lg:py-36 text-white border-y border-ink-border">
        {/* Full-Width Real Workshop Photography */}
        <div className="absolute inset-0 z-0">
          <img
            src={images.heroWorkshop}
            alt="Real commercial automotive workshop interior with 2-post lifts and diagnostic bays"
            className="h-full w-full object-cover object-center brightness-75 contrast-125"
          />
          <div className="absolute inset-0 bg-black/65 backdrop-blur-[1px]" />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent" />
        </div>

        <div className="container-page relative z-10">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded bg-primary/20 border border-primary/40 px-3 py-1 text-xs font-bold uppercase tracking-wider text-primary mb-4">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Industrial Turnkey Infrastructure</span>
            </div>
            
            <h2 className="display-hero text-white leading-[0.92]">
              EQUIP YOUR WORKSHOP <br />
              <span className="text-primary">FOR WHAT&apos;S NEXT.</span>
            </h2>

            <p className="mt-5 text-base sm:text-lg text-zinc-300 leading-relaxed">
              Complete workshop infrastructure from turnkey hydraulic lifting bays and pneumatic distribution
              to computerized diagnostics and certified technician training.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                to="/shop"
                search={{ cat: "Garage Equipment" }}
                className="btn btn-primary h-12 px-8 text-xs sm:text-sm font-bold uppercase tracking-wider shadow-xl shadow-primary/25"
              >
                Explore Garage Equipment <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/solutions"
                className="btn btn-outline border-white/30 text-white hover:bg-white hover:text-black h-12 px-7 text-xs sm:text-sm font-bold uppercase tracking-wider"
              >
                Workshop Setup Solutions
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 06 — GARAGE EQUIPMENT SHOWCASE: ASYMMETRIC LIST COMP     */}
      {/* ======================================================== */}
      <section className="py-20 lg:py-28 bg-background border-b border-border">
        <div className="container-page">
          <div className="grid gap-12 lg:grid-cols-[1.1fr_1.3fr] lg:items-center">
            {/* Left: Large High-Resolution Image of Vehicle Lift Machinery */}
            <div className="relative overflow-hidden rounded border border-border bg-zinc-900 shadow-xl">
              <div className="aspect-[4/3] w-full overflow-hidden p-6 bg-zinc-950 flex items-center justify-center">
                <img
                  src={images.lift}
                  alt="Torq 4.0T Heavy-Duty Electro-Hydraulic Clear Floor 2-Post Lift"
                  className="h-full w-full object-contain"
                />
              </div>
              <div className="border-t border-zinc-800 bg-zinc-900/90 p-5 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-primary">
                      Torq Workshop Machinery
                    </span>
                    <h4 className="font-display text-xl font-bold uppercase text-white mt-0.5">
                      Heavy-Duty 2-Post Lift 4.0T
                    </h4>
                  </div>
                  <span className="font-display text-2xl font-bold text-white">
                    {taka(285000)}
                  </span>
                </div>
                <div className="mt-2 flex flex-wrap gap-2 text-[11px] font-mono text-zinc-400">
                  <span className="bg-zinc-800 px-2 py-0.5 rounded">Cap: 4,000 kg</span>
                  <span className="bg-zinc-800 px-2 py-0.5 rounded">380V 3-Phase</span>
                  <span className="bg-zinc-800 px-2 py-0.5 rounded">CE Certified</span>
                </div>
              </div>
            </div>

            {/* Right: Clean, Sophisticated Industrial List */}
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-primary mb-2">
                <Wrench className="h-3.5 w-3.5" />
                <span>Heavy Commercial Machinery</span>
              </div>
              <h2 className="display-giant text-foreground tracking-tight">
                GARAGE EQUIPMENT
              </h2>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                Industrial-grade machinery engineered for continuous commercial duty in
                automotive service hubs, multi-bay repair facilities, and tyre centers.
              </p>

              {/* Sophisticated List with Technical Typography */}
              <div className="mt-8 divide-y divide-border border-y border-border">
                {[
                  {
                    num: "01",
                    title: "Vehicle Lifts",
                    desc: "2-Post, 4-Post, In-Ground Scissor & Heavy Commercial Fleet Columns.",
                    link: "/shop?cat=Garage+Equipment",
                  },
                  {
                    num: "02",
                    title: "Tyre Changers",
                    desc: "Automatic & heavy leverless machines with dual pneumatic assist arms.",
                    link: "/shop?cat=Tyre+%26+Wheel",
                  },
                  {
                    num: "03",
                    title: "Wheel Balancers",
                    desc: "Digital laser 3D sonar and dynamic microprocessor balancing stations.",
                    link: "/shop?cat=Tyre+%26+Wheel",
                  },
                  {
                    num: "04",
                    title: "Diagnostics & Scanners",
                    desc: "Multi-brand OEM diagnostic tablets, ECU coding & bi-directional testing.",
                    link: "/shop?cat=Diagnostic+Equipment",
                  },
                  {
                    num: "05",
                    title: "Brake Lathes & Testers",
                    desc: "Disc and drum machining lathes, roller brake testers, and bleeders.",
                    link: "/shop?cat=Garage+Equipment",
                  },
                  {
                    num: "06",
                    title: "Industrial Compressors",
                    desc: "Silent rotary screw air compressors with integrated refrigerated dryers.",
                    link: "/shop?cat=Garage+Equipment",
                  },
                ].map((item) => (
                  <Link
                    key={item.num}
                    to={item.link}
                    className="group flex items-start gap-4 py-3.5 transition-colors hover:text-primary"
                  >
                    <span className="font-mono text-xs font-bold text-primary mt-1">
                      {item.num}
                    </span>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className="font-display text-xl font-bold uppercase text-foreground group-hover:text-primary transition-colors">
                          {item.title}
                        </h3>
                        <ChevronRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-primary" />
                      </div>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {item.desc}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>

              <div className="mt-8 flex items-center gap-4">
                <Link
                  to="/shop"
                  search={{ cat: "Garage Equipment" }}
                  className="btn btn-primary h-11 px-7 text-xs font-bold uppercase tracking-wider"
                >
                  Explore Garage Equipment →
                </Link>
                <a
                  href="#request-quote"
                  className="btn btn-outline h-11 px-6 text-xs font-bold uppercase tracking-wider"
                >
                  Request Machinery Quote
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 07 — EV: STRATEGIC GROWTH CATEGORY                       */}
      {/* ======================================================== */}
      <section className="py-20 lg:py-28 bg-zinc-950 text-white border-b border-zinc-800">
        <div className="container-page">
          <div className="max-w-3xl mb-12">
            <div className="inline-flex items-center gap-2 rounded bg-amber-500/20 border border-amber-500/50 px-3 py-1 text-xs font-bold uppercase tracking-wider text-amber-400 mb-3">
              <Zap className="h-3.5 w-3.5" />
              <span>Next-Gen Mobility Transition</span>
            </div>
            <h2 className="display-giant text-white tracking-tight">
              READY FOR THE NEXT GENERATION OF MOBILITY.
            </h2>
            <p className="mt-3 text-base text-zinc-300 leading-relaxed">
              Equip your service bays for electric vehicles. PAGE supplies certified 1000V
              insulated safety tools, battery module analyzers, and specialized EV diagnostic tablets.
            </p>
          </div>

          {/* 3 Mobility Tiers Strip */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
            {[
              {
                tier: "2-WHEELER EV",
                desc: "Electric bikes, scooters & swap station repair tables.",
                types: "48V–72V BMS Diagnostics · Scissor Lifts · Swap Tooling",
                link: "/shop?mobility=2-Wheeler",
              },
              {
                tier: "3-WHEELER EV",
                desc: "Commercial electric cargo & passenger e-rickshaws.",
                types: "Heavy 3W Ramps · Fast Chargers · Controller Rigs",
                link: "/shop?mobility=3-Wheeler",
              },
              {
                tier: "4-WHEELER EV",
                desc: "Passenger electric cars, commercial vans & hybrids.",
                types: "1000V VDE Tools · Battery Pack Tables · OBD2 Scanners",
                link: "/shop?mobility=EV",
              },
            ].map((t) => (
              <div
                key={t.tier}
                className="rounded border border-zinc-800 bg-zinc-900/80 p-5 flex flex-col justify-between"
              >
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-primary">
                    Mobility Platform
                  </span>
                  <h3 className="font-display text-2xl font-bold uppercase text-white mt-1">
                    {t.tier}
                  </h3>
                  <p className="mt-1 text-xs text-zinc-400">{t.desc}</p>
                  <p className="mt-3 text-[11px] font-mono text-zinc-300 border-t border-zinc-800 pt-2">
                    {t.types}
                  </p>
                </div>
                <Link
                  to={t.link}
                  className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold uppercase text-primary hover:text-white transition-colors"
                >
                  <span>Equip Bays</span>
                  <ArrowRight className="h-3 w-3" />
                </Link>
              </div>
            ))}
          </div>

          {/* 6 Core EV Equipment Categories with Real Imagery */}
          <div className="grid gap-6 lg:grid-cols-12 items-center">
            {/* Left: 6 Capabilities List */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                {
                  title: "Battery Equipment",
                  desc: "Module state-of-health analyzers, automated cell equalizers, and hydraulic pack drop tables.",
                },
                {
                  title: "EV Diagnostics",
                  desc: "High-voltage OBD2 tablets, insulation resistance meters, and live BMS CAN logging.",
                },
                {
                  title: "Charging Equipment",
                  desc: "Workshop DC fast charging stations, mobile chargers, and high-amperage test plugs.",
                },
                {
                  title: "Electrical Testing",
                  desc: "Milli-ohmmeters, HV discharge resistors, oscilloscope diagnostic kits.",
                },
                {
                  title: "Workshop Safety",
                  desc: "Class 0 insulated barriers, high-voltage rescue hooks, arc-flash face shields.",
                },
                {
                  title: "EV Hand Tools",
                  desc: "IEC 60900 / VDE certified 1000V insulated torque wrenches, ratchets, and socket sets.",
                },
              ].map((cap) => (
                <div
                  key={cap.title}
                  className="rounded border border-zinc-800 bg-zinc-900/60 p-4"
                >
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary shrink-0" />
                    <h4 className="font-display text-lg font-bold uppercase text-white">
                      {cap.title}
                    </h4>
                  </div>
                  <p className="mt-1 text-xs text-zinc-400 leading-relaxed">
                    {cap.desc}
                  </p>
                </div>
              ))}
            </div>

            {/* Right: High-Impact EV Product Photo */}
            <div className="lg:col-span-5">
              <div className="overflow-hidden rounded border border-zinc-800 bg-zinc-900 p-6 text-center">
                <span className="text-[10px] font-bold uppercase tracking-widest text-primary block text-left">
                  IEC 60900 Certified Tooling
                </span>
                <div className="my-4 aspect-[4/3] overflow-hidden rounded bg-black/40 p-3">
                  <img
                    src={images.evTools}
                    alt="1000V VDE Insulated EV Safety Tool Kit 42-Piece"
                    className="h-full w-full object-contain"
                  />
                </div>
                <h4 className="font-display text-2xl font-bold uppercase text-white">
                  1000V VDE Insulated EV Tool Kit
                </h4>
                <p className="text-xs text-zinc-400 mt-1">
                  42-Piece master insulated workshop set in heavy-duty IP67 organizer.
                </p>
                <div className="mt-4 flex items-center justify-center gap-3">
                  <Link
                    to="/shop"
                    search={{ mobility: "EV" }}
                    className="btn btn-primary h-10 px-6 text-xs font-bold uppercase"
                  >
                    Explore EV Tools
                  </Link>
                  <a
                    href="#request-quote"
                    className="btn btn-ghost-light h-10 px-5 text-xs font-bold uppercase"
                  >
                    Quote EV Bay
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 08 — WHO WE EQUIP: EDITORIAL POSITIONING                 */}
      {/* ======================================================== */}
      <section className="py-20 lg:py-28 bg-background border-b border-border">
        <div className="container-page">
          <div className="max-w-3xl mb-12">
            <p className="eyebrow">Strategic Market Positioning</p>
            <h2 className="display-giant text-foreground tracking-tight">
              BUILT FOR THE BUSINESSES THAT KEEP VEHICLES MOVING.
            </h2>
            <p className="mt-3 text-base text-muted-foreground leading-relaxed">
              PAGE International does not service consumer vehicles. We equip and supply the
              commercial enterprises that build, service, maintain, and inspect them.
            </p>
          </div>

          {/* Editorial Numbered List (NOT generic cards!) */}
          <div className="divide-y divide-border border-y border-border">
            {[
              {
                num: "01",
                title: "WORKSHOPS",
                tag: "Independent Multi-Brand Garages",
                desc: "Independent multi-brand repair garages requiring heavy-duty lifts, pneumatic tools, and fast daily spare parts supply.",
                supplies: "2-Post Lifts · Tyre Changers · Brake Friction · Workshop Hand Tools",
              },
              {
                num: "02",
                title: "SERVICE CENTERS",
                tag: "High-Throughput Authorized Hubs",
                desc: "High-throughput franchised and authorized multi-bay service centers needing heavy machinery, fluid exchanges, and warranty backing.",
                supplies: "Multi-Bay Lifts · Computerized Balancers · AC Stations · Air Lines",
              },
              {
                num: "03",
                title: "DEALERS",
                tag: "OEM Dealership Service Networks",
                desc: "OEM dealership service departments demanding certified diagnostic tablets, calibration rigs, and factory-spec precision tooling.",
                supplies: "OE Diagnostic Tablets · ADAS Rigs · Battery Registration · Lifts",
              },
              {
                num: "04",
                title: "DISTRIBUTORS",
                tag: "Regional Wholesalers & Retail Stockists",
                desc: "Regional automotive wholesalers and spare parts stockists ordering container and pallet-level wholesale volumes.",
                supplies: "Container Volume Spares · Wholesale Battery Supply · Filter Packs",
              },
              {
                num: "05",
                title: "FLEETS",
                tag: "Commercial Transport & Bus Depots",
                desc: "Commercial transport, logistics fleets, bus depots, and municipal vehicle maintenance hubs requiring high-uptime spares.",
                supplies: "Heavy Fleet Column Lifts · Heavy-Duty Brake Sets · High-Volume Air",
              },
              {
                num: "06",
                title: "EV BUSINESSES",
                tag: "Electric Mobility Specialists & Retrofitters",
                desc: "Specialized electric vehicle retrofitters, high-voltage battery pack service centers, and modern EV startups.",
                supplies: "1000V Insulated Tools · Battery Analyzers · EV Safety Barriers",
              },
            ].map((item) => (
              <div
                key={item.num}
                className="group py-6 sm:py-8 grid gap-4 lg:grid-cols-[100px_1fr_1.5fr] lg:items-baseline transition-colors hover:bg-zinc-50/50"
              >
                <div className="font-mono text-xl sm:text-2xl font-bold text-primary">
                  {item.num}
                </div>
                <div>
                  <h3 className="font-display text-3xl font-bold uppercase text-foreground">
                    {item.title}
                  </h3>
                  <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground block mt-0.5">
                    {item.tag}
                  </span>
                </div>
                <div>
                  <p className="text-sm text-foreground/80 leading-relaxed">
                    {item.desc}
                  </p>
                  <p className="mt-2 text-xs font-mono text-muted-foreground">
                    <span className="font-bold text-foreground">Equipped with: </span>
                    {item.supplies}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 09 — PRODUCT DISCOVERY: VEHICLE & FITMENT FINDER         */}
      {/* ======================================================== */}
      <section className="py-20 lg:py-24 bg-zinc-100 border-b border-border">
        <div className="container-page">
          <div className="max-w-2xl mb-8">
            <p className="eyebrow">Product Compatibility & Fitment</p>
            <h2 className="display-lg mt-1 text-foreground">
              FIND THE RIGHT PRODUCT.
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Select 4-Wheeler, 2-Wheeler, 3-Wheeler, or EV to quickly locate
              compatible replacement parts, lubricants, filters, and tooling for your platform.
            </p>
          </div>

          <VehicleFinder dark={false} />
        </div>
      </section>

      {/* ======================================================== */}
      {/* 10 — BRANDS: CLEAN INDUSTRIAL STRIP                      */}
      {/* ======================================================== */}
      <section id="brands" className="py-14 bg-background border-b border-border scroll-mt-20">
        <div className="container-page">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">
              Authorized Partner Brands & Components
            </p>
            <span className="text-[11px] font-mono text-muted-foreground">
              Direct B2B Distribution Provenance
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3 text-center">
            {brands.slice(0, 8).map((b) => (
              <div
                key={b}
                className="rounded border border-border/70 bg-card py-3 px-2 font-display text-lg font-bold uppercase tracking-wider text-muted-foreground hover:text-primary hover:border-primary/40 transition-colors"
              >
                {b}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 11 — B2B QUOTE: SPLIT-SCREEN COMPOSITION                 */}
      {/* ======================================================== */}
      <section
        id="request-quote"
        className="py-20 lg:py-28 bg-zinc-50 border-b border-border scroll-mt-20"
      >
        <div className="container-page">
          <div className="grid gap-12 lg:grid-cols-[1fr_1.3fr] lg:items-start">
            {/* Left Column: Direct Commercial Terms */}
            <div>
              <div className="inline-flex items-center gap-2 rounded bg-primary/10 border border-primary/30 px-3 py-1 text-xs font-bold uppercase tracking-wider text-primary">
                <FileSpreadsheet className="h-3.5 w-3.5" />
                <span>Commercial Inquiry Desk</span>
              </div>

              <h2 className="display-giant mt-3 text-foreground leading-[0.95]">
                NEED EQUIPMENT FOR YOUR BUSINESS?
              </h2>

              <p className="mt-4 text-base text-muted-foreground leading-relaxed">
                Direct B2B commercial quotation desk for workshop machinery, bulk spare parts supplies,
                turnkey workshop setup projects, and fleet maintenance contracts.
              </p>

              {/* Concrete Examples */}
              <div className="mt-8 space-y-4">
                {[
                  {
                    title: "Workshop Setup",
                    desc: "Full bay planning, 2-post & scissor lifts, air compressors, and electrical load.",
                  },
                  {
                    title: "Bulk Equipment",
                    desc: "Multi-unit machinery orders for automotive chains, franchised hubs, and tyre bays.",
                  },
                  {
                    title: "EV Workshop Transition",
                    desc: "1000V high-voltage tool sets, battery testing benches, and technician safety gear.",
                  },
                  {
                    title: "Scheduled Parts Supply",
                    desc: "Dedicated monthly supply contracts for ceramic brakes, filters, fluids, and batteries.",
                  },
                  {
                    title: "Regional Distribution",
                    desc: "Wholesale container and pallet-level distribution for regional spare parts stockists.",
                  },
                ].map((item) => (
                  <div key={item.title} className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-wider text-foreground">
                        {item.title}
                      </h4>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Direct Hotline Box */}
              <div className="mt-8 rounded border border-border bg-card p-5">
                <span className="text-[11px] font-mono uppercase tracking-wider text-primary font-bold block">
                  Direct Commercial Desk Hotline
                </span>
                <p className="text-lg font-bold text-foreground mt-1">
                  +880 9612-PAGE-INTL · b2b@page-intl.com
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Tejgaon Industrial Area, Dhaka · Saturday–Thursday 09:00–19:00
                </p>
              </div>
            </div>

            {/* Right Column: Compact Professional Form */}
            <div className="rounded border border-border bg-card p-6 sm:p-8 shadow-sm">
              {quoteSubmitted ? (
                <div className="py-12 text-center">
                  <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-emerald-500/10 text-emerald-600 mb-4">
                    <CheckCircle2 className="h-7 w-7" />
                  </div>
                  <h3 className="font-display text-3xl uppercase text-foreground">
                    Quote Request Received
                  </h3>
                  <p className="text-sm text-muted-foreground max-w-md mx-auto mt-2 leading-relaxed">
                    Thank you, {quoteForm.contactPerson || quoteForm.businessName}. Our B2B
                    equipment and parts desk will review your specifications and issue
                    a formal commercial quotation within 24 working hours.
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
                    <h3 className="font-display text-2xl uppercase text-foreground">
                      Commercial Quotation Form
                    </h3>
                    <p className="text-xs text-muted-foreground">
                      Submit business requirements for official price schedule and specifications:
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
                        Equipment or Parts Category
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
                        Estimated Quantity / Scale
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. 2 Units / 50 Sets / Complete Bay"
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
                      placeholder="e.g. Torq 2-Post Lift 4.0T, Tyre Changer TC-9000, VDE EV Tool Kit"
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
                      placeholder="Describe your workshop bays, ceiling height, electrical phase (single/three phase), or delivery timeline..."
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
      {/* 12 — THINK NEXT: FINAL BRAND STATEMENT SIGNATURE          */}
      {/* ======================================================== */}
      <section className="bg-ink py-20 lg:py-24 text-ink-foreground border-t border-ink-border">
        <div className="container-page text-center max-w-3xl">
          <p className="eyebrow text-primary">PAGE International Ltd.</p>
          <h2 className="display-giant mt-3 text-ink-foreground tracking-tight">
            THINK NEXT<span className="text-primary">.</span>
          </h2>
          <div className="mt-2 font-display text-2xl uppercase tracking-wider text-zinc-300">
            Equipment. Parts. Solutions.
          </div>
          <p className="mt-3 text-base text-ink-muted leading-relaxed max-w-xl mx-auto">
            Built for the future of mobility. The company behind the workshop.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              to="/shop"
              className="btn btn-primary h-12 px-8 text-xs font-bold uppercase tracking-wider shadow-lg"
            >
              Shop Automotive Products
            </Link>
            <a
              href="#request-quote"
              className="btn btn-ghost-light h-12 px-7 text-xs font-bold uppercase tracking-wider"
            >
              Request Commercial Quote
            </a>
            <Link
              to="/solutions"
              className="btn btn-outline border-ink-border text-ink-foreground hover:bg-ink-2 h-12 px-7 text-xs font-bold uppercase tracking-wider"
            >
              Workshop Solutions
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
