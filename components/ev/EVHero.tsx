'use client';

import * as React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Container } from '@/components/layout/Container';
import { Zap, ArrowRight, ShieldCheck, BatteryCharging, Cpu, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';

interface EVHeroProps {
  onOpenQuote?: () => void;
}

export function EVHero({ onOpenQuote }: EVHeroProps) {
  const scrollToDiscovery = () => {
    const el = document.getElementById('vehicle-selection');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative bg-page-nearblack text-white pt-16 pb-20 md:pt-24 md:pb-28 border-b border-page-darkgray overflow-hidden">
      {/* Subtle EV grid and ambient teal accent */}
      <div 
        className="absolute inset-0 opacity-[0.07] pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, #0D7377 1px, transparent 0)',
          backgroundSize: '36px 36px',
        }}
      />
      <div className="absolute -top-32 right-1/4 w-96 h-96 bg-ev-teal/15 rounded-full blur-3xl pointer-events-none" />

      <Container>
        <div className="max-w-4xl mx-auto text-center space-y-6">
          {/* Subtle EV Division Pill */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-ev-teal/15 border border-ev-teal/30 text-ev-tealLight text-xs font-mono font-medium tracking-wide"
          >
            <Zap className="h-3.5 w-3.5 text-ev-teal" />
            <span>PAGE Electric Mobility Division · 2W & 3W Systems</span>
          </motion.div>

          {/* Primary Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white leading-[1.1]"
          >
            EV Parts for the Next Generation of Mobility
          </motion.h1>

          {/* Supporting Text */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg md:text-xl text-page-midgray max-w-2xl mx-auto leading-relaxed"
          >
            Reliable components for 2-wheeler and 3-wheeler electric vehicles. High-efficiency BLDC powertrains, intelligent FOC motor controllers, deep-cycle lithium packs, and commercial fleet charging infrastructure.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Button
              variant="ev"
              size="lg"
              onClick={scrollToDiscovery}
              className="w-full sm:w-auto font-bold uppercase tracking-wider text-xs px-8 h-12 gap-2 shadow-lg hover:shadow-ev-teal/20"
            >
              <span>Explore EV Parts</span>
              <ArrowRight className="h-4 w-4" />
            </Button>

            <Button
              variant="outline"
              size="lg"
              onClick={() => onOpenQuote && onOpenQuote()}
              className="w-full sm:w-auto border-page-darkgray text-white hover:bg-page-charcoal hover:border-page-midgray font-bold uppercase tracking-wider text-xs px-8 h-12"
            >
              <span>Request a Quote</span>
            </Button>
          </motion.div>

          {/* Technical Quality Ribbons */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="pt-12 border-t border-page-darkgray/80 grid grid-cols-2 sm:grid-cols-4 gap-4 text-left max-w-3xl mx-auto font-technical"
          >
            <div className="p-3 rounded bg-page-charcoal/60 border border-page-darkgray/60 space-y-1">
              <span className="text-[10px] font-mono uppercase text-ev-teal block">Vehicle Standards</span>
              <span className="text-xs font-bold text-white block">2-Wheeler & 3-Wheeler</span>
            </div>
            <div className="p-3 rounded bg-page-charcoal/60 border border-page-darkgray/60 space-y-1">
              <span className="text-[10px] font-mono uppercase text-ev-teal block">Voltage Tiers</span>
              <span className="text-xs font-bold text-white block">36V · 48V · 60V · 72V</span>
            </div>
            <div className="p-3 rounded bg-page-charcoal/60 border border-page-darkgray/60 space-y-1">
              <span className="text-[10px] font-mono uppercase text-ev-teal block">Battery Chemistries</span>
              <span className="text-xs font-bold text-white block">Li-ion NMC & LiFePO4</span>
            </div>
            <div className="p-3 rounded bg-page-charcoal/60 border border-page-darkgray/60 space-y-1">
              <span className="text-[10px] font-mono uppercase text-ev-teal block">B2B Procurement</span>
              <span className="text-xs font-bold text-white block">OEM & Fleet Bulk Supply</span>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
