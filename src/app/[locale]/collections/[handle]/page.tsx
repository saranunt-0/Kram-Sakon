import { notFound } from 'next/navigation';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import type { Locale } from '@/lib/commerce/types';
import { ClothImage } from '@/components/ClothImage';
import { ProductGrid } from '@/components/ProductGrid';
import { CollectionToolbar } from '@/components/CollectionToolbar';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import {
  getAllCollectionHandles,
  getCollection,
  getProductsByCollection,
  type SortKey,
} from '@/lib/commerce/client';
import { routing } from '@/i18n/routing';

export async function generateStaticParams() {
  const handles = await getAllCollectionHandles();
  return routing.locales.flatMap((locale) => handles.map((handle) => ({ locale, handle })));
}

export default async function CollectionPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: Locale; handle: string }>;
  searchParams: Promise<{ sort?: string }>;
}) {
  const { locale, handle } = await params;
  setRequestLocale(locale);
  const { sort = 'featured' } = await searchParams;

  const collection = await getCollection(handle);
  if (!collection) notFound();

  const nav = await getTranslations('Nav');
  const products = await getProductsByCollection(handle, sort as SortKey);

  return (
    <div>
      {/* Collection hero — the "chapters" open with full-bleed cloth (§5, §7) */}
      <section className="relative h-[42vh] min-h-[320px] overflow-hidden">
        <ClothImage
          seed={collection.image.seed}
          alt={collection.image.altText}
          priority
          className="absolute inset-0 h-full w-full"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-indigo-night/75 to-indigo-night/15" />
        <div className="relative mx-auto flex h-full max-w-content flex-col justify-end px-4 pb-10 sm:px-6">
          <h1 className="font-display text-4xl font-light text-cream-resist sm:text-6xl">
            {collection.title[locale]}
          </h1>
          <p className="mt-3 max-w-xl text-cream-resist/85">{collection.description[locale]}</p>
        </div>
      </section>

      <div className="mx-auto max-w-content px-4 py-8 sm:px-6">
        <Breadcrumbs
          items={[
            { label: nav('collections'), href: '/collections' },
            { label: collection.title[locale] },
          ]}
        />
        <CollectionToolbar count={products.length} sort={sort} />
        <div className="mt-10">
          <ProductGrid products={products} />
        </div>
      </div>
    </div>
  );
}
