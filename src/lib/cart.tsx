import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { products, type Product } from "./data";

type Line = { slug: string; qty: number };
type Garage = { platform?: string; make: string; model: string; year: string; engine: string } | null;
type Ctx = {
  lines: (Line & { product: Product })[];
  count: number; subtotal: number;
  add: (slug: string, qty?: number) => void; setQty: (slug: string, qty: number) => void; remove: (slug: string) => void; clear: () => void;
  vehicle: Garage; setVehicle: (v: Garage) => void;
  toast: string | null;
};
const CartCtx = createContext<Ctx | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<Line[]>([]);
  const [vehicle, setVehicleState] = useState<Garage>(null);
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    try {
      const l = localStorage.getItem("page-cart"); if (l) setLines(JSON.parse(l));
      const v = localStorage.getItem("page-vehicle"); if (v) setVehicleState(JSON.parse(v));
    } catch { /* ignore */ }
  }, []);
  useEffect(() => { localStorage.setItem("page-cart", JSON.stringify(lines)); }, [lines]);

  const flash = (m: string) => { setToast(m); setTimeout(() => setToast(null), 2200); };
  const add = (slug: string, qty = 1) => {
    setLines((ls) => { const f = ls.find((l) => l.slug === slug); return f ? ls.map((l) => (l.slug === slug ? { ...l, qty: l.qty + qty } : l)) : [...ls, { slug, qty }]; });
    flash("Added to cart");
  };
  const setQty = (slug: string, qty: number) => setLines((ls) => ls.map((l) => (l.slug === slug ? { ...l, qty: Math.max(1, qty) } : l)));
  const remove = (slug: string) => setLines((ls) => ls.filter((l) => l.slug !== slug));
  const clear = () => setLines([]);
  const setVehicle = (v: Garage) => { setVehicleState(v); localStorage.setItem("page-vehicle", JSON.stringify(v)); if (v) flash(`Saved ${v.make} ${v.model} to My Garage`); };

  const full = lines.map((l) => ({ ...l, product: products.find((p) => p.slug === l.slug)! })).filter((l) => l.product);
  const count = full.reduce((s, l) => s + l.qty, 0);
  const subtotal = full.reduce((s, l) => s + l.qty * l.product.price, 0);
  return <CartCtx.Provider value={{ lines: full, count, subtotal, add, setQty, remove, clear, vehicle, setVehicle, toast }}>{children}</CartCtx.Provider>;
}

export function useCart() { const c = useContext(CartCtx); if (!c) throw new Error("useCart outside provider"); return c; }
