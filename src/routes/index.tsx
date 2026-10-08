import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, ArrowUpRight, Building2, CalendarCheck, FileText, MapPin, ShieldCheck, Star, Wrench, Cpu, Headphones, Truck, Package } from "lucide-react";
import { HeroStory } from "@/components/site/HeroStory";
import { VehicleFinder } from "@/components/site/VehicleFinder";
import { ProductCard } from "@/components/site/ProductCard";
import { SectionTitle } from "@/components/site/PageHeader";
import { brands, centers, guides, images, products, services, solutions, taka, testimonials } from "@/lib/data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "PAGE International — Everything Your Vehicle Needs" },
      { name: "description", content: "Shop genuine automotive parts, find products for your vehicle, book professional service and locate PAGE service centers." },
      { property: "og:title", content: "PAGE International — Everything Your Vehicle Needs" },
      { property: "og:description", content: "Parts. Service. Technology. Shop, book and find a workshop in one place." },
    ],
  }),
  component: Home,
});

const quick = [
  { icon: Package, title: "Shop Parts", desc: "Browse genuine parts and accessories.", to: "/shop", cta: "Browse" },
  { icon: CalendarCheck, title: "Book Service", desc: "Pick a service, a centre and a time.", to: "/services/book", cta: "Book now" },
  { icon: MapPin, title: "Find a Workshop", desc: "Service centres and partner workshops.", to: "/service-centers", cta: "Locate" },
  { icon: FileText, title: "Get a Quote", desc: "For fleets, workshops and equipment.", to: "/support", cta: "Request" },
] as const;

const why = [
  { icon: ShieldCheck, t: "Genuine Products", d: "Sourced through authorised distribution." },
  { icon: Wrench, t: "Professional Service", d: "Trained technicians and documented work." },
  { icon: Cpu, t: "Technical Expertise", d: "Diagnostics, ADAS and EV capability." },
  { icon: Headphones, t: "Customer Support", d: "Real people for orders and bookings." },
  { icon: Building2, t: "Workshop Solutions", d: "Equipment and setup for garages." },
  { icon: Truck, t: "Reliable Distribution", d: "Nationwide parts supply network." },
];

function Home() {
  return (
    <>
      <HeroStory />

      {/* Quick actions */}
      <section className="container-page py-20 lg:py-28">
        <SectionTitle eyebrow="Start here" title="What do you need today?" />
        <div className="grid grid-cols-2 gap-px border border-border bg-border lg:grid-cols-4">
          {quick.map((q) => (
            <Link key={q.title} to={q.to} className="group flex flex-col bg-card p-5 transition-colors hover:bg-ink hover:text-ink-foreground sm:p-8">
              <q.icon className="h-7 w-7 text-primary" strokeWidth={1.5} />
              <h3 className="display-md mt-8 sm:mt-14">{q.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground group-hover:text-ink-muted">{q.desc}</p>
              <span className="mt-6 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em]">{q.cta} <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></span>
            </Link>
          ))}
        </div>
      </section>

      {/* Vehicle finder */}
      <section className="relative overflow-hidden bg-ink py-20 text-ink-foreground lg:py-28">
        <div className="absolute inset-0 grid-lines opacity-50" aria-hidden />
        <div className="container-page relative">
          <p className="eyebrow">Vehicle finder</p>
          <h2 className="display-lg mt-4 max-w-3xl">Find products for your vehicle</h2>
          <p className="mt-4 max-w-xl text-ink-muted">Tell us what you drive. We'll show parts that fit and save your vehicle to My Garage.</p>
          <div className="mt-10"><VehicleFinder /></div>
        </div>
      </section>

      {/* Featured products */}
      <section className="container-page py-20 lg:py-28">
        <SectionTitle eyebrow="Shop" title="Featured products" action={<Link to="/shop" className="btn btn-outline h-11">View all</Link>} />
        <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
          {products.slice(0, 4).map((p) => <ProductCard key={p.slug} p={p} />)}
        </div>
      </section>

      {/* Services */}
      <section className="bg-secondary py-20 lg:py-28">
        <div className="container-page">
          <SectionTitle eyebrow="Services" title="Professional automotive services" action={<Link to="/services" className="btn btn-outline h-11">All services</Link>} />
          <div className="grid gap-5 lg:grid-cols-[1.1fr_2fr]">
            <div className="relative min-h-80 overflow-hidden bg-ink">
              <img src={images.workshop} alt="Technician running diagnostics in a PAGE workshop" loading="lazy" width={1600} height={1008} className="absolute inset-0 h-full w-full object-cover opacity-80" />
              <div className="absolute inset-0 bg-bottom-fade" />
              <div className="absolute bottom-0 p-8 text-ink-foreground">
                <h3 className="display-md">Book in under a minute</h3>
                <Link to="/services/book" className="btn btn-primary mt-5">Book Service</Link>
              </div>
            </div>
            <div className="grid gap-px border border-border bg-border sm:grid-cols-2">
              {services.map((s) => (
                <div key={s.slug} className="flex items-start justify-between gap-4 bg-card p-5">
                  <div>
                    <h3 className="text-xl font-semibold">{s.name}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">{s.desc}</p>
                    <p className="mt-3 text-xs font-semibold uppercase tracking-widest">{s.from ? `From ${taka(s.from)}` : "Request quote"}</p>
                  </div>
                  <Link to="/services/book" search={{ service: s.slug }} aria-label={`Book ${s.name}`} className="grid h-10 w-10 shrink-0 place-items-center border border-border hover:border-primary hover:bg-primary hover:text-primary-foreground"><ArrowUpRight className="h-4 w-4" /></Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Workshop locator */}
      <section className="container-page py-20 lg:py-28">
        <SectionTitle eyebrow="Locations" title="Find a service center" action={<Link to="/service-centers" className="btn btn-outline h-11">Open locator</Link>} />
        <div className="grid gap-5 lg:grid-cols-[1.4fr_1fr]">
          <div className="relative aspect-[4/3] overflow-hidden bg-ink lg:aspect-auto">
            <div className="absolute inset-0 grid-lines" aria-hidden />
            {centers.map((c) => (
              <div key={c.id} className="absolute -translate-x-1/2 -translate-y-1/2" style={{ left: `${c.x}%`, top: `${c.y}%` }}>
                <span className="relative flex h-4 w-4"><span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-50" /><span className="relative inline-flex h-4 w-4 rounded-full border-2 border-ink-foreground bg-primary" /></span>
              </div>
            ))}
            <p className="absolute bottom-4 left-4 text-xs uppercase tracking-[0.2em] text-ink-muted">Map preview</p>
          </div>
          <div className="space-y-3">
            {centers.slice(0, 3).map((c) => (
              <div key={c.id} className="border border-border bg-card p-5">
                <div className="flex justify-between gap-4"><h3 className="text-lg font-semibold normal-case">{c.name}</h3><span className="flex items-center gap-1 text-sm"><Star className="h-4 w-4 fill-foreground" />{c.rating}</span></div>
                <p className="mt-1 text-sm text-muted-foreground">{c.address} · {c.hours}</p>
                <div className="mt-4 flex gap-2"><Link to="/services/book" search={{ center: c.id }} className="btn btn-primary h-9 px-4 text-[11px]">Book here</Link><Link to="/service-centers" className="btn btn-outline h-9 px-4 text-[11px]">View center</Link></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Solutions */}
      <section className="bg-ink py-20 text-ink-foreground lg:py-28">
        <div className="container-page">
          <p className="eyebrow">Solutions</p>
          <h2 className="display-lg mt-4 max-w-3xl">Solutions for every automotive need</h2>
          <div className="mt-12 grid gap-px bg-ink-border sm:grid-cols-2 lg:grid-cols-5">
            {solutions.map((s, i) => (
              <Link key={s.slug} to="/solutions" className="group flex min-h-64 flex-col bg-ink p-6 transition-colors hover:bg-ink-2">
                <span className="font-display text-sm text-ink-muted">0{i + 1}</span>
                <h3 className="display-md mt-auto">{s.name}</h3>
                <p className="mt-3 text-sm text-ink-muted">{s.desc}</p>
                <span className="mt-5 h-0.5 w-8 bg-primary transition-all group-hover:w-16" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Why PAGE */}
      <section className="container-page py-20 lg:py-28">
        <SectionTitle eyebrow="Why PAGE" title="Built on trust and technical depth" />
        <div className="grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {why.map((w) => (
            <div key={w.t} className="border-t-2 border-foreground pt-6">
              <w.icon className="h-6 w-6 text-primary" strokeWidth={1.5} />
              <h3 className="mt-4 text-2xl font-semibold">{w.t}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{w.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Brands */}
      <section className="border-y border-border py-14">
        <div className="container-page">
          <p className="mb-8 text-center text-xs font-semibold uppercase tracking-[0.25em] text-muted-foreground">Partner brands (illustrative)</p>
          <div className="flex snap-x gap-px overflow-x-auto bg-border lg:grid lg:grid-cols-5">
            {brands.map((b) => (
              <div key={b} className="grid h-24 min-w-40 snap-start place-items-center bg-background font-display text-2xl font-bold uppercase tracking-[0.15em] text-muted-foreground transition-colors hover:text-foreground">{b}</div>
            ))}
          </div>
        </div>
      </section>

      {/* Guides */}
      <section className="container-page py-20 lg:py-28">
        <SectionTitle eyebrow="Guides" title="Automotive guides" action={<Link to="/support" className="btn btn-outline h-11">All guides</Link>} />
        <div className="grid gap-6 md:grid-cols-3">
          {guides.map((g) => (
            <article key={g.slug} className="group">
              <div className="aspect-[4/3] overflow-hidden bg-muted"><img src={g.img} alt="" loading="lazy" width={1200} height={900} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" /></div>
              <p className="mt-5 text-xs font-semibold uppercase tracking-[0.18em] text-primary">{g.cat} · {g.mins} min read</p>
              <h3 className="mt-2 text-2xl font-semibold">{g.title}</h3>
              <Link to="/support" className="mt-4 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] hover:text-primary">Read article <ArrowRight className="h-4 w-4" /></Link>
            </article>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-secondary py-20 lg:py-28">
        <div className="container-page">
          <SectionTitle eyebrow="Customer stories — sample data" title="Trusted on the road" />
          <div className="grid gap-5 md:grid-cols-3">
            {testimonials.map((t) => (
              <figure key={t.name} className="flex flex-col border border-border bg-card p-7">
                <div className="flex gap-0.5">{Array.from({ length: 5 }).map((_, i) => <Star key={i} className={`h-4 w-4 ${i < t.rating ? "fill-primary text-primary" : "text-border"}`} />)}</div>
                <blockquote className="mt-5 flex-1 text-lg leading-relaxed">“{t.quote}”</blockquote>
                <figcaption className="mt-6 border-t border-border pt-4 text-sm"><span className="font-semibold">{t.name}</span> · {t.city}<p className="text-xs text-muted-foreground">{t.ctx}</p></figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA — oversized one-line wordmark band */}
      <section className="overflow-hidden border-t border-border bg-background py-20 lg:py-28">
        <div className="px-5 sm:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">PAGE International Ltd.</p>
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
