'use client';

import * as React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Category } from '@/types';
import { ArrowRight, Zap } from 'lucide-react';

interface EVComponentCardProps {
  category: Category;
  vehicleTypeFilter?: string;
}

export function EVComponentCard({ category, vehicleTypeFilter }: EVComponentCardProps) {
  const targetHref = vehicleTypeFilter
    ? `/ev-parts/${vehicleTypeFilter}?category=${category.slug}`
    : `/ev-parts/2-wheeler?category=${category.slug}`;

  const imageSrc =
    category.image ||
    'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&auto=format&fit=crop&q=80';

  return (
    <Link
      href={targetHref}
      className="group relative flex flex-col justify-between bg-white rounded-md border border-page-lightgray hover:border-ev-teal hover:shadow-md transition-all duration-300 overflow-hidden"
    >
      <div>
        {/* Media Thumbnail */}
        <div className="relative aspect-16/10 w-full bg-page-offwhite overflow-hidden border-b border-page-lightgray/80">
          <Image
            src={imageSrc}
            alt={category.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-page-nearblack/80 via-page-nearblack/20 to-transparent" />

          {/* Category Tag on overlay */}
          <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
            <span className="text-white font-bold text-sm tracking-wide group-hover:text-ev-tealLight transition-colors">
              {category.name}
            </span>
            <span className="text-[10px] font-mono px-2 py-0.5 bg-black/70 text-page-lightgray rounded-xs border border-page-darkgray/80">
              {category.productCount} models
            </span>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-4 space-y-2">
          <p className="text-xs text-page-midgray line-clamp-2 leading-relaxed">
            {category.description}
          </p>
        </div>
      </div>

      {/* Footer Explore Link */}
      <div className="p-4 pt-0 mt-2 flex items-center justify-between text-xs font-mono font-semibold text-page-nearblack group-hover:text-ev-teal transition-colors">
        <span>Explore Specifications</span>
        <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
      </div>
    </Link>
  );
}
