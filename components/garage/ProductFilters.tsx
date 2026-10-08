'use client';

import * as React from 'react';
import { garageCategories } from '@/data/categories';
import { brands } from '@/data/brands';
import { garageProducts } from '@/data/products/garage-equipment';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Filter, RotateCcw, X, ChevronDown, Check } from 'lucide-react';

export interface FilterState {
  category: string;
  subcategory: string;
  brand: string;
  equipmentType: string;
  application: string;
  availability: string;
  searchQuery: string;
  sortBy: 'relevance' | 'newest' | 'featured' | 'name-asc';
}

interface ProductFiltersProps {
  filters: FilterState;
  onFilterChange: (newFilters: FilterState) => void;
  onResetFilters: () => void;
  totalFilteredCount: number;
  totalCount: number;
}

export function ProductFilters({
  filters,
  onFilterChange,
  onResetFilters,
  totalFilteredCount,
  totalCount,
}: ProductFiltersProps) {
  // Extract unique options dynamically from garageProducts
  const subcategories = React.useMemo(() => {
    const list = Array.from(
      new Set(
        garageProducts
          .map((p) => p.subcategory)
          .filter((v): v is string => Boolean(v))
      )
    );
    return list;
  }, []);

  const equipmentTypes = React.useMemo(() => {
    const list = Array.from(
      new Set(
        garageProducts
          .map((p) => p.equipmentType)
          .filter((v): v is string => Boolean(v))
      )
    );
    return list;
  }, []);

  const applications = React.useMemo(() => {
    const list = Array.from(
      new Set(
        garageProducts
          .map((p) => p.application)
          .filter((v): v is string => Boolean(v))
      )
    );
    return list;
  }, []);

  const availabilities = ['In Stock', 'Available on Order', 'Lead Time: 1-2 Weeks'];

  const hasActiveFilters =
    filters.category !== 'all' ||
    filters.subcategory !== 'all' ||
    filters.brand !== 'all' ||
    filters.equipmentType !== 'all' ||
    filters.application !== 'all' ||
    filters.availability !== 'all' ||
    filters.searchQuery !== '';

  return (
    <div className="space-y-6">
      {/* Filter Header */}
      <div className="flex items-center justify-between pb-4 border-b border-page-lightgray">
        <div className="flex items-center gap-2 font-bold text-page-nearblack text-sm uppercase tracking-wider">
          <Filter className="h-4 w-4 text-page-red" />
          <span>Filters</span>
          <span className="text-xs font-mono font-normal text-page-midgray">
            ({totalFilteredCount})
          </span>
        </div>

        {hasActiveFilters && (
          <button
            onClick={onResetFilters}
            className="text-xs text-page-red font-semibold hover:underline inline-flex items-center gap-1 cursor-pointer"
          >
            <RotateCcw className="h-3 w-3" />
            <span>Reset All</span>
          </button>
        )}
      </div>

      {/* 1. Category Filter */}
      <div className="space-y-3">
        <h4 className="text-xs font-bold uppercase tracking-wider text-page-nearblack">
          Equipment Category
        </h4>
        <div className="space-y-1.5 text-xs">
          <button
            onClick={() => onFilterChange({ ...filters, category: 'all' })}
            className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded transition-colors text-left cursor-pointer ${
              filters.category === 'all'
                ? 'bg-page-nearblack text-white font-bold'
                : 'text-page-midgray hover:bg-page-offwhite hover:text-page-nearblack'
            }`}
          >
            <span>All Categories</span>
            <span className="font-mono text-[10px]">{totalCount}</span>
          </button>

          {garageCategories.map((cat) => {
            const count = garageProducts.filter((p) => p.category === cat.slug).length;
            const isSelected = filters.category === cat.slug;

            return (
              <button
                key={cat.id}
                onClick={() =>
                  onFilterChange({
                    ...filters,
                    category: isSelected ? 'all' : cat.slug,
                    subcategory: 'all', // reset subcategory on category change
                  })
                }
                className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded transition-colors text-left cursor-pointer ${
                  isSelected
                    ? 'bg-page-red text-white font-bold'
                    : 'text-page-midgray hover:bg-page-offwhite hover:text-page-nearblack'
                }`}
              >
                <span className="truncate">{cat.name}</span>
                <span className="font-mono text-[10px]">{count}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Brand Partner Filter */}
      <div className="pt-4 border-t border-page-lightgray space-y-3">
        <h4 className="text-xs font-bold uppercase tracking-wider text-page-nearblack">
          Authorized Brand
        </h4>
        <div className="space-y-1.5 text-xs">
          <button
            onClick={() => onFilterChange({ ...filters, brand: 'all' })}
            className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded transition-colors text-left cursor-pointer ${
              filters.brand === 'all'
                ? 'bg-page-nearblack text-white font-bold'
                : 'text-page-midgray hover:bg-page-offwhite hover:text-page-nearblack'
            }`}
          >
            <span>All Brands</span>
          </button>

          {brands.map((b) => {
            const isSelected = filters.brand === b.name;
            const count = garageProducts.filter((p) => p.brand === b.name).length;

            return (
              <button
                key={b.id}
                onClick={() =>
                  onFilterChange({
                    ...filters,
                    brand: isSelected ? 'all' : b.name,
                  })
                }
                className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded transition-colors text-left cursor-pointer ${
                  isSelected
                    ? 'bg-page-charcoal text-white font-bold'
                    : 'text-page-midgray hover:bg-page-offwhite hover:text-page-nearblack'
                }`}
              >
                <span>{b.name}</span>
                <span className="font-mono text-[10px]">({count})</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. Subcategory Filter */}
      {subcategories.length > 0 && (
        <div className="pt-4 border-t border-page-lightgray space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-page-nearblack">
            Subcategory
          </h4>
          <div className="space-y-1 max-h-48 overflow-y-auto pr-1 text-xs">
            {subcategories.map((sub) => {
              const isSelected = filters.subcategory === sub;
              return (
                <button
                  key={sub}
                  onClick={() =>
                    onFilterChange({
                      ...filters,
                      subcategory: isSelected ? 'all' : sub,
                    })
                  }
                  className={`w-full flex items-center justify-between px-2 py-1.5 rounded transition-colors text-left cursor-pointer ${
                    isSelected
                      ? 'bg-page-offwhite font-bold text-page-red'
                      : 'text-page-midgray hover:text-page-nearblack'
                  }`}
                >
                  <span className="truncate">{sub}</span>
                  {isSelected && <Check className="h-3 w-3 text-page-red" />}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* 4. Equipment Type Filter */}
      {equipmentTypes.length > 0 && (
        <div className="pt-4 border-t border-page-lightgray space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-page-nearblack">
            Equipment Type
          </h4>
          <div className="space-y-1 max-h-48 overflow-y-auto pr-1 text-xs">
            {equipmentTypes.map((type) => {
              const isSelected = filters.equipmentType === type;
              return (
                <button
                  key={type}
                  onClick={() =>
                    onFilterChange({
                      ...filters,
                      equipmentType: isSelected ? 'all' : type,
                    })
                  }
                  className={`w-full flex items-center justify-between px-2 py-1.5 rounded transition-colors text-left cursor-pointer ${
                    isSelected
                      ? 'bg-page-offwhite font-bold text-page-red'
                      : 'text-page-midgray hover:text-page-nearblack'
                  }`}
                >
                  <span className="truncate">{type}</span>
                  {isSelected && <Check className="h-3 w-3 text-page-red" />}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* 5. Application / Work Environment */}
      {applications.length > 0 && (
        <div className="pt-4 border-t border-page-lightgray space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-page-nearblack">
            Application
          </h4>
          <div className="space-y-1 text-xs">
            {applications.map((app) => {
              const isSelected = filters.application === app;
              return (
                <button
                  key={app}
                  onClick={() =>
                    onFilterChange({
                      ...filters,
                      application: isSelected ? 'all' : app,
                    })
                  }
                  className={`w-full flex items-center justify-between px-2 py-1.5 rounded transition-colors text-left cursor-pointer ${
                    isSelected
                      ? 'bg-page-offwhite font-bold text-page-red'
                      : 'text-page-midgray hover:text-page-nearblack'
                  }`}
                >
                  <span className="truncate">{app}</span>
                  {isSelected && <Check className="h-3 w-3 text-page-red" />}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* 6. Availability */}
      <div className="pt-4 border-t border-page-lightgray space-y-3">
        <h4 className="text-xs font-bold uppercase tracking-wider text-page-nearblack">
          Availability Status
        </h4>
        <div className="space-y-1 text-xs">
          {availabilities.map((avail) => {
            const isSelected = filters.availability === avail;
            return (
              <button
                key={avail}
                onClick={() =>
                  onFilterChange({
                    ...filters,
                    availability: isSelected ? 'all' : avail,
                  })
                }
                className={`w-full flex items-center justify-between px-2 py-1.5 rounded transition-colors text-left cursor-pointer ${
                  isSelected
                    ? 'bg-page-offwhite font-bold text-page-red'
                    : 'text-page-midgray hover:text-page-nearblack'
                }`}
              >
                <span>{avail}</span>
                {isSelected && <Check className="h-3 w-3 text-page-red" />}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
