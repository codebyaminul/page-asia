'use client';

import * as React from 'react';
import { useParams, useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Container } from '@/components/layout/Container';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { EVProductGrid } from '@/components/ev/EVProductGrid';
import { EVProductFilters, EVFilterState } from '@/components/ev/EVProductFilters';
import { QuoteModal } from '@/components/garage/QuoteModal';
import { evVehicleTypes, getEVVehicleTypeBySlug } from '@/data/ev-vehicle-types';
import { evCategories } from '@/data/categories';
import { evProducts } from '@/data/products/ev-parts';
import { Product } from '@/types';
import {
  Bike,
  Truck,
  Zap,
  Search,
  Filter,
  ArrowLeft,
  ChevronRight,
  SlidersHorizontal,
  X,
} from 'lucide-react';

function EVPartsCatalogContent() {
  const params = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();

  // Normalize route param: could be '2-wheeler', '3-wheeler', 'all', or a category slug
  const rawParam = (params?.vehicleType as string) || 'all';
  const isVehicleType = rawParam === '2-wheeler' || rawParam === '3-wheeler';
  const initialCategoryParam = searchParams.get('category') || (!isVehicleType && rawParam !== 'all' ? rawParam : 'all');
  const initialSearchParam = searchParams.get('q') || '';

  const vehicleInfo = getEVVehicleTypeBySlug(rawParam);

  const [quoteOpen, setQuoteOpen] = React.useState(false);
  const [selectedProduct, setSelectedProduct] = React.useState<Product | null>(null);
  const [mobileFiltersOpen, setMobileFiltersOpen] = React.useState(false);

  // Filter state
  const [filters, setFilters] = React.useState<EVFilterState>({
    vehicleType: isVehicleType ? rawParam : 'all',
    category: initialCategoryParam,
    voltages: [],
    availability: 'all',
    searchQuery: initialSearchParam,
  });

  // Keep state synced if URL vehicleType param changes
  React.useEffect(() => {
    if (isVehicleType) {
      setFilters((prev) => ({ ...prev, vehicleType: rawParam }));
    }
  }, [rawParam, isVehicleType]);

  // Keep category synced if query param changes
  React.useEffect(() => {
    const qCat = searchParams.get('category');
    if (qCat) {
      setFilters((prev) => ({ ...prev, category: qCat }));
    }
  }, [searchParams]);

  // Handlers
  const handleOpenQuote = (product?: Product) => {
    setSelectedProduct(product || null);
    setQuoteOpen(true);
  };

  const handleResetFilters = () => {
    setFilters({
      vehicleType: isVehicleType ? rawParam : 'all',
      category: 'all',
      voltages: [],
      availability: 'all',
      searchQuery: '',
    });
  };

  // Filter evaluation logic
  const filteredProducts = React.useMemo(() => {
    return evProducts.filter((product) => {
      // 1. Vehicle Platform
      if (filters.vehicleType !== 'all') {
        const matchesVeh =
          product.vehicleCompatibility?.includes(filters.vehicleType as any) ||
          product.vehicleCompatibility?.includes('both');
        if (!matchesVeh) return false;
      }

      // 2. Component Category
      if (filters.category !== 'all') {
        if (product.category !== filters.category) return false;
      }

      // 3. Voltages
      if (filters.voltages.length > 0) {
        const productVoltString = (
          (product.keySpecs || []).map((s) => `${s.label} ${s.value} ${s.unit || ''}`).join(' ') +
          ' ' +
          product.name +
          ' ' +
          product.shortDescription
        ).toLowerCase();

        const matchesAnyVoltage = filters.voltages.some((v) =>
          productVoltString.includes(v.toLowerCase())
        );
        if (!matchesAnyVoltage) return false;
      }

      // 4. Availability
      if (filters.availability === 'in-stock') {
        if (product.availability !== 'In Stock') return false;
      }

      // 5. Search Query (matches name, category, description, sku, specs)
      if (filters.searchQuery.trim()) {
        const q = filters.searchQuery.toLowerCase();
        const fullSearchBlob = (
          product.name +
          ' ' +
          product.sku +
          ' ' +
          product.category +
          ' ' +
          product.shortDescription +
          ' ' +
          product.description +
          ' ' +
          (product.keySpecs || []).map((s) => `${s.label} ${s.value}`).join(' ') +
          ' ' +
          (product.vehicleCompatibility || []).join(' ')
        ).toLowerCase();

        if (!fullSearchBlob.includes(q)) return false;
      }

      return true;
    });
  }, [filters]);

  // Dynamic Page Header Info
  const pageTitle =
    filters.vehicleType === '2-wheeler'
      ? '2-Wheeler EV Parts'
      : filters.vehicleType === '3-wheeler'
      ? '3-Wheeler EV Parts'
      : 'All EV Powertrains & Components';

  const pageSubtitle =
    filters.vehicleType === '2-wheeler'
      ? 'Components for electric motorcycles, scooters, mopeds, and e-bikes. Hub motors, vector controllers, 48V/60V lithium battery systems, and plug-and-play wiring.'
      : filters.vehicleType === '3-wheeler'
      ? 'Heavy-duty powertrains for commercial electric rickshaws and cargo loaders. Differential motors, 45A–120A CAN bus vector drives, 60V/72V deep-cycle LiFePO4 packs, and fleet chargers.'
      : 'Comprehensive B2B catalog of electric vehicle powertrains, controllers, lithium batteries, chargers, and workshop components for 2-wheeler and 3-wheeler mobility.';

  return (
    <div className="min-h-screen flex flex-col bg-page-offwhite">
      {/* 1. Global Navigation */}
      <Navbar onOpenQuote={() => handleOpenQuote()} />

      <main className="flex-1 pb-16">
        {/* 2. Breadcrumbs & Header */}
        <section className="bg-page-nearblack text-white pt-8 pb-10 border-b border-page-darkgray">
          <Container>
            <div className="space-y-4">
              {/* Breadcrumbs */}
              <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-mono text-page-midgray">
                <Link href="/" className="hover:text-white transition-colors">
                  Home
                </Link>
                <ChevronRight className="h-3.5 w-3.5" />
                <Link href="/ev-parts" className="hover:text-white transition-colors">
                  EV Parts
                </Link>
                <ChevronRight className="h-3.5 w-3.5 text-ev-teal" />
                <span className="text-white font-semibold">
                  {pageTitle}
                </span>
              </nav>

              <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pt-2">
                <div className="space-y-2 max-w-3xl">
                  <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-ev-teal/15 border border-ev-teal/30 text-ev-tealLight text-xs font-mono">
                    {filters.vehicleType === '3-wheeler' ? (
                      <Truck className="h-3.5 w-3.5 text-ev-teal" />
                    ) : (
                      <Bike className="h-3.5 w-3.5 text-ev-teal" />
                    )}
                    <span>{vehicleInfo ? vehicleInfo.badge : 'Full EV Catalog'}</span>
                  </div>

                  <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
                    {pageTitle}
                  </h1>

                  <p className="text-sm text-page-midgray leading-relaxed max-w-2xl">
                    {pageSubtitle}
                  </p>
                </div>

                {/* Quick Vehicle Switcher Tabs */}
                <div className="inline-flex rounded-md p-1 bg-page-charcoal border border-page-darkgray shrink-0 font-mono text-xs">
                  <button
                    type="button"
                    onClick={() => {
                      setFilters({ ...filters, vehicleType: '2-wheeler' });
                      router.push('/ev-parts/2-wheeler');
                    }}
                    className={`px-3 py-1.5 rounded transition-all flex items-center gap-1.5 ${
                      filters.vehicleType === '2-wheeler'
                        ? 'bg-ev-teal text-white font-bold shadow-xs'
                        : 'text-page-midgray hover:text-white'
                    }`}
                  >
                    <Bike className="h-3.5 w-3.5" />
                    <span>2-Wheeler</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setFilters({ ...filters, vehicleType: '3-wheeler' });
                      router.push('/ev-parts/3-wheeler');
                    }}
                    className={`px-3 py-1.5 rounded transition-all flex items-center gap-1.5 ${
                      filters.vehicleType === '3-wheeler'
                        ? 'bg-ev-teal text-white font-bold shadow-xs'
                        : 'text-page-midgray hover:text-white'
                    }`}
                  >
                    <Truck className="h-3.5 w-3.5" />
                    <span>3-Wheeler</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setFilters({ ...filters, vehicleType: 'all' });
                    }}
                    className={`px-3 py-1.5 rounded transition-all flex items-center gap-1.5 ${
                      filters.vehicleType === 'all'
                        ? 'bg-ev-teal text-white font-bold shadow-xs'
                        : 'text-page-midgray hover:text-white'
                    }`}
                  >
                    <Zap className="h-3.5 w-3.5" />
                    <span>All</span>
                  </button>
                </div>
              </div>
            </div>
          </Container>
        </section>

        {/* 3. Component Horizontal Quick Filter Bar */}
        <div className="bg-white border-b border-page-lightgray py-3 sticky top-16 z-20 shadow-xs">
          <Container>
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
              <span className="text-[11px] font-mono uppercase text-page-midgray shrink-0 mr-1 font-semibold">
                Component:
              </span>

              <button
                type="button"
                onClick={() => setFilters({ ...filters, category: 'all' })}
                className={`px-3 py-1.5 rounded-full text-xs font-mono whitespace-nowrap transition-all border ${
                  filters.category === 'all'
                    ? 'bg-page-nearblack text-white border-page-nearblack font-bold'
                    : 'bg-page-offwhite text-page-charcoal border-page-lightgray hover:border-page-midgray'
                }`}
              >
                All Systems ({evProducts.length})
              </button>

              {evCategories.map((cat) => {
                const isSelected = filters.category === cat.slug;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setFilters({ ...filters, category: cat.slug })}
                    className={`px-3 py-1.5 rounded-full text-xs font-mono whitespace-nowrap transition-all border ${
                      isSelected
                        ? 'bg-ev-teal text-white border-ev-teal font-bold shadow-xs'
                        : 'bg-page-offwhite text-page-charcoal border-page-lightgray hover:border-page-midgray'
                    }`}
                  >
                    {cat.name}
                  </button>
                );
              })}
            </div>
          </Container>
        </div>

        {/* 4. Main Catalog Body (Sidebar + Product Grid) */}
        <Container className="pt-8">
          {/* Search + Mobile Filter Trigger Bar */}
          <div className="mb-6 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-page-midgray" />
              <Input
                type="text"
                placeholder="Search by keyword, voltage (e.g. 48V, 60V), power, SKU..."
                value={filters.searchQuery}
                onChange={(e) =>
                  setFilters({ ...filters, searchQuery: e.target.value })
                }
                className="pl-9 pr-9 bg-white text-xs"
              />
              {filters.searchQuery && (
                <button
                  type="button"
                  onClick={() => setFilters({ ...filters, searchQuery: '' })}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-page-midgray hover:text-page-nearblack"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              )}
            </div>

            {/* Mobile Filter Toggle & Quick Info */}
            <div className="flex items-center justify-between sm:justify-end gap-3">
              <span className="text-xs font-mono text-page-midgray">
                Showing <strong className="text-page-nearblack">{filteredProducts.length}</strong> components
              </span>

              <Button
                variant="outline"
                size="sm"
                onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
                className="lg:hidden text-xs gap-1.5"
              >
                <SlidersHorizontal className="h-3.5 w-3.5 text-ev-teal" />
                <span>Filters</span>
              </Button>
            </div>
          </div>

          {/* Catalog Layout Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Filter Sidebar (Desktop) */}
            <div className="hidden lg:block lg:col-span-1">
              <div className="sticky top-32">
                <EVProductFilters
                  filters={filters}
                  onFilterChange={setFilters}
                  onReset={handleResetFilters}
                  totalCount={filteredProducts.length}
                />
              </div>
            </div>

            {/* Mobile Filter Drawer Overlay */}
            {mobileFiltersOpen && (
              <div className="fixed inset-0 z-50 bg-black/50 lg:hidden flex justify-end">
                <div className="w-full max-w-xs bg-white h-full p-5 overflow-y-auto space-y-4">
                  <div className="flex items-center justify-between border-b pb-3">
                    <span className="font-bold text-sm uppercase font-mono">Catalog Filters</span>
                    <button
                      onClick={() => setMobileFiltersOpen(false)}
                      className="p-1 text-page-midgray hover:text-black"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>
                  <EVProductFilters
                    filters={filters}
                    onFilterChange={setFilters}
                    onReset={handleResetFilters}
                    totalCount={filteredProducts.length}
                  />
                  <Button
                    variant="ev"
                    size="md"
                    onClick={() => setMobileFiltersOpen(false)}
                    className="w-full"
                  >
                    View {filteredProducts.length} Results
                  </Button>
                </div>
              </div>
            )}

            {/* Products Grid (Desktop 3-col, Mobile 1-col) */}
            <div className="lg:col-span-3">
              <EVProductGrid
                products={filteredProducts}
                onOpenQuote={handleOpenQuote}
                preferredVehicleType={filters.vehicleType !== 'all' ? filters.vehicleType : '2-wheeler'}
                onResetFilters={handleResetFilters}
              />
            </div>
          </div>
        </Container>
      </main>

      {/* Global Footer */}
      <Footer />


      {/* Quote Modal */}
      <QuoteModal
        open={quoteOpen}
        onOpenChange={setQuoteOpen}
        product={selectedProduct}
      />
    </div>
  );
}

export default function EVPartsCatalogPage() {
  return (
    <React.Suspense fallback={<div className="min-h-screen bg-page-offwhite flex items-center justify-center font-mono text-xs text-page-midgray">Loading EV Parts Catalog...</div>}>
      <EVPartsCatalogContent />
    </React.Suspense>
  );
}
