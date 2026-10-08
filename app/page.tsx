'use client';

import * as React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Container } from '@/components/layout/Container';
import { SectionWrapper } from '@/components/layout/SectionWrapper';
import { ProductCard } from '@/components/garage/ProductCard';
import { QuoteModal } from '@/components/garage/QuoteModal';
import { garageCategories } from '@/data/categories';
import { getFeaturedGarageProducts } from '@/data/products/garage-equipment';
import { brands } from '@/data/brands';
import { workshopSolutions } from '@/data/workshop-solutions';
import { services } from '@/data/services';
import { Product } from '@/types';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  ArrowRight,
  Wrench,
  Zap,
  CheckCircle2,
  Shield,
  Building2,
  PhoneCall,
  ChevronRight,
  TrendingUp,
  Cpu,
  Bike,
} from 'lucide-react';

export default function HomePage() {
  const [isQuoteOpen, setIsQuoteOpen] = React.useState(false);
  const [selectedProduct, setSelectedProduct] = React.useState<Product | null>(null);

  const featuredGarage = getFeaturedGarageProducts(4);

  const handleOpenQuote = (product?: Product) => {
    setSelectedProduct(product || null);
    setIsQuoteOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-page-nearblack">
      {/* 1. Global Navigation */}
      <Navbar onOpenQuoteModal={() => handleOpenQuote()} />

      <main className="flex-1">
        {/* 2. Hero Section: Dual-Ecosystem Presentation */}
        <section className="relative bg-page-nearblack text-white pt-20 pb-24 md:pt-28 md:pb-32 overflow-hidden border-b border-page-darkgray">
          {/* Subtle industrial architectural grid */}
          <div
            className="absolute inset-0 opacity-[0.035] pointer-events-none"
            style={{
              backgroundImage:
                'linear-gradient(#FFF 1px, transparent 1px), linear-gradient(90deg, #FFF 1px, transparent 1px)',
              backgroundSize: '40px 40px',
            }}
          />

          {/* Ambient red & teal subtle glow */}
          <div className="absolute top-1/3 left-1/4 w-[450px] h-[300px] bg-page-red/5 blur-[120px] pointer-events-none rounded-full" />
          <div className="absolute top-1/3 right-1/4 w-[450px] h-[300px] bg-ev-teal/5 blur-[120px] pointer-events-none rounded-full" />

          <Container>
            <div className="max-w-4xl mx-auto text-center space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-page-charcoal border border-page-darkgray rounded-xs text-xs font-mono text-page-lightgray">
                <span className="w-2 h-2 rounded-full bg-page-red animate-pulse" />
                <span>PAGE INTERNATIONAL · DHAKA, BANGLADESH</span>
              </div>

              <h1 className="text-hero font-extrabold tracking-tight leading-[1.05] text-white">
                Engineered Garage Equipment &{' '}
                <span className="text-page-red">EV Powertrain</span> Solutions
              </h1>

              <p className="text-body-lg text-page-lightgray/80 max-w-2xl mx-auto leading-relaxed">
                Empowering automotive service centers and fleet operators with heavy-duty garage machinery, turnkey workshop engineering, and certified 2-wheeler / 3-wheeler EV components.
              </p>

              {/* CTAs */}
              <div className="pt-4 flex flex-wrap justify-center items-center gap-4">
                <Link href="/garage-equipment">
                  <Button
                    variant="primary"
                    size="lg"
                    className="font-bold uppercase tracking-wider text-xs gap-2 px-7 h-12 shadow-md"
                  >
                    <span>Garage Equipment</span>
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>

                <Link href="/ev-parts">
                  <Button
                    variant="ev"
                    size="lg"
                    className="font-bold uppercase tracking-wider text-xs gap-2 px-7 h-12 shadow-md"
                  >
                    <span>EV Parts Division</span>
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>

                <Button
                  variant="outlineDark"
                  size="lg"
                  onClick={() => handleOpenQuote()}
                  className="font-bold uppercase tracking-wider text-xs px-6 h-12"
                >
                  <span>Request Quote</span>
                </Button>
              </div>

              {/* Authorized Partner Bar */}
              <div className="pt-10 border-t border-page-darkgray/80 text-xs font-mono text-page-midgray max-w-2xl mx-auto">
                <span className="text-[11px] uppercase tracking-widest text-page-midgray block mb-3">
                  Authorized National Distribution Partners
                </span>
                <div className="flex flex-wrap items-center justify-center gap-3">
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

        {/* 3. Dual Business Division Panels */}
        <SectionWrapper variant="light" noPadding className="py-12 md:py-16">
          <div className="space-y-6">
            <div className="text-center max-w-2xl mx-auto mb-10">
              <span className="text-label text-page-red block mb-1">
                Two Core Business Ecosystems
              </span>
              <h2 className="text-h2 font-bold tracking-tight text-page-nearblack">
                Comprehensive Automotive Infrastructure
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Division 1: Garage Equipment */}
              <div className="group relative rounded-md border-2 border-page-lightgray hover:border-page-red bg-white p-8 transition-all duration-300 shadow-xs flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded bg-page-red/10 border border-page-red/20 flex items-center justify-center text-page-red">
                      <Wrench className="h-6 w-6" />
                    </div>
                    <Badge variant="redSubtle">8 Categories · 17 Models</Badge>
                  </div>

                  <h3 className="text-2xl font-bold text-page-nearblack group-hover:text-page-red transition-colors">
                    Garage Equipment Division
                  </h3>

                  <p className="text-sm text-page-midgray leading-relaxed">
                    Heavy-duty lifting hoists, computerized 3D wheel alignment, dynamic balancers, automatic tyre changers, and OEM-level multi-brand diagnostics.
                  </p>

                  <div className="pt-2 flex flex-wrap gap-2 text-xs font-mono text-page-midgray">
                    <span className="px-2 py-1 bg-page-offwhite rounded border border-page-lightgray">Lifting Hoists</span>
                    <span className="px-2 py-1 bg-page-offwhite rounded border border-page-lightgray">3D Alignment</span>
                    <span className="px-2 py-1 bg-page-offwhite rounded border border-page-lightgray">Diagnostic Tools</span>
                    <span className="px-2 py-1 bg-page-offwhite rounded border border-page-lightgray">ADAS Frames</span>
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-page-lightgray">
                  <Link href="/garage-equipment">
                    <Button variant="primary" size="md" className="w-full font-bold uppercase tracking-wider text-xs gap-2">
                      <span>Explore Garage Equipment</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Button>
                  </Link>
                </div>
              </div>

              {/* Division 2: EV Parts */}
              <div className="group relative rounded-md border-2 border-page-lightgray hover:border-ev-teal bg-white p-8 transition-all duration-300 shadow-xs flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded bg-ev-teal/10 border border-ev-teal/20 flex items-center justify-center text-ev-teal">
                      <Zap className="h-6 w-6" />
                    </div>
                    <Badge variant="evSubtle">2W & 3W · 9 Categories</Badge>
                  </div>

                  <h3 className="text-2xl font-bold text-page-nearblack group-hover:text-ev-teal transition-colors">
                    EV Parts & Powertrains
                  </h3>

                  <p className="text-sm text-page-midgray leading-relaxed">
                    High-efficiency BLDC hub and differential motors, sinusoidal FOC controllers, high-capacity LiFePO4 batteries, and smart CC/CV fast charging.
                  </p>

                  <div className="pt-2 flex flex-wrap gap-2 text-xs font-mono text-page-midgray">
                    <span className="px-2 py-1 bg-page-offwhite rounded border border-page-lightgray">2-Wheeler (Bikes/Scooters)</span>
                    <span className="px-2 py-1 bg-page-offwhite rounded border border-page-lightgray">3-Wheeler (E-Rickshaws)</span>
                    <span className="px-2 py-1 bg-page-offwhite rounded border border-page-lightgray">LiFePO4 Packs</span>
                    <span className="px-2 py-1 bg-page-offwhite rounded border border-page-lightgray">CAN Bus Controllers</span>
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-page-lightgray">
                  <Link href="/ev-parts">
                    <Button variant="ev" size="md" className="w-full font-bold uppercase tracking-wider text-xs gap-2">
                      <span>Explore EV Parts Division</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </SectionWrapper>

        {/* 4. Garage Equipment Featured Showcase */}
        <SectionWrapper variant="offwhite">
          <div className="space-y-10">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <span className="text-label text-page-red block mb-1">
                  Garage Equipment Catalog
                </span>
                <h2 className="text-h2 font-bold tracking-tight text-page-nearblack">
                  Flagship Commercial Machinery
                </h2>
                <p className="text-sm text-page-midgray mt-1 max-w-2xl leading-relaxed">
                  Certified machinery backed by local warranty, foundation design, and engineering technician training.
                </p>
              </div>

              <Link href="/garage-equipment">
                <Button variant="primary" size="md" className="font-bold text-xs uppercase tracking-wider gap-1.5">
                  <span>View All 17 Models</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Button>
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredGarage.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onOpenQuote={handleOpenQuote}
                />
              ))}
            </div>
          </div>
        </SectionWrapper>

        {/* 5. Workshop Solutions Section */}
        <SectionWrapper variant="nearblack">
          <div className="space-y-10">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-page-darkgray pb-6">
              <div>
                <span className="text-label text-page-red block mb-1">
                  Turnkey Engineering
                </span>
                <h2 className="text-h2 font-bold tracking-tight text-white">
                  Complete Workshop Solutions
                </h2>
                <p className="text-sm text-page-lightgray/70 mt-1 max-w-2xl leading-relaxed">
                  From site appraisal and architectural CAD bay design to electrical hookup and certified technician training.
                </p>
              </div>

              <Link href="/solutions">
                <Button variant="outlineDark" size="md" className="font-bold text-xs uppercase tracking-wider gap-1.5 shrink-0">
                  <span>Explore Solutions</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Button>
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {workshopSolutions.slice(0, 3).map((solution) => (
                <div
                  key={solution.id}
                  className="p-6 bg-page-charcoal border border-page-darkgray rounded-md space-y-4 hover:border-page-red transition-colors flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <span className="text-xs font-mono uppercase tracking-wider text-page-red font-bold">
                      {solution.subtitle}
                    </span>
                    <h3 className="text-xl font-bold text-white">
                      {solution.title}
                    </h3>
                    <p className="text-xs text-page-lightgray/80 leading-relaxed">
                      {solution.shortDescription}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-page-darkgray space-y-2">
                    {solution.includes.slice(0, 3).map((inc, iIdx) => (
                      <div key={iIdx} className="flex items-center gap-2 text-xs text-page-lightgray">
                        <CheckCircle2 className="h-3.5 w-3.5 text-page-red shrink-0" />
                        <span>{inc}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </SectionWrapper>

        {/* 6. Services & Technical Support */}
        <SectionWrapper variant="light">
          <div className="space-y-10">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-page-lightgray pb-6">
              <div>
                <span className="text-label text-page-red block mb-1">
                  Engineering Support
                </span>
                <h2 className="text-h2 font-bold tracking-tight text-page-nearblack">
                  Comprehensive After-Sales & Training
                </h2>
                <p className="text-sm text-page-midgray mt-2 leading-relaxed">
                  Support from certified automotive specialists ensuring continuous operational uptime and peak workshop efficiency.
                </p>
              </div>

              <Link href="/services">
                <Button variant="outline" size="md" className="font-bold text-xs uppercase tracking-wider gap-1.5 shrink-0">
                  <span>Explore Services</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Button>
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.slice(0, 6).map((service) => (
                <div
                  key={service.id}
                  className="p-6 bg-page-offwhite rounded-md border border-page-lightgray space-y-3 hover:border-page-red transition-colors"
                >
                  <h3 className="text-base font-bold text-page-nearblack">
                    {service.title}
                  </h3>
                  <p className="text-xs text-page-midgray leading-relaxed">
                    {service.description}
                  </p>
                  <ul className="pt-2 space-y-1 text-xs text-page-nearblack">
                    {service.details.slice(0, 3).map((detail, dIdx) => (
                      <li key={dIdx} className="flex items-center gap-1.5 text-[11px] text-page-midgray">
                        <span className="w-1.5 h-1.5 rounded-full bg-page-red" />
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </SectionWrapper>
      </main>

      {/* Quote Dialog */}
      <QuoteModal
        open={isQuoteOpen}
        onOpenChange={setIsQuoteOpen}
        product={selectedProduct}
      />

      {/* Global Professional Footer */}
      <Footer />
    </div>
  );
}
