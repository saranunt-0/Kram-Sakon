'use client';

import { useLocale, useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { ClothImage } from './ClothImage';
import { Badge } from './ui';
import { Price } from './Price';
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

  const label = badgeLabel(product.tags, t);
  const minPrice = product.variants.reduce(
    (min, v) => (parseFloat(v.price.amount) < parseFloat(min.amount) ? v.price : min),
    product.variants[0].price
  );
  const contextImage = product.images.find((i) => i.kind === 'context');
  const firstAvailable = product.variants.find((v) => v.availableForSale);
  const swatches = product.variants.filter((v) => v.swatch);

  return (
    <div className="group flex flex-col">
      <Link
        href={`/products/${product.handle}`}
        className="relative block aspect-[4/5] overflow-hidden bg-cream-cotton"
      >
        <ClothImage
          seed={product.featuredImage.seed}
          src={product.featuredImage.src}
          alt={product.featuredImage.altText}
          className="absolute inset-0 h-full w-full transition-opacity duration-700 group-hover:opacity-0"
        />
        {contextImage && (
          <ClothImage
            seed={contextImage.seed}
            src={contextImage.src}
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
