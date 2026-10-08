'use client';

import * as React from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Container } from '@/components/layout/Container';
import { SectionWrapper } from '@/components/layout/SectionWrapper';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { EVHero } from '@/components/ev/EVHero';
import { VehicleTypeSelector } from '@/components/ev/VehicleTypeSelector';
import { EVProductDiscovery } from '@/components/ev/EVProductDiscovery';
import { EVComponentGrid } from '@/components/ev/EVComponentGrid';
import { EVProductCard } from '@/components/ev/EVProductCard';
import { QuoteModal } from '@/components/garage/QuoteModal';
import { getFeaturedEVProducts } from '@/data/products/ev-parts';
import { Product } from '@/types';
import {
  Zap,
  ArrowRight,
  ShieldCheck,
  Cpu,
  BatteryMedium,
  CheckCircle2,
  FileText,
  Phone,
} from 'lucide-react';

export default function EVPartsLandingPage() {
  const [quoteOpen, setQuoteOpen] = React.useState(false);
  const [selectedProduct, setSelectedProduct] = React.useState<Product | null>(null);

  const featuredProducts = getFeaturedEVProducts(6);

  const handleOpenQuote = (product?: Product) => {
    setSelectedProduct(product || null);
    setQuoteOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-page-offwhite">
      {/* 1. Global Navigation */}
      <Navbar onOpenQuote={() => handleOpenQuote()} />

      <main className="flex-1">
        {/* 2. EV Hero Section */}
        <EVHero onOpenQuote={() => handleOpenQuote()} />

        {/* 3. Vehicle Classification Selector (2-Wheeler vs 3-Wheeler) */}
        <VehicleTypeSelector />

        {/* 4. Interactive 3-Step Guided Product Discovery */}
        <EVProductDiscovery onOpenQuote={handleOpenQuote} />

        {/* 5. All 10 Component Categories Grid */}
        <EVComponentGrid />

        {/* 6. Featured OEM Powertrains & Assemblies */}
        <SectionWrapper variant="light" noPadding className="py-12 md:py-16">
          <div className="space-y-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <span className="text-label text-ev-teal font-mono font-semibold tracking-wider block mb-1">
                  High-Demand Systems
                </span>
                <h2 className="text-h2 font-bold tracking-tight text-page-nearblack">
                  Featured EV Powertrain Components
                </h2>
              </div>

              <Link href="/ev-parts/2-wheeler">
                <Button variant="outline" size="md" className="font-semibold text-xs gap-1.5 hover:border-ev-teal">
                  <span>View All 2W / 3W Catalog</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Button>
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredProducts.map((product) => (
                <EVProductCard
                  key={product.id}
                  product={product}
                  onOpenQuote={handleOpenQuote}
                />
              ))}
            </div>
          </div>
        </SectionWrapper>

        {/* 7. Engineering Standards & Safety Architecture */}
        <SectionWrapper variant="nearblack" noPadding className="py-16 bg-page-nearblack text-white">
          <div className="space-y-12">
            <div className="text-center max-w-3xl mx-auto space-y-3">
              <span className="text-label text-ev-teal font-mono font-semibold tracking-wider block">
                Industrial Reliability
              </span>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white">
                Engineered for High-Cycle Commercial Operation
              </h2>
              <p className="text-sm md:text-base text-page-midgray leading-relaxed">
                Our 2-wheeler and 3-wheeler components are engineered to withstand severe tropical road conditions, high ambient temperatures, and daily commercial cycle demands.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-technical">
              <div className="p-6 rounded-lg bg-page-charcoal border border-page-darkgray space-y-3">
                <div className="w-10 h-10 rounded bg-ev-teal/15 border border-ev-teal/30 flex items-center justify-center text-ev-teal">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <h3 className="text-base font-bold text-white">
                  Intelligent BMS Cell Protection
                </h3>
                <p className="text-xs text-page-midgray leading-relaxed">
                  Active cell balancing, hardware-level overcurrent disconnect, deep-discharge recovery, and dual NTC thermal probes guarding battery lifetime.
                </p>
              </div>

              <div className="p-6 rounded-lg bg-page-charcoal border border-page-darkgray space-y-3">
                <div className="w-10 h-10 rounded bg-ev-teal/15 border border-ev-teal/30 flex items-center justify-center text-ev-teal">
                  <Cpu className="h-5 w-5" />
                </div>
                <h3 className="text-base font-bold text-white">
                  Sinusoidal FOC Vector Control
                </h3>
                <p className="text-xs text-page-midgray leading-relaxed">
                  Field-Oriented Control (FOC) algorithmic switching yields whisper-quiet motor operation, high torque under gradient load, and active regenerative braking.
                </p>
              </div>

              <div className="p-6 rounded-lg bg-page-charcoal border border-page-darkgray space-y-3">
                <div className="w-10 h-10 rounded bg-ev-teal/15 border border-ev-teal/30 flex items-center justify-center text-ev-teal">
                  <Zap className="h-5 w-5" />
                </div>
                <h3 className="text-base font-bold text-white">
                  IP65 / IP67 Weatherproof Sealing
                </h3>
                <p className="text-xs text-page-midgray leading-relaxed">
                  Cast aluminum housings with thermal potting resin and waterproof quick-disconnect Julet connectors prevent mud and water intrusion during monsoons.
                </p>
              </div>
            </div>
          </div>
        </SectionWrapper>

        {/* 8. B2B Quotation Call-to-Action Banner */}
        <section className="bg-white border-t border-page-lightgray py-14">
          <Container>
            <div className="p-8 md:p-12 rounded-lg bg-page-offwhite border border-page-lightgray flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="space-y-3 max-w-2xl text-center md:text-left">
                <Badge variant="ev">Fleet & OEM Procurement</Badge>
                <h3 className="text-2xl md:text-3xl font-extrabold text-page-nearblack tracking-tight">
                  Require Batch Quantities or Custom Powertrain Matching?
                </h3>
                <p className="text-sm text-page-midgray leading-relaxed">
                  Connect directly with PAGE International technical engineers for sample evaluations, wholesale batch pricing tiers, or retrofit workshop setup.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0 w-full md:w-auto">
                <Button
                  variant="ev"
                  size="lg"
                  onClick={() => handleOpenQuote()}
                  className="w-full sm:w-auto font-bold uppercase tracking-wider text-xs px-6 h-12"
                >
                  <span>Request EV Component Quote</span>
                </Button>
                <Link href="/contact" className="w-full sm:w-auto">
                  <Button
                    variant="outline"
                    size="lg"
                    className="w-full font-bold uppercase tracking-wider text-xs px-6 h-12"
                  >
                    <span>Contact Sales</span>
                  </Button>
                </Link>
              </div>
            </div>
          </Container>
        </section>
      </main>

      {/* Global Footer */}
      <Footer />


      {/* Quotation Request Modal */}
      <QuoteModal
        open={quoteOpen}
        onOpenChange={setQuoteOpen}
        product={selectedProduct}
      />
    </div>
  );
}
