import { createFileRoute, Link } from "@tanstack/react-router";
import { Clock } from "lucide-react";
import { PageHeader } from "@/components/site/PageHeader";
import { services, taka } from "@/lib/data";

export const Route = createFileRoute("/services/")({
  head: () => ({
    meta: [
      { title: "Automotive Services — Diagnostics, AC, Brakes, EV | PAGE" },
      { name: "description", content: "General service, diagnostics, AC, brakes, wheel alignment, battery, EV and ADAS calibration. Book online." },
      { property: "og:title", content: "Professional Automotive Services — PAGE" },
      { property: "og:description", content: "Book vehicle service at a PAGE service center." },
    ],
  }),
  component: Services,
});

function Services() {
  return (
    <>
      <PageHeader eyebrow="Services" title="Professional automotive services" intro="Transparent pricing, trained technicians and documented work at PAGE service centers and partner workshops.">
        <Link to="/services/book" className="btn btn-primary">Book Service</Link>
      </PageHeader>
      <section className="container-page py-16 lg:py-24">
        <div className="grid gap-px border border-border bg-border md:grid-cols-2">
          {services.map((s, i) => (
            <article key={s.slug} className="flex flex-col bg-card p-8">
              <span className="font-display text-sm text-muted-foreground">{String(i + 1).padStart(2, "0")}</span>
              <h2 className="display-md mt-4">{s.name}</h2>
              <p className="mt-3 text-muted-foreground">{s.desc}</p>
              <div className="mt-6 flex items-center gap-6 text-sm"><span className="font-semibold">{s.from ? `From ${taka(s.from)}` : "Request quote"}</span><span className="flex items-center gap-1 text-muted-foreground"><Clock className="h-4 w-4" />{s.duration}</span></div>
              <Link to="/services/book" search={{ service: s.slug }} className="btn btn-dark mt-6 self-start">Book {s.name}</Link>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
