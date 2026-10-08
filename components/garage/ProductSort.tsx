'use client';

import * as React from 'react';
import { Select } from '@/components/ui/select';
import { FilterState } from './ProductFilters';
import { ArrowUpDown } from 'lucide-react';

interface ProductSortProps {
  value: FilterState['sortBy'];
  onChange: (sort: FilterState['sortBy']) => void;
  className?: string;
}

export function ProductSort({ value, onChange, className = '' }: ProductSortProps) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <span className="text-xs font-mono uppercase tracking-wider text-page-midgray whitespace-nowrap hidden sm:inline-block">
        Sort By:
      </span>
      <div className="w-44">
        <Select
          value={value}
          onChange={(e) => onChange(e.target.value as FilterState['sortBy'])}
          className="h-11 text-xs font-medium bg-white"
        >
          <option value="relevance">Relevance</option>
          <option value="featured">Featured First</option>
          <option value="newest">Newest Models</option>
          <option value="name-asc">Name (A – Z)</option>
        </Select>
      </div>
    </div>
  );
}
