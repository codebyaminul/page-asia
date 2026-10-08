import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Check,
  Compass,
  FileText,
  ShieldCheck,
  Truck,
  Users,
  Wrench,
  Zap,
} from "lucide-react";
import { PageHeader } from "@/components/site/PageHeader";
import { images } from "@/lib/data";

export const Route = createFileRoute("/solutions")({
  head: () => ({
    meta: [
      { title: "B2B Workshop & Automotive Solutions — PAGE International" },
      {
        name: "description",
        content: "Turnkey garage setup, commercial fleet maintenance, EV workshop tooling, and equipment supply packages from PAGE International.",
      },
      { property: "og:title", content: "PAGE B2B Automotive Solutions" },
      {
        property: "og:description",
        content: "Complete workshop equipment, fleet maintenance and garage solutions.",
      },
    ],
  }),
  component: Solutions,
});

const solutionPackages = [
  {
    slug: "garage-setup",
    name: "Turnkey Garage & Workshop Setup",
    subtitle: "Complete bay design, equipment supply, air lines & commissioning",
    desc: "For new workshop investments or bay expansions. We handle 2D bay layout planning, 2-post and scissor lift anchoring, pneumatic rotary screw compressor line sizing, diagnostic workstation setup, and technician equipment operation training.",
    target: "New Workshop Investors, Dealership Bay Expansions, Tyre Centers",
    features: [
      "Custom 2D/3D bay ergonomics and vehicle flow layout",
      "Supply of certified 2-post, 4-post and scissor lifts",
      "Pneumatic ring-main pipework & compressor installation",
      "Technician equipment safety & calibration training",
      "12 to 36-month commercial machinery warranty",
    ],
    image: images.heroWorkshop,
  },
  {
    slug: "workshop",
    name: "Professional Workshop Modernization",
    subtitle: "Upgrade diagnostics, tyre changing and wheel balancing throughput",
    desc: "Designed for independent garages ready to handle modern OBD2, European, and Japanese vehicle platforms. Replace obsolete machinery with high-speed automated tyre changers, laser wheel balancers, and computerized ECU diagnostic tablets.",
    target: "Independent Garages, Tyre Fitment Centers, Quick Lube Stations",
    features: [
      "Microprocessor laser-guided wheel balancers",
      "Pneumatic tilt-back run-flat tyre changers",
      "Multi-brand OE level computerized diagnostic scanners",
      "Trade-in and equipment upgrade financing options",
      "Priority parts delivery supply agreement",
    ],
    image: images.workshop,
  },
  {
    slug: "fleet",
    name: "Commercial Fleet Maintenance & Supply",
    subtitle: "Bulk spare parts procurement, scheduled servicing and downtime minimization",
    desc: "Keep delivery fleets, corporate shuttles, and commercial vehicles on the road. We provide centralized billing, scheduled preventive maintenance windows, guaranteed spare parts inventory reserves, and volume B2B pricing.",
    target: "Logistics Companies, Corporate Fleets, Rental Operators, Ride-hail Fleets",
    features: [
      "Dedicated account manager & B2B procurement portal",
      "Guaranteed stock holding of high-wear brake pads, filters, and fluids",
      "Scheduled night/weekend service bay reservation",
      "Consolidated monthly invoicing with registered VAT documentation",
      "Mobile emergency technician dispatched for breakdown support",
    ],
    image: images.engine,
  },
  {
    slug: "ev",
    name: "EV & Hybrid Workshop Transition",
    subtitle: "High-voltage safety gear, insulated tooling and battery testing platforms",
    desc: "Prepare your garage for the surge of hybrid and electric vehicles. We equip your technicians with IEC 60900 insulated hand tools, Class 0 safety PPE, high-voltage battery health diagnostic scanners, and specialized isolation enclosures.",
    target: "Pioneering Garages, Hybrid Repair Specialists, Commercial EV Fleets",
    features: [
      "1000V insulated hand tool sets & safety lockout kits",
      "High-voltage battery pack cell balancing & capacity test tools",
      "Electric motor and thermal loop diagnostic scanners",
      "Safety perimeter barriers, rescue hooks, and PPE gear",
      "High-voltage technician safety certification guidance",
    ],
    image: images.brakes,
  },
  {
    slug: "personal",
    name: "Personal Vehicle Care Plans",
    subtitle: "Comprehensive preventive maintenance for individual car owners",
    desc: "Transparent maintenance schedules for personal car owners. We ensure your car receives genuine OEM filters, full synthetic oils, computerised diagnostic scans, and clear digital job cards without surprise bills.",
    target: "Everyday Commuters, Luxury Vehicle Owners, Family Cars",
    features: [
      "Pre-booked service bay slots with zero waiting time",
      "100% genuine lubricants and replacement parts with proof of origin",
      "Digital vehicle health report with photos of worn components",
      "Collected old parts returned to owner upon request",
      "Online booking history in My Garage portal",
    ],
    image: images.heroCar,
  },
];

export function Solutions() {
  return (
    <div className="bg-background text-foreground min-h-screen">
      <PageHeader
        eyebrow="Commercial Solutions"
        title="Automotive Solutions for Every Scale"
        intro="From single-bay equipment modernization to turnkey 10-bay garage installation and nationwide fleet maintenance contracts, PAGE delivers industrial machinery, genuine parts, and engineering expertise."
      >
        <Link to="/support" className="btn btn-primary h-11 text-xs">
          Request Commercial Consultation
        </Link>
      </PageHeader>

      <section className="container-page py-16 space-y-12">
        {solutionPackages.map((s, idx) => (
          <article
            key={s.slug}
            className={`grid gap-8 rounded border border-border bg-card overflow-hidden shadow-xs lg:grid-cols-2 lg:items-center ${
              idx % 2 === 1 ? "lg:[&>*:first-child]:order-2" : ""
            }`}
          >
            {/* Visual Image */}
            <div className="relative aspect-[16/10] lg:aspect-auto lg:h-full min-h-[320px] bg-ink">
              <img
                src={s.image}
                alt={s.name}
                loading="lazy"
                className="h-full w-full object-cover opacity-85"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent lg:hidden" />
              <span className="absolute bottom-4 left-4 font-display text-4xl font-bold text-white/20 lg:top-4 lg:left-4">
                0{idx + 1}
              </span>
            </div>

            {/* Solution Details */}
            <div className="p-6 sm:p-10 lg:p-12">
              <span className="text-[11px] font-bold uppercase tracking-widest text-primary">
                {s.subtitle}
              </span>
              <h2 className="display-lg mt-2 text-foreground font-bold">{s.name}</h2>
              <p className="mt-3 text-xs sm:text-sm text-muted-foreground leading-relaxed">
                {s.desc}
              </p>

              <div className="mt-4 rounded bg-secondary/60 p-3 text-xs">
                <span className="font-bold text-foreground">Target Applications: </span>
                <span className="text-muted-foreground">{s.target}</span>
              </div>

              {/* Deliverables List */}
              <div className="mt-6">
                <p className="text-xs font-bold uppercase tracking-wider text-foreground mb-2.5">
                  Package Capabilities:
                </p>
                <ul className="space-y-1.5 text-xs text-foreground/85">
                  {s.features.map((f, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <Check className="h-3.5 w-3.5 text-success shrink-0 mt-0.5" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  to="/support"
                  className="btn btn-primary h-10 px-5 text-xs font-bold uppercase"
                >
                  Request Proposal
                </Link>
                <Link
                  to="/shop"
                  search={{ cat: "Equipment" }}
                  className="btn btn-outline h-10 px-4 text-xs font-bold uppercase"
                >
                  View Related Machinery
                </Link>
              </div>
            </div>
          </article>
        ))}
      </section>

      {/* Direct Contact Banner */}
      <section className="bg-ink py-16 text-ink-foreground border-t border-ink-border">
        <div className="container-page flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-primary">
              B2B Commercial Desk
            </span>
            <h3 className="font-display text-2xl font-bold uppercase mt-1">
              Speak with a PAGE Workshop Engineer
            </h3>
            <p className="text-xs text-ink-muted mt-1 max-w-xl">
              We arrange on-site facility measurements, compressed air calculations, and custom volume discounts.
            </p>
          </div>
          <Link to="/support" className="btn btn-primary h-11 px-8 text-xs font-bold uppercase whitespace-nowrap">
            Contact B2B Team
          </Link>
        </div>
      </section>
    </div>
  );
}
