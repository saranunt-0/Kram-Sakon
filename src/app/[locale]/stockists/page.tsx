import { getTranslations, setRequestLocale } from 'next-intl/server';
import type { Locale } from '@/lib/commerce/types';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { DemoForm } from '@/components/DemoForm';

const STOCKISTS = [
  { name: 'The Selvedge Room', city: 'Bangkok, TH' },
  { name: 'Indigo & Oak', city: 'Chiang Mai, TH' },
  { name: 'Maison Naturelle', city: 'Paris, FR' },
  { name: 'Aizome Gallery', city: 'Kyoto, JP' },
];

export default async function StockistsPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('Stockists');

  return (
    <div className="mx-auto max-w-content px-4 py-10 sm:px-6 lg:py-14">
      <Breadcrumbs items={[{ label: t('eyebrow') }]} />
      <header className="mt-6 max-w-2xl">
        <p className="eyebrow">{t('eyebrow')}</p>
        <h1 className="mt-2 font-display text-4xl font-light sm:text-5xl">{t('title')}</h1>
        <p className="mt-4 text-tamarind">{t('lead')}</p>
      </header>

      <div className="mt-12 grid gap-12 lg:grid-cols-2 lg:gap-20">
        <div>
          <h2 className="eyebrow !text-indigo-night/70">{t('currentTitle')}</h2>
          <ul className="mt-4 divide-y divide-line border-t border-line">
            {STOCKISTS.map((s) => (
              <li key={s.name} className="flex items-center justify-between py-4">
                <span className="font-display text-lg">{s.name}</span>
                <span className="text-sm text-tamarind">{s.city}</span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="eyebrow !text-indigo-night/70">{t('enquiryTitle')}</h2>
          <div className="mt-4">
            <DemoForm
              submitLabel={t('submit')}
              successMessage={t('success')}
              fields={[
                { name: 'company', label: t('company'), required: true },
                { name: 'name', label: t('name'), required: true },
                { name: 'email', label: t('email'), type: 'email', required: true },
                { name: 'country', label: t('country') },
                { name: 'message', label: t('message'), type: 'textarea' },
              ]}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
