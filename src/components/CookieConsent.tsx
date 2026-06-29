'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';

/*
  PDPA cookie consent (§10, §13). Analytics/marketing scripts MUST stay gated
  behind an explicit choice. We store the decision and only then would load GA4.
*/
const KEY = 'kram-consent';

export function CookieConsent() {
  const t = useTranslations('Cookie');
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem(KEY)) setVisible(true);
  }, []);

  const choose = (value: 'all' | 'essential') => {
    localStorage.setItem(KEY, value);
    setVisible(false);
    // When value === 'all', a real build would initialise consent-aware GA4 here.
  };

  if (!visible) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-line bg-cream-resist/98 backdrop-blur">
      <div className="mx-auto flex max-w-content flex-col gap-4 px-4 py-5 sm:px-6 md:flex-row md:items-center md:justify-between">
        <div className="max-w-2xl">
          <p className="font-display text-base">{t('title')}</p>
          <p className="mt-1 text-sm text-tamarind">
            {t('body')}{' '}
            <Link href="/pages/privacy" className="underline decoration-brass underline-offset-2">
              {t('privacy')}
            </Link>
          </p>
        </div>
        <div className="flex shrink-0 gap-3">
          <button
            type="button"
            onClick={() => choose('essential')}
            className="rounded-[2px] border border-indigo-vat px-5 py-2.5 text-sm text-indigo-vat hover:bg-indigo-vat hover:text-cream-resist"
          >
            {t('reject')}
          </button>
          <button
            type="button"
            onClick={() => choose('all')}
            className="rounded-[2px] bg-indigo-vat px-5 py-2.5 text-sm text-cream-resist hover:bg-indigo-night"
          >
            {t('accept')}
          </button>
        </div>
      </div>
    </div>
  );
}
