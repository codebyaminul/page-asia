import { useState, useRef, useEffect } from "react";
import { Link } from "@tanstack/react-router";
import { images } from "@/lib/data";

export interface MobilityScene {
  id: string;
  num: string;
  title: string;
  image: string;
  link: string;
  mobilityKey: "4-Wheeler" | "2-Wheeler" | "3-Wheeler";
}

export function MobilityScrollStack() {
  const [activeScene, setActiveScene] = useState<number>(0);
  const [isReducedMotion, setIsReducedMotion] = useState<boolean>(false);
  const scene1Ref = useRef<HTMLDivElement>(null);
  const scene2Ref = useRef<HTMLDivElement>(null);
  const scene3Ref = useRef<HTMLDivElement>(null);

  // Exactly THREE Scenes: 4-Wheeler, 2-Wheeler, 3-Wheeler
  // Each card covers the whole page (100vw x 100vh) edge-to-edge
  const scenes: MobilityScene[] = [
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
  ];

  // Detect prefers-reduced-motion
  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    setIsReducedMotion(media.matches);
    const handler = (e: MediaQueryListEvent) => setIsReducedMotion(e.matches);
    media.addEventListener("change", handler);
    return () => media.removeEventListener("change", handler);
  }, []);

  // Update active HUD counter (01/03, 02/03, 03/03) using IntersectionObserver
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.getAttribute("data-index"));
            if (!isNaN(index)) {
              setActiveScene(index);
            }
          }
        });
      },
      {
        threshold: 0.5,
      }
    );

    const refs = [scene1Ref.current, scene2Ref.current, scene3Ref.current];
    refs.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="mobility-ecosystem"
      className="relative w-full bg-black text-white border-b border-zinc-900"
    >
      {/* ======================================================== */}
      {/* STICKY TOP HUD OVERLAY (FLOATS AT TOP FOR ALL 3 SCENES)   */}
      {/* ======================================================== */}
      <div className="sticky top-0 z-40 h-0 overflow-visible pointer-events-none">
        <div className="flex items-center justify-between px-6 sm:px-12 py-5 bg-gradient-to-b from-black/90 via-black/40 to-transparent">
          <div className="flex items-center gap-3">
            <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />
            <span className="text-[10px] sm:text-xs font-mono font-bold tracking-[0.25em] uppercase text-zinc-300">
              MOBILITY ECOSYSTEM · WHAT WE SUPPLY
            </span>
          </div>

          {/* Minimal 01 / 03 Step Counter */}
          <div className="flex items-center gap-3 font-mono text-xs font-bold">
            <span className="text-white text-sm font-display tracking-wider">
              0{activeScene + 1}
            </span>
            <span className="text-zinc-600">/ 03</span>
            <div className="flex items-center gap-1.5 ml-2">
              {[0, 1, 2].map((idx) => (
                <div
                  key={idx}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    activeScene === idx
                      ? "w-6 bg-primary shadow-[0_0_8px_rgba(224,36,36,0.7)]"
                      : "w-2 bg-zinc-800"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ======================================================== */}
      {/* SCENE 01: 4-WHEELER (STICKY BASE LAYER)                   */}
      {/* ======================================================== */}
      <div
        ref={scene1Ref}
        data-index="0"
        className={`${
          isReducedMotion
            ? "relative min-h-screen"
            : "sticky top-0 h-screen h-[100svh]"
        } w-full z-10 overflow-hidden bg-black`}
      >
        <Link
          to={scenes[0].link}
          search={{ mobility: scenes[0].mobilityKey }}
          className="relative w-full h-full block cursor-pointer overflow-hidden group"
        >
          {/* Whole Image Covers Whole Page */}
          <img
            src={scenes[0].image}
            alt="01 - 4-WHEELER"
            className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-102"
          />
        </Link>
      </div>

      {/* ======================================================== */}
      {/* SCENE 02: 2-WHEELER (SLIDES UP AND OVERLAPS SCENE 01)     */}
      {/* ======================================================== */}
      <div
        ref={scene2Ref}
        data-index="1"
        className={`${
          isReducedMotion
            ? "relative min-h-screen"
            : "sticky top-0 h-screen h-[100svh]"
        } w-full z-20 overflow-hidden bg-black shadow-[0_-35px_80px_rgba(0,0,0,0.95)]`}
      >
        <Link
          to={scenes[1].link}
          search={{ mobility: scenes[1].mobilityKey }}
          className="relative w-full h-full block cursor-pointer overflow-hidden group"
        >
          {/* Whole Image Covers Whole Page */}
          <img
            src={scenes[1].image}
            alt="02 - 2-WHEELER"
            className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-102"
          />
        </Link>
      </div>

      {/* ======================================================== */}
      {/* SCENE 03: 3-WHEELER (SLIDES UP AND OVERLAPS SCENE 02)     */}
      {/* ======================================================== */}
      <div
        ref={scene3Ref}
        data-index="2"
        className={`${
          isReducedMotion
            ? "relative min-h-screen"
            : "sticky top-0 h-screen h-[100svh]"
        } w-full z-30 overflow-hidden bg-black shadow-[0_-35px_80px_rgba(0,0,0,0.95)]`}
      >
        <Link
          to={scenes[2].link}
          search={{ mobility: scenes[2].mobilityKey }}
          className="relative w-full h-full block cursor-pointer overflow-hidden group"
        >
          {/* Whole Image Covers Whole Page */}
          <img
            src={scenes[2].image}
            alt="03 - 3-WHEELER"
            className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-102"
          />
        </Link>
      </div>
    </section>
  );
}
