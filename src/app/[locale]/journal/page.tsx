import { getTranslations, setRequestLocale } from 'next-intl/server';
import type { Locale } from '@/lib/commerce/types';
import { Breadcrumbs } from '@/components/Breadcrumbs';

/*
  Journal is TURNED OFF for now (per founder guidance). The page and its data
  (`@/lib/journal`, the `journal/[handle]` route) are intentionally kept so it
  can be switched back on later — we simply unlink it from the nav/footer and
  show a "coming soon" notice here instead of the post grid.
*/
export default async function JournalPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('Journal');

  return (
    <div className="mx-auto max-w-content px-4 py-10 sm:px-6 lg:py-14">
      <Breadcrumbs items={[{ label: t('eyebrow') }]} />
      <header className="mt-6 max-w-2xl">
        <p className="eyebrow">{t('eyebrow')}</p>
        <h1 className="mt-2 font-display text-4xl font-light sm:text-5xl">{t('title')}</h1>
        <p className="mt-4 text-tamarind">{t('lead')}</p>
      </header>

      <div className="mt-16 border-t border-line py-20 text-center">
        <p className="mx-auto max-w-md font-display text-2xl font-light text-indigo-night/80">
          {t('empty')}
        </p>
      </div>
    </div>
  );
}
