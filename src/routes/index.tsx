import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { HeroStory } from "@/components/site/HeroStory";
import { CinematicIntro } from "@/components/site/CinematicIntro";
import { VehicleFinder } from "@/components/site/VehicleFinder";
import { ProductCard } from "@/components/site/ProductCard";
import { Chapter } from "@/components/site/PageHeader";
import { brands, centers, guides, images, products, services, solutions, taka, testimonials } from "@/lib/data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "PAGE International — Everything Your Vehicle Needs" },
      { name: "description", content: "Shop genuine automotive parts, find products for your vehicle, book professional service and locate PAGE service centers." },
      { property: "og:title", content: "PAGE International — Everything Your Vehicle Needs" },
      { property: "og:description", content: "Parts. Service. Technology. Shop, book and find a workshop in one place." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Home,
});

const pad = "px-[clamp(1rem,4vw,3rem)]";

function Home() {
  return (
    <>
      <CinematicIntro />
      <HeroStory />

      {/* 01 / THE VEHICLE */}
      <section className={`${pad} py-24 lg:py-40`}>
        <Chapter n="01" label="The vehicle" />
        <div className="mt-10 grid gap-12 lg:grid-cols-[1.6fr_1fr] lg:items-end">
          <h2 className="display-giant">Precision matters<span className="text-primary">.</span></h2>
          <p className="max-w-sm text-lg leading-relaxed text-muted-foreground">
            Every vehicle is a system of thousands of parts. We supply them, fit them and keep them running — from one brake pad to a full workshop.
          </p>
        </div>
        <nav className="mt-20 grid border-t border-foreground sm:grid-cols-2 lg:grid-cols-4" aria-label="Quick actions">
          {[
            { t: "Shop parts", to: "/shop" }, { t: "Book service", to: "/services/book" },
            { t: "Find a workshop", to: "/service-centers" }, { t: "Get a quote", to: "/support" },
          ].map((q, i) => (
            <Link key={q.t} to={q.to} className="group flex items-center justify-between border-b border-border py-6 pr-4 lg:border-b-0 lg:border-r lg:px-6 lg:first:pl-0 lg:last:border-r-0">
              <span><span className="chapter text-muted-foreground">0{i + 1}</span><span className="mt-2 block font-display text-3xl font-bold uppercase">{q.t}</span></span>
              <ArrowUpRight className="h-5 w-5 transition-all group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-primary" />
            </Link>
          ))}
        </nav>
      </section>

      {/* 02 / WHAT IT NEEDS — full-bleed */}
      <section className="relative min-h-[90svh] overflow-hidden bg-ink text-ink-foreground">
        <img src={images.brakes} alt="Brake caliper and disc close-up" loading="lazy" width={1600} height={1000} className="absolute inset-0 h-full w-full object-cover opacity-70" />
        <div className="absolute inset-0 bg-hero-fade" />
        <div className={`relative flex min-h-[90svh] flex-col justify-between ${pad} py-20`}>
          <Chapter n="02" label="What it needs" dark />
          <div>
            <h2 className="display-giant max-w-[10ch]">Everything it needs<span className="text-primary">.</span></h2>
            <div className="mt-10 flex flex-wrap gap-x-8 gap-y-3 text-sm font-semibold uppercase tracking-[0.25em] text-ink-muted">
              {["Brakes", "Batteries", "Lubricants", "Filters", "Diagnostics", "EV"].map((c) => (
                <Link key={c} to="/shop" className="transition-colors hover:text-primary">{c}</Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured products — practical commerce */}
      <section className={`${pad} py-24 lg:py-32`}>
        <div className="mb-14 flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <h2 className="display-lg max-w-[12ch]">Selected parts</h2>
          <Link to="/shop" className="link-arrow self-start sm:self-auto">View the shop <ArrowRight className="h-4 w-4" /></Link>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:gap-6 lg:grid-cols-4">
          {products.slice(0, 4).map((p) => <ProductCard key={p.slug} p={p} />)}
        </div>
      </section>

      {/* 03 / FIND THE RIGHT PART */}
      <section className="relative overflow-hidden bg-ink py-24 text-ink-foreground lg:py-40">
        <div className="layout-lines absolute inset-0" aria-hidden />
        <div className={`relative ${pad}`}>
          <Chapter n="03" label="Vehicle finder" dark />
          <div className="mt-10 grid gap-14 lg:grid-cols-[1fr_1.3fr] lg:items-end">
            <h2 className="display-giant">Find the right part<span className="text-primary">.</span></h2>
            <div>
              <p className="mb-8 max-w-md text-ink-muted">Tell us what you drive. We'll show parts that fit and save it to My Garage.</p>
              <VehicleFinder />
            </div>
          </div>
        </div>
      </section>

      {/* 04 / KEEP IT MOVING — 60/40 */}
      <section className={`${pad} py-24 lg:py-40`}>
        <Chapter n="04" label="Services" />
        <h2 className="display-giant mt-10">Keep moving<span className="text-primary">.</span></h2>
        <div className="mt-16 grid gap-14 lg:grid-cols-[1.5fr_1fr]">
          <div className="relative -ml-[clamp(1rem,4vw,3rem)] aspect-[4/3] overflow-hidden lg:aspect-auto lg:min-h-[560px]">
            <img src={images.workshop} alt="Technician running diagnostics in a PAGE workshop" loading="lazy" width={1600} height={1008} className="absolute inset-0 h-full w-full object-cover" />
          </div>
          <div>
            <ul className="border-t border-foreground">
              {services.map((s) => (
                <li key={s.slug}>
                  <Link to="/services/book" search={{ service: s.slug }} className="group flex items-baseline justify-between gap-4 border-b border-border py-4">
                    <span className="font-display text-2xl font-semibold uppercase transition-colors group-hover:text-primary">{s.name}</span>
                    <span className="shrink-0 text-xs font-semibold uppercase tracking-widest text-muted-foreground">{s.from ? `From ${taka(s.from)}` : "Quote"}</span>
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link to="/services/book" className="btn btn-primary">Book service <ArrowRight className="h-4 w-4" /></Link>
              <Link to="/services" className="link-arrow self-center">All services</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Locations — map + list */}
      <section className="border-t border-border">
        <div className="grid lg:grid-cols-[1fr_1.4fr]">
          <div className={`${pad} py-20 lg:py-28`}>
            <p className="chapter text-muted-foreground"><span className="text-primary">PAGE</span> / Locations</p>
            <h2 className="display-lg mt-6">{centers.length} service centres<span className="text-primary">.</span></h2>
            <ul className="mt-10 border-t border-foreground">
              {centers.map((c) => (
                <li key={c.id} className="flex items-center justify-between gap-4 border-b border-border py-4">
                  <span><span className="block font-semibold">{c.name}</span><span className="text-sm text-muted-foreground">{c.hours}</span></span>
                  <Link to="/services/book" search={{ center: c.id }} className="link-arrow text-[11px]">Book</Link>
                </li>
              ))}
            </ul>
            <Link to="/service-centers" className="link-arrow mt-8">Open locator <ArrowRight className="h-4 w-4" /></Link>
          </div>
          <div className="relative min-h-[420px] overflow-hidden bg-ink">
            <div className="absolute inset-0 grid-lines" aria-hidden />
            {centers.map((c) => (
              <div key={c.id} className="absolute -translate-x-1/2 -translate-y-1/2" style={{ left: `${c.x}%`, top: `${c.y}%` }}>
                <span className="relative flex h-3 w-3"><span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-50" /><span className="relative inline-flex h-3 w-3 rounded-full bg-primary" /></span>
              </div>
            ))}
            <p className="absolute bottom-5 left-5 chapter text-ink-muted">Map preview</p>
          </div>
        </div>
      </section>

      {/* 05 / BUILD THE WORKSHOP */}
      <section className="relative overflow-hidden bg-ink py-24 text-ink-foreground lg:py-40">
        <div className={pad}>
          <Chapter n="05" label="Garage solutions" dark />
          <h2 className="display-giant mt-10 max-w-[9ch]">Build your workshop<span className="text-primary">.</span></h2>
          <ol className="mt-20 border-t border-ink-border">
            {solutions.map((s, i) => (
              <li key={s.slug}>
                <Link to="/solutions" className="group grid items-baseline gap-2 border-b border-ink-border py-7 sm:grid-cols-[80px_1fr_1fr_40px]">
                  <span className="font-display text-lg text-ink-muted">0{i + 1}</span>
                  <span className="font-display text-3xl font-bold uppercase transition-colors group-hover:text-primary sm:text-5xl">{s.name}</span>
                  <span className="text-sm text-ink-muted">{s.desc}</span>
                  <ArrowUpRight className="hidden h-6 w-6 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1 sm:block" />
                </Link>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 06 / TECHNOLOGY — 40/60 with full-bleed image */}
      <section className="grid lg:grid-cols-[1fr_1.4fr]">
        <div className={`${pad} flex flex-col justify-center py-24 lg:py-32`}>
          <Chapter n="06" label="Technology" />
          <h2 className="display-giant mt-10">Think ahead<span className="text-primary">.</span></h2>
          <dl className="mt-12 grid grid-cols-3 border-t border-foreground">
            {["Diagnostics", "EV", "ADAS"].map((t) => (
              <div key={t} className="border-r border-border py-5 pr-3 last:border-r-0 [&:not(:first-child)]:pl-4">
                <dt className="font-display text-2xl font-bold uppercase sm:text-3xl">{t}</dt>
                <dd className="mt-1 text-xs uppercase tracking-widest text-muted-foreground">Capability</dd>
              </div>
            ))}
          </dl>
        </div>
        <div className="relative min-h-[60svh] overflow-hidden bg-ink">
          <img src={images.engine} alt="Engine bay detail" loading="lazy" width={1600} height={1000} className="absolute inset-0 h-full w-full object-cover" />
        </div>
      </section>

      {/* 07 / EXPERTISE */}
      <section className={`${pad} border-t border-border py-24 lg:py-40`}>
        <Chapter n="07" label="Expertise" />
        <figure className="mt-12 max-w-5xl">
          <blockquote className="font-display text-4xl font-semibold uppercase leading-[0.95] sm:text-6xl">
            “{testimonials[0]!.quote}”
          </blockquote>
          <figcaption className="mt-8 chapter text-muted-foreground">{testimonials[0]!.name} · {testimonials[0]!.city} — sample story</figcaption>
        </figure>

        <div className="mt-24 grid gap-14 lg:grid-cols-[1fr_2fr]">
          <div>
            <h3 className="display-md">Guides</h3>
            <Link to="/support" className="link-arrow mt-6">Support centre <ArrowRight className="h-4 w-4" /></Link>
          </div>
          <ul className="border-t border-foreground">
            {guides.map((g) => (
              <li key={g.slug}>
                <Link to="/support" className="group grid items-center gap-6 border-b border-border py-5 sm:grid-cols-[120px_1fr_auto]">
                  <img src={g.img} alt="" loading="lazy" width={240} height={160} className="hidden aspect-[3/2] w-full object-cover grayscale transition group-hover:grayscale-0 sm:block" />
                  <span><span className="chapter text-primary">{g.cat} · {g.mins} min</span><span className="mt-2 block text-xl font-semibold">{g.title}</span></span>
                  <ArrowUpRight className="h-5 w-5 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-24">
          <p className="chapter text-muted-foreground">Partner brands — illustrative</p>
          <div className="mt-6 flex flex-wrap gap-x-10 gap-y-4 border-t border-border pt-6">
            {brands.map((b) => (
              <span key={b} className="font-display text-2xl font-bold uppercase tracking-[0.12em] text-muted-foreground transition-colors hover:text-foreground">{b}</span>
            ))}
          </div>
        </div>
      </section>

      {/* 08 / THINK NEXT. */}
      <section className="overflow-hidden border-t border-border bg-background py-20 lg:py-28">
        <div className="px-5 sm:px-8">
          <p className="chapter text-muted-foreground"><span className="text-primary">08</span> / PAGE International Ltd.</p>
          <h2
            className="mt-5 whitespace-nowrap pb-[0.06em] font-display font-black uppercase leading-[0.86] tracking-[-0.03em] text-foreground"
            style={{ fontSize: "clamp(2.4rem, calc((100vw - 48px) / 4.3), 26rem)" }}
          >
            THINK NEXT<span className="text-primary">.</span>
          </h2>
          <div className="container-page mt-12 flex flex-wrap items-center gap-3">
            <Link to="/shop" className="btn btn-primary">Shop Parts</Link>
            <Link to="/services/book" className="btn btn-outline">Book Service</Link>
          </div>
        </div>
      </section>
    </>
  );
}
