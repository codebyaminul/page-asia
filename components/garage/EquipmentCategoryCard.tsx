'use client';

import * as React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Category } from '@/types';
import { ArrowRight, Layers } from 'lucide-react';

interface EquipmentCategoryCardProps {
  category: Category;
}

export function EquipmentCategoryCard({ category }: EquipmentCategoryCardProps) {
  return (
    <Link
      href={`/garage-equipment/${category.slug}`}
      className="group relative flex flex-col justify-between bg-page-nearblack rounded-md border border-page-darkgray hover:border-page-red transition-all duration-300 overflow-hidden shadow-sm"
    >
      {/* Background Category Image with dark overlay */}
      <div className="relative aspect-16/10 w-full overflow-hidden bg-page-charcoal">
        {category.image ? (
          <Image
            src={category.image}
            alt={category.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out opacity-60 group-hover:opacity-75"
          />
        ) : (
          <div className="w-full h-full bg-page-charcoal flex items-center justify-center text-page-midgray">
            <Layers className="h-10 w-10 opacity-30" />
          </div>
        )}

        {/* Gradient vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-page-nearblack via-page-nearblack/40 to-transparent" />

        {/* Product Count Pill */}
        <div className="absolute top-3 right-3">
          <span className="inline-flex items-center px-2 py-0.5 text-[10px] font-mono font-bold tracking-wider uppercase bg-black/80 backdrop-blur-xs text-page-lightgray border border-page-darkgray rounded-xs">
            {category.productCount} Models
          </span>
        </div>
      </div>

      {/* Text Area */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-1.5">
          <h3 className="text-lg font-bold text-white group-hover:text-page-red transition-colors flex items-center justify-between">
            <span>{category.name}</span>
          </h3>
          <p className="text-xs text-page-lightgray/70 line-clamp-2 leading-relaxed">
            {category.description}
          </p>
        </div>

        <div className="pt-3 border-t border-page-darkgray/70 flex items-center justify-between text-xs font-bold text-page-lightgray group-hover:text-page-red transition-colors">
          <span className="uppercase tracking-wider text-[11px]">Explore Category</span>
          <ArrowRight className="h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </Link>
  );
}
