import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Award,
  Building2,
  CheckCircle2,
  Compass,
  MapPin,
  ShieldCheck,
  Truck,
  Users,
  Wrench,
} from "lucide-react";
import { PageHeader } from "@/components/site/PageHeader";
import { brands, images } from "@/lib/data";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About PAGE International Ltd. — Automotive Equipment & Parts" },
      {
        name: "description",
        content: "PAGE International Ltd. is a premier distributor and provider of automotive spare parts, commercial garage workshop equipment, electronic diagnostics, and vehicle servicing solutions.",
      },
      { property: "og:title", content: "About PAGE International Ltd." },
      { property: "og:description", content: "Automotive parts, garage equipment and workshop solutions." },
    ],
  }),
  component: About,
});

export function About() {
  return (
    <div className="bg-background text-foreground min-h-screen">
      <PageHeader
        eyebrow="Company Profile"
        title="About PAGE International Ltd."
        intro="A specialized automotive trading, distribution, and workshop engineering company providing commercial vehicle lifts, diagnostic technology, and genuine spare parts."
      />

      {/* Main Profile Story */}
      <section className="container-page py-16 lg:py-24">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div className="relative aspect-[4/3] overflow-hidden rounded border border-border shadow-md">
            <img
              src={images.heroWorkshop}
              alt="PAGE International commercial automotive workshop"
              loading="lazy"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 text-white">
              <p className="font-display text-xl font-bold uppercase">Tejgaon Central Hub & Showroom</p>
              <p className="text-xs text-white/80">Automotive machinery testing bay & parts warehouse</p>
            </div>
          </div>

          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-primary">
              Engineering Reliability
            </span>
            <h2 className="display-lg mt-2 text-foreground font-bold">
              AN AUTOMOTIVE ECOSYSTEM FOR PROFESSIONALS
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              PAGE International Ltd. operates at the intersection of automotive distribution, garage equipment engineering, and technical vehicle maintenance. We solve the critical bottleneck faced by workshops, fleet managers, and car owners: access to certified, genuine components and heavy-duty workshop machinery with direct manufacturer backing.
            </p>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Headquartered in Dhaka with distribution operations reaching across Chattogram and major regional transport corridors, we supply commercial lifts, computerized balancers, pneumatic tyre machinery, and OEM replacement spares.
            </p>

            <div className="mt-8 grid grid-cols-2 gap-4 border-t border-border pt-6">
              <div>
                <span className="font-display text-3xl font-bold text-primary">10,000+</span>
                <p className="text-xs text-muted-foreground font-medium">Spares Sourced in Stock</p>
              </div>
              <div>
                <span className="font-display text-3xl font-bold text-primary">4 HUBS</span>
                <p className="text-xs text-muted-foreground font-medium">Service Centers & Warehouses</p>
              </div>
              <div>
                <span className="font-display text-3xl font-bold text-primary">50+</span>
                <p className="text-xs text-muted-foreground font-medium">Technicians & Engineers</p>
              </div>
              <div>
                <span className="font-display text-3xl font-bold text-primary">100%</span>
                <p className="text-xs text-muted-foreground font-medium">Genuine Parts Guarantee</p>
              </div>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/shop" className="btn btn-primary h-11 px-6 text-xs font-bold uppercase">
                Explore Product Catalog
              </Link>
              <Link to="/solutions" className="btn btn-outline h-11 px-6 text-xs font-bold uppercase">
                Workshop & Fleet Solutions
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 4 Pillars of Operation */}
      <section className="bg-secondary/60 py-16 border-y border-border">
        <div className="container-page">
          <div className="text-center max-w-xl mx-auto mb-12">
            <p className="eyebrow">Core Capabilities</p>
            <h2 className="display-md mt-1 text-foreground">FOUR OPERATING PILLARS</h2>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                icon: Wrench,
                title: "Garage Equipment",
                desc: "Certified 2-post and scissor lifts, automatic tyre changers, digital balancers, and rotary screw compressors.",
              },
              {
                icon: ShieldCheck,
                title: "Genuine Auto Spares",
                desc: "Low-dust ceramic brake pads, AGM/EFB batteries, full synthetic lubricants, and high-flow air/oil filtration.",
              },
              {
                icon: Award,
                title: "Diagnostics & ADAS",
                desc: "OE-level electronic scan tablets, sensor calibration targets, and EV battery testing platforms.",
              },
              {
                icon: Building2,
                title: "Service Hubs",
                desc: "Multipoint vehicle inspection, scheduled servicing, AC gas recharge, and laser alignment by certified mechanics.",
              },
            ].map((p) => (
              <div key={p.title} className="rounded border border-border bg-card p-6">
                <span className="grid h-10 w-10 place-items-center rounded bg-primary/10 text-primary mb-4">
                  <p.icon className="h-5 w-5" />
                </span>
                <h3 className="font-display text-xl font-bold uppercase text-foreground">
                  {p.title}
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                  {p.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Brand Partners */}
      <section className="py-16 container-page">
        <p className="text-center text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground mb-6">
          Distribution & Partner Brands
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-5 lg:grid-cols-10 gap-2">
          {brands.map((b) => (
            <div
              key={b}
              className="rounded border border-border bg-card py-3 px-2 text-center font-display text-lg font-bold uppercase text-muted-foreground"
            >
              {b}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
