import { getTranslations, setRequestLocale } from 'next-intl/server';
import type { Locale } from '@/lib/commerce/types';
import { Link } from '@/i18n/navigation';
import { ClothImage } from '@/components/ClothImage';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { getCollections } from '@/lib/commerce/client';

export default async function CollectionsIndex({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const nav = await getTranslations('Nav');
  const collections = await getCollections();

  return (
    <div className="mx-auto max-w-content px-4 py-10 sm:px-6 lg:py-14">
      <Breadcrumbs items={[{ label: nav('collections') }]} />
      <h1 className="mt-6 font-display text-4xl font-light sm:text-5xl">{nav('collections')}</h1>

      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {collections.map((c) => (
          <Link key={c.handle} href={`/collections/${c.handle}`} className="group block">
            <div className="relative aspect-[3/4] overflow-hidden bg-cream-cotton">
              <ClothImage
                seed={c.image.seed}
                alt={c.image.altText}
                className="absolute inset-0 h-full w-full transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-indigo-night/60 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-6">
                <h2 className="font-display text-2xl text-cream-resist">{c.title[locale]}</h2>
                <p className="mt-1 text-sm text-cream-resist/80">{c.description[locale]}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
