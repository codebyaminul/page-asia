'use client';

import * as React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, CheckCircle2, Zap } from 'lucide-react';
import { EVVehicleType } from '@/data/ev-vehicle-types';

interface VehicleTypeCardProps {
  vehicle: EVVehicleType;
  isSelected?: boolean;
}

export function VehicleTypeCard({ vehicle, isSelected }: VehicleTypeCardProps) {
  const targetHref = `/ev-parts/${vehicle.slug}`;

  return (
    <div
      className={`group relative flex flex-col justify-between rounded-lg bg-white border-2 transition-all duration-300 overflow-hidden shadow-xs hover:shadow-md ${
        isSelected
          ? 'border-ev-teal ring-2 ring-ev-teal/20'
          : 'border-page-lightgray hover:border-ev-teal/80'
      }`}
    >
      <div>
        {/* Top Visual Imagery */}
        <div className="relative aspect-16/9 w-full bg-page-nearblack overflow-hidden border-b border-page-lightgray">
          <Image
            src={vehicle.image}
            alt={vehicle.name}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-page-nearblack/90 via-page-nearblack/40 to-transparent" />

          {/* Badges on overlay */}
          <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-mono font-bold tracking-wider bg-ev-teal text-white rounded-xs">
              <Zap className="h-3 w-3" />
              {vehicle.badge}
            </span>
            <span className="px-2 py-0.5 text-[11px] font-mono bg-black/80 text-white rounded-xs border border-page-darkgray">
              {vehicle.voltageStandards.join(' · ')}
            </span>
          </div>

          {/* Title on bottom of media */}
          <div className="absolute bottom-4 left-4 right-4">
            <h3 className="text-2xl md:text-3xl font-extrabold text-white group-hover:text-ev-tealLight transition-colors">
              {vehicle.name}
            </h3>
            <p className="text-xs text-page-lightgray font-medium mt-0.5">
              {vehicle.subtitle}
            </p>
          </div>
        </div>

        {/* Card Body */}
        <div className="p-6 md:p-8 space-y-5">
          <p className="text-sm text-page-midgray leading-relaxed">
            {vehicle.description}
          </p>

          {/* Key Applications */}
          <div className="space-y-2 pt-2 border-t border-page-lightgray/60">
            <span className="text-[11px] font-mono uppercase tracking-wider text-page-nearblack font-semibold block">
              Typical Fleet Applications:
            </span>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-page-charcoal">
              {vehicle.applications.map((app, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-ev-teal shrink-0 mt-0.5" />
                  <span>{app}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Typical Component Highlights */}
          <div className="pt-2 border-t border-page-lightgray/60">
            <span className="text-[11px] font-mono uppercase tracking-wider text-page-midgray block mb-2">
              Primary Powertrain Assemblies:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {vehicle.commonComponents.map((comp, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 bg-page-offwhite rounded text-[11px] font-mono text-page-charcoal border border-page-lightgray/80"
                >
                  {comp}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Card Action */}
      <div className="p-6 md:p-8 pt-0">
        <Link href={targetHref} className="block w-full">
          <Button
            variant="ev"
            size="lg"
            className="w-full font-bold uppercase tracking-wider text-xs h-12 gap-2 shadow-xs group-hover:bg-ev-tealDark"
          >
            <span>Explore {vehicle.name} Parts</span>
            <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
      </div>
    </div>
  );
}
