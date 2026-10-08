import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Check, Minus, Plus, ShieldCheck, Star, Truck, Wrench } from "lucide-react";
import { useState } from "react";
import { ProductCard } from "@/components/site/ProductCard";
import { products, taka } from "@/lib/data";
import { useCart } from "@/lib/cart";

export const Route = createFileRoute("/shop/$slug")({
  loader: ({ params }) => {
    const p = products.find((x) => x.slug === params.slug);
    if (!p) throw notFound();
    return { p };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return { meta: [{ title: "Product not found — PAGE" }, { name: "robots", content: "noindex" }] };
    const { p } = loaderData;
    return { meta: [
      { title: `${p.name} — ${p.brand} | PAGE` },
      { name: "description", content: p.description },
      { property: "og:title", content: `${p.name} — PAGE` },
      { property: "og:description", content: p.description },
      { property: "og:type", content: "product" },
    ] };
  },
  notFoundComponent: () => (
    <div className="container-page py-40 text-center"><h1 className="display-lg">Product not found</h1><Link to="/shop" className="btn btn-dark mt-8">Back to shop</Link></div>
  ),
  component: ProductPage,
});

function ProductPage() {
  const { p } = Route.useLoaderData();
  const { add, vehicle } = useCart();
  const [qty, setQty] = useState(1);
  const [tab, setTab] = useState<"specs" | "fit" | "warranty">("specs");
  const out = p.stock === "Out of stock";
  const related = products.filter((x) => x.slug !== p.slug && x.category === p.category).concat(products.filter((x) => x.category !== p.category)).slice(0, 4);

  return (
    <div className="pt-24 lg:pt-28">
      <nav aria-label="Breadcrumb" className="container-page py-4 text-xs text-muted-foreground">
        <Link to="/" className="hover:text-foreground">Home</Link> / <Link to="/shop" className="hover:text-foreground">Shop</Link> / <Link to="/shop" search={{ cat: p.category }} className="hover:text-foreground">{p.category}</Link> / <span className="text-foreground">{p.name}</span>
      </nav>
      <section className="container-page grid gap-10 pb-16 lg:grid-cols-2 lg:gap-16">
        <div className="aspect-square bg-muted"><img src={p.image} alt={p.name} width={816} height={816} className="h-full w-full object-cover" /></div>
        <div>
          <p className="eyebrow">{p.brand} · {p.category}</p>
          <h1 className="display-lg mt-3">{p.name}</h1>
          <div className="mt-4 flex items-center gap-3 text-sm text-muted-foreground"><span className="flex items-center gap-1 text-foreground"><Star className="h-4 w-4 fill-foreground" />{p.rating}</span>{p.reviews} reviews · SKU {p.sku}</div>
          <div className="mt-8 flex items-baseline gap-3"><span className="font-display text-5xl font-bold">{taka(p.price)}</span>{p.oldPrice && <span className="text-muted-foreground line-through">{taka(p.oldPrice)}</span>}</div>
          <p className={`mt-1 text-sm ${out ? "text-primary" : "text-success"}`}>{p.stock}</p>

          <div className={`mt-6 border-l-2 p-4 text-sm ${vehicle ? "border-success bg-secondary" : "border-border bg-secondary"}`}>
            {vehicle ? <p className="flex items-center gap-2"><Check className="h-4 w-4 text-success" />Checking against your <strong>{vehicle.make} {vehicle.model} {vehicle.year}</strong> — confirm fitment below.</p>
              : <p>Add your vehicle in <Link to="/garage" className="font-semibold underline">My Garage</Link> to check compatibility.</p>}
          </div>

          <p className="mt-6 leading-relaxed text-muted-foreground">{p.description}</p>

          <div className="mt-8 flex gap-3">
            <div className="flex h-12 items-center border border-input">
              <button onClick={() => setQty(Math.max(1, qty - 1))} aria-label="Decrease quantity" className="grid h-full w-11 place-items-center"><Minus className="h-4 w-4" /></button>
              <span className="w-8 text-center font-semibold" aria-live="polite">{qty}</span>
              <button onClick={() => setQty(qty + 1)} aria-label="Increase quantity" className="grid h-full w-11 place-items-center"><Plus className="h-4 w-4" /></button>
            </div>
            <button disabled={out} onClick={() => add(p.slug, qty)} className="btn btn-primary flex-1">Add to cart</button>
          </div>
          <Link to="/services/book" className="btn btn-outline mt-3 w-full">Book installation</Link>

          <ul className="mt-8 grid gap-3 border-t border-border pt-6 text-sm sm:grid-cols-3">
            <li className="flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-primary" />Genuine product</li>
            <li className="flex items-center gap-2"><Truck className="h-4 w-4 text-primary" />2–4 day delivery</li>
            <li className="flex items-center gap-2"><Wrench className="h-4 w-4 text-primary" />Fitting available</li>
          </ul>
        </div>
      </section>

      <section className="container-page pb-20">
        <div role="tablist" className="flex gap-8 border-b border-border">
          {(["specs", "fit", "warranty"] as const).map((t) => (
            <button key={t} role="tab" aria-selected={tab === t} onClick={() => setTab(t)} className={`-mb-px border-b-2 py-4 text-sm font-semibold uppercase tracking-[0.15em] ${tab === t ? "border-primary" : "border-transparent text-muted-foreground"}`}>
              {t === "specs" ? "Specifications" : t === "fit" ? "Compatibility" : "Warranty"}
            </button>
          ))}
        </div>
        <div className="max-w-3xl py-8">
          {tab === "specs" && <dl className="divide-y divide-border">{p.specs.map(([k, v]) => <div key={k} className="grid grid-cols-2 py-3 text-sm"><dt className="text-muted-foreground">{k}</dt><dd className="font-medium">{v}</dd></div>)}</dl>}
          {tab === "fit" && <ul className="space-y-2">{p.fits.map((f) => <li key={f} className="flex items-center gap-2 text-sm"><Check className="h-4 w-4 text-success" />{f}</li>)}</ul>}
          {tab === "warranty" && <p className="text-sm text-muted-foreground">Covered against manufacturing defects. Keep your invoice; claims are handled through PAGE Support.</p>}
        </div>
      </section>

      <section className="bg-secondary py-16">
        <div className="container-page">
          <h2 className="display-md mb-8">You may also need</h2>
          <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">{related.map((r) => <ProductCard key={r.slug} p={r} />)}</div>
        </div>
      </section>
    </div>
  );
}
