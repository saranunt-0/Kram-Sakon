'use client';

import { useLocale, useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { ClothImage } from './ClothImage';
import { Price } from './Price';
import { useShop } from '@/lib/cart/context';
import type { Locale } from '@/lib/commerce/types';

/*
  Slide-in cart (§6). "Checkout" would redirect to Shopify's hosted checkout
  (cart.checkoutUrl). In this demo it routes to /checkout-demo, which explains
  the handoff — no payment code lives in this repo (§1.2, §11).
*/
export function CartDrawer() {
  const t = useTranslations('Cart');
  const locale = useLocale() as Locale;
  const { lines, subtotal, isOpen, closeCart, updateQty, removeItem, count } = useShop();

  return (
    <div className={`fixed inset-0 z-50 ${isOpen ? '' : 'pointer-events-none'}`} aria-hidden={!isOpen}>
      {/* Scrim */}
      <div
        className={`absolute inset-0 bg-indigo-night/40 transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0'
        }`}
        onClick={closeCart}
      />
      {/* Panel */}
      <aside
        className={`absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-cream shadow-xl transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        role="dialog"
        aria-label={t('title')}
      >
        <div className="flex items-center justify-between border-b border-line px-6 py-5">
          <h2 className="font-display text-xl">
            {t('title')} {count > 0 && <span className="text-indigo-first">({count})</span>}
          </h2>
          <button type="button" onClick={closeCart} aria-label="Close">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="1.5" />
            </svg>
          </button>
        </div>

        {lines.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
            <p className="text-tamarind">{t('empty')}</p>
            <Link
              href="/shop"
              onClick={closeCart}
              className="text-sm underline decoration-brass underline-offset-4"
            >
              {t('emptyCta')}
            </Link>
          </div>
        ) : (
          <>
            <ul className="flex-1 divide-y divide-line overflow-y-auto px-6">
              {lines.map((line) => (
                <li key={line.id} className="flex gap-4 py-5">
                  <ClothImage
                    seed={line.image.seed}
                    alt={line.image.altText}
                    className="h-24 w-20 shrink-0"
                  />
                  <div className="flex flex-1 flex-col">
                    <Link
                      href={`/products/${line.productHandle}`}
                      onClick={closeCart}
                      className="font-display leading-snug hover:text-indigo-dip"
                    >
                      {line.title[locale]}
                    </Link>
                    <span className="text-xs text-tamarind">{line.variantTitle}</span>
                    <div className="mt-auto flex items-center justify-between pt-3">
                      <div className="inline-flex items-center border border-line">
                        <button
                          type="button"
                          aria-label="−"
                          className="px-2.5 py-1 text-indigo-vat hover:bg-cream-cotton"
                          onClick={() => updateQty(line.id, line.quantity - 1)}
                        >
                          −
                        </button>
                        <span className="min-w-8 text-center text-sm tabular-nums">
                          {line.quantity}
                        </span>
                        <button
                          type="button"
                          aria-label="+"
                          className="px-2.5 py-1 text-indigo-vat hover:bg-cream-cotton"
                          onClick={() => updateQty(line.id, line.quantity + 1)}
                        >
                          +
                        </button>
                      </div>
                      <Price money={line.price} className="text-sm text-indigo-vat" />
                    </div>
                    <button
                      type="button"
                      onClick={() => removeItem(line.id)}
                      className="mt-2 self-start text-xs text-tamarind underline underline-offset-2 hover:text-indigo-night"
                    >
                      {t('remove')}
                    </button>
                  </div>
                </li>
              ))}
            </ul>

            <div className="border-t border-line px-6 py-5">
              <div className="mb-1 flex items-center justify-between">
                <span className="font-display text-lg">{t('subtotal')}</span>
                <Price money={subtotal} className="font-display text-lg text-indigo-vat" />
              </div>
              <p className="mb-4 text-xs text-tamarind">{t('taxNote')}</p>
              <Link
                href="/checkout-demo"
                onClick={closeCart}
                className="flex w-full items-center justify-center rounded-[2px] bg-indigo-vat px-7 py-3.5 text-sm tracking-wide text-cream-resist transition-colors hover:bg-indigo-night"
              >
                {t('checkout')}
              </Link>
              <p className="mt-2 text-center text-[11px] uppercase tracking-widest text-indigo-first">
                {t('demoNote')}
              </p>
            </div>
          </>
        )}
      </aside>
    </div>
  );
}
