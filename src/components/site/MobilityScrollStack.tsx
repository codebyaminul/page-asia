import { useState, useRef, useEffect, useMemo } from "react";
import { Link } from "@tanstack/react-router";
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
  id: string;
  num: string;
  title: string;
  image: string;
  link: string;
  mobilityKey: "4-Wheeler" | "2-Wheeler" | "3-Wheeler";
}

export function MobilityScrollStack() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [isReducedMotion, setIsReducedMotion] = useState<boolean>(false);

  // Exactly THREE Scenes: 4-Wheeler, 2-Wheeler, 3-Wheeler
  // Cards are kept completely clean & empty of text so a whole image can fill the card
  const scenes: MobilityScene[] = useMemo(
    () => [
      {
        id: "4-wheeler",
        num: "01",
        title: "4-WHEELER",
        image: images.heroWorkshop,
        link: "/shop",
        mobilityKey: "4-Wheeler",
      },
      {
        id: "2-wheeler",
        num: "02",
        title: "2-WHEELER",
        image: images.motoLift,
        link: "/shop",
        mobilityKey: "2-Wheeler",
      },
      {
        id: "3-wheeler",
        num: "03",
        title: "3-WHEELER",
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
        <div className="absolute top-0 left-0 right-0 z-40 pointer-events-none flex items-center justify-between px-6 sm:px-12 py-5 bg-gradient-to-b from-black/80 via-black/30 to-transparent">
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
        {/* 3 FULL-SCREEN SLIDING SCENES (EMPTY CARDS FOR WHOLE IMAGE)*/}
        {/* ======================================================== */}
        <div className="relative h-full w-full">
          {scenes.map((scene, index) => {
            const transformStyle = getSceneTransform(index);

            return (
              <div
                key={scene.num}
                className={`${
                  isReducedMotion
                    ? "relative min-h-[85vh] py-12"
                    : "absolute inset-0 h-full w-full"
                } flex items-center justify-center bg-[#08090B] will-change-transform overflow-hidden px-4 sm:px-8`}
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

                {/* Subtle Showroom Ambient Lighting */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden">
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[550px] bg-primary/[0.04] blur-[160px] rounded-full" />
                  <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.05)_1px,transparent_1px)] [background-size:36px_36px] opacity-30" />
                </div>

                {/* ======================================================== */}
                {/* THE EMPTY CARD CONTAINER: READY FOR WHOLE IMAGE          */}
                {/* ======================================================== */}
                <div className="relative z-20 w-full max-w-6xl h-[78vh] sm:h-[82vh] max-h-[820px] rounded-2xl sm:rounded-3xl overflow-hidden border border-zinc-800/80 bg-zinc-950 shadow-[0_30px_70px_-15px_rgba(0,0,0,0.85)] flex items-center justify-center group">
                  <Link
                    to={scene.link}
                    search={{ mobility: scene.mobilityKey }}
                    className="relative w-full h-full block overflow-hidden"
                  >
                    {/* The Whole Image fills the entire card edge-to-edge */}
                    <img
                      src={scene.image}
                      alt={scene.title}
                      className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-102"
                    />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
