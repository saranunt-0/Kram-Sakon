'use client';

import { useMemo, useState } from 'react';
import { CollectionToolbar } from './CollectionToolbar';
import { ProductGrid } from './ProductGrid';
import type { Product } from '@/lib/commerce/types';

export type SortKey = 'featured' | 'price-asc' | 'price-desc' | 'newest';

function priceNum(p: Product): number {
  return Math.min(...p.variants.map((v) => parseFloat(v.price.amount)));
}

/*
  Client-side sort for Shop + Collection pages (STATIC-DEPLOYMENT-PLAN.md §4.4).
  In the SSR app sort came from the URL `?sort=` query, which forces dynamic
  rendering. For the static export we receive the full product list (in featured
  order) at build time and reorder it in the browser — identical UX, no request.
*/
export function ProductBrowser({ products }: { products: Product[] }) {
  const [sort, setSort] = useState<SortKey>('featured');

  const sorted = useMemo(() => {
    const out = [...products];
    switch (sort) {
      case 'price-asc':
        return out.sort((a, b) => priceNum(a) - priceNum(b));
      case 'price-desc':
        return out.sort((a, b) => priceNum(b) - priceNum(a));
      case 'newest':
        return out.sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
      default:
        return out; // featured = source order
    }
  }, [products, sort]);

  return (
    <>
      <CollectionToolbar count={products.length} sort={sort} onSortChange={setSort} />
      <div className="mt-10">
        <ProductGrid products={sorted} />
      </div>
    </>
  );
}
