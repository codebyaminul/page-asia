import { createFileRoute, Link } from "@tanstack/react-router";
import { CheckCircle2 } from "lucide-react";
import { useState } from "react";
import { taka } from "@/lib/data";
import { useCart } from "@/lib/cart";

export const Route = createFileRoute("/checkout")({
  head: () => ({ meta: [{ title: "Checkout — PAGE" }, { name: "description", content: "Complete your order." }, { property: "og:title", content: "Checkout — PAGE" }, { property: "og:description", content: "Complete your PAGE order." }, { name: "robots", content: "noindex" }] }),
  component: Checkout,
});

function Checkout() {
  const { lines, subtotal, clear } = useCart();
  const [done, setDone] = useState(false);
  const [pay, setPay] = useState("cod");
  if (done) return (
    <div className="container-page flex min-h-screen flex-col items-center justify-center py-32 text-center">
      <CheckCircle2 className="h-14 w-14 text-success" strokeWidth={1.5} />
      <h1 className="display-lg mt-6">Order placed</h1>
      <p className="mt-3 text-muted-foreground">Demo order #PG-{Math.floor(Math.random() * 90000 + 10000)}. No payment was taken.</p>
      <Link to="/shop" className="btn btn-dark mt-8">Continue shopping</Link>
    </div>
  );
  return (
    <div className="container-page min-h-screen pb-20 pt-28 lg:pt-36">
      <h1 className="display-lg">Checkout</h1>
      <form onSubmit={(e) => { e.preventDefault(); clear(); setDone(true); }} className="mt-10 grid gap-10 lg:grid-cols-[1fr_360px]">
        <div className="space-y-10">
          <fieldset className="grid gap-4 sm:grid-cols-2">
            <legend className="display-md mb-4">Delivery</legend>
            <label className="text-sm font-medium">Full name<input required className="field mt-1.5" autoComplete="name" /></label>
            <label className="text-sm font-medium">Phone<input required type="tel" className="field mt-1.5" autoComplete="tel" /></label>
            <label className="text-sm font-medium sm:col-span-2">Address<input required className="field mt-1.5" autoComplete="street-address" /></label>
            <label className="text-sm font-medium">City<input required className="field mt-1.5" autoComplete="address-level2" /></label>
            <label className="text-sm font-medium">Email (optional)<input type="email" className="field mt-1.5" autoComplete="email" /></label>
          </fieldset>
          <fieldset>
            <legend className="display-md mb-4">Payment</legend>
            <div className="grid gap-3 sm:grid-cols-3">
              {[["cod", "Cash on delivery"], ["card", "Card"], ["mobile", "Mobile wallet"]].map(([k, l]) => (
                <label key={k} className={`flex cursor-pointer items-center gap-3 border p-4 text-sm font-medium ${pay === k ? "border-primary" : "border-border"}`}>
                  <input type="radio" name="pay" checked={pay === k} onChange={() => setPay(k!)} className="accent-[var(--color-primary)]" />{l}
                </label>
              ))}
            </div>
            <p className="mt-3 text-xs text-muted-foreground">Payment is simulated in this prototype.</p>
          </fieldset>
        </div>
        <aside className="h-fit border border-border bg-card p-6">
          <h2 className="text-sm tracking-[0.2em] text-muted-foreground">Order</h2>
          <ul className="mt-4 space-y-3 text-sm">{lines.map((l) => <li key={l.slug} className="flex justify-between gap-3"><span>{l.qty} × {l.product.name}</span><span>{taka(l.qty * l.product.price)}</span></li>)}</ul>
          <div className="mt-4 flex justify-between border-t border-border pt-4"><span>Total</span><span className="font-display text-3xl font-bold">{taka(subtotal)}</span></div>
          <button disabled={!lines.length} className="btn btn-primary mt-6 w-full">Place order</button>
        </aside>
      </form>
    </div>
  );
}
