'use client';

import * as React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/layout/Container';
import { brands } from '@/data/brands';
import { ArrowRight, Wrench, Shield, CheckCircle2 } from 'lucide-react';

interface GarageHeroProps {
  onOpenQuote?: () => void;
}

export function GarageHero({ onOpenQuote }: GarageHeroProps) {
  return (
    <section className="relative bg-page-nearblack text-white pt-20 pb-24 md:pt-28 md:pb-32 overflow-hidden border-b border-page-darkgray">
      {/* Background Architectural Grid Overlay */}
      <div
        className="absolute inset-0 opacity-[0.035] pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(#FFF 1px, transparent 1px), linear-gradient(90deg, #FFF 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      {/* Subtle radial ambient glow behind text */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-page-red/5 blur-[120px] pointer-events-none rounded-full" />

      <Container>
        <div className="max-w-4xl mx-auto text-center space-y-6">
          {/* Eyebrow Pill */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-page-charcoal border border-page-darkgray rounded-xs text-xs font-mono text-page-lightgray">
            <span className="w-2 h-2 rounded-full bg-page-red animate-pulse" />
            <span>COMMERCIAL WORKSHOP & SERVICE INFRASTRUCTURE</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-hero font-extrabold tracking-tight leading-[1.05] text-white">
            Professional Garage Equipment{' '}
            <span className="text-page-red">for Modern Workshops</span>
          </h1>

          {/* Supporting Copy */}
          <p className="text-body-lg text-page-lightgray/80 max-w-2xl mx-auto leading-relaxed">
            PAGE International delivers heavy-duty lifting, computerized 3D wheel alignment, OEM diagnostics, and comprehensive equipment solutions for automotive service centers and dealership networks.
          </p>

          {/* Primary & Secondary Actions */}
          <div className="pt-4 flex flex-wrap justify-center items-center gap-4">
            <Link href="/garage-equipment/all">
              <Button
                variant="primary"
                size="lg"
                className="font-bold uppercase tracking-wider text-xs gap-2 px-8 h-12 shadow-md"
              >
                <span>Explore Equipment</span>
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>

            <Button
              variant="outlineDark"
              size="lg"
              onClick={onOpenQuote}
              className="font-bold uppercase tracking-wider text-xs px-8 h-12"
            >
              <span>Request a Quote</span>
            </Button>
          </div>

          {/* Trust Highlights */}
          <div className="pt-10 border-t border-page-darkgray/80 grid grid-cols-2 sm:grid-cols-4 gap-4 text-left max-w-3xl mx-auto text-xs font-mono text-page-lightgray">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-page-red shrink-0" />
              <span>Heavy Commercial Grade</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-page-red shrink-0" />
              <span>Full OEM Diagnostic Depth</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-page-red shrink-0" />
              <span>Civil & Electrical Support</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-page-red shrink-0" />
              <span>Genuine Spare Parts</span>
            </div>
          </div>

          {/* Authorized Partners Ribbon */}
          <div className="pt-6">
            <span className="text-[11px] font-mono uppercase tracking-widest text-page-midgray block mb-3">
              Authorized Distribution Partners:
            </span>
            <div className="flex flex-wrap items-center justify-center gap-2.5">
              {brands.map((b) => (
                <span
                  key={b.id}
                  className="px-3 py-1 bg-page-charcoal border border-page-darkgray text-white font-mono text-xs font-bold tracking-wider rounded-xs"
                >
                  {b.name}
                </span>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
