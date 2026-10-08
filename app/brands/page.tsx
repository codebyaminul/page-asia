'use client';

import * as React from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Container } from '@/components/layout/Container';
import { SectionWrapper } from '@/components/layout/SectionWrapper';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { QuoteModal } from '@/components/garage/QuoteModal';
import { brands } from '@/data/brands';
import {
  ShieldCheck,
  Globe,
  ArrowRight,
  ChevronRight,
  ExternalLink,
  Layers,
  Wrench,
  CheckCircle2,
} from 'lucide-react';

export default function BrandsPage() {
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
                <span className="text-white font-semibold">Brands</span>
              </nav>

              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-page-charcoal border border-page-darkgray text-page-lightgray text-xs font-mono">
                <Globe className="h-3.5 w-3.5 text-page-red" />
                <span>Global Manufacturing & Technical Collaboration</span>
              </div>

              <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white leading-[1.1]">
                Brands & Technology Partners
              </h1>

              <p className="text-lg md:text-xl text-page-midgray max-w-2xl mx-auto leading-relaxed">
                PAGE International collaborates with recognized automotive engineering manufacturers, bringing proven diagnostic technology, hydraulic lifting platforms, and wheel service machinery to regional workshops.
              </p>
            </div>
          </Container>
        </section>

        {/* 3. Brands Grid */}
        <SectionWrapper variant="light" noPadding className="py-16 md:py-20">
          <div className="space-y-12">
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <span className="text-label text-page-red font-mono font-semibold tracking-wider block">
                Selected Portfolio
              </span>
              <h2 className="text-h2 font-bold tracking-tight text-page-nearblack">
                Featured Brand Manufacturers
              </h2>
              <p className="text-sm text-page-midgray leading-relaxed">
                Equipment lines engineered to global safety standards and backed by comprehensive spare parts and warranty support.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {brands.map((brand) => (
                <div
                  key={brand.id}
                  className="group flex flex-col justify-between bg-white rounded-lg border-2 border-page-lightgray hover:border-page-red hover:shadow-lg transition-all duration-300 p-8 space-y-6"
                >
                  <div className="space-y-5">
                    {/* Brand Header */}
                    <div className="flex items-center justify-between border-b border-page-lightgray pb-4">
                      <div className="space-y-1">
                        <span className="text-2xl font-black font-mono tracking-wider text-page-nearblack group-hover:text-page-red transition-colors block">
                          {brand.name}
                        </span>
                        <div className="flex items-center gap-2 text-xs font-mono text-page-midgray">
                          <Globe className="h-3.5 w-3.5 text-page-midgray" />
                          <span>Origin: {brand.country}</span>
                        </div>
                      </div>

                      <Badge variant="brand" className="font-mono text-xs">
                        Industrial Standard
                      </Badge>
                    </div>

                    {/* Brand Description */}
                    <p className="text-sm text-page-midgray leading-relaxed">
                      {brand.description}
                    </p>

                    {/* Associated Categories */}
                    <div className="space-y-2 pt-2">
                      <span className="text-[11px] font-mono uppercase tracking-wider text-page-nearblack font-semibold block">
                        Equipment Specializations:
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {brand.categories.map((catSlug) => (
                          <Link
                            key={catSlug}
                            href={`/garage-equipment/${catSlug}`}
                            className="px-2.5 py-1 bg-page-offwhite hover:bg-page-red hover:text-white rounded border border-page-lightgray text-xs font-mono text-page-charcoal transition-colors capitalize"
                          >
                            {catSlug.replace(/-/g, ' ')}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Brand Action */}
                  <div className="pt-4 border-t border-page-lightgray flex items-center justify-between">
                    <Link
                      href={`/garage-equipment/${brand.categories[0] || 'all'}`}
                      className="text-xs font-mono font-bold text-page-red hover:underline flex items-center gap-1.5"
                    >
                      <span>Explore {brand.name} Machinery</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>

                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setQuoteOpen(true)}
                      className="text-xs font-mono"
                    >
                      Request Quotation
                    </Button>
                  </div>
                </div>
              ))}
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
