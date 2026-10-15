import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";
import targetSectorsWorkshopImg from "@/assets/target-sectors-workshop.jpg";

// Custom SVG Icons matching the reference image precisely
function IconWorkshop({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 9.5l9-7 9 7v10.5a1.5 1.5 0 0 1-1.5 1.5h-15A1.5 1.5 0 0 1 3 20V9.5z" />
      <path d="M9 22V12h6v10" />
      <path d="M9 15.5h6" />
      <path d="M9 18.5h6" />
    </svg>
  );
}

function IconServiceCenter({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
    </svg>
  );
}

function IconDealers({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M11 15h2l4-4-2-2-4 4-2-2-4 4 2 2 4-4" />
      <path d="M3 7l3.5 3.5a1 1 0 0 0 1.4 0l3.5-3.5a1 1 0 0 0 0-1.4L7.9 2.1a1 1 0 0 0-1.4 0L3 5.6a1 1 0 0 0 0 1.4z" />
      <path d="M13 17l2 2a1 1 0 0 0 1.4 0l4.3-4.3a1 1 0 0 0 0-1.4l-2-2" />
    </svg>
  );
}

function IconDistributors({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2" />
      <path d="M15 18H9" />
      <path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.62l-2.4-3.08A1 1 0 0 0 18.6 9H14v9z" />
      <circle cx="7" cy="18" r="2" />
      <circle cx="17" cy="18" r="2" />
    </svg>
  );
}

function IconFleets({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="15" height="11" x="2" y="6" rx="2" />
      <path d="M17 9h2.5a1 1 0 0 1 .8.4l1.9 2.6H22v4a1 1 0 0 1-1 1h-4" />
      <circle cx="6.5" cy="18" r="2" />
      <circle cx="15.5" cy="18" r="2" />
    </svg>
  );
}

const targetSectors = [
  {
    num: "01",
    title: "WORKSHOPS",
    desc: "Independent multi-brand garages",
    icon: IconWorkshop,
  },
  {
    num: "02",
    title: "SERVICE CENTERS",
    desc: "High-throughput authorized hubs",
    icon: IconServiceCenter,
  },
  {
    num: "03",
    title: "DEALERS",
    desc: "OEM dealership service networks",
    icon: IconDealers,
  },
  {
    num: "04",
    title: "DISTRIBUTORS",
    desc: "Regional wholesalers & retail stockists",
    icon: IconDistributors,
  },
  {
    num: "05",
    title: "FLEETS",
    desc: "Commercial & government fleets",
    icon: IconFleets,
  },
];

export function TargetSectorsSection() {
  // Card 03 (DEALERS) selected by default matching the reference image
  const [activeSector, setActiveSector] = useState(2);

  return (
    <section className="relative w-full bg-white border-b border-border overflow-hidden lg:h-[calc(100vh-4.5rem)] lg:min-h-[580px] lg:max-h-[780px] xl:max-h-[820px] flex items-center">
      <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch w-full h-full">
        {/* ======================================================== */}
        {/* LEFT COLUMN: WORKSHOP VISUAL & DYNAMIC RED FACET RIBBON  */}
        {/* ======================================================== */}
        <div className="lg:col-span-6 relative min-h-[340px] sm:min-h-[400px] lg:h-full overflow-hidden bg-zinc-950 flex flex-col justify-between">
          {/* Main Workshop Photography */}
          <img
            src={targetSectorsWorkshopImg}
            alt="PAGE International automotive workshop bay with elevated vehicle on lift"
            className="absolute inset-0 w-full h-full object-cover object-center"
            loading="lazy"
          />

          {/* Vignette & Contrast Gradients */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/70 pointer-events-none" />


          {/* Dynamic Aerodynamic Angled Red & White Faceted Ribbon (Center Divider) */}
          <div className="absolute right-0 top-0 bottom-0 w-24 sm:w-32 lg:w-44 pointer-events-none z-10 hidden lg:block overflow-hidden">
            <svg
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              className="h-full w-full"
            >
              {/* Outer Red Layer */}
              <polygon
                points="52,0 100,0 100,100 0,100"
                fill="#dc2626"
                opacity="0.95"
              />
              {/* Deep Red Facet */}
              <polygon
                points="72,0 100,0 100,100 32,100"
                fill="#b91c1c"
              />
              {/* Clean White Angled Cut Edge */}
              <polygon
                points="88,0 100,0 100,100 62,100"
                fill="#ffffff"
              />
            </svg>
          </div>
        </div>

        {/* ======================================================== */}
        {/* RIGHT COLUMN: HEADLINE, TARGET SECTOR CARDS & CTA        */}
        {/* ======================================================== */}
        <div className="lg:col-span-6 px-6 py-5 sm:px-8 sm:py-6 lg:px-8 xl:px-12 lg:py-4 xl:py-6 bg-white flex flex-col justify-center h-full z-10">
          {/* Header Block: Eyebrow + Massive Headline + Companion Blurb */}
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 sm:gap-5 mb-3 sm:mb-4 lg:mb-3.5">
            <div className="flex-1">
              {/* Eyebrow with horizontal line */}
              <div className="flex items-center gap-2 mb-1.5 sm:mb-2">
                <span className="text-[10.5px] sm:text-xs font-mono font-bold tracking-[0.2em] uppercase text-red-600">
                  TARGET SECTORS
                </span>
                <span className="h-[1.5px] w-10 sm:w-14 bg-red-600/80 rounded-full inline-block" />
              </div>

              {/* Massive Bold Headline (Tightened for Single-Screen Viewport Fit) */}
              <h2 className="font-display font-black text-2xl sm:text-3xl lg:text-[32px] xl:text-[36px] leading-[1.03] tracking-tight text-zinc-950 uppercase">
                BUILT FOR THE <br />
                BUSINESSES THAT <br />
                KEEP VEHICLES <br />
                <span className="text-red-600">MOVING.</span>
              </h2>
            </div>

            {/* Top Right Companion Blurb */}
            <div className="sm:max-w-[190px] md:max-w-[210px] pt-0.5 sm:pt-2">
              <p className="text-[11px] sm:text-[11.5px] text-zinc-500 leading-snug font-sans">
                Complete workshop solutions for a stronger, more efficient automotive ecosystem in Bangladesh.
              </p>
              <div className="h-[2px] w-7 bg-red-600 rounded-full mt-2" />
            </div>
          </div>

          {/* Five Interactive Target Sector Cards */}
          <div className="space-y-1.5 sm:space-y-2 mt-1 sm:mt-1.5">
            {targetSectors.map((sector, idx) => {
              const isSelected = activeSector === idx;
              const Icon = sector.icon;

              return (
                <div
                  key={sector.num}
                  onClick={() => setActiveSector(idx)}
                  onMouseEnter={() => setActiveSector(idx)}
                  className={cn(
                    "group rounded-xl sm:rounded-2xl px-4 sm:px-5 py-2 sm:py-2.5 flex items-center justify-between transition-all duration-200 cursor-pointer select-none",
                    isSelected
                      ? "bg-red-600 text-white shadow-md shadow-red-600/20 border border-red-600"
                      : "bg-white text-zinc-900 border border-zinc-200/80 hover:border-red-500/30 hover:bg-zinc-50/70"
                  )}
                >
                  <div className="flex items-center gap-3.5 sm:gap-4">
                    {/* Number */}
                    <span
                      className={cn(
                        "font-mono text-xs sm:text-[13px] font-bold tracking-wider",
                        isSelected ? "text-white" : "text-red-600"
                      )}
                    >
                      {sector.num}
                    </span>

                    {/* Icon */}
                    <div
                      className={cn(
                        "w-4.5 h-4.5 flex items-center justify-center shrink-0 transition-colors",
                        isSelected ? "text-white" : "text-zinc-800"
                      )}
                    >
                      <Icon className="w-4.5 h-4.5" />
                    </div>

                    {/* Titles */}
                    <div>
                      <h3
                        className={cn(
                          "font-display text-[11.5px] sm:text-xs font-bold uppercase tracking-wide leading-tight",
                          isSelected ? "text-white" : "text-zinc-950"
                        )}
                      >
                        {sector.title}
                      </h3>
                      <p
                        className={cn(
                          "text-[10px] sm:text-[11px] leading-tight mt-0.5 font-sans",
                          isSelected ? "text-white/90" : "text-zinc-500"
                        )}
                      >
                        {sector.desc}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Bottom Dark Solutions Bar */}
          <div className="mt-3 sm:mt-3.5 rounded-xl sm:rounded-2xl bg-zinc-950 text-white px-4 py-2.5 sm:py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 sm:gap-4 shadow-md">
            <div className="flex items-center gap-3">
              <Link
                to="/solutions"
                className="font-display text-[11px] sm:text-xs font-black uppercase tracking-wider text-white hover:text-red-400 inline-flex items-center gap-2 whitespace-nowrap cursor-pointer transition-colors"
              >
                <span>EXPLORE OUR SOLUTIONS</span>
              </Link>
              <span className="h-3.5 w-[2px] bg-red-600 hidden sm:inline-block" />
            </div>

            <p className="text-[10px] sm:text-[10.5px] text-zinc-400 font-sans leading-snug">
              From equipment supply to turnkey workshop setup, we help businesses move forward.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
