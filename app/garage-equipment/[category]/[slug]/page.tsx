'use client';

import * as React from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Container } from '@/components/layout/Container';
import { ProductGallery } from '@/components/garage/ProductGallery';
import { ProductSpecifications } from '@/components/garage/ProductSpecifications';
import { RelatedProducts } from '@/components/garage/RelatedProducts';
import { QuoteModal } from '@/components/garage/QuoteModal';
import { getGarageProductBySlug, garageProducts } from '@/data/products/garage-equipment';
import { getCategoryBySlug } from '@/data/categories';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import {
  ChevronRight,
  CheckCircle2,
  Clock,
  ShieldCheck,
  FileText,
  PhoneCall,
  Share2,
  Wrench,
  ArrowRight,
  Layers,
  ArrowLeft,
  Building2,
  Sparkles,
} from 'lucide-react';

export default function GarageProductDetailPage() {
  const params = useParams();
  const router = useRouter();

  const slug = params?.slug as string;
  const categorySlug = params?.category as string;

  const product = getGarageProductBySlug(slug);
  const categoryObj = getCategoryBySlug(categorySlug || product?.category || '');

  const [isQuoteOpen, setIsQuoteOpen] = React.useState(false);
  const [copiedLink, setCopiedLink] = React.useState(false);

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col bg-white text-page-nearblack">
        <Navbar onOpenQuoteModal={() => setIsQuoteOpen(true)} />
        <main className="flex-1 flex items-center justify-center p-6">
          <div className="text-center space-y-4 max-w-md">
            <h1 className="text-2xl font-bold text-page-nearblack">Equipment Model Not Found</h1>
            <p className="text-sm text-page-midgray leading-relaxed">
              The requested machinery slug does not exist in our catalog or may have been updated.
            </p>
            <Link href="/garage-equipment/all">
              <Button variant="primary" size="md">
                Browse All Equipment
              </Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Related products from same category or fallback
  const relatedProducts = garageProducts
    .filter((p) => p.id !== product.id && (p.category === product.category || p.brand === product.brand))
    .slice(0, 4);

  const isInStock = product.availability === 'In Stock';

  const handleShare = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard?.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-page-nearblack">
      {/* 1. Global Navigation */}
      <Navbar onOpenQuoteModal={() => setIsQuoteOpen(true)} />

      <main className="flex-1 pb-20">
        {/* 2. Compact Breadcrumb Bar */}
        <div className="bg-page-offwhite border-b border-page-lightgray py-3 text-xs text-page-midgray">
          <Container>
            <nav aria-label="Breadcrumb" className="flex items-center space-x-1.5 overflow-x-auto whitespace-nowrap">
              <Link href="/" className="hover:text-page-nearblack transition-colors">
                Home
              </Link>
              <ChevronRight className="h-3 w-3 shrink-0 text-page-midgray/60" />
              <Link href="/garage-equipment" className="hover:text-page-nearblack transition-colors">
                Garage Equipment
              </Link>
              {categoryObj && (
                <>
                  <ChevronRight className="h-3 w-3 shrink-0 text-page-midgray/60" />
                  <Link
                    href={`/garage-equipment/${categoryObj.slug}`}
                    className="hover:text-page-nearblack transition-colors"
                  >
                    {categoryObj.name}
                  </Link>
                </>
              )}
              <ChevronRight className="h-3 w-3 shrink-0 text-page-midgray/60" />
              <span className="font-semibold text-page-nearblack truncate">
                {product.name}
              </span>
            </nav>
          </Container>
        </div>

        {/* 3. Product Presentation Hero (2-Column Desktop Split) */}
        <div className="py-10 md:py-14 border-b border-page-lightgray bg-white">
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
              {/* ── LEFT: Large Image Gallery (col-span-6) ── */}
              <div className="lg:col-span-6 space-y-4">
                <ProductGallery images={product.images} productName={product.name} />

                {/* Service & Guarantee Trust Pill */}
                <div className="p-3.5 bg-page-offwhite rounded-md border border-page-lightgray flex items-center justify-between text-xs font-mono text-page-midgray">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="h-4 w-4 text-page-red shrink-0" />
                    <span>Authorized Warranty & After-Sales Service Included</span>
                  </div>
                  <span className="text-[10px] uppercase font-bold text-page-nearblack">
                    Dhaka HQ Supported
                  </span>
                </div>
              </div>

              {/* ── RIGHT: Product Info & Quotation Panel (col-span-6) ── */}
              <div className="lg:col-span-6 space-y-6">
                {/* Brand & Status Badges */}
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-1 text-xs font-bold font-mono tracking-wider bg-page-nearblack text-white rounded-xs">
                      {product.brand}
                    </span>
                    <span className="text-xs font-mono uppercase text-page-midgray">
                      SKU: <strong className="text-page-nearblack">{product.sku}</strong>
                    </span>
                  </div>

                  <span
                    className={`inline-flex items-center gap-1 font-mono text-xs font-semibold ${
                      isInStock ? 'text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded' : 'text-page-midgray bg-page-offwhite px-2 py-0.5 rounded'
                    }`}
                  >
                    {isInStock ? (
                      <>
                        <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
                        <span>In Stock</span>
                      </>
                    ) : (
                      <>
                        <Clock className="h-3.5 w-3.5 text-page-midgray" />
                        <span>{product.availability || 'Available on Order'}</span>
                      </>
                    )}
                  </span>
                </div>

                {/* Product Title */}
                <div>
                  <span className="text-label text-page-red block mb-1">
                    {product.subcategory || product.category.replace(/-/g, ' ')}
                  </span>
                  <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-page-nearblack leading-tight">
                    {product.name}
                  </h1>
                </div>

                {/* Short Description */}
                <p className="text-sm md:text-base text-page-midgray leading-relaxed">
                  {product.shortDescription}
                </p>

                {/* Key Technical Specifications Callout Box */}
                {product.keySpecs && product.keySpecs.length > 0 && (
                  <div className="p-4 bg-page-offwhite rounded-md border border-page-lightgray space-y-2">
                    <span className="text-[11px] font-mono uppercase tracking-wider text-page-nearblack font-bold block">
                      Core Performance Parameters:
                    </span>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-technical">
                      {product.keySpecs.map((spec, idx) => (
                        <div key={idx} className="bg-white p-2 rounded border border-page-lightgray/80">
                          <span className="text-[10px] text-page-midgray block uppercase font-mono truncate">
                            {spec.label}
                          </span>
                          <span className="font-bold text-page-nearblack text-sm">
                            {spec.value} <span className="text-xs font-normal text-page-midgray">{spec.unit || ''}</span>
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Primary CTAs */}
                <div className="space-y-3 pt-2">
                  <div className="flex flex-col sm:flex-row items-center gap-3">
                    <Button
                      variant="primary"
                      size="lg"
                      onClick={() => setIsQuoteOpen(true)}
                      className="w-full sm:flex-1 font-bold uppercase tracking-wider text-xs gap-2 h-12 shadow-md"
                    >
                      <span>Request a Quote</span>
                      <ArrowRight className="h-4 w-4" />
                    </Button>

                    <Button
                      variant="outline"
                      size="lg"
                      onClick={() => setIsQuoteOpen(true)}
                      className="w-full sm:w-auto font-bold uppercase tracking-wider text-xs gap-2 h-12 px-6"
                    >
                      <PhoneCall className="h-4 w-4 text-page-red" />
                      <span>Contact Sales</span>
                    </Button>
                  </div>

                  <div className="flex items-center justify-between text-xs text-page-midgray pt-1">
                    <span className="flex items-center gap-1.5">
                      <Wrench className="h-3.5 w-3.5 text-page-red" />
                      <span>On-site installation and technician training available</span>
                    </span>

                    <button
                      type="button"
                      onClick={handleShare}
                      className="hover:text-page-nearblack flex items-center gap-1 cursor-pointer transition-colors"
                    >
                      <Share2 className="h-3.5 w-3.5" />
                      <span>{copiedLink ? 'Link Copied!' : 'Share'}</span>
                    </button>
                  </div>
                </div>

                {/* Quick Downloads Box */}
                {product.downloads && product.downloads.length > 0 && (
                  <div className="pt-4 border-t border-page-lightgray flex flex-wrap items-center gap-3">
                    <span className="text-xs font-mono uppercase text-page-midgray">
                      Technical Docs:
                    </span>
                    {product.downloads.map((doc, dIdx) => (
                      <a
                        key={dIdx}
                        href={doc.url}
                        className="inline-flex items-center gap-1.5 px-3 py-1 bg-page-offwhite hover:bg-page-lightgray border border-page-lightgray rounded text-xs font-medium text-page-nearblack transition-colors"
                        onClick={(e) => {
                          e.preventDefault();
                          alert(`Prototype: In the production release, ${doc.label} will download the certified engineering PDF.`);
                        }}
                      >
                        <FileText className="h-3.5 w-3.5 text-page-red" />
                        <span>{doc.label}</span>
                      </a>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </Container>
        </div>

        {/* 4. Deep Dive Tabs Section: Overview | Features | Specifications | Applications */}
        <div className="py-12 bg-white">
          <Container>
            <Tabs defaultValue="specs">
              <TabsList className="border-b border-page-lightgray mb-8">
                <TabsTrigger value="specs">Technical Specifications</TabsTrigger>
                <TabsTrigger value="overview">Overview & Engineering</TabsTrigger>
                <TabsTrigger value="features">Key Features</TabsTrigger>
                <TabsTrigger value="applications">Workshop Applications</TabsTrigger>
              </TabsList>

              {/* Tab 1: Technical Specifications */}
              <TabsContent value="specs">
                <div className="space-y-6 max-w-4xl">
                  <div>
                    <h3 className="text-xl font-bold text-page-nearblack tracking-tight mb-2">
                      Engineering Data & Dimensions
                    </h3>
                    <p className="text-sm text-page-midgray">
                      Detailed mechanical, electrical, and structural ratings for {product.name}.
                    </p>
                  </div>

                  <ProductSpecifications
                    specGroups={product.specGroups}
                    keySpecs={product.keySpecs}
                  />
                </div>
              </TabsContent>

              {/* Tab 2: Overview */}
              <TabsContent value="overview">
                <div className="space-y-6 max-w-3xl">
                  <div>
                    <h3 className="text-xl font-bold text-page-nearblack tracking-tight mb-3">
                      Equipment Architecture & Build Quality
                    </h3>
                    <div className="prose text-sm text-page-nearblack/90 space-y-4 leading-relaxed">
                      <p>{product.description}</p>
                      <p>
                        Fabricated under stringent quality management systems by {product.brand}, this unit incorporates certified commercial safety valves, hardened steel bearing tracks, and electrical protections calibrated for regional workshop environments.
                      </p>
                    </div>
                  </div>

                  <div className="p-4 bg-page-offwhite rounded-md border border-page-lightgray space-y-2">
                    <span className="text-xs font-mono font-bold uppercase tracking-wider text-page-nearblack">
                      Workshop Compatibility Guarantee
                    </span>
                    <p className="text-xs text-page-midgray leading-relaxed">
                      All units supplied by PAGE International undergo pre-shipment bench testing and come complete with authorized manufacturer warranty documents, wiring diagrams, and foundation anchor bolts.
                    </p>
                  </div>
                </div>
              </TabsContent>

              {/* Tab 3: Key Features */}
              <TabsContent value="features">
                <div className="space-y-6 max-w-3xl">
                  <div>
                    <h3 className="text-xl font-bold text-page-nearblack tracking-tight mb-3">
                      Commercial Advantages & Innovations
                    </h3>
                    <ul className="space-y-3">
                      {product.features.map((feature, fIdx) => (
                        <li key={fIdx} className="flex items-start gap-3 text-sm text-page-nearblack">
                          <CheckCircle2 className="h-4 w-4 text-page-red shrink-0 mt-0.5" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </TabsContent>

              {/* Tab 4: Applications */}
              <TabsContent value="applications">
                <div className="space-y-6 max-w-3xl">
                  <div>
                    <h3 className="text-xl font-bold text-page-nearblack tracking-tight mb-3">
                      Recommended Workshop Environments
                    </h3>
                    <p className="text-sm text-page-midgray mb-4">
                      This unit is engineered specifically for the following automotive commercial operations:
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {(product.applications || [
                        'Dealership service facilities',
                        'Multi-brand independent garages',
                        'Fast-fit express bays',
                        'Fleet maintenance workshops',
                      ]).map((app, aIdx) => (
                        <div
                          key={aIdx}
                          className="p-3 bg-page-offwhite rounded border border-page-lightgray text-xs font-semibold text-page-nearblack flex items-center gap-2"
                        >
                          <Building2 className="h-4 w-4 text-page-red shrink-0" />
                          <span>{app}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </Container>
        </div>

        {/* 5. Related Equipment Section (Bottom) */}
        <Container>
          <RelatedProducts
            products={relatedProducts}
            currentCategory={product.category}
            onOpenQuote={() => setIsQuoteOpen(true)}
          />
        </Container>
      </main>

      {/* Quote Dialog pre-filled with this product */}
      <QuoteModal
        open={isQuoteOpen}
        onOpenChange={setIsQuoteOpen}
        product={product}
      />

      {/* Global Footer */}
      <Footer />
    </div>
  );
}
