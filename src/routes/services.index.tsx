import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Calendar,
  Check,
  CheckCircle2,
  Clock,
  FileCheck,
  HelpCircle,
  MapPin,
  ShieldCheck,
  Wrench,
} from "lucide-react";
import { PageHeader } from "@/components/site/PageHeader";
import { centers, services, taka } from "@/lib/data";

export const Route = createFileRoute("/services/")({
  head: () => ({
    meta: [
      { title: "Professional Automotive Workshop Services — PAGE International" },
      {
        name: "description",
        content: "Book certified vehicle servicing, electronic diagnostics, air conditioning maintenance, brake servicing and 4-wheel alignment at PAGE service hubs.",
      },
      { property: "og:title", content: "PAGE Workshop Services" },
      { property: "og:description", content: "Transparent automotive servicing, diagnostics, and repairs." },
    ],
  }),
  component: Services,
});

const serviceDetails: Record<string, string[]> = {
  "general-service": [
    "Complete engine oil & OEM oil filter replacement",
    "Air filter and cabin pollen filter inspection / cleaning",
    "40-point safety and electronic multipoint check",
    "Brake fluid, coolant and windshield washer fluid top-up",
    "Battery health digital resistance test",
    "Suspension bushings, tierods and undercarriage check",
  ],
  "diagnostics": [
    "Full electronic ECU computer scanner diagnostic read",
    "Clear stored error codes and reset service warning lights",
    "Live sensor data streaming (O2 sensors, fuel trims, boost)",
    "Battery charging system and alternator load test",
    "Detailed technician written diagnosis and repair recommendation",
  ],
  "ac-service": [
    "High & low pressure AC line performance test",
    "Complete refrigerant recovery, vacuum and gas recharge",
    "Compressor lubricant oil replenishment",
    "UV dye electronic leak detection test",
    "Cabin air filter cleaning or replacement",
    "Evaporator core antibacterial foam sanitization",
  ],
  "brake-service": [
    "Brake pad thickness and disc rotor runout measurement",
    "Brake caliper slide pin cleaning and high-temp lubrication",
    "Brake fluid boiling point test and pressure bleed",
    "Handbrake / electronic parking brake adjustment",
    "Road test for vibration, pull, and stopping distance",
  ],
  "wheel-alignment": [
    "3D computerized 4-wheel laser alignment setup",
    "Front and rear camber, caster, and toe adjustment",
    "High-speed electronic wheel balancing per wheel",
    "Tyre tread depth and uneven wear pattern analysis",
    "Steering angle sensor calibration",
  ],
  "battery-service": [
    "State of charge (SOC) and state of health (SOH) test",
    "Cranking amps (CCA) battery conductance diagnostic",
    "Terminal cleaning, deoxidation, and corrosion protection coating",
    "Alternator charging voltage load regulation test",
  ],
  "ev-service": [
    "High-voltage battery pack degradation and cell balancing test",
    "Inverter, electric motor, and thermal cooling loop check",
    "High-voltage orange cable isolation resistance inspection",
    "Regenerative braking system calibration and sensor check",
  ],
  "adas-calibration": [
    "Forward-facing radar and stereo camera optical target alignment",
    "Lane departure warning & forward collision system test",
    "Post-windscreen or bumper repair sensor recalibration",
    "Full calibration documentation and compliance report",
  ],
};

export function Services() {
  return (
    <div className="bg-background text-foreground min-h-screen">
      <PageHeader
        eyebrow="Workshop Operations"
        title="Professional Automotive Services"
        intro="Manufacturer-compliant vehicle maintenance, advanced computerized diagnostics, and documented servicing executed by certified automotive technicians at PAGE hubs and partner workshops."
      >
        <div className="flex flex-wrap gap-3">
          <Link to="/services/book" className="btn btn-primary h-11 text-xs">
            <Calendar className="h-4 w-4" /> Book Service Appointment
          </Link>
          <Link to="/service-centers" className="btn btn-ghost-light h-11 text-xs">
            <MapPin className="h-4 w-4" /> View Service Centers
          </Link>
        </div>
      </PageHeader>

      {/* Service Standards Process */}
      <section className="border-b border-border bg-secondary/50 py-10">
        <div className="container-page grid grid-cols-2 gap-4 md:grid-cols-4">
          <div className="flex items-center gap-3">
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded bg-primary/10 text-primary">
              <ShieldCheck className="h-5 w-5" />
            </span>
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-foreground">
                Genuine Spares Only
              </p>
              <p className="text-[11px] text-muted-foreground">Certified lubricants & parts</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded bg-primary/10 text-primary">
              <Wrench className="h-5 w-5" />
            </span>
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-foreground">
                Trained Technicians
              </p>
              <p className="text-[11px] text-muted-foreground">Certified workshop crew</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded bg-primary/10 text-primary">
              <FileCheck className="h-5 w-5" />
            </span>
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-foreground">
                Digital Inspection
              </p>
              <p className="text-[11px] text-muted-foreground">Transparent job cards</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded bg-primary/10 text-primary">
              <Clock className="h-5 w-5" />
            </span>
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-foreground">
                On-Time Completion
              </p>
              <p className="text-[11px] text-muted-foreground">Scheduled bay slots</p>
            </div>
          </div>
        </div>
      </section>

      {/* Operational Services Grid */}
      <section className="container-page py-16 lg:py-24">
        <div className="mb-10 max-w-2xl">
          <p className="eyebrow">Service Catalog</p>
          <h2 className="display-lg mt-1 text-foreground">OPERATIONAL WORKSHOP PACKAGES</h2>
          <p className="text-xs sm:text-sm text-muted-foreground mt-2 leading-relaxed">
            All services include computerized job-card documentation, transparent labor estimates, and genuine component fitment.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {services.map((s, idx) => {
            const checklist = serviceDetails[s.slug] || [
              "Comprehensive system diagnostics",
              "OEM component testing & replacement",
              "Road test verification",
            ];

            return (
              <article
                key={s.slug}
                className="flex flex-col justify-between rounded border border-border bg-card p-6 shadow-xs hover:border-foreground/30 transition-colors"
              >
                <div>
                  <div className="flex items-start justify-between gap-4 border-b border-border pb-4">
                    <div>
                      <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-primary">
                        PAGE SERVICE 0{idx + 1}
                      </span>
                      <h3 className="font-display text-2xl font-bold uppercase text-foreground mt-0.5">
                        {s.name}
                      </h3>
                    </div>
                    <div className="text-right">
                      <span className="font-display text-2xl font-bold text-foreground block">
                        {s.from ? taka(s.from) : "Quote"}
                      </span>
                      <span className="flex items-center justify-end gap-1 text-[11px] font-semibold text-muted-foreground">
                        <Clock className="h-3 w-3 text-primary" /> Est. {s.duration}
                      </span>
                    </div>
                  </div>

                  <p className="mt-4 text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    {s.desc}
                  </p>

                  {/* Checklist of What's Included */}
                  <div className="mt-5 rounded bg-secondary/50 p-4">
                    <p className="text-[11px] font-bold uppercase tracking-wider text-foreground mb-2.5">
                      What is included in this service:
                    </p>
                    <ul className="space-y-1.5 text-xs text-foreground/80">
                      {checklist.map((item, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <Check className="h-3.5 w-3.5 text-success shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-border flex flex-wrap items-center justify-between gap-3">
                  <span className="text-[11px] text-muted-foreground flex items-center gap-1.5">
                    <MapPin className="h-3.5 w-3.5 text-primary" /> Available at all {centers.length} Service Hubs
                  </span>
                  <Link
                    to="/services/book"
                    search={{ service: s.slug }}
                    className="btn btn-primary h-9 px-5 text-xs font-bold uppercase"
                  >
                    Book {s.name}
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* How It Works Section */}
      <section className="bg-secondary/60 py-16 border-t border-border">
        <div className="container-page">
          <div className="text-center max-w-xl mx-auto mb-12">
            <p className="eyebrow">Service Workflow</p>
            <h2 className="display-md mt-1 text-foreground">HOW TO BOOK A SERVICE WITH PAGE</h2>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                step: "01",
                title: "Choose Service & Vehicle",
                desc: "Select your required service package and enter vehicle make, model and trim.",
              },
              {
                step: "02",
                title: "Select Center & Slot",
                desc: "Choose from Tejgaon, Gulshan, Uttara or Chattogram and select your arrival time.",
              },
              {
                step: "03",
                title: "Digital Check-In",
                desc: "Arrive at the workshop bay; our certified technician performs computerised inspection.",
              },
              {
                step: "04",
                title: "Documented Completion",
                desc: "Receive clear job card, genuine invoice, and collected parts return guarantee.",
              },
            ].map((step) => (
              <div key={step.step} className="rounded border border-border bg-card p-6">
                <span className="font-display text-3xl font-bold text-primary">{step.step}</span>
                <h3 className="font-display text-lg font-bold uppercase text-foreground mt-2">
                  {step.title}
                </h3>
                <p className="mt-2 text-xs text-muted-foreground leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link to="/services/book" className="btn btn-primary h-12 px-8 text-xs font-bold uppercase">
              Schedule Your Service Appointment
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
