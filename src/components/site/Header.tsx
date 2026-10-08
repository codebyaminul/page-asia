import { Link, useRouterState } from "@tanstack/react-router";
import { Menu, Search, ShoppingBag, User, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useCart } from "@/lib/cart";

const nav = [
  { to: "/shop", label: "Shop" },
  { to: "/services", label: "Services" },
  { to: "/vehicles", label: "Vehicles" },
  { to: "/solutions", label: "Solutions" },
  { to: "/support", label: "Support" },
  { to: "/about", label: "About" },
] as const;

export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link to="/" aria-label="PAGE International — home" className={`flex items-center gap-2 ${className}`}>
      <span className="grid h-8 w-8 place-items-center bg-primary font-display text-lg font-bold text-primary-foreground">P</span>
      <span className="font-display text-2xl font-bold tracking-[0.12em]">PAGE</span>
    </Link>
  );
}

export function Header() {
  const path = useRouterState({ select: (s) => s.location.pathname });
  const onHome = path === "/";
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { count } = useCart();

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 40);
    on(); window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  useEffect(() => setOpen(false), [path]);

  const solid = !onHome || scrolled;
  return (
    <>
      <header className={`fixed inset-x-0 top-0 z-50 text-ink-foreground transition-colors duration-300 ${solid ? "bg-ink/95 backdrop-blur border-b border-ink-border" : "bg-transparent"}`}>
        <div className="container-page flex h-16 items-center justify-between gap-6 lg:h-20">
          <Logo />
          <nav aria-label="Primary" className="hidden items-center gap-8 lg:flex">
            {nav.map((n) => (
              <Link key={n.to} to={n.to} className="relative py-2 text-sm font-medium tracking-wide text-ink-foreground/80 transition-colors hover:text-ink-foreground"
                activeProps={{ className: "!text-ink-foreground after:absolute after:inset-x-0 after:-bottom-0.5 after:h-0.5 after:bg-primary" }}>
                {n.label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-1">
            <Link to="/shop" aria-label="Search products" className="grid h-10 w-10 place-items-center hover:text-primary"><Search className="h-5 w-5" /></Link>
            <Link to="/garage" aria-label="My account" className="hidden h-10 w-10 place-items-center hover:text-primary sm:grid"><User className="h-5 w-5" /></Link>
            <Link to="/cart" aria-label={`Cart, ${count} items`} className="relative grid h-10 w-10 place-items-center hover:text-primary">
              <ShoppingBag className="h-5 w-5" />
              {count > 0 && <span className="absolute right-0.5 top-0.5 grid h-4 min-w-4 place-items-center rounded-full bg-primary px-1 text-[10px] font-bold text-primary-foreground">{count}</span>}
            </Link>
            <Link to="/services/book" className="btn btn-primary ml-3 hidden h-10 lg:inline-flex">Book Service</Link>
            <button onClick={() => setOpen(true)} aria-label="Open menu" className="grid h-10 w-10 place-items-center lg:hidden"><Menu className="h-6 w-6" /></button>
          </div>
        </div>
      </header>

      {open && (
        <div role="dialog" aria-modal="true" aria-label="Menu" className="fixed inset-0 z-[60] flex flex-col bg-ink text-ink-foreground animate-in fade-in duration-200">
          <div className="container-page flex h-16 items-center justify-between">
            <Logo />
            <button onClick={() => setOpen(false)} aria-label="Close menu" className="grid h-10 w-10 place-items-center"><X className="h-6 w-6" /></button>
          </div>
          <nav className="container-page mt-6 flex-1 overflow-y-auto">
            <ul className="border-t border-ink-border">
              {nav.map((n, i) => (
                <li key={n.to} className="border-b border-ink-border">
                  <Link to={n.to} className="flex items-baseline justify-between py-4 font-display text-4xl font-bold uppercase hover:text-primary">
                    {n.label}<span className="text-xs text-ink-muted">0{i + 1}</span>
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-8 grid grid-cols-2 gap-3 text-sm text-ink-muted">
              <Link to="/garage" className="hover:text-ink-foreground">My Garage</Link>
              <Link to="/garage" className="hover:text-ink-foreground">My Orders</Link>
              <Link to="/garage" className="hover:text-ink-foreground">My Bookings</Link>
              <Link to="/support" className="hover:text-ink-foreground">Contact</Link>
            </div>
          </nav>
          <div className="container-page grid grid-cols-2 gap-3 pb-8 pt-4">
            <Link to="/shop" className="btn btn-ghost-light">Shop Parts</Link>
            <Link to="/services/book" className="btn btn-primary">Book Service</Link>
          </div>
        </div>
      )}
    </>
  );
}
