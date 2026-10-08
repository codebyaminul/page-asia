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
import { newsArticles, getNewsArticlesByCategory } from '@/data/news';
import {
  FileText,
  Calendar,
  Clock,
  ArrowRight,
  ChevronRight,
  Sparkles,
  Info,
} from 'lucide-react';

const CATEGORIES = [
  'All',
  'Automotive',
  'Garage Technology',
  'EV Mobility',
  'Workshop Solutions',
  'Company Updates',
] as const;

export default function NewsPage() {
  const [selectedCategory, setSelectedCategory] = React.useState<string>('All');
  const [quoteOpen, setQuoteOpen] = React.useState(false);

  const filteredArticles = React.useMemo(() => {
    if (selectedCategory === 'All') return newsArticles;
    return newsArticles.filter((a) => a.category === selectedCategory);
  }, [selectedCategory]);

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
                <span className="text-white font-semibold">News & Insights</span>
              </nav>

              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-page-charcoal border border-page-darkgray text-page-lightgray text-xs font-mono">
                <FileText className="h-3.5 w-3.5 text-page-red" />
                <span>Industry Technical Knowledge & Company Bulletins</span>
              </div>

              <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white leading-[1.1]">
                News & Technical Insights
              </h1>

              <p className="text-lg md:text-xl text-page-midgray max-w-2xl mx-auto leading-relaxed">
                Analysis on automotive workshop engineering, emerging electric mobility powertrains, precision ADAS calibration, and operational productivity.
              </p>
            </div>
          </Container>
        </section>

        {/* 3. Prototype Disclaimer Bar */}
        <div className="bg-white border-b border-page-lightgray py-3">
          <Container>
            <div className="flex items-center gap-2.5 text-xs text-page-midgray font-mono">
              <Info className="h-4 w-4 text-page-red shrink-0" />
              <span>
                <strong>Prototype Content:</strong> Articles and bulletins below are published for prototype demonstration and architectural showcase purposes.
              </span>
            </div>
          </Container>
        </div>

        {/* 4. Category Filter Tabs */}
        <div className="bg-white border-b border-page-lightgray py-4 sticky top-16 z-20 shadow-xs">
          <Container>
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
              {CATEGORIES.map((cat) => {
                const isSelected = selectedCategory === cat;
                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-mono whitespace-nowrap transition-all border ${
                      isSelected
                        ? 'bg-page-nearblack text-white border-page-nearblack font-bold shadow-xs'
                        : 'bg-page-offwhite text-page-charcoal border-page-lightgray hover:border-page-midgray'
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>
          </Container>
        </div>

        {/* 5. Articles Grid */}
        <SectionWrapper variant="light" noPadding className="py-16 md:py-20">
          <div className="space-y-12">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredArticles.map((article) => (
                <article
                  key={article.id}
                  className="group flex flex-col justify-between bg-white rounded-lg border border-page-lightgray hover:border-page-red hover:shadow-lg transition-all duration-300 overflow-hidden"
                >
                  <div>
                    {/* Media Thumbnail */}
                    <div className="relative aspect-16/10 w-full bg-page-offwhite overflow-hidden border-b border-page-lightgray/80">
                      <Image
                        src={article.image}
                        alt={article.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-page-nearblack/80 via-transparent to-transparent" />

                      <div className="absolute top-3 left-3">
                        <span className={`px-2.5 py-1 text-xs font-mono font-bold rounded-xs border ${
                          article.category === 'EV Mobility'
                            ? 'bg-ev-teal text-white border-ev-teal'
                            : 'bg-page-nearblack/90 backdrop-blur-xs text-white border-page-darkgray'
                        }`}>
                          {article.category}
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6 space-y-3">
                      <div className="flex items-center gap-3 text-[11px] font-mono text-page-midgray">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          <span>{article.date}</span>
                        </span>
                        <span>·</span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          <span>{article.readTime}</span>
                        </span>
                      </div>

                      <h3 className="text-lg font-bold text-page-nearblack group-hover:text-page-red transition-colors leading-snug line-clamp-2">
                        <Link href={`/news/${article.slug}`}>
                          {article.title}
                        </Link>
                      </h3>

                      <p className="text-xs text-page-midgray line-clamp-3 leading-relaxed">
                        {article.excerpt}
                      </p>
                    </div>
                  </div>

                  {/* Read More Footer */}
                  <div className="p-6 pt-0 mt-2 border-t border-page-lightgray/40">
                    <Link
                      href={`/news/${article.slug}`}
                      className="text-xs font-mono font-bold text-page-red hover:underline flex items-center justify-between"
                    >
                      <span>Read Full Insight</span>
                      <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </article>
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
