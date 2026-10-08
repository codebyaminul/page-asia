'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { navigationItems } from '@/data/navigation';
import { Sheet, SheetHeader, SheetClose } from '@/components/ui/sheet';
import { Logo } from '@/components/ui/Logo';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ChevronDown, Search, ArrowRight, PhoneCall, Zap, Wrench } from 'lucide-react';
import { cn } from '@/lib/utils';
import { AnimatePresence, motion } from 'framer-motion';

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenQuoteModal?: () => void;
}

export function MobileNav({ isOpen, onClose, onOpenQuoteModal }: MobileNavProps) {
  const pathname = usePathname();
  const [openAccordions, setOpenAccordions] = React.useState<Record<string, boolean>>({
    'Garage Equipment': true,
  });
  const [searchQuery, setSearchQuery] = React.useState('');

  const toggleAccordion = (label: string) => {
    setOpenAccordions((prev) => ({
      ...prev,
      [label]: !prev[label],
    }));
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose} side="left">
      <SheetHeader className="bg-page-nearblack">
        <Logo theme="dark" />
        <SheetClose onClick={onClose} />
      </SheetHeader>

      {/* Search Input */}
      <div className="p-4 border-b border-page-darkgray bg-page-nearblack">
        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-page-midgray" />
          <Input
            type="text"
            placeholder="Search equipment, EV parts, SKUs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 bg-page-charcoal border-page-darkgray text-white placeholder:text-page-midgray focus-visible:border-page-red"
          />
        </div>
      </div>

      {/* Scrollable Nav List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-2 divide-y divide-page-darkgray/50">
        {navigationItems.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
          const isAccordionOpen = !!openAccordions[item.label];
          const isEV = item.megaMenuVariant === 'ev';

          if (item.hasMegaMenu && item.megaMenuGroups) {
            return (
              <div key={item.label} className="pt-2 first:pt-0">
                <button
                  onClick={() => toggleAccordion(item.label)}
                  className={cn(
                    'w-full flex items-center justify-between py-3 px-2 text-base font-bold transition-colors rounded-sm text-left',
                    isActive
                      ? isEV ? 'text-ev-teal' : 'text-page-red'
                      : 'text-white hover:text-page-lightgray'
                  )}
                >
                  <span className="flex items-center gap-2">
                    {isEV ? <Zap className="h-4 w-4 text-ev-teal" /> : <Wrench className="h-4 w-4 text-page-red" />}
                    {item.label}
                  </span>
                  <ChevronDown
                    className={cn(
                      'h-4 w-4 transition-transform duration-200 text-page-midgray',
                      isAccordionOpen && 'rotate-180'
                    )}
                  />
                </button>

                <AnimatePresence initial={false}>
                  {isAccordionOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden pl-4 pr-1 py-1 space-y-3"
                    >
                      {item.megaMenuGroups.map((group, gIdx) => (
                        <div key={gIdx} className="space-y-1">
                          <span className="text-[11px] font-bold uppercase tracking-wider text-page-midgray block pt-1">
                            {group.heading}
                          </span>
                          <div className="space-y-1 pl-1">
                            {group.items.map((subItem) => (
                              <Link
                                key={subItem.href}
                                href={subItem.href}
                                onClick={onClose}
                                className={cn(
                                  'block py-1.5 text-sm transition-colors',
                                  pathname === subItem.href
                                    ? isEV ? 'text-ev-teal font-semibold' : 'text-page-red font-semibold'
                                    : 'text-page-lightgray hover:text-white'
                                )}
                              >
                                {subItem.label}
                              </Link>
                            ))}
                          </div>
                        </div>
                      ))}
                      <div className="pt-2">
                        <Link
                          href={item.href}
                          onClick={onClose}
                          className={cn(
                            'inline-flex items-center gap-1 text-xs font-bold',
                            isEV ? 'text-ev-teal' : 'text-page-red'
                          )}
                        >
                          <span>Explore All {item.label}</span>
                          <ArrowRight className="h-3 w-3" />
                        </Link>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          }

          return (
            <div key={item.label} className="pt-2 first:pt-0">
              <Link
                href={item.href}
                onClick={onClose}
                className={cn(
                  'block py-3 px-2 text-base font-bold transition-colors rounded-sm',
                  isActive ? 'text-page-red' : 'text-white hover:text-page-lightgray'
                )}
              >
                {item.label}
              </Link>
            </div>
          );
        })}

        {/* Quick Contact Info In Drawer */}
        <div className="pt-6 mt-6 border-t border-page-darkgray text-xs text-page-midgray space-y-2 px-2">
          <div className="flex items-center gap-2 text-page-lightgray">
            <PhoneCall className="h-3.5 w-3.5 text-page-red" />
            <span>Direct Inquiry Support Available</span>
          </div>
          <p className="text-[11px]">
            PAGE International Ltd. — Dhaka, Bangladesh
          </p>
        </div>
      </div>

      {/* Sticky Bottom Quote CTA */}
      <div className="p-4 bg-page-nearblack border-t border-page-darkgray shrink-0">
        <Button
          variant="primary"
          size="lg"
          className="w-full flex items-center justify-center gap-2 font-bold uppercase tracking-wider text-sm"
          onClick={() => {
            onClose();
            if (onOpenQuoteModal) onOpenQuoteModal();
          }}
        >
          <span>Request a Quote</span>
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </Sheet>
  );
}
