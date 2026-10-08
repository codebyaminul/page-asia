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

export function Logo({ className = "" }: { className?: string; scrolled?: boolean }) {
  return (
    <Link to="/" aria-label="PAGE International Ltd." className={`group flex items-center ${className}`}>
      <img
        src="/page logo.png"
        alt="PAGE International Ltd."
        width={140}
        height={56}
        className="h-8 sm:h-9 md:h-10 w-auto object-contain transition-transform duration-200 group-hover:scale-105"
      />
    </Link>
  );
}

export function Header() {
  const path = useRouterState({ select: (s) => s.location.pathname });
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const { count } = useCart();

  useEffect(() => {
    setOpen(false);
    setSearchOpen(false);
  }, [path]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    navigate({ to: "/shop", search: { q: query.trim() } });
    setSearchOpen(false);
  };

  // Check if current page begins with dark hero/header
  const isDarkTopPage =
    path === "/" ||
    path.startsWith("/shop") ||
    path.startsWith("/solutions") ||
    path.startsWith("/support") ||
    path.startsWith("/about") ||
    path.startsWith("/service-centers");

  // Show liquid glass if user has scrolled down OR if on a light-background page like /cart or /checkout
  const isGlass = scrolled || !isDarkTopPage;

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ease-in-out ${
          isGlass
            ? "bg-white/80 backdrop-blur-2xl border-b border-white/80 shadow-[inset_0_1px_1.5px_0_rgba(255,255,255,1),0_12px_36px_-8px_rgba(0,0,0,0.08)] text-zinc-900"
            : "bg-gradient-to-b from-black/60 via-black/25 to-transparent border-b border-white/10 text-white"
        }`}
      >
        {/* Top B2B Commercial Utility Bar */}
        <div
          className={`hidden lg:block transition-all duration-300 ease-in-out ${
            scrolled
              ? "max-h-0 opacity-0 overflow-hidden py-0 pointer-events-none"
              : isGlass
              ? "max-h-10 opacity-100 border-b border-white/70 bg-white/50 text-[11px] font-semibold text-zinc-700 backdrop-blur-md"
              : "max-h-10 opacity-100 border-b border-white/10 bg-transparent text-[11px] font-semibold text-white/80"
          }`}
        >
          <div className="container-page flex h-8 items-center justify-between">
            <div className="flex items-center gap-5">
              <span className={`flex items-center gap-1.5 font-bold ${isGlass ? "text-zinc-950" : "text-white"}`}>
                <Building2 className="h-3.5 w-3.5 text-primary" />
                <span>B2B Automotive Equipment & Parts</span>
              </span>
              <span className={`flex items-center gap-1.5 transition-colors ${isGlass ? "hover:text-zinc-950" : "hover:text-white"}`}>
                <Phone className="h-3.5 w-3.5 text-primary" />
                <span>+880 9612-PAGE-INTL</span>
              </span>
              <span className={`flex items-center gap-1.5 transition-colors ${isGlass ? "hover:text-zinc-950" : "hover:text-white"}`}>
                <Mail className="h-3.5 w-3.5 text-primary" />
                <span>b2b@page-intl.com</span>
              </span>
              <span className={`hidden xl:flex items-center gap-1.5 ${isGlass ? "text-zinc-500" : "text-white/60"}`}>
                <MapPin className="h-3.5 w-3.5 text-primary" />
                <span>Tejgaon Industrial Area, Dhaka</span>
              </span>
            </div>

            <div className="flex items-center gap-6">
              <Link
                to="/solutions"
                className={`transition-colors flex items-center gap-1 font-medium ${isGlass ? "hover:text-zinc-950" : "hover:text-white"}`}
              >
                <Wrench className="h-3.5 w-3.5 text-primary" /> Workshop Setup & Upgrades
              </Link>
              <Link
                to="/support"
                className={`transition-colors flex items-center gap-1 font-medium ${isGlass ? "hover:text-zinc-950" : "hover:text-white"}`}
              >
                <FileText className="h-3.5 w-3.5" /> Technical Catalogues & Warranty
              </Link>
              <Link to="/support" className="text-primary font-bold hover:underline">
                Request a Quote →
              </Link>
            </div>
          </div>
        </div>

        {/* Main Header Row */}
        <div className="container-page flex h-16 items-center justify-between gap-4 lg:h-[4.25rem]">
          <Logo scrolled={isGlass} />

          {/* Central Catalog Search Bar */}
          <form onSubmit={handleSearch} className="hidden flex-1 max-w-md mx-4 md:flex items-center">
            <div className="relative w-full">
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search equipment, 4W/2W/3W/EV parts, diagnostics, SKU..."
                className={`h-9.5 w-full rounded-full pl-9 pr-18 text-xs transition-all ${
                  isGlass
                    ? "bg-white/75 text-zinc-900 placeholder:text-zinc-500 border border-white/90 focus:border-primary focus:bg-white shadow-[inset_0_1px_2px_rgba(0,0,0,0.05)]"
                    : "bg-white/10 text-white placeholder:text-white/60 border border-white/20 focus:border-white/50 focus:bg-white/15 backdrop-blur-sm shadow-none"
                } focus:outline-none`}
              />
              <Search
                className={`absolute left-3.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 ${
                  isGlass ? "text-zinc-500" : "text-white/70"
                }`}
              />
              <button
                type="submit"
                className="absolute right-1 top-1/2 -translate-y-1/2 h-7.5 px-3 rounded-full bg-primary text-[10px] font-bold uppercase tracking-wider text-white hover:bg-primary/90 shadow-sm transition-transform active:scale-95"
              >
                Search
              </button>
            </div>
          </form>

          {/* Primary Navigation Links */}
          <nav aria-label="Primary" className="hidden items-center gap-4 xl:gap-6 lg:flex">
            {navLinks.map((n) => (
              <Link
                key={n.label}
                to={n.to}
                search={"search" in n ? n.search : undefined}
                className={`relative py-2 text-xs xl:text-[13px] font-bold uppercase tracking-wider transition-colors ${
                  isGlass
                    ? "text-zinc-700 hover:text-primary"
                    : "text-white/85 hover:text-white"
                }`}
                activeProps={{
                  className: `${
                    isGlass ? "!text-primary" : "!text-white"
                  } after:absolute after:inset-x-0 after:-bottom-1 after:h-0.5 after:bg-primary after:shadow-[0_0_6px_rgba(224,36,36,0.6)]`,
                }}
              >
                {n.label}
              </Link>
            ))}
          </nav>

          {/* Action CTAs */}
          <div className="flex items-center gap-2.5">
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              aria-label="Toggle mobile search"
              className={`grid h-9 w-9 place-items-center md:hidden transition-colors ${
                isGlass ? "text-zinc-700 hover:text-zinc-900" : "text-white/90 hover:text-white"
              }`}
            >
              <Search className="h-4.5 w-4.5" />
            </button>

            <Link
              to="/cart"
              aria-label={`Cart, ${count} items`}
              className={`relative grid h-9.5 w-9.5 place-items-center rounded-full border transition-all ${
                isGlass
                  ? "border-white/80 bg-white/70 hover:bg-white text-zinc-800 shadow-xs"
                  : "border-white/20 bg-white/10 hover:bg-white/20 text-white backdrop-blur-sm"
              }`}
            >
              <ShoppingBag className="h-4 w-4" />
              {count > 0 && (
                <span className="absolute -right-1 -top-1 grid h-4.5 min-w-4.5 place-items-center rounded-full bg-primary px-1 text-[10px] font-black text-white shadow-md">
                  {count}
                </span>
              )}
            </Link>

            <Link
              to="/support"
              className="btn btn-primary h-9.5 px-4.5 text-xs font-bold uppercase tracking-wider hidden sm:inline-flex rounded-full shadow-lg shadow-primary/25 hover:shadow-primary/40 hover:-translate-y-0.5 transition-all"
            >
              Request a Quote
            </Link>

            <button
              onClick={() => setOpen(true)}
              aria-label="Open mobile menu"
              className={`grid h-9 w-9 place-items-center rounded-full border transition-all lg:hidden ${
                isGlass
                  ? "border-white/80 bg-white/70 hover:bg-white text-zinc-800 shadow-xs"
                  : "border-white/20 bg-white/10 hover:bg-white/20 text-white backdrop-blur-sm"
              }`}
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Mobile search bar expandable */}
        {searchOpen && (
          <form
            onSubmit={handleSearch}
            className={`border-t p-3 md:hidden backdrop-blur-xl ${
              isGlass ? "border-white/60 bg-white/85" : "border-white/10 bg-black/85"
            }`}
          >
            <div className="relative">
              <input
                type="search"
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search equipment, 4W/2W/3W/EV parts, diagnostics..."
                className={`h-10 w-full rounded-full px-4 pl-9 text-xs transition-all ${
                  isGlass
                    ? "bg-white text-zinc-900 placeholder:text-zinc-500 border border-zinc-200"
                    : "bg-white/10 text-white placeholder:text-white/60 border border-white/20"
                } focus:border-primary focus:outline-none shadow-xs`}
              />
              <Search
                className={`absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 ${
                  isGlass ? "text-zinc-500" : "text-white/60"
                }`}
              />
            </div>
          </form>
        )}
      </header>

      {/* Mobile Drawer Menu with Light Liquid Glass */}
      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
          className="fixed inset-0 z-[60] flex flex-col bg-white/95 backdrop-blur-2xl text-zinc-900 animate-in fade-in duration-200"
        >
          <div className="container-page flex h-16 items-center justify-between border-b border-zinc-200">
            <Logo scrolled={true} />
            <button
              onClick={() => setOpen(false)}
              aria-label="Close menu"
              className="grid h-9 w-9 place-items-center rounded-full border border-zinc-200 text-zinc-900 hover:bg-zinc-100"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="container-page p-4 border-b border-zinc-200 bg-white/40 backdrop-blur-md">
            <form onSubmit={handleSearch}>
              <div className="relative">
                <input
                  type="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search equipment, parts, tools..."
                  className="h-10 w-full rounded-full bg-white px-3 pl-9 text-xs text-zinc-900 placeholder:text-zinc-500 border border-zinc-200 focus:border-primary"
                />
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
              </div>
            </form>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-1">
            {navLinks.map((n) => (
              <Link
                key={n.label}
                to={n.to}
                search={"search" in n ? n.search : undefined}
                className="flex items-center justify-between py-3 px-3 rounded hover:bg-zinc-100 text-sm font-bold uppercase tracking-wider text-zinc-900"
              >
                <span>{n.label}</span>
                <ChevronRight className="h-4 w-4 text-zinc-400" />
              </Link>
            ))}
          </div>

          <div className="p-4 border-t border-zinc-200 bg-white/60 backdrop-blur-md space-y-3">
            <Link
              to="/support"
              className="btn btn-primary h-11 w-full text-xs font-bold uppercase tracking-wider shadow-lg rounded-full"
            >
              Request a Quote
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
