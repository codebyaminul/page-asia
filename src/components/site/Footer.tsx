import { Link } from "@tanstack/react-router";
import { Facebook, Instagram, Linkedin, Youtube } from "lucide-react";
import { Logo } from "./Header";

const cols: { title: string; links: [string, string][] }[] = [
  { title: "Shop", links: [["Auto Parts", "/shop"], ["Accessories", "/shop"], ["Diagnostic Tools", "/shop"], ["EV", "/shop"], ["Equipment", "/shop"]] },
  { title: "Services", links: [["Vehicle Service", "/services"], ["Diagnostics", "/services"], ["AC Service", "/services"], ["Brake Service", "/services"], ["EV Service", "/services"], ["ADAS", "/services"]] },
  { title: "Support", links: [["Contact", "/support"], ["Warranty", "/support"], ["Service Centers", "/service-centers"], ["Manuals", "/support"], ["FAQ", "/support"]] },
  { title: "Company", links: [["About", "/about"], ["Brands", "/about"], ["Solutions", "/solutions"], ["News", "/about"], ["Careers", "/about"]] },
];

export function Footer() {
  return (
    <footer className="bg-ink text-ink-foreground">
      <div className="container-page grid gap-12 py-16 lg:grid-cols-[1.3fr_repeat(4,1fr)]">
        <div>
          <Logo />
          <p className="mt-5 max-w-xs text-sm text-ink-muted">Parts, service and automotive technology — everything your vehicle needs, in one place.</p>
          <div className="mt-6 flex gap-2">
            {[Facebook, Instagram, Linkedin, Youtube].map((I, i) => (
              <a key={i} href="#" aria-label="Social link" className="grid h-10 w-10 place-items-center border border-ink-border hover:border-primary hover:text-primary"><I className="h-4 w-4" /></a>
            ))}
          </div>
        </div>
        {cols.map((c) => (
          <div key={c.title}>
            <h3 className="text-sm tracking-[0.2em] text-ink-muted">{c.title}</h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              {c.links.map(([l, to]) => <li key={l}><Link to={to} className="text-ink-foreground/80 hover:text-primary">{l}</Link></li>)}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-ink-border">
        <div className="container-page flex flex-col gap-3 py-6 text-xs text-ink-muted sm:flex-row sm:justify-between">
          <p>© {new Date().getFullYear()} PAGE International Ltd. Prototype — product and service data is illustrative.</p>
          <div className="flex gap-5"><a href="#">Privacy</a><a href="#">Terms</a><a href="#">Returns</a></div>
        </div>
      </div>
    </footer>
  );
}
