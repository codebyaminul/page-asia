import { Category, Division } from '@/types';
import { allCategories, garageCategories, evCategories } from '@/data/categories';

export function getAllCategories(): Category[] {
  return allCategories;
}

export function getCategoriesByDivision(division: Division): Category[] {
  return division === 'garage-equipment' ? garageCategories : evCategories;
}

export function getCategoryBySlug(slug: string): Category | undefined {
  return allCategories.find((c) => c.slug === slug);
}
