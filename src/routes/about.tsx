import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Award,
  Building2,
  CheckCircle2,
  Compass,
  FileSpreadsheet,
  MapPin,
  ShieldCheck,
  Truck,
  Users,
  Wrench,
  Zap,
} from "lucide-react";
import { PageHeader } from "@/components/site/PageHeader";
import { brands, images } from "@/lib/data";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      {
        title:
          "About PAGE International Ltd. — The Company Behind the Workshop",
      },
      {
        name: "description",
        content:
          "PAGE International Ltd. is a specialized B2B supplier and distributor of automotive garage equipment, spare parts, diagnostics, tools, and workshop solutions to professional automotive businesses.",
      },
      {
        property: "og:title",
        content: "About PAGE International Ltd. — B2B Automotive Supplier",
      },
      {
        property: "og:description",
        content:
          "Supplying professional automotive equipment, parts and workshop engineering.",
      },
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
        intro="The company behind the workshop. A specialized automotive trading, distribution, and equipment engineering supplier providing commercial vehicle lifts, diagnostic technology, precision spare parts, and EV workshop solutions."
      />

      {/* Main Profile Story */}
      <section className="container-page py-16 lg:py-24">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div className="relative aspect-[4/3] overflow-hidden rounded border border-border shadow-md">
            <img
              src={images.heroWorkshop}
              alt="PAGE International commercial automotive workshop equipment warehouse"
              loading="lazy"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 text-white">
              <p className="font-display text-xl font-bold uppercase">
                Tejgaon Central Hub & Demonstration Showroom
              </p>
              <p className="text-xs text-white/80">
                Automotive machinery testing bay, logistics dispatch & parts warehouse
              </p>
            </div>
          </div>

          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-primary">
              The Company Behind The Workshop
            </span>
            <h2 className="display-lg mt-2 text-foreground font-bold">
              WE EQUIP THE BUSINESSES THAT SERVICE VEHICLES
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              PAGE International Ltd. is a B2B supplier and distributor. We do not operate
              consumer repair shops or offer roadside car maintenance. Instead, we supply
              the automotive service centers, independent workshops, franchise dealerships,
              fleet depots, and EV businesses with the industrial machinery, replacement parts,
              and tooling they rely on every day.
            </p>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              From heavy-duty electro-hydraulic vehicle lifts and computerized 3D wheel
              alignment systems to 1000V insulated EV safety tools and OEM replacement parts,
              PAGE bridges the gap between international manufacturing excellence and local
              workshop productivity.
            </p>

            <div className="mt-8 grid grid-cols-2 gap-4 border-t border-border pt-6">
              <div>
                <span className="font-display text-3xl font-bold text-primary">
                  10,000+
                </span>
                <p className="text-xs text-muted-foreground font-medium">
                  B2B Parts & SKUs in Stock
                </p>
              </div>
              <div>
                <span className="font-display text-3xl font-bold text-primary">
                  4-MOBILITY
                </span>
                <p className="text-xs text-muted-foreground font-medium">
                  4W · 2W · 3W · EV Platforms
                </p>
              </div>
              <div>
                <span className="font-display text-3xl font-bold text-primary">
                  100%
                </span>
                <p className="text-xs text-muted-foreground font-medium">
                  Direct Factory Provenance
                </p>
              </div>
              <div>
                <span className="font-display text-3xl font-bold text-primary">
                  NATIONWIDE
                </span>
                <p className="text-xs text-muted-foreground font-medium">
                  Logistics & Hub Distribution
                </p>
              </div>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/shop"
                className="btn btn-primary h-11 px-6 text-xs font-bold uppercase tracking-wider"
              >
                Explore Product Catalog
              </Link>
              <Link
                to="/solutions"
                className="btn btn-outline h-11 px-6 text-xs font-bold uppercase tracking-wider"
              >
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
            <p className="eyebrow">Core B2B Capabilities</p>
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
                icon: Zap,
                title: "EV & Next-Gen Tooling",
                desc: "1000V VDE insulated tools, battery cell balancers, high-voltage PPE, and specialized EV diagnostic software.",
              },
              {
                icon: Building2,
                title: "Workshop Engineering",
                desc: "Turnkey bay layout planning, certified lift chemical anchoring, calibration, and hands-on technician equipment operation training.",
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
