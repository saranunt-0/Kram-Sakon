import { useTranslations } from 'next-intl';

/*
  Store contact details shown when a shopper wants to buy.

  This static first-draft has no payment or online checkout (the founder-review
  build), so "buy" routes to a direct conversation instead. Channels are the same
  ones the Contact page uses; the LINE id is a placeholder to swap before launch.
*/
const PHONE_DISPLAY = '+66 91 562 1671';
const PHONE_HREF = 'tel:+66915621671';
const EMAIL = 'hello@kramsakon.com';
const LINE_ID = '@kramsakon';
const LINE_HREF = 'https://line.me/R/ti/p/%40kramsakon';

export function StoreContact({ className = '' }: { className?: string }) {
  const t = useTranslations('StoreContact');

  return (
    <div className={`border-l-2 border-indigo-vat bg-cream-cotton/60 p-5 ${className}`}>
      <p className="font-display text-base">{t('title')}</p>
      <p className="mt-2 text-sm text-tamarind">{t('intro')}</p>
      <dl className="mt-4 flex flex-col gap-2 text-sm">
        <Row label={t('phone')}>
          <a href={PHONE_HREF} className="hover:text-indigo-dip">
            {PHONE_DISPLAY}
          </a>
        </Row>
        <Row label={t('line')}>
          <a
            href={LINE_HREF}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-indigo-dip"
          >
            {LINE_ID}
          </a>
        </Row>
        <Row label={t('email')}>
          <a href={`mailto:${EMAIL}`} className="hover:text-indigo-dip">
            {EMAIL}
          </a>
        </Row>
        <Row label={t('locationLabel')}>
          <span className="text-tamarind">{t('location')}</span>
        </Row>
      </dl>
    </div>
  );
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-[88px_1fr] gap-3">
      <dt className="eyebrow !text-indigo-night/70">{label}</dt>
      <dd className="text-indigo-night">{children}</dd>
    </div>
  );
}
