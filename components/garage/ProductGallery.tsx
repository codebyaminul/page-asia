'use client';

import * as React from 'react';
import Image from 'next/image';
import { ProductImage } from '@/types';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';

interface ProductGalleryProps {
  images: ProductImage[];
  productName: string;
}

export function ProductGallery({ images, productName }: ProductGalleryProps) {
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  const displayImages = images.length > 0 ? images : [
    {
      src: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&auto=format&fit=crop&q=80',
      alt: productName,
      isPrimary: true,
    },
  ];

  const currentImage = displayImages[selectedIndex] || displayImages[0];

  const handlePrev = () => {
    setSelectedIndex((prev) => (prev === 0 ? displayImages.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setSelectedIndex((prev) => (prev === displayImages.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="space-y-4 select-none">
      {/* Main Image Stage */}
      <div className="relative aspect-4/3 w-full bg-page-offwhite rounded-md border border-page-lightgray overflow-hidden shadow-xs">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentImage.src}
            initial={{ opacity: 0.2 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0.2 }}
            transition={{ duration: 0.25 }}
            className="relative w-full h-full"
          >
            <Image
              src={currentImage.src}
              alt={currentImage.alt || productName}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover object-center"
            />
          </motion.div>
        </AnimatePresence>

        {/* Gallery Image Index indicator */}
        <div className="absolute bottom-3 right-3 px-2.5 py-1 bg-page-nearblack/80 backdrop-blur-xs text-white rounded-xs text-[11px] font-mono">
          {selectedIndex + 1} / {displayImages.length}
        </div>

        {/* Next / Prev Controls if more than 1 image */}
        {displayImages.length > 1 && (
          <>
            <button
              type="button"
              onClick={handlePrev}
              className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/90 backdrop-blur-xs border border-page-lightgray text-page-nearblack flex items-center justify-center hover:bg-page-red hover:text-white transition-colors cursor-pointer shadow-md"
              aria-label="Previous image"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={handleNext}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/90 backdrop-blur-xs border border-page-lightgray text-page-nearblack flex items-center justify-center hover:bg-page-red hover:text-white transition-colors cursor-pointer shadow-md"
              aria-label="Next image"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </>
        )}
      </div>

      {/* Thumbnails Row */}
      {displayImages.length > 1 && (
        <div className="flex items-center gap-3 overflow-x-auto pb-1">
          {displayImages.map((image, idx) => {
            const isSelected = idx === selectedIndex;
            return (
              <button
                key={idx}
                type="button"
                onClick={() => setSelectedIndex(idx)}
                className={`relative w-20 h-16 shrink-0 rounded-md overflow-hidden border-2 transition-all cursor-pointer ${
                  isSelected
                    ? 'border-page-red ring-2 ring-page-red/20 scale-102'
                    : 'border-page-lightgray hover:border-page-midgray opacity-70 hover:opacity-100'
                }`}
              >
                <Image
                  src={image.src}
                  alt={image.alt || `${productName} thumbnail ${idx + 1}`}
                  fill
                  sizes="80px"
                  className="object-cover object-center"
                />
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
