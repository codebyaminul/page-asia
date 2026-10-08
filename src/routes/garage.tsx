import { createFileRoute, Link } from "@tanstack/react-router";
import {
  CalendarCheck,
  Car,
  CheckCircle2,
  Clock,
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
      { title: "My Garage & Vehicle Profile — PAGE International" },
      {
        name: "description",
        content: "Manage saved vehicles, see compatible automotive parts, view order records and upcoming service center bookings.",
      },
      { property: "og:title", content: "My Garage — PAGE" },
      { property: "og:description", content: "Manage your vehicle and compatible parts." },
    ],
  }),
  component: Garage,
});

export function Garage() {
  const { vehicle, setVehicle } = useCart();

  return (
    <div className="bg-background text-foreground min-h-screen">
      <PageHeader
        eyebrow="Vehicle Manager"
        title={vehicle ? `${vehicle.make} ${vehicle.model} (${vehicle.year})` : "My Garage Portal"}
        intro="Save your vehicles to automatically filter compatible brake pads, batteries, engine oils, and service intervals across the entire catalog."
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
                  {vehicle ? "Active Saved Vehicle" : "Save Your Vehicle"}
                </h2>
                <span className="text-[11px] text-muted-foreground">
                  {vehicle ? "Fitment filter is active" : "Select make and model"}
                </span>
              </div>
            </div>

            {vehicle && (
              <span className="flex items-center gap-1 text-xs font-semibold text-success">
                <CheckCircle2 className="h-4 w-4" /> 100% Fitment Match Active
              </span>
            )}
          </div>

          {vehicle ? (
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 rounded bg-secondary/50 p-5">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-primary">
                  {vehicle.make}
                </span>
                <h3 className="font-display text-3xl font-bold uppercase text-foreground mt-0.5">
                  {vehicle.model}
                </h3>
                <p className="mt-1 text-xs text-muted-foreground">
                  Year: <strong>{vehicle.year}</strong> • Engine:{" "}
                  <strong>{vehicle.engine || "Standard Trim"}</strong>
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <Link
                  to="/shop"
                  search={{ vehicle: `${vehicle.make} ${vehicle.model}` }}
                  className="btn btn-primary h-10 px-5 text-xs font-bold uppercase"
                >
                  Shop Compatible Parts
                </Link>
                <Link
                  to="/services/book"
                  className="btn btn-dark h-10 px-4 text-xs font-bold uppercase"
                >
                  Book Service
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
                Add your vehicle details once. All shop items will highlight fitment compatibility badges automatically:
              </p>
              <VehicleFinder dark={false} />
            </div>
          )}
        </div>

        {/* Orders, Bookings and Reminders 3-Column Grid */}
        <div className="grid gap-6 sm:grid-cols-3">
          {/* My Orders */}
          <div className="rounded border border-border bg-card p-6 flex flex-col justify-between">
            <div>
              <span className="grid h-9 w-9 place-items-center rounded bg-primary/10 text-primary mb-3">
                <Package className="h-4 w-4" />
              </span>
              <h3 className="font-display text-xl font-bold uppercase text-foreground">
                My Parts Orders
              </h3>
              <p className="mt-2 text-xs text-muted-foreground">
                Track current parts shipments, download VAT invoices, or re-order high-wear consumables.
              </p>
            </div>
            <div className="mt-6 pt-3 border-t border-border">
              <Link to="/shop" className="btn btn-outline h-9 w-full text-xs font-bold uppercase">
                Browse Catalog
              </Link>
            </div>
          </div>

          {/* My Bookings */}
          <div className="rounded border border-border bg-card p-6 flex flex-col justify-between">
            <div>
              <span className="grid h-9 w-9 place-items-center rounded bg-primary/10 text-primary mb-3">
                <CalendarCheck className="h-4 w-4" />
              </span>
              <h3 className="font-display text-xl font-bold uppercase text-foreground">
                Service Bookings
              </h3>
              <p className="mt-2 text-xs text-muted-foreground">
                View upcoming appointments, service history job cards, and technician multipoint inspection records.
              </p>
            </div>
            <div className="mt-6 pt-3 border-t border-border">
              <Link to="/services/book" className="btn btn-outline h-9 w-full text-xs font-bold uppercase">
                Book Next Service
              </Link>
            </div>
          </div>

          {/* Maintenance Interval Reminder */}
          <div className="rounded border border-ink-border bg-ink p-6 text-ink-foreground flex flex-col justify-between">
            <div>
              <span className="grid h-9 w-9 place-items-center rounded bg-primary/20 text-primary mb-3">
                <Clock className="h-4 w-4" />
              </span>
              <h3 className="font-display text-xl font-bold uppercase text-ink-foreground">
                Maintenance Schedule
              </h3>
              <p className="mt-2 text-xs text-ink-muted leading-relaxed">
                Standard automotive preventive interval: General service recommended every 5,000–10,000 km or 6 months. Brake pads should be inspected every 15,000 km.
              </p>
            </div>
            <div className="mt-6 pt-3 border-t border-ink-border/60">
              <Link to="/support" className="text-xs font-bold text-primary hover:underline flex items-center gap-1">
                Read Maintenance Guide →
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
