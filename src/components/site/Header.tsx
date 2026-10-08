import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import {
  Building2,
  Car,
  ChevronDown,
  ChevronRight,
  FileText,
  Mail,
  MapPin,
  Menu,
  Phone,
  Search,
  ShieldCheck,
  ShoppingBag,
  Wrench,
  X,
  Zap,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useCart } from "@/lib/cart";

const navLinks = [
  { to: "/shop", label: "Products" },
  { to: "/shop", search: { cat: "Garage Equipment" }, label: "Garage Equipment" },
  { to: "/shop", search: { mobility: "EV" }, label: "EV" },
  { to: "/solutions", label: "Solutions" },
  { to: "/#brands", label: "Brands" },
  { to: "/support", label: "Support" },
  { to: "/about", label: "About" },
] as const;

export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link to="/" aria-label="PAGE International Ltd." className={`group flex items-center gap-2.5 ${className}`}>
      <span className="grid h-9 w-9 place-items-center bg-primary font-display text-xl font-bold text-primary-foreground shadow-sm transition-transform group-hover:scale-105">
        P
      </span>
      <div className="flex flex-col">
        <span className="font-display text-2xl font-bold tracking-[0.14em] text-ink-foreground leading-none">
          PAGE<span className="text-primary">.</span>
        </span>
        <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-ink-muted">
          International Ltd
        </span>
      </div>
    </Link>
  );
}

export function Header() {
  const path = useRouterState({ select: (s) => s.location.pathname });
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const { count } = useCart();

  useEffect(() => {
    setOpen(false);
    setSearchOpen(false);
  }, [path]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    navigate({ to: "/shop", search: { q: query.trim() } });
    setSearchOpen(false);
  };

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 bg-ink border-b border-ink-border text-ink-foreground shadow-md">
        {/* Top B2B Commercial Utility Bar */}
        <div className="hidden border-b border-ink-border/60 bg-black/45 text-[11px] font-medium text-ink-muted lg:block">
          <div className="container-page flex h-8 items-center justify-between">
            <div className="flex items-center gap-5">
              <span className="flex items-center gap-1.5 text-ink-foreground font-semibold">
                <Building2 className="h-3 w-3 text-primary" />
                <span>B2B Automotive Equipment & Parts</span>
              </span>
              <span className="flex items-center gap-1.5 hover:text-ink-foreground transition-colors">
                <Phone className="h-3 w-3 text-primary" />
                <span>+880 9612-PAGE-INTL</span>
              </span>
              <span className="flex items-center gap-1.5 hover:text-ink-foreground transition-colors">
                <Mail className="h-3 w-3 text-primary" />
                <span>b2b@page-intl.com</span>
              </span>
              <span className="hidden xl:flex items-center gap-1.5 text-ink-muted">
                <MapPin className="h-3 w-3 text-primary" />
                <span>Tejgaon Industrial Area, Dhaka</span>
              </span>
            </div>

            <div className="flex items-center gap-6">
              <Link to="/solutions" className="hover:text-ink-foreground transition-colors flex items-center gap-1">
                <Wrench className="h-3 w-3 text-primary" /> Workshop Setup & Upgrades
              </Link>
              <Link to="/support" className="hover:text-ink-foreground transition-colors flex items-center gap-1">
                <FileText className="h-3 w-3" /> Technical Catalogues & Warranty
              </Link>
              <Link to="/support" className="text-primary font-bold hover:underline">
                Request a Quote →
              </Link>
            </div>
          </div>
        </div>

        {/* Main Commercial Header */}
        <div className="container-page flex h-16 items-center justify-between gap-4 lg:h-[4.25rem]">
          <Logo />

          {/* Central Catalog Search Bar */}
          <form onSubmit={handleSearch} className="hidden flex-1 max-w-md mx-4 md:flex items-center">
            <div className="relative w-full">
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search equipment, 4W/2W/3W/EV parts, diagnostics, SKU..."
                className="h-9.5 w-full rounded bg-ink-2 pl-9 pr-16 text-xs text-ink-foreground placeholder:text-ink-muted border border-ink-border focus:border-primary focus:outline-none transition-colors"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-ink-muted" />
              <button
                type="submit"
                className="absolute right-1 top-1/2 -translate-y-1/2 h-7.5 px-2.5 rounded bg-primary text-[10px] font-bold uppercase tracking-wider text-primary-foreground hover:bg-primary/90"
              >
                Search
              </button>
            </div>
          </form>

          {/* Primary B2B Navigation */}
          <nav aria-label="Primary" className="hidden items-center gap-4 xl:gap-6 lg:flex">
            {navLinks.map((n) => (
              <Link
                key={n.label}
                to={n.to}
                search={"search" in n ? n.search : undefined}
                className="relative py-2 text-xs xl:text-[13px] font-bold uppercase tracking-wider text-ink-foreground/80 transition-colors hover:text-ink-foreground"
                activeProps={{
                  className: "!text-primary after:absolute after:inset-x-0 after:-bottom-1 after:h-0.5 after:bg-primary",
                }}
              >
                {n.label}
              </Link>
            ))}
          </nav>

          {/* Action CTAs */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              aria-label="Toggle mobile search"
              className="grid h-9 w-9 place-items-center hover:text-primary md:hidden"
            >
              <Search className="h-4.5 w-4.5" />
            </button>

            <Link
              to="/cart"
              aria-label={`Cart, ${count} items`}
              className="relative grid h-9 w-9 place-items-center rounded border border-ink-border hover:border-primary text-ink-foreground hover:text-primary transition-colors"
            >
              <ShoppingBag className="h-4.5 w-4.5" />
              {count > 0 && (
                <span className="absolute -right-1 -top-1 grid h-4.5 min-w-4.5 place-items-center rounded-full bg-primary px-1 text-[10px] font-black text-primary-foreground">
                  {count}
                </span>
              )}
            </Link>

            <Link
              to="/support"
              className="btn btn-primary h-9 px-4 text-xs font-bold uppercase tracking-wider hidden sm:inline-flex"
            >
              Request a Quote
            </Link>

            <button
              onClick={() => setOpen(true)}
              aria-label="Open mobile menu"
              className="grid h-9 w-9 place-items-center rounded border border-ink-border hover:border-primary lg:hidden"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Mobile search bar expandable */}
        {searchOpen && (
          <form onSubmit={handleSearch} className="border-t border-ink-border bg-ink-2 p-3 md:hidden">
            <div className="relative">
              <input
                type="search"
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search equipment, 4W/2W/3W/EV parts, diagnostics..."
                className="h-10 w-full rounded bg-ink px-4 pl-9 text-xs text-ink-foreground border border-ink-border focus:border-primary focus:outline-none"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-ink-muted" />
            </div>
          </form>
        )}
      </header>

      {/* Mobile Drawer Menu */}
      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
          className="fixed inset-0 z-[60] flex flex-col bg-ink text-ink-foreground animate-in fade-in duration-200"
        >
          <div className="container-page flex h-16 items-center justify-between border-b border-ink-border">
            <Logo />
            <button
              onClick={() => setOpen(false)}
              aria-label="Close menu"
              className="grid h-9 w-9 place-items-center rounded border border-ink-border text-ink-foreground"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="container-page p-4 border-b border-ink-border bg-ink-2">
            <form onSubmit={handleSearch}>
              <div className="relative">
                <input
                  type="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search equipment, parts, tools..."
                  className="h-10 w-full rounded bg-ink px-3 pl-9 text-xs text-ink-foreground border border-ink-border"
                />
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-ink-muted" />
              </div>
            </form>
          </div>

          <nav className="container-page flex-1 overflow-y-auto py-4">
            <ul className="divide-y divide-ink-border/50">
              {navLinks.map((n) => (
                <li key={n.label}>
                  <Link
                    to={n.to}
                    search={"search" in n ? n.search : undefined}
                    className="flex items-center justify-between py-3 font-display text-2xl font-bold uppercase tracking-wider text-ink-foreground hover:text-primary"
                  >
                    <span>{n.label}</span>
                    <ChevronRight className="h-4 w-4 text-ink-muted" />
                  </Link>
                </li>
              ))}
            </ul>

            <div className="mt-6 rounded border border-ink-border bg-ink-2 p-4">
              <p className="text-[11px] font-bold uppercase tracking-wider text-primary">
                B2B Commercial Portals
              </p>
              <div className="mt-3 grid grid-cols-2 gap-2 text-xs font-medium text-ink-muted">
                <Link to="/solutions" className="p-2.5 rounded bg-ink hover:text-ink-foreground">
                  Workshop Setup
                </Link>
                <Link to="/vehicles" className="p-2.5 rounded bg-ink hover:text-ink-foreground">
                  4W/2W/3W Directory
                </Link>
                <Link to="/support" className="p-2.5 rounded bg-ink hover:text-ink-foreground">
                  Download Catalogues
                </Link>
                <Link to="/about" className="p-2.5 rounded bg-ink hover:text-ink-foreground">
                  About PAGE
                </Link>
              </div>
            </div>
          </nav>

          <div className="container-page grid grid-cols-2 gap-3 pb-8 pt-4 border-t border-ink-border bg-ink">
            <Link to="/shop" className="btn btn-ghost-light h-11 text-xs font-bold uppercase">
              All Products
            </Link>
            <Link to="/support" className="btn btn-primary h-11 text-xs font-bold uppercase">
              Request a Quote
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
