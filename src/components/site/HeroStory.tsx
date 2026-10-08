import { Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { images } from "@/lib/data";

const frames = [
  { img: images.heroCar, label: "01 — Vehicle", line: "Parts. Service. Technology." },
  { img: images.brakes, label: "02 — Wheels & Brakes", line: "Genuine braking components, fitted right." },
  { img: images.engine, label: "03 — Engine & Mechanical", line: "Lubricants, filters and mechanical parts." },
  { img: images.workshop, label: "04 — Diagnostics & Service", line: "Workshops, tools and technicians ready for you." },
];

export function HeroStory() {
  const ref = useRef<HTMLElement>(null);
  const [p, setP] = useState(0);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    let raf = 0;
    const on = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const el = ref.current; if (!el) return;
        const r = el.getBoundingClientRect();
        const total = el.offsetHeight - window.innerHeight;
        setP(Math.min(1, Math.max(0, -r.top / total)));
      });
    };
    on(); window.addEventListener("scroll", on, { passive: true });
    return () => { window.removeEventListener("scroll", on); cancelAnimationFrame(raf); };
  }, []);

  const pos = p * (frames.length - 1);
  const active = Math.round(pos);

  return (
    <section ref={ref} className="relative h-[100svh] bg-ink text-ink-foreground md:h-[320vh]" aria-label="Introduction">
      <div className="sticky top-0 h-[100svh] overflow-hidden">
        {frames.map((f, i) => {
          const d = Math.abs(pos - i);
          return (
            <img key={i} src={f.img} alt="" aria-hidden={i !== 0} width={1920} height={1088}
              loading={i === 0 ? "eager" : "lazy"} fetchPriority={i === 0 ? "high" : "auto"}
              className="absolute inset-0 h-full w-full object-cover object-[70%_center] will-change-transform"
              style={{ opacity: Math.max(0, 1 - d), transform: `scale(${1.08 - Math.max(0, 1 - d) * 0.08 + (i === 0 ? p * 0.1 : 0)})` }} />
          );
        })}
        <div className="absolute inset-0 bg-hero-fade" />
        <div className="absolute inset-0 bg-bottom-fade" />

        <div className="container-page relative flex h-full flex-col justify-end pb-16 md:justify-center md:pb-0">
          <p className="eyebrow">PAGE International</p>
          <h1 className="display-xl mt-5 max-w-4xl">Everything your vehicle needs.</h1>
          <p className="mt-6 h-6 text-lg text-ink-foreground/85 transition-opacity" key={active}>
            <span className="animate-in fade-in slide-in-from-bottom-2 duration-500 inline-block">{frames[active].line}</span>
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/shop" className="btn btn-primary">Shop Parts</Link>
            <Link to="/services/book" className="btn btn-ghost-light">Book Service</Link>
          </div>
        </div>

        <div className="absolute bottom-8 right-[clamp(1rem,4vw,3rem)] hidden w-64 md:block" aria-hidden>
          <p className="mb-3 text-xs uppercase tracking-[0.2em] text-ink-muted">{frames[active].label}</p>
          <div className="flex gap-1.5">
            {frames.map((_, i) => (
              <span key={i} className="h-0.5 flex-1 bg-ink-border">
                <span className="block h-full bg-primary transition-[width] duration-150" style={{ width: `${Math.min(1, Math.max(0, pos - i + 1)) * 100}%` }} />
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
