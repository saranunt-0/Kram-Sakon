import { getTranslations, setRequestLocale } from 'next-intl/server';
import type { Locale } from '@/lib/commerce/types';
import { ClothImage } from '@/components/ClothImage';
import { Breadcrumbs } from '@/components/Breadcrumbs';

const ADDRESS = 'Mueang Sakon Nakhon, Sakon Nakhon 47000, Thailand';
const PHONE = '+66 91 562 1671';

export default async function VisitPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('Visit');

  // LocalBusiness structured data (§9).
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Store',
    name: 'Kram Sakon',
    image: undefined,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Mueang Sakon Nakhon',
      addressRegion: 'Sakon Nakhon',
      postalCode: '47000',
      addressCountry: 'TH',
    },
    telephone: PHONE,
    openingHours: 'Mo-Sa 09:00-18:00',
  };

  return (
    <div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <section className="relative h-[44vh] min-h-[320px] overflow-hidden">
        <ClothImage
          seed="visit-boutique"
          alt="The Kram Sakon boutique interior"
          priority
          className="absolute inset-0 h-full w-full"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-indigo-night/75 to-indigo-night/20" />
        <div className="relative mx-auto flex h-full max-w-content flex-col justify-end px-4 pb-12 sm:px-6">
          <p className="eyebrow !text-cream-resist/80">{t('eyebrow')}</p>
          <h1 className="mt-2 font-display text-4xl font-light text-cream-resist sm:text-6xl">
            {t('title')}
          </h1>
        </div>
      </section>

      <div className="mx-auto max-w-content px-4 py-12 sm:px-6">
        <Breadcrumbs items={[{ label: t('eyebrow') }]} />
        <p className="mt-6 max-w-2xl font-display text-2xl font-light text-indigo-night/85">
          {t('lead')}
        </p>

        <div className="mt-12 grid gap-12 lg:grid-cols-[1fr_1.2fr]">
          <dl className="flex flex-col gap-8">
            <div>
              <dt className="eyebrow">{t('addressTitle')}</dt>
              <dd className="mt-2 text-lg">{ADDRESS}</dd>
              <a
                href={`https://maps.google.com/?q=${encodeURIComponent(ADDRESS)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-block text-sm underline decoration-brass underline-offset-4 hover:text-indigo-dip"
              >
                {t('directions')}
              </a>
            </div>
            <div>
              <dt className="eyebrow">{t('hoursTitle')}</dt>
              <dd className="mt-2 text-lg">{t('hours')}</dd>
            </div>
            <div>
              <dt className="eyebrow">{t('contactTitle')}</dt>
              <dd className="mt-2 text-lg">
                <a href={`tel:${PHONE.replace(/\s/g, '')}`} className="hover:text-indigo-dip">
                  {PHONE}
                </a>
              </dd>
            </div>
          </dl>

          {/* Map placeholder — embed Google Maps iframe in production */}
          <div className="relative aspect-[4/3] overflow-hidden border border-line bg-cream-cotton">
            <ClothImage seed="visit-map" alt="Map to the boutique" motif="plain" className="absolute inset-0 h-full w-full opacity-60" />
            <div className="absolute inset-0 grid place-items-center">
              <span className="bg-cream-resist/90 px-4 py-2 text-xs uppercase tracking-widest text-indigo-vat">
                Map placeholder
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
