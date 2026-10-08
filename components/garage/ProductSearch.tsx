'use client';

import * as React from 'react';
import { Input } from '@/components/ui/input';
import { Search, X } from 'lucide-react';

interface ProductSearchProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export function ProductSearch({
  value,
  onChange,
  placeholder = 'Search equipment by name, category, brand, or SKU...',
  className = '',
}: ProductSearchProps) {
  return (
    <div className={`relative flex-1 ${className}`}>
      <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-page-midgray pointer-events-none" />
      <Input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="pl-10 pr-9 h-11 bg-white border-page-lightgray text-page-nearblack placeholder:text-page-midgray/70 focus-visible:border-page-red text-sm rounded-md shadow-xs"
      />
      {value && (
        <button
          type="button"
          onClick={() => onChange('')}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-page-midgray hover:text-page-nearblack p-1 cursor-pointer transition-colors"
          aria-label="Clear search"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  );
}
