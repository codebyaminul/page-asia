import { createFileRoute, Link } from "@tanstack/react-router";
import { Car, CalendarCheck, Package } from "lucide-react";
import { PageHeader } from "@/components/site/PageHeader";
import { VehicleFinder } from "@/components/site/VehicleFinder";
import { useCart } from "@/lib/cart";

export const Route = createFileRoute("/garage")({
  head: () => ({ meta: [{ title: "My Garage — PAGE" }, { name: "description", content: "Save your vehicle, see compatible parts, orders and service bookings." }, { property: "og:title", content: "My Garage — PAGE" }, { property: "og:description", content: "Manage your vehicle with PAGE." }] }),
  component: Garage,
});

function Garage() {
  const { vehicle, setVehicle } = useCart();
  return (
    <>
      <PageHeader eyebrow="My Garage" title={vehicle ? `${vehicle.make} ${vehicle.model}` : "Add your vehicle"} intro="Demo account — data is stored only in this browser." />
      <section className="container-page grid gap-6 py-12 lg:grid-cols-3">
        <div className="border border-border bg-card p-6 lg:col-span-3">
          <h2 className="flex items-center gap-2 text-2xl font-semibold"><Car className="h-5 w-5 text-primary" />{vehicle ? "Your vehicle" : "Save a vehicle"}</h2>
          {vehicle ? (
            <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
              <p className="text-muted-foreground">{vehicle.year} · {vehicle.engine || "Engine not set"}</p>
              <div className="flex gap-2"><Link to="/shop" search={{ vehicle: `${vehicle.make} ${vehicle.model}` }} className="btn btn-primary h-10">Shop compatible parts</Link><button onClick={() => setVehicle(null)} className="btn btn-outline h-10">Remove</button></div>
            </div>
          ) : <div className="mt-6"><VehicleFinder dark={false} /></div>}
        </div>
        <div className="border border-border bg-card p-6">
          <h2 className="flex items-center gap-2 text-2xl font-semibold"><Package className="h-5 w-5 text-primary" />My Orders</h2>
          <p className="mt-3 text-sm text-muted-foreground">No orders yet.</p><Link to="/shop" className="mt-4 inline-block text-sm font-semibold underline">Start shopping</Link>
        </div>
        <div className="border border-border bg-card p-6">
          <h2 className="flex items-center gap-2 text-2xl font-semibold"><CalendarCheck className="h-5 w-5 text-primary" />My Bookings</h2>
          <p className="mt-3 text-sm text-muted-foreground">No upcoming bookings.</p><Link to="/services/book" className="mt-4 inline-block text-sm font-semibold underline">Book a service</Link>
        </div>
        <div className="bg-ink p-6 text-ink-foreground">
          <h2 className="text-2xl font-semibold">Service reminder</h2>
          <p className="mt-3 text-sm text-ink-muted">Most vehicles need a general service every 5,000–10,000 km or 6 months.</p>
        </div>
      </section>
    </>
  );
}
