import { useState, useRef, useEffect, useMemo } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, ArrowUpRight, CheckCircle2 } from "lucide-react";
import { images } from "@/lib/data";

// Cubic bezier evaluator for smooth physical slide
function cubicBezier(p1x: number, p1y: number, p2x: number, p2y: number) {
  return function (t: number): number {
    const u = 1 - t;
    const tt = t * t;
    const uu = u * u;
    const ttt = tt * t;
    return 3 * uu * t * p1y + 3 * u * tt * p2y + ttt;
  };
}
const easeSlide = cubicBezier(0.22, 1, 0.36, 1);

export interface MobilityScene {
  num: string;
  category: string;
  title: string;
  subtitle: string;
  description: string;
  specs: string[];
  image: string;
  link: string;
  mobilityKey: "4-Wheeler" | "2-Wheeler" | "3-Wheeler";
}

export function MobilityScrollStack() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [isReducedMotion, setIsReducedMotion] = useState<boolean>(false);

  // Exactly THREE Scenes: 4-Wheeler, 2-Wheeler, 3-Wheeler (strictly adhering to prompt)
  const scenes: MobilityScene[] = useMemo(
    () => [
      {
        num: "01",
        category: "MOBILITY ECOSYSTEM",
        title: "4-WHEELER",
        subtitle: "Passenger Cars · SUVs · Fleet Vans",
        description:
          "Equipment and solutions for automotive workshops, service centers and businesses working with cars.",
        specs: [
          "2-Post & Scissor Lifts",
          "Ceramic Brake Friction",
          "OE Diagnostic Tablets",
          "High-Pressure Fluid Tools",
        ],
        image: images.heroWorkshop,
        link: "/shop",
        mobilityKey: "4-Wheeler",
      },
      {
        num: "02",
        category: "MOBILITY ECOSYSTEM",
        title: "2-WHEELER",
        subtitle: "Motorcycles · Scooters · Fleet 2W",
        description:
          "Equipment and solutions for motorcycle and scooter workshops and businesses.",
        specs: [
          "Hydraulic Scissor Benches",
          "Pneumatic Tyre Machines",
          "ECU Scan & Tuning Consoles",
          "Specialized Service Bays",
        ],
        image: images.motoLift,
        link: "/shop",
        mobilityKey: "2-Wheeler",
      },
      {
        num: "03",
        category: "MOBILITY ECOSYSTEM",
        title: "3-WHEELER",
        subtitle: "Commercial 3W · Cargo · Auto-Rickshaw Hubs",
        description:
          "Equipment and solutions for three-wheeler workshops and mobility businesses.",
        specs: [
          "Heavy 3W Hydraulic Lifts",
          "Depot Spares Reserves",
          "Commercial Fleet Turnkey Setup",
          "High-Wear Replacement Spares",
        ],
        image: images.commercial3wHub,
        link: "/shop",
        mobilityKey: "3-Wheeler",
      },
    ],
    []
  );

  // Detect prefers-reduced-motion
  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    setIsReducedMotion(media.matches);
    const handler = (e: MediaQueryListEvent) => setIsReducedMotion(e.matches);
    media.addEventListener("change", handler);
    return () => media.removeEventListener("change", handler);
  }, []);

  // Track scroll progress within the container using requestAnimationFrame
  useEffect(() => {
    let rafId: number;
    const calculateProgress = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const scrollableDistance = containerRef.current.offsetHeight - window.innerHeight;
      if (scrollableDistance <= 0) return;

      const scrolled = -rect.top;
      const progress = Math.max(0, Math.min(1, scrolled / scrollableDistance));
      setScrollProgress(progress);
    };

    const onScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(calculateProgress);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    calculateProgress();

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  // Compute active scene number indicator
  const activeSceneIndex = useMemo(() => {
    if (scrollProgress < 0.45) return 0;
    if (scrollProgress < 0.88) return 1;
    return 2;
  }, [scrollProgress]);

  // Compute scene slide-up transitions
  // Scene 01: starts at translateY(0). When Scene 02 rises (0.05 -> 0.45), Scene 01 scales to 0.97 and darkens.
  // Scene 02: starts below (translateY(100%)). Rises from 0.05 to 0.45 to translateY(0%).
  //           When Scene 03 rises (0.50 -> 0.88), Scene 02 scales to 0.97 and darkens.
  // Scene 03: starts below (translateY(100%)). Rises from 0.50 to 0.88 to translateY(0%).
  //           Held from 0.88 to 1.00, then container releases into next section!
  const getSceneTransform = (index: number) => {
    if (isReducedMotion) {
      return {
        transform: "none",
        opacity: 1,
        zIndex: index + 1,
        darkenOpacity: 0,
      };
    }

    if (index === 0) {
      const enterPhase = Math.max(0, Math.min(1, (scrollProgress - 0.05) / 0.4));
      const eased = easeSlide(enterPhase);
      const scale = 1 - 0.03 * eased;
      const darkenOpacity = 0.4 * eased;
      return {
        transform: `translate3d(0, 0, 0) scale(${scale})`,
        opacity: 1,
        zIndex: 1,
        darkenOpacity,
      };
    }

    if (index === 1) {
      // Scene 02 rising phase: 0.05 -> 0.45
      const enterPhase = Math.max(0, Math.min(1, (scrollProgress - 0.05) / 0.4));
      const easedEnter = easeSlide(enterPhase);
      const translateY = (1 - easedEnter) * 100;

      // Scene 02 exit/cover phase as Scene 03 enters: 0.50 -> 0.88
      const exitPhase = Math.max(0, Math.min(1, (scrollProgress - 0.5) / 0.38));
      const easedExit = easeSlide(exitPhase);
      const scale = 1 - 0.03 * easedExit;
      const darkenOpacity = 0.4 * easedExit;

      return {
        transform: `translate3d(0, ${translateY}%, 0) scale(${scale})`,
        opacity: enterPhase > 0 ? 1 : 0,
        zIndex: 2,
        darkenOpacity,
      };
    }

    // Scene 03 (index === 2)
    // Rising phase: 0.50 -> 0.88
    const enterPhase = Math.max(0, Math.min(1, (scrollProgress - 0.5) / 0.38));
    const easedEnter = easeSlide(enterPhase);
    const translateY = (1 - easedEnter) * 100;

    return {
      transform: `translate3d(0, ${translateY}%, 0) scale(1)`,
      opacity: enterPhase > 0 ? 1 : 0,
      zIndex: 3,
      darkenOpacity: 0,
    };
  };

  return (
    <section
      ref={containerRef}
      id="mobility-ecosystem"
      className="relative bg-[#08090B] text-white border-b border-zinc-900"
      style={{
        // 270vh provides a comfortable, natural scroll distance per scene (~85vh) before clean release
        height: isReducedMotion ? "auto" : "270vh",
      }}
    >
      {/* ======================================================== */}
      {/* PINNED FULL-SCREEN STICKY VIEWPORT CONTAINER              */}
      {/* ======================================================== */}
      <div
        className={`${
          isReducedMotion
            ? "relative py-12"
            : "sticky top-0 h-screen h-[100svh] w-full overflow-hidden"
        }`}
      >
        {/* Subtle Top Sticky Ambient Bar */}
        <div className="absolute top-0 left-0 right-0 z-40 pointer-events-none flex items-center justify-between px-6 sm:px-12 py-6 bg-gradient-to-b from-black/80 via-black/40 to-transparent">
          <div className="flex items-center gap-3">
            <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />
            <span className="text-[10px] sm:text-xs font-mono font-bold tracking-[0.25em] uppercase text-zinc-300">
              MOBILITY ECOSYSTEM · WHAT WE SUPPLY
            </span>
          </div>

          {/* Minimal 01 / 03 Step Counter */}
          <div className="flex items-center gap-3 font-mono text-xs font-bold">
            <span className="text-white text-sm font-display tracking-wider">
              0{activeSceneIndex + 1}
            </span>
            <span className="text-zinc-600">/ 03</span>
            <div className="flex items-center gap-1.5 ml-2">
              {[0, 1, 2].map((idx) => (
                <div
                  key={idx}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    activeSceneIndex === idx
                      ? "w-6 bg-primary shadow-[0_0_8px_rgba(224,36,36,0.7)]"
                      : "w-2 bg-zinc-800"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* ======================================================== */}
        {/* 3 FULL-SCREEN SLIDING SCENES                              */}
        {/* ======================================================== */}
        <div className="relative h-full w-full">
          {scenes.map((scene, index) => {
            const transformStyle = getSceneTransform(index);

            // Composition Variations:
            // Scene 01: Image on RIGHT, Typography on LEFT
            // Scene 02: Image on LEFT, Typography on RIGHT
            // Scene 03: Asymmetric layout with large visual & bold staggered typography
            return (
              <div
                key={scene.num}
                className={`${
                  isReducedMotion
                    ? "relative min-h-[85vh] py-16"
                    : "absolute inset-0 h-full w-full"
                } flex items-center justify-center bg-[#090A0D] will-change-transform overflow-hidden`}
                style={{
                  transform: transformStyle.transform,
                  opacity: transformStyle.opacity,
                  zIndex: transformStyle.zIndex,
                }}
              >
                {/* Darkening overlay when this scene is pushed behind */}
                <div
                  className="absolute inset-0 bg-black pointer-events-none transition-opacity duration-300 z-30"
                  style={{ opacity: transformStyle.darkenOpacity }}
                />

                {/* Subtle Showroom Spotlight & Engineering Grid */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden">
                  <div
                    className={`absolute w-[700px] h-[500px] bg-primary/[0.05] blur-[150px] rounded-full ${
                      index === 1 ? "top-[30%] left-[10%]" : "top-[30%] right-[10%]"
                    }`}
                  />
                  <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.06)_1px,transparent_1px)] [background-size:36px_36px] opacity-35" />
                </div>

                {/* SCENE CONTENT CONTAINER */}
                <div className="container-page relative z-20 w-full h-full flex flex-col justify-center py-16 sm:py-20 lg:py-24">
                  {/* SCENE 01: IMAGE ON RIGHT, TYPOGRAPHY ON LEFT */}
                  {index === 0 && (
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center h-full">
                      {/* Left: Typography */}
                      <div className="lg:col-span-6 flex flex-col justify-center">
                        <div className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-[0.2em] text-primary mb-3">
                          <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                          <span>{scene.num} · {scene.category}</span>
                        </div>

                        <h2 className="font-display text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold uppercase tracking-tight text-white leading-[0.88]">
                          {scene.title}
                        </h2>

                        <p className="mt-3 text-sm sm:text-base font-mono font-semibold uppercase tracking-wider text-zinc-400">
                          {scene.subtitle}
                        </p>

                        <p className="mt-4 text-base sm:text-lg text-zinc-300 leading-relaxed font-sans max-w-xl">
                          {scene.description}
                        </p>

                        <div className="mt-6 flex flex-wrap gap-2">
                          {scene.specs.map((sp, i) => (
                            <span
                              key={i}
                              className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold text-zinc-300 bg-zinc-900/90 border border-zinc-800 px-3 py-1.5 rounded"
                            >
                              <CheckCircle2 className="h-3.5 w-3.5 text-primary" />
                              <span>{sp}</span>
                            </span>
                          ))}
                        </div>

                        <div className="mt-8 flex items-center gap-4">
                          <Link
                            to="/shop"
                            search={{ mobility: scene.mobilityKey }}
                            className="btn btn-primary h-12 px-7 text-xs font-bold uppercase tracking-wider rounded-sm shadow-xl shadow-primary/25"
                          >
                            <span>Explore 4-Wheeler Equipment</span>
                            <ArrowRight className="h-4 w-4" />
                          </Link>
                          <span className="text-xs font-mono text-zinc-500 uppercase tracking-widest hidden sm:inline-block">
                            SCROLL DOWN FOR 2-WHEELER ↓
                          </span>
                        </div>
                      </div>

                      {/* Right: High-Impact Visual Panel */}
                      <div className="lg:col-span-6 relative aspect-[16/10] sm:aspect-[16/11] lg:aspect-[4/3] rounded-xl overflow-hidden border border-zinc-800 shadow-2xl bg-zinc-950 group">
                        <img
                          src={scene.image}
                          alt={scene.title}
                          className="h-full w-full object-cover brightness-90 contrast-115 transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
                        <div className="absolute bottom-4 left-5 right-5 flex items-center justify-between text-xs font-mono">
                          <span className="text-white font-bold uppercase tracking-wider">
                            Turnkey Hydraulic Lifting Bays
                          </span>
                          <span className="text-primary font-semibold">
                            Commercial Grade →
                          </span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* SCENE 02: IMAGE ON LEFT, TYPOGRAPHY ON RIGHT */}
                  {index === 1 && (
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center h-full">
                      {/* Left: High-Impact Motorcycle Workshop Panel */}
                      <div className="lg:col-span-6 relative aspect-[16/10] sm:aspect-[16/11] lg:aspect-[4/3] rounded-xl overflow-hidden border border-zinc-800 shadow-2xl bg-zinc-950 order-2 lg:order-1 group">
                        <img
                          src={scene.image}
                          alt={scene.title}
                          className="h-full w-full object-cover brightness-90 contrast-115 transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
                        <div className="absolute bottom-4 left-5 right-5 flex items-center justify-between text-xs font-mono">
                          <span className="text-white font-bold uppercase tracking-wider">
                            Hydraulic Scissor Lift Platforms
                          </span>
                          <span className="text-primary font-semibold">
                            Motorcycle Specialists →
                          </span>
                        </div>
                      </div>

                      {/* Right: Typography */}
                      <div className="lg:col-span-6 flex flex-col justify-center order-1 lg:order-2">
                        <div className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-[0.2em] text-primary mb-3">
                          <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                          <span>{scene.num} · {scene.category}</span>
                        </div>

                        <h2 className="font-display text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold uppercase tracking-tight text-white leading-[0.88]">
                          {scene.title}
                        </h2>

                        <p className="mt-3 text-sm sm:text-base font-mono font-semibold uppercase tracking-wider text-zinc-400">
                          {scene.subtitle}
                        </p>

                        <p className="mt-4 text-base sm:text-lg text-zinc-300 leading-relaxed font-sans max-w-xl">
                          {scene.description}
                        </p>

                        <div className="mt-6 flex flex-wrap gap-2">
                          {scene.specs.map((sp, i) => (
                            <span
                              key={i}
                              className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold text-zinc-300 bg-zinc-900/90 border border-zinc-800 px-3 py-1.5 rounded"
                            >
                              <CheckCircle2 className="h-3.5 w-3.5 text-primary" />
                              <span>{sp}</span>
                            </span>
                          ))}
                        </div>

                        <div className="mt-8 flex items-center gap-4">
                          <Link
                            to="/shop"
                            search={{ mobility: scene.mobilityKey }}
                            className="btn btn-primary h-12 px-7 text-xs font-bold uppercase tracking-wider rounded-sm shadow-xl shadow-primary/25"
                          >
                            <span>Explore 2-Wheeler Equipment</span>
                            <ArrowRight className="h-4 w-4" />
                          </Link>
                          <span className="text-xs font-mono text-zinc-500 uppercase tracking-widest hidden sm:inline-block">
                            SCROLL DOWN FOR 3-WHEELER ↓
                          </span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* SCENE 03: ASYMMETRIC COMMERCIAL 3W COMPOSITION */}
                  {index === 2 && (
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center h-full">
                      {/* Left: Asymmetric Typography & Technical Scope */}
                      <div className="lg:col-span-6 flex flex-col justify-center">
                        <div className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-[0.2em] text-primary mb-3">
                          <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                          <span>{scene.num} · {scene.category}</span>
                        </div>

                        <h2 className="font-display text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold uppercase tracking-tight text-white leading-[0.88]">
                          {scene.title}
                        </h2>

                        <p className="mt-3 text-sm sm:text-base font-mono font-semibold uppercase tracking-wider text-zinc-400">
                          {scene.subtitle}
                        </p>

                        <p className="mt-4 text-base sm:text-lg text-zinc-300 leading-relaxed font-sans max-w-xl">
                          {scene.description}
                        </p>

                        <div className="mt-6 flex flex-wrap gap-2">
                          {scene.specs.map((sp, i) => (
                            <span
                              key={i}
                              className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold text-zinc-300 bg-zinc-900/90 border border-zinc-800 px-3 py-1.5 rounded"
                            >
                              <CheckCircle2 className="h-3.5 w-3.5 text-primary" />
                              <span>{sp}</span>
                            </span>
                          ))}
                        </div>

                        <div className="mt-8 flex items-center gap-4">
                          <Link
                            to="/shop"
                            search={{ mobility: scene.mobilityKey }}
                            className="btn btn-primary h-12 px-7 text-xs font-bold uppercase tracking-wider rounded-sm shadow-xl shadow-primary/25"
                          >
                            <span>Explore 3-Wheeler Equipment</span>
                            <ArrowRight className="h-4 w-4" />
                          </Link>
                          <span className="text-xs font-mono text-zinc-500 uppercase tracking-widest hidden sm:inline-block">
                            FINAL MOBILITY SCENE · SCROLL TO EXPLORE CATALOGUE ↓
                          </span>
                        </div>
                      </div>

                      {/* Right: Commercial 3-Wheeler Hub Imagery */}
                      <div className="lg:col-span-6 relative aspect-[16/10] sm:aspect-[16/11] lg:aspect-[4/3] rounded-xl overflow-hidden border border-zinc-800 shadow-2xl bg-zinc-950 group">
                        <img
                          src={scene.image}
                          alt={scene.title}
                          className="h-full w-full object-cover brightness-90 contrast-115 transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
                        <div className="absolute bottom-4 left-5 right-5 flex items-center justify-between text-xs font-mono">
                          <span className="text-white font-bold uppercase tracking-wider">
                            Commercial Cargo & Passenger Hubs
                          </span>
                          <span className="text-primary font-semibold">
                            Heavy Duty Infrastructure →
                          </span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
