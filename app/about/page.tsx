'use client';

import * as React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Container } from '@/components/layout/Container';
import { SectionWrapper } from '@/components/layout/SectionWrapper';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { QuoteModal } from '@/components/garage/QuoteModal';
import {
  Wrench,
  Zap,
  Building2,
  Settings,
  ShieldCheck,
  ChevronRight,
  ArrowRight,
  CheckCircle2,
  Compass,
} from 'lucide-react';

export default function AboutPage() {
  const [quoteOpen, setQuoteOpen] = React.useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-page-offwhite">
      {/* 1. Global Navigation */}
      <Navbar onOpenQuote={() => setQuoteOpen(true)} />

      <main className="flex-1">
        {/* 2. Hero Section */}
        <section className="bg-page-nearblack text-white pt-16 pb-20 md:pt-24 md:pb-28 border-b border-page-darkgray relative overflow-hidden">
          <Container>
            <div className="max-w-4xl mx-auto text-center space-y-6">
              <nav aria-label="Breadcrumb" className="inline-flex items-center gap-2 text-xs font-mono text-page-midgray mb-2">
                <Link href="/" className="hover:text-white transition-colors">
                  Home
                </Link>
                <ChevronRight className="h-3.5 w-3.5" />
                <span className="text-white font-semibold">About Us</span>
              </nav>

              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-page-charcoal border border-page-darkgray text-page-lightgray text-xs font-mono">
                <Building2 className="h-3.5 w-3.5 text-page-red" />
                <span>Automotive Workshop Infrastructure & Electric Mobility</span>
              </div>

              <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white leading-[1.1]">
                Engineering Modern Automotive Infrastructure
              </h1>

              <p className="text-lg md:text-xl text-page-midgray max-w-2xl mx-auto leading-relaxed">
                PAGE International bridges professional workshop machinery, turnkey facility engineering, and emerging electric vehicle components to empower modern automotive service centers.
              </p>
            </div>
          </Container>
        </section>

        {/* 3. Company Introduction & Mission */}
        <SectionWrapper variant="light" noPadding className="py-16 md:py-20">
          <div className="max-w-4xl mx-auto space-y-12">
            <div className="space-y-4 text-center">
              <span className="text-label text-page-red font-mono font-semibold tracking-wider block">
                Company Overview
              </span>
              <h2 className="text-h2 font-bold tracking-tight text-page-nearblack">
                Comprehensive Solutions for Automotive Excellence
              </h2>
              <p className="text-sm md:text-base text-page-midgray leading-relaxed text-left pt-2">
                As automotive engineering and vehicle powertrains rapidly evolve, service workshops face increasing technical complexity. Modern vehicles require precise computerized 3D alignment, OEM-level bi-directional diagnostic scanners, calibrated ADAS target frames, and safety protocols for high-voltage electric mobility.
              </p>
              <p className="text-sm md:text-base text-page-midgray leading-relaxed text-left">
                PAGE International serves automotive workshops, fleet depots, and commercial transit operators as a specialized equipment provider, technical advisor, and component supplier.
              </p>
            </div>

            {/* Core Pillars */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
              {/* Pillar 1: Garage Equipment */}
              <div className="p-8 rounded-lg bg-white border border-page-lightgray space-y-4 shadow-xs">
                <div className="w-12 h-12 rounded bg-page-red/10 border border-page-red/20 flex items-center justify-center text-page-red">
                  <Wrench className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold text-page-nearblack">
                  Garage Equipment Division
                </h3>
                <p className="text-xs text-page-midgray leading-relaxed">
                  Supplying certified heavy-duty lifting hoists, computerized 3D wheel alignment platforms, automatic tyre changers, dynamic wheel balancers, and multi-brand diagnostic tools from established global manufacturers.
                </p>
                <Link
                  href="/garage-equipment"
                  className="text-xs font-mono font-bold text-page-red hover:underline inline-flex items-center gap-1 pt-2"
                >
                  <span>Explore Garage Equipment</span>
                  <ArrowRight className="h-3 w-3" />
                </Link>
              </div>

              {/* Pillar 2: EV Parts */}
              <div className="p-8 rounded-lg bg-white border border-page-lightgray space-y-4 shadow-xs">
                <div className="w-12 h-12 rounded bg-ev-teal/10 border border-ev-teal/20 flex items-center justify-center text-ev-teal">
                  <Zap className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold text-page-nearblack">
                  EV Parts & Powertrains Division
                </h3>
                <p className="text-xs text-page-midgray leading-relaxed">
                  Dedicated component division supplying high-efficiency BLDC motors, sinusoidal vector controllers, certified lithium battery packs, and intelligent charging infrastructure for 2-wheeler and 3-wheeler mobility.
                </p>
                <Link
                  href="/ev-parts"
                  className="text-xs font-mono font-bold text-ev-teal hover:underline inline-flex items-center gap-1 pt-2"
                >
                  <span>Explore EV Parts</span>
                  <ArrowRight className="h-3 w-3" />
                </Link>
              </div>

              {/* Pillar 3: Workshop Solutions */}
              <div className="p-8 rounded-lg bg-white border border-page-lightgray space-y-4 shadow-xs">
                <div className="w-12 h-12 rounded bg-page-offwhite border border-page-lightgray flex items-center justify-center text-page-nearblack">
                  <Compass className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold text-page-nearblack">
                  Turnkey Workshop Solutions
                </h3>
                <p className="text-xs text-page-midgray leading-relaxed">
                  End-to-end facility engineering covering architectural bay design, concrete slab load analysis, compressed air loop routing, certified equipment commissioning, and technician operational training.
                </p>
                <Link
                  href="/solutions"
                  className="text-xs font-mono font-bold text-page-red hover:underline inline-flex items-center gap-1 pt-2"
                >
                  <span>Explore Solutions</span>
                  <ArrowRight className="h-3 w-3" />
                </Link>
              </div>

              {/* Pillar 4: Technical Services */}
              <div className="p-8 rounded-lg bg-white border border-page-lightgray space-y-4 shadow-xs">
                <div className="w-12 h-12 rounded bg-page-offwhite border border-page-lightgray flex items-center justify-center text-page-nearblack">
                  <Settings className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold text-page-nearblack">
                  Technical Services & SLA
                </h3>
                <p className="text-xs text-page-midgray leading-relaxed">
                  Responsive field service engineering, preventive maintenance schedules, genuine spare parts inventory, and warranty execution to ensure continuous equipment uptime and workshop profitability.
                </p>
                <Link
                  href="/services"
                  className="text-xs font-mono font-bold text-page-red hover:underline inline-flex items-center gap-1 pt-2"
                >
                  <span>Explore Services</span>
                  <ArrowRight className="h-3 w-3" />
                </Link>
              </div>
            </div>
          </div>
        </SectionWrapper>

        {/* 4. Engineering Focus Section */}
        <SectionWrapper variant="nearblack" noPadding className="py-16 text-white bg-page-nearblack">
          <div className="max-w-4xl mx-auto space-y-8 text-center">
            <span className="text-label text-page-red font-mono font-semibold tracking-wider block">
              Core Principles
            </span>
            <h2 className="text-3xl font-bold tracking-tight text-white">
              Engineering Rigor & Practical Partnership
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-left font-technical pt-4">
              <div className="p-6 rounded bg-page-charcoal border border-page-darkgray space-y-2">
                <h4 className="text-sm font-bold text-white">Technical Accuracy</h4>
                <p className="text-xs text-page-midgray leading-relaxed">
                  Every product recommendation is backed by dimensional load ratings, voltage match analysis, and compatibility checks.
                </p>
              </div>
              <div className="p-6 rounded bg-page-charcoal border border-page-darkgray space-y-2">
                <h4 className="text-sm font-bold text-white">Genuine Quality</h4>
                <p className="text-xs text-page-midgray leading-relaxed">
                  We supply verifiable machinery and components from recognized manufacturers, ensuring reliable workshop safety.
                </p>
              </div>
              <div className="p-6 rounded bg-page-charcoal border border-page-darkgray space-y-2">
                <h4 className="text-sm font-bold text-white">Long-Term Support</h4>
                <p className="text-xs text-page-midgray leading-relaxed">
                  We stand behind our installations with available genuine spare parts, operator training, and field support.
                </p>
              </div>
            </div>
          </div>
        </SectionWrapper>
      </main>

      {/* Global Footer */}
      <Footer />

      {/* Quote Modal */}
      <QuoteModal
        open={quoteOpen}
        onOpenChange={setQuoteOpen}
      />
    </div>
  );
}
