'use client';

import * as React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Container } from '@/components/layout/Container';
import { SectionWrapper } from '@/components/layout/SectionWrapper';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { QuoteModal } from '@/components/garage/QuoteModal';
import { getNewsArticleBySlug, newsArticles } from '@/data/news';
import {
  Calendar,
  Clock,
  ArrowLeft,
  ChevronRight,
  Share2,
  FileText,
  User,
  Tag,
  ArrowRight,
  Info,
} from 'lucide-react';

export default function NewsDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const article = getNewsArticleBySlug(slug);

  const [quoteOpen, setQuoteOpen] = React.useState(false);
  const [copiedLink, setCopiedLink] = React.useState(false);

  if (!article) {
    return (
      <div className="min-h-screen flex flex-col bg-white text-page-nearblack">
        <Navbar onOpenQuote={() => setQuoteOpen(true)} />
        <main className="flex-1 flex items-center justify-center p-6">
          <div className="text-center space-y-4 max-w-md">
            <FileText className="h-12 w-12 text-page-midgray mx-auto" />
            <h1 className="text-2xl font-bold text-page-nearblack">
              Article Not Found
            </h1>
            <p className="text-sm text-page-midgray leading-relaxed">
              The requested news publication or technical insight article does not exist or has been archived.
            </p>
            <Link href="/news">
              <Button variant="primary" size="md">
                Browse All News & Insights
              </Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const relatedArticles = newsArticles
    .filter((a) => a.id !== article.id)
    .slice(0, 2);

  const handleShare = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard?.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-page-offwhite">
      {/* 1. Global Navigation */}
      <Navbar onOpenQuote={() => setQuoteOpen(true)} />

      <main className="flex-1 pb-20">
        {/* 2. Breadcrumbs Bar */}
        <div className="bg-white border-b border-page-lightgray py-3 text-xs text-page-midgray">
          <Container>
            <nav aria-label="Breadcrumb" className="flex items-center space-x-1.5 overflow-x-auto whitespace-nowrap">
              <Link href="/" className="hover:text-page-nearblack transition-colors">
                Home
              </Link>
              <ChevronRight className="h-3 w-3 shrink-0 text-page-midgray/60" />
              <Link href="/news" className="hover:text-page-nearblack transition-colors">
                News & Insights
              </Link>
              <ChevronRight className="h-3 w-3 shrink-0 text-page-midgray/60" />
              <span className="text-page-nearblack font-semibold truncate max-w-sm">
                {article.title}
              </span>
            </nav>
          </Container>
        </div>

        {/* 3. Article Content Container */}
        <article className="pt-8 pb-16">
          <Container>
            <div className="max-w-3xl mx-auto space-y-8">
              {/* Header Info */}
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <span className={`px-2.5 py-1 text-xs font-mono font-bold rounded-xs ${
                    article.category === 'EV Mobility'
                      ? 'bg-ev-teal text-white'
                      : 'bg-page-nearblack text-white'
                  }`}>
                    {article.category}
                  </span>
                  <span className="text-xs font-mono text-page-midgray flex items-center gap-1">
                    <Calendar className="h-3.5 w-3.5" />
                    <span>{article.date}</span>
                  </span>
                  <span className="text-xs font-mono text-page-midgray flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5" />
                    <span>{article.readTime}</span>
                  </span>
                </div>

                <h1 className="text-3xl sm:text-4xl font-extrabold text-page-nearblack tracking-tight leading-tight">
                  {article.title}
                </h1>

                <div className="flex items-center justify-between pt-2 border-b border-page-lightgray pb-4 text-xs font-mono text-page-midgray">
                  <span className="flex items-center gap-1.5">
                    <User className="h-3.5 w-3.5 text-page-red" />
                    <span>Author: {article.author}</span>
                  </span>

                  <button
                    onClick={handleShare}
                    className="flex items-center gap-1 text-page-charcoal hover:text-page-red transition-colors"
                  >
                    <Share2 className="h-3.5 w-3.5" />
                    <span>{copiedLink ? 'Copied Link!' : 'Share Article'}</span>
                  </button>
                </div>
              </div>

              {/* Main Image */}
              <div className="relative aspect-16/9 w-full bg-page-offwhite rounded-lg border border-page-lightgray overflow-hidden">
                <Image
                  src={article.image}
                  alt={article.title}
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, 800px"
                  className="object-cover"
                />
              </div>

              {/* Prototype Notice */}
              <div className="p-4 rounded bg-page-offwhite border border-page-lightgray flex items-start gap-2.5 text-xs text-page-midgray">
                <Info className="h-4 w-4 text-page-red shrink-0 mt-0.5" />
                <span>
                  <strong>Prototype Publication:</strong> This article is published for interface demonstration and content architecture purposes.
                </span>
              </div>

              {/* Body Paragraphs */}
              <div className="prose prose-neutral max-w-none space-y-5 text-sm md:text-base text-page-charcoal leading-relaxed pt-2">
                {article.content.map((paragraph, pIdx) => (
                  <p key={pIdx}>
                    {paragraph}
                  </p>
                ))}
              </div>

              {/* Tags */}
              <div className="pt-6 border-t border-page-lightgray space-y-2">
                <span className="text-xs font-mono uppercase tracking-wider text-page-midgray block">
                  Related Topics:
                </span>
                <div className="flex flex-wrap gap-2">
                  {article.tags.map((tag, tIdx) => (
                    <span
                      key={tIdx}
                      className="px-2.5 py-1 bg-white border border-page-lightgray rounded text-xs font-mono text-page-charcoal"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Bottom Back Button */}
              <div className="pt-4 flex items-center justify-between border-t border-page-lightgray">
                <Link href="/news">
                  <Button variant="outline" size="sm" className="gap-1.5 font-mono text-xs">
                    <ArrowLeft className="h-3.5 w-3.5" />
                    <span>Back to News Listing</span>
                  </Button>
                </Link>

                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => setQuoteOpen(true)}
                  className="font-mono text-xs"
                >
                  Request Consultation
                </Button>
              </div>
            </div>
          </Container>
        </article>

        {/* 4. Related Articles Grid */}
        {relatedArticles.length > 0 && (
          <section className="py-12 bg-white border-t border-page-lightgray">
            <Container>
              <div className="max-w-3xl mx-auto space-y-6">
                <h3 className="text-lg font-bold text-page-nearblack uppercase font-mono tracking-wider">
                  Further Reading
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {relatedArticles.map((rel) => (
                    <Link
                      key={rel.id}
                      href={`/news/${rel.slug}`}
                      className="group p-5 rounded-lg border border-page-lightgray hover:border-page-red bg-page-offwhite/50 transition-all space-y-2 block"
                    >
                      <span className="text-[10px] font-mono font-bold text-page-red uppercase">
                        {rel.category}
                      </span>
                      <h4 className="text-sm font-bold text-page-nearblack group-hover:text-page-red transition-colors line-clamp-2">
                        {rel.title}
                      </h4>
                      <p className="text-xs text-page-midgray line-clamp-2">
                        {rel.excerpt}
                      </p>
                    </Link>
                  ))}
                </div>
              </div>
            </Container>
          </section>
        )}
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
