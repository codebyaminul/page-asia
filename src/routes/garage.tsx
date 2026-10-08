import { createFileRoute, Link } from "@tanstack/react-router";
import {
  CalendarCheck,
  Car,
  CheckCircle2,
  Clock,
  FileSpreadsheet,
  Package,
  ShieldCheck,
  Trash2,
  Wrench,
} from "lucide-react";
import { PageHeader } from "@/components/site/PageHeader";
import { VehicleFinder } from "@/components/site/VehicleFinder";
import { useCart } from "@/lib/cart";

export const Route = createFileRoute("/garage")({
  head: () => ({
    meta: [
      { title: "Fleet Platform & Equipment Portal — PAGE International" },
      {
        name: "description",
        content:
          "Manage saved fleet platforms, view compatible parts, track commercial quotes, and review equipment warranty status.",
      },
      { property: "og:title", content: "Workshop & Fleet Portal — PAGE" },
      {
        property: "og:description",
        content: "Manage vehicle platforms and commercial orders.",
      },
    ],
  }),
  component: Garage,
});

export function Garage() {
  const { vehicle, setVehicle } = useCart();

  return (
    <div className="bg-background text-foreground min-h-screen">
      <PageHeader
        eyebrow="Commercial Fleet & Workshop Portal"
        title={
          vehicle
            ? `${vehicle.make} ${vehicle.model} (${vehicle.year})`
            : "Platform & Equipment Portal"
        }
        intro="Save your target vehicle or fleet platform to automatically highlight compatible brake pads, batteries, engine oils, and tooling across the entire commercial catalogue."
      />

      <section className="container-page py-12 lg:py-16 space-y-8">
        {/* Active Saved Vehicle Card */}
        <div className="rounded border border-border bg-card p-6 shadow-xs">
          <div className="flex items-center justify-between border-b border-border pb-4 mb-5">
            <div className="flex items-center gap-2.5">
              <span className="grid h-8 w-8 place-items-center rounded bg-primary/10 text-primary">
                <Car className="h-4 w-4" />
              </span>
              <div>
                <h2 className="font-display text-2xl font-bold uppercase text-foreground">
                  {vehicle ? "Active Saved Platform" : "Select Target Platform"}
                </h2>
                <span className="text-[11px] text-muted-foreground">
                  {vehicle
                    ? "Fitment filter active across catalogue"
                    : "Select 4W, 2W, 3W, or EV platform"}
                </span>
              </div>
            </div>

            {vehicle && (
              <span className="flex items-center gap-1 text-xs font-semibold text-emerald-600">
                <CheckCircle2 className="h-4 w-4" /> Fitment Filter Active
              </span>
            )}
          </div>

          {vehicle ? (
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 rounded bg-secondary/50 p-5">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-primary">
                  {vehicle.platform || "Vehicle Platform"} · {vehicle.make}
                </span>
                <h3 className="font-display text-3xl font-bold uppercase text-foreground mt-0.5">
                  {vehicle.model}
                </h3>
                <p className="mt-1 text-xs text-muted-foreground">
                  Production Year: <strong>{vehicle.year}</strong> • Powertrain:{" "}
                  <strong>{vehicle.engine || "Standard Specification"}</strong>
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <Link
                  to="/shop"
                  search={{ vehicle: `${vehicle.make} ${vehicle.model}` }}
                  className="btn btn-primary h-10 px-5 text-xs font-bold uppercase tracking-wider"
                >
                  Shop Compatible Products
                </Link>
                <Link
                  to="/support"
                  className="btn btn-dark h-10 px-4 text-xs font-bold uppercase tracking-wider"
                >
                  Request Bulk Quote
                </Link>
                <button
                  onClick={() => setVehicle(null)}
                  className="btn btn-outline h-10 px-3 text-xs text-muted-foreground hover:text-destructive hover:border-destructive flex items-center gap-1"
                >
                  <Trash2 className="h-3.5 w-3.5" /> Remove
                </button>
              </div>
            </div>
          ) : (
            <div>
              <p className="text-xs text-muted-foreground mb-4">
                Select your vehicle platform below. All shop items will highlight compatibility automatically:
              </p>
              <VehicleFinder dark={false} />
            </div>
          )}
        </div>

        {/* Orders, Quotations and Machinery 3-Column Grid */}
        <div className="grid gap-6 sm:grid-cols-3">
          {/* My Orders */}
          <div className="rounded border border-border bg-card p-6 flex flex-col justify-between">
            <div>
              <span className="grid h-9 w-9 place-items-center rounded bg-primary/10 text-primary mb-3">
                <Package className="h-4 w-4" />
              </span>
              <h3 className="font-heading text-2xl uppercase text-foreground">
                Parts & Tool Orders
              </h3>
              <p className="mt-2 text-xs text-muted-foreground leading-relaxed">
                Track current B2B shipments, download registered VAT invoices, or re-order high-wear consumables.
              </p>
            </div>
            <div className="mt-6 pt-3 border-t border-border">
              <Link
                to="/shop"
                className="btn btn-outline h-9 w-full text-xs font-bold uppercase tracking-wider"
              >
                Browse Catalogue
              </Link>
            </div>
          </div>

          {/* Quotations & Demonstrations */}
          <div className="rounded border border-border bg-card p-6 flex flex-col justify-between">
            <div>
              <span className="grid h-9 w-9 place-items-center rounded bg-primary/10 text-primary mb-3">
                <FileSpreadsheet className="h-4 w-4" />
              </span>
              <h3 className="font-heading text-2xl uppercase text-foreground">
                Equipment Quotes & Demos
              </h3>
              <p className="mt-2 text-xs text-muted-foreground leading-relaxed">
                Track open machinery quotations, commercial discount schedules, and hub demonstration bookings.
              </p>
            </div>
            <div className="mt-6 pt-3 border-t border-border">
              <Link
                to="/services/book"
                className="btn btn-outline h-9 w-full text-xs font-bold uppercase tracking-wider"
              >
                Book Machinery Demo
              </Link>
            </div>
          </div>

          {/* Machinery Warranty & Engineering */}
          <div className="rounded border border-ink-border bg-ink p-6 text-ink-foreground flex flex-col justify-between">
            <div>
              <span className="grid h-9 w-9 place-items-center rounded bg-primary/20 text-primary mb-3">
                <ShieldCheck className="h-4 w-4" />
              </span>
              <h3 className="font-heading text-2xl uppercase text-ink-foreground">
                Warranty & AMC Service
              </h3>
              <p className="mt-2 text-xs text-ink-muted leading-relaxed">
                Check warranty coverage on your installed vehicle lifts, tyre changers, and rotary screw compressors.
              </p>
            </div>
            <div className="mt-6 pt-3 border-t border-ink-border">
              <Link
                to="/support"
                className="btn btn-primary h-9 w-full text-xs font-bold uppercase tracking-wider"
              >
                Check Warranty Status
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
