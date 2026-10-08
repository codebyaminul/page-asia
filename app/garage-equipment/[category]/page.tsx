'use client';

import * as React from 'react';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Container } from '@/components/layout/Container';
import { PageHeader } from '@/components/layout/PageHeader';
import { ProductFilters, FilterState } from '@/components/garage/ProductFilters';
import { ProductSearch } from '@/components/garage/ProductSearch';
import { ProductSort } from '@/components/garage/ProductSort';
import { ProductGrid } from '@/components/garage/ProductGrid';
import { QuoteModal } from '@/components/garage/QuoteModal';
import { garageProducts } from '@/data/products/garage-equipment';
import { garageCategories } from '@/data/categories';
import { Product } from '@/types';
import { Button } from '@/components/ui/button';
import { Sheet, SheetHeader, SheetClose } from '@/components/ui/sheet';
import { Filter, SlidersHorizontal, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function GarageEquipmentListingPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();

  const routeCategory = (params?.category as string) || 'all';

  // State for quote modal
  const [isQuoteOpen, setIsQuoteOpen] = React.useState(false);
  const [selectedProduct, setSelectedProduct] = React.useState<Product | null>(null);

  // State for mobile filter sheet
  const [isMobileFilterOpen, setIsMobileFilterOpen] = React.useState(false);

  // Filter state
  const [filters, setFilters] = React.useState<FilterState>({
    category: routeCategory === 'all' ? 'all' : routeCategory,
    subcategory: 'all',
    brand: 'all',
    equipmentType: 'all',
    application: 'all',
    availability: 'all',
    searchQuery: searchParams.get('search') || '',
    sortBy: 'relevance',
  });

  // Keep category in sync if URL route changes
  React.useEffect(() => {
    if (routeCategory && routeCategory !== 'all') {
      setFilters((prev) => ({ ...prev, category: routeCategory }));
    } else {
      setFilters((prev) => ({ ...prev, category: 'all' }));
    }
  }, [routeCategory]);

  const activeCategoryObj = garageCategories.find((c) => c.slug === filters.category);

  // Header Title & Description
  const pageTitle = activeCategoryObj
    ? activeCategoryObj.name
    : 'All Garage Equipment';

  const pageDescription = activeCategoryObj
    ? activeCategoryObj.description
    : 'Comprehensive commercial equipment catalog for automotive workshops, dealerships, and specialty tyre centers.';

  // Breadcrumbs
  const breadcrumbs = [
    { label: 'Garage Equipment', href: '/garage-equipment' },
    ...(activeCategoryObj ? [{ label: activeCategoryObj.name }] : [{ label: 'All Equipment' }]),
  ];

  // Filtering Logic
  const filteredProducts = React.useMemo(() => {
    return garageProducts.filter((product) => {
      if (!product.isActive) return false;

      // Category filter
      if (filters.category !== 'all' && product.category !== filters.category) {
        return false;
      }

      // Subcategory filter
      if (filters.subcategory !== 'all' && product.subcategory !== filters.subcategory) {
        return false;
      }

      // Brand filter
      if (filters.brand !== 'all' && product.brand !== filters.brand) {
        return false;
      }

      // Equipment type filter
      if (filters.equipmentType !== 'all' && product.equipmentType !== filters.equipmentType) {
        return false;
      }

      // Application filter
      if (filters.application !== 'all' && product.application !== filters.application) {
        return false;
      }

      // Availability filter
      if (filters.availability !== 'all' && product.availability !== filters.availability) {
        return false;
      }

      // Search query filter
      if (filters.searchQuery.trim()) {
        const q = filters.searchQuery.trim().toLowerCase();
        const matchesName = product.name.toLowerCase().includes(q);
        const matchesBrand = product.brand.toLowerCase().includes(q);
        const matchesCategory = product.category.toLowerCase().includes(q);
        const matchesSubcategory = product.subcategory?.toLowerCase().includes(q);
        const matchesSku = product.sku.toLowerCase().includes(q);
        const matchesDesc = product.shortDescription.toLowerCase().includes(q);
        const matchesType = product.equipmentType?.toLowerCase().includes(q);

        if (
          !matchesName &&
          !matchesBrand &&
          !matchesCategory &&
          !matchesSubcategory &&
          !matchesSku &&
          !matchesDesc &&
          !matchesType
        ) {
          return false;
        }
      }

      return true;
    });
  }, [filters]);

  // Sorting Logic
  const sortedProducts = React.useMemo(() => {
    const list = [...filteredProducts];
    switch (filters.sortBy) {
      case 'newest':
        return list.sort((a, b) => (b.badge === 'new' ? 1 : 0) - (a.badge === 'new' ? 1 : 0));
      case 'featured':
        return list.sort((a, b) => (b.badge === 'featured' ? 1 : 0) - (a.badge === 'featured' ? 1 : 0));
      case 'name-asc':
        return list.sort((a, b) => a.name.localeCompare(b.name));
      case 'relevance':
      default:
        return list;
    }
  }, [filteredProducts, filters.sortBy]);

  const handleResetFilters = () => {
    setFilters({
      category: 'all',
      subcategory: 'all',
      brand: 'all',
      equipmentType: 'all',
      application: 'all',
      availability: 'all',
      searchQuery: '',
      sortBy: 'relevance',
    });
    if (routeCategory !== 'all') {
      router.push('/garage-equipment/all');
    }
  };

  const handleOpenQuote = (product?: Product) => {
    setSelectedProduct(product || null);
    setIsQuoteOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-page-nearblack">
      {/* 1. Global Navigation */}
      <Navbar onOpenQuoteModal={() => handleOpenQuote()} />

      <main className="flex-1">
        {/* 2. Structured Page Header */}
        <PageHeader
          title={pageTitle}
          subtitle={pageDescription}
          breadcrumbs={breadcrumbs}
          badge="Official Garage Equipment Catalog"
          theme="dark"
        />

        {/* 3. Main Discovery Workspace */}
        <div className="py-10 md:py-16 bg-white border-b border-page-lightgray">
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* ── DESKTOP FILTER SIDEBAR (col-span-3) ── */}
              <aside className="hidden lg:block lg:col-span-3 sticky top-24 bg-white p-5 rounded-md border border-page-lightgray shadow-xs">
                <ProductFilters
                  filters={filters}
                  onFilterChange={setFilters}
                  onResetFilters={handleResetFilters}
                  totalFilteredCount={sortedProducts.length}
                  totalCount={garageProducts.length}
                />
              </aside>

              {/* ── PRODUCT CONTENT WORKSPACE (col-span-9) ── */}
              <div className="lg:col-span-9 space-y-6">
                {/* Search, Sort & Mobile Filter Trigger Bar */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 p-4 bg-page-offwhite rounded-md border border-page-lightgray">
                  {/* Search Input */}
                  <ProductSearch
                    value={filters.searchQuery}
                    onChange={(searchQuery) =>
                      setFilters((prev) => ({ ...prev, searchQuery }))
                    }
                  />

                  {/* Actions Right */}
                  <div className="flex items-center gap-3 shrink-0">
                    {/* Mobile Filter Button */}
                    <Button
                      variant="outline"
                      size="md"
                      onClick={() => setIsMobileFilterOpen(true)}
                      className="lg:hidden flex items-center gap-1.5 text-xs font-semibold h-11"
                    >
                      <SlidersHorizontal className="h-4 w-4 text-page-red" />
                      <span>Filters</span>
                      {filteredProducts.length < garageProducts.length && (
                        <span className="w-2 h-2 rounded-full bg-page-red ml-1" />
                      )}
                    </Button>

                    {/* Sort Selector */}
                    <ProductSort
                      value={filters.sortBy}
                      onChange={(sortBy) =>
                        setFilters((prev) => ({ ...prev, sortBy }))
                      }
                    />
                  </div>
                </div>

                {/* Live Count Line */}
                <div className="flex items-center justify-between text-xs font-mono text-page-midgray px-1">
                  <div>
                    Showing <strong className="text-page-nearblack">{sortedProducts.length}</strong> of{' '}
                    <strong className="text-page-nearblack">{garageProducts.length}</strong> equipment models
                  </div>
                  {filters.category !== 'all' && (
                    <Link
                      href="/garage-equipment"
                      className="text-page-red font-semibold hover:underline inline-flex items-center gap-1"
                    >
                      <ArrowLeft className="h-3 w-3" />
                      <span>Back to Category Directory</span>
                    </Link>
                  )}
                </div>

                {/* Product Grid Results */}
                <ProductGrid
                  products={sortedProducts}
                  filters={filters}
                  onFilterChange={setFilters}
                  onResetFilters={handleResetFilters}
                  onOpenQuote={handleOpenQuote}
                />
              </div>
            </div>
          </Container>
        </div>
      </main>

      {/* Mobile Filter Drawer */}
      <Sheet open={isMobileFilterOpen} onOpenChange={setIsMobileFilterOpen} side="left">
        <SheetHeader className="bg-page-nearblack">
          <div className="flex items-center gap-2 text-white font-bold text-sm uppercase tracking-wider">
            <Filter className="h-4 w-4 text-page-red" />
            <span>Filter Equipment</span>
          </div>
          <SheetClose onClick={() => setIsMobileFilterOpen(false)} />
        </SheetHeader>

        <div className="flex-1 overflow-y-auto p-5 bg-white text-page-nearblack">
          <ProductFilters
            filters={filters}
            onFilterChange={(newFilters) => {
              setFilters(newFilters);
            }}
            onResetFilters={() => {
              handleResetFilters();
              setIsMobileFilterOpen(false);
            }}
            totalFilteredCount={sortedProducts.length}
            totalCount={garageProducts.length}
          />
        </div>

        <div className="p-4 bg-page-offwhite border-t border-page-lightgray shrink-0">
          <Button
            variant="primary"
            size="lg"
            onClick={() => setIsMobileFilterOpen(false)}
            className="w-full font-bold uppercase tracking-wider text-xs"
          >
            Show {sortedProducts.length} Results
          </Button>
        </div>
      </Sheet>

      {/* Quote Dialog */}
      <QuoteModal
        open={isQuoteOpen}
        onOpenChange={setIsQuoteOpen}
        product={selectedProduct}
      />

      {/* 4. Global Footer */}
      <Footer />
    </div>
  );
}
