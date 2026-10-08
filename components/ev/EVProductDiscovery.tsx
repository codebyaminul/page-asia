'use client';

import * as React from 'react';
import Link from 'next/link';
import { evCategories } from '@/data/categories';
import { evProducts } from '@/data/products/ev-parts';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Zap, Bike, Truck, ArrowRight, CheckCircle2, ChevronRight, Sparkles } from 'lucide-react';
import { EVProductCard } from '@/components/ev/EVProductCard';
import { Product } from '@/types';

interface EVProductDiscoveryProps {
  onOpenQuote?: (product: Product) => void;
}

export function EVProductDiscovery({ onOpenQuote }: EVProductDiscoveryProps) {
  const [selectedVehicle, setSelectedVehicle] = React.useState<'2-wheeler' | '3-wheeler' | 'all'>('2-wheeler');
  const [selectedCategory, setSelectedCategory] = React.useState<string>('motors');

  // Filter products based on interactive selection
  const matchingProducts = React.useMemo(() => {
    return evProducts.filter((product) => {
      const matchVehicle =
        selectedVehicle === 'all' ||
        !product.vehicleCompatibility ||
        product.vehicleCompatibility.includes(selectedVehicle) ||
        product.vehicleCompatibility.includes('both');

      const matchCategory =
        selectedCategory === 'all' || product.category === selectedCategory;

      return matchVehicle && matchCategory;
    });
  }, [selectedVehicle, selectedCategory]);

  const activeCategoryObj = evCategories.find((c) => c.slug === selectedCategory);

  return (
    <section className="py-12 md:py-16 bg-page-offwhite border-y border-page-lightgray/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-ev-teal/10 border border-ev-teal/20 text-ev-teal text-xs font-mono font-semibold tracking-wider">
            <Sparkles className="h-3 w-3" />
            <span>Interactive Guided System Navigator</span>
          </div>
          <h2 className="text-h2 font-bold tracking-tight text-page-nearblack">
            Guided Component Matcher
          </h2>
          <p className="text-sm text-page-midgray leading-relaxed">
            Select your vehicle class and target component system to inspect calibrated compatibility metrics, voltage profiles, and instant engineering lead times.
          </p>
        </div>

        {/* Guided Wizard Flow Container */}
        <div className="bg-white rounded-lg border border-page-lightgray shadow-xs p-6 md:p-8 space-y-8">
          {/* STEP 1: Choose Vehicle */}
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-page-lightgray pb-3">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-ev-teal text-white font-mono text-xs font-bold flex items-center justify-center">
                  1
                </span>
                <h3 className="text-base font-bold text-page-nearblack uppercase tracking-wider font-mono">
                  Select Vehicle Platform
                </h3>
              </div>
              <span className="text-xs text-page-midgray font-mono">
                Active: <strong className="text-ev-teal capitalize">{selectedVehicle.replace('-', ' ')}</strong>
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <button
                type="button"
                onClick={() => setSelectedVehicle('2-wheeler')}
                className={`flex items-center gap-3 p-4 rounded-md border-2 transition-all text-left ${
                  selectedVehicle === '2-wheeler'
                    ? 'border-ev-teal bg-ev-tealLight/40 text-page-nearblack'
                    : 'border-page-lightgray hover:border-page-midgray bg-white text-page-midgray'
                }`}
              >
                <div className={`p-2.5 rounded ${selectedVehicle === '2-wheeler' ? 'bg-ev-teal text-white' : 'bg-page-offwhite text-page-midgray'}`}>
                  <Bike className="h-5 w-5" />
                </div>
                <div>
                  <div className="font-bold text-sm text-page-nearblack">2-Wheeler EV</div>
                  <div className="text-xs text-page-midgray">Bikes, Scooters & Mopeds (36V–60V)</div>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setSelectedVehicle('3-wheeler')}
                className={`flex items-center gap-3 p-4 rounded-md border-2 transition-all text-left ${
                  selectedVehicle === '3-wheeler'
                    ? 'border-ev-teal bg-ev-tealLight/40 text-page-nearblack'
                    : 'border-page-lightgray hover:border-page-midgray bg-white text-page-midgray'
                }`}
              >
                <div className={`p-2.5 rounded ${selectedVehicle === '3-wheeler' ? 'bg-ev-teal text-white' : 'bg-page-offwhite text-page-midgray'}`}>
                  <Truck className="h-5 w-5" />
                </div>
                <div>
                  <div className="font-bold text-sm text-page-nearblack">3-Wheeler EV</div>
                  <div className="text-xs text-page-midgray">E-Rickshaws & Cargo Loaders (48V–72V)</div>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setSelectedVehicle('all')}
                className={`flex items-center gap-3 p-4 rounded-md border-2 transition-all text-left ${
                  selectedVehicle === 'all'
                    ? 'border-ev-teal bg-ev-tealLight/40 text-page-nearblack'
                    : 'border-page-lightgray hover:border-page-midgray bg-white text-page-midgray'
                }`}
              >
                <div className={`p-2.5 rounded ${selectedVehicle === 'all' ? 'bg-ev-teal text-white' : 'bg-page-offwhite text-page-midgray'}`}>
                  <Zap className="h-5 w-5" />
                </div>
                <div>
                  <div className="font-bold text-sm text-page-nearblack">All Vehicle Platforms</div>
                  <div className="text-xs text-page-midgray">View entire multi-platform catalog</div>
                </div>
              </button>
            </div>
          </div>

          {/* STEP 2: Choose Component Category */}
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-page-lightgray pb-3">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-ev-teal text-white font-mono text-xs font-bold flex items-center justify-center">
                  2
                </span>
                <h3 className="text-base font-bold text-page-nearblack uppercase tracking-wider font-mono">
                  Select Component Category
                </h3>
              </div>
              <span className="text-xs text-page-midgray font-mono">
                {evCategories.length} Component Systems
              </span>
            </div>

            <div className="flex flex-wrap gap-2">
              {evCategories.map((cat) => {
                const isSelected = selectedCategory === cat.slug;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setSelectedCategory(cat.slug)}
                    className={`px-3.5 py-2 rounded-md text-xs font-medium font-mono transition-all flex items-center gap-1.5 border ${
                      isSelected
                        ? 'bg-page-nearblack text-white border-page-nearblack shadow-xs'
                        : 'bg-page-offwhite text-page-charcoal border-page-lightgray hover:border-page-midgray'
                    }`}
                  >
                    <span>{cat.name}</span>
                  </button>
                );
              })}
              <button
                type="button"
                onClick={() => setSelectedCategory('all')}
                className={`px-3.5 py-2 rounded-md text-xs font-medium font-mono transition-all border ${
                  selectedCategory === 'all'
                    ? 'bg-page-nearblack text-white border-page-nearblack shadow-xs'
                    : 'bg-page-offwhite text-page-charcoal border-page-lightgray hover:border-page-midgray'
                }`}
              >
                All Components
              </button>
            </div>
          </div>

          {/* STEP 3: Matching Products Result Header & Preview */}
          <div className="space-y-4 pt-2">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-page-lightgray pb-3">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-ev-teal text-white font-mono text-xs font-bold flex items-center justify-center">
                  3
                </span>
                <h3 className="text-base font-bold text-page-nearblack uppercase tracking-wider font-mono">
                  Compatible Components ({matchingProducts.length})
                </h3>
              </div>

              <Link
                href={`/ev-parts/${selectedVehicle === 'all' ? '2-wheeler' : selectedVehicle}?category=${selectedCategory}`}
                className="text-xs font-mono font-bold text-ev-teal hover:underline inline-flex items-center gap-1"
              >
                <span>Open in Full Catalog with Filters</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>

            {/* Product Cards Preview */}
            {matchingProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-2">
                {matchingProducts.slice(0, 3).map((prod) => (
                  <EVProductCard
                    key={prod.id}
                    product={prod}
                    onOpenQuote={onOpenQuote}
                  />
                ))}
              </div>
            ) : (
              <div className="p-8 text-center bg-page-offwhite rounded-md border border-page-lightgray space-y-3">
                <Zap className="h-8 w-8 text-page-midgray mx-auto" />
                <p className="text-sm font-semibold text-page-nearblack">
                  No exact mock products matching this combination.
                </p>
                <p className="text-xs text-page-midgray max-w-md mx-auto">
                  Try switching between 2-Wheeler and 3-Wheeler or selecting a different component category.
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setSelectedVehicle('all');
                    setSelectedCategory('all');
                  }}
                  className="text-xs font-mono"
                >
                  Reset Discovery Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
