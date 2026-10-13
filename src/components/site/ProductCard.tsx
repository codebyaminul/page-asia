import { Link } from "@tanstack/react-router";
import { Check, FileSpreadsheet, Plus } from "lucide-react";
import { type Product } from "@/lib/data";
import { useCart } from "@/lib/cart";

export function ProductCard({
  p,
  onQuote,
}: {
  p: Product;
  onQuote?: (p: Product) => void;
}) {
  const { add, lines } = useCart();
  const out = p.stock === "Out of stock";
  const inCart = lines.some((l) => l.slug === p.slug);

  const handleQuoteClick = (e: React.MouseEvent) => {
    if (onQuote) {
      e.preventDefault();
      onQuote(p);
    }
  };

  return (
    <article className="group flex flex-col rounded-2xl border border-zinc-200/90 dark:border-zinc-800 bg-card shadow-xs transition-all duration-300 hover:border-primary/40 hover:shadow-lg hover:-translate-y-0.5 overflow-hidden">
      {/* Product Image Stage - Clean & Minimalist */}
      <Link
        to="/shop/$slug"
        params={{ slug: p.slug }}
        className="relative block aspect-[4/3] sm:aspect-square overflow-hidden bg-gradient-to-b from-zinc-50 to-zinc-100/60 dark:from-zinc-900/40 dark:to-zinc-900/80 p-5 border-b border-zinc-100 dark:border-zinc-800/80"
      >
        <img
          src={p.image}
          alt={p.name}
          loading="lazy"
          width={816}
          height={816}
          className="h-full w-full object-contain mix-blend-multiply transition-transform duration-300 ease-out group-hover:scale-105"
        />

        {/* Minimalist Single Tag (Only if EV or Machinery) */}
        {p.mobility?.includes("EV") ? (
          <span className="absolute top-3 left-3 rounded-full bg-emerald-600 text-white px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-wider shadow-xs">
            EV Platform
          </span>
        ) : p.isEquipment ? (
          <span className="absolute top-3 left-3 rounded-full bg-zinc-900/90 text-white dark:bg-zinc-800 px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-wider shadow-xs">
            Machinery
          </span>
        ) : null}
      </Link>

      {/* Product Content Details - Clean & Uncluttered */}
      <div className="flex flex-1 flex-col p-4 sm:p-5">
        {/* Brand & Category */}
        <div className="flex items-center justify-between gap-2 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
          <span className="text-primary font-bold">{p.brand}</span>
          <span className="truncate">{p.category}</span>
        </div>

        {/* Product Title */}
        <Link
          to="/shop/$slug"
          params={{ slug: p.slug }}
          className="mt-1.5 line-clamp-2 text-sm font-semibold text-foreground leading-snug hover:text-primary transition-colors min-h-[2.5rem]"
        >
          {p.name}
        </Link>

        {/* Bottom Quotation Status & Stock Indicator */}
        <div className="mt-auto pt-3 border-t border-zinc-100 dark:border-zinc-800/80">
          <div className="flex items-center justify-between text-xs mb-3">
            <span className="text-[11px] font-medium text-foreground/85">
              Quotation on Request
            </span>
            <span
              className={`text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 ${
                out ? "text-destructive" : "text-emerald-600"
              }`}
            >
              <span
                className={`h-1.5 w-1.5 rounded-full ${
                  out ? "bg-destructive" : "bg-emerald-500"
                }`}
              />
              {p.stock}
            </span>
          </div>

          {/* Action Buttons: Direct Quote & RFQ Cart */}
          <div className="grid grid-cols-2 gap-2">
            {onQuote ? (
              <button
                type="button"
                onClick={handleQuoteClick}
                className="btn btn-primary h-8.5 text-xs font-bold tracking-wider uppercase rounded-xl flex items-center justify-center gap-1 shadow-xs hover:shadow transition-all active:scale-95"
              >
                <FileSpreadsheet className="h-3.5 w-3.5" />
                <span>Get Quote</span>
              </button>
            ) : (
              <Link
                to="/shop/$slug"
                params={{ slug: p.slug }}
                className="btn btn-primary h-8.5 text-xs font-bold tracking-wider uppercase rounded-xl flex items-center justify-center gap-1 shadow-xs hover:shadow transition-all active:scale-95"
              >
                <FileSpreadsheet className="h-3.5 w-3.5" />
                <span>Get Quote</span>
              </Link>
            )}

            <button
              type="button"
              disabled={out}
              onClick={() => add(p.slug)}
              className={`h-8.5 text-xs font-bold tracking-wider uppercase rounded-xl border transition-all flex items-center justify-center gap-1 active:scale-95 ${
                inCart
                  ? "border-emerald-500 bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 font-bold"
                  : "border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-zinc-800 dark:text-zinc-200 hover:bg-zinc-50 dark:hover:bg-zinc-800 shadow-2xs"
              }`}
              title={inCart ? "In your RFQ list" : "Add to multi-product quotation list"}
            >
              {inCart ? (
                <>
                  <Check className="h-3.5 w-3.5 text-emerald-600" />
                  <span>In RFQ</span>
                </>
              ) : (
                <>
                  <Plus className="h-3.5 w-3.5" />
                  <span>RFQ Cart</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}
