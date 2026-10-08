import { createFileRoute, Link } from "@tanstack/react-router";
import { Search, X } from "lucide-react";
import { useMemo, useState } from "react";
import { PageHeader } from "@/components/site/PageHeader";
import { ProductCard } from "@/components/site/ProductCard";
import { categories, products } from "@/lib/data";

type S = { q?: string | undefined; cat?: string | undefined; vehicle?: string | undefined };

export const Route = createFileRoute("/shop/")({
  validateSearch: (s: Record<string, unknown>): S => ({
    q: typeof s["q"] === "string" ? s["q"] as string : undefined,
    cat: typeof s["cat"] === "string" ? s["cat"] as string : undefined,
    vehicle: typeof s["vehicle"] === "string" ? s["vehicle"] as string : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Shop Automotive Parts & Accessories — PAGE" },
      { name: "description", content: "Brakes, batteries, lubricants, diagnostic tools and EV products. Filter by vehicle compatibility." },
      { property: "og:title", content: "Shop Automotive Parts — PAGE" },
      { property: "og:description", content: "Find compatible parts for your vehicle and order online." },
    ],
  }),
  component: Shop,
});

function Shop() {
  const { q = "", cat, vehicle } = Route.useSearch();
  const nav = Route.useNavigate();
  const [query, setQuery] = useState(q);
  const [sort, setSort] = useState("featured");
  const [inStock, setInStock] = useState(false);

  const list = useMemo(() => {
    let l = products.filter((p) => (!cat || p.category === cat) && (!q || `${p.name} ${p.brand} ${p.category} ${p.sku}`.toLowerCase().includes(q.toLowerCase())));
    if (vehicle) { const v = vehicle.split(" ")[1]?.toLowerCase(); l = l.filter((p) => p.fits.some((f) => f.toLowerCase().includes(v ?? "") || f.toLowerCase().includes("universal") || f.toLowerCase().includes("most"))); }
    if (inStock) l = l.filter((p) => p.stock !== "Out of stock");
    if (sort === "low") l = [...l].sort((a, b) => a.price - b.price);
    if (sort === "high") l = [...l].sort((a, b) => b.price - a.price);
    if (sort === "rating") l = [...l].sort((a, b) => b.rating - a.rating);
    return l;
  }, [q, cat, vehicle, sort, inStock]);

  return (
    <>
      <PageHeader eyebrow="Shop" title="Parts, tools & accessories">
        <form onSubmit={(e) => { e.preventDefault(); nav({ search: (s: S) => ({ ...s, q: query || undefined }) }); }} className="flex max-w-2xl">
          <label htmlFor="shop-q" className="sr-only">Search products</label>
          <input id="shop-q" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search by part, brand or SKU" className="field-dark rounded-r-none" />
          <button className="btn btn-primary h-[3.25rem] rounded-l-none" aria-label="Search"><Search className="h-5 w-5" /></button>
        </form>
      </PageHeader>

      <section className="container-page grid gap-10 py-12 lg:grid-cols-[240px_1fr]">
        <aside aria-label="Filters" className="space-y-8">
          <div>
            <h2 className="text-sm tracking-[0.2em] text-muted-foreground">Category</h2>
            <ul className="mt-3 flex flex-wrap gap-2 lg:flex-col lg:gap-0">
              <li><Link to="/shop" search={(s: S) => ({ ...s, cat: undefined })} className={`block border px-3 py-2 text-sm lg:border-0 lg:px-0 ${!cat ? "font-semibold text-primary" : ""}`}>All products</Link></li>
              {categories.map((c) => (
                <li key={c}><Link to="/shop" search={(s: S) => ({ ...s, cat: c })} className={`block border px-3 py-2 text-sm hover:text-primary lg:border-0 lg:px-0 ${cat === c ? "font-semibold text-primary" : ""}`}>{c}</Link></li>
              ))}
            </ul>
          </div>
          <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={inStock} onChange={(e) => setInStock(e.target.checked)} className="h-4 w-4 accent-[var(--color-primary)]" /> In stock only</label>
        </aside>

        <div>
          <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-2 text-sm">
              <span className="text-muted-foreground">{list.length} products</span>
              {vehicle && <Chip label={`Fits: ${vehicle}`} onClear={() => nav({ search: (s: S) => ({ ...s, vehicle: undefined }) })} />}
              {q && <Chip label={`“${q}”`} onClear={() => { setQuery(""); nav({ search: (s: S) => ({ ...s, q: undefined }) }); }} />}
            </div>
            <label className="flex items-center gap-2 text-sm"><span className="text-muted-foreground">Sort</span>
              <select value={sort} onChange={(e) => setSort(e.target.value)} className="field h-10 w-auto">
                <option value="featured">Featured</option><option value="low">Price: low to high</option><option value="high">Price: high to low</option><option value="rating">Top rated</option>
              </select>
            </label>
          </div>
          {list.length ? (
            <div className="grid grid-cols-2 gap-3 sm:gap-5 xl:grid-cols-3">{list.map((p) => <ProductCard key={p.slug} p={p} />)}</div>
          ) : (
            <div className="border border-dashed border-border py-20 text-center">
              <h2 className="display-md">No matching products</h2>
              <p className="mt-2 text-sm text-muted-foreground">Try a different search, or ask us for a quote.</p>
              <Link to="/shop" className="btn btn-dark mt-6">Clear filters</Link>
            </div>
          )}
        </div>
      </section>
    </>
  );
}

function Chip({ label, onClear }: { label: string; onClear: () => void }) {
  return <span className="inline-flex items-center gap-1 bg-ink px-3 py-1.5 text-xs text-ink-foreground">{label}<button onClick={onClear} aria-label={`Remove ${label}`}><X className="h-3.5 w-3.5" /></button></span>;
}
