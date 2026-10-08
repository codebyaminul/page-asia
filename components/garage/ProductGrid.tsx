'use client';

import * as React from 'react';
import { Product } from '@/types';
import { ProductCard } from './ProductCard';
import { FilterState } from './ProductFilters';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { X, SearchX, RotateCcw } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface ProductGridProps {
  products: Product[];
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
  onResetFilters: () => void;
  onOpenQuote?: (product: Product) => void;
}

export function ProductGrid({
  products,
  filters,
  onFilterChange,
  onResetFilters,
  onOpenQuote,
}: ProductGridProps) {
  // Collect active filter tags
  const activeChips: { label: string; onRemove: () => void }[] = [];

  if (filters.searchQuery) {
    activeChips.push({
      label: `Search: "${filters.searchQuery}"`,
      onRemove: () => onFilterChange({ ...filters, searchQuery: '' }),
    });
  }

  if (filters.category !== 'all') {
    activeChips.push({
      label: `Category: ${filters.category.replace(/-/g, ' ')}`,
      onRemove: () => onFilterChange({ ...filters, category: 'all' }),
    });
  }

  if (filters.brand !== 'all') {
    activeChips.push({
      label: `Brand: ${filters.brand}`,
      onRemove: () => onFilterChange({ ...filters, brand: 'all' }),
    });
  }

  if (filters.subcategory !== 'all') {
    activeChips.push({
      label: `Subcategory: ${filters.subcategory}`,
      onRemove: () => onFilterChange({ ...filters, subcategory: 'all' }),
    });
  }

  if (filters.equipmentType !== 'all') {
    activeChips.push({
      label: `Type: ${filters.equipmentType}`,
      onRemove: () => onFilterChange({ ...filters, equipmentType: 'all' }),
    });
  }

  if (filters.application !== 'all') {
    activeChips.push({
      label: `Application: ${filters.application}`,
      onRemove: () => onFilterChange({ ...filters, application: 'all' }),
    });
  }

  if (filters.availability !== 'all') {
    activeChips.push({
      label: `Status: ${filters.availability}`,
      onRemove: () => onFilterChange({ ...filters, availability: 'all' }),
    });
  }

  return (
    <div className="space-y-6">
      {/* Active Filter Chips Bar */}
      {activeChips.length > 0 && (
        <div className="flex flex-wrap items-center gap-2 p-3 bg-page-offwhite rounded-md border border-page-lightgray text-xs">
          <span className="font-mono uppercase tracking-wider text-page-midgray text-[11px] mr-1">
            Active Filters:
          </span>
          {activeChips.map((chip, idx) => (
            <span
              key={idx}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-white border border-page-lightgray text-page-nearblack font-medium shadow-2xs"
            >
              <span>{chip.label}</span>
              <button
                type="button"
                onClick={chip.onRemove}
                className="hover:text-page-red cursor-pointer p-0.5"
                aria-label="Remove filter"
              >
                <X className="h-3 w-3" />
              </button>
            </span>
          ))}

          <button
            type="button"
            onClick={onResetFilters}
            className="text-page-red font-semibold hover:underline ml-auto text-[11px] cursor-pointer"
          >
            Clear All
          </button>
        </div>
      )}

      {/* Grid of Products or Empty State */}
      {products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onOpenQuote={onOpenQuote}
            />
          ))}
        </div>
      ) : (
        <div className="py-16 px-6 text-center bg-page-offwhite rounded-md border border-dashed border-page-lightgray space-y-4 max-w-lg mx-auto">
          <div className="w-12 h-12 rounded-full bg-white border border-page-lightgray flex items-center justify-center mx-auto text-page-midgray">
            <SearchX className="h-6 w-6 text-page-red" />
          </div>

          <div className="space-y-1">
            <h3 className="text-lg font-bold text-page-nearblack">
              No equipment found
            </h3>
            <p className="text-sm text-page-midgray leading-relaxed">
              No workshop equipment matches your current search keywords and filter criteria. Try another search or reset all filters.
            </p>
          </div>

          <div className="pt-2">
            <Button
              variant="outline"
              size="md"
              onClick={onResetFilters}
              className="font-semibold text-xs gap-1.5"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              <span>Reset Filters & Browse All Equipment</span>
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
