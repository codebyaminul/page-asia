import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHeader } from "@/components/site/PageHeader";
import { VehicleFinder } from "@/components/site/VehicleFinder";
import { vehicleData } from "@/lib/data";

export const Route = createFileRoute("/vehicles")({
  head: () => ({ meta: [{ title: "Shop by Vehicle — PAGE" }, { name: "description", content: "Find parts by make and model: Toyota, Honda, Nissan, Mitsubishi and more." }, { property: "og:title", content: "Shop by Vehicle — PAGE" }, { property: "og:description", content: "Find parts that fit your vehicle." }] }),
  component: Vehicles,
});

function Vehicles() {
  return (
    <>
      <PageHeader eyebrow="Vehicles" title="Shop by vehicle" intro="Select your vehicle to see compatible parts.">
        <VehicleFinder />
      </PageHeader>
      <section className="container-page grid gap-px border-x border-border bg-border py-px sm:grid-cols-2 lg:grid-cols-4">
        {Object.entries(vehicleData).map(([make, models]) => (
          <div key={make} className="bg-background p-8">
            <h2 className="display-md">{make}</h2>
            <ul className="mt-4 space-y-2">
              {Object.keys(models).map((m) => <li key={m}><Link to="/shop" search={{ vehicle: `${make} ${m}` }} className="text-sm text-muted-foreground hover:text-primary">{m} parts →</Link></li>)}
            </ul>
          </div>
        ))}
      </section>
      <div className="h-16" />
    </>
  );
}
