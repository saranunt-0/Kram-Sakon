'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';

/*
  Bilingual newsletter capture (§6). Demo only — wire to Shopify/Klaviyo later.
*/
export function NewsletterForm({ tone = 'light' }: { tone?: 'light' | 'dark' }) {
  const t = useTranslations('Newsletter');
  const [done, setDone] = useState(false);
  const dark = tone === 'dark';

  return (
    <div className={dark ? 'text-cream-resist' : 'text-indigo-night'}>
      <p className="eyebrow">{t('eyebrow')}</p>
      <h2 className="mt-2 font-display text-3xl sm:text-4xl">{t('headline')}</h2>
      <p className={`mt-3 max-w-md text-sm ${dark ? 'text-cream-resist/80' : 'text-tamarind'}`}>
        {t('body')}
      </p>

      {done ? (
        <p className="mt-6 text-sm" role="status">
          {t('success')}
        </p>
      ) : (
        <form
          className="mt-6 flex max-w-md flex-col gap-3 sm:flex-row"
          onSubmit={(e) => {
            e.preventDefault();
            setDone(true);
          }}
        >
          <label className="sr-only" htmlFor="newsletter-email">
            {t('placeholder')}
          </label>
          <input
            id="newsletter-email"
            type="email"
            required
            placeholder={t('placeholder')}
            className={`flex-1 rounded-[2px] border bg-transparent px-4 py-3 text-sm outline-none placeholder:opacity-60 ${
              dark
                ? 'border-cream-resist/30 text-cream-resist focus:border-cream-resist'
                : 'border-line text-indigo-night focus:border-indigo-vat'
            }`}
          />
          <button
            type="submit"
            className={`rounded-[2px] px-6 py-3 text-sm tracking-wide transition-colors ${
              dark
                ? 'bg-cream-resist text-indigo-night hover:bg-brass hover:text-cream-resist'
                : 'bg-indigo-vat text-cream-resist hover:bg-indigo-night'
            }`}
          >
            {t('submit')}
          </button>
        </form>
      )}
      <p className={`mt-3 text-xs ${dark ? 'text-cream-resist/60' : 'text-indigo-first'}`}>
        <Link href="/pages/privacy" className="underline underline-offset-2">
          {t('consent')}
        </Link>
      </p>
    </div>
  );
}
