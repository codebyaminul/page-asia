'use client';

import * as React from 'react';
import Link from 'next/link';
import { NavItem } from '@/types';
import { cn } from '@/lib/utils';
import { ArrowRight, Wrench, Zap, ChevronRight, Bike } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { megaMenuVariants } from '@/lib/animations';

interface MegaMenuProps {
  item: NavItem;
  isOpen: boolean;
  onClose: () => void;
}

export function MegaMenu({ item, isOpen, onClose }: MegaMenuProps) {
  if (!item.hasMegaMenu || !item.megaMenuGroups) return null;

  const garageGroup = item.megaMenuGroups[0];
  const evGroup = item.megaMenuGroups[1];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          variants={megaMenuVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          className="absolute left-0 right-0 top-full z-50 w-full bg-page-nearblack border-t border-b border-page-darkgray shadow-2xl"
          onMouseLeave={onClose}
        >
          {/* Accent top border strip: red on left for Garage, teal on right for EV */}
          <div className="grid grid-cols-2 h-[2px] w-full">
            <div className="bg-page-red" />
            <div className="bg-ev-teal" />
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 divide-y lg:divide-y-0 lg:divide-x divide-page-darkgray">
              {/* ── LEFT: Garage Equipment (col-span-6) ── */}
              <div className="lg:col-span-6 lg:pr-8 space-y-4">
                <div className="flex items-center justify-between border-b border-page-darkgray pb-3">
                  <div className="flex items-center gap-2">
                    <Wrench className="h-4 w-4 text-page-red" />
                    <span className="text-xs font-bold uppercase tracking-wider text-white">
                      Garage Equipment Division
                    </span>
                  </div>
                  <Link
                    href="/garage-equipment"
                    onClick={onClose}
                    className="text-xs font-semibold text-page-red hover:underline inline-flex items-center gap-1"
                  >
                    <span>All Equipment</span>
                    <ArrowRight className="h-3 w-3" />
                  </Link>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-1">
                  {garageGroup?.items.map((subItem) => (
                    <Link
                      key={subItem.href}
                      href={subItem.href}
                      onClick={onClose}
                      className="group flex flex-col p-2.5 rounded hover:bg-page-charcoal transition-colors border border-transparent hover:border-page-darkgray"
                    >
                      <span className="text-xs font-bold text-white group-hover:text-page-red transition-colors flex items-center justify-between">
                        <span>{subItem.label}</span>
                        <ChevronRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity text-page-red" />
                      </span>
                      {subItem.description && (
                        <span className="text-[11px] text-page-midgray mt-0.5 line-clamp-1">
                          {subItem.description}
                        </span>
                      )}
                    </Link>
                  ))}
                </div>

                <div className="pt-2 text-[11px] text-page-midgray font-mono border-t border-page-darkgray flex items-center justify-between">
                  <span>Featured Brands: LAUNCH · ATS Elgi · SmartSafe · WIPRO</span>
                  <Link href="/garage-equipment/all" onClick={onClose} className="text-white hover:underline">
                    View 17 Models →
                  </Link>
                </div>
              </div>

              {/* ── RIGHT: EV Parts Division (col-span-6) ── */}
              <div className="lg:col-span-6 lg:pl-8 pt-6 lg:pt-0 space-y-4">
                <div className="flex items-center justify-between border-b border-page-darkgray pb-3">
                  <div className="flex items-center gap-2">
                    <Zap className="h-4 w-4 text-ev-teal" />
                    <span className="text-xs font-bold uppercase tracking-wider text-white">
                      EV Parts & Powertrains
                    </span>
                  </div>
                  <Link
                    href="/ev-parts"
                    onClick={onClose}
                    className="text-xs font-semibold text-ev-teal hover:underline inline-flex items-center gap-1"
                  >
                    <span>EV Parts Hub</span>
                    <ArrowRight className="h-3 w-3" />
                  </Link>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-1">
                  {evGroup?.items.map((subItem) => (
                    <Link
                      key={subItem.href}
                      href={subItem.href}
                      onClick={onClose}
                      className="group flex flex-col p-2.5 rounded hover:bg-page-charcoal transition-colors border border-transparent hover:border-page-darkgray"
                    >
                      <span className="text-xs font-bold text-white group-hover:text-ev-teal transition-colors flex items-center justify-between">
                        <span>{subItem.label}</span>
                        <ChevronRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity text-ev-teal" />
                      </span>
                      {subItem.description && (
                        <span className="text-[11px] text-page-midgray mt-0.5 line-clamp-1">
                          {subItem.description}
                        </span>
                      )}
                    </Link>
                  ))}
                </div>

                <div className="pt-2 text-[11px] text-page-midgray font-mono border-t border-page-darkgray flex items-center justify-between">
                  <span>Vehicles: 2-Wheeler (Bikes/Scooters) & 3-Wheeler (Rickshaws)</span>
                  <Link href="/ev-parts" onClick={onClose} className="text-ev-teal hover:underline">
                    EV Component Discovery →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
