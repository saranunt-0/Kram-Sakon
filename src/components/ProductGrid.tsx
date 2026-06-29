import { ProductCard } from './ProductCard';
import type { Product } from '@/lib/commerce/types';

/* Responsive 2-up (mobile) → 4-up (desktop) grid (§6). */
export function ProductGrid({ products }: { products: Product[] }) {
  return (
    <div className="grid grid-cols-2 gap-x-5 gap-y-10 md:grid-cols-3 md:gap-x-8 lg:grid-cols-4">
      {products.map((p) => (
        <ProductCard key={p.id} product={p} />
      ))}
    </div>
  );
}
