'use client';

import * as React from 'react';
import { Product } from '@/types';
import { Badge } from '@/components/ui/badge';
import { Info, CheckCircle2, AlertTriangle, Bike, Truck } from 'lucide-react';

interface EVCompatibilityProps {
  product: Product;
}

export function EVCompatibility({ product }: EVCompatibilityProps) {
  const is2W = product.vehicleCompatibility?.includes('2-wheeler') || product.vehicleCompatibility?.includes('both');
  const is3W = product.vehicleCompatibility?.includes('3-wheeler') || product.vehicleCompatibility?.includes('both');

  return (
    <div className="space-y-6">
      {/* Disclaimer / Notice */}
      <div className="p-4 rounded-md bg-page-offwhite border border-page-lightgray flex items-start gap-3">
        <Info className="h-5 w-5 text-ev-teal shrink-0 mt-0.5" />
        <div className="text-xs text-page-midgray leading-relaxed space-y-1">
          <div className="font-bold text-page-nearblack font-mono uppercase tracking-wider text-[11px]">
            Prototype Specification & Sample Compatibility Data
          </div>
          <p>
            The vehicle compatibility matrices, electrical values, and chassis mounting specs listed below represent sample engineering targets for prototype demonstration. Final OEM integration requires technical review of your specific vehicle controller wiring harness and physical dropout tolerances.
          </p>
        </div>
      </div>

      {/* Summary Matrix Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 font-technical">
        <div className="p-4 rounded bg-white border border-page-lightgray space-y-1">
          <span className="text-[10px] font-mono uppercase text-page-midgray block">
            Vehicle Platform
          </span>
          <div className="flex items-center gap-2 font-bold text-sm text-page-nearblack">
            {is2W && is3W ? (
              <span>2-Wheeler & 3-Wheeler</span>
            ) : is3W ? (
              <span>3-Wheeler Commercial</span>
            ) : (
              <span>2-Wheeler Mobility</span>
            )}
          </div>
        </div>

        <div className="p-4 rounded bg-white border border-page-lightgray space-y-1">
          <span className="text-[10px] font-mono uppercase text-page-midgray block">
            Component System
          </span>
          <div className="font-bold text-sm text-page-nearblack capitalize">
            {product.category.replace(/-/g, ' ')}
          </div>
        </div>

        <div className="p-4 rounded bg-white border border-page-lightgray space-y-1">
          <span className="text-[10px] font-mono uppercase text-page-midgray block">
            Operating Voltage
          </span>
          <div className="font-bold text-sm text-ev-teal">
            {product.keySpecs?.find((s) => s.label.toLowerCase().includes('volt'))?.value ||
             product.keySpecs?.find((s) => s.label.toLowerCase().includes('voltage'))?.value ||
             '36V / 48V / 60V'} {product.keySpecs?.find((s) => s.label.toLowerCase().includes('volt'))?.unit || 'V DC'}
          </div>
        </div>

        <div className="p-4 rounded bg-white border border-page-lightgray space-y-1">
          <span className="text-[10px] font-mono uppercase text-page-midgray block">
            Rating / Capacity
          </span>
          <div className="font-bold text-sm text-page-nearblack">
            {product.keySpecs?.[0]?.value} {product.keySpecs?.[0]?.unit || ''}
          </div>
        </div>
      </div>

      {/* Compatibility Table */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h4 className="text-sm font-bold text-page-nearblack uppercase tracking-wider font-mono">
            Sample Chassis & Powertrain Matching
          </h4>
          <span className="text-[11px] font-mono text-page-midgray">
            Status: Sample Prototype Data
          </span>
        </div>

        {product.compatibilityTable && product.compatibilityTable.length > 0 ? (
          <div className="overflow-x-auto rounded border border-page-lightgray">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-page-offwhite border-b border-page-lightgray text-[11px] font-mono uppercase tracking-wider text-page-midgray">
                  <th className="py-2.5 px-4 font-semibold">Vehicle Class</th>
                  <th className="py-2.5 px-4 font-semibold">Platform / Make</th>
                  <th className="py-2.5 px-4 font-semibold">Chassis / Model Application</th>
                  <th className="py-2.5 px-4 font-semibold">Integration Guidance</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-page-lightgray font-technical">
                {product.compatibilityTable.map((entry, idx) => (
                  <tr key={idx} className="hover:bg-page-offwhite/50 transition-colors">
                    <td className="py-3 px-4 font-bold capitalize text-page-nearblack">
                      <span className="inline-flex items-center gap-1.5">
                        {entry.vehicleType === '3-wheeler' ? (
                          <Truck className="h-3.5 w-3.5 text-ev-teal" />
                        ) : (
                          <Bike className="h-3.5 w-3.5 text-ev-teal" />
                        )}
                        <span>{entry.vehicleType}</span>
                      </span>
                    </td>
                    <td className="py-3 px-4 text-page-charcoal font-medium">
                      {entry.make}
                    </td>
                    <td className="py-3 px-4 text-page-nearblack font-semibold">
                      {entry.model}
                    </td>
                    <td className="py-3 px-4 text-page-midgray">
                      {entry.notes || 'Standard plug-and-play fitment'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-4 rounded border border-page-lightgray bg-white text-xs text-page-midgray">
            Standard universal mounting specification for standard 2-wheeler or 3-wheeler chassis. Verify axle dropouts and connector pinouts prior to commissioning.
          </div>
        )}
      </div>
    </div>
  );
}
