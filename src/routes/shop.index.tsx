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
import { PageHeader } from "@/components/site/PageHeader";
import { ProductCard } from "@/components/site/ProductCard";
import {
  brands,
  categories,
  mobilitySegments,
  products,
  taka,
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
  const [priceRange, setPriceRange] = useState<string>("all");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

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

      // Price range
      if (priceRange === "under10k" && p.price >= 10000) return false;
      if (
        priceRange === "10k-50k" &&
        (p.price < 10000 || p.price > 50000)
      )
        return false;
      if (
        priceRange === "50k-150k" &&
        (p.price < 50000 || p.price > 150000)
      )
        return false;
      if (priceRange === "above150k" && p.price < 150000) return false;

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

    // Sorting
    if (sort === "low") l = [...l].sort((a, b) => a.price - b.price);
    if (sort === "high") l = [...l].sort((a, b) => b.price - a.price);
    if (sort === "rating") l = [...l].sort((a, b) => b.rating - a.rating);

    return l;
  }, [
    q,
    cat,
    vehicle,
    selectedBrand,
    inStock,
    priceRange,
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
    setPriceRange("all");
    setInStock(false);
    nav({
      search: () => ({}),
    });
  };

  return (
    <div className="bg-background text-foreground min-h-screen">
      <PageHeader
        eyebrow="B2B Commercial Catalogue"
        title="Automotive Equipment & Spare Parts"
        intro="Source workshop lifts, diagnostic computers, OEM replacement parts, lubricants, and EV tooling. Dual-option checkout: Buy directly or request commercial quotes."
      >
        <form onSubmit={handleSearchSubmit} className="flex w-full max-w-xl">
          <label htmlFor="shop-q" className="sr-only">
            Search parts or equipment
          </label>
          <div className="relative flex-1">
            <input
              id="shop-q"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search equipment, parts, SKU, or vehicle..."
              className="field-dark rounded-r-none pl-9 text-xs sm:text-sm"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-ink-muted" />
          </div>
          <button
            type="submit"
            className="btn btn-primary h-[2.85rem] rounded-l-none px-5 text-xs font-bold uppercase tracking-wider"
          >
            Search
          </button>
        </form>
      </PageHeader>

      {/* Main Shop Container */}
      <section className="container-page py-10 lg:py-14">
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
          <aside className="hidden lg:block space-y-7 border-r border-border pr-8">
            {/* Header / Reset */}
            <div className="flex items-center justify-between border-b border-border pb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-foreground">
                Filter Catalogue
              </span>
              {(cat ||
                vehicle ||
                selectedBrand ||
                q ||
                inStock ||
                priceRange !== "all" ||
                searchType ||
                searchMobility) && (
                <button
                  onClick={handleClearAll}
                  className="flex items-center gap-1 text-[11px] font-semibold text-primary hover:underline"
                >
                  <RotateCcw className="h-3 w-3" /> Reset All
                </button>
              )}
            </div>

            {/* 1. Mobility Platform Filter (4W / 2W / 3W / EV) */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3 flex items-center gap-1.5">
                <Car className="h-3.5 w-3.5 text-primary" /> Vehicle Platform
              </h3>
              <div className="space-y-1 text-xs">
                <button
                  onClick={() =>
                    nav({ search: (s: S) => ({ ...s, mobility: undefined }) })
                  }
                  className={`w-full text-left rounded px-2.5 py-1.5 font-medium transition-colors flex items-center justify-between ${
                    !searchMobility
                      ? "bg-primary text-primary-foreground font-bold"
                      : "text-foreground hover:bg-secondary"
                  }`}
                >
                  <span>All Platforms</span>
                  <span>{products.length}</span>
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
                      className={`w-full text-left rounded px-2.5 py-1.5 font-medium transition-colors flex items-center justify-between ${
                        active
                          ? "bg-primary text-primary-foreground font-bold"
                          : "text-foreground hover:bg-secondary"
                      }`}
                    >
                      <span className="truncate">{m.label}</span>
                      <span
                        className={
                          active
                            ? "text-primary-foreground/80"
                            : "text-muted-foreground"
                        }
                      >
                        {count}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 2. Vehicle compatibility quick selector */}
            <div className="rounded border border-border bg-secondary/50 p-3.5">
              <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-foreground">
                <Car className="h-3.5 w-3.5 text-primary" />
                <span>Fitment Check</span>
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
                  <p className="text-muted-foreground">Saved platform:</p>
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
                    className="btn btn-primary mt-2 h-7 w-full text-[10px] font-bold"
                  >
                    Filter for this platform
                  </button>
                </div>
              ) : (
                <div className="mt-2 text-xs text-muted-foreground">
                  <p>No platform chosen.</p>
                  <Link
                    to="/garage"
                    className="mt-1 block text-primary hover:underline font-semibold"
                  >
                    + Select platform
                  </Link>
                </div>
              )}
            </div>

            {/* 3. Product Nature Filter (Equipment vs Parts) */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3 flex items-center gap-1.5">
                <Wrench className="h-3.5 w-3.5 text-primary" /> Product Type
              </h3>
              <div className="space-y-1.5 text-xs">
                {[
                  { id: undefined, label: "All Items (Spares & Machinery)" },
                  { id: "equipment", label: "Commercial Garage Machinery" },
                  { id: "parts", label: "Replacement Auto Parts & Fluids" },
                ].map((item) => (
                  <label
                    key={item.label}
                    className="flex items-center gap-2 cursor-pointer"
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
              <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3">
                Categories
              </h3>
              <ul className="space-y-1 text-xs">
                <li>
                  <Link
                    to="/shop"
                    search={(s: S) => ({ ...s, cat: undefined })}
                    className={`flex items-center justify-between rounded px-2.5 py-1.5 font-medium transition-colors ${
                      !cat
                        ? "bg-primary text-primary-foreground font-bold"
                        : "text-foreground hover:bg-secondary"
                    }`}
                  >
                    <span>All Categories</span>
                    <span>{products.length}</span>
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
                        className={`flex items-center justify-between rounded px-2.5 py-1.5 font-medium transition-colors ${
                          active
                            ? "bg-primary text-primary-foreground font-bold"
                            : "text-foreground hover:bg-secondary"
                        }`}
                      >
                        <span>{c}</span>
                        <span
                          className={
                            active
                              ? "text-primary-foreground/80"
                              : "text-muted-foreground"
                          }
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
              <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3">
                Manufacturer Brands
              </h3>
              <div className="space-y-1.5 text-xs max-h-48 overflow-y-auto pr-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="shop-brand"
                    checked={!selectedBrand}
                    onChange={() => setSelectedBrand("")}
                    className="accent-[var(--color-primary)]"
                  />
                  <span>All Brands</span>
                </label>
                {brands.map((b) => (
                  <label key={b} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="shop-brand"
                      checked={selectedBrand === b}
                      onChange={() => setSelectedBrand(b)}
                      className="accent-[var(--color-primary)]"
                    />
                    <span
                      className={
                        selectedBrand === b ? "font-bold text-primary" : ""
                      }
                    >
                      {b}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* 6. Price Range Filter */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3">
                Price Range
              </h3>
              <div className="space-y-1.5 text-xs">
                {[
                  { id: "all", label: "All Prices" },
                  { id: "under10k", label: "Under ৳10,000" },
                  { id: "10k-50k", label: "৳10,000 – ৳50,000" },
                  { id: "50k-150k", label: "৳50,000 – ৳150,000" },
                  { id: "above150k", label: "Above ৳150,000 (Machinery)" },
                ].map((pr) => (
                  <label key={pr.id} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="price-filter"
                      checked={priceRange === pr.id}
                      onChange={() => setPriceRange(pr.id)}
                      className="accent-[var(--color-primary)]"
                    />
                    <span>{pr.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* 7. Availability */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3">
                Availability
              </h3>
              <label className="flex items-center gap-2 text-xs cursor-pointer">
                <input
                  type="checkbox"
                  checked={inStock}
                  onChange={(e) => setInStock(e.target.checked)}
                  className="h-4 w-4 rounded accent-[var(--color-primary)]"
                />
                <span className="font-medium">In Stock Only</span>
              </label>
            </div>

            {/* Quick B2B Quote Help */}
            <div className="rounded border border-primary/40 bg-primary/5 p-4 text-xs">
              <p className="font-bold uppercase tracking-wider text-primary">
                Need Volume Supply?
              </p>
              <p className="text-muted-foreground mt-1">
                Ordering multiple workshop lifts or container loads of spare parts?
              </p>
              <Link
                to="/support"
                className="mt-2.5 inline-flex items-center gap-1.5 font-bold uppercase text-primary hover:underline"
              >
                <FileSpreadsheet className="h-3.5 w-3.5" /> Request Quotation
              </Link>
            </div>
          </aside>

          {/* ======================================================== */}
          {/* RIGHT: PRODUCT RESULTS & TOP CONTROLS                    */}
          {/* ======================================================== */}
          <div>
            {/* Top Controls Bar */}
            <div className="mb-6 flex flex-wrap items-center justify-between gap-4 border-b border-border pb-4">
              <div className="flex flex-wrap items-center gap-2 text-xs">
                <span className="font-bold text-foreground">
                  {filteredList.length} Items Found
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
                    className="h-8.5 rounded border border-border bg-card px-2.5 text-xs text-foreground focus:border-primary focus:outline-none"
                  >
                    <option value="featured">Featured / Best Match</option>
                    <option value="low">Price: Low to High</option>
                    <option value="high">Price: High to Low</option>
                    <option value="rating">Highest Rated</option>
                  </select>
                </label>

                {/* Grid / List toggle */}
                <div className="hidden sm:flex items-center rounded border border-border p-0.5">
                  <button
                    onClick={() => setViewMode("grid")}
                    aria-label="Grid view"
                    className={`p-1.5 rounded ${
                      viewMode === "grid"
                        ? "bg-foreground text-background"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    <Grid className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => setViewMode("list")}
                    aria-label="List view"
                    className={`p-1.5 rounded ${
                      viewMode === "list"
                        ? "bg-foreground text-background"
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
                    <ProductCard key={p.slug} p={p} />
                  ))}
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredList.map((p) => (
                    <ProductListRow key={p.slug} p={p} />
                  ))}
                </div>
              )
            ) : (
              <div className="rounded border border-dashed border-border py-20 text-center">
                <h3 className="display-md text-foreground">No Products Found</h3>
                <p className="mt-2 text-sm text-muted-foreground max-w-md mx-auto">
                  We could not find any products matching your current combination
                  of filters. Try clearing some filters or searching by a broader term.
                </p>
                <div className="mt-6 flex justify-center gap-3">
                  <button
                    onClick={handleClearAll}
                    className="btn btn-primary h-10 text-xs font-bold uppercase"
                  >
                    Clear All Filters
                  </button>
                  <Link
                    to="/support"
                    className="btn btn-outline h-10 text-xs font-bold uppercase"
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
    </div>
  );
}

function Chip({ label, onClear }: { label: string; onClear: () => void }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded bg-ink px-2.5 py-1 text-[11px] font-semibold text-ink-foreground">
      <span>{label}</span>
      <button
        onClick={onClear}
        aria-label={`Remove ${label}`}
        className="hover:text-primary"
      >
        <X className="h-3 w-3" />
      </button>
    </span>
  );
}

// Row component for List view mode
function ProductListRow({ p }: { p: Product }) {
  const { add } = useCart();
  const out = p.stock === "Out of stock";

  return (
    <article className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-5 rounded border border-border bg-card p-4 hover:border-foreground/40 transition-colors">
      <div className="flex items-center gap-4">
        <Link
          to="/shop/$slug"
          params={{ slug: p.slug }}
          className="aspect-square h-24 w-24 shrink-0 overflow-hidden rounded bg-muted/60 p-2"
        >
          <img
            src={p.image}
            alt={p.name}
            loading="lazy"
            className="h-full w-full object-contain mix-blend-multiply"
          />
        </Link>
        <div>
          <div className="flex flex-wrap items-center gap-2 text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
            <span className="text-primary">{p.brand}</span>
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
            className="mt-1 block font-semibold text-foreground hover:text-primary transition-colors text-base"
          >
            {p.name}
          </Link>
          <p className="mt-1 text-xs text-muted-foreground line-clamp-1 max-w-xl">
            {p.description}
          </p>
          <div className="mt-2 flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
            <span className="flex items-center gap-1 text-amber-500 font-bold">
              <Star className="h-3.5 w-3.5 fill-current" /> {p.rating}
            </span>
            <span className="flex items-center gap-1 text-emerald-600 font-medium">
              <Check className="h-3.5 w-3.5" /> Fits {p.fits[0]}
            </span>
            {p.specs && p.specs.length > 0 && (
              <span className="font-mono text-[11px] text-muted-foreground">
                {p.specs[0][0]}: {p.specs[0][1]}
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="flex sm:flex-col items-center sm:items-end justify-between shrink-0 pt-3 sm:pt-0 border-t sm:border-t-0 border-border">
        <div className="sm:text-right">
          <div className="font-display text-2xl font-bold text-foreground">
            {taka(p.price)}
          </div>
          <p
            className={`text-[11px] font-semibold ${
              out ? "text-destructive" : "text-emerald-600"
            }`}
          >
            {p.stock}
          </p>
        </div>
        {p.requiresQuote ? (
          <Link
            to="/shop/$slug"
            params={{ slug: p.slug }}
            className="btn btn-outline border-foreground hover:bg-foreground hover:text-background h-9 px-5 text-xs font-bold uppercase tracking-wider"
          >
            Request Quote
          </Link>
        ) : (
          <button
            disabled={out}
            onClick={() => add(p.slug)}
            className="btn btn-dark h-9 px-5 text-xs font-bold uppercase tracking-wider"
          >
            {out ? "Out of Stock" : "Add to Cart"}
          </button>
        )}
      </div>
    </article>
  );
}
