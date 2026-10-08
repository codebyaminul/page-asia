import { Link } from "@tanstack/react-router";
import { Check, Star, Wrench } from "lucide-react";
import { taka, type Product } from "@/lib/data";
import { useCart } from "@/lib/cart";

export function ProductCard({ p }: { p: Product }) {
  const { add } = useCart();
  const out = p.stock === "Out of stock";
  const low = p.stock === "Low stock";

  // First 1-2 key specs for dense info display
  const keySpec = p.specs && p.specs.length > 0 ? p.specs[0] : null;

  return (
    <article className="group flex flex-col rounded-[var(--radius)] border border-border bg-card shadow-xs transition-all duration-200 hover:border-foreground/40 hover:shadow-md">
      {/* Product Image Box */}
      <Link
        to="/shop/$slug"
        params={{ slug: p.slug }}
        className="relative block aspect-[4/3] sm:aspect-square overflow-hidden bg-muted/60 p-3"
      >
        <img
          src={p.image}
          alt={p.name}
          loading="lazy"
          width={816}
          height={816}
          className="h-full w-full object-contain mix-blend-multiply transition-transform duration-300 group-hover:scale-105"
        />
        {p.oldPrice && (
          <span className="absolute left-2.5 top-2.5 rounded bg-primary px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-primary-foreground">
            Save {Math.round(((p.oldPrice - p.price) / p.oldPrice) * 100)}%
          </span>
        )}
        {p.isEquipment && (
          <span className="absolute right-2.5 top-2.5 flex items-center gap-1 rounded bg-ink px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-ink-foreground">
            <Wrench className="h-2.5 w-2.5 text-primary" /> Commercial
          </span>
        )}
      </Link>

      {/* Product Content Details */}
      <div className="flex flex-1 flex-col p-4 sm:p-4.5">
        <div className="flex items-center justify-between gap-2 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
          <span className="text-primary font-bold">{p.brand}</span>
          <span>{p.category}</span>
        </div>

        <Link
          to="/shop/$slug"
          params={{ slug: p.slug }}
          className="mt-1.5 line-clamp-2 text-sm sm:text-[15px] font-semibold text-foreground leading-snug hover:text-primary transition-colors"
        >
          {p.name}
        </Link>

        {/* Rating & Review */}
        <div className="mt-2 flex items-center gap-1.5 text-xs text-muted-foreground">
          <div className="flex items-center text-amber-500">
            <Star className="h-3.5 w-3.5 fill-current" />
            <span className="ml-1 font-bold text-foreground text-xs">{p.rating}</span>
          </div>
          <span className="text-muted-foreground/60">•</span>
          <span>({p.reviews} reviews)</span>
          <span className="text-muted-foreground/60 hidden sm:inline">•</span>
          <span className="hidden sm:inline font-mono text-[11px] text-muted-foreground">{p.sku}</span>
        </div>

        {/* Key Specification */}
        {keySpec && (
          <div className="mt-2.5 rounded bg-secondary/80 px-2 py-1 text-[11px] text-foreground/80 font-medium">
            <span className="text-muted-foreground">{keySpec[0]}: </span>
            <span className="font-semibold">{keySpec[1]}</span>
          </div>
        )}

        {/* Fitment indicator */}
        <p className="mt-2 flex items-center gap-1.5 text-[11px] text-muted-foreground line-clamp-1">
          <Check className="h-3.5 w-3.5 shrink-0 text-success" />
          <span>Fits: {p.fits[0]}</span>
        </p>

        {/* Price & Action */}
        <div className="mt-auto pt-3.5 border-t border-border/70">
          <div className="flex items-baseline justify-between gap-2">
            <div>
              <div className="flex items-baseline gap-2">
                <span className="font-display text-2xl font-bold tracking-tight text-foreground">
                  {taka(p.price)}
                </span>
                {p.oldPrice && (
                  <span className="text-xs text-muted-foreground line-through">
                    {taka(p.oldPrice)}
                  </span>
                )}
              </div>
              <span
                className={`text-[11px] font-semibold ${
                  out
                    ? "text-destructive font-bold"
                    : low
                    ? "text-amber-600 font-bold"
                    : "text-success"
                }`}
              >
                {p.stock}
              </span>
            </div>
          </div>

          <button
            disabled={out}
            onClick={() => add(p.slug)}
            className="btn btn-dark mt-3 h-9 w-full text-xs font-bold tracking-wider uppercase transition-colors"
          >
            {out ? "Out of Stock" : "Add to Cart"}
          </button>
        </div>
      </div>
    </article>
  );
}
