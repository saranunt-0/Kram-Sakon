'use client';

import { useEffect, useMemo, useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { ClothImage } from './ClothImage';
import { Price } from './Price';
import type { Locale, Product } from '@/lib/commerce/types';

export function SearchModal({
  open,
  onClose,
  products,
}: {
  open: boolean;
  onClose: () => void;
  products: Product[];
}) {
  const t = useTranslations('Nav');
  const locale = useLocale() as Locale;
  const [query, setQuery] = useState('');

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return products
      .filter(
        (p) =>
          p.title[locale].toLowerCase().includes(q) ||
          p.description[locale].toLowerCase().includes(q)
      )
      .slice(0, 6);
  }, [query, products, locale]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-indigo-night/40" onClick={onClose} aria-hidden />
      <div className="absolute inset-x-0 top-0 bg-cream p-6 shadow-lg sm:p-10">
        <div className="mx-auto max-w-2xl">
          <div className="flex items-center gap-3 border-b border-indigo-vat pb-3">
            {/* eslint-disable-next-line jsx-a11y/no-autofocus */}
            <input
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={`${t('search')}…`}
              className="w-full bg-transparent font-display text-2xl outline-none placeholder:text-indigo-first"
            />
            <button type="button" onClick={onClose} aria-label={t('close')} className="text-sm uppercase tracking-widest">
              {t('close')}
            </button>
          </div>

          <div className="mt-6 flex flex-col gap-4">
            {results.map((p) => (
              <Link
                key={p.id}
                href={`/products/${p.handle}`}
                onClick={onClose}
                className="group flex items-center gap-4"
              >
                <ClothImage seed={p.featuredImage.seed} src={p.featuredImage.src} alt={p.featuredImage.altText} className="h-16 w-14 shrink-0" />
                <span className="flex-1">
                  <span className="block font-display text-lg group-hover:text-indigo-dip">
                    {p.title[locale]}
                  </span>
                  <Price money={p.variants[0].price} className="text-sm text-indigo-vat" />
                </span>
              </Link>
            ))}
            {query && results.length === 0 && (
              <p className="text-sm text-tamarind">—</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
