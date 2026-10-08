import { Link } from "@tanstack/react-router";
import { Check, Star } from "lucide-react";
import { taka, type Product } from "@/lib/data";
import { useCart } from "@/lib/cart";

export function ProductCard({ p }: { p: Product }) {
  const { add } = useCart();
  const out = p.stock === "Out of stock";
  return (
    <article className="group flex flex-col border border-border bg-card card-lift">
      <Link to="/shop/$slug" params={{ slug: p.slug }} className="relative block aspect-square overflow-hidden bg-muted">
        <img src={p.image} alt={p.name} loading="lazy" width={816} height={816} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
        {p.oldPrice && <span className="absolute left-3 top-3 bg-primary px-2 py-1 text-[10px] font-bold uppercase tracking-widest text-primary-foreground">Sale</span>}
      </Link>
      <div className="flex flex-1 flex-col p-4">
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">{p.brand} · {p.category}</p>
        <Link to="/shop/$slug" params={{ slug: p.slug }} className="mt-1.5 line-clamp-2 text-sm font-semibold leading-snug hover:text-primary sm:text-base">{p.name}</Link>
        <div className="mt-2 flex items-center gap-1 text-xs text-muted-foreground">
          <Star className="h-3.5 w-3.5 fill-foreground text-foreground" /> {p.rating} <span>({p.reviews})</span>
        </div>
        <p className="mt-2 hidden items-center gap-1 text-xs text-muted-foreground sm:flex"><Check className="h-3.5 w-3.5 text-success" /> Fits {p.fits[0]}</p>
        <div className="mt-auto pt-4">
          <div className="flex items-baseline gap-2">
            <span className="font-display text-2xl font-bold">{taka(p.price)}</span>
            {p.oldPrice && <span className="text-xs text-muted-foreground line-through">{taka(p.oldPrice)}</span>}
          </div>
          <p className={`text-xs ${out ? "text-primary" : p.stock === "Low stock" ? "text-foreground" : "text-success"}`}>{p.stock}</p>
          <button disabled={out} onClick={() => add(p.slug)} className="btn btn-dark mt-3 h-10 w-full text-[11px]">{out ? "Notify me" : "Add to cart"}</button>
        </div>
      </div>
    </article>
  );
}
