'use client';

import * as React from 'react';
import { SpecGroup } from '@/types';

interface EVSpecificationsProps {
  specGroups: SpecGroup[];
  sku: string;
}

export function EVSpecifications({ specGroups, sku }: EVSpecificationsProps) {
  if (!specGroups || specGroups.length === 0) {
    return (
      <div className="p-6 text-center text-sm text-page-midgray bg-page-offwhite rounded border border-page-lightgray">
        Standard engineering specifications available upon quotation inquiry.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between border-b border-page-lightgray pb-3">
        <h4 className="text-sm font-bold text-page-nearblack uppercase tracking-wider font-mono">
          Engineering Specification Matrix
        </h4>
        <span className="text-xs font-mono text-page-midgray">
          SKU: <strong className="text-page-nearblack">{sku}</strong>
        </span>
      </div>

      <div className="space-y-6">
        {specGroups.map((group, gIdx) => (
          <div key={gIdx} className="space-y-2">
            {group.group && (
              <h5 className="text-xs font-bold text-page-nearblack uppercase font-mono tracking-wider text-ev-teal">
                {group.group}
              </h5>
            )}

            <div className="overflow-x-auto rounded border border-page-lightgray">
              <table className="w-full text-left text-xs border-collapse">
                <tbody className="divide-y divide-page-lightgray/70 font-technical">
                  {group.items.map((item, iIdx) => (
                    <tr
                      key={iIdx}
                      className={iIdx % 2 === 0 ? 'bg-white' : 'bg-page-offwhite/50'}
                    >
                      <td className="py-2.5 px-4 font-mono text-page-midgray w-1/3">
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
    </div>
  );
}
