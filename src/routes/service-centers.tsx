import { createFileRoute, Link } from "@tanstack/react-router";
import { Clock, MapPin, Star } from "lucide-react";
import { useState } from "react";
import { PageHeader } from "@/components/site/PageHeader";
import { centers, services } from "@/lib/data";

export const Route = createFileRoute("/service-centers")({
  head: () => ({
    meta: [
      { title: "Find a Service Center — PAGE" },
      { name: "description", content: "Locate PAGE service hubs and partner workshops. Filter by services, see hours and book." },
      { property: "og:title", content: "Find a PAGE Service Center" },
      { property: "og:description", content: "Service hubs and partner workshops near you." },
    ],
  }),
  component: Centers,
});

function Centers() {
  const [q, setQ] = useState("");
  const [svc, setSvc] = useState("");
  const [active, setActive] = useState<string | null>(null);
  const list = centers.filter((c) => (!q || `${c.name} ${c.address}`.toLowerCase().includes(q.toLowerCase())) && (!svc || c.services.includes(svc)));
  return (
    <>
      <PageHeader eyebrow="Locations" title="Find a service center">
        <div className="grid max-w-3xl gap-3 sm:grid-cols-[2fr_1fr]">
          <input aria-label="Search location" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search area or name" className="field-dark" />
          <select aria-label="Filter by service" value={svc} onChange={(e) => setSvc(e.target.value)} className="field-dark"><option value="">All services</option>{services.map((s) => <option key={s.slug}>{s.name}</option>)}</select>
        </div>
      </PageHeader>
      <section className="container-page grid gap-6 py-12 lg:grid-cols-[1fr_1.2fr]">
        <div className="space-y-3">
          <p className="text-sm text-muted-foreground">{list.length} locations</p>
          {list.map((c) => (
            <article key={c.id} onMouseEnter={() => setActive(c.id)} className={`border bg-card p-6 transition-colors ${active === c.id ? "border-primary" : "border-border"}`}>
              <div className="flex justify-between gap-3"><h2 className="text-xl font-semibold normal-case">{c.name}</h2><span className="flex items-center gap-1 text-sm"><Star className="h-4 w-4 fill-foreground" />{c.rating}</span></div>
              <p className="mt-2 flex items-center gap-2 text-sm text-muted-foreground"><MapPin className="h-4 w-4" />{c.address}</p>
              <p className="mt-1 flex items-center gap-2 text-sm text-muted-foreground"><Clock className="h-4 w-4" />{c.hours}</p>
              <div className="mt-4 flex flex-wrap gap-1.5">{c.services.map((s) => <span key={s} className="bg-secondary px-2 py-1 text-xs">{s}</span>)}</div>
              <Link to="/services/book" search={{ center: c.id }} className="btn btn-primary mt-5 h-10">Book here</Link>
            </article>
          ))}
          {!list.length && <p className="border border-dashed p-10 text-center text-sm text-muted-foreground">No centers match. Try another service.</p>}
        </div>
        <div className="relative min-h-96 bg-ink lg:sticky lg:top-28 lg:h-[calc(100vh-9rem)]">
          <div className="absolute inset-0 grid-lines" aria-hidden />
          {list.map((c) => (
            <button key={c.id} onClick={() => setActive(c.id)} aria-label={c.name} className="absolute -translate-x-1/2 -translate-y-full" style={{ left: `${c.x}%`, top: `${c.y}%` }}>
              <MapPin className={`h-8 w-8 ${active === c.id ? "fill-primary text-ink-foreground" : "fill-ink-foreground text-ink"}`} />
            </button>
          ))}
          <p className="absolute bottom-4 left-4 text-xs uppercase tracking-[0.2em] text-ink-muted">Map preview — live map not connected</p>
        </div>
      </section>
    </>
  );
}
