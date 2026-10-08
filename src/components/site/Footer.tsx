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
} from "lucide-react";
import { Logo } from "./Header";

const cols = [
  {
    title: "Automotive Parts",
    links: [
      { l: "Brake Systems & Pads", to: "/shop?cat=Brakes" },
      { l: "AGM & EFB Batteries", to: "/shop?cat=Batteries" },
      { l: "Engine Oils & Lubricants", to: "/shop?cat=Lubricants" },
      { l: "Diagnostic Scanners", to: "/shop?cat=Diagnostics" },
      { l: "Filters & Maintenance", to: "/shop?cat=Filters" },
      { l: "EV Spares & Components", to: "/shop?cat=EV" },
    ],
  },
  {
    title: "Garage Equipment",
    links: [
      { l: "2-Post & Scissor Lifts", to: "/shop?cat=Equipment" },
      { l: "Automatic Tyre Changers", to: "/shop?cat=Equipment" },
      { l: "Digital Wheel Balancers", to: "/shop?cat=Equipment" },
      { l: "Rotary Air Compressors", to: "/shop?cat=Equipment" },
      { l: "Workshop Tools & Presses", to: "/shop?cat=Equipment" },
      { l: "Turnkey Bay Setup", to: "/solutions" },
    ],
  },
  {
    title: "Workshop Services",
    links: [
      { l: "Scheduled Vehicle Service", to: "/services" },
      { l: "Computerised Diagnostics", to: "/services" },
      { l: "Air Conditioning Service", to: "/services" },
      { l: "Brake Overhaul & Bleeding", to: "/services" },
      { l: "4-Wheel Laser Alignment", to: "/services" },
      { l: "Book Service Online", to: "/services/book" },
    ],
  },
  {
    title: "Customer Support",
    links: [
      { l: "Service Center Locator", to: "/service-centers" },
      { l: "Request B2B Quotation", to: "/support" },
      { l: "Warranty & Fitment Support", to: "/support" },
      { l: "Shop by Vehicle", to: "/vehicles" },
      { l: "My Garage Portal", to: "/garage" },
      { l: "About PAGE International", to: "/about" },
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
                100% Genuine Quality
              </p>
              <p className="text-[11px] text-ink-muted">Certified OEM & Aftermarket Spares</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded bg-primary/10 text-primary">
              <Wrench className="h-5 w-5" />
            </span>
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-ink-foreground">
                Commercial Equipment
              </p>
              <p className="text-[11px] text-ink-muted">Installation & Technician Training</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded bg-primary/10 text-primary">
              <Truck className="h-5 w-5" />
            </span>
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-ink-foreground">
                Nationwide Logistics
              </p>
              <p className="text-[11px] text-ink-muted">Fast distribution across hubs</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded bg-primary/10 text-primary">
              <Phone className="h-5 w-5" />
            </span>
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-ink-foreground">
                Direct Technical Hotline
              </p>
              <p className="text-[11px] text-ink-muted">+880 9612-PAGE-INTL</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Link Columns */}
      <div className="container-page py-14 lg:py-16">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_repeat(4,1fr)]">
          {/* Company Brief */}
          <div>
            <Logo />
            <p className="mt-4 text-xs leading-relaxed text-ink-muted max-w-sm">
              PAGE International Ltd. is a premier distributor and provider of automotive spare parts, commercial garage workshop equipment, electronic diagnostics, and vehicle servicing solutions.
            </p>

            <div className="mt-6 space-y-2 text-xs text-ink-muted">
              <div className="flex items-center gap-2">
                <MapPin className="h-3.5 w-3.5 text-primary shrink-0" />
                <span>Tejgaon Industrial Area, Dhaka, Bangladesh</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-3.5 w-3.5 text-primary shrink-0" />
                <span>sales@page-intl.com / b2b@page-intl.com</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-3.5 w-3.5 text-primary shrink-0" />
                <span>+880 9612-724346</span>
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

          {/* Links */}
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

      {/* Bottom Bar with Payment & Copyright */}
      <div className="border-t border-ink-border/70 bg-black/40">
        <div className="container-page flex flex-col gap-4 py-6 text-xs text-ink-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} PAGE International Ltd. All rights reserved. Registered automotive supplier & workshop service platform.
          </p>
          <div className="flex flex-wrap items-center gap-5">
            <span className="text-[11px] font-bold uppercase tracking-wider text-primary">
              THINK NEXT.
            </span>
            <Link to="/support" className="hover:text-ink-foreground">
              Privacy Policy
            </Link>
            <Link to="/support" className="hover:text-ink-foreground">
              Terms of Supply
            </Link>
            <Link to="/support" className="hover:text-ink-foreground">
              Warranty & Returns
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
