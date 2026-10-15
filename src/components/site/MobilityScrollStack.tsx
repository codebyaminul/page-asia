import { useState, useEffect, useCallback } from "react";
import { Link } from "@tanstack/react-router";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export interface MobilityScene {
  id: string;
  image: string;
  link: string;
  mobilityKey: "4-Wheeler" | "2-Wheeler" | "3-Wheeler";
  alt: string;
  bgColor?: string;
}

export function MobilityScrollStack() {
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  const scenes: MobilityScene[] = [
    {
      id: "4-wheeler",
      alt: "4-Wheeler Mobility Showcase — Fuel Efficiency",
      image: encodeURI("/Fuel Efficiency Highway Showcase.png"),
      link: "/shop",
      mobilityKey: "4-Wheeler",
      bgColor: "bg-gradient-to-r from-amber-950/40 via-zinc-950 to-sky-950/40",
    },
    {
      id: "2-wheeler",
      alt: "2-Wheeler Mobility Showcase — Automotive Diagnostics",
      image: encodeURI("/Futuristic Automotive Diagnostics Showcase.png"),
      link: "/shop",
      mobilityKey: "2-Wheeler",
      bgColor: "bg-zinc-900",
    },
    {
      id: "3-wheeler",
      alt: "3-Wheeler Mobility Showcase — Two-Post Lift 4.0 Ton",
      image: encodeURI("/Page Two-Post Lift 4.0 Ton.png"),
      link: "/shop",
      mobilityKey: "3-Wheeler",
      bgColor: "bg-white",
    },
  ];

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % scenes.length);
  }, [scenes.length]);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + scenes.length) % scenes.length);
  }, [scenes.length]);

  // 5-second automatic slider interval
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(timer);
  }, [isPaused, nextSlide, currentSlide]);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null) return;
    const diff = touchStartX - e.changedTouches[0].clientX;
    if (diff > 50) {
      nextSlide();
    } else if (diff < -50) {
      prevSlide();
    }
    setTouchStartX(null);
  };

  return (
    <div id="mobility-ecosystem" className="w-full">
      {/* Boxed E-commerce Ad Banner (Aspect ratio exactly matches First Image: 2100 / 654 = 3.21:1) */}
      <div
        className="relative w-full aspect-[2100/654] overflow-hidden group select-none rounded-2xl sm:rounded-3xl shadow-[0_20px_50px_-15px_rgba(0,0,0,0.12)] border border-zinc-200/90 bg-white"
        style={{ aspectRatio: "2100 / 654" }}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* Horizontal Slider Track */}
        <div
          className="flex w-full h-full transition-transform duration-700 ease-in-out"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {scenes.map((scene) => (
            <div
              key={scene.id}
              className={cn(
                "w-full h-full shrink-0 relative overflow-hidden flex items-center justify-center",
                scene.bgColor || "bg-white"
              )}
            >
              <Link
                to={scene.link}
                search={{ mobility: scene.mobilityKey }}
                className="relative w-full h-full block cursor-pointer group/link overflow-hidden"
              >
                {/* Ambient Blurred Backdrop to gracefully fill any aspect ratio gaps */}
                <img
                  src={scene.image}
                  alt=""
                  aria-hidden="true"
                  className="absolute inset-0 w-full h-full object-cover blur-2xl opacity-25 scale-105 pointer-events-none"
                />

                {/* Main Showcase Image - object-contain ensures 100% complete visibility with zero cutoff */}
                <img
                  src={scene.image}
                  alt={scene.alt}
                  className="relative z-10 w-full h-full object-contain object-center transition-transform duration-700 ease-out group-hover/link:scale-[1.01]"
                />
              </Link>
            </div>
          ))}
        </div>

        {/* Previous Slide Arrow Button */}
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            prevSlide();
          }}
          aria-label="Previous Slide"
          className="absolute left-3 sm:left-5 top-1/2 -translate-y-1/2 z-20 h-9 w-9 sm:h-11 sm:w-11 rounded-full bg-white/85 hover:bg-white text-zinc-900 border border-zinc-200 shadow-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all hover:scale-105 cursor-pointer backdrop-blur-xs"
        >
          <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6" />
        </button>

        {/* Next Slide Arrow Button */}
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            nextSlide();
          }}
          aria-label="Next Slide"
          className="absolute right-3 sm:right-5 top-1/2 -translate-y-1/2 z-20 h-9 w-9 sm:h-11 sm:w-11 rounded-full bg-white/85 hover:bg-white text-zinc-900 border border-zinc-200 shadow-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all hover:scale-105 cursor-pointer backdrop-blur-xs"
        >
          <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6" />
        </button>

        {/* Slide Pagination Indicator Dots */}
        <div className="absolute bottom-3 sm:bottom-4 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/30 backdrop-blur-sm border border-white/20">
          {scenes.map((scene, idx) => (
            <button
              key={scene.id}
              type="button"
              onClick={() => setCurrentSlide(idx)}
              aria-label={`Go to slide ${idx + 1}`}
              className={cn(
                "h-2 rounded-full transition-all cursor-pointer",
                currentSlide === idx
                  ? "w-6 bg-red-600 shadow-xs"
                  : "w-2 bg-white/60 hover:bg-white"
              )}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
