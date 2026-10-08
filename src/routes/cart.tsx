import { createFileRoute, Link } from "@tanstack/react-router";
import { Minus, Plus, Trash2 } from "lucide-react";
import { taka } from "@/lib/data";
import { useCart } from "@/lib/cart";

export const Route = createFileRoute("/cart")({
  head: () => ({ meta: [{ title: "Your Cart — PAGE" }, { name: "description", content: "Review the parts in your cart." }, { property: "og:title", content: "Your Cart — PAGE" }, { property: "og:description", content: "Review your cart and checkout." }, { name: "robots", content: "noindex" }] }),
  component: Cart,
});

const SHIPPING_FLAT = 150;
const FREE_SHIPPING_OVER = 10000;

function Cart() {
  const { lines, subtotal, setQty, remove } = useCart();
  const ship = subtotal >= FREE_SHIPPING_OVER || subtotal === 0 ? 0 : SHIPPING_FLAT;
  return (
    <div className="container-page min-h-screen pb-20 pt-28 lg:pt-36">
      <h1 className="display-lg">Your cart</h1>
      {!lines.length ? (
        <div className="mt-10 border border-dashed border-border py-20 text-center">
          <p className="text-muted-foreground">Your cart is empty.</p>
          <Link to="/shop" className="btn btn-primary mt-6">Shop Parts</Link>
        </div>
      ) : (
        <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_360px]">
          <ul className="divide-y divide-border border-y border-border">
            {lines.map((l) => (
              <li key={l.slug} className="flex gap-4 py-5">
                <img src={l.product.image} alt="" className="h-24 w-24 bg-muted object-cover" width={96} height={96} />
                <div className="flex flex-1 flex-col">
                  <div className="flex justify-between gap-3">
                    <Link to="/shop/$slug" params={{ slug: l.slug }} className="font-semibold hover:text-primary">{l.product.name}</Link>
                    <span className="font-display text-xl font-bold">{taka(l.product.price * l.qty)}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">{l.product.brand} · {l.product.sku}</p>
                  <div className="mt-auto flex items-center justify-between pt-3">
                    <div className="flex h-9 items-center border border-input">
                      <button onClick={() => setQty(l.slug, l.qty - 1)} aria-label="Decrease" className="grid h-full w-9 place-items-center"><Minus className="h-3.5 w-3.5" /></button>
                      <span className="w-8 text-center text-sm">{l.qty}</span>
                      <button onClick={() => setQty(l.slug, l.qty + 1)} aria-label="Increase" className="grid h-full w-9 place-items-center"><Plus className="h-3.5 w-3.5" /></button>
                    </div>
                    <button onClick={() => remove(l.slug)} className="flex items-center gap-1 text-xs text-muted-foreground hover:text-primary"><Trash2 className="h-4 w-4" />Remove</button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
          <aside className="h-fit bg-ink p-6 text-ink-foreground">
            <dl className="space-y-3 text-sm">
              <div className="flex justify-between"><dt className="text-ink-muted">Subtotal</dt><dd>{taka(subtotal)}</dd></div>
              <div className="flex justify-between"><dt className="text-ink-muted">Delivery</dt><dd>{ship ? taka(ship) : "Free"}</dd></div>
              <div className="flex justify-between border-t border-ink-border pt-3 text-base"><dt>Total</dt><dd className="font-display text-3xl font-bold">{taka(subtotal + ship)}</dd></div>
            </dl>
            <Link to="/checkout" className="btn btn-primary mt-6 w-full">Checkout</Link>
            <p className="mt-3 text-xs text-ink-muted">Free delivery on orders over {taka(FREE_SHIPPING_OVER)} (demo rule).</p>
          </aside>
        </div>
      )}
    </div>
  );
}
