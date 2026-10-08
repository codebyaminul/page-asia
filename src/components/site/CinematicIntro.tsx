import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import { images } from "@/lib/data";

const KEY = "page-intro-seen";
// Target total duration: 4.8 seconds (dissolve starts at 4.1s, unmounts at 4.8s)
const DURATION_DISSOLVE = 4100;
const DURATION_TOTAL = 4800;

function VectorCar({ className = "" }: { className?: string }) {
  return (
    <div className={`relative mx-auto ${className}`}>
      {/* Floor Contact Shadow */}
      <div className="absolute -bottom-4 inset-x-4 h-6 bg-black/90 blur-md rounded-full pointer-events-none" />
      {/* Red Floor Neon Glow Shimmer below tail lights */}
      <div className="absolute -bottom-3 inset-x-8 h-5 bg-primary/45 blur-md rounded-full pointer-events-none animate-pulse" />

      {/* Pure SVG Vector Car (Rear 3/4 Elevation) */}
      <svg
        viewBox="0 0 380 190"
        className="w-full h-auto drop-shadow-[0_20px_35px_rgba(0,0,0,0.95)]"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Metallic Body Gradient */}
          <linearGradient id="car-body" x1="190" y1="18" x2="190" y2="170" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#333842" />
            <stop offset="30%" stopColor="#1e2128" />
            <stop offset="65%" stopColor="#131519" />
            <stop offset="100%" stopColor="#0a0b0d" />
          </linearGradient>

          {/* Tinted Rear Glass with Specular Glint */}
          <linearGradient id="rear-glass" x1="110" y1="24" x2="270" y2="72" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#0c0e12" />
            <stop offset="40%" stopColor="#161c24" />
            <stop offset="48%" stopColor="#3d4d62" />
            <stop offset="56%" stopColor="#161c24" />
            <stop offset="100%" stopColor="#0a0b0e" />
          </linearGradient>

          {/* Red LED Tail Lamp Bloom */}
          <filter id="neon-tail-glow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="4" result="blur1" />
            <feGaussianBlur stdDeviation="1.5" result="blur2" />
            <feMerge>
              <feMergeNode in="blur1" />
              <feMergeNode in="blur2" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Diffuser Carbon Mesh Gradient */}
          <linearGradient id="diffuser-grad" x1="190" y1="130" x2="190" y2="175" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#181a20" />
            <stop offset="100%" stopColor="#08080a" />
          </linearGradient>

          {/* Shoulder Highlight Line */}
          <linearGradient id="shoulder-spec" x1="50" y1="88" x2="330" y2="88" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="rgba(255,255,255,0.05)" />
            <stop offset="25%" stopColor="rgba(255,255,255,0.35)" />
            <stop offset="50%" stopColor="rgba(255,255,255,0.65)" />
            <stop offset="75%" stopColor="rgba(255,255,255,0.35)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0.05)" />
          </linearGradient>
        </defs>

        {/* 1. WIDE REAR PERFORMANCE TIRES (Left & Right) */}
        {/* Left Rear Tire */}
        <path
          d="M 52 108 C 48 108 44 116 42 130 L 40 156 C 40 160 44 162 50 162 L 76 162 C 82 162 84 158 84 154 L 82 130 C 80 116 76 108 70 108 Z"
          fill="#0c0d0f"
          stroke="#1c1f24"
          strokeWidth="1.5"
        />
        <line x1="48" y1="134" x2="78" y2="134" stroke="#1f2329" strokeWidth="1.5" />
        <line x1="46" y1="144" x2="78" y2="144" stroke="#1f2329" strokeWidth="1.5" />
        <line x1="45" y1="154" x2="77" y2="154" stroke="#1f2329" strokeWidth="1.5" />

        {/* Right Rear Tire */}
        <path
          d="M 310 108 C 304 108 300 116 298 130 L 296 154 C 296 158 298 162 304 162 L 330 162 C 336 162 340 160 340 156 L 338 130 C 336 116 332 108 328 108 Z"
          fill="#0c0d0f"
          stroke="#1c1f24"
          strokeWidth="1.5"
        />
        <line x1="302" y1="134" x2="332" y2="134" stroke="#1f2329" strokeWidth="1.5" />
        <line x1="302" y1="144" x2="334" y2="144" stroke="#1f2329" strokeWidth="1.5" />
        <line x1="303" y1="154" x2="335" y2="154" stroke="#1f2329" strokeWidth="1.5" />

        {/* 2. REAR BODY & FENDERS (Muscular Aerodynamic Silhouette) */}
        <path
          d="M 135 18 
             C 152 16 228 16 245 18 
             C 260 20 286 40 296 60 
             C 304 70 324 84 334 100 
             C 344 114 346 132 344 142 
             C 342 148 338 152 330 152 
             L 302 152 
             C 294 152 290 144 288 138 
             L 282 120 
             C 278 114 268 110 252 110 
             L 128 110 
             C 112 110 102 114 98 120 
             L 92 138 
             C 90 144 86 152 78 152 
             L 50 152 
             C 42 148 36 142 36 132 
             C 38 114 56 100 66 90 
             C 76 80 94 40 104 28 
             C 114 20 122 18 135 18 Z"
          fill="url(#car-body)"
          stroke="#3d4450"
          strokeWidth="1.2"
        />

        {/* 3. GREENHOUSE / REAR WINDSHIELD */}
        <path
          d="M 142 22 
             C 158 20 222 20 238 22 
             C 252 24 274 50 278 68 
             C 264 70 208 72 190 72 
             C 172 72 116 70 102 68 
             C 106 50 128 24 142 22 Z"
          fill="url(#rear-glass)"
          stroke="#262b35"
          strokeWidth="1.5"
        />
        {/* Windshield Defroster Lines */}
        <line x1="126" y1="36" x2="254" y2="36" stroke="rgba(255,255,255,0.08)" strokeWidth="0.8" />
        <line x1="118" y1="46" x2="262" y2="46" stroke="rgba(255,255,255,0.08)" strokeWidth="0.8" />
        <line x1="110" y1="56" x2="270" y2="56" stroke="rgba(255,255,255,0.08)" strokeWidth="0.8" />

        {/* Third Brake Light (High Mounted Centered) */}
        <rect x="174" y="23" width="32" height="3" rx="1.5" fill="#e02424" filter="url(#neon-tail-glow)" />

        {/* Aerodynamic Side Mirrors (Left & Right) */}
        <path d="M 94 50 C 88 50 82 46 74 44 C 72 42 76 38 82 40 C 88 42 94 46 96 50 Z" fill="#1d2026" stroke="#3d4450" strokeWidth="1" />
        <path d="M 286 50 C 292 50 298 46 306 44 C 308 42 304 38 298 40 C 292 42 286 46 284 50 Z" fill="#1d2026" stroke="#3d4450" strokeWidth="1" />

        {/* 4. INTEGRATED REAR SPOILER / DUCKTAIL LIP */}
        <path
          d="M 92 72 C 120 68 190 67 288 72 C 296 76 292 82 284 82 C 210 78 170 78 96 82 C 88 82 84 76 92 72 Z"
          fill="#272b35"
          stroke="#495261"
          strokeWidth="1"
        />

        {/* Muscular Shoulder Highlight Crease */}
        <path d="M 68 90 C 110 82 190 81 312 90" stroke="url(#shoulder-spec)" strokeWidth="1.2" />

        {/* 5. FULL-WIDTH CONTINUOUS RED LED LIGHT BAR */}
        {/* Background Dark Lens Housing */}
        <path
          d="M 72 90 
             C 100 86 190 85 308 90 
             C 316 96 312 104 304 104 
             C 214 100 166 100 76 104 
             C 68 104 64 96 72 90 Z"
          fill="#140608"
          stroke="#420f16"
          strokeWidth="1"
        />

        {/* Outer Red Ambient Halo */}
        <path
          d="M 74 92 C 104 88 190 87 306 92 C 312 96 308 102 302 102 C 214 98 166 98 78 102 C 72 102 68 96 74 92 Z"
          fill="#941313"
          opacity="0.85"
        />

        {/* Primary Glowing Red LED Blade */}
        <path
          d="M 76 94 
             C 106 90 190 89 304 94 
             C 309 97 306 100 300 100 
             C 212 96 168 96 80 100 
             C 74 100 71 97 76 94 Z"
          fill="#ff2a2a"
          filter="url(#neon-tail-glow)"
        />

        {/* Ultra-Intense Core Filament (White/Hot-Red Beam) */}
        <path
          d="M 86 96 C 114 93 190 92 294 96"
          stroke="#ffffff"
          strokeWidth="1.8"
          strokeLinecap="round"
          opacity="0.95"
        />

        {/* Left & Right Signature Wraparound Tail Blades */}
        <path d="M 74 92 L 68 100 L 76 106" stroke="#ff2a2a" strokeWidth="2.5" strokeLinecap="round" filter="url(#neon-tail-glow)" />
        <path d="M 306 92 L 312 100 L 304 106" stroke="#ff2a2a" strokeWidth="2.5" strokeLinecap="round" filter="url(#neon-tail-glow)" />

        {/* 6. CENTER TRUNK FASCIA & BRAND BADGE INSET */}
        <polygon points="144,110 236,110 228,130 152,130" fill="#0d0e12" stroke="#1f232b" strokeWidth="1" />
        <text
          x="190"
          y="124"
          textAnchor="middle"
          fill="#ffffff"
          fontSize="9"
          fontFamily="system-ui, sans-serif"
          fontWeight="900"
          letterSpacing="0.25em"
          opacity="0.9"
        >
          PAGE
        </text>

        {/* 7. LOWER BUMPER & REAR DIFFUSER */}
        <path
          d="M 94 134 
             C 120 132 260 132 286 134 
             L 282 164 
             C 250 166 130 166 98 164 Z"
          fill="url(#diffuser-grad)"
          stroke="#292d37"
          strokeWidth="1"
        />

        {/* Vertical Aerodynamic Diffuser Strakes / Fins */}
        <line x1="140" y1="138" x2="138" y2="162" stroke="#3d4452" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="165" y1="138" x2="164" y2="162" stroke="#3d4452" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="190" y1="138" x2="190" y2="162" stroke="#e02424" strokeWidth="2.5" strokeLinecap="round" /> {/* Red center strake */}
        <line x1="215" y1="138" x2="216" y2="162" stroke="#3d4452" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="240" y1="138" x2="242" y2="162" stroke="#3d4452" strokeWidth="2.5" strokeLinecap="round" />

        {/* Dual Performance Exhaust Tailpipes */}
        <rect x="106" y="146" width="16" height="8" rx="2" fill="#050608" stroke="#4a5363" strokeWidth="1.2" />
        <ellipse cx="114" cy="150" rx="5" ry="2.5" fill="#000000" stroke="#ff4d4d" strokeWidth="0.6" />
        <rect x="258" y="146" width="16" height="8" rx="2" fill="#050608" stroke="#4a5363" strokeWidth="1.2" />
        <ellipse cx="266" cy="150" rx="5" ry="2.5" fill="#000000" stroke="#ff4d4d" strokeWidth="0.6" />
      </svg>
    </div>
  );
}

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

      {/* 5. MOVING CSS / VECTOR VEHICLE + DUAL RED LIGHT TRAILS */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-20">
        {/* Container moving forward vertically */}
        <div className="intro-vehicle-animate absolute left-1/2 top-1/2 w-[min(380px,88vw)] sm:w-[460px]">
          {/* DUAL RED LIGHT TRAILS (Stream downward from vehicle tail lamps) */}
          <div className="absolute left-[20%] top-[48%] w-2 pointer-events-none">
            <div
              className="intro-trail-animate w-full bg-gradient-to-b from-primary via-primary/60 to-transparent blur-[2px] shadow-[0_0_16px_rgba(224,36,36,1)]"
            />
          </div>
          <div className="absolute right-[20%] top-[48%] w-2 pointer-events-none">
            <div
              className="intro-trail-animate w-full bg-gradient-to-b from-primary via-primary/60 to-transparent blur-[2px] shadow-[0_0_16px_rgba(224,36,36,1)]"
            />
          </div>

          {/* Pure CSS/SVG Vector Car */}
          <VectorCar />
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
