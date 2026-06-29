'use client';

import { useLocale, useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { ClothImage } from './ClothImage';
import { Badge } from './ui';
import { Price } from './Price';
import { useShop } from '@/lib/cart/context';
import type { Locale, Product } from '@/lib/commerce/types';

function badgeLabel(tags: string[], t: ReturnType<typeof useTranslations>): string | null {
  if (tags.includes('new')) return t('badgeNew');
  if (tags.includes('limited')) return t('badgeLimited');
  if (tags.includes('last-few')) return t('badgeLastFew');
  return null;
}

export function ProductCard({ product }: { product: Product }) {
  const locale = useLocale() as Locale;
  const t = useTranslations('Product');
  const { addItem } = useShop();

  const label = badgeLabel(product.tags, t);
  const minPrice = product.variants.reduce(
    (min, v) => (parseFloat(v.price.amount) < parseFloat(min.amount) ? v.price : min),
    product.variants[0].price
  );
  const contextImage = product.images.find((i) => i.kind === 'context');
  const firstAvailable = product.variants.find((v) => v.availableForSale);
  const swatches = product.variants.filter((v) => v.swatch);

  const quickAdd = () => {
    if (firstAvailable) addItem(product, firstAvailable, 1);
  };

  return (
    <div className="group flex flex-col">
      <Link
        href={`/products/${product.handle}`}
        className="relative block aspect-[4/5] overflow-hidden bg-cream-cotton"
      >
        <ClothImage
          seed={product.featuredImage.seed}
          alt={product.featuredImage.altText}
          className="absolute inset-0 h-full w-full transition-opacity duration-700 group-hover:opacity-0"
        />
        {contextImage && (
          <ClothImage
            seed={contextImage.seed}
            alt={contextImage.altText}
            className="absolute inset-0 h-full w-full opacity-0 transition-opacity duration-700 group-hover:opacity-100"
          />
        )}
        {label && (
          <span className="absolute left-3 top-3">
            <Badge>{label}</Badge>
          </span>
        )}
        {!firstAvailable && (
          <span className="absolute inset-x-0 bottom-0 bg-indigo-night/80 py-2 text-center text-xs uppercase tracking-widest text-cream-resist">
            {t('soldOut')}
          </span>
        )}
        {/* Quick-add bag */}
        {firstAvailable && (
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              quickAdd();
            }}
            aria-label={t('quickAdd')}
            className="absolute bottom-3 right-3 grid h-10 w-10 place-items-center rounded-[2px] bg-cream-resist/90 text-indigo-vat opacity-0 backdrop-blur-sm transition-opacity duration-300 hover:bg-cream-resist focus-visible:opacity-100 group-hover:opacity-100"
          >
            <BagIcon />
          </button>
        )}
      </Link>

      <div className="mt-4 flex flex-col gap-1">
        <Link href={`/products/${product.handle}`} className="hover:text-indigo-dip">
          <h3 className="font-display text-lg leading-snug">{product.title[locale]}</h3>
        </Link>
        <Price money={minPrice} className="text-sm text-indigo-vat" />
        {swatches.length > 0 && (
          <div className="mt-1 flex items-center gap-1.5">
            {swatches.map((v) => (
              <span
                key={v.id}
                title={v.title}
                aria-hidden
                className="h-3.5 w-3.5 rounded-full border border-line"
                style={{ backgroundColor: v.swatch }}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function BagIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M6 8h12l-1 12H7L6 8Z M9 8V6a3 3 0 0 1 6 0v2"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
