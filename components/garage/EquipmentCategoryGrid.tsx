'use client';

import * as React from 'react';
import { garageCategories } from '@/data/categories';
import { EquipmentCategoryCard } from './EquipmentCategoryCard';

export function EquipmentCategoryGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {garageCategories.map((category) => (
        <EquipmentCategoryCard key={category.id} category={category} />
      ))}
    </div>
  );
}
