import { createFileRoute, Link } from "@tanstack/react-router";
import { Check, CheckCircle2, Clock, MapPin, ShieldCheck, Wrench } from "lucide-react";
import { useState } from "react";
import { centers, services, taka, vehicleData, years } from "@/lib/data";
import { useCart } from "@/lib/cart";

type S = { service?: string | undefined; center?: string | undefined };

export const Route = createFileRoute("/services/book")({
  validateSearch: (s: Record<string, unknown>): S => ({
    service: typeof s["service"] === "string" ? (s["service"] as string) : undefined,
    center: typeof s["center"] === "string" ? (s["center"] as string) : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Book a Workshop Service Appointment — PAGE International" },
      {
        name: "description",
        content: "Schedule certified vehicle servicing, electronic diagnostics, brake repairs and AC maintenance at PAGE service hubs.",
      },
      { property: "og:title", content: "Book a Service — PAGE" },
      { property: "og:description", content: "Schedule your vehicle service appointment online." },
    ],
  }),
  component: Book,
});

const steps = ["1. Service", "2. Vehicle", "3. Hub Location", "4. Date & Time", "5. Contact Info"];
const slots = ["09:00", "10:30", "12:00", "14:00", "15:30", "17:00"];
const days = Array.from({ length: 7 }, (_, i) => {
  const d = new Date();
  d.setDate(d.getDate() + i + 1);
  return d;
});

export function Book() {
  const search = Route.useSearch();
  const { vehicle } = useCart();
  const [step, setStep] = useState(0);
  const [done, setDone] = useState(false);
  const [sel, setSel] = useState<string[]>(search.service ? [search.service] : []);
  const [v, setV] = useState({
    make: vehicle?.make ?? "",
    model: vehicle?.model ?? "",
    year: vehicle?.year ?? "",
  });
  const [center, setCenter] = useState(search.center ?? "tejgaon");
  const [day, setDay] = useState<number | null>(0);
  const [slot, setSlot] = useState("10:30");
  const [info, setInfo] = useState({ name: "", phone: "", notes: "" });

  const canNext = [
    sel.length > 0,
    !!(v.make && v.model && v.year),
    !!center,
    day !== null && !!slot,
    !!(info.name && info.phone.length >= 6),
  ][step];

  const chosen = services.filter((s) => sel.includes(s.slug));
  const est = chosen.reduce((a, s) => a + (s.from ?? 0), 0);
  const c = centers.find((x) => x.id === center);

  if (done) {
    return (
      <div className="container-page flex min-h-screen flex-col items-center justify-center py-32 text-center bg-background">
        <div className="rounded-full bg-success/15 p-4 text-success mb-2">
          <CheckCircle2 className="h-16 w-16" strokeWidth={1.75} />
        </div>
        <h1 className="display-lg mt-4 text-foreground font-bold">
          Service Appointment Requested
        </h1>
        <p className="mt-3 max-w-lg text-xs sm:text-sm text-muted-foreground leading-relaxed">
          Your booking for <strong>{chosen.map((s) => s.name).join(", ")}</strong> at{" "}
          <strong>{c?.name}</strong> on{" "}
          <strong>{day !== null && days[day]!.toDateString()} at {slot}</strong> has been logged. Our service advisor will call you to confirm bay arrival instructions.
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link to="/garage" className="btn btn-primary h-11 px-6 text-xs font-bold uppercase">
            View in My Garage
          </Link>
          <Link to="/" className="btn btn-outline h-11 px-6 text-xs font-bold uppercase">
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-background text-foreground min-h-screen pt-24 lg:pt-32 pb-20">
      {/* Breadcrumb */}
      <div className="border-b border-border bg-secondary/40 py-3">
        <nav aria-label="Breadcrumb" className="container-page text-xs text-muted-foreground flex items-center gap-1.5">
          <Link to="/" className="hover:text-foreground">Home</Link>
          <span>/</span>
          <Link to="/services" className="hover:text-foreground">Services</Link>
          <span>/</span>
          <span className="font-semibold text-foreground">Book Appointment</span>
        </nav>
      </div>

      <div className="container-page py-10 lg:py-14">
        <div>
          <p className="eyebrow">Workshop Booking Portal</p>
          <h1 className="display-lg mt-1 text-foreground font-bold">
            Schedule a Workshop Service
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground mt-1 max-w-xl">
            Complete the 5 quick steps below to reserve your dedicated workshop service bay.
          </p>
        </div>

        {/* Step Progress Tracker */}
        <ol className="mt-8 grid grid-cols-5 gap-2" aria-label="Progress">
          {steps.map((s, i) => (
            <li key={s} className="text-xs font-semibold uppercase tracking-wider">
              <span
                className={`mb-2 block h-1.5 rounded-full transition-colors ${
                  i <= step ? "bg-primary" : "bg-border"
                }`}
              />
              <span className={`hidden sm:inline ${i === step ? "text-primary font-bold" : "text-muted-foreground"}`}>
                {s}
              </span>
            </li>
          ))}
        </ol>

        <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_360px]">
          {/* Main Wizard Form Card */}
          <div className="rounded border border-border bg-card p-6 sm:p-8 shadow-xs">
            <h2 className="display-md mb-6 text-foreground font-bold border-b border-border pb-3">
              Step {step + 1}: {steps[step]?.split(". ")[1]}
            </h2>

            {/* STEP 0: SELECT SERVICES */}
            {step === 0 && (
              <div className="space-y-4">
                <p className="text-xs text-muted-foreground">
                  Select one or more workshop services for your visit:
                </p>
                <div className="grid gap-3 sm:grid-cols-2">
                  {services.map((s) => {
                    const on = sel.includes(s.slug);
                    return (
                      <button
                        key={s.slug}
                        type="button"
                        aria-pressed={on}
                        onClick={() =>
                          setSel(on ? sel.filter((x) => x !== s.slug) : [...sel, s.slug])
                        }
                        className={`flex items-start justify-between gap-3 rounded border p-4 text-left transition-all ${
                          on
                            ? "border-primary bg-primary/5 ring-1 ring-primary/40"
                            : "border-border hover:border-foreground/30 bg-card"
                        }`}
                      >
                        <div>
                          <span className="block font-bold text-xs uppercase text-foreground">
                            {s.name}
                          </span>
                          <span className="text-xs text-muted-foreground mt-0.5 block">
                            {s.from ? `From ${taka(s.from)}` : "Quote"} • {s.duration}
                          </span>
                        </div>
                        <span
                          className={`grid h-5 w-5 shrink-0 place-items-center rounded border ${
                            on
                              ? "border-primary bg-primary text-primary-foreground"
                              : "border-input bg-card"
                          }`}
                        >
                          {on && <Check className="h-3.5 w-3.5" />}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* STEP 1: VEHICLE DETAILS */}
            {step === 1 && (
              <div className="space-y-4">
                <p className="text-xs text-muted-foreground">
                  Specify what you drive so our technicians can pre-stage the required filters and diagnostic software:
                </p>
                <div className="grid gap-4 sm:grid-cols-3">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1">
                      Make *
                    </label>
                    <select
                      className="field"
                      value={v.make}
                      onChange={(e) => setV({ make: e.target.value, model: "", year: v.year })}
                    >
                      <option value="">Select Make</option>
                      {Object.keys(vehicleData).map((m) => (
                        <option key={m} value={m}>{m}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1">
                      Model *
                    </label>
                    <select
                      className="field"
                      value={v.model}
                      disabled={!v.make}
                      onChange={(e) => setV({ ...v, model: e.target.value })}
                    >
                      <option value="">Select Model</option>
                      {v.make &&
                        Object.keys(vehicleData[v.make] ?? {}).map((m) => (
                          <option key={m} value={m}>{m}</option>
                        ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1">
                      Year *
                    </label>
                    <select
                      className="field"
                      value={v.year}
                      onChange={(e) => setV({ ...v, year: e.target.value })}
                    >
                      <option value="">Select Year</option>
                      {years.map((y) => (
                        <option key={y} value={y}>{y}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* STEP 2: LOCATION */}
            {step === 2 && (
              <div className="space-y-3">
                <p className="text-xs text-muted-foreground mb-3">
                  Choose your preferred PAGE Service Center or Partner Hub:
                </p>
                {centers.map((x) => (
                  <label
                    key={x.id}
                    className={`flex cursor-pointer items-start gap-3.5 rounded border p-4 transition-colors ${
                      center === x.id
                        ? "border-primary bg-primary/5 ring-1 ring-primary/30"
                        : "border-border hover:border-foreground/30 bg-card"
                    }`}
                  >
                    <input
                      type="radio"
                      name="center"
                      className="mt-1 accent-[var(--color-primary)]"
                      checked={center === x.id}
                      onChange={() => setCenter(x.id)}
                    />
                    <div>
                      <span className="block font-bold text-sm text-foreground">{x.name}</span>
                      <span className="text-xs text-muted-foreground block mt-0.5">
                        {x.address} • Operating: {x.hours}
                      </span>
                      <div className="mt-2 flex flex-wrap gap-1">
                        {x.services.map((sv) => (
                          <span key={sv} className="rounded bg-secondary px-2 py-0.5 text-[10px] font-medium text-foreground">
                            {sv}
                          </span>
                        ))}
                      </div>
                    </div>
                  </label>
                ))}
              </div>
            )}

            {/* STEP 3: DATE & TIME SLOT */}
            {step === 3 && (
              <div className="space-y-6">
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3">
                    Select Appointment Day
                  </p>
                  <div className="flex gap-2.5 overflow-x-auto pb-2">
                    {days.map((d, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => setDay(i)}
                        className={`min-w-20 rounded border px-3 py-3 text-center transition-colors ${
                          day === i
                            ? "border-primary bg-primary text-primary-foreground font-bold"
                            : "border-border hover:border-foreground bg-card text-foreground"
                        }`}
                      >
                        <span className="block text-[11px] uppercase tracking-wider">
                          {d.toLocaleDateString("en", { weekday: "short" })}
                        </span>
                        <span className="font-display text-2xl font-bold block mt-0.5">
                          {d.getDate()}
                        </span>
                        <span className="text-[10px] uppercase opacity-75">
                          {d.toLocaleDateString("en", { month: "short" })}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3">
                    Select Arrival Time Slot
                  </p>
                  <div className="grid grid-cols-3 gap-2.5 sm:grid-cols-6">
                    {slots.map((s, i) => {
                      const isFull = i === 2;
                      return (
                        <button
                          key={s}
                          type="button"
                          disabled={isFull || day === null}
                          onClick={() => setSlot(s)}
                          className={`rounded border py-3 text-xs font-bold transition-colors ${
                            isFull
                              ? "opacity-50 line-through bg-muted cursor-not-allowed border-border text-muted-foreground"
                              : slot === s
                              ? "border-primary bg-primary text-primary-foreground"
                              : "border-border hover:border-foreground bg-card text-foreground"
                          }`}
                        >
                          {s}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* STEP 4: CONTACT DETAILS */}
            {step === 4 && (
              <div className="space-y-4">
                <p className="text-xs text-muted-foreground">
                  Provide your contact details for appointment SMS confirmation and job card generation:
                </p>
                <div className="grid gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-foreground mb-1">
                      Full Name *
                    </label>
                    <input
                      required
                      className="field"
                      placeholder="e.g. Shakib Rahman"
                      value={info.name}
                      onChange={(e) => setInfo({ ...info, name: e.target.value })}
                      autoComplete="name"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-foreground mb-1">
                      Phone Number *
                    </label>
                    <input
                      required
                      type="tel"
                      className="field"
                      placeholder="+880 1..."
                      value={info.phone}
                      onChange={(e) => setInfo({ ...info, phone: e.target.value })}
                      autoComplete="tel"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-foreground mb-1">
                      Specific Symptoms or Vehicle Notes (Optional)
                    </label>
                    <textarea
                      className="field h-24 py-2.5"
                      placeholder="Describe any warning lights, abnormal noises, or specific checkups required"
                      value={info.notes}
                      onChange={(e) => setInfo({ ...info, notes: e.target.value })}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Stepper Navigation Buttons */}
            <div className="mt-8 flex justify-between gap-3 border-t border-border pt-6">
              <button
                type="button"
                onClick={() => setStep(step - 1)}
                disabled={step === 0}
                className="btn btn-outline h-10 px-5 text-xs font-bold uppercase"
              >
                Back
              </button>

              {step < 4 ? (
                <button
                  type="button"
                  disabled={!canNext}
                  onClick={() => setStep(step + 1)}
                  className="btn btn-primary h-10 px-6 text-xs font-bold uppercase"
                >
                  Continue
                </button>
              ) : (
                <button
                  type="button"
                  disabled={!canNext}
                  onClick={() => setDone(true)}
                  className="btn btn-primary h-10 px-8 text-xs font-bold uppercase"
                >
                  Confirm Appointment
                </button>
              )}
            </div>
          </div>

          {/* Right Live Booking Summary */}
          <aside className="h-fit rounded border border-ink-border bg-ink p-6 text-ink-foreground shadow-lg lg:sticky lg:top-28">
            <h3 className="text-xs font-bold uppercase tracking-widest text-primary border-b border-ink-border pb-3">
              Booking Summary
            </h3>

            <dl className="mt-4 space-y-3.5 text-xs">
              <div>
                <dt className="text-ink-muted">Selected Services:</dt>
                <dd className="font-bold text-ink-foreground mt-0.5">
                  {chosen.length ? chosen.map((s) => s.name).join(", ") : "— None selected"}
                </dd>
              </div>

              <div>
                <dt className="text-ink-muted">Target Vehicle:</dt>
                <dd className="font-bold text-ink-foreground mt-0.5">
                  {v.make ? `${v.make} ${v.model} (${v.year})` : "— Not specified"}
                </dd>
              </div>

              <div>
                <dt className="text-ink-muted">Workshop Hub:</dt>
                <dd className="font-bold text-ink-foreground mt-0.5">
                  {c?.name ?? "—"}
                </dd>
              </div>

              <div>
                <dt className="text-ink-muted">Appointment Slot:</dt>
                <dd className="font-bold text-ink-foreground mt-0.5">
                  {day !== null && slot
                    ? `${days[day]!.toLocaleDateString("en", { weekday: "short", month: "short", day: "numeric" })}, at ${slot}`
                    : "—"}
                </dd>
              </div>
            </dl>

            <div className="mt-6 flex items-baseline justify-between border-t border-ink-border/80 pt-4">
              <span className="text-xs text-ink-muted">Estimated from</span>
              <span className="font-display text-3xl font-bold text-ink-foreground">
                {taka(est)}
              </span>
            </div>

            <p className="mt-2 text-[11px] text-ink-muted">
              * Exact quotation confirmed upon technician computerised diagnostic inspection.
            </p>
          </aside>
        </div>
      </div>
    </div>
  );
}
