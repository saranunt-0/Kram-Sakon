import { getTranslations, setRequestLocale } from 'next-intl/server';
import type { Locale } from '@/lib/commerce/types';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { DemoForm } from '@/components/DemoForm';

/* Real store contact details (founder-provided). */
const PHONE_DISPLAY = '092-515-9455';
const PHONE_DIAL = '+66925159455';
const LINE_ID = '@kramsakon1';
const LINE_URL = 'https://line.me/R/ti/p/@kramsakon1';
const FACEBOOK_URL = 'http://web.facebook.com/KhramSklKramsakon';
const MAPS_LINK = 'https://maps.app.goo.gl/n1gJyWGE8Y3iS1kE7';
const MAPS_QUERY =
  'Kramsakon 212 Huai Yang, Mueang Sakon Nakhon District, Sakon Nakhon 47000';
const MAPS_EMBED = `https://www.google.com/maps?q=${encodeURIComponent(MAPS_QUERY)}&z=15&output=embed`;

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('Contact');

  // LocalBusiness structured data (§9).
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Store',
    name: 'Kramsakon',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '212 Huai Yang',
      addressLocality: 'Mueang Sakon Nakhon',
      addressRegion: 'Sakon Nakhon',
      postalCode: '47000',
      addressCountry: 'TH',
    },
    telephone: PHONE_DIAL,
    sameAs: [FACEBOOK_URL],
    openingHours: 'Mo-Su 08:00-17:00',
    hasMap: MAPS_LINK,
  };

  return (
    <div className="mx-auto max-w-content px-4 py-10 sm:px-6 lg:py-14">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Breadcrumbs items={[{ label: t('eyebrow') }]} />

      <header className="mt-6 max-w-2xl">
        <p className="eyebrow">{t('eyebrow')}</p>
        <h1 className="mt-2 font-display text-4xl font-light sm:text-5xl">{t('title')}</h1>
        <p className="mt-4 text-tamarind">{t('lead')}</p>
      </header>

      <div className="mt-12">
        {/* Store details */}
        <div>
          <h2 className="font-display text-2xl">{t('storeName')}</h2>

          <dl className="mt-6 flex flex-col gap-7">
            <div>
              <dt className="eyebrow">{t('addressTitle')}</dt>
              <dd className="mt-2 text-lg leading-relaxed">{t('address')}</dd>
              <a
                href={MAPS_LINK}
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
              <dt className="eyebrow">{t('detailsTitle')}</dt>
              <dd className="mt-2 flex flex-col gap-1.5 text-lg">
                <span>
                  <span className="text-tamarind">{t('phoneLabel')}: </span>
                  <a href={`tel:${PHONE_DIAL}`} className="hover:text-indigo-dip">
                    {PHONE_DISPLAY}
                  </a>
                </span>
                <span>
                  <span className="text-tamarind">{t('lineLabel')}: </span>
                  <a
                    href={LINE_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-indigo-dip"
                  >
                    {LINE_ID}
                  </a>
                </span>
                <span>
                  <span className="text-tamarind">{t('facebookLabel')}: </span>
                  <a
                    href={FACEBOOK_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-indigo-dip"
                  >
                    KhramSklKramsakon
                  </a>
                </span>
              </dd>
            </div>
          </dl>

          {/* Workshop note */}
          <div className="dip-dye mt-10 p-6 text-cream-resist">
            <h3 className="font-display text-xl">{t('workshopTitle')}</h3>
            <p className="mt-2 text-sm text-cream-resist/90">{t('workshopBody')}</p>
          </div>
        </div>

        {/* Map — stacked full-width below the details */}
        <div className="mt-12">
          <h2 className="eyebrow !text-indigo-night/70">{t('mapTitle')}</h2>
          <div className="mt-3 aspect-[16/10] overflow-hidden border border-line bg-cream-cotton sm:aspect-[2/1]">
            <iframe
              title={`${t('storeName')} — ${t('mapTitle')}`}
              src={MAPS_EMBED}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="h-full w-full border-0"
              allowFullScreen
            />
          </div>
        </div>
      </div>

      {/* Contact form */}
      <div className="mt-16 border-t border-line pt-12">
        <h2 className="font-display text-2xl font-light sm:text-3xl">{t('formTitle')}</h2>
        <div className="mt-6 max-w-xl">
          <DemoForm
            submitLabel={t('submit')}
            successMessage={t('success')}
            fields={[
              { name: 'name', label: t('name'), required: true },
              { name: 'email', label: t('email'), type: 'email', required: true },
              { name: 'subject', label: t('subject') },
              { name: 'message', label: t('message'), type: 'textarea', required: true },
            ]}
          />
        </div>
      </div>
    </div>
  );
}
