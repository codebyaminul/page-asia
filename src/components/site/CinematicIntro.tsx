import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import { images } from "@/lib/data";

const KEY = "page-intro-seen";
// Target total duration: 4.8 seconds (dissolve starts at 4.1s, unmounts at 4.8s)
const DURATION_DISSOLVE = 4100;
const DURATION_TOTAL = 4800;

/**
 * ORIGINAL "FROM THE ROAD TO THE WORKSHOP" PAGE Brand Intro
 *
 * Sequence:
 * 0.0 - 0.8s: Dark environment + distant faint red horizon glow
 * 0.8 - 1.8s: Vehicle enters from bottom center moving forward into the scene
 * 1.8 - 3.4s: Vehicle travels upward into 3D technical floor grid; red light trails;
 *             twin workshop 2-post lift posts and equipment framework emerge from darkness
 * 3.4 - 4.2s: Sequential minimal typography appears ("PAGE INTERNATIONAL" -> "AUTOMOTIVE EQUIPMENT. PARTS. WORKSHOP SOLUTIONS.")
 * 4.2 - 4.8s: PAGE logo resolves, scene smoothly dissolves directly into the homepage hero section
 */
export function CinematicIntro() {
  const [state, setState] = useState<"idle" | "play" | "out" | "done">("idle");

  useEffect(() => {
    // Check reduced motion
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Check query params for forced replay (?intro or ?replay)
    const isForced =
      typeof window !== "undefined" &&
      (window.location.search.includes("intro") || window.location.search.includes("replay"));

    // Check sessionStorage
    let seen = false;
    try {
      seen = sessionStorage.getItem(KEY) === "1";
    } catch {
      // ignore
    }

    if (prefersReduced) {
      setState("done");
      return;
    }

    if (seen && !isForced) {
      setState("done");
      return;
    }

    try {
      sessionStorage.setItem(KEY, "1");
    } catch {
      // ignore
    }

    // Attach developer replay helper
    if (typeof window !== "undefined") {
      (window as unknown as { __replayPageIntro?: () => void }).__replayPageIntro = () => {
        try {
          sessionStorage.removeItem(KEY);
        } catch {
          // ignore
        }
        window.location.href = window.location.pathname + "?intro=1";
      };
    }

    setState("play");
    document.documentElement.style.overflow = "hidden";

    const tDissolve = setTimeout(() => {
      setState("out");
    }, DURATION_DISSOLVE);

    const tDone = setTimeout(() => {
      setState("done");
      document.documentElement.style.overflow = "";
    }, DURATION_TOTAL);

    return () => {
      clearTimeout(tDissolve);
      clearTimeout(tDone);
      document.documentElement.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    if (state === "done") {
      document.documentElement.style.overflow = "";
    }
  }, [state]);

  if (state === "idle" || state === "done") return null;

  const handleSkip = () => {
    setState("out");
    setTimeout(() => {
      setState("done");
      document.documentElement.style.overflow = "";
    }, 400);
  };

  return (
    <div
      className={`fixed inset-0 z-[100] overflow-hidden bg-[#060709] text-white transition-opacity duration-700 ease-out select-none ${
        state === "out" ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
      role="presentation"
      aria-hidden
    >
      {/* 1. DISTANT HORIZON GLOW & FAINT RED SOURCE */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
        {/* Soft atmospheric red light source in the distance */}
        <div
          className="absolute top-[38%] h-32 w-full max-w-4xl bg-primary/25 blur-[90px] rounded-full"
          style={{ animation: "page-intro-horizon-glow 4.2s ease-in-out forwards" }}
        />
        {/* Faint distant laser horizon bar */}
        <div
          className="absolute top-[42%] h-[1px] w-full max-w-2xl bg-gradient-to-r from-transparent via-primary/70 to-transparent"
          style={{ animation: "page-intro-horizon-glow 4.2s ease-in-out forwards" }}
        />
      </div>

      {/* 2. BACKGROUND WORKSHOP SILHOUETTE (Emerges smoothly as vehicle approaches bay) */}
      <div
        className="intro-workshop-animate absolute inset-0 z-0 pointer-events-none"
        style={{ animationDelay: "1.4s" }}
      >
        <img
          src={images.heroWorkshop}
          alt=""
          className="h-full w-full object-cover opacity-20 filter contrast-125 brightness-75"
        />
        {/* Heavy atmospheric vignette to keep focus on technical bay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#060709] via-[#060709]/80 to-[#060709]/95" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#060709] via-transparent to-[#060709]" />
      </div>

      {/* 3. 3D TECHNICAL FLOOR GRID (Perspective Road to Workshop Bay) */}
      <div
        className="absolute inset-x-0 bottom-0 top-[32%] pointer-events-none overflow-hidden"
        style={{
          perspective: "900px",
          perspectiveOrigin: "50% 25%",
        }}
      >
        <div
          className="relative h-full w-full"
          style={{
            animation: "page-intro-floor-grid 4.2s ease-out forwards",
            transformOrigin: "50% 10%",
          }}
        >
          {/* Technical Perspective SVG Overlay */}
          <svg
            className="absolute inset-0 h-full w-full"
            viewBox="0 0 1200 800"
            preserveAspectRatio="none"
          >
            <defs>
              {/* Red laser glow filter */}
              <filter id="laser-glow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Longitudinal Perspective Lines converging to Horizon (cx: 600, cy: 60) */}
            {/* Outer boundary lines */}
            <line x1="600" y1="60" x2="50" y2="800" stroke="rgba(255,255,255,0.12)" strokeWidth="1" />
            <line x1="600" y1="60" x2="1150" y2="800" stroke="rgba(255,255,255,0.12)" strokeWidth="1" />

            {/* Mid engineering guides */}
            <line x1="600" y1="60" x2="250" y2="800" stroke="rgba(255,255,255,0.18)" strokeWidth="1" strokeDasharray="6 6" />
            <line x1="600" y1="60" x2="950" y2="800" stroke="rgba(255,255,255,0.18)" strokeWidth="1" strokeDasharray="6 6" />

            {/* Primary Tyre Laser Guide Lines (Page Red) */}
            <line
              x1="585"
              y1="60"
              x2="430"
              y2="800"
              stroke="#e02424"
              strokeWidth="2"
              strokeOpacity="0.8"
              filter="url(#laser-glow)"
            />
            <line
              x1="615"
              y1="60"
              x2="770"
              y2="800"
              stroke="#e02424"
              strokeWidth="2"
              strokeOpacity="0.8"
              filter="url(#laser-glow)"
            />

            {/* Centerline Axis with technical dash pattern */}
            <line
              x1="600"
              y1="60"
              x2="600"
              y2="800"
              stroke="#ffffff"
              strokeWidth="1.5"
              strokeOpacity="0.35"
              strokeDasharray="16 12"
            />

            {/* Transverse Calibration Floor Intervals */}
            {/* 25M Horizon mark */}
            <line x1="520" y1="120" x2="680" y2="120" stroke="rgba(255,255,255,0.3)" strokeWidth="1" />
            <text x="690" y="123" fill="rgba(255,255,255,0.4)" fontSize="9" fontFamily="monospace">BAY 01 [25M]</text>

            {/* 20M Anchor mark */}
            <line x1="450" y1="210" x2="750" y2="210" stroke="#e02424" strokeOpacity="0.5" strokeWidth="1" />
            <text x="760" y="214" fill="#e02424" fontSize="9" fontFamily="monospace">LIFT ANCHOR [20M]</text>

            {/* 15M Alignment station */}
            <line x1="360" y1="340" x2="840" y2="340" stroke="rgba(255,255,255,0.25)" strokeWidth="1" strokeDasharray="10 8" />
            <text x="850" y="344" fill="rgba(255,255,255,0.5)" fontSize="10" fontFamily="monospace">LASER ALIGN ±0.05°</text>

            {/* 10M Diagnostic checkpoint */}
            <line x1="240" y1="520" x2="960" y2="520" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
            <text x="970" y="524" fill="rgba(255,255,255,0.4)" fontSize="10" fontFamily="monospace">AXIS REF [10M]</text>

            {/* 00M Entry line */}
            <line x1="90" y1="740" x2="1110" y2="740" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />

            {/* Technical Engineering Crosshairs */}
            <g stroke="#e02424" strokeWidth="1" opacity="0.7">
              <path d="M 425 210 L 435 210 M 430 205 L 430 215" />
              <path d="M 765 210 L 775 210 M 770 205 L 770 215" />
              <path d="M 355 340 L 365 340 M 360 335 L 360 345" />
              <path d="M 835 340 L 845 340 M 840 335 L 840 345" />
            </g>
          </svg>
        </div>
      </div>

      {/* 4. WORKSHOP SILHOUETTES: 2-POST VEHICLE LIFT COLUMNS & OVERHEAD GANTRY */}
      <div
        className="intro-workshop-animate absolute inset-0 z-10 pointer-events-none flex items-center justify-center"
        style={{ animationDelay: "1.6s" }}
      >
        <div className="relative w-full max-w-5xl h-full flex items-center justify-between px-6 sm:px-12">
          {/* LEFT LIFT POST SILHOUETTE */}
          <div className="relative top-[-4%] flex flex-col items-center">
            {/* Main heavy vertical lift column */}
            <div className="w-8 sm:w-11 h-[42vh] sm:h-[48vh] bg-gradient-to-b from-[#1c1f26] via-[#121418] to-[#08090b] border border-white/20 rounded-t-sm shadow-[0_0_25px_rgba(0,0,0,0.8)] relative">
              {/* Hydraulic cylinder line */}
              <div className="absolute left-1/2 -translate-x-1/2 top-4 bottom-8 w-1.5 bg-zinc-700/60 rounded" />
              {/* Mechanical safety lock notches */}
              <div className="absolute right-1 top-10 bottom-12 flex flex-col justify-between py-2">
                {Array.from({ length: 8 }).map((_, i) => (
                  <span key={i} className="h-1 w-2 bg-white/20 rounded-xs" />
                ))}
              </div>
              {/* Lifting carriage arm knuckle */}
              <div className="absolute right-0 top-[52%] translate-x-3 w-6 sm:w-8 h-8 bg-zinc-800 border border-white/25 rounded-sm" />
              {/* Red power indicator light */}
              <div className="absolute top-3 left-2 h-2 w-2 rounded-full bg-primary shadow-[0_0_8px_rgba(224,36,36,0.9)] animate-pulse" />
              {/* Technical label */}
              <span className="hidden sm:block absolute bottom-6 left-1 text-[8px] font-mono text-zinc-500 uppercase rotate-[-90deg] origin-bottom-left">
                POST 01 · HYDRAULIC
              </span>
            </div>
            {/* Floor Anchor Baseplate */}
            <div className="w-16 sm:w-20 h-3 bg-zinc-900 border border-white/20 rounded-b" />
          </div>

          {/* OVERHEAD BRIDGING GANTRY / BAY LIGHT RIG */}
          <div className="absolute top-[28%] sm:top-[24%] inset-x-12 sm:inset-x-20 flex flex-col items-center pointer-events-none">
            <div className="w-full h-1.5 bg-gradient-to-r from-zinc-700 via-zinc-600 to-zinc-700 border-t border-white/25 shadow-sm" />
            {/* Overhead directional worklights */}
            <div className="flex justify-around w-2/3 mt-0.5">
              <span className="h-2 w-8 bg-white/40 blur-[1px] rounded shadow-[0_4px_12px_rgba(255,255,255,0.4)]" />
              <span className="h-2 w-8 bg-white/40 blur-[1px] rounded shadow-[0_4px_12px_rgba(255,255,255,0.4)]" />
            </div>
          </div>

          {/* RIGHT LIFT POST SILHOUETTE */}
          <div className="relative top-[-4%] flex flex-col items-center">
            {/* Main heavy vertical lift column */}
            <div className="w-8 sm:w-11 h-[42vh] sm:h-[48vh] bg-gradient-to-b from-[#1c1f26] via-[#121418] to-[#08090b] border border-white/20 rounded-t-sm shadow-[0_0_25px_rgba(0,0,0,0.8)] relative">
              {/* Hydraulic cylinder line */}
              <div className="absolute left-1/2 -translate-x-1/2 top-4 bottom-8 w-1.5 bg-zinc-700/60 rounded" />
              {/* Control console box */}
              <div className="absolute -left-3 sm:-left-4 top-[38%] w-5 sm:w-6 h-12 bg-zinc-800 border border-white/30 rounded-xs shadow-md p-0.5">
                <span className="block h-1.5 w-1.5 rounded-full bg-emerald-500 mb-1" />
                <span className="block h-1.5 w-1.5 rounded-full bg-primary" />
              </div>
              {/* Mechanical safety lock notches */}
              <div className="absolute left-1 top-10 bottom-12 flex flex-col justify-between py-2">
                {Array.from({ length: 8 }).map((_, i) => (
                  <span key={i} className="h-1 w-2 bg-white/20 rounded-xs" />
                ))}
              </div>
              {/* Lifting carriage arm knuckle */}
              <div className="absolute left-0 top-[52%] -translate-x-3 w-6 sm:w-8 h-8 bg-zinc-800 border border-white/25 rounded-sm" />
              {/* Yellow warning indicator light */}
              <div className="absolute top-3 right-2 h-2 w-2 rounded-full bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.8)]" />
              {/* Technical label */}
              <span className="hidden sm:block absolute bottom-6 right-1 text-[8px] font-mono text-zinc-500 uppercase rotate-90 origin-bottom-right">
                POST 02 · 4000KG
              </span>
            </div>
            {/* Floor Anchor Baseplate */}
            <div className="w-16 sm:w-20 h-3 bg-zinc-900 border border-white/20 rounded-b" />
          </div>
        </div>
      </div>

      {/* 5. MOVING REALISTIC REAR 3/4 VEHICLE + DUAL RED LIGHT TRAILS */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-20">
        {/* Container moving forward vertically */}
        <div className="intro-vehicle-animate absolute left-1/2 top-1/2 w-[min(900px,88vw)] sm:w-[min(1080px,82vw)]">
          {/* DUAL RED LIGHT TRAILS (Stream downward from vehicle tail lamps) */}
          <div className="absolute left-[36%] bottom-[28%] w-1.5 pointer-events-none">
            <div
              className="intro-trail-animate w-full bg-gradient-to-b from-primary via-primary/60 to-transparent blur-[2px] shadow-[0_0_12px_rgba(224,36,36,1)]"
            />
          </div>
          <div className="absolute right-[36%] bottom-[28%] w-1.5 pointer-events-none">
            <div
              className="intro-trail-animate w-full bg-gradient-to-b from-primary via-primary/60 to-transparent blur-[2px] shadow-[0_0_12px_rgba(224,36,36,1)]"
            />
          </div>

          {/* Vehicle Real Image (elevated rear 3/4 perspective) */}
          <div
            className="relative w-full"
            style={{
              maskImage: "radial-gradient(ellipse 90% 85% at 50% 50%, black 65%, transparent 100%)",
              WebkitMaskImage: "radial-gradient(ellipse 90% 85% at 50% 50%, black 65%, transparent 100%)",
            }}
          >
            <img
              src="/intro-vehicle.jpg"
              alt="Automotive vehicle entering workshop bay"
              className="w-full h-auto block select-none pointer-events-none filter drop-shadow-[0_20px_40px_rgba(0,0,0,0.9)]"
              draggable={false}
            />

            {/* Red LED Tail Light Intensifier */}
            <div className="absolute top-[38%] inset-x-[26%] h-6 bg-primary/40 blur-md rounded-full pointer-events-none" />
          </div>
        </div>
      </div>

      {/* 6. SEQUENTIAL TYPOGRAPHY & BRAND STATEMENT */}
      <div className="absolute inset-0 z-30 pointer-events-none flex flex-col items-center justify-center px-4">
        {/* Top Eyebrow: Appears at 2.4s */}
        <div
          className="text-center"
          style={{
            animation: "page-intro-type-reveal 0.8s cubic-bezier(0.16, 1, 0.3, 1) 2.4s forwards",
            opacity: 0,
          }}
        >
          <span className="inline-flex items-center gap-2 text-[10px] sm:text-xs font-mono font-bold uppercase tracking-[0.3em] text-white/70">
            <span className="h-1.5 w-1.5 rounded-full bg-primary shadow-[0_0_6px_rgba(224,36,36,0.9)]" />
            FROM THE ROAD TO THE WORKSHOP · PAGE INTERNATIONAL
          </span>
        </div>

        {/* Primary Headline Sequence: Appears at 3.3s */}
        <div
          className="mt-4 sm:mt-6 text-center max-w-4xl"
          style={{
            animation: "page-intro-type-reveal 0.9s cubic-bezier(0.16, 1, 0.3, 1) 3.2s forwards",
            opacity: 0,
          }}
        >
          <h2 className="font-display text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black uppercase tracking-tight text-white leading-[0.9]">
            AUTOMOTIVE EQUIPMENT. <br className="hidden sm:inline" />
            PARTS. <br className="sm:hidden" />
            <span className="text-primary drop-shadow-[0_0_24px_rgba(224,36,36,0.5)]">
              WORKSHOP SOLUTIONS.
            </span>
          </h2>
        </div>

        {/* PAGE Brand Logo Reveal: Appears at 3.9s */}
        <div
          className="mt-6 sm:mt-8"
          style={{
            animation: "page-intro-brand-logo 0.8s cubic-bezier(0.16, 1, 0.3, 1) 3.8s forwards",
            opacity: 0,
          }}
        >
          <div className="px-6 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 shadow-xl">
            <img
              src="/page logo.png"
              alt="PAGE International Ltd."
              width={160}
              height={64}
              className="h-9 sm:h-11 w-auto object-contain"
            />
          </div>
        </div>
      </div>

      {/* 7. SKIP CONTROL */}
      <button
        onClick={handleSkip}
        className="absolute bottom-6 right-6 z-50 flex items-center gap-2 rounded-full border border-white/20 bg-black/60 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.2em] text-white/70 backdrop-blur-md transition-all hover:border-white/50 hover:bg-black/90 hover:text-white"
        aria-label="Skip website opening animation"
      >
        <span>SKIP INTRO</span>
        <ArrowRight className="h-3 w-3" />
      </button>

      {/* Ambient Sound / Technical Status Bar (bottom left) */}
      <div className="hidden sm:flex absolute bottom-6 left-6 z-40 items-center gap-3 text-[10px] font-mono text-zinc-500 uppercase tracking-widest pointer-events-none">
        <span className="h-1.5 w-1.5 rounded-full bg-primary" />
        <span>B2B INFRASTRUCTURE · TEJGAON HUB</span>
      </div>
    </div>
  );
}
