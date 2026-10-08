import { useState, useRef, useEffect, useCallback } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { ArrowRight, ArrowUpRight, ChevronLeft, ChevronRight, Layers, Sparkles } from "lucide-react";
import { images } from "@/lib/data";

export interface CatalogueItem {
  id: string;
  title: string;
  subtitle: string;
  code: string;
  count: string;
  badge: string;
  specs: string;
  desc: string;
  image: string;
  link: string;
  search?: Record<string, string>;
}

export function CatalogueFanStack({ className = "" }: { className?: string }) {
  const navigate = useNavigate();

  // 5 Signature B2B Automotive Catalogue Disciplines
  const catalogueItems: CatalogueItem[] = [
    {
      id: "garage-equipment",
      title: "GARAGE EQUIPMENT",
      subtitle: "Machinery & Lifts",
      code: "CAT / 01",
      count: "48 Products",
      badge: "Commercial Machinery",
      specs: "4.0T - 5.5T Capacity",
      desc: "Electro-hydraulic 2-post and scissor lifts, hydraulic shop presses, transmission jacks & vehicle anchoring systems.",
      image: images.lift,
      link: "/shop",
      search: { cat: "Garage Equipment" },
    },
    {
      id: "tyre-wheel",
      title: "TYRE & WHEEL",
      subtitle: "Service Bays",
      code: "CAT / 02",
      count: "32 Products",
      badge: "Tyre Fitment Systems",
      specs: '10" - 26" Clamping',
      desc: "Automatic pneumatic tyre changers with dual power assist arms, laser wheel balancers & bead seating blasters.",
      image: images.tyreChanger,
      link: "/shop",
      search: { cat: "Tyre & Wheel" },
    },
    {
      id: "diagnostics",
      title: "DIAGNOSTICS",
      subtitle: "ECU & Scanning",
      code: "CAT / 03",
      count: "26 Products",
      badge: "Electronic Scanning",
      specs: "CAN-FD / DoIP Protocols",
      desc: "OE-level diagnostic tablets, multi-system ECU scanners, digital battery analyzers, code readers & oscilloscopes.",
      image: images.scanner,
      link: "/shop",
      search: { cat: "Diagnostic Equipment" },
    },
    {
      id: "ev-equipment",
      title: "EV EQUIPMENT",
      subtitle: "High-Voltage Tools",
      code: "CAT / 04",
      count: "18 Products",
      badge: "EV & Hybrid Safety",
      specs: "1000V IEC Certified",
      desc: "1000V VDE insulated hand tools, high-voltage battery cell balancers, pack diagnostic stations & safety barrier systems.",
      image: images.evBatteryAnalyzer,
      link: "/shop",
      search: { mobility: "EV" },
    },
    {
      id: "workshop-tools",
      title: "WORKSHOP TOOLS",
      subtitle: "Pneumatics & Air",
      code: "CAT / 05",
      count: "64 Products",
      badge: "Pneumatic Plant",
      specs: "10 Bar / 100% Duty",
      desc: "Continuous-duty rotary screw compressors, pneumatic piping ring mains, impact tools, filter regulators & mobile tool cabinets.",
      image: images.compressor,
      link: "/shop",
      search: { cat: "Workshop Tools" },
    },
  ];

  const total = catalogueItems.length;
  // Center active card index (default 0)
  const [activeIndex, setActiveIndex] = useState<number>(0);
  // Hover & Fan state
  const [isHovered, setIsHovered] = useState<boolean>(false);
  // Manual toggle: "auto" (fans on hover like reference) | "fanned" (always fanned) | "stacked" (compact deck)
  const [viewMode, setViewMode] = useState<"auto" | "fanned" | "stacked">("auto");
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [isReducedMotion, setIsReducedMotion] = useState<boolean>(false);
  const [isTouchDevice, setIsTouchDevice] = useState<boolean>(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    setIsReducedMotion(media.matches);
    const handler = (e: MediaQueryListEvent) => setIsReducedMotion(e.matches);
    media.addEventListener("change", handler);

    // Detect touch device (default touch devices to fanned view for immediate access)
    if (typeof window !== "undefined" && ("ontouchstart" in window || navigator.maxTouchPoints > 0)) {
      setIsTouchDevice(true);
    }

    return () => media.removeEventListener("change", handler);
  }, []);

  const nextItem = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % total);
  }, [total]);

  const prevItem = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + total) % total);
  }, [total]);

  // Touch Swipe Handlers for Mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchEndX - touchStartX;
    if (Math.abs(diff) > 40) {
      if (diff < 0) {
        nextItem();
      } else {
        prevItem();
      }
    }
    setTouchStartX(null);
  };

  // Determine whether cards are currently fanned out
  const isCurrentlyFanned =
    viewMode === "fanned" ||
    (viewMode === "auto" && (isHovered || isTouchDevice));

  // Compute balanced circular fan offset for each card relative to activeIndex
  const getCardStyle = (index: number) => {
    // Symmetrical cyclic difference: -2, -1, 0, 1, 2
    const rawDiff =
      ((index - activeIndex + total + Math.floor(total / 2)) % total) -
      Math.floor(total / 2);

    if (isReducedMotion) {
      return {
        transform: `translateX(${rawDiff * 50}px) scale(${rawDiff === 0 ? 1 : 0.92})`,
        zIndex: rawDiff === 0 ? 40 : 20 - Math.abs(rawDiff) * 5,
        opacity: rawDiff === 0 ? 1 : 0.75,
        boxShadow: rawDiff === 0 ? "0 20px 40px -10px rgba(0,0,0,0.25)" : "none",
        transformOrigin: "50% 50%",
      };
    }

    // STATE 1: FANNED OUT ARC (Reference Screenshot 1)
    if (isCurrentlyFanned) {
      switch (rawDiff) {
        case 0: // ACTIVE CENTER
          return {
            transform:
              "translateX(0px) translateY(-32px) translateZ(0px) rotate(0deg) scale(1.02)",
            zIndex: 40,
            opacity: 1,
            boxShadow:
              "0 32px 64px -16px rgba(0, 0, 0, 0.42), 0 0 0 1px rgba(255, 255, 255, 0.12)",
            transformOrigin: "50% 115%",
          };
        case -1: // LEFT 1
          return {
            transform:
              "translateX(calc(-58% - 16px)) translateY(14px) translateZ(-40px) rotate(-8.5deg) scale(0.92)",
            zIndex: 30,
            opacity: 0.94,
            boxShadow:
              "0 18px 36px -8px rgba(0, 0, 0, 0.12), 0 0 0 1px rgba(0, 0, 0, 0.06)",
            transformOrigin: "50% 115%",
          };
        case 1: // RIGHT 1
          return {
            transform:
              "translateX(calc(58% + 16px)) translateY(14px) translateZ(-40px) rotate(8.5deg) scale(0.92)",
            zIndex: 30,
            opacity: 0.94,
            boxShadow:
              "0 18px 36px -8px rgba(0, 0, 0, 0.12), 0 0 0 1px rgba(0, 0, 0, 0.06)",
            transformOrigin: "50% 115%",
          };
        case -2: // FAR LEFT 2
          return {
            transform:
              "translateX(calc(-112% - 30px)) translateY(42px) translateZ(-80px) rotate(-16deg) scale(0.84)",
            zIndex: 20,
            opacity: 0.82,
            boxShadow:
              "0 12px 28px -6px rgba(0, 0, 0, 0.1), 0 0 0 1px rgba(0, 0, 0, 0.05)",
            transformOrigin: "50% 115%",
          };
        case 2: // FAR RIGHT 2
          return {
            transform:
              "translateX(calc(112% + 30px)) translateY(42px) translateZ(-80px) rotate(16deg) scale(0.84)",
            zIndex: 20,
            opacity: 0.82,
            boxShadow:
              "0 12px 28px -6px rgba(0, 0, 0, 0.1), 0 0 0 1px rgba(0, 0, 0, 0.05)",
            transformOrigin: "50% 115%",
          };
        default:
          return {
            transform: "translateX(0px) scale(0.7)",
            zIndex: 10,
            opacity: 0.4,
            boxShadow: "none",
            transformOrigin: "50% 115%",
          };
      }
    }

    // STATE 2: STACKED DECK (Reference Screenshot 2)
    switch (rawDiff) {
      case 0: // ACTIVE FRONT
        return {
          transform:
            "translateX(0px) translateY(0px) translateZ(0px) rotate(0deg) scale(1)",
          zIndex: 40,
          opacity: 1,
          boxShadow:
            "0 26px 50px -12px rgba(0, 0, 0, 0.38), 0 0 0 1px rgba(255, 255, 255, 0.1)",
          transformOrigin: "50% 50%",
        };
      case -1: // BEHIND LEFT 1
        return {
          transform:
            "translateX(-6px) translateY(3px) translateZ(-20px) rotate(-2.8deg) scale(0.985)",
          zIndex: 30,
          opacity: 0.95,
          boxShadow:
            "0 12px 24px -6px rgba(0, 0, 0, 0.12), 0 0 0 1px rgba(0, 0, 0, 0.08)",
          transformOrigin: "50% 50%",
        };
      case 1: // BEHIND RIGHT 1
        return {
          transform:
            "translateX(6px) translateY(3px) translateZ(-20px) rotate(2.8deg) scale(0.985)",
          zIndex: 29,
          opacity: 0.95,
          boxShadow:
            "0 12px 24px -6px rgba(0, 0, 0, 0.12), 0 0 0 1px rgba(0, 0, 0, 0.08)",
          transformOrigin: "50% 50%",
        };
      case -2: // BEHIND FAR LEFT 2
        return {
          transform:
            "translateX(-11px) translateY(7px) translateZ(-40px) rotate(-5deg) scale(0.97)",
          zIndex: 20,
          opacity: 0.88,
          boxShadow:
            "0 8px 18px -4px rgba(0, 0, 0, 0.1), 0 0 0 1px rgba(0, 0, 0, 0.06)",
          transformOrigin: "50% 50%",
        };
      case 2: // BEHIND FAR RIGHT 2
        return {
          transform:
            "translateX(11px) translateY(7px) translateZ(-40px) rotate(5deg) scale(0.97)",
          zIndex: 19,
          opacity: 0.88,
          boxShadow:
            "0 8px 18px -4px rgba(0, 0, 0, 0.1), 0 0 0 1px rgba(0, 0, 0, 0.06)",
          transformOrigin: "50% 50%",
        };
      default:
        return {
          transform: "translateX(0px) scale(0.9)",
          zIndex: 10,
          opacity: 0.5,
          boxShadow: "none",
          transformOrigin: "50% 50%",
        };
    }
  };

  const handleCardClick = (index: number, item: CatalogueItem) => {
    if (activeIndex === index) {
      // Already active: navigate to catalogue route
      navigate({ to: item.link, search: item.search });
    } else {
      // Bring to center
      setActiveIndex(index);
    }
  };

  const activeCatalogue = catalogueItems[activeIndex];

  return (
    <section
      id="catalogue-showcase"
      className={`relative py-20 lg:py-28 bg-[#FAF9F6] text-zinc-900 overflow-hidden border-b border-zinc-200 ${className}`}
    >
      {/* Background Subtle Ambient Lighting & Architecture Grid */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Soft radial showroom spotlight */}
        <div className="absolute top-[30%] left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-amber-500/[0.035] blur-[140px] rounded-full" />
        {/* Subtle engineering layout dots */}
        <div className="absolute inset-0 bg-[radial-gradient(#d1d5db_1px,transparent_1px)] [background-size:28px_28px] opacity-60 [mask-image:radial-gradient(ellipse_75%_65%_at_50%_50%,black_40%,transparent_100%)]" />
      </div>

      <div className="container-page relative z-10">
        {/* SECTION HEADER: Clean, Editorial, Minimal */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12 sm:mb-16">
          <div>
            <div className="inline-flex items-center gap-2 text-[10px] sm:text-xs font-mono font-bold uppercase tracking-[0.25em] text-primary mb-2.5">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" />
              <span>CATALOGUE / 01 · B2B COMMERCIAL DISCIPLINES</span>
            </div>
            <h2 className="display-lg text-zinc-950 tracking-tight">
              EXPLORE OUR CATALOGUE.
            </h2>
            <p className="mt-2 text-sm sm:text-base text-zinc-600 max-w-xl font-sans">
              Professional equipment, diagnostic systems, and workshop engineering solutions for modern automotive facilities.
            </p>
          </div>

          <div className="flex items-center gap-4">
            <span className="hidden sm:inline-block text-xs font-mono text-zinc-500 uppercase tracking-widest">
              {isCurrentlyFanned ? "HOVER / TAP TO INSPECT" : "HOVER TO SPREAD FAN"}
            </span>
            <Link
              to="/shop"
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary hover:text-zinc-950 transition-colors group"
            >
              <span>View Full B2B Catalog</span>
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>

        {/* ======================================================== */}
        {/* THE INTERACTIVE CATALOGUE FAN STACK                      */}
        {/* ======================================================== */}
        <div
          onPointerEnter={() => setIsHovered(true)}
          onPointerLeave={() => setIsHovered(false)}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          className="relative mx-auto flex items-center justify-center min-h-[500px] sm:min-h-[540px] md:min-h-[570px] lg:min-h-[590px] select-none py-6 px-4"
          style={{
            perspective: "1400px",
            perspectiveOrigin: "50% 50%",
          }}
          role="region"
          aria-label="Interactive Catalogue Fan Stack"
        >
          {/* Ground Soft Table Shadow beneath Stack */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-[75%] max-w-3xl h-14 bg-black/15 blur-2xl rounded-full pointer-events-none" />

          {/* Render 5 Fanned Catalogue Panels */}
          {catalogueItems.map((item, index) => {
            const isCenter = activeIndex === index;
            const style = getCardStyle(index);

            return (
              <div
                key={item.id}
                role="button"
                tabIndex={0}
                aria-label={`${item.title}, ${item.subtitle}. ${
                  isCenter
                    ? "Active catalogue. Press Enter to view products."
                    : "Press Enter to inspect catalogue."
                }`}
                onPointerEnter={() => setActiveIndex(index)}
                onClick={() => handleCardClick(index, item)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    handleCardClick(index, item);
                  } else if (e.key === "ArrowRight") {
                    e.preventDefault();
                    nextItem();
                  } else if (e.key === "ArrowLeft") {
                    e.preventDefault();
                    prevItem();
                  }
                }}
                className={`absolute left-1/2 top-1/2 -translate-y-1/2 cursor-pointer w-[250px] sm:w-[280px] md:w-[305px] lg:w-[325px] h-[385px] sm:h-[415px] md:h-[435px] transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] rounded-[28px] sm:rounded-[32px] border flex flex-col justify-between p-4 sm:p-5 ${
                  isCenter
                    ? "bg-[#18181B] text-white border-zinc-700/80 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.45)] ring-1 ring-white/10"
                    : "bg-white text-zinc-900 border-zinc-200/90 shadow-md hover:border-zinc-300"
                }`}
                style={{
                  transform: style.transform,
                  zIndex: style.zIndex,
                  opacity: style.opacity,
                  transformOrigin: style.transformOrigin,
                  boxShadow: style.boxShadow,
                }}
              >
                {/* Top Action Row */}
                <div className="flex items-center justify-between gap-2 z-10">
                  {/* Category Code or Badge */}
                  <div>
                    <span
                      className={`text-[10px] font-mono font-bold uppercase tracking-wider block ${
                        isCenter ? "text-primary" : "text-zinc-600"
                      }`}
                    >
                      {item.code}
                    </span>
                    <span
                      className={`text-[9px] font-sans font-semibold tracking-tight block ${
                        isCenter ? "text-zinc-400" : "text-zinc-600"
                      }`}
                    >
                      {item.badge}
                    </span>
                  </div>

                  {/* Top Button: Pill on Active, Circle on Inactive (Reference Match) */}
                  {isCenter ? (
                    <div
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate({ to: item.link, search: item.search });
                      }}
                      className="inline-flex items-center gap-1.5 px-3 sm:px-3.5 py-1.5 rounded-full bg-white text-zinc-950 text-xs font-bold tracking-tight shadow-md transition-all hover:bg-zinc-100 hover:scale-105"
                    >
                      <span>Explore Catalogue</span>
                      <ArrowUpRight className="h-3.5 w-3.5 text-primary" />
                    </div>
                  ) : (
                    <div
                      className="size-8 sm:size-9 rounded-full bg-zinc-100 border border-zinc-200/80 flex items-center justify-center text-zinc-800 transition-all hover:bg-zinc-200 hover:scale-105 shadow-xs"
                      aria-hidden="true"
                    >
                      <ArrowUpRight className="h-4 w-4" />
                    </div>
                  )}
                </div>

                {/* Dominant Catalogue Image Canvas with Rounded Inset Container */}
                <div
                  className={`relative my-2 sm:my-3 aspect-[4/3] w-full flex items-center justify-center overflow-hidden rounded-[20px] p-4 transition-colors ${
                    isCenter
                      ? "bg-[#27272A] border border-white/5"
                      : "bg-[#F4F4F5] border border-zinc-100"
                  }`}
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    loading="lazy"
                    className={`h-full w-full object-contain transition-transform duration-500 ${
                      isCenter
                        ? "scale-105"
                        : "mix-blend-multiply scale-95 hover:scale-100"
                    }`}
                  />

                  {/* Active Floating Spec Pill */}
                  {isCenter && (
                    <div className="absolute top-2 left-2 px-2 py-0.5 rounded-md bg-zinc-950/80 text-white text-[9px] font-mono font-bold uppercase tracking-wider backdrop-blur-xs border border-white/10 shadow-xs animate-in fade-in duration-300">
                      {item.specs}
                    </div>
                  )}
                </div>

                {/* Bottom Editorial Content */}
                <div className="pt-1">
                  <span
                    className={`text-[10px] font-bold uppercase tracking-widest block mb-0.5 ${
                      isCenter ? "text-primary" : "text-zinc-600"
                    }`}
                  >
                    {item.subtitle}
                  </span>

                  <h3
                    className={`font-display text-lg sm:text-xl md:text-2xl font-bold uppercase leading-tight line-clamp-1 ${
                      isCenter ? "text-white" : "text-zinc-950"
                    }`}
                  >
                    {item.title}
                  </h3>

                  <p
                    className={`mt-1 text-xs line-clamp-2 min-h-[2rem] leading-relaxed ${
                      isCenter ? "text-zinc-300" : "text-zinc-700"
                    }`}
                  >
                    {item.desc}
                  </p>

                  {/* Bottom Stats Row */}
                  <div
                    className={`mt-3 pt-2.5 border-t flex items-center justify-between text-xs font-mono font-semibold ${
                      isCenter
                        ? "border-zinc-800 text-zinc-300"
                        : "border-zinc-100 text-zinc-600"
                    }`}
                  >
                    <span>{item.count}</span>
                    <span
                      className={`inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider ${
                        isCenter ? "text-primary" : "text-zinc-700 hover:text-primary"
                      }`}
                    >
                      {isCenter ? "Ready To Order" : "Inspect →"}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* ======================================================== */}
        {/* BELOW STACK CONTROLS & ACTIVE INDEX INDICATOR            */}
        {/* ======================================================== */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-6 pt-6 border-t border-zinc-200">
          {/* Active Product Index Indicator: 01 / 05 */}
          <div className="flex items-center gap-4">
            <span className="font-display text-2xl sm:text-3xl font-bold text-zinc-950 tracking-wider">
              0{activeIndex + 1}{" "}
              <span className="text-zinc-400">/ 0{total}</span>
            </span>

            {/* Interactive Dot Selectors */}
            <div className="flex items-center gap-2">
              {catalogueItems.map((item, idx) => (
                <button
                  key={item.id}
                  onClick={() => setActiveIndex(idx)}
                  aria-label={`Inspect ${item.title}`}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    activeIndex === idx
                      ? "w-8 bg-primary shadow-xs"
                      : "w-2 bg-zinc-300 hover:bg-zinc-400"
                  }`}
                />
              ))}
            </div>

            <span className="hidden md:inline-block text-xs font-medium text-zinc-600 truncate max-w-xs ml-2">
              {activeCatalogue.title} · {activeCatalogue.subtitle}
            </span>
          </div>

          {/* Quick View Mode Toggle & Navigation Chevrons */}
          <div className="flex items-center gap-3 sm:gap-4">
            {/* View Mode Switch: Deck Stack vs Fan Out */}
            <div className="hidden sm:inline-flex items-center p-1 rounded-full bg-zinc-200/80 border border-zinc-300/80 text-[11px] font-bold">
              <button
                onClick={() => setViewMode("stacked")}
                className={`px-3 py-1 rounded-full flex items-center gap-1.5 transition-all ${
                  viewMode === "stacked"
                    ? "bg-white text-zinc-950 shadow-xs"
                    : "text-zinc-600 hover:text-zinc-950"
                }`}
                title="Keep cards stacked as a deck"
              >
                <Layers className="h-3 w-3" />
                <span>Deck</span>
              </button>
              <button
                onClick={() => setViewMode("auto")}
                className={`px-3 py-1 rounded-full flex items-center gap-1.5 transition-all ${
                  viewMode === "auto"
                    ? "bg-white text-zinc-950 shadow-xs"
                    : "text-zinc-600 hover:text-zinc-950"
                }`}
                title="Cards fan out on hover"
              >
                <Sparkles className="h-3 w-3 text-primary" />
                <span>Interactive</span>
              </button>
              <button
                onClick={() => setViewMode("fanned")}
                className={`px-3 py-1 rounded-full flex items-center gap-1.5 transition-all ${
                  viewMode === "fanned"
                    ? "bg-white text-zinc-950 shadow-xs"
                    : "text-zinc-600 hover:text-zinc-950"
                }`}
                title="Keep cards fanned out"
              >
                <span>Fanned</span>
              </button>
            </div>

            {/* Arrows for manual navigation */}
            <div className="flex items-center gap-2">
              <button
                onClick={prevItem}
                aria-label="Previous catalogue panel"
                className="grid h-9 w-9 place-items-center rounded-full border border-zinc-300 bg-white text-zinc-800 hover:border-zinc-400 hover:bg-zinc-50 transition-colors shadow-xs"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                onClick={nextItem}
                aria-label="Next catalogue panel"
                className="grid h-9 w-9 place-items-center rounded-full border border-zinc-300 bg-white text-zinc-800 hover:border-zinc-400 hover:bg-zinc-50 transition-colors shadow-xs"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>

            <Link
              to="/shop"
              className="btn btn-primary h-9 sm:h-10 px-4 sm:px-5 text-xs font-bold uppercase tracking-wider rounded-sm shadow-md shadow-primary/20"
            >
              <span>Explore Complete Catalogue</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
