import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import {
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  FileSpreadsheet,
  Send,
  Wrench,
  Zap,
} from "lucide-react";
import { useState } from "react";
import { CinematicIntro } from "@/components/site/CinematicIntro";
import { MobilityScrollStack } from "@/components/site/MobilityScrollStack";
import {
  brands,
  images,
  products,
  taka,
  vehiclePlatformData,
  years,
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
          "PAGE International is a specialized B2B supplier and distributor of automotive garage machinery, spare parts, diagnostics, tools, and workshop solutions to service centers, workshops, dealers, fleets, and EV businesses.",
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

function Home() {
  const navigate = useNavigate();

  // Active Who We Equip interactive index
  const [activeEquipIndex, setActiveEquipIndex] = useState<number>(0);

  // Streamlined Vehicle Finder State
  const [platform, setPlatform] = useState<MobilityType>("4-Wheeler");
  const [make, setMake] = useState<string>("Toyota");
  const [model, setModel] = useState<string>("Corolla");
  const [year, setYear] = useState<string>("2022");

  // Streamlined Quote Form State
  const [quoteForm, setQuoteForm] = useState({
    name: "",
    company: "",
    phone: "",
    email: "",
    businessType: "Workshop",
    requirement: "",
  });
  const [quoteSubmitted, setQuoteSubmitted] = useState(false);

  const handleQuoteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!quoteForm.company || !quoteForm.phone) return;
    setQuoteSubmitted(true);
  };

  const handleFinderSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate({
      to: "/shop",
      search: {
        mobility: platform,
        vehicle: `${make} ${model}`,
      },
    });
  };

  // 4 Featured High-Impact Products
  const featuredItems = [
    products.find((p) => p.slug === "heavy-duty-2-post-lift-4t") || products[0],
    products.find((p) => p.slug === "pro-tyre-changer-assist-arm") || products[1],
    products.find((p) => p.slug === "digital-wheel-balancer-laser") || products[2],
    products.find((p) => p.slug === "rotary-screw-air-compressor-10hp") || products[3],
  ];

  const makes = Object.keys(vehiclePlatformData[platform] ?? {});
  const models = make && vehiclePlatformData[platform]?.[make]
    ? Object.keys(vehiclePlatformData[platform][make])
    : [];

  const equipSectors = [
    {
      num: "01",
      title: "WORKSHOPS",
      tag: "Independent Multi-Brand Garages",
      desc: "Supplied with 2-post electro-hydraulic lifts, pneumatic tools, consumable spares, and daily parts distribution.",
    },
    {
      num: "02",
      title: "SERVICE CENTERS",
      tag: "High-Throughput Authorized Hubs",
      desc: "Turnkey multi-bay scissor lifts, computerized alignment stations, AC servicing machines, and bulk lubricant systems.",
    },
    {
      num: "03",
      title: "DEALERS",
      tag: "OEM Dealership Service Networks",
      desc: "OE-level diagnostic tablets, factory-calibration rigs, certified testing tools, and warranty-backed garage infrastructure.",
    },
    {
      num: "04",
      title: "DISTRIBUTORS",
      tag: "Regional Wholesalers & Retail Stockists",
      desc: "Pallet and container-level wholesale supply for regional spare parts merchants, battery stockists, and tool retailers.",
    },
    {
      num: "05",
      title: "FLEETS",
      tag: "Commercial Transport & Bus Depots",
      desc: "Heavy-duty column lifts, industrial air compressors, and rapid replenishment contracts for high-wear fleet components.",
    },
    {
      num: "06",
      title: "EV BUSINESSES",
      tag: "Electric Mobility Specialists & Retrofitters",
      desc: "1000V VDE insulated hand tools, high-voltage battery diagnostic stations, safety isolation barriers, and charging bays.",
    },
  ];

  return (
    <div className="bg-background text-foreground selection:bg-primary selection:text-white">
      {/* 00 — SIGNATURE WEBSITE OPENING ANIMATION: FROM THE ROAD TO THE WORKSHOP */}
      <CinematicIntro />

      {/* ======================================================== */}
      {/* 01 — HERO: FULL-WIDTH CINEMATIC WORKSHOP ENVIRONMENT     */}
      {/* ======================================================== */}
      <section className="relative min-h-[85vh] lg:min-h-[90vh] flex items-center justify-start overflow-hidden bg-black text-white pt-20">
        {/* Full-Width Workshop Photograph */}
        <div className="absolute inset-0 z-0">
          <img
            src={images.heroWorkshop}
            alt="Commercial automotive workshop facility equipped with hydraulic vehicle lifts"
            fetchPriority="high"
            className="h-full w-full object-cover object-center opacity-45 brightness-90 contrast-110"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
        </div>

        {/* Hero Content: Bold Typography & Essential CTAs */}
        <div className="container-page relative z-10 py-16 lg:py-24">
          <div className="max-w-3xl">
            <span className="inline-block text-xs font-bold uppercase tracking-[0.25em] text-primary mb-3">
              PAGE INTERNATIONAL · B2B AUTOMOTIVE SUPPLIER
            </span>

            <h1 className="display-hero text-white leading-[0.88] tracking-tight">
              AUTOMOTIVE <br />
              EQUIPMENT. <br />
              PARTS. <br />
              <span className="text-primary">WORKSHOP SOLUTIONS.</span>
            </h1>

            <p className="mt-6 max-w-lg text-base sm:text-lg text-zinc-300 leading-relaxed font-sans">
              Professional equipment, parts and workshop solutions for the businesses that keep vehicles moving.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                to="/shop"
                className="btn btn-primary h-12 px-8 text-xs sm:text-sm font-bold uppercase tracking-widest shadow-xl shadow-primary/30"
              >
                Explore Products <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href="#request-quote"
                className="btn btn-outline border-white/40 text-white hover:bg-white hover:text-black h-12 px-7 text-xs sm:text-sm font-bold uppercase tracking-widest"
              >
                <FileSpreadsheet className="h-4 w-4 text-primary" /> Request a Quote
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 02 — MOBILITY ECOSYSTEM / WHAT WE SUPPLY (SCROLL STACK)  */}
      {/* ======================================================== */}
      <MobilityScrollStack />


      {/* ======================================================== */}
      {/* 04 — FEATURED PRODUCTS: 4 STRONG COMMODITIES             */}
      {/* ======================================================== */}
      <section className="py-20 lg:py-28 bg-white border-b border-border">
        <div className="container-page">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12">
            <div>
              <span className="eyebrow text-primary">Commercial Machinery</span>
              <h2 className="display-lg mt-1 text-foreground">
                FEATURED EQUIPMENT
              </h2>
            </div>
            <Link
              to="/shop"
              search={{ cat: "Garage Equipment" }}
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary hover:text-foreground transition-colors group"
            >
              <span>Explore All Machinery</span>
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          {/* 4 Strong Products with Large Image Areas & Clean Information */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredItems.map((p) => (
              <article
                key={p.slug}
                className="group flex flex-col rounded border border-border bg-card p-5 transition-all duration-200 hover:border-foreground hover:shadow-xl"
              >
                {/* Brand & Category */}
                <div className="text-[11px] font-bold uppercase tracking-wider text-primary">
                  {p.brand} · {p.category}
                </div>

                {/* Large Product Image Canvas */}
                <Link
                  to="/shop/$slug"
                  params={{ slug: p.slug }}
                  className="relative my-4 aspect-square overflow-hidden rounded bg-zinc-100 p-4 block"
                >
                  <img
                    src={p.image}
                    alt={p.name}
                    loading="lazy"
                    className="h-full w-full object-contain mix-blend-multiply transition-transform duration-300 group-hover:scale-108"
                  />
                </Link>

                {/* Product Name */}
                <Link
                  to="/shop/$slug"
                  params={{ slug: p.slug }}
                  className="font-display text-2xl font-bold uppercase text-foreground leading-tight group-hover:text-primary transition-colors line-clamp-2"
                >
                  {p.name}
                </Link>

                {/* Price & CTA */}
                <div className="mt-auto pt-4 border-t border-border mt-4">
                  <div className="font-display text-2xl font-bold text-foreground">
                    {taka(p.price)}
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
                      View
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 06 — GARAGE EQUIPMENT: VISUAL EQUIPMENT SHOWCASE         */}
      {/* ======================================================== */}
      <section className="py-20 lg:py-28 bg-white border-b border-border">
        <div className="container-page">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            {/* Left: Large High-Resolution Machinery Image */}
            <div className="relative overflow-hidden rounded border border-border bg-zinc-950 p-6 flex items-center justify-center shadow-xl">
              <div className="aspect-[4/3] w-full flex items-center justify-center">
                <img
                  src={images.lift}
                  alt="Torq Heavy-Duty 2-Post Workshop Lift"
                  className="h-full w-full object-contain"
                />
              </div>
            </div>

            {/* Right: Minimal Showcase List */}
            <div>
              <span className="eyebrow text-primary">Machinery Portfolio</span>
              <h2 className="display-giant text-foreground tracking-tight mt-1">
                GARAGE EQUIPMENT
              </h2>

              <div className="mt-8 divide-y divide-border border-y border-border">
                {[
                  { name: "LIFTS", link: "/shop?cat=Garage+Equipment" },
                  { name: "TYRE EQUIPMENT", link: "/shop?cat=Tyre+%26+Wheel" },
                  { name: "DIAGNOSTICS", link: "/shop?cat=Diagnostic+Equipment" },
                  { name: "BRAKE EQUIPMENT", link: "/shop?cat=Garage+Equipment" },
                  { name: "COMPRESSORS", link: "/shop?cat=Garage+Equipment" },
                  { name: "WORKSHOP TOOLS", link: "/shop?cat=Workshop+Tools" },
                ].map((item) => (
                  <Link
                    key={item.name}
                    to={item.link}
                    className="group flex items-center justify-between py-4 transition-colors hover:text-primary"
                  >
                    <span className="font-display text-2xl sm:text-3xl font-bold uppercase tracking-wide text-foreground group-hover:text-primary transition-colors">
                      {item.name}
                    </span>
                    <ArrowRight className="h-5 w-5 text-muted-foreground transition-transform group-hover:translate-x-2 group-hover:text-primary" />
                  </Link>
                ))}
              </div>

              <div className="mt-8">
                <Link
                  to="/shop"
                  search={{ cat: "Garage Equipment" }}
                  className="btn btn-primary h-11 px-8 text-xs font-bold uppercase tracking-wider"
                >
                  Explore Garage Equipment →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 07 — EV SECTION: DARK VISUAL STORYTELLING                */}
      {/* ======================================================== */}
      <section className="py-20 lg:py-28 bg-zinc-950 text-white border-b border-zinc-800">
        <div className="container-page">
          <div className="max-w-2xl mb-10">
            <span className="inline-block text-xs font-bold uppercase tracking-[0.2em] text-amber-400 mb-2">
              Next-Gen Mobility Transition
            </span>
            <h2 className="display-giant text-white tracking-tight leading-[0.92]">
              READY FOR THE NEXT <br />
              <span className="text-amber-400">GENERATION OF MOBILITY.</span>
            </h2>
          </div>

          {/* Large EV Workshop Visual with Typographic Selectors */}
          <div className="relative overflow-hidden rounded border border-zinc-800 bg-zinc-900 shadow-2xl">
            <div className="aspect-[16/9] lg:aspect-[21/9] w-full overflow-hidden">
              <img
                src={images.evWorkshopBay}
                alt="Modern electric vehicle workshop bay with 1000V tools"
                className="h-full w-full object-cover object-center opacity-65"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
            </div>

            {/* Overlay: Typographic Selectors 2W · 3W · 4W */}
            <div className="absolute inset-x-0 bottom-0 p-6 sm:p-10 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
              <div className="flex flex-wrap items-center gap-6 sm:gap-10">
                <Link
                  to="/shop"
                  search={{ mobility: "2-Wheeler" }}
                  className="group flex flex-col text-white hover:text-amber-400 transition-colors"
                >
                  <span className="font-display text-4xl sm:text-5xl font-bold tracking-tight">2W EV</span>
                  <span className="text-xs font-mono text-zinc-400 group-hover:text-amber-300">Bikes & Scooters</span>
                </Link>
                <span className="text-zinc-600 font-display text-3xl">/</span>
                <Link
                  to="/shop"
                  search={{ mobility: "3-Wheeler" }}
                  className="group flex flex-col text-white hover:text-amber-400 transition-colors"
                >
                  <span className="font-display text-4xl sm:text-5xl font-bold tracking-tight">3W EV</span>
                  <span className="text-xs font-mono text-zinc-400 group-hover:text-amber-300">Cargo & Rickshaws</span>
                </Link>
                <span className="text-zinc-600 font-display text-3xl">/</span>
                <Link
                  to="/shop"
                  search={{ mobility: "EV" }}
                  className="group flex flex-col text-white hover:text-amber-400 transition-colors"
                >
                  <span className="font-display text-4xl sm:text-5xl font-bold tracking-tight">4W EV</span>
                  <span className="text-xs font-mono text-zinc-400 group-hover:text-amber-300">Cars & Vans</span>
                </Link>
              </div>

              <Link
                to="/shop"
                search={{ mobility: "EV" }}
                className="btn btn-primary h-11 px-7 text-xs font-bold uppercase tracking-wider shrink-0"
              >
                Explore EV Workshop →
              </Link>
            </div>
          </div>

          {/* Extremely Concise Capabilities Bar */}
          <div className="mt-8 grid grid-cols-2 sm:grid-cols-5 divide-y sm:divide-y-0 sm:divide-x divide-zinc-800 border-y border-zinc-800 py-4 text-center text-xs font-bold uppercase tracking-widest text-zinc-400">
            <span className="py-2 hover:text-white transition-colors">BATTERY EQUIPMENT</span>
            <span className="py-2 hover:text-white transition-colors">DIAGNOSTICS</span>
            <span className="py-2 hover:text-white transition-colors">CHARGING STATIONS</span>
            <span className="py-2 hover:text-white transition-colors">HV TESTING</span>
            <span className="py-2 hover:text-white transition-colors">1000V VDE SAFETY</span>
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 08 — WHO WE EQUIP: EDITORIAL VISUAL SECTION              */}
      {/* ======================================================== */}
      <section className="py-20 lg:py-28 bg-white border-b border-border">
        <div className="container-page">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-start">
            {/* Left: Large Editorial Workshop Photography */}
            <div className="relative overflow-hidden rounded border border-border bg-zinc-950 shadow-xl sticky top-28">
              <div className="aspect-[4/5] w-full overflow-hidden">
                <img
                  src={images.workshop}
                  alt="Automotive workshop service facility"
                  className="h-full w-full object-cover brightness-85"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
              <div className="absolute bottom-0 inset-x-0 p-6 text-white">
                <span className="text-[10px] font-bold uppercase tracking-widest text-primary">
                  The Company Behind The Workshop
                </span>
                <p className="font-display text-2xl font-bold uppercase mt-1">
                  We Equip The Businesses That Keep Vehicles Moving.
                </p>
              </div>
            </div>

            {/* Right: Large Editorial Typography & Interactive Clean List */}
            <div>
              <span className="eyebrow text-primary">Target Sectors</span>
              <h2 className="display-giant text-foreground tracking-tight leading-[0.92] mt-1">
                BUILT FOR THE <br />
                BUSINESSES THAT <br />
                KEEP VEHICLES <br />
                MOVING.
              </h2>

              {/* Clean Interactive List: Reveals details on hover/click without cluttering */}
              <div className="mt-8 divide-y divide-border border-y border-border">
                {equipSectors.map((sector, idx) => {
                  const isActive = activeEquipIndex === idx;
                  return (
                    <div
                      key={sector.num}
                      onMouseEnter={() => setActiveEquipIndex(idx)}
                      onClick={() => setActiveEquipIndex(idx)}
                      className="cursor-pointer py-4 transition-colors"
                    >
                      <div className="flex items-baseline justify-between">
                        <div className="flex items-baseline gap-4">
                          <span className="font-mono text-sm font-bold text-primary">
                            {sector.num}
                          </span>
                          <span
                            className={`font-display text-2xl sm:text-3xl font-bold uppercase tracking-wide transition-colors ${
                              isActive ? "text-primary" : "text-foreground hover:text-primary"
                            }`}
                          >
                            {sector.title}
                          </span>
                        </div>
                        <span className="text-xs font-mono uppercase text-muted-foreground">
                          {sector.tag}
                        </span>
                      </div>

                      {/* Revealed on hover/active */}
                      {isActive && (
                        <p className="mt-2 pl-9 text-sm text-foreground/80 leading-relaxed animate-in fade-in duration-200">
                          {sector.desc}
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>

              <div className="mt-8">
                <a
                  href="#request-quote"
                  className="btn btn-outline h-11 px-8 text-xs font-bold uppercase tracking-wider"
                >
                  Request Supply Terms
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 09 — PRODUCT FINDER: PRECISION TOOL                      */}
      {/* ======================================================== */}
      <section className="py-16 lg:py-20 bg-zinc-100 border-b border-border">
        <div className="container-page max-w-4xl">
          <div className="text-center mb-6">
            <span className="eyebrow text-primary">Compatibility Tool</span>
            <h2 className="display-lg mt-1 text-foreground">
              FIND THE RIGHT PRODUCT.
            </h2>
          </div>

          <form
            onSubmit={handleFinderSubmit}
            className="rounded border border-border bg-card p-6 shadow-sm"
          >
            {/* Clean Platform Selector */}
            <div className="grid grid-cols-4 gap-2 mb-4">
              {(["4-Wheeler", "2-Wheeler", "3-Wheeler", "EV"] as MobilityType[]).map(
                (p) => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => {
                      setPlatform(p);
                      const newMakes = Object.keys(vehiclePlatformData[p] ?? {});
                      if (newMakes.length > 0) {
                        setMake(newMakes[0]);
                        const newModels = Object.keys(vehiclePlatformData[p][newMakes[0]] ?? {});
                        setModel(newModels[0] ?? "");
                      }
                    }}
                    className={`h-10 text-xs font-bold uppercase tracking-wider border rounded transition-colors ${
                      platform === p
                        ? "bg-primary text-white border-primary"
                        : "bg-secondary text-foreground border-border hover:border-foreground"
                    }`}
                  >
                    {p === "4-Wheeler" ? "4W" : p === "2-Wheeler" ? "2W" : p === "3-Wheeler" ? "3W" : "EV"}
                  </button>
                )
              )}
            </div>

            {/* Inline 3 Selectors + 1 Action */}
            <div className="grid sm:grid-cols-4 gap-3">
              <div>
                <label className="block text-[10px] font-bold uppercase text-muted-foreground mb-1">
                  Manufacturer
                </label>
                <select
                  value={make}
                  onChange={(e) => {
                    const m = e.target.value;
                    setMake(m);
                    const newModels = Object.keys(vehiclePlatformData[platform]?.[m] ?? {});
                    setModel(newModels[0] ?? "");
                  }}
                  className="field h-10 text-xs"
                >
                  {makes.map((m) => (
                    <option key={m} value={m}>
                      {m}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase text-muted-foreground mb-1">
                  Model
                </label>
                <select
                  value={model}
                  onChange={(e) => setModel(e.target.value)}
                  className="field h-10 text-xs"
                >
                  {models.map((mod) => (
                    <option key={mod} value={mod}>
                      {mod}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase text-muted-foreground mb-1">
                  Year
                </label>
                <select
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                  className="field h-10 text-xs"
                >
                  {years.slice(0, 10).map((y) => (
                    <option key={y} value={y}>
                      {y}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex items-end">
                <button
                  type="submit"
                  className="btn btn-primary h-10 w-full text-xs font-bold uppercase tracking-wider"
                >
                  Find Products
                </button>
              </div>
            </div>
          </form>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 10 — BRANDS: MINIMAL LOGO WALL                           */}
      {/* ======================================================== */}
      <section id="brands" className="py-16 bg-white border-b border-border scroll-mt-20">
        <div className="container-page">
          <p className="text-center text-[11px] font-bold uppercase tracking-[0.25em] text-muted-foreground mb-8">
            Authorized Equipment & Component Partners
          </p>
          <div className="flex flex-wrap items-center justify-between gap-8 md:gap-12 opacity-80">
            {brands.slice(0, 8).map((b) => (
              <span
                key={b}
                className="font-display text-2xl md:text-3xl font-bold tracking-widest text-zinc-400 hover:text-foreground transition-colors cursor-default"
              >
                {b.toUpperCase()}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 11 — REQUEST A QUOTE: STREAMLINED SPLIT-SCREEN           */}
      {/* ======================================================== */}
      <section
        id="request-quote"
        className="py-20 lg:py-28 bg-zinc-50 border-b border-border scroll-mt-20"
      >
        <div className="container-page max-w-5xl">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            {/* Left: Powerful Statement */}
            <div>
              <span className="eyebrow text-primary">Commercial Inquiry Desk</span>
              <h2 className="display-hero text-foreground leading-[0.9] mt-3">
                NEED EQUIPMENT <br />
                <span className="text-primary">FOR YOUR BUSINESS?</span>
              </h2>
              <p className="mt-4 text-base text-muted-foreground leading-relaxed">
                Commercial quotation returned within 24 hours for workshop machinery, bulk spares, and turnkey bay projects.
              </p>
              <div className="mt-8 font-mono text-sm font-bold text-foreground">
                Hotline: +880 9612-PAGE-INTL · b2b@page-intl.com
              </div>
            </div>

            {/* Right: Streamlined 6-Field Form */}
            <div className="rounded border border-border bg-card p-6 sm:p-8 shadow-sm">
              {quoteSubmitted ? (
                <div className="py-8 text-center">
                  <div className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-emerald-500/10 text-emerald-600 mb-3">
                    <CheckCircle2 className="h-6 w-6" />
                  </div>
                  <h3 className="font-display text-2xl uppercase text-foreground">
                    Quote Request Received
                  </h3>
                  <p className="text-xs text-muted-foreground mt-1 max-w-sm mx-auto">
                    Thank you, {quoteForm.name || quoteForm.company}. We will reach out with commercial pricing and specifications within 24 hours.
                  </p>
                  <button
                    onClick={() => {
                      setQuoteSubmitted(false);
                      setQuoteForm({
                        name: "",
                        company: "",
                        phone: "",
                        email: "",
                        businessType: "Workshop",
                        requirement: "",
                      });
                    }}
                    className="btn btn-outline h-9 text-xs font-bold uppercase mt-4"
                  >
                    Submit Another
                  </button>
                </div>
              ) : (
                <form onSubmit={handleQuoteSubmit} className="space-y-3.5">
                  <div className="grid sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[10px] font-bold uppercase text-muted-foreground mb-1">
                        Contact Name *
                      </label>
                      <input
                        required
                        type="text"
                        placeholder="e.g. Tanvir Ahmed"
                        className="field h-10 text-xs"
                        value={quoteForm.name}
                        onChange={(e) => setQuoteForm({ ...quoteForm, name: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold uppercase text-muted-foreground mb-1">
                        Company Name *
                      </label>
                      <input
                        required
                        type="text"
                        placeholder="e.g. Apex Auto Workshop Ltd."
                        className="field h-10 text-xs"
                        value={quoteForm.company}
                        onChange={(e) => setQuoteForm({ ...quoteForm, company: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[10px] font-bold uppercase text-muted-foreground mb-1">
                        Phone / WhatsApp *
                      </label>
                      <input
                        required
                        type="tel"
                        placeholder="+880 17XXXXXXXX"
                        className="field h-10 text-xs"
                        value={quoteForm.phone}
                        onChange={(e) => setQuoteForm({ ...quoteForm, phone: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold uppercase text-muted-foreground mb-1">
                        Email Address
                      </label>
                      <input
                        type="email"
                        placeholder="procurement@company.com"
                        className="field h-10 text-xs"
                        value={quoteForm.email}
                        onChange={(e) => setQuoteForm({ ...quoteForm, email: e.target.value })}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold uppercase text-muted-foreground mb-1">
                      Business Type
                    </label>
                    <select
                      value={quoteForm.businessType}
                      onChange={(e) => setQuoteForm({ ...quoteForm, businessType: e.target.value })}
                      className="field h-10 text-xs"
                    >
                      <option value="Workshop">Workshop / Garage</option>
                      <option value="Service Center">Service Center Hub</option>
                      <option value="Dealer">Automotive Dealership</option>
                      <option value="Distributor">Wholesale Distributor</option>
                      <option value="Fleet">Commercial Fleet Operator</option>
                      <option value="EV Business">EV Workshop / Business</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold uppercase text-muted-foreground mb-1">
                      Requirement / Target Equipment *
                    </label>
                    <input
                      required
                      type="text"
                      placeholder="e.g. 2-Post Lifts, Tyre Changer, 1000V EV Tools, Brake Parts"
                      className="field h-10 text-xs"
                      value={quoteForm.requirement}
                      onChange={(e) => setQuoteForm({ ...quoteForm, requirement: e.target.value })}
                    />
                  </div>

                  <button
                    type="submit"
                    className="btn btn-primary h-11 w-full text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 mt-2"
                  >
                    <Send className="h-4 w-4" />
                    <span>Submit Quote Request</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 12 — THINK NEXT: FINAL BRAND STATEMENT SIGNATURE          */}
      {/* ======================================================== */}
      <section className="bg-black py-28 lg:py-36 text-white text-center border-t border-zinc-900">
        <div className="container-page max-w-3xl">
          <h2 className="display-hero text-white tracking-tight text-6xl sm:text-8xl lg:text-9xl">
            THINK NEXT<span className="text-primary">.</span>
          </h2>
          <p className="font-display text-2xl sm:text-3xl uppercase tracking-widest text-zinc-400 mt-4">
            Equipment. Parts. Solutions.
          </p>
          <div className="mt-8">
            <Link
              to="/shop"
              className="btn btn-primary h-12 px-10 text-xs sm:text-sm font-bold uppercase tracking-widest shadow-2xl shadow-primary/30"
            >
              Explore Products
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
