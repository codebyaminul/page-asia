'use client';

import * as React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Product } from '@/types';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowRight, CheckCircle2, Clock, Wrench } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onOpenQuote?: (product: Product) => void;
  className?: string;
}

export function ProductCard({ product, onOpenQuote, className }: ProductCardProps) {
  const primaryImage =
    product.images.find((img) => img.isPrimary) ||
    product.images[0] || {
      src: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&auto=format&fit=crop&q=80',
      alt: product.name,
    };

  const isInStock = product.availability === 'In Stock';
  const detailUrl = `/garage-equipment/${product.category}/${product.slug}`;

  return (
    <div
      className={`group relative flex flex-col justify-between bg-white rounded-md border border-page-lightgray hover:border-page-red/80 hover:shadow-lg transition-all duration-300 overflow-hidden ${className || ''}`}
    >
      {/* Top Media Area */}
      <div>
        <div className="relative aspect-4/3 w-full bg-page-offwhite overflow-hidden border-b border-page-lightgray/70">
          <Image
            src={primaryImage.src}
            alt={primaryImage.alt || product.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
          />

          {/* Badges Overlay */}
          <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
            <span className="inline-flex items-center px-2 py-0.5 text-[11px] font-bold font-mono tracking-wider bg-page-nearblack/90 backdrop-blur-xs text-white rounded-xs border border-page-darkgray">
              {product.brand}
            </span>

            {product.badge === 'featured' && (
              <Badge variant="red" className="text-[10px] tracking-wider">
                Featured
              </Badge>
            )}
            {product.badge === 'new' && (
              <Badge variant="default" className="text-[10px] tracking-wider bg-page-charcoal text-white">
                New Model
              </Badge>
            )}
          </div>

          {/* Quick SKU tag */}
          <div className="absolute bottom-2 left-3">
            <span className="text-[10px] font-mono font-semibold px-1.5 py-0.5 bg-black/75 text-page-lightgray rounded-xs">
              SKU: {product.sku}
            </span>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-5 space-y-3">
          {/* Category & Status */}
          <div className="flex items-center justify-between text-xs">
            <span className="text-label text-page-red font-semibold tracking-wider">
              {product.subcategory || product.category.replace(/-/g, ' ')}
            </span>
            <span
              className={`inline-flex items-center gap-1 font-mono text-[11px] font-medium ${
                isInStock ? 'text-emerald-700' : 'text-page-midgray'
              }`}
            >
              {isInStock ? (
                <>
                  <CheckCircle2 className="h-3 w-3 text-emerald-600" />
                  <span>In Stock</span>
                </>
              ) : (
                <>
                  <Clock className="h-3 w-3 text-page-midgray" />
                  <span>{product.availability || 'On Order'}</span>
                </>
              )}
            </span>
          </div>

          {/* Product Name */}
          <h3 className="text-base font-bold text-page-nearblack group-hover:text-page-red transition-colors line-clamp-2 leading-snug">
            <Link href={detailUrl}>
              {product.name}
            </Link>
          </h3>

          {/* Short Description */}
          <p className="text-xs text-page-midgray line-clamp-2 leading-relaxed">
            {product.shortDescription}
          </p>

          {/* Key Specifications Grid (Industrial 2-Column layout) */}
          {product.keySpecs && product.keySpecs.length > 0 && (
            <div className="pt-2 border-t border-page-lightgray/60">
              <div className="grid grid-cols-2 gap-1.5 p-2.5 bg-page-offwhite/90 rounded border border-page-lightgray/70 text-[11px] font-technical">
                {product.keySpecs.slice(0, 4).map((spec, sIdx) => (
                  <div key={sIdx} className="truncate">
                    <span className="text-page-midgray block text-[10px] uppercase font-mono">
                      {spec.label}:
                    </span>
                    <strong className="text-page-nearblack font-semibold">
                      {spec.value} {spec.unit || ''}
                    </strong>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Card Actions Footer */}
      <div className="p-5 pt-0 mt-2 border-t border-page-lightgray/40 flex items-center gap-2">
        <Link href={detailUrl} className="flex-1">
          <Button
            variant="outline"
            size="md"
            className="w-full text-xs font-semibold hover:border-page-nearblack transition-colors"
          >
            <span>View Details</span>
          </Button>
        </Link>

        <Button
          variant="primary"
          size="md"
          onClick={() => onOpenQuote && onOpenQuote(product)}
          className="flex-1 text-xs font-bold uppercase tracking-wider gap-1 shadow-xs"
        >
          <span>Quote</span>
          <ArrowRight className="h-3.5 w-3.5" />
        </Button>
      </div>
    </div>
  );
}
