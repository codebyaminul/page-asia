import { Link, useRouterState } from "@tanstack/react-router";
import {
  ChevronDown,
  ChevronRight,
  Menu,
  ShoppingBag,
  Wrench,
  X,
  Zap,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useCart } from "@/lib/cart";

const shopLinks = [
  {
    to: "/shop",
    label: "Products",
    desc: "Complete catalog of parts, tools & workshop machinery",
    icon: ShoppingBag,
  },
  {
    to: "/shop",
    search: { cat: "Garage Equipment" },
    label: "Garage Equipment",
    desc: "Lifts, tyre changers, wheel balancers & compressors",
    icon: Wrench,
  },
  {
    to: "/shop",
    search: { mobility: "EV" },
    label: "EV",
    desc: "Electric vehicle tools, battery analyzers & safety kits",
    icon: Zap,
  },
] as const;

const navLinks = [
  { to: "/solutions", label: "Solutions" },
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
  const [shopDropdownOpen, setShopDropdownOpen] = useState(false);
  const [mobileShopOpen, setMobileShopOpen] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const { count } = useCart();

  useEffect(() => {
    setOpen(false);
    setShopDropdownOpen(false);
  }, [path]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Check if current page begins with dark hero/header
  const isDarkTopPage =
    path === "/" ||
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


        {/* Main Header Row */}
        <div className="container-page flex h-16 items-center justify-between gap-4 lg:h-[4.25rem]">
          <Logo scrolled={isGlass} />


          {/* Primary Navigation Links */}
          <nav aria-label="Primary" className="hidden items-center gap-4 xl:gap-6 lg:flex">
            {/* Shop Dropdown Button & Submenu */}
            <div
              className="relative"
              onMouseEnter={() => setShopDropdownOpen(true)}
              onMouseLeave={() => setShopDropdownOpen(false)}
            >
              <button
                type="button"
                onClick={() => setShopDropdownOpen((v) => !v)}
                aria-expanded={shopDropdownOpen}
                className={`relative flex items-center gap-1.5 py-2 text-xs xl:text-[13px] font-bold uppercase tracking-wider transition-colors ${
                  isGlass
                    ? "text-zinc-700 hover:text-primary"
                    : "text-white/85 hover:text-white"
                } ${
                  path.startsWith("/shop")
                    ? isGlass
                      ? "!text-primary after:absolute after:inset-x-0 after:-bottom-1 after:h-0.5 after:bg-primary after:shadow-[0_0_6px_rgba(224,36,36,0.6)]"
                      : "!text-white after:absolute after:inset-x-0 after:-bottom-1 after:h-0.5 after:bg-primary after:shadow-[0_0_6px_rgba(224,36,36,0.6)]"
                    : ""
                }`}
              >
                <span>Shop</span>
                <ChevronDown
                  className={`h-3.5 w-3.5 transition-transform duration-200 ${
                    shopDropdownOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* Dropdown Menu */}
              {shopDropdownOpen && (
                <div className="absolute left-0 top-full pt-2 z-50 min-w-[280px] animate-in fade-in slide-in-from-top-1 duration-150">
                  <div className="rounded-xl border border-zinc-200/90 bg-white/95 p-2 shadow-2xl backdrop-blur-2xl ring-1 ring-black/5 text-zinc-900">
                    <div className="px-3 py-1.5 text-[10px] font-mono font-bold tracking-wider uppercase text-zinc-600">
                      Product Categories
                    </div>
                    <div className="space-y-1">
                      {shopLinks.map((item) => (
                        <Link
                          key={item.label}
                          to={item.to}
                          search={"search" in item ? item.search : undefined}
                          onClick={() => setShopDropdownOpen(false)}
                          className="group flex items-start gap-3 rounded-lg p-2.5 transition-colors hover:bg-zinc-100"
                        >
                          <div className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-md bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-white">
                            <item.icon className="h-4 w-4" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="text-xs font-bold uppercase tracking-wider text-zinc-900 group-hover:text-primary transition-colors">
                              {item.label}
                            </div>
                            <div className="text-[11px] text-zinc-600 line-clamp-1">
                              {item.desc}
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {navLinks.map((n) => (
              <Link
                key={n.label}
                to={n.to}
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



          <div className="flex-1 overflow-y-auto p-4 space-y-1">
            {/* Shop expandable item */}
            <div className="space-y-1">
              <button
                type="button"
                onClick={() => setMobileShopOpen((v) => !v)}
                className="flex w-full items-center justify-between py-3 px-3 rounded hover:bg-zinc-100 text-sm font-bold uppercase tracking-wider text-zinc-900"
              >
                <span className="flex items-center gap-2.5">
                  <ShoppingBag className="h-4 w-4 text-primary" />
                  Shop
                </span>
                <ChevronDown
                  className={`h-4 w-4 text-zinc-400 transition-transform duration-200 ${
                    mobileShopOpen ? "rotate-180 text-primary" : ""
                  }`}
                />
              </button>

              {mobileShopOpen && (
                <div className="ml-3 pl-3 border-l-2 border-primary/20 space-y-1 py-1">
                  {shopLinks.map((item) => (
                    <Link
                      key={item.label}
                      to={item.to}
                      search={"search" in item ? item.search : undefined}
                      onClick={() => setOpen(false)}
                      className="flex items-center justify-between py-2 px-3 rounded hover:bg-zinc-100 text-xs font-bold uppercase tracking-wider text-zinc-700 hover:text-primary"
                    >
                      <div className="flex items-center gap-2">
                        <item.icon className="h-3.5 w-3.5 text-primary" />
                        <span>{item.label}</span>
                      </div>
                      <ChevronRight className="h-3.5 w-3.5 text-zinc-400" />
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {navLinks.map((n) => (
              <Link
                key={n.label}
                to={n.to}
                onClick={() => setOpen(false)}
                className="flex items-center justify-between py-3 px-3 rounded hover:bg-zinc-100 text-sm font-bold uppercase tracking-wider text-zinc-900"
              >
                <span>{n.label}</span>
                <ChevronRight className="h-4 w-4 text-zinc-400" />
              </Link>
            ))}
          </div>

          <div className="p-4 border-t border-zinc-200 bg-white/60 backdrop-blur-md space-y-3">
            <Link
              to="/cart"
              onClick={() => setOpen(false)}
              className="btn btn-primary h-11 w-full text-xs font-bold uppercase tracking-wider shadow-lg rounded-full flex items-center justify-center gap-2"
            >
              <ShoppingBag className="h-4 w-4" />
              <span>Quotation Cart {count > 0 ? `(${count})` : ""}</span>
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
