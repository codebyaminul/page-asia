import { Product, VehicleType } from '@/types';
import { evProducts } from '@/data/products/ev-parts';

export function filterEVProducts(options: {
  vehicleType?: VehicleType | 'all';
  category?: string;
  query?: string;
}): Product[] {
  return evProducts.filter((product) => {
    if (!product.isActive) return false;

    // Filter by vehicle type
    if (options.vehicleType && options.vehicleType !== 'all') {
      const matchVehicle =
        product.vehicleCompatibility?.includes(options.vehicleType) ||
        product.vehicleCompatibility?.includes('both');
      if (!matchVehicle) return false;
    }

    // Filter by component category
    if (options.category && options.category !== 'all') {
      if (product.category !== options.category) return false;
    }

    // Filter by query string
    if (options.query) {
      const q = options.query.trim().toLowerCase();
      const match =
        product.name.toLowerCase().includes(q) ||
        product.sku.toLowerCase().includes(q) ||
        product.shortDescription.toLowerCase().includes(q);
      if (!match) return false;
    }

    return true;
  });
}
