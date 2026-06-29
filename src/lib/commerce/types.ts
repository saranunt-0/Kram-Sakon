/*
  Commerce types — modelled on the Shopify Storefront API (Build Guide §7.2).
  Keeping these shapes close to Shopify means the mock client can later be
  swapped for a real Storefront API client with minimal churn in the UI.
*/

export type Locale = 'th' | 'en';
export type CurrencyCode = 'THB' | 'USD' | 'EUR';

/** Mirrors Shopify's MoneyV2. */
export interface Money {
  amount: string; // decimal string, e.g. "2400.00"
  currencyCode: CurrencyCode;
}

export interface ProductImage {
  /** Stable seed used by the mock cloth generator; replace with a real `url` for Shopify. */
  seed: string;
  altText: string;
  /** "flat" (on cream), "context" (on-body / styled), or "process" (the craft). */
  kind?: 'flat' | 'context' | 'process';
}

export interface SelectedOption {
  name: string; // e.g. "Colour"
  value: string; // e.g. "Vat Indigo"
}

export interface ProductVariant {
  id: string;
  title: string;
  availableForSale: boolean;
  selectedOptions: SelectedOption[];
  price: Money;
  compareAtPrice?: Money | null;
  /** Hex swatch for the colour option (mock convenience; in Shopify use a metafield). */
  swatch?: string;
}

export interface ProductOption {
  name: string;
  values: string[];
}

/** Localised, human-written content (no runtime machine translation, §11). */
export type Localized<T> = Record<Locale, T>;

export type ProductTag = 'new' | 'limited' | 'last-few' | string;

export interface Product {
  id: string;
  handle: string;
  title: Localized<string>;
  description: Localized<string>;
  /** Metafields surfaced on the PDP (§7.2). */
  materials: Localized<string>;
  care: Localized<string>;
  dimensions?: Localized<string>;
  featuredImage: ProductImage;
  images: ProductImage[];
  options: ProductOption[];
  variants: ProductVariant[];
  tags: ProductTag[];
  collectionHandles: string[];
  /** Sort helper for "newest". */
  publishedAt: string;
}

export interface Collection {
  handle: string;
  title: Localized<string>;
  description: Localized<string>;
  image: ProductImage;
}

/* ---- Cart (mirrors Shopify Cart; checkoutUrl drives the hosted-checkout redirect) ---- */

export interface CartLine {
  id: string; // line id (here: variantId)
  variantId: string;
  productHandle: string;
  title: Localized<string>;
  variantTitle: string;
  image: ProductImage;
  price: Money;
  quantity: number;
}

export interface Cart {
  id: string;
  lines: CartLine[];
  /** In production this is Shopify's secure hosted checkout URL (§1.1, §6 CartDrawer). */
  checkoutUrl: string;
}
