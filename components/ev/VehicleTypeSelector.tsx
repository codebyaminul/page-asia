'use client';

import * as React from 'react';
import { Container } from '@/components/layout/Container';
import { SectionWrapper } from '@/components/layout/SectionWrapper';
import { evVehicleTypes } from '@/data/ev-vehicle-types';
import { VehicleTypeCard } from '@/components/ev/VehicleTypeCard';

interface VehicleTypeSelectorProps {
  currentVehicleType?: string;
  className?: string;
}

export function VehicleTypeSelector({ currentVehicleType, className }: VehicleTypeSelectorProps) {
  return (
    <section id="vehicle-selection" className={`scroll-mt-24 ${className || ''}`}>
      <SectionWrapper variant="light" noPadding className="py-12 md:py-16">

        <div className="space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-label text-ev-teal font-mono font-semibold tracking-wider block">
              Vehicle Classification
            </span>
            <h2 className="text-h2 font-bold tracking-tight text-page-nearblack">
              What type of vehicle are you working with?
            </h2>
            <p className="text-sm text-page-midgray leading-relaxed">
              Select your platform architecture to inspect compatible voltages, motor mount footprints, battery enclosures, and harness standards.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {evVehicleTypes.map((vehicle) => (
              <VehicleTypeCard
                key={vehicle.id}
                vehicle={vehicle}
                isSelected={currentVehicleType === vehicle.id || currentVehicleType === vehicle.slug}
              />
            ))}
          </div>
        </div>
      </SectionWrapper>
    </section>
  );
}
