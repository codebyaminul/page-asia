import { useEffect, useState } from "react";
import { images } from "@/lib/data";

const KEY = "page-intro-seen";
const DURATION = 5600;

/** Signature opening: darkness → vehicle emerges → headlights → red sweep → light beams become layout lines → brand. */
export function CinematicIntro() {
  const [state, setState] = useState<"idle" | "play" | "out" | "done">("idle");

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let seen = false;
    try { seen = sessionStorage.getItem(KEY) === "1"; } catch { /* ignore */ }
    if (reduce || seen) { setState("done"); return; }
    try { sessionStorage.setItem(KEY, "1"); } catch { /* ignore */ }
    setState("play");
    document.documentElement.style.overflow = "hidden";
    const t1 = setTimeout(() => setState("out"), DURATION);
    const t2 = setTimeout(() => setState("done"), DURATION + 700);
    return () => { clearTimeout(t1); clearTimeout(t2); document.documentElement.style.overflow = ""; };
  }, []);

  useEffect(() => { if (state === "done") document.documentElement.style.overflow = ""; }, [state]);

  if (state === "idle" || state === "done") return null;

  const skip = () => { setState("out"); setTimeout(() => setState("done"), 600); };

  return (
    <div
      className={`fixed inset-0 z-[100] overflow-hidden bg-ink text-ink-foreground transition-opacity duration-700 ${state === "out" ? "opacity-0" : "opacity-100"}`}
      role="presentation"
      aria-hidden
    >
      {/* floor */}
      <div className="intro-floor absolute inset-x-0 bottom-0 h-[38%]" />

      {/* vehicle */}
      <div className="intro-car absolute inset-x-0 bottom-[6%] mx-auto w-[min(1200px,120vw)]">
        <img src={images.heroCar} alt="" className="block w-full" width={1920} height={1088} />
        <span className="intro-headlight absolute left-[22%] top-[52%]" />
        <span className="intro-headlight absolute left-[44%] top-[54%]" />
        <span className="intro-sweep absolute inset-0" />
      </div>

      {/* light beams → layout lines */}
      <div className="absolute inset-0 grid grid-cols-6 px-[clamp(1rem,4vw,3rem)]">
        {Array.from({ length: 6 }).map((_, i) => (
          <span key={i} className="intro-beam relative border-l border-ink-border" style={{ animationDelay: `${2.4 + i * 0.08}s` }} />
        ))}
      </div>

      {/* brand */}
      <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 px-[clamp(1rem,4vw,3rem)]">
        <p className="intro-eyebrow eyebrow">PAGE International Ltd.</p>
        <p className="intro-word mt-4 whitespace-nowrap font-display font-black uppercase leading-[0.85] tracking-[-0.03em]" style={{ fontSize: "clamp(2.4rem, calc((100vw - 48px) / 4.3), 22rem)" }}>
          THINK NEXT<span className="text-primary">.</span>
        </p>
      </div>

      <button onClick={skip} className="absolute bottom-6 right-6 z-10 text-xs font-semibold uppercase tracking-[0.25em] text-ink-muted transition-colors hover:text-ink-foreground">
        Skip intro →
      </button>
    </div>
  );
}
