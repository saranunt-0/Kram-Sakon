/*
  Commerce client — the single seam between the UI and the data source.

  Today it reads from mock-data.ts. To go live, reimplement these functions
  against the Shopify Storefront API (GraphQL, server-side token, @inContext for
  locale/country) WITHOUT changing their signatures, and the UI keeps working.
  Every function is async to match a real network client.
*/
import type { Collection, Product } from './types';
import { collections, products } from './mock-data';

export type SortKey = 'featured' | 'price-asc' | 'price-desc' | 'newest';

function priceNum(p: Product): number {
  return Math.min(...p.variants.map((v) => parseFloat(v.price.amount)));
}

function sortProducts(list: Product[], sort: SortKey): Product[] {
  const out = [...list];
  switch (sort) {
    case 'price-asc':
      return out.sort((a, b) => priceNum(a) - priceNum(b));
    case 'price-desc':
      return out.sort((a, b) => priceNum(b) - priceNum(a));
    case 'newest':
      return out.sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
    default:
      return out;
  }
}

export async function getCollections(): Promise<Collection[]> {
  return collections;
}

export async function getCollection(handle: string): Promise<Collection | null> {
  return collections.find((c) => c.handle === handle) ?? null;
}

export async function getProducts(sort: SortKey = 'featured'): Promise<Product[]> {
  return sortProducts(products, sort);
}

export async function getProductsByCollection(
  handle: string,
  sort: SortKey = 'featured'
): Promise<Product[]> {
  return sortProducts(
    products.filter((p) => p.collectionHandles.includes(handle)),
    sort
  );
}

export async function getProduct(handle: string): Promise<Product | null> {
  return products.find((p) => p.handle === handle) ?? null;
}

export async function getAllProductHandles(): Promise<string[]> {
  return products.map((p) => p.handle);
}

export async function getAllCollectionHandles(): Promise<string[]> {
  return collections.map((c) => c.handle);
}

/** Home: "Most loved" row. */
export async function getMostLoved(): Promise<Product[]> {
  return products.slice(0, 8);
}

/** PDP: simple "pairs well with" — other products, excluding the current one. */
export async function getRelatedProducts(handle: string): Promise<Product[]> {
  return products.filter((p) => p.handle !== handle).slice(0, 4);
}
