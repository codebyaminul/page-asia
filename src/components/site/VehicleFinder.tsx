import { useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { vehicleData, years } from "@/lib/data";
import { useCart } from "@/lib/cart";

export function VehicleFinder({ dark = true }: { dark?: boolean }) {
  const { vehicle, setVehicle } = useCart();
  const [make, setMake] = useState(vehicle?.make ?? "");
  const [model, setModel] = useState(vehicle?.model ?? "");
  const [year, setYear] = useState(vehicle?.year ?? "");
  const [engine, setEngine] = useState(vehicle?.engine ?? "");
  const navigate = useNavigate();
  const f = dark ? "field-dark" : "field";
  const models = make ? Object.keys(vehicleData[make] ?? {}) : [];
  const engines = make && model ? (vehicleData[make]?.[model] ?? []) : [];
  const ready = make && model && year;

  return (
    <form
      onSubmit={(e) => { e.preventDefault(); if (!ready) return; setVehicle({ make, model, year, engine }); navigate({ to: "/shop", search: { vehicle: `${make} ${model}` } }); }}
      className="grid gap-3 sm:grid-cols-2 lg:grid-cols-[repeat(4,1fr)_auto]"
    >
      <label className="sr-only" htmlFor="vf-make">Make</label>
      <select id="vf-make" className={f} value={make} onChange={(e) => { setMake(e.target.value); setModel(""); setEngine(""); }}>
        <option value="">Make</option>{Object.keys(vehicleData).map((m) => <option key={m}>{m}</option>)}
      </select>
      <label className="sr-only" htmlFor="vf-model">Model</label>
      <select id="vf-model" className={f} value={model} disabled={!make} onChange={(e) => { setModel(e.target.value); setEngine(""); }}>
        <option value="">Model</option>{models.map((m) => <option key={m}>{m}</option>)}
      </select>
      <label className="sr-only" htmlFor="vf-year">Year</label>
      <select id="vf-year" className={f} value={year} onChange={(e) => setYear(e.target.value)}>
        <option value="">Year</option>{years.map((y) => <option key={y}>{y}</option>)}
      </select>
      <label className="sr-only" htmlFor="vf-engine">Engine</label>
      <select id="vf-engine" className={f} value={engine} disabled={!model} onChange={(e) => setEngine(e.target.value)}>
        <option value="">Engine</option>{engines.map((m) => <option key={m}>{m}</option>)}
      </select>
      <button type="submit" disabled={!ready} className="btn btn-primary h-[3.25rem] sm:col-span-2 lg:col-span-1">Find Compatible Products</button>
    </form>
  );
}
