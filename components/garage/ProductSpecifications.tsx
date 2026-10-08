'use client';

import * as React from 'react';
import { SpecGroup, SpecItem } from '@/types';
import { Info } from 'lucide-react';

interface ProductSpecificationsProps {
  specGroups?: SpecGroup[];
  keySpecs?: SpecItem[];
}

export function ProductSpecifications({ specGroups, keySpecs }: ProductSpecificationsProps) {
  // If specGroups are provided, display them grouped; otherwise fallback to keySpecs table
  const hasGroups = specGroups && specGroups.length > 0;

  return (
    <div className="space-y-8">
      {/* Disclaimer banner */}
      <div className="p-3 bg-page-offwhite rounded-md border border-page-lightgray flex items-start gap-2.5 text-xs text-page-midgray font-mono">
        <Info className="h-4 w-4 text-page-red shrink-0 mt-0.5" />
        <span>
          PROTOTYPE TECHNICAL NOTICE: Specifications listed represent engineering catalog prototypes for quotation and layout sizing. Certified tolerance drawings are supplied upon official commercial contract.
        </span>
      </div>

      {hasGroups ? (
        <div className="space-y-6">
          {specGroups.map((group, gIdx) => (
            <div key={gIdx} className="space-y-3">
              {group.group && (
                <h4 className="text-xs font-bold font-mono uppercase tracking-wider text-page-nearblack border-b border-page-lightgray pb-2">
                  {group.group}
                </h4>
              )}

              <div className="border border-page-lightgray rounded-md overflow-hidden">
                <table className="w-full text-left text-xs font-technical">
                  <thead className="bg-page-offwhite border-b border-page-lightgray text-[11px] uppercase font-mono text-page-midgray">
                    <tr>
                      <th className="py-2.5 px-4 font-semibold w-1/2">Technical Specification</th>
                      <th className="py-2.5 px-4 font-semibold w-1/2">Engineered Value</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-page-lightgray/70">
                    {group.items.map((item, iIdx) => (
                      <tr
                        key={iIdx}
                        className={iIdx % 2 === 0 ? 'bg-white' : 'bg-page-offwhite/40'}
                      >
                        <td className="py-2.5 px-4 font-medium text-page-nearblack">
                          {item.label}
                        </td>
                        <td className="py-2.5 px-4 font-bold text-page-nearblack">
                          {item.value} {item.unit || ''}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="border border-page-lightgray rounded-md overflow-hidden">
          <table className="w-full text-left text-xs font-technical">
            <thead className="bg-page-offwhite border-b border-page-lightgray text-[11px] uppercase font-mono text-page-midgray">
              <tr>
                <th className="py-2.5 px-4 font-semibold w-1/2">Specification</th>
                <th className="py-2.5 px-4 font-semibold w-1/2">Value</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-page-lightgray">
              {keySpecs?.map((item, idx) => (
                <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-page-offwhite/50'}>
                  <td className="py-2.5 px-4 font-medium text-page-nearblack">{item.label}</td>
                  <td className="py-2.5 px-4 font-bold text-page-nearblack">
                    {item.value} {item.unit || ''}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
