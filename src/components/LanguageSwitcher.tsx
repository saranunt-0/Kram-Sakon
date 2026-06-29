'use client';

import { useLocale } from 'next-intl';
import { usePathname } from '@/i18n/navigation';
import { Link } from '@/i18n/navigation';
import { routing } from '@/i18n/routing';

/*
  Persistent TH | EN switch (§8.1). next-intl's <Link locale> rewrites to the
  same path under the other locale and sets the NEXT_LOCALE cookie, so the
  choice is remembered.
*/
export function LanguageSwitcher({ tone = 'cream' }: { tone?: 'cream' | 'indigo' }) {
  const locale = useLocale();
  const pathname = usePathname();
  const text = tone === 'cream' ? 'text-cream-resist' : 'text-indigo-night';

  return (
    <div className={`flex items-center gap-1 text-xs ${text}`}>
      {routing.locales.map((l, i) => (
        <span key={l} className="flex items-center gap-1">
          {i > 0 && <span aria-hidden className="opacity-40">|</span>}
          <Link
            href={pathname}
            locale={l}
            aria-current={l === locale ? 'true' : undefined}
            className={`uppercase tracking-widest transition-opacity ${
              l === locale ? 'opacity-100 underline decoration-brass underline-offset-4' : 'opacity-60 hover:opacity-100'
            }`}
          >
            {l}
          </Link>
        </span>
      ))}
    </div>
  );
}
