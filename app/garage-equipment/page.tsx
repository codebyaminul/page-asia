'use client';

import * as React from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Container } from '@/components/layout/Container';
import { SectionWrapper } from '@/components/layout/SectionWrapper';
import { GarageHero } from '@/components/garage/GarageHero';
import { EquipmentCategoryGrid } from '@/components/garage/EquipmentCategoryGrid';
import { ProductCard } from '@/components/garage/ProductCard';
import { QuoteModal } from '@/components/garage/QuoteModal';
import { getFeaturedGarageProducts } from '@/data/products/garage-equipment';
import { brands } from '@/data/brands';
import { Product } from '@/types';
import { Button } from '@/components/ui/button';
import { ArrowRight, Wrench, Shield, CheckCircle2, ChevronRight, Sparkles } from 'lucide-react';

export default function GarageEquipmentLandingPage() {
  const [isQuoteOpen, setIsQuoteOpen] = React.useState(false);
  const [selectedProduct, setSelectedProduct] = React.useState<Product | null>(null);

  const featuredProducts = getFeaturedGarageProducts(4);

  const handleOpenQuote = (product?: Product) => {
    setSelectedProduct(product || null);
    setIsQuoteOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-page-nearblack">
      {/* 1. Sticky Navigation */}
      <Navbar onOpenQuoteModal={() => handleOpenQuote()} />

      <main className="flex-1">
        {/* 2. Hero Section */}
        <GarageHero onOpenQuote={() => handleOpenQuote()} />

        {/* 3. Visual Category Directory */}
        <SectionWrapper variant="light" id="categories">
          <div className="space-y-10">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-page-lightgray pb-6">
              <div>
                <span className="text-label text-page-red block mb-1">
                  Product Taxonomy
                </span>
                <h2 className="text-h2 font-bold tracking-tight text-page-nearblack">
                  Equipment Categories
                </h2>
                <p className="text-sm text-page-midgray mt-1 max-w-2xl leading-relaxed">
                  Browse certified commercial garage machinery categorized by workshop bay operation. Engineered for passenger vehicle and heavy fleet throughput.
                </p>
              </div>

              <Link href="/garage-equipment/all">
                <Button variant="outline" size="md" className="font-bold text-xs uppercase tracking-wider gap-1.5 shrink-0">
                  <span>Browse Full Catalog</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Button>
              </Link>
            </div>

            {/* 8 Category Visual Cards */}
            <EquipmentCategoryGrid />
          </div>
        </SectionWrapper>

        {/* 4. Featured Flagship Equipment Showcase */}
        <SectionWrapper variant="offwhite">
          <div className="space-y-10">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <span className="text-label text-page-red block mb-1">
                  High-Throughput Units
                </span>
                <h2 className="text-h2 font-bold tracking-tight text-page-nearblack">
                  Featured Commercial Machinery
                </h2>
                <p className="text-sm text-page-midgray mt-1 max-w-2xl leading-relaxed">
                  Proven reliability in modern dealership and high-cycle independent workshop bays.
                </p>
              </div>

              <Link href="/garage-equipment/all">
                <Button variant="primary" size="md" className="font-bold text-xs uppercase tracking-wider gap-1.5 shadow-xs">
                  <span>View All 17 Models</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Button>
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onOpenQuote={handleOpenQuote}
                />
              ))}
            </div>
          </div>
        </SectionWrapper>

        {/* 5. Complete Workshop Engineering Banner */}
        <section className="bg-page-charcoal text-white py-16 border-y border-page-darkgray">
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-8 space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-page-nearblack border border-page-darkgray rounded-xs text-xs font-mono text-page-lightgray">
                  <Wrench className="h-3.5 w-3.5 text-page-red" />
                  <span>TURNKEY ENGINEERING & FACILITY DEPLOYMENT</span>
                </div>
                <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white leading-tight">
                  Setting Up a New Workshop or Upgrading Machinery?
                </h2>
                <p className="text-sm text-page-lightgray/80 max-w-2xl leading-relaxed">
                  Beyond individual machine supply, PAGE International provides full architectural bay layout blueprints, pneumatic line balancing, foundation specifications, and certified technician training.
                </p>
              </div>

              <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3 justify-center">
                <Button
                  variant="primary"
                  size="lg"
                  onClick={() => handleOpenQuote()}
                  className="font-bold uppercase tracking-wider text-xs gap-2"
                >
                  <span>Request Workshop Consultation</span>
                  <ArrowRight className="h-4 w-4" />
                </Button>

                <Link href="/workshop-solutions">
                  <Button
                    variant="outlineDark"
                    size="lg"
                    className="w-full font-bold uppercase tracking-wider text-xs"
                  >
                    <span>View Workshop Solutions</span>
                  </Button>
                </Link>
              </div>
            </div>
          </Container>
        </section>

        {/* 6. Authorized Distribution Trust Bar */}
        <section className="py-12 bg-white border-b border-page-lightgray">
          <Container>
            <div className="text-center space-y-4">
              <span className="text-[11px] font-mono uppercase tracking-widest text-page-midgray">
                Official Distribution & After-Sales Partner For:
              </span>
              <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10">
                {brands.map((brand) => (
                  <div
                    key={brand.id}
                    className="flex flex-col items-center p-3 rounded-md border border-page-lightgray/80 bg-page-offwhite/50 min-w-36 hover:border-page-red transition-colors"
                  >
                    <span className="font-mono text-sm font-black text-page-nearblack tracking-wider">
                      {brand.name}
                    </span>
                    <span className="text-[10px] text-page-midgray mt-0.5">
                      {brand.description.slice(0, 32)}...
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </Container>
        </section>
      </main>

      {/* 7. Quote Dialog */}
      <QuoteModal
        open={isQuoteOpen}
        onOpenChange={setIsQuoteOpen}
        product={selectedProduct}
      />

      {/* 8. Professional Footer */}
      <Footer />
    </div>
  );
}
