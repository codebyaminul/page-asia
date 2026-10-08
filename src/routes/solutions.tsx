import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHeader } from "@/components/site/PageHeader";
import { solutions, images } from "@/lib/data";

export const Route = createFileRoute("/solutions")({
  head: () => ({ meta: [{ title: "Automotive Solutions — Workshops, EV, Fleet | PAGE" }, { name: "description", content: "Solutions for personal vehicles, professional and EV workshops, fleets and garage setup." }, { property: "og:title", content: "Automotive Solutions — PAGE" }, { property: "og:description", content: "More than parts: workshop, EV and fleet solutions." }] }),
  component: Solutions,
});

const imgs = [images.heroCar, images.workshop, images.engine, images.brakes, images.workshop];

function Solutions() {
  return (
    <>
      <PageHeader eyebrow="Solutions" title="Solutions for every automotive need" intro="From a single car to a full workshop, PAGE brings parts, equipment, technology and expertise together." />
      <section className="container-page space-y-px py-16">
        {solutions.map((s, i) => (
          <article key={s.slug} className={`grid items-stretch bg-card md:grid-cols-2 ${i % 2 ? "md:[&>*:first-child]:order-2" : ""}`}>
            <div className="aspect-[16/10] overflow-hidden bg-ink"><img src={imgs[i]} alt="" loading="lazy" className="h-full w-full object-cover opacity-90" /></div>
            <div className="flex flex-col justify-center border border-border p-8 lg:p-14">
              <span className="font-display text-sm text-muted-foreground">0{i + 1}</span>
              <h2 className="display-lg mt-3">{s.name}</h2>
              <p className="mt-4 text-muted-foreground">{s.desc}</p>
              <Link to="/support" className="btn btn-dark mt-8 self-start">Request a quote</Link>
            </div>
          </article>
        ))}
      </section>
    </>
  );
}
