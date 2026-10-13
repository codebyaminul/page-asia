import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Bike,
  Car,
  Check,
  FileSpreadsheet,
  Grid,
  List,
  RotateCcw,
  Search,
  SlidersHorizontal,
  Star,
  Truck,
  Wrench,
  X,
  Zap,
} from "lucide-react";
import { useMemo, useState } from "react";
import { ProductCard } from "@/components/site/ProductCard";
import { QuoteModal } from "@/components/site/QuoteModal";
import {
  brands,
  categories,
  mobilitySegments,
  products,
  type MobilityType,
  type Product,
} from "@/lib/data";
import { useCart } from "@/lib/cart";

type S = {
  q?: string | undefined;
  cat?: string | undefined;
  vehicle?: string | undefined;
  brand?: string | undefined;
  type?: string | undefined;
  mobility?: string | undefined;
};

export const Route = createFileRoute("/shop/")({
  validateSearch: (s: Record<string, unknown>): S => ({
    q: typeof s["q"] === "string" ? (s["q"] as string) : undefined,
    cat: typeof s["cat"] === "string" ? (s["cat"] as string) : undefined,
    vehicle: typeof s["vehicle"] === "string" ? (s["vehicle"] as string) : undefined,
    brand: typeof s["brand"] === "string" ? (s["brand"] as string) : undefined,
    type: typeof s["type"] === "string" ? (s["type"] as string) : undefined,
    mobility: typeof s["mobility"] === "string" ? (s["mobility"] as string) : undefined,
  }),
  head: () => ({
    meta: [
      {
        title: "B2B Automotive Equipment & Parts Shop — PAGE International",
      },
      {
        name: "description",
        content:
          "Buy vehicle lifts, diagnostic tools, 4W, 2W, 3W and EV equipment, brake parts, batteries, synthetic oils and workshop machinery with verified compatibility.",
      },
      {
        property: "og:title",
        content: "Shop Automotive Equipment & Parts — PAGE International",
      },
      {
        property: "og:description",
        content:
          "Commercial automotive B2B catalog with 4W, 2W, 3W & EV mobility platforms.",
      },
    ],
  }),
  component: Shop,
});

export function Shop() {
  const {
    q = "",
    cat,
    vehicle,
    brand: searchBrand,
    type: searchType,
    mobility: searchMobility,
  } = Route.useSearch();
  const nav = Route.useNavigate();
  const { vehicle: savedVehicle } = useCart();

  const [query, setQuery] = useState(q);
  const [sort, setSort] = useState("featured");
  const [inStock, setInStock] = useState(false);
  const [selectedBrand, setSelectedBrand] = useState<string>(searchBrand ?? "");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [activeQuoteProduct, setActiveQuoteProduct] = useState<Product | null>(null);


  // Filter application
  const filteredList = useMemo(() => {
    let l = products.filter((p) => {
      // Mobility Platform filter (4-Wheeler, 2-Wheeler, 3-Wheeler, EV)
      if (searchMobility && searchMobility !== "All") {
        if (!p.mobility.includes(searchMobility as MobilityType)) return false;
      }

      // Category filter
      if (cat && p.category !== cat) return false;

      // Search query filter (matches name, brand, category, SKU, description)
      if (
        q &&
        !`${p.name} ${p.brand} ${p.category} ${p.sku} ${p.description} ${p.mobility.join(" ")}`
          .toLowerCase()
          .includes(q.toLowerCase())
      ) {
        return false;
      }

      // Brand filter
      if (selectedBrand && p.brand !== selectedBrand) return false;

      // Stock filter
      if (inStock && p.stock === "Out of stock") return false;

      // Product Type filter (Equipment vs Parts)
      if (searchType === "equipment" && !p.isEquipment) return false;
      if (searchType === "parts" && p.isEquipment) return false;

      // Vehicle compatibility filter
      if (vehicle) {
        const v =
          vehicle.split(" ")[1]?.toLowerCase() || vehicle.toLowerCase();
        const matchesFit = p.fits.some(
          (f) =>
            f.toLowerCase().includes(v) ||
            f.toLowerCase().includes("universal") ||
            f.toLowerCase().includes("most")
        );
        if (!matchesFit) return false;
      }

      return true;
    });

    // Commercial sorting (no numerical prices)
    if (sort === "rating") l = [...l].sort((a, b) => b.rating - a.rating);
    if (sort === "brand") l = [...l].sort((a, b) => a.brand.localeCompare(b.brand));
    if (sort === "name") l = [...l].sort((a, b) => a.name.localeCompare(b.name));

    return l;
  }, [
    q,
    cat,
    vehicle,
    selectedBrand,
    inStock,
    searchType,
    searchMobility,
    sort,
  ]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    nav({
      search: (s: S) => ({ ...s, q: query.trim() || undefined }),
    });
  };

  const handleClearAll = () => {
    setQuery("");
    setSelectedBrand("");
    setInStock(false);
    nav({
      search: () => ({}),
    });
  };

  return (
    <div className="bg-background text-foreground min-h-screen">
      {/* ======================================================== */}
      {/* SHOP HERO: COMPACT ULTRA-WIDE SHOWCASE VIDEO BANNER       */}
      {/* ======================================================== */}
      <section className="pt-20 sm:pt-24 lg:pt-26 pb-2 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Top Search & Category Navigation Pill Bar (Matching Reference Screenshot) */}
        <div className="flex flex-col items-center gap-4 mb-6">
          <form
            onSubmit={handleSearchSubmit}
            className="w-full max-w-2xl"
          >
            <div className="relative flex items-center shadow-xs">
              <input
                id="shop-q"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="What equipment, parts, or mobility platform are you looking for?"
                className="w-full h-12 sm:h-13 pl-12 pr-28 rounded-full bg-white border border-zinc-200/90 text-xs sm:text-sm text-zinc-900 shadow-sm placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
              />
              <Search className="absolute left-4.5 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
              <button
                type="submit"
                className="absolute right-1.5 top-1/2 -translate-y-1/2 h-9 sm:h-10 px-5 rounded-full bg-primary text-white text-xs font-bold uppercase tracking-wider hover:bg-primary/90 transition-all shadow-sm active:scale-95"
              >
                Search
              </button>
            </div>
          </form>

          {/* Quick Segment / Category Pills */}
          <div className="flex items-center gap-2 overflow-x-auto max-w-full pb-1 scrollbar-none text-xs font-semibold">
            <button
              type="button"
              onClick={() => {
                nav({ search: (s: S) => ({ ...s, mobility: undefined, cat: undefined }) });
              }}
              className={`px-4 py-1.5 rounded-full transition-all whitespace-nowrap ${
                !searchMobility && !cat
                  ? "bg-zinc-950 text-white shadow-xs font-bold"
                  : "bg-zinc-100 hover:bg-zinc-200/80 text-zinc-700"
              }`}
            >
              All Products
            </button>
            {mobilitySegments.map((m) => (
              <button
                key={m.id}
                type="button"
                onClick={() => {
                  nav({ search: (s: S) => ({ ...s, mobility: m.id }) });
                }}
                className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full transition-all whitespace-nowrap ${
                  searchMobility === m.id
                    ? "bg-primary text-white shadow-xs font-bold"
                    : "bg-zinc-100 hover:bg-zinc-200/80 text-zinc-700"
                }`}
              >
                {m.id === "4-Wheeler" && <Car className="h-3.5 w-3.5" />}
                {m.id === "2-Wheeler" && <Bike className="h-3.5 w-3.5" />}
                {m.id === "3-Wheeler" && <Truck className="h-3.5 w-3.5" />}
                {m.id === "EV" && <Zap className="h-3.5 w-3.5" />}
                <span>{m.id}</span>
              </button>
            ))}
            <button
              type="button"
              onClick={() => {
                nav({ search: (s: S) => ({ ...s, cat: "Garage Equipment" }) });
              }}
              className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full transition-all whitespace-nowrap ${
                cat === "Garage Equipment"
                  ? "bg-primary text-white shadow-xs font-bold"
                  : "bg-zinc-100 hover:bg-zinc-200/80 text-zinc-700"
              }`}
            >
              <Wrench className="h-3.5 w-3.5" />
              <span>Garage Equipment</span>
            </button>
          </div>
        </div>

        {/* Hero Video Banner Card: Controlled Sleek Height */}
        <div className="relative w-full rounded-2xl sm:rounded-3xl overflow-hidden bg-zinc-950 border border-zinc-200/90 dark:border-zinc-800 shadow-md ring-1 ring-black/5">
          <div className="relative w-full h-40 sm:h-48 md:h-56 lg:h-64 max-h-[265px] flex items-center justify-center bg-black overflow-hidden">
            <video
              src="/1013.mp4"
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover object-center pointer-events-none"
            />
          </div>
        </div>
      </section>

      {/* Main Shop Container */}
      <section className="container-page py-6 sm:py-8 lg:py-10">
        {/* Mobile Filter Toggle & Quick Bar */}
        <div className="flex items-center justify-between gap-4 mb-6 lg:hidden border-b border-border pb-4">
          <button
            onClick={() => setMobileFilterOpen(true)}
            className="btn btn-outline h-9 px-3 text-xs flex items-center gap-1.5"
          >
            <SlidersHorizontal className="h-3.5 w-3.5" />
            <span>
              Filters (
              {[
                searchMobility,
                cat,
                vehicle,
                selectedBrand,
                searchType,
                inStock ? "1" : "",
              ].filter(Boolean).length}
              )
            </span>
          </button>
          <span className="text-xs text-muted-foreground font-semibold">
            {filteredList.length} Products
          </span>
        </div>

        <div className="grid gap-10 lg:grid-cols-[270px_1fr]">
          {/* ======================================================== */}
          {/* LEFT: ADVANCED B2B FILTERS SIDEBAR                       */}
          {/* ======================================================== */}
          <aside className="hidden lg:block space-y-6">
            {/* Premium Filter Floating Container */}
            <div className="rounded-2xl border border-zinc-200/90 dark:border-zinc-800 bg-white dark:bg-zinc-900/90 p-5 shadow-xs space-y-6 sticky top-24">
              {/* Header / Reset */}
              <div className="flex items-center justify-between border-b border-border pb-3">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-foreground">
                  Catalogue Filters
                </span>
                {(cat ||
                  vehicle ||
                  selectedBrand ||
                  q ||
                  inStock ||
                  searchType ||
                  searchMobility) && (
                  <button
                    onClick={handleClearAll}
                    className="flex items-center gap-1 text-[11px] font-semibold text-primary hover:underline"
                  >
                    <RotateCcw className="h-3 w-3" /> Reset
                  </button>
                )}
              </div>

              {/* 1. Mobility Platform Filter (4W / 2W / 3W / EV) */}
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2.5 flex items-center gap-1.5">
                  <Car className="h-3.5 w-3.5 text-primary" /> Vehicle Platform
                </h3>
                <div className="space-y-1 text-xs">
                  <button
                    onClick={() =>
                      nav({ search: (s: S) => ({ ...s, mobility: undefined }) })
                    }
                    className={`w-full text-left rounded-lg px-2.5 py-1.5 font-medium transition-colors flex items-center justify-between ${
                      !searchMobility
                        ? "bg-primary text-white font-bold shadow-xs"
                        : "text-foreground hover:bg-secondary"
                    }`}
                  >
                    <span>All Platforms</span>
                    <span className="text-[11px] opacity-80">{products.length}</span>
                  </button>
                  {mobilitySegments.map((m) => {
                    const count = products.filter((p) =>
                      p.mobility.includes(m.id)
                    ).length;
                    const active = searchMobility === m.id;
                    return (
                      <button
                        key={m.id}
                        onClick={() =>
                          nav({ search: (s: S) => ({ ...s, mobility: m.id }) })
                        }
                        className={`w-full text-left rounded-lg px-2.5 py-1.5 font-medium transition-colors flex items-center justify-between ${
                          active
                            ? "bg-primary text-white font-bold shadow-xs"
                            : "text-foreground hover:bg-secondary"
                        }`}
                      >
                        <span className="truncate">{m.label}</span>
                        <span
                          className={`text-[11px] ${
                            active ? "text-white/90" : "text-muted-foreground"
                          }`}
                        >
                          {count}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 2. Vehicle compatibility quick selector */}
              <div className="rounded-xl border border-border bg-secondary/40 p-3 text-xs">
                <div className="flex items-center gap-1.5 font-bold uppercase tracking-wider text-foreground text-[11px]">
                  <Car className="h-3.5 w-3.5 text-primary" />
                  <span>Workshop Fleet Fitment</span>
                </div>
                {vehicle ? (
                  <div className="mt-2 text-xs">
                    <p className="font-semibold text-primary">{vehicle}</p>
                    <button
                      onClick={() =>
                        nav({ search: (s: S) => ({ ...s, vehicle: undefined }) })
                      }
                      className="mt-1 text-[11px] text-muted-foreground hover:text-foreground underline"
                    >
                      Clear fitment filter
                    </button>
                  </div>
                ) : savedVehicle ? (
                  <div className="mt-2 text-xs">
                    <p className="text-muted-foreground text-[11px]">Saved platform:</p>
                    <p className="font-bold text-foreground">
                      {savedVehicle.make} {savedVehicle.model} ({savedVehicle.year})
                    </p>
                    <button
                      onClick={() =>
                        nav({
                          search: (s: S) => ({
                            ...s,
                            vehicle: `${savedVehicle.make} ${savedVehicle.model}`,
                          }),
                        })
                      }
                      className="btn btn-primary mt-2 h-7 w-full text-[10px] font-bold uppercase tracking-wider"
                    >
                      Filter for this platform
                    </button>
                  </div>
                ) : (
                  <div className="mt-1.5 text-[11px] text-muted-foreground">
                    <p>Match lifts & spares with fleet models.</p>
                    <Link
                      to="/garage"
                      className="mt-1 block text-primary hover:underline font-semibold"
                    >
                      + Select vehicle model
                    </Link>
                  </div>
                )}
              </div>

              {/* 3. Product Nature Filter (Equipment vs Parts) */}
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2 flex items-center gap-1.5">
                  <Wrench className="h-3.5 w-3.5 text-primary" /> Commercial Category
                </h3>
                <div className="space-y-1.5 text-xs">
                  {[
                    { id: undefined, label: "All Items (Spares & Machinery)" },
                    { id: "equipment", label: "Commercial Garage Machinery" },
                    { id: "parts", label: "Replacement Auto Parts & Fluids" },
                  ].map((item) => (
                    <label
                      key={item.label}
                      className="flex items-center gap-2 cursor-pointer p-1 rounded-md hover:bg-secondary/40 transition-colors"
                    >
                      <input
                        type="radio"
                        name="shop-type"
                        checked={searchType === item.id}
                        onChange={() =>
                          nav({ search: (s: S) => ({ ...s, type: item.id }) })
                        }
                        className="accent-[var(--color-primary)]"
                      />
                      <span
                        className={
                          searchType === item.id
                            ? "font-bold text-foreground"
                            : "text-foreground/80"
                        }
                      >
                        {item.label}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* 4. Category Filter */}
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2">
                  Equipment & Parts Type
                </h3>
                <ul className="space-y-0.5 text-xs">
                  <li>
                    <Link
                      to="/shop"
                      search={(s: S) => ({ ...s, cat: undefined })}
                      className={`flex items-center justify-between rounded-lg px-2.5 py-1.5 font-medium transition-colors ${
                        !cat
                          ? "bg-primary text-white font-bold shadow-xs"
                          : "text-foreground hover:bg-secondary"
                      }`}
                    >
                      <span>All Categories</span>
                      <span className="text-[11px] opacity-80">{products.length}</span>
                    </Link>
                  </li>
                  {categories.map((c) => {
                    const count = products.filter((p) => p.category === c).length;
                    const active = cat === c;
                    return (
                      <li key={c}>
                        <Link
                          to="/shop"
                          search={(s: S) => ({ ...s, cat: c })}
                          className={`flex items-center justify-between rounded-lg px-2.5 py-1.5 font-medium transition-colors ${
                            active
                              ? "bg-primary text-white font-bold shadow-xs"
                              : "text-foreground hover:bg-secondary"
                          }`}
                        >
                          <span>{c}</span>
                          <span
                            className={`text-[11px] ${
                              active
                                ? "text-white/90"
                                : "text-muted-foreground"
                            }`}
                          >
                            {count}
                          </span>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>

              {/* 5. Brand Filter */}
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2">
                  Manufacturer Brands
                </h3>
                <div className="space-y-1 text-xs max-h-44 overflow-y-auto pr-1">
                  <label className="flex items-center gap-2 cursor-pointer p-1 rounded hover:bg-secondary/40">
                    <input
                      type="radio"
                      name="shop-brand"
                      checked={!selectedBrand}
                      onChange={() => setSelectedBrand("")}
                      className="accent-[var(--color-primary)]"
                    />
                    <span className="font-medium">All Brands</span>
                  </label>
                  {brands.map((b) => (
                    <label key={b} className="flex items-center gap-2 cursor-pointer p-1 rounded hover:bg-secondary/40">
                      <input
                        type="radio"
                        name="shop-brand"
                        checked={selectedBrand === b}
                        onChange={() => setSelectedBrand(b)}
                        className="accent-[var(--color-primary)]"
                      />
                      <span
                        className={
                          selectedBrand === b ? "font-bold text-primary" : "text-foreground/80"
                        }
                      >
                        {b}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* 6. Availability */}
              <div className="border-t border-border pt-4">
                <label className="flex items-center justify-between text-xs cursor-pointer">
                  <span className="font-semibold text-foreground">In Stock Only</span>
                  <input
                    type="checkbox"
                    checked={inStock}
                    onChange={(e) => setInStock(e.target.checked)}
                    className="h-4 w-4 rounded accent-[var(--color-primary)]"
                  />
                </label>
              </div>

              {/* Commercial B2B Quotation Concierge Card */}
              <div className="rounded-xl border border-primary/30 bg-primary/5 p-4 text-xs">
                <p className="font-mono text-[10px] font-bold uppercase tracking-wider text-primary">
                  Bulk Procurement
                </p>
                <p className="font-bold text-foreground mt-0.5">
                  Need Fleet or Workshop Supply?
                </p>
                <p className="text-muted-foreground mt-1 text-[11px] leading-relaxed">
                  Submit items to your RFQ cart or request custom site delivery with technical installation.
                </p>
                <Link
                  to="/support"
                  className="mt-3 inline-flex items-center gap-1.5 font-bold uppercase text-primary hover:underline text-[11px]"
                >
                  <FileSpreadsheet className="h-3.5 w-3.5" /> Direct RFP Inquiry →
                </Link>
              </div>
            </div>
          </aside>

          {/* ======================================================== */}
          {/* RIGHT: PRODUCT RESULTS & TOP CONTROLS                    */}
          {/* ======================================================== */}
          <div>
            {/* Top Controls Bar */}
            <div className="mb-6 flex flex-wrap items-center justify-between gap-4 border-b border-border pb-4">
              <div className="flex flex-wrap items-center gap-2 text-xs">
                <span className="font-bold text-foreground bg-secondary/80 px-2.5 py-1 rounded-full text-xs">
                  {filteredList.length} Items Available
                </span>
                {searchMobility && (
                  <Chip
                    label={`Platform: ${searchMobility}`}
                    onClear={() =>
                      nav({ search: (s: S) => ({ ...s, mobility: undefined }) })
                    }
                  />
                )}
                {vehicle && (
                  <Chip
                    label={`Fits: ${vehicle}`}
                    onClear={() =>
                      nav({ search: (s: S) => ({ ...s, vehicle: undefined }) })
                    }
                  />
                )}
                {cat && (
                  <Chip
                    label={`Category: ${cat}`}
                    onClear={() =>
                      nav({ search: (s: S) => ({ ...s, cat: undefined }) })
                    }
                  />
                )}
                {selectedBrand && (
                  <Chip
                    label={`Brand: ${selectedBrand}`}
                    onClear={() => setSelectedBrand("")}
                  />
                )}
                {searchType && (
                  <Chip
                    label={`Type: ${searchType}`}
                    onClear={() =>
                      nav({ search: (s: S) => ({ ...s, type: undefined }) })
                    }
                  />
                )}
                {q && (
                  <Chip
                    label={`Search: “${q}”`}
                    onClear={() => {
                      setQuery("");
                      nav({ search: (s: S) => ({ ...s, q: undefined }) });
                    }}
                  />
                )}
              </div>

              {/* Sort & Grid/List View Toggle */}
              <div className="flex items-center gap-3">
                <label className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
                  <span>Sort by:</span>
                  <select
                    value={sort}
                    onChange={(e) => setSort(e.target.value)}
                    className="h-8.5 rounded-lg border border-border bg-card px-2.5 text-xs text-foreground focus:border-primary focus:outline-none shadow-xs"
                  >
                    <option value="featured">Featured / Best Match</option>
                    <option value="rating">Highest Rated</option>
                    <option value="brand">Manufacturer Brand (A-Z)</option>
                    <option value="name">Product Name (A-Z)</option>
                  </select>
                </label>

                {/* Grid / List toggle */}
                <div className="hidden sm:flex items-center rounded-lg border border-border p-0.5 bg-card">
                  <button
                    onClick={() => setViewMode("grid")}
                    aria-label="Grid view"
                    className={`p-1.5 rounded-md transition-colors ${
                      viewMode === "grid"
                        ? "bg-foreground text-background shadow-xs"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    <Grid className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => setViewMode("list")}
                    aria-label="List view"
                    className={`p-1.5 rounded-md transition-colors ${
                      viewMode === "list"
                        ? "bg-foreground text-background shadow-xs"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    <List className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Product List Render */}
            {filteredList.length > 0 ? (
              viewMode === "grid" ? (
                <div className="grid grid-cols-2 gap-3.5 sm:gap-5 xl:grid-cols-3">
                  {filteredList.map((p) => (
                    <ProductCard
                      key={p.slug}
                      p={p}
                      onQuote={setActiveQuoteProduct}
                    />
                  ))}
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredList.map((p) => (
                    <ProductListRow
                      key={p.slug}
                      p={p}
                      onQuote={setActiveQuoteProduct}
                    />
                  ))}
                </div>
              )
            ) : (
              <div className="rounded-2xl border border-dashed border-border py-20 text-center bg-card/50">
                <h3 className="display-md text-foreground">No Products Found</h3>
                <p className="mt-2 text-sm text-muted-foreground max-w-md mx-auto">
                  We could not find any products matching your current combination
                  of filters. Try clearing some filters or searching by a broader term.
                </p>
                <div className="mt-6 flex justify-center gap-3">
                  <button
                    onClick={handleClearAll}
                    className="btn btn-primary h-10 text-xs font-bold uppercase rounded-full px-6"
                  >
                    Clear All Filters
                  </button>
                  <Link
                    to="/support"
                    className="btn btn-outline h-10 text-xs font-bold uppercase rounded-full px-6"
                  >
                    Request Custom Quote
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Mobile Filters Drawer */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 flex bg-black/60 backdrop-blur-xs lg:hidden">
          <div className="ml-auto w-full max-w-xs h-full bg-card p-6 overflow-y-auto flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between border-b border-border pb-4 mb-4">
                <h3 className="text-sm font-bold uppercase tracking-wider">
                  Filters
                </h3>
                <button
                  onClick={() => setMobileFilterOpen(false)}
                  aria-label="Close filters"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Mobile Mobility Platform */}
              <div className="mb-5">
                <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2">
                  Vehicle Platform
                </p>
                <div className="flex flex-wrap gap-1.5">
                  <button
                    onClick={() =>
                      nav({ search: (s: S) => ({ ...s, mobility: undefined }) })
                    }
                    className={`px-2.5 py-1 rounded text-xs ${
                      !searchMobility
                        ? "bg-primary text-primary-foreground font-bold"
                        : "bg-secondary"
                    }`}
                  >
                    All
                  </button>
                  {mobilitySegments.map((m) => (
                    <button
                      key={m.id}
                      onClick={() =>
                        nav({ search: (s: S) => ({ ...s, mobility: m.id }) })
                      }
                      className={`px-2.5 py-1 rounded text-xs ${
                        searchMobility === m.id
                          ? "bg-primary text-primary-foreground font-bold"
                          : "bg-secondary"
                      }`}
                    >
                      {m.id}
                    </button>
                  ))}
                </div>
              </div>

              {/* Mobile Category */}
              <div className="mb-5">
                <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2">
                  Category
                </p>
                <div className="flex flex-wrap gap-1.5">
                  <button
                    onClick={() =>
                      nav({ search: (s: S) => ({ ...s, cat: undefined }) })
                    }
                    className={`px-2.5 py-1 rounded text-xs ${
                      !cat
                        ? "bg-primary text-primary-foreground font-bold"
                        : "bg-secondary"
                    }`}
                  >
                    All
                  </button>
                  {categories.map((c) => (
                    <button
                      key={c}
                      onClick={() =>
                        nav({ search: (s: S) => ({ ...s, cat: c }) })
                      }
                      className={`px-2.5 py-1 rounded text-xs ${
                        cat === c
                          ? "bg-primary text-primary-foreground font-bold"
                          : "bg-secondary"
                      }`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>

              {/* Mobile In Stock */}
              <label className="flex items-center gap-2 text-xs mb-6 font-semibold">
                <input
                  type="checkbox"
                  checked={inStock}
                  onChange={(e) => setInStock(e.target.checked)}
                  className="h-4 w-4 rounded accent-[var(--color-primary)]"
                />
                In Stock Only
              </label>
            </div>

            <div className="pt-4 border-t border-border">
              <button
                onClick={() => setMobileFilterOpen(false)}
                className="btn btn-primary w-full h-10 text-xs font-bold uppercase"
              >
                Apply Filters ({filteredList.length} results)
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Direct Product Quotation Modal */}
      {activeQuoteProduct && (
        <QuoteModal
          product={activeQuoteProduct}
          onClose={() => setActiveQuoteProduct(null)}
        />
      )}
    </div>
  );
}

function Chip({ label, onClear }: { label: string; onClear: () => void }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-ink px-2.5 py-1 text-[11px] font-semibold text-ink-foreground shadow-xs">
      <span>{label}</span>
      <button
        onClick={onClear}
        aria-label={`Remove ${label}`}
        className="hover:text-primary transition-colors"
      >
        <X className="h-3 w-3" />
      </button>
    </span>
  );
}

// Row component for List view mode
function ProductListRow({
  p,
  onQuote,
}: {
  p: Product;
  onQuote?: (p: Product) => void;
}) {
  const { add, lines } = useCart();
  const out = p.stock === "Out of stock";
  const inCart = lines.some((l) => l.slug === p.slug);

  return (
    <article className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-5 rounded-2xl border border-zinc-200/90 dark:border-zinc-800 bg-card p-4 sm:p-5 hover:border-primary/40 hover:shadow-md transition-all">
      <div className="flex items-center gap-4">
        <Link
          to="/shop/$slug"
          params={{ slug: p.slug }}
          className="aspect-square h-24 w-24 shrink-0 overflow-hidden rounded-xl bg-gradient-to-b from-zinc-50 to-zinc-100/60 dark:from-zinc-900/40 dark:to-zinc-900/80 p-2 border border-zinc-200/60 dark:border-zinc-800"
        >
          <img
            src={p.image}
            alt={p.name}
            loading="lazy"
            className="h-full w-full object-contain mix-blend-multiply"
          />
        </Link>
        <div>
          <div className="flex flex-wrap items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
            <span className="text-primary font-bold">{p.brand}</span>
            <span>•</span>
            <span>{p.category}</span>
            <span>•</span>
            <span className="font-mono">{p.sku}</span>
            {p.mobility && p.mobility.length > 0 && (
              <>
                <span>•</span>
                <span className="text-foreground">{p.mobility.join(", ")}</span>
              </>
            )}
          </div>
          <Link
            to="/shop/$slug"
            params={{ slug: p.slug }}
            className="mt-1 block font-semibold text-foreground hover:text-primary transition-colors text-base leading-snug"
          >
            {p.name}
          </Link>
          <p className="mt-1 text-xs text-muted-foreground line-clamp-1 max-w-xl">
            {p.description}
          </p>
        </div>
      </div>

      <div className="flex sm:flex-col items-center sm:items-end justify-between shrink-0 pt-3 sm:pt-0 border-t sm:border-t-0 border-border gap-3">
        <div className="sm:text-right">
          <span className="block text-[9px] font-mono font-bold uppercase tracking-wider text-primary">
            Official Pricing
          </span>
          <div className="font-display text-sm sm:text-base font-bold text-foreground">
            Quotation on Request
          </div>
          <p
            className={`text-[10px] font-bold uppercase tracking-wider mt-0.5 ${
              out ? "text-destructive" : "text-emerald-600"
            }`}
          >
            ● {p.stock}
          </p>
        </div>

        <div className="flex items-center gap-2">
          {onQuote && (
            <button
              type="button"
              onClick={() => onQuote(p)}
              className="btn btn-outline border-primary/50 text-primary hover:bg-primary hover:text-white h-8.5 px-3.5 text-xs font-bold uppercase tracking-wider rounded-lg shadow-xs transition-all"
            >
              Get Quote
            </button>
          )}
          <button
            type="button"
            disabled={out}
            onClick={() => add(p.slug)}
            className={`h-8.5 px-3.5 text-xs font-bold uppercase tracking-wider rounded-lg transition-all ${
              inCart
                ? "bg-emerald-600 text-white hover:bg-emerald-700"
                : "btn btn-primary"
            }`}
          >
            {inCart ? "✓ In RFQ" : "+ RFQ Cart"}
          </button>
        </div>
      </div>
    </article>
  );
}
