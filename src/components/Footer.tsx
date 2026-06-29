import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { Wordmark } from './Wordmark';
import { LanguageSwitcher } from './LanguageSwitcher';
import { RegionCurrencySwitcher } from './RegionCurrencySwitcher';
import { NewsletterForm } from './NewsletterForm';

/* Dark Night-Indigo footer (§6). */
export async function Footer() {
  const t = await getTranslations('Footer');
  const nav = await getTranslations('Nav');
  const year = new Date().getFullYear();

  const col = (heading: string, links: { label: string; href: string }[]) => (
    <div>
      <h3 className="eyebrow !text-cream-resist/70">{heading}</h3>
      <ul className="mt-4 flex flex-col gap-2 text-sm text-cream-resist/85">
        {links.map((l) => (
          <li key={l.href}>
            <Link href={l.href} className="hover:text-cream-resist hover:underline underline-offset-4 decoration-brass">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <footer className="bg-indigo-night text-cream-resist">
      <div className="mx-auto max-w-content px-4 py-16 sm:px-6 lg:py-20">
        {/* Newsletter sits atop the footer */}
        <NewsletterForm tone="dark" />

        <div className="my-12 selvedge opacity-40" />

        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-1">
            <Wordmark tone="cream" />
            <p className="mt-4 max-w-xs text-sm text-cream-resist/80">{t('tagline')}</p>
          </div>

          {col(t('shop'), [
            { label: nav('shop'), href: '/shop' },
            { label: nav('collections'), href: '/collections' },
          ])}
          {col(t('explore'), [
            { label: nav('story'), href: '/story' },
            // Journal turned off for now — link removed, page retained.
            { label: nav('visit'), href: '/visit' },
            { label: nav('stockists'), href: '/stockists' },
          ])}
          {col(t('support'), [
            { label: nav('contact'), href: '/contact' },
            { label: t('shipping'), href: '/pages/shipping' },
            { label: t('returns'), href: '/pages/returns' },
            { label: t('privacy'), href: '/pages/privacy' },
            { label: t('terms'), href: '/pages/terms' },
          ])}

          <div>
            <h3 className="eyebrow !text-cream-resist/70">{t('connect')}</h3>
            <ul className="mt-4 flex flex-col gap-2 text-sm text-cream-resist/85">
              <li>
                <a
                  href="https://instagram.com/kramsakon"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-cream-resist"
                >
                  Instagram
                </a>
              </li>
              <li>
                <a href="tel:+66915621671" className="hover:text-cream-resist">
                  +66 91 562 1671
                </a>
              </li>
            </ul>
            <address className="mt-4 text-sm not-italic text-cream-resist/70">
              Sakon Nakhon, Thailand
            </address>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-cream-resist/15 pt-6 text-xs text-cream-resist/60 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} Kram Sakon. {t('rights')} {t('madeIn')}
          </p>
          <div className="flex items-center gap-6">
            <RegionCurrencySwitcher tone="cream" />
            <LanguageSwitcher tone="cream" />
          </div>
        </div>
      </div>
    </footer>
  );
}
