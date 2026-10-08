'use client';

import * as React from 'react';
import { evCategories } from '@/data/categories';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Filter, X, RefreshCw, Zap, Check } from 'lucide-react';

export interface EVFilterState {
  vehicleType: string; // 'all' | '2-wheeler' | '3-wheeler'
  category: string; // 'all' | category slug
  voltages: string[]; // e.g. ['36V', '48V', '60V', '72V']
  availability: string; // 'all' | 'in-stock'
  searchQuery: string;
}

interface EVProductFiltersProps {
  filters: EVFilterState;
  onFilterChange: (filters: EVFilterState) => void;
  onReset: () => void;
  totalCount: number;
  className?: string;
}

const VOLTAGE_OPTIONS = ['36V', '48V', '60V', '72V'];

export function EVProductFilters({
  filters,
  onFilterChange,
  onReset,
  totalCount,
  className,
}: EVProductFiltersProps) {
  const handleVehicleChange = (type: string) => {
    onFilterChange({ ...filters, vehicleType: type });
  };

  const handleCategoryChange = (slug: string) => {
    onFilterChange({ ...filters, category: slug });
  };

  const handleVoltageToggle = (volt: string) => {
    const exists = filters.voltages.includes(volt);
    const newVoltages = exists
      ? filters.voltages.filter((v) => v !== volt)
      : [...filters.voltages, volt];
    onFilterChange({ ...filters, voltages: newVoltages });
  };

  const handleAvailabilityToggle = (avail: string) => {
    onFilterChange({
      ...filters,
      availability: filters.availability === avail ? 'all' : avail,
    });
  };

  const activeFiltersCount =
    (filters.vehicleType !== 'all' ? 1 : 0) +
    (filters.category !== 'all' ? 1 : 0) +
    filters.voltages.length +
    (filters.availability !== 'all' ? 1 : 0);

  return (
    <aside className={`bg-white rounded-lg border border-page-lightgray p-5 space-y-6 ${className || ''}`}>
      {/* Filter Header */}
      <div className="flex items-center justify-between border-b border-page-lightgray pb-4">
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-ev-teal" />
          <h3 className="text-sm font-bold uppercase tracking-wider font-mono text-page-nearblack">
            Filters
          </h3>
          {activeFiltersCount > 0 && (
            <Badge variant="ev" className="text-[10px] px-1.5 py-0 h-4">
              {activeFiltersCount}
            </Badge>
          )}
        </div>

        {activeFiltersCount > 0 && (
          <button
            type="button"
            onClick={onReset}
            className="text-xs font-mono text-page-midgray hover:text-page-red flex items-center gap-1 transition-colors"
          >
            <RefreshCw className="h-3 w-3" />
            <span>Reset</span>
          </button>
        )}
      </div>

      {/* 1. Vehicle Platform Filter */}
      <div className="space-y-2.5">
        <span className="text-[11px] font-mono uppercase tracking-wider text-page-nearblack font-semibold block">
          Vehicle Classification
        </span>
        <div className="grid grid-cols-3 gap-1.5">
          {[
            { id: 'all', label: 'All' },
            { id: '2-wheeler', label: '2-Wheeler' },
            { id: '3-wheeler', label: '3-Wheeler' },
          ].map((item) => {
            const isSelected = filters.vehicleType === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleVehicleChange(item.id)}
                className={`py-1.5 px-2 text-xs font-mono rounded border transition-all text-center ${
                  isSelected
                    ? 'bg-page-nearblack text-white border-page-nearblack font-bold shadow-xs'
                    : 'bg-page-offwhite text-page-charcoal border-page-lightgray hover:border-page-midgray'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Component System Filter */}
      <div className="space-y-2.5 pt-4 border-t border-page-lightgray/80">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-mono uppercase tracking-wider text-page-nearblack font-semibold block">
            Component System
          </span>
          {filters.category !== 'all' && (
            <button
              onClick={() => handleCategoryChange('all')}
              className="text-[10px] font-mono text-ev-teal hover:underline"
            >
              Show all
            </button>
          )}
        </div>

        <div className="space-y-1 max-h-56 overflow-y-auto pr-1">
          <button
            type="button"
            onClick={() => handleCategoryChange('all')}
            className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded text-xs transition-colors ${
              filters.category === 'all'
                ? 'bg-ev-teal/10 text-ev-teal font-bold'
                : 'text-page-charcoal hover:bg-page-offwhite'
            }`}
          >
            <span>All Component Systems</span>
            {filters.category === 'all' && <Check className="h-3.5 w-3.5 text-ev-teal" />}
          </button>

          {evCategories.map((cat) => {
            const isSelected = filters.category === cat.slug;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => handleCategoryChange(cat.slug)}
                className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded text-xs transition-colors ${
                  isSelected
                    ? 'bg-ev-teal/10 text-ev-teal font-bold'
                    : 'text-page-charcoal hover:bg-page-offwhite'
                }`}
              >
                <span className="truncate">{cat.name}</span>
                {isSelected && <Check className="h-3.5 w-3.5 text-ev-teal shrink-0" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. Voltage Architecture Filter */}
      <div className="space-y-2.5 pt-4 border-t border-page-lightgray/80">
        <span className="text-[11px] font-mono uppercase tracking-wider text-page-nearblack font-semibold block">
          Nominal Voltage Rating
        </span>
        <div className="grid grid-cols-2 gap-2">
          {VOLTAGE_OPTIONS.map((v) => {
            const isChecked = filters.voltages.includes(v);
            return (
              <button
                key={v}
                type="button"
                onClick={() => handleVoltageToggle(v)}
                className={`py-1.5 px-3 rounded text-xs font-mono font-semibold border flex items-center justify-between transition-all ${
                  isChecked
                    ? 'bg-ev-teal text-white border-ev-teal shadow-xs'
                    : 'bg-page-offwhite text-page-charcoal border-page-lightgray hover:border-page-midgray'
                }`}
              >
                <span>{v}</span>
                {isChecked && <Check className="h-3 w-3 text-white" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* 4. Availability Filter */}
      <div className="space-y-2.5 pt-4 border-t border-page-lightgray/80">
        <span className="text-[11px] font-mono uppercase tracking-wider text-page-nearblack font-semibold block">
          Inventory Availability
        </span>
        <div className="space-y-1.5">
          <label className="flex items-center gap-2.5 text-xs text-page-charcoal cursor-pointer">
            <input
              type="checkbox"
              checked={filters.availability === 'in-stock'}
              onChange={() => handleAvailabilityToggle('in-stock')}
              className="rounded border-page-lightgray text-ev-teal focus:ring-ev-teal"
            />
            <span>In Stock Only (Fast Dispatch)</span>
          </label>
        </div>
      </div>

      {/* Result Count Status */}
      <div className="pt-4 border-t border-page-lightgray text-xs font-mono text-page-midgray flex items-center justify-between">
        <span>Matching Components:</span>
        <strong className="text-page-nearblack font-bold">{totalCount}</strong>
      </div>
    </aside>
  );
}
