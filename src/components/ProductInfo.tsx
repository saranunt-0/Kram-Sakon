'use client';

import { useMemo, useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { Price } from './Price';
import { Button } from './ui';
import { StoreContact } from './StoreContact';
import type { Locale, Product } from '@/lib/commerce/types';

/*
  PDP info + buy action (§6). This static first-draft has no online checkout, so
  "buy" reveals the store's contact details instead of adding to a cart. Still
  surfaces materials, care, dimensions, and the mandatory "each piece varies"
  handmade note (§7.2, §11).
*/
export function ProductInfo({ product }: { product: Product }) {
  const t = useTranslations('Product');
  const locale = useLocale() as Locale;

  // Track a selected value per option name.
  const [selected, setSelected] = useState<Record<string, string>>(() =>
    Object.fromEntries(product.options.map((o) => [o.name, o.values[0]]))
  );
  const [showContact, setShowContact] = useState(false);

  const activeVariant = useMemo(() => {
    return (
      product.variants.find((v) =>
        v.selectedOptions.every((o) => selected[o.name] === o.value)
      ) ?? product.variants[0]
    );
  }, [product.variants, selected]);

  const available = activeVariant?.availableForSale;

  return (
    <div className="flex flex-col">
      <h1 className="font-display text-3xl font-light leading-tight sm:text-4xl">
        {product.title[locale]}
      </h1>
      <Price money={activeVariant.price} className="mt-3 text-xl text-indigo-vat" />

      <p className="measure mt-6 text-tamarind">{product.description[locale]}</p>

      {/* Option selectors */}
      {product.options.map((option) => (
        <fieldset key={option.name} className="mt-7">
          <legend className="eyebrow mb-3">{option.name}</legend>
          <div className="flex flex-wrap gap-2.5">
            {option.values.map((value) => {
              const isSel = selected[option.name] === value;
              const swatch = product.variants.find((v) =>
                v.selectedOptions.some((o) => o.value === value && o.name === option.name)
              )?.swatch;
              return (
                <button
                  key={value}
                  type="button"
                  onClick={() => setSelected((s) => ({ ...s, [option.name]: value }))}
                  aria-pressed={isSel}
                  className={`flex items-center gap-2 rounded-[2px] border px-4 py-2 text-sm transition-colors ${
                    isSel
                      ? 'border-indigo-vat bg-indigo-vat text-cream-resist'
                      : 'border-line text-indigo-night hover:border-indigo-vat'
                  }`}
                >
                  {swatch && (
                    <span
                      aria-hidden
                      className="h-3.5 w-3.5 rounded-full border border-cream-resist/50"
                      style={{ backgroundColor: swatch }}
                    />
                  )}
                  {value}
                </button>
              );
            })}
          </div>
        </fieldset>
      ))}

      <div className="mt-8">
        <Button
          onClick={() => setShowContact(true)}
          disabled={!available}
          aria-expanded={showContact}
          className="w-full sm:w-auto sm:min-w-64"
        >
          {!available ? t('soldOut') : t('contactToOrder')}
        </Button>
        {showContact && available && <StoreContact className="mt-5" />}
      </div>

      {/* Mandatory handmade-variation note */}
      <div className="mt-8 border-l-2 border-brass bg-cream-cotton/60 p-5">
        <p className="font-display text-base">{t('variationNote')}</p>
        <p className="mt-2 text-sm text-tamarind">{t('variationBody')}</p>
      </div>

      {/* Details: materials, care, dimensions */}
      <dl className="mt-8 divide-y divide-line border-t border-line text-sm">
        <Detail label={t('materials')} value={product.materials[locale]} />
        <Detail label={t('care')} value={product.care[locale]} />
        {product.dimensions && <Detail label={t('dimensions')} value={product.dimensions[locale]} />}
      </dl>
    </div>
  );
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div className="grid grid-cols-[120px_1fr] gap-4 py-4">
      <dt className="eyebrow !text-indigo-night/70">{label}</dt>
      <dd className="text-tamarind">{value}</dd>
    </div>
  );
}
