'use client';

import * as React from 'react';
import { Product } from '@/types';
import { ProductCard } from './ProductCard';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

interface RelatedProductsProps {
  products: Product[];
  currentCategory: string;
  onOpenQuote?: (product: Product) => void;
}

export function RelatedProducts({
  products,
  currentCategory,
  onOpenQuote,
}: RelatedProductsProps) {
  if (!products || products.length === 0) return null;

  return (
    <section className="pt-16 border-t border-page-lightgray">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
        <div>
          <span className="text-label text-page-red block mb-1">
            Compatible Workshop Equipment
          </span>
          <h2 className="text-2xl font-bold text-page-nearblack tracking-tight">
            Related Equipment
          </h2>
        </div>

        <Link
          href={`/garage-equipment/${currentCategory}`}
          className="text-xs font-bold text-page-red hover:underline inline-flex items-center gap-1 uppercase tracking-wider"
        >
          <span>View All in this Category</span>
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onOpenQuote={onOpenQuote}
          />
        ))}
      </div>
    </section>
  );
}
