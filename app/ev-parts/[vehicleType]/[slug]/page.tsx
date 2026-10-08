'use client';

import * as React from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Container } from '@/components/layout/Container';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { EVProductGallery } from '@/components/ev/EVProductGallery';
import { EVSpecifications } from '@/components/ev/EVSpecifications';
import { EVCompatibility } from '@/components/ev/EVCompatibility';
import { EVProductCard } from '@/components/ev/EVProductCard';
import { QuoteModal } from '@/components/garage/QuoteModal';
import { getEVProductBySlug, evProducts } from '@/data/products/ev-parts';
import { getCategoryBySlug } from '@/data/categories';
import {
  ChevronRight,
  CheckCircle2,
  Clock,
  ShieldCheck,
  FileText,
  Phone,
  Share2,
  Zap,
  ArrowRight,
  Layers,
  Bike,
  Truck,
  ArrowLeft,
  Info,
} from 'lucide-react';

export default function EVProductDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const vehicleTypeParam = (params?.vehicleType as string) || '2-wheeler';

  const product = getEVProductBySlug(slug);
  const categoryObj = getCategoryBySlug(product?.category || '');

  const [quoteOpen, setQuoteOpen] = React.useState(false);
  const [modalProduct, setModalProduct] = React.useState(product || null);
  const [copiedLink, setCopiedLink] = React.useState(false);

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col bg-white text-page-nearblack">
        <Navbar onOpenQuote={() => setQuoteOpen(true)} />
        <main className="flex-1 flex items-center justify-center p-6">
          <div className="text-center space-y-4 max-w-md">
            <Zap className="h-12 w-12 text-ev-teal mx-auto" />
            <h1 className="text-2xl font-bold text-page-nearblack">
              EV Component Not Found
            </h1>
            <p className="text-sm text-page-midgray leading-relaxed">
              The requested electric vehicle powertrain component does not exist in our catalog or may have been updated.
            </p>
            <Link href="/ev-parts/2-wheeler">
              <Button variant="ev" size="md">
                Browse EV Components Catalog
              </Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Related products (same category or compatible vehicle platform)
  const relatedProducts = evProducts
    .filter(
      (p) =>
        p.id !== product.id &&
        (p.category === product.category ||
          p.vehicleCompatibility?.some((v) => product.vehicleCompatibility?.includes(v)))
    )
    .slice(0, 3);

  const isInStock = product.availability === 'In Stock';

  // Vehicle label
  const vehicleLabel = product.vehicleCompatibility?.includes('both')
    ? '2-Wheeler & 3-Wheeler Universal'
    : product.vehicleCompatibility?.includes('2-wheeler')
    ? '2-Wheeler EV Application'
    : product.vehicleCompatibility?.includes('3-wheeler')
    ? '3-Wheeler EV Application'
    : 'Universal Platform';

  const handleShare = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard?.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  const handleOpenQuote = (targetProduct = product) => {
    setModalProduct(targetProduct);
    setQuoteOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-page-nearblack">
      {/* 1. Global Navigation */}
      <Navbar onOpenQuote={() => handleOpenQuote()} />

      <main className="flex-1 pb-20">
        {/* 2. Compact Breadcrumb Bar */}
        <div className="bg-page-offwhite border-b border-page-lightgray py-3 text-xs text-page-midgray">
          <Container>
            <nav aria-label="Breadcrumb" className="flex items-center space-x-1.5 overflow-x-auto whitespace-nowrap">
              <Link href="/" className="hover:text-page-nearblack transition-colors">
                Home
              </Link>
              <ChevronRight className="h-3 w-3 shrink-0 text-page-midgray/60" />
              <Link href="/ev-parts" className="hover:text-page-nearblack transition-colors">
                EV Parts
              </Link>
              <ChevronRight className="h-3 w-3 shrink-0 text-page-midgray/60" />
              <Link
                href={`/ev-parts/${vehicleTypeParam === '3-wheeler' ? '3-wheeler' : '2-wheeler'}`}
                className="hover:text-page-nearblack transition-colors capitalize"
              >
                {vehicleTypeParam.replace('-', ' ')}
              </Link>
              <ChevronRight className="h-3 w-3 shrink-0 text-page-midgray/60" />
              <Link
                href={`/ev-parts/${vehicleTypeParam}?category=${product.category}`}
                className="hover:text-page-nearblack transition-colors capitalize"
              >
                {categoryObj?.name || product.category.replace(/-/g, ' ')}
              </Link>
              <ChevronRight className="h-3 w-3 shrink-0 text-ev-teal" />
              <span className="text-page-nearblack font-semibold truncate max-w-xs">
                {product.name}
              </span>
            </nav>
          </Container>
        </div>

        {/* 3. Primary Product Hero Header & Split Section */}
        <section className="pt-8 pb-12 border-b border-page-lightgray/80">
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12">
              {/* LEFT COLUMN: Image Gallery (5 Cols) */}
              <div className="lg:col-span-5 space-y-6">
                <EVProductGallery
                  images={product.images}
                  productName={product.name}
                  sku={product.sku}
                  badge={product.badge}
                  vehicleTypeLabel={vehicleLabel}
                />

                {/* Technical Warranty & Verification Card */}
                <div className="p-4 rounded-md bg-page-offwhite border border-page-lightgray space-y-2.5 font-technical text-xs">
                  <div className="flex items-center gap-2 font-bold text-page-nearblack">
                    <ShieldCheck className="h-4 w-4 text-ev-teal shrink-0" />
                    <span>Commercial B2B Guarantee & Compliance</span>
                  </div>
                  <ul className="space-y-1.5 text-page-midgray">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-3 w-3 text-ev-teal shrink-0" />
                      <span>100% End-of-Line Dyno & Load Tested</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-3 w-3 text-ev-teal shrink-0" />
                      <span>12-Month Industrial Replacement Warranty</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-3 w-3 text-ev-teal shrink-0" />
                      <span>Batch OEM Testing Certifications Provided</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* RIGHT COLUMN: Product Specifications & Actions (7 Cols) */}
              <div className="lg:col-span-7 space-y-6">
                {/* Header Metadata */}
                <div className="space-y-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-mono font-bold tracking-wider bg-ev-teal/15 text-ev-teal rounded-xs border border-ev-teal/30">
                      {product.vehicleCompatibility?.includes('3-wheeler') && !product.vehicleCompatibility?.includes('both') ? (
                        <Truck className="h-3.5 w-3.5" />
                      ) : (
                        <Bike className="h-3.5 w-3.5" />
                      )}
                      <span>{vehicleLabel}</span>
                    </span>

                    <span className="text-xs font-mono uppercase tracking-wider text-page-midgray bg-page-offwhite px-2 py-0.5 rounded border border-page-lightgray">
                      {categoryObj?.name || product.category.replace(/-/g, ' ')}
                    </span>
                  </div>

                  <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-page-nearblack leading-tight">
                    {product.name}
                  </h1>

                  <div className="flex items-center gap-4 text-xs font-mono pt-1">
                    <span className="text-page-midgray">
                      SKU: <strong className="text-page-nearblack">{product.sku}</strong>
                    </span>
                    <span className="text-page-lightgray">|</span>
                    <span className="text-page-midgray">
                      Brand: <strong className="text-page-nearblack">{product.brand}</strong>
                    </span>
                    <span className="text-page-lightgray">|</span>
                    <span className={`inline-flex items-center gap-1 font-semibold ${isInStock ? 'text-emerald-700' : 'text-page-midgray'}`}>
                      {isInStock ? (
                        <>
                          <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
                          <span>In Stock (Immediate Dispatch)</span>
                        </>
                      ) : (
                        <>
                          <Clock className="h-3.5 w-3.5 text-page-midgray" />
                          <span>{product.availability || 'Available on Order'}</span>
                        </>
                      )}
                    </span>
                  </div>
                </div>

                {/* Short Description */}
                <p className="text-sm text-page-charcoal leading-relaxed">
                  {product.description || product.shortDescription}
                </p>

                {/* Key Specifications Grid */}
                {product.keySpecs && product.keySpecs.length > 0 && (
                  <div className="space-y-2">
                    <span className="text-xs font-mono font-bold uppercase tracking-wider text-page-nearblack block">
                      Key Technical Ratings:
                    </span>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 p-3.5 bg-page-offwhite rounded-md border border-page-lightgray font-technical">
                      {product.keySpecs.map((spec, sIdx) => (
                        <div key={sIdx} className="space-y-0.5">
                          <span className="text-[10px] uppercase font-mono text-page-midgray block truncate">
                            {spec.label}
                          </span>
                          <span className="text-sm font-bold text-page-nearblack block">
                            {spec.value} <span className="text-xs font-normal text-page-midgray">{spec.unit || ''}</span>
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* CTA Buttons */}
                <div className="pt-2 space-y-3">
                  <div className="flex flex-col sm:flex-row items-center gap-3">
                    <Button
                      variant="ev"
                      size="lg"
                      onClick={() => handleOpenQuote()}
                      className="w-full sm:flex-1 font-bold uppercase tracking-wider text-xs h-12 gap-2 shadow-xs"
                    >
                      <span>Request a Quote</span>
                      <ArrowRight className="h-4 w-4" />
                    </Button>

                    <Link href="/contact" className="w-full sm:flex-1">
                      <Button
                        variant="outline"
                        size="lg"
                        className="w-full font-bold uppercase tracking-wider text-xs h-12 gap-2 hover:border-ev-teal"
                      >
                        <Phone className="h-3.5 w-3.5" />
                        <span>Contact Technical Sales</span>
                      </Button>
                    </Link>

                    <Button
                      variant="ghost"
                      size="lg"
                      onClick={handleShare}
                      className="w-full sm:w-auto h-12 px-3 text-page-midgray hover:text-page-nearblack"
                      title="Share link"
                    >
                      <Share2 className="h-4 w-4" />
                      <span className="sm:hidden text-xs ml-2">Share Product</span>
                      {copiedLink && <span className="text-[10px] text-ev-teal ml-1">Copied!</span>}
                    </Button>
                  </div>

                  <p className="text-[11px] font-mono text-page-midgray">
                    Commercial quotation includes volume wholesale tier pricing, lead times, and freight calculations.
                  </p>
                </div>

                {/* Technical Downloads (mock brochure) */}
                <div className="pt-4 border-t border-page-lightgray flex flex-wrap items-center gap-4 text-xs font-mono">
                  <span className="text-page-midgray font-semibold">Technical Documentation:</span>
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      alert('Prototype specification datasheet download is available upon quote request.');
                    }}
                    className="inline-flex items-center gap-1.5 text-ev-teal hover:underline font-semibold"
                  >
                    <FileText className="h-3.5 w-3.5" />
                    <span>Download Engineering Datasheet (PDF)</span>
                  </a>
                </div>
              </div>
            </div>
          </Container>
        </section>

        {/* 4. Tabbed In-Depth Sections (Overview, Features, Specifications, Compatibility) */}
        <section className="py-12 bg-white">
          <Container>
            <Tabs defaultValue="specs" className="space-y-8">
              <TabsList className="w-full sm:w-auto flex flex-wrap bg-page-offwhite border border-page-lightgray p-1 rounded-md">
                <TabsTrigger value="specs" className="text-xs font-mono font-bold tracking-wider">
                  Technical Specifications
                </TabsTrigger>
                <TabsTrigger value="compatibility" className="text-xs font-mono font-bold tracking-wider">
                  Vehicle Compatibility
                </TabsTrigger>
                <TabsTrigger value="features" className="text-xs font-mono font-bold tracking-wider">
                  Features & Build
                </TabsTrigger>
                <TabsTrigger value="overview" className="text-xs font-mono font-bold tracking-wider">
                  Overview
                </TabsTrigger>
              </TabsList>

              {/* TAB 1: Specifications */}
              <TabsContent value="specs" className="p-6 rounded-lg border border-page-lightgray bg-white space-y-6">
                <EVSpecifications
                  specGroups={product.specGroups}
                  sku={product.sku}
                />
              </TabsContent>

              {/* TAB 2: Compatibility */}
              <TabsContent value="compatibility" className="p-6 rounded-lg border border-page-lightgray bg-white space-y-6">
                <EVCompatibility product={product} />
              </TabsContent>

              {/* TAB 3: Features */}
              <TabsContent value="features" className="p-6 rounded-lg border border-page-lightgray bg-white space-y-6">
                <div className="space-y-4">
                  <h4 className="text-sm font-bold text-page-nearblack uppercase tracking-wider font-mono">
                    Engineering Highlights & Build Quality
                  </h4>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs text-page-charcoal">
                    {product.features?.map((f, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 p-3 rounded bg-page-offwhite border border-page-lightgray/80">
                        <CheckCircle2 className="h-4 w-4 text-ev-teal shrink-0 mt-0.5" />
                        <span className="leading-relaxed">{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </TabsContent>

              {/* TAB 4: Overview */}
              <TabsContent value="overview" className="p-6 rounded-lg border border-page-lightgray bg-white space-y-4">
                <h4 className="text-sm font-bold text-page-nearblack uppercase tracking-wider font-mono">
                  Detailed Component Overview
                </h4>
                <p className="text-sm text-page-charcoal leading-relaxed">
                  {product.description || product.shortDescription}
                </p>
                <div className="pt-4 border-t border-page-lightgray text-xs text-page-midgray space-y-2">
                  <div className="font-semibold text-page-nearblack">About PAGE Electric Mobility Division:</div>
                  <p>
                    PAGE International provides end-to-end component sourcing, technical powertrain configuration, and retrofit workshop consulting for 2-wheeler and 3-wheeler commercial vehicles throughout South Asia.
                  </p>
                </div>
              </TabsContent>
            </Tabs>
          </Container>
        </section>

        {/* 5. Related Compatible EV Products */}
        {relatedProducts.length > 0 && (
          <section className="py-12 bg-page-offwhite border-t border-page-lightgray">
            <Container className="space-y-8">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-label text-ev-teal font-mono font-semibold tracking-wider block">
                    System Complement
                  </span>
                  <h3 className="text-2xl font-bold tracking-tight text-page-nearblack">
                    Related Powertrain Components
                  </h3>
                </div>

                <Link
                  href={`/ev-parts/${vehicleTypeParam}`}
                  className="text-xs font-mono font-bold text-ev-teal hover:underline flex items-center gap-1"
                >
                  <span>View Full {vehicleTypeParam.replace('-', ' ')} Catalog</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {relatedProducts.map((relProduct) => (
                  <EVProductCard
                    key={relProduct.id}
                    product={relProduct}
                    onOpenQuote={handleOpenQuote}
                    preferredVehicleType={vehicleTypeParam}
                  />
                ))}
              </div>
            </Container>
          </section>
        )}
      </main>

      {/* Global Footer */}
      <Footer />


      {/* Quote Request Modal */}
      <QuoteModal
        open={quoteOpen}
        onOpenChange={setQuoteOpen}
        product={modalProduct}
      />
    </div>
  );
}
