'use client';

import * as React from 'react';
import { evCategories } from '@/data/categories';
import { EVComponentCard } from '@/components/ev/EVComponentCard';
import { SectionWrapper } from '@/components/layout/SectionWrapper';

interface EVComponentGridProps {
  vehicleTypeFilter?: string;
  className?: string;
}

export function EVComponentGrid({ vehicleTypeFilter, className }: EVComponentGridProps) {
  return (
    <section className={`py-12 md:py-16 bg-white ${className || ''}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-label text-ev-teal font-mono font-semibold tracking-wider block">
            Sub-System Architecture
          </span>
          <h2 className="text-h2 font-bold tracking-tight text-page-nearblack">
            Browse by Component Category
          </h2>
          <p className="text-sm text-page-midgray leading-relaxed">
            From complete motor powertrains and vector controllers to deep-cycle lithium storage and waterproof wiring assemblies.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
          {evCategories.map((category) => (
            <EVComponentCard
              key={category.id}
              category={category}
              vehicleTypeFilter={vehicleTypeFilter}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
