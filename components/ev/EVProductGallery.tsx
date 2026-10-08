'use client';

import * as React from 'react';
import Image from 'next/image';
import { ProductImage } from '@/types';
import { Badge } from '@/components/ui/badge';
import { Zap, Maximize2 } from 'lucide-react';

interface EVProductGalleryProps {
  images: ProductImage[];
  productName: string;
  sku: string;
  badge?: string;
  vehicleTypeLabel?: string;
}

export function EVProductGallery({
  images,
  productName,
  sku,
  badge,
  vehicleTypeLabel,
}: EVProductGalleryProps) {
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  const activeImage = images[selectedIndex] ||
    images[0] || {
      src: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&auto=format&fit=crop&q=80',
      alt: productName,
    };

  return (
    <div className="space-y-4">
      {/* Main Image Container */}
      <div className="relative aspect-4/3 w-full bg-page-offwhite rounded-lg border border-page-lightgray overflow-hidden">
        <Image
          src={activeImage.src}
          alt={activeImage.alt || productName}
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover object-center transition-all duration-300"
        />

        {/* Overlay Badges */}
        <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none">
          {vehicleTypeLabel && (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-mono font-bold tracking-wider bg-page-nearblack/90 backdrop-blur-xs text-white rounded-xs border border-page-darkgray">
              <Zap className="h-3 w-3 text-ev-teal" />
              <span>{vehicleTypeLabel}</span>
            </span>
          )}

          {badge && (
            <Badge variant="ev" className="text-xs tracking-wider">
              {badge.toUpperCase()}
            </Badge>
          )}
        </div>

        {/* Bottom SKU Overlay */}
        <div className="absolute bottom-3 left-3">
          <span className="text-[11px] font-mono font-bold px-2 py-1 bg-black/80 text-white rounded-xs">
            SKU: {sku}
          </span>
        </div>
      </div>

      {/* Thumbnails (if multiple images) */}
      {images.length > 1 && (
        <div className="flex items-center gap-3 overflow-x-auto pb-1">
          {images.map((img, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setSelectedIndex(idx)}
              className={`relative w-20 h-20 rounded border-2 overflow-hidden shrink-0 transition-all ${
                selectedIndex === idx
                  ? 'border-ev-teal ring-2 ring-ev-teal/20'
                  : 'border-page-lightgray hover:border-page-midgray opacity-70 hover:opacity-100'
              }`}
            >
              <Image
                src={img.src}
                alt={img.alt || `${productName} view ${idx + 1}`}
                fill
                sizes="80px"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
