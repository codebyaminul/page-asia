import { Product, Division } from '@/types';
import { garageProducts } from '@/data/products/garage-equipment';
import { evProducts } from '@/data/products/ev-parts';

export const allProducts: Product[] = [...garageProducts, ...evProducts];

export function getAllProducts(): Product[] {
  return allProducts.filter((p) => p.isActive);
}

export function getProductBySlug(slug: string): Product | undefined {
  return allProducts.find((p) => p.slug === slug && p.isActive);
}

export function getProductsByDivision(division: Division): Product[] {
  return allProducts.filter((p) => p.division === division && p.isActive);
}

export function getProductsByCategory(categorySlug: string): Product[] {
  return allProducts.filter((p) => p.category === categorySlug && p.isActive);
}

export function getFeaturedProducts(division?: Division, limit = 6): Product[] {
  let list = allProducts.filter((p) => p.isActive && p.badge === 'featured');
  if (division) {
    list = list.filter((p) => p.division === division);
  }
  return list.slice(0, limit);
}

export function getRelatedProducts(product: Product, limit = 4): Product[] {
  return allProducts
    .filter(
      (p) =>
        p.isActive &&
        p.id !== product.id &&
        (p.category === product.category || p.division === product.division)
    )
    .slice(0, limit);
}
