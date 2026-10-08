'use client';

import * as React from 'react';
import { Product } from '@/types';
import { EVProductCard } from '@/components/ev/EVProductCard';
import { Button } from '@/components/ui/button';
import { Zap, RefreshCw } from 'lucide-react';

interface EVProductGridProps {
  products: Product[];
  onOpenQuote?: (product: Product) => void;
  preferredVehicleType?: string;
  onResetFilters?: () => void;
}

export function EVProductGrid({
  products,
  onOpenQuote,
  preferredVehicleType,
  onResetFilters,
}: EVProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="py-16 px-6 text-center bg-white rounded-lg border border-page-lightgray space-y-4">
        <div className="w-12 h-12 rounded-full bg-page-offwhite border border-page-lightgray flex items-center justify-center mx-auto text-page-midgray">
          <Zap className="h-6 w-6 text-ev-teal" />
        </div>
        <div className="space-y-1">
          <h3 className="text-lg font-bold text-page-nearblack">
            No matching EV components found
          </h3>
          <p className="text-sm text-page-midgray max-w-md mx-auto">
            We couldn't find any products matching your specific filters. Try expanding your search terms, voltage ratings, or component categories.
          </p>
        </div>
        {onResetFilters && (
          <Button
            variant="outline"
            size="sm"
            onClick={onResetFilters}
            className="text-xs font-mono gap-1.5"
          >
            <RefreshCw className="h-3.5 w-3.5" />
            <span>Reset All Filters</span>
          </Button>
        )}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product) => (
        <EVProductCard
          key={product.id}
          product={product}
          onOpenQuote={onOpenQuote}
          preferredVehicleType={preferredVehicleType}
        />
      ))}
    </div>
  );
}
