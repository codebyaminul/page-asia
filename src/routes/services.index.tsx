import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Calendar,
  Check,
  CheckCircle2,
  Clock,
  Compass,
  FileCheck,
  FileSpreadsheet,
  HelpCircle,
  MapPin,
  ShieldCheck,
  Truck,
  Wrench,
  Zap,
} from "lucide-react";
import { PageHeader } from "@/components/site/PageHeader";

export const Route = createFileRoute("/services/")({
  head: () => ({
    meta: [
      {
        title:
          "Workshop Equipment Engineering & Support Services — PAGE International",
      },
      {
        name: "description",
        content:
          "PAGE International provides turnkey bay planning, vehicle lift anchoring, machinery calibration, technician training, and preventive maintenance for automotive workshops.",
      },
      {
        property: "og:title",
        content: "Workshop Equipment Engineering & Support — PAGE International",
      },
      {
        property: "og:description",
        content:
          "Technical services and engineering support for automotive service centers, dealerships, and workshops.",
      },
    ],
  }),
  component: Services,
});

const engineeringServices = [
  {
    slug: "bay-planning",
    name: "Turnkey Bay Layout & Ergonomics",
    desc: "Architectural 2D and 3D vehicle workflow modeling, lift spacing clearance, turning radius validation, and technician movement optimization for new and expanding workshops.",
    deliverables: [
      "AutoCAD 2D/3D workshop layout blueprint",
      "Vehicle approach clearance and turning trajectory study",
      "Electrical conduit and pneumatic dropper placement map",
      "Floor concrete thickness and PSI compression audit",
    ],
    duration: "3–5 Days",
  },
  {
    slug: "lift-installation",
    name: "Lift Foundation Anchoring & Rigging",
    desc: "Certified installation of 2-post, 4-post, and scissor lifts using chemical torque anchors, precision laser level shimming, and dual cylinder hydraulic pressure synchronization.",
    deliverables: [
      "Heavy chemical anchor torque fastening to specification",
      "Hydraulic power unit connection and pressure testing",
      "Safety lock pawl release test with full test load",
      "CE & OSHA commercial compliance commissioning signoff",
    ],
    duration: "1–2 Days per Bay",
  },
  {
    slug: "calibration",
    name: "Machinery Calibration & Certification",
    desc: "Microprocessor calibration for 3D wheel alignment cameras, dynamic wheel balancers, headlight aimers, and torque equipment to maintain factory precision.",
    deliverables: [
      "Laser wheel alignment optical target calibration",
      "Digital wheel balancer shaft runout and zero-weight balance test",
      "Diagnostic tablet software calibration and sensor testing",
      "Official certificate of calibration for customer audit compliance",
    ],
    duration: "Half Day",
  },
  {
    slug: "air-systems",
    name: "Pneumatic Ring-Main Air Line Installation",
    desc: "Engineered aluminum or galvanized piping for rotary screw compressors, integrated refrigerated air dryers, moisture separator drops, and auto-drain filters.",
    deliverables: [
      "CFM and pressure drop load calculation for simultaneous air tools",
      "Leak-free aluminum pipe ring-main line installation",
      "Refrigerated dryer and particulate oil filter commissioning",
      "Overhead spring-loaded hose reels at each work bay",
    ],
    duration: "2–4 Days",
  },
  {
    slug: "technician-training",
    name: "Technician Equipment Operation Training",
    desc: "Hands-on workshop floor training for your technicians on automated tyre changers, high-end scan tablets, EV safety protocols, and proper vehicle lifting balance.",
    deliverables: [
      "Run-flat & UHP tyre mounting without wheel rim damage",
      "Bidirectional ECU scan tablet navigation and actuator testing",
      "Lift safety latch verification and vehicle balance center of gravity",
      "Operator completion certificate for workshop technicians",
    ],
    duration: "1 Full Day",
  },
  {
    slug: "amc",
    name: "Annual Maintenance Contracts (AMC)",
    desc: "Scheduled preventive maintenance contracts for workshop machinery. Quarterly hydraulic fluid changes, cable tensioning, chain lubrication, and emergency breakdown priority.",
    deliverables: [
      "Quarterly preventive maintenance visits on-site",
      "Hydraulic hose inspection, fluid top-up, and seal replacement",
      "Emergency technician dispatch within 24 working hours",
      "15% discount on all machinery replacement parts",
    ],
    duration: "Annual Contract",
  },
  {
    slug: "ev-safety",
    name: "EV High-Voltage Workshop Audit & Setup",
    desc: "Facility auditing to establish compliant high-voltage electric vehicle service bays. Supply of safety perimeter barriers, rescue hooks, 1000V insulated tooling, and PPE.",
    deliverables: [
      "High-voltage safety zone demarcation and signage",
      "Class 0 safety glove and insulated mat inspection",
      "Battery pack lowering procedure and emergency isolation protocol",
      "EV workshop safety compliance verification report",
    ],
    duration: "1–2 Days",
  },
  {
    slug: "diagnostic-subs",
    name: "Diagnostic Software Updates & Subscriptions",
    desc: "Continuous cloud subscription management for Diagtek and multi-brand scan tools. Ensuring your workshop has access to latest Japanese, European, and EV protocol patches.",
    deliverables: [
      "Annual software renewal and ECU database update",
      "CAN-FD and DoIP protocol firmware flashing",
      "Remote technical support for difficult vehicle communication faults",
      "Access to online wiring diagrams and repair databases",
    ],
    duration: "Immediate Activation",
  },
];

export function Services() {
  return (
    <div className="bg-background text-foreground min-h-screen">
      <PageHeader
        eyebrow="Workshop Engineering & Technical Support"
        title="Equipment Services for Workshops"
        intro="PAGE International provides engineering support, equipment anchoring, calibration, and technician training to keep your workshop bays productive and compliant."
      >
        <div className="flex flex-wrap gap-3">
          <Link
            to="/services/book"
            className="btn btn-primary h-11 text-xs font-bold uppercase tracking-wider"
          >
            <Calendar className="h-4 w-4" /> Book Engineering Consultation
          </Link>
          <Link
            to="/shop"
            search={{ cat: "Garage Equipment" }}
            className="btn btn-outline border-ink-border text-ink-foreground hover:bg-ink-2 h-11 text-xs font-bold uppercase tracking-wider"
          >
            <Wrench className="h-4 w-4 text-primary" /> View Equipment Catalogue
          </Link>
        </div>
      </PageHeader>

      {/* Engineering Standards Process */}
      <section className="border-b border-border bg-secondary/50 py-10">
        <div className="container-page grid grid-cols-2 gap-4 md:grid-cols-4">
          <div className="flex items-center gap-3">
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded bg-primary/10 text-primary">
              <ShieldCheck className="h-5 w-5" />
            </span>
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-foreground">
                Certified Engineers
              </p>
              <p className="text-[11px] text-muted-foreground">
                Trained by machinery OEMs
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded bg-primary/10 text-primary">
              <Wrench className="h-5 w-5" />
            </span>
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-foreground">
                Precision Calibration
              </p>
              <p className="text-[11px] text-muted-foreground">
                Laser & electronic testing
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded bg-primary/10 text-primary">
              <FileCheck className="h-5 w-5" />
            </span>
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-foreground">
                Commercial Compliance
              </p>
              <p className="text-[11px] text-muted-foreground">
                CE, ISO & safety signoff
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded bg-primary/10 text-primary">
              <Clock className="h-5 w-5" />
            </span>
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-foreground">
                Rapid On-Site Support
              </p>
              <p className="text-[11px] text-muted-foreground">
                Nationwide hub deployment
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Engineering Services Grid */}
      <section className="container-page py-16">
        <div className="max-w-2xl mb-10">
          <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-primary block">
            Technical Engineering Scope
          </span>
          <h2 className="display-md mt-1 text-foreground">
            WORKSHOP ENGINEERING & SUPPORT PACKAGES
          </h2>
          <p className="text-xs sm:text-sm text-muted-foreground mt-1">
            We don't just supply equipment in a crate—our engineers install, calibrate,
            train your crew, and provide preventive maintenance.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {engineeringServices.map((svc) => (
            <div
              key={svc.slug}
              className="flex flex-col justify-between rounded border border-border bg-card p-6 transition-all hover:border-foreground/30 hover:shadow-xs"
            >
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-primary bg-primary/10 px-2 py-0.5 rounded">
                  {svc.duration}
                </span>
                <h3 className="font-heading text-xl uppercase text-foreground mt-3">
                  {svc.name}
                </h3>
                <p className="text-xs text-muted-foreground mt-2 leading-relaxed">
                  {svc.desc}
                </p>

                <div className="mt-4 border-t border-border/50 pt-3">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-foreground mb-1.5">
                    Service Deliverables:
                  </p>
                  <ul className="space-y-1 text-[11px] text-muted-foreground">
                    {svc.deliverables.map((d) => (
                      <li key={d} className="flex items-start gap-1.5">
                        <Check className="h-3.5 w-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{d}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-6 pt-3 border-t border-border">
                <Link
                  to="/services/book"
                  search={{ service: svc.slug }}
                  className="btn btn-outline h-9 w-full text-xs font-bold uppercase tracking-wider"
                >
                  Book Service Consultation
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Equipment Demonstration Banner */}
      <section className="bg-ink text-ink-foreground py-16 border-t border-ink-border">
        <div className="container-page text-center max-w-3xl">
          <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-primary block">
            Live Machinery Demonstration
          </span>
          <h2 className="display-lg mt-2 text-ink-foreground">
            SEE OUR MACHINERY IN LIVE OPERATION
          </h2>
          <p className="mt-3 text-sm text-ink-muted leading-relaxed max-w-xl mx-auto">
            Visit our Tejgaon Demonstration Facility or Chattogram Hub to inspect 2-post
            lifts, tyre changers, wheel balancers, and EV diagnostic tools in action before purchasing.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              to="/services/book"
              className="btn btn-primary h-11 px-8 text-xs font-bold uppercase tracking-wider"
            >
              Book Machinery Demonstration
            </Link>
            <Link
              to="/service-centers"
              className="btn btn-ghost-light h-11 px-8 text-xs font-bold uppercase tracking-wider"
            >
              View Hub Locations
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
