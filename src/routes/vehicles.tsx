import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Car, CheckCircle2 } from "lucide-react";
import { PageHeader } from "@/components/site/PageHeader";
import { VehicleFinder } from "@/components/site/VehicleFinder";
import { vehicleData } from "@/lib/data";

export const Route = createFileRoute("/vehicles")({
  head: () => ({
    meta: [
      { title: "Shop Automotive Parts by Vehicle Make & Model — PAGE International" },
      {
        name: "description",
        content: "Find guaranteed compatible parts for Toyota, Honda, Nissan, Mitsubishi and other passenger and commercial vehicles.",
      },
      { property: "og:title", content: "Shop by Vehicle — PAGE" },
      { property: "og:description", content: "Find parts that fit your vehicle." },
    ],
  }),
  component: Vehicles,
});

export function Vehicles() {
  return (
    <div className="bg-background text-foreground min-h-screen">
      <PageHeader
        eyebrow="Vehicle Directory"
        title="Shop Parts by Vehicle Make & Model"
        intro="Select your exact vehicle or search below to filter all brake pads, batteries, filters, and lubricants with 100% guaranteed fitment."
      >
        <VehicleFinder dark={true} />
      </PageHeader>

      <section className="container-page py-16">
        <div className="mb-8">
          <p className="eyebrow">Vehicle Database</p>
          <h2 className="display-md mt-1 text-foreground">POPULAR MANUFACTURER DIRECTORY</h2>
          <p className="text-xs sm:text-sm text-muted-foreground mt-1">
            Choose your car brand to view compatible parts catalogued by chassis code and engine trim.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {Object.entries(vehicleData).map(([make, models]) => (
            <div
              key={make}
              className="rounded border border-border bg-card p-6 shadow-xs flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between border-b border-border pb-3 mb-4">
                  <h3 className="font-display text-2xl font-bold uppercase text-foreground">
                    {make}
                  </h3>
                  <span className="text-xs font-bold text-primary">
                    {Object.keys(models).length} Models
                  </span>
                </div>

                <ul className="space-y-2.5 text-xs">
                  {Object.entries(models).map(([modelName, engines]) => (
                    <li key={modelName}>
                      <Link
                        to="/shop"
                        search={{ vehicle: `${make} ${modelName}` }}
                        className="group flex items-center justify-between rounded p-2 hover:bg-secondary transition-colors"
                      >
                        <div>
                          <span className="font-semibold text-foreground group-hover:text-primary transition-colors block">
                            {make} {modelName}
                          </span>
                          <span className="text-[11px] text-muted-foreground">
                            {engines.join(", ")}
                          </span>
                        </div>
                        <ArrowRight className="h-3.5 w-3.5 text-muted-foreground group-hover:translate-x-1 group-hover:text-primary transition-all" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-6 pt-3 border-t border-border">
                <Link
                  to="/shop"
                  search={{ vehicle: make }}
                  className="btn btn-outline h-8.5 w-full text-[11px] font-bold uppercase"
                >
                  View All {make} Parts
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
