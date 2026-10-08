import { useNavigate } from "@tanstack/react-router";
import { Car, CheckCircle2, RotateCcw, Search } from "lucide-react";
import { useState } from "react";
import { vehicleData, years } from "@/lib/data";
import { useCart } from "@/lib/cart";

export function VehicleFinder({ dark = false }: { dark?: boolean }) {
  const { vehicle, setVehicle } = useCart();
  const [make, setMake] = useState(vehicle?.make ?? "");
  const [model, setModel] = useState(vehicle?.model ?? "");
  const [year, setYear] = useState(vehicle?.year ?? "");
  const [engine, setEngine] = useState(vehicle?.engine ?? "");
  const navigate = useNavigate();

  const models = make ? Object.keys(vehicleData[make] ?? {}) : [];
  const engines = make && model ? vehicleData[make]?.[model] ?? [] : [];
  const ready = make && model && year;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ready) return;
    setVehicle({ make, model, year, engine });
    navigate({
      to: "/shop",
      search: { vehicle: `${make} ${model}` },
    });
  };

  const handleReset = () => {
    setMake("");
    setModel("");
    setYear("");
    setEngine("");
  };

  const fClass = dark ? "field-dark" : "field";

  return (
    <div className={`rounded-[var(--radius)] border ${dark ? "border-ink-border bg-ink-2/90 text-ink-foreground" : "border-border bg-card text-foreground"} p-4 sm:p-6 shadow-sm`}>
      <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="grid h-7 w-7 place-items-center rounded bg-primary/10 text-primary">
            <Car className="h-4 w-4" />
          </span>
          <span className="text-xs font-bold uppercase tracking-wider">
            Vehicle Fitment Finder
          </span>
        </div>
        <span className="flex items-center gap-1 text-[11px] font-semibold text-success">
          <CheckCircle2 className="h-3.5 w-3.5" /> 100% Fitment Guarantee
        </span>
      </div>

      <form onSubmit={handleSubmit} className="grid gap-3 sm:grid-cols-2 lg:grid-cols-[1fr_1fr_1fr_1fr_auto]">
        <div>
          <label className="mb-1 block text-[11px] font-bold uppercase tracking-wider text-muted-foreground" htmlFor="vf-make">
            1. Select Make
          </label>
          <select
            id="vf-make"
            className={fClass}
            value={make}
            onChange={(e) => {
              setMake(e.target.value);
              setModel("");
              setEngine("");
            }}
          >
            <option value="">Select Make</option>
            {Object.keys(vehicleData).map((m) => (
              <option key={m} value={m}>{m}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="mb-1 block text-[11px] font-bold uppercase tracking-wider text-muted-foreground" htmlFor="vf-model">
            2. Select Model
          </label>
          <select
            id="vf-model"
            className={fClass}
            value={model}
            disabled={!make}
            onChange={(e) => {
              setModel(e.target.value);
              setEngine("");
            }}
          >
            <option value="">{make ? "Select Model" : "Choose Make first"}</option>
            {models.map((m) => (
              <option key={m} value={m}>{m}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="mb-1 block text-[11px] font-bold uppercase tracking-wider text-muted-foreground" htmlFor="vf-year">
            3. Model Year
          </label>
          <select
            id="vf-year"
            className={fClass}
            value={year}
            onChange={(e) => setYear(e.target.value)}
          >
            <option value="">Select Year</option>
            {years.map((y) => (
              <option key={y} value={y}>{y}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="mb-1 block text-[11px] font-bold uppercase tracking-wider text-muted-foreground" htmlFor="vf-engine">
            4. Engine Trim
          </label>
          <select
            id="vf-engine"
            className={fClass}
            value={engine}
            disabled={!model}
            onChange={(e) => setEngine(e.target.value)}
          >
            <option value="">{model ? "All Engines / Trims" : "Choose Model"}</option>
            {engines.map((m) => (
              <option key={m} value={m}>{m}</option>
            ))}
          </select>
        </div>

        <div className="flex items-end gap-2 sm:col-span-2 lg:col-span-1">
          <button
            type="submit"
            disabled={!ready}
            className="btn btn-primary h-[2.85rem] w-full text-xs font-bold tracking-wider uppercase flex items-center justify-center gap-1.5"
          >
            <Search className="h-4 w-4" />
            <span>Find Parts</span>
          </button>
          {(make || model || year) && (
            <button
              type="button"
              onClick={handleReset}
              title="Reset fields"
              className="grid h-[2.85rem] w-10 shrink-0 place-items-center rounded border border-border hover:border-foreground text-muted-foreground hover:text-foreground"
            >
              <RotateCcw className="h-3.5 w-3.5" />
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
