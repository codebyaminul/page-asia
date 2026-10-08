import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Calendar,
  Clock,
  Compass,
  MapPin,
  Phone,
  ShieldCheck,
  Star,
  Wrench,
} from "lucide-react";
import { useState } from "react";
import { PageHeader } from "@/components/site/PageHeader";
import { centers, services } from "@/lib/data";

export const Route = createFileRoute("/service-centers")({
  head: () => ({
    meta: [
      { title: "Find a Service Center & Workshop Hub — PAGE International" },
      {
        name: "description",
        content: "Locate PAGE authorized service centers and partner workshops. View equipment capabilities, opening hours, and book online.",
      },
      { property: "og:title", content: "PAGE Service Center Network" },
      { property: "og:description", content: "Locate professional service hubs near you." },
    ],
  }),
  component: Centers,
});

export function Centers() {
  const [q, setQ] = useState("");
  const [svc, setSvc] = useState("");
  const [active, setActive] = useState<string | null>("tejgaon");

  const list = centers.filter(
    (c) =>
      (!q || `${c.name} ${c.address} ${c.area}`.toLowerCase().includes(q.toLowerCase())) &&
      (!svc || c.services.includes(svc))
  );

  return (
    <div className="bg-background text-foreground min-h-screen">
      <PageHeader
        eyebrow="Nationwide Network"
        title="PAGE Service Centers & Partner Workshops"
        intro="Authorized automotive service centers equipped with computerized diagnostic bays, 2-post and 4-post vehicle lifts, AC recovery stations, and certified technicians."
      >
        <div className="grid max-w-2xl gap-3 sm:grid-cols-[2fr_1.3fr]">
          <input
            aria-label="Search location"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search by area (e.g. Tejgaon, Gulshan, Uttara, Chattogram)..."
            className="field-dark text-xs sm:text-sm"
          />
          <select
            aria-label="Filter by service"
            value={svc}
            onChange={(e) => setSvc(e.target.value)}
            className="field-dark text-xs sm:text-sm"
          >
            <option value="">All Service Capabilities</option>
            {services.map((s) => (
              <option key={s.slug} value={s.name}>
                {s.name}
              </option>
            ))}
          </select>
        </div>
      </PageHeader>

      <section className="container-page py-12 lg:py-16">
        <div className="grid gap-8 lg:grid-cols-[1.1fr_1.2fr]">
          {/* Centers List */}
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-border pb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                Showing {list.length} Service Hubs
              </span>
              {(q || svc) && (
                <button
                  onClick={() => {
                    setQ("");
                    setSvc("");
                  }}
                  className="text-xs font-semibold text-primary hover:underline"
                >
                  Clear Filters
                </button>
              )}
            </div>

            {list.map((c) => {
              const isActive = active === c.id;
              return (
                <article
                  key={c.id}
                  onClick={() => setActive(c.id)}
                  className={`rounded border bg-card p-5 sm:p-6 transition-all cursor-pointer ${
                    isActive
                      ? "border-primary shadow-md ring-1 ring-primary/30"
                      : "border-border hover:border-foreground/30"
                  }`}
                >
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-widest text-primary">
                        {c.area} Region
                      </span>
                      <h2 className="font-display text-2xl font-bold uppercase text-foreground">
                        {c.name}
                      </h2>
                    </div>
                    <div className="flex items-center gap-1 text-xs font-bold text-amber-500">
                      <Star className="h-4 w-4 fill-current" />
                      <span className="text-foreground">{c.rating}</span>
                      <span className="text-muted-foreground font-normal">(40+ Reviews)</span>
                    </div>
                  </div>

                  <div className="mt-3 space-y-1.5 text-xs text-muted-foreground">
                    <p className="flex items-center gap-2">
                      <MapPin className="h-3.5 w-3.5 text-primary shrink-0" />
                      <span>{c.address}</span>
                    </p>
                    <p className="flex items-center gap-2">
                      <Clock className="h-3.5 w-3.5 text-primary shrink-0" />
                      <span>Operating Hours: {c.hours}</span>
                    </p>
                    <p className="flex items-center gap-2">
                      <Phone className="h-3.5 w-3.5 text-primary shrink-0" />
                      <span>Service Desk: +880 9612-PAGE-INTL</span>
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-border">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-2">
                      Equipped Services:
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {c.services.map((s) => (
                        <span
                          key={s}
                          className="rounded bg-secondary px-2 py-0.5 text-[11px] font-medium text-foreground"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mt-5 flex flex-wrap gap-3">
                    <Link
                      to="/services/book"
                      search={{ center: c.id }}
                      className="btn btn-primary h-9 px-4 text-xs font-bold uppercase"
                    >
                      <Calendar className="h-3.5 w-3.5" /> Book Appointment Here
                    </Link>
                    <a
                      href={`https://maps.google.com/?q=${encodeURIComponent(c.name + " " + c.address)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-outline h-9 px-3 text-xs"
                    >
                      <Compass className="h-3.5 w-3.5" /> Get Directions
                    </a>
                  </div>
                </article>
              );
            })}

            {!list.length && (
              <div className="rounded border border-dashed border-border p-12 text-center text-xs text-muted-foreground">
                <p>No service center matches your current filter.</p>
                <button
                  onClick={() => {
                    setQ("");
                    setSvc("");
                  }}
                  className="btn btn-outline mt-4 h-9 text-xs"
                >
                  Reset Location Search
                </button>
              </div>
            )}
          </div>

          {/* Interactive Geographic Map Card */}
          <div className="relative min-h-[460px] rounded border border-border bg-ink p-6 text-ink-foreground lg:sticky lg:top-28 lg:h-[calc(100vh-10rem)] overflow-hidden shadow-lg">
            <div className="grid-lines absolute inset-0 opacity-30" />

            <div className="relative z-10">
              <span className="text-[11px] font-bold uppercase tracking-wider text-primary">
                Live Hub Navigator
              </span>
              <p className="text-xs text-ink-muted mt-0.5">
                Click any service pin to highlight hub details
              </p>
            </div>

            {/* Pins */}
            {list.map((c) => {
              const isSelected = active === c.id;
              return (
                <button
                  key={c.id}
                  onClick={() => setActive(c.id)}
                  aria-label={c.name}
                  className="absolute -translate-x-1/2 -translate-y-full transition-transform hover:scale-110 group z-20"
                  style={{ left: `${c.x}%`, top: `${c.y}%` }}
                >
                  <div className="flex flex-col items-center">
                    <div
                      className={`rounded px-2 py-0.5 text-[10px] font-bold whitespace-nowrap mb-1 shadow-md transition-colors ${
                        isSelected
                          ? "bg-primary text-primary-foreground"
                          : "bg-ink-2 text-ink-foreground border border-ink-border group-hover:border-primary"
                      }`}
                    >
                      {c.name.split("—")[1]?.trim() || c.name}
                    </div>
                    <MapPin
                      className={`h-7 w-7 transition-colors ${
                        isSelected
                          ? "fill-primary text-white"
                          : "fill-ink-foreground text-ink group-hover:fill-primary"
                      }`}
                    />
                  </div>
                </button>
              );
            })}

            <div className="absolute bottom-4 left-4 right-4 z-10 rounded border border-ink-border bg-ink-2/90 p-3 text-xs text-ink-muted backdrop-blur-xs flex items-center justify-between">
              <span>National distribution: Dhaka Hubs & Chattogram Maritime Port</span>
              <span className="text-primary font-bold">4 Hubs Active</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
