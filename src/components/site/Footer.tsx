import { Link } from "@tanstack/react-router";
import {
  Facebook,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
  Truck,
  Wrench,
  Youtube,
  Zap,
} from "lucide-react";
import { Logo } from "./Header";

const cols = [
  {
    title: "Products",
    links: [
      { l: "Brake Systems & Rotors", to: "/shop", search: { cat: "Brakes" } },
      { l: "Commercial Batteries", to: "/shop", search: { cat: "Batteries" } },
      { l: "Synthetic Lubricants & Fluids", to: "/shop", search: { cat: "Lubricants" } },
      { l: "Air, Oil & Fuel Filters", to: "/shop", search: { cat: "Filters" } },
      { l: "Workshop Hand Tools", to: "/shop", search: { cat: "Workshop Tools" } },
      { l: "Suspension & Steering", to: "/shop", search: { cat: "Suspension" } },
    ],
  },
  {
    title: "Equipment",
    links: [
      { l: "2-Post & Scissor Lifts", to: "/shop", search: { cat: "Garage Equipment" } },
      { l: "Automatic Tyre Changers", to: "/shop", search: { cat: "Tyre & Wheel" } },
      { l: "Digital Wheel Balancers", to: "/shop", search: { cat: "Tyre & Wheel" } },
      { l: "Rotary Screw Compressors", to: "/shop", search: { cat: "Garage Equipment" } },
      { l: "OBD2 Diagnostic Tablets", to: "/shop", search: { cat: "Diagnostic Equipment" } },
      { l: "Brake Lathes & Testers", to: "/shop", search: { cat: "Garage Equipment" } },
    ],
  },
  {
    title: "EV",
    links: [
      { l: "1000V Insulated Tool Kits", to: "/shop", search: { mobility: "EV" } },
      { l: "High-Voltage Battery Analyzers", to: "/shop", search: { mobility: "EV" } },
      { l: "Battery Cell Balancers", to: "/shop", search: { mobility: "EV" } },
      { l: "Workshop DC Fast Chargers", to: "/shop", search: { mobility: "EV" } },
      { l: "EV Safety Barriers & PPE", to: "/shop", search: { mobility: "EV" } },
      { l: "2W / 3W / 4W EV Tooling", to: "/shop", search: { mobility: "EV" } },
    ],
  },
  {
    title: "Solutions",
    links: [
      { l: "Turnkey Workshop Setup", to: "/solutions" },
      { l: "Workshop Modernization", to: "/solutions" },
      { l: "EV Workshop Transition", to: "/solutions" },
      { l: "Service Center Supply", to: "/solutions" },
      { l: "Commercial Fleet Depots", to: "/solutions" },
      { l: "Distributor & Wholesale", to: "/solutions" },
    ],
  },
  {
    title: "Support",
    links: [
      { l: "Request Commercial Quote", to: "/support" },
      { l: "Product Catalogues & Specs", to: "/support" },
      { l: "Machinery Warranty & Service", to: "/support" },
      { l: "Bay Layout Consultation", to: "/services/book" },
      { l: "Fitment & Compatibility", to: "/vehicles" },
      { l: "Equip Your Service Center", to: "/service-centers" },
    ],
  },
  {
    title: "Company",
    links: [
      { l: "About PAGE International", to: "/about" },
      { l: "Industrial Demo Hubs", to: "/service-centers" },
      { l: "Partner Brands", to: "/#brands" },
      { l: "Supply Network", to: "/about" },
      { l: "Commercial Terms of Supply", to: "/support" },
      { l: "Contact Commercial Desk", to: "/support" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="bg-ink text-ink-foreground border-t border-ink-border">
      {/* Top Value Propositions */}
      <div className="border-b border-ink-border/60 bg-black/30 py-8">
        <div className="container-page grid grid-cols-2 gap-6 md:grid-cols-4">
          <div className="flex items-center gap-3">
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded bg-primary/10 text-primary">
              <ShieldCheck className="h-5 w-5" />
            </span>
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-ink-foreground">
                Genuine Supply Guarantee
              </p>
              <p className="text-[11px] text-ink-muted">Authorized B2B parts provenance</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded bg-primary/10 text-primary">
              <Wrench className="h-5 w-5" />
            </span>
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-ink-foreground">
                Workshop Engineering
              </p>
              <p className="text-[11px] text-ink-muted">Installation, calibration & training</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded bg-primary/10 text-primary">
              <Zap className="h-5 w-5" />
            </span>
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-ink-foreground">
                EV Readiness
              </p>
              <p className="text-[11px] text-ink-muted">2W, 3W & 4W EV workshop solutions</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded bg-primary/10 text-primary">
              <Truck className="h-5 w-5" />
            </span>
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-ink-foreground">
                Nationwide B2B Logistics
              </p>
              <p className="text-[11px] text-ink-muted">Express hub dispatch to garages</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Link Columns */}
      <div className="container-page py-14 lg:py-16">
        <div className="grid gap-10 xl:grid-cols-[1.3fr_3fr]">
          {/* Company Brief & Direct Contacts */}
          <div className="max-w-md">
            <Logo />
            <p className="mt-4 text-xs leading-relaxed text-ink-muted">
              PAGE International Ltd. is a specialized B2B supplier and distributor of automotive garage machinery, replacement spare parts, diagnostics, and workshop solutions to professional service centers, workshops, dealerships, fleets, and EV businesses.
            </p>
            <p className="mt-2 text-xs font-bold uppercase tracking-wider text-primary">
              The Company Behind The Workshop.
            </p>

            <div className="mt-6 space-y-2.5 text-xs text-ink-muted">
              <div className="flex items-center gap-2.5">
                <MapPin className="h-4 w-4 text-primary shrink-0" />
                <span>Tejgaon Industrial Area, Dhaka, Bangladesh</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="h-4 w-4 text-primary shrink-0" />
                <span>b2b@page-intl.com / sales@page-intl.com</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="h-4 w-4 text-primary shrink-0" />
                <span>+880 9612-PAGE-INTL (+880 9612-724346)</span>
              </div>
            </div>

            <div className="mt-6 flex gap-2">
              {[Facebook, Instagram, Linkedin, Youtube].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  aria-label="Social media link"
                  className="grid h-8 w-8 place-items-center rounded border border-ink-border text-ink-muted hover:border-primary hover:text-primary transition-colors"
                >
                  <Icon className="h-3.5 w-3.5" />
                </a>
              ))}
            </div>
          </div>

          {/* 6 Link Columns: Products, Equipment, EV, Solutions, Support, Company */}
          <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-6 gap-6">
            {cols.map((col) => (
              <div key={col.title}>
                <h3 className="text-xs font-bold uppercase tracking-[0.16em] text-ink-foreground border-b border-ink-border/50 pb-2">
                  {col.title}
                </h3>
                <ul className="mt-3.5 space-y-2 text-xs">
                  {col.links.map((link) => (
                    <li key={link.l}>
                      <Link
                        to={link.to}
                        search={link.search}
                        className="text-ink-muted transition-colors hover:text-primary"
                      >
                        {link.l}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Bar with Payment & Copyright */}
      <div className="border-t border-ink-border/70 bg-black/40">
        <div className="container-page flex flex-col gap-4 py-6 text-xs text-ink-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} PAGE International Ltd. All rights reserved. B2B Automotive Equipment & Spare Parts Distributor.
          </p>
          <div className="flex flex-wrap items-center gap-5">
            <span className="text-[11px] font-bold uppercase tracking-wider text-primary">
              THINK NEXT.
            </span>
            <Link to="/support" className="hover:text-ink-foreground">
              Privacy Policy
            </Link>
            <Link to="/support" className="hover:text-ink-foreground">
              Commercial Terms of Supply
            </Link>
            <Link to="/support" className="hover:text-ink-foreground">
              Equipment Warranty Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
