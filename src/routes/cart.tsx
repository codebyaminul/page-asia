import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Minus,
  Plus,
  ShieldCheck,
  ShoppingBag,
  Trash2,
  Truck,
  Wrench,
} from "lucide-react";
import { taka } from "@/lib/data";
import { useCart } from "@/lib/cart";

export const Route = createFileRoute("/cart")({
  head: () => ({
    meta: [
      { title: "Shopping Cart — PAGE International" },
      { name: "description", content: "Review your selected automotive parts and garage equipment." },
      { property: "og:title", content: "Shopping Cart — PAGE" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: Cart,
});

const SHIPPING_FLAT = 150;
const FREE_SHIPPING_OVER = 10000;

export function Cart() {
  const { lines, subtotal, setQty, remove } = useCart();
  const ship = subtotal >= FREE_SHIPPING_OVER || subtotal === 0 ? 0 : SHIPPING_FLAT;

  return (
    <div className="bg-background text-foreground min-h-screen pt-24 lg:pt-32 pb-20">
      {/* Breadcrumb */}
      <div className="border-b border-border bg-secondary/40 py-3">
        <nav aria-label="Breadcrumb" className="container-page text-xs text-muted-foreground flex items-center gap-1.5">
          <Link to="/" className="hover:text-foreground">Home</Link>
          <span>/</span>
          <Link to="/shop" className="hover:text-foreground">Shop</Link>
          <span>/</span>
          <span className="font-semibold text-foreground">Shopping Cart</span>
        </nav>
      </div>

      <div className="container-page py-10 lg:py-14">
        <div className="flex items-baseline justify-between border-b border-border pb-4">
          <h1 className="display-lg text-foreground font-bold">Shopping Cart</h1>
          <span className="text-xs font-semibold text-muted-foreground">
            {lines.length} Unique {lines.length === 1 ? "Item" : "Items"}
          </span>
        </div>

        {!lines.length ? (
          <div className="mt-12 rounded border border-dashed border-border py-24 text-center bg-card">
            <span className="grid h-16 w-16 place-items-center rounded-full bg-secondary text-muted-foreground mx-auto mb-4">
              <ShoppingBag className="h-8 w-8" />
            </span>
            <h2 className="display-md text-foreground">Your Cart is Empty</h2>
            <p className="mt-2 text-xs sm:text-sm text-muted-foreground max-w-sm mx-auto">
              You have not added any automotive parts or garage machinery to your cart yet.
            </p>
            <div className="mt-8 flex justify-center gap-3">
              <Link to="/shop" className="btn btn-primary h-11 px-6 text-xs font-bold uppercase">
                Browse Products
              </Link>
              <Link to="/shop" search={{ cat: "Equipment" }} className="btn btn-outline h-11 px-6 text-xs font-bold uppercase">
                Explore Garage Machinery
              </Link>
            </div>
          </div>
        ) : (
          <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_380px]">
            {/* Left Items Column */}
            <div className="space-y-4">
              <div className="divide-y divide-border rounded border border-border bg-card">
                {lines.map((l) => (
                  <div
                    key={l.slug}
                    className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 sm:p-5"
                  >
                    <div className="flex items-center gap-4">
                      <Link
                        to="/shop/$slug"
                        params={{ slug: l.slug }}
                        className="aspect-square h-20 w-20 shrink-0 overflow-hidden rounded border border-border bg-muted/60 p-2"
                      >
                        <img
                          src={l.product.image}
                          alt={l.product.name}
                          className="h-full w-full object-contain mix-blend-multiply"
                        />
                      </Link>

                      <div>
                        <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                          <span className="text-primary">{l.product.brand}</span>
                          <span>•</span>
                          <span className="font-mono">{l.product.sku}</span>
                        </div>
                        <Link
                          to="/shop/$slug"
                          params={{ slug: l.slug }}
                          className="mt-0.5 block text-sm font-semibold text-foreground hover:text-primary transition-colors leading-snug"
                        >
                          {l.product.name}
                        </Link>
                        <span className="mt-1 block text-xs font-semibold text-foreground">
                          {taka(l.product.price)} each
                        </span>
                      </div>
                    </div>

                    <div className="flex w-full sm:w-auto items-center justify-between sm:justify-end gap-6 pt-3 sm:pt-0 border-t sm:border-t-0 border-border">
                      {/* Quantity Stepper */}
                      <div className="flex h-9 items-center rounded border border-input bg-card">
                        <button
                          onClick={() => setQty(l.slug, l.qty - 1)}
                          aria-label="Decrease quantity"
                          className="grid h-full w-8 place-items-center hover:bg-secondary text-foreground"
                        >
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="w-8 text-center text-xs font-bold">{l.qty}</span>
                        <button
                          onClick={() => setQty(l.slug, l.qty + 1)}
                          aria-label="Increase quantity"
                          className="grid h-full w-8 place-items-center hover:bg-secondary text-foreground"
                        >
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>

                      {/* Total for this line */}
                      <div className="text-right min-w-24">
                        <span className="font-display text-xl font-bold text-foreground">
                          {taka(l.product.price * l.qty)}
                        </span>
                      </div>

                      {/* Remove Button */}
                      <button
                        onClick={() => remove(l.slug)}
                        aria-label="Remove item"
                        className="text-muted-foreground hover:text-destructive p-1 transition-colors"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Bottom Reassurance Banner */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 rounded border border-border bg-secondary/30 p-4 text-xs text-muted-foreground">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 text-primary shrink-0" />
                  <span>100% Genuine Auto Spares</span>
                </div>
                <div className="flex items-center gap-2">
                  <Truck className="h-4 w-4 text-primary shrink-0" />
                  <span>Dispatched in Safe Crating</span>
                </div>
                <div className="flex items-center gap-2 col-span-2 sm:col-span-1">
                  <Wrench className="h-4 w-4 text-primary shrink-0" />
                  <span>Workshop Fitting Option</span>
                </div>
              </div>
            </div>

            {/* Right Summary Sidebar */}
            <aside className="h-fit rounded border border-ink-border bg-ink p-6 text-ink-foreground shadow-xl">
              <h2 className="text-xs font-bold uppercase tracking-widest text-primary border-b border-ink-border pb-3">
                Order Summary
              </h2>

              <dl className="mt-4 space-y-3 text-xs">
                <div className="flex justify-between">
                  <dt className="text-ink-muted">Items Subtotal</dt>
                  <dd className="font-semibold text-ink-foreground">{taka(subtotal)}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-ink-muted">Estimated Delivery</dt>
                  <dd className="font-semibold text-ink-foreground">
                    {ship === 0 ? (
                      <span className="text-success font-bold">Free Delivery</span>
                    ) : (
                      taka(ship)
                    )}
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-ink-muted">Applicable VAT / Tax</dt>
                  <dd className="text-ink-muted">Included</dd>
                </div>
                <div className="flex items-baseline justify-between border-t border-ink-border/80 pt-4">
                  <dt className="text-sm font-bold uppercase">Estimated Total</dt>
                  <dd className="font-display text-3xl font-bold text-ink-foreground">
                    {taka(subtotal + ship)}
                  </dd>
                </div>
              </dl>

              <Link
                to="/checkout"
                className="btn btn-primary mt-6 w-full h-11 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="h-4 w-4" />
              </Link>

              <div className="mt-4 border-t border-ink-border/60 pt-4 text-[11px] text-ink-muted">
                <p>
                  Free delivery applies on retail orders over {taka(FREE_SHIPPING_OVER)}. Commercial equipment orders include site delivery and hoist placement.
                </p>
              </div>
            </aside>
          </div>
        )}
      </div>
    </div>
  );
}
