'use client';

import { useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { Link, usePathname } from '@/i18n/navigation';
import { Wordmark } from './Wordmark';
import { ClothImage } from './ClothImage';
import { LanguageSwitcher } from './LanguageSwitcher';
import { RegionCurrencySwitcher } from './RegionCurrencySwitcher';
import { SearchModal } from './SearchModal';
import { useShop } from '@/lib/cart/context';
import type { Collection, Locale, Product } from '@/lib/commerce/types';

const NAV = [
  { key: 'shop', href: '/shop' },
  { key: 'collections', href: '/collections' },
  { key: 'story', href: '/story' },
  { key: 'journal', href: '/journal' },
] as const;

export function Header({
  collections,
  products,
}: {
  collections: Collection[];
  products: Product[];
}) {
  const t = useTranslations('Nav');
  const locale = useLocale() as Locale;
  const pathname = usePathname();
  const { count, openCart } = useShop();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-cream/95 backdrop-blur supports-[backdrop-filter]:bg-cream/80">
      <div className="mx-auto grid max-w-content grid-cols-[1fr_auto_1fr] items-center gap-4 px-4 py-4 sm:px-6">
        {/* Left: nav (desktop) / hamburger (mobile) */}
        <div className="flex items-center gap-6">
          <button
            type="button"
            className="lg:hidden"
            aria-label={t('openMenu')}
            onClick={() => setDrawerOpen(true)}
          >
            <MenuIcon />
          </button>
          <nav className="hidden items-center gap-7 text-sm lg:flex">
            {NAV.map((item) => (
              <div
                key={item.key}
                onMouseEnter={() => setMegaOpen(item.key === 'shop' || item.key === 'collections')}
                onMouseLeave={() => setMegaOpen(false)}
              >
                <Link
                  href={item.href}
                  className="tracking-wide text-indigo-night transition-colors hover:text-indigo-dip"
                >
                  {t(item.key)}
                </Link>
              </div>
            ))}
          </nav>
        </div>

        {/* Center: wordmark */}
        <div className="flex justify-center">
          <Wordmark />
        </div>

        {/* Right: utilities */}
        <div className="flex items-center justify-end gap-4 sm:gap-5">
          <button type="button" aria-label={t('search')} onClick={() => setSearchOpen(true)}>
            <SearchIcon />
          </button>
          <Link href="/contact" aria-label={t('account')} className="hidden sm:block">
            <AccountIcon />
          </Link>
          <button
            type="button"
            aria-label={t('cart')}
            onClick={openCart}
            className="relative"
          >
            <BagIcon />
            {count > 0 && (
              <span className="absolute -right-2 -top-2 grid h-4 min-w-4 place-items-center rounded-full bg-indigo-vat px-1 text-[10px] font-medium text-cream-resist">
                {count}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Mega-menu panel (Shop / Collections) */}
      {megaOpen && (
        <div
          className="absolute inset-x-0 top-full hidden border-b border-line bg-cream lg:block"
          onMouseEnter={() => setMegaOpen(true)}
          onMouseLeave={() => setMegaOpen(false)}
        >
          <div className="mx-auto grid max-w-content grid-cols-3 gap-6 px-6 py-8">
            {collections.map((c) => (
              <Link
                key={c.handle}
                href={`/collections/${c.handle}`}
                className="group flex items-center gap-4"
              >
                <ClothImage
                  seed={c.image.seed}
                  alt={c.image.altText}
                  className="h-20 w-16 shrink-0"
                />
                <span>
                  <span className="block font-display text-lg group-hover:text-indigo-dip">
                    {c.title[locale]}
                  </span>
                  <span className="block text-xs text-tamarind">{c.description[locale]}</span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Mobile drawer */}
      {drawerOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-indigo-night/40"
            onClick={() => setDrawerOpen(false)}
            aria-hidden
          />
          <div className="absolute left-0 top-0 flex h-full w-[80%] max-w-sm flex-col bg-cream p-6">
            <div className="mb-8 flex items-center justify-between">
              <span className="eyebrow">{t('menu')}</span>
              <button type="button" aria-label={t('close')} onClick={() => setDrawerOpen(false)}>
                <CloseIcon />
              </button>
            </div>
            <nav className="flex flex-col gap-5 text-lg">
              {NAV.map((item) => (
                <Link
                  key={item.key}
                  href={item.href}
                  className="font-display"
                  onClick={() => setDrawerOpen(false)}
                >
                  {t(item.key)}
                </Link>
              ))}
              <span className="selvedge my-2" />
              <Link href="/visit" className="font-display" onClick={() => setDrawerOpen(false)}>
                {t('account') /* reuse: leads to visit/contact area */}
              </Link>
              <Link href="/contact" className="font-display" onClick={() => setDrawerOpen(false)}>
                {t('contact')}
              </Link>
            </nav>
            <div className="mt-auto flex flex-col gap-4 pt-8">
              <LanguageSwitcher tone="indigo" />
              <RegionCurrencySwitcher tone="indigo" />
            </div>
          </div>
        </div>
      )}

      <SearchModal
        open={searchOpen}
        onClose={() => setSearchOpen(false)}
        products={products}
      />
      {/* keep pathname referenced so active-state styling can be added later */}
      <span hidden data-path={pathname} />
    </header>
  );
}

/* — icons (1.5px stroke, crisp) — */
function MenuIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}
function CloseIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}
function SearchIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.5" />
      <path d="M16 16l5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}
function AccountIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="1.5" />
      <path d="M4 20c1.5-4 5-6 8-6s6.5 2 8 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}
function BagIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
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
