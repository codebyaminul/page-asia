import { createFileRoute, Link } from "@tanstack/react-router";
import { Check, CheckCircle2 } from "lucide-react";
import { useState } from "react";
import { centers, services, taka, vehicleData, years } from "@/lib/data";
import { useCart } from "@/lib/cart";

type S = { service?: string; center?: string };
export const Route = createFileRoute("/services/book")({
  validateSearch: (s: Record<string, unknown>): S => ({ service: typeof s.service === "string" ? s.service : undefined, center: typeof s.center === "string" ? s.center : undefined }),
  head: () => ({
    meta: [
      { title: "Book a Vehicle Service — PAGE" },
      { name: "description", content: "Choose a service, vehicle, service center and time slot to book your appointment." },
      { property: "og:title", content: "Book a Vehicle Service — PAGE" },
      { property: "og:description", content: "Book your vehicle service online in a few steps." },
    ],
  }),
  component: Book,
});

const steps = ["Service", "Vehicle", "Location", "Time", "Details"];
const slots = ["09:00", "10:30", "12:00", "14:00", "15:30", "17:00"];
const days = Array.from({ length: 7 }, (_, i) => { const d = new Date(); d.setDate(d.getDate() + i + 1); return d; });

function Book() {
  const search = Route.useSearch();
  const { vehicle } = useCart();
  const [step, setStep] = useState(0);
  const [done, setDone] = useState(false);
  const [sel, setSel] = useState<string[]>(search.service ? [search.service] : []);
  const [v, setV] = useState({ make: vehicle?.make ?? "", model: vehicle?.model ?? "", year: vehicle?.year ?? "" });
  const [center, setCenter] = useState(search.center ?? "");
  const [day, setDay] = useState<number | null>(null);
  const [slot, setSlot] = useState("");
  const [info, setInfo] = useState({ name: "", phone: "", notes: "" });

  const canNext = [sel.length > 0, !!(v.make && v.model && v.year), !!center, day !== null && !!slot, !!(info.name && info.phone.length >= 6)][step];
  const chosen = services.filter((s) => sel.includes(s.slug));
  const est = chosen.reduce((a, s) => a + (s.from ?? 0), 0);
  const c = centers.find((x) => x.id === center);

  if (done) return (
    <div className="container-page flex min-h-screen flex-col items-center justify-center py-32 text-center">
      <CheckCircle2 className="h-14 w-14 text-success" strokeWidth={1.5} />
      <h1 className="display-lg mt-6">Booking requested</h1>
      <p className="mt-4 max-w-md text-muted-foreground">{chosen.map((s) => s.name).join(", ")} at {c?.name} on {day !== null && days[day].toDateString()} at {slot}. We'll confirm by SMS. (Demo — no booking was sent.)</p>
      <div className="mt-8 flex gap-3"><Link to="/garage" className="btn btn-dark">View my bookings</Link><Link to="/" className="btn btn-outline">Home</Link></div>
    </div>
  );

  return (
    <div className="bg-secondary pb-20 pt-28 lg:pt-32">
      <div className="container-page">
        <p className="eyebrow">Book service</p>
        <h1 className="display-lg mt-3">Book your appointment</h1>
        <ol className="mt-8 grid grid-cols-5 gap-1" aria-label="Progress">
          {steps.map((s, i) => (
            <li key={s} className="text-xs font-semibold uppercase tracking-[0.12em]">
              <span className={`mb-2 block h-1 ${i <= step ? "bg-primary" : "bg-border"}`} />
              <span className={`hidden sm:inline ${i === step ? "" : "text-muted-foreground"}`}>{i + 1}. {s}</span>
            </li>
          ))}
        </ol>

        <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_340px]">
          <div className="border border-border bg-card p-6 sm:p-8">
            <h2 className="display-md mb-6">{steps[step]}</h2>
            {step === 0 && (
              <div className="grid gap-3 sm:grid-cols-2">
                {services.map((s) => { const on = sel.includes(s.slug); return (
                  <button key={s.slug} type="button" aria-pressed={on} onClick={() => setSel(on ? sel.filter((x) => x !== s.slug) : [...sel, s.slug])}
                    className={`flex items-start justify-between gap-3 border p-4 text-left transition-colors ${on ? "border-primary bg-secondary" : "border-border hover:border-foreground"}`}>
                    <span><span className="block font-semibold">{s.name}</span><span className="text-xs text-muted-foreground">{s.from ? `From ${taka(s.from)}` : "Quote"} · {s.duration}</span></span>
                    <span className={`grid h-5 w-5 shrink-0 place-items-center border ${on ? "border-primary bg-primary text-primary-foreground" : "border-input"}`}>{on && <Check className="h-3.5 w-3.5" />}</span>
                  </button>); })}
              </div>
            )}
            {step === 1 && (
              <div className="grid gap-3 sm:grid-cols-3">
                <select aria-label="Make" className="field" value={v.make} onChange={(e) => setV({ make: e.target.value, model: "", year: v.year })}><option value="">Make</option>{Object.keys(vehicleData).map((m) => <option key={m}>{m}</option>)}</select>
                <select aria-label="Model" className="field" value={v.model} disabled={!v.make} onChange={(e) => setV({ ...v, model: e.target.value })}><option value="">Model</option>{v.make && Object.keys(vehicleData[v.make]).map((m) => <option key={m}>{m}</option>)}</select>
                <select aria-label="Year" className="field" value={v.year} onChange={(e) => setV({ ...v, year: e.target.value })}><option value="">Year</option>{years.map((y) => <option key={y}>{y}</option>)}</select>
              </div>
            )}
            {step === 2 && (
              <div className="space-y-3">
                {centers.map((x) => (
                  <label key={x.id} className={`flex cursor-pointer items-start gap-3 border p-4 ${center === x.id ? "border-primary bg-secondary" : "border-border"}`}>
                    <input type="radio" name="center" className="mt-1 accent-[var(--color-primary)]" checked={center === x.id} onChange={() => setCenter(x.id)} />
                    <span><span className="block font-semibold">{x.name}</span><span className="text-sm text-muted-foreground">{x.address} · {x.hours}</span></span>
                  </label>
                ))}
              </div>
            )}
            {step === 3 && (
              <>
                <div className="flex gap-2 overflow-x-auto pb-2">
                  {days.map((d, i) => (
                    <button key={i} type="button" onClick={() => setDay(i)} className={`min-w-20 border px-3 py-3 text-center ${day === i ? "border-primary bg-primary text-primary-foreground" : "border-border hover:border-foreground"}`}>
                      <span className="block text-xs uppercase">{d.toLocaleDateString("en", { weekday: "short" })}</span><span className="font-display text-2xl font-bold">{d.getDate()}</span>
                    </button>
                  ))}
                </div>
                <div className="mt-6 grid grid-cols-3 gap-2 sm:grid-cols-6">
                  {slots.map((s, i) => { const full = i === 2; return (
                    <button key={s} type="button" disabled={full || day === null} onClick={() => setSlot(s)} className={`border py-3 text-sm font-semibold disabled:text-muted-foreground disabled:line-through disabled:opacity-60 ${slot === s ? "border-primary bg-primary text-primary-foreground" : "border-border hover:border-foreground"}`}>{s}</button>); })}
                </div>
              </>
            )}
            {step === 4 && (
              <div className="grid gap-4">
                <label className="text-sm font-medium">Full name<input className="field mt-1.5" value={info.name} onChange={(e) => setInfo({ ...info, name: e.target.value })} autoComplete="name" /></label>
                <label className="text-sm font-medium">Phone<input className="field mt-1.5" type="tel" value={info.phone} onChange={(e) => setInfo({ ...info, phone: e.target.value })} autoComplete="tel" /></label>
                <label className="text-sm font-medium">Notes (optional)<textarea className="field mt-1.5 h-28 py-3" value={info.notes} onChange={(e) => setInfo({ ...info, notes: e.target.value })} /></label>
              </div>
            )}
            <div className="mt-8 flex justify-between gap-3 border-t border-border pt-6">
              <button type="button" onClick={() => setStep(step - 1)} disabled={step === 0} className="btn btn-outline">Back</button>
              {step < 4 ? <button type="button" disabled={!canNext} onClick={() => setStep(step + 1)} className="btn btn-primary">Continue</button>
                : <button type="button" disabled={!canNext} onClick={() => setDone(true)} className="btn btn-primary">Confirm booking</button>}
            </div>
          </div>

          <aside className="h-fit bg-ink p-6 text-ink-foreground lg:sticky lg:top-28">
            <h2 className="text-sm tracking-[0.2em] text-ink-muted">Summary</h2>
            <dl className="mt-4 space-y-3 text-sm">
              <div><dt className="text-ink-muted">Services</dt><dd>{chosen.length ? chosen.map((s) => s.name).join(", ") : "—"}</dd></div>
              <div><dt className="text-ink-muted">Vehicle</dt><dd>{v.make ? `${v.make} ${v.model} ${v.year}` : "—"}</dd></div>
              <div><dt className="text-ink-muted">Location</dt><dd>{c?.name ?? "—"}</dd></div>
              <div><dt className="text-ink-muted">Time</dt><dd>{day !== null && slot ? `${days[day].toDateString()}, ${slot}` : "—"}</dd></div>
            </dl>
            <div className="mt-6 flex items-baseline justify-between border-t border-ink-border pt-4"><span className="text-sm text-ink-muted">Estimated from</span><span className="font-display text-3xl font-bold">{taka(est)}</span></div>
            <p className="mt-2 text-xs text-ink-muted">Final price confirmed after inspection.</p>
          </aside>
        </div>
      </div>
    </div>
  );
}
