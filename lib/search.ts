import { Product } from '@/types';
import { allProducts } from '@/lib/products';

export interface SearchResult {
  product: Product;
  matchedField: 'name' | 'brand' | 'category' | 'sku' | 'description';
}

export function searchCatalog(query: string): Product[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];

  return allProducts.filter((product) => {
    if (!product.isActive) return false;

    const nameMatch = product.name.toLowerCase().includes(q);
    const brandMatch = product.brand.toLowerCase().includes(q);
    const categoryMatch = product.category.toLowerCase().includes(q);
    const skuMatch = product.sku.toLowerCase().includes(q);
    const shortDescMatch = product.shortDescription.toLowerCase().includes(q);

    return nameMatch || brandMatch || categoryMatch || skuMatch || shortDescMatch;
  });
}
