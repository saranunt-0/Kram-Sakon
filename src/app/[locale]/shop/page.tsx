import { getTranslations, setRequestLocale } from 'next-intl/server';
import type { Locale } from '@/lib/commerce/types';
import { ProductGrid } from '@/components/ProductGrid';
import { CollectionToolbar } from '@/components/CollectionToolbar';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { getProducts, type SortKey } from '@/lib/commerce/client';

export default async function ShopPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: Locale }>;
  searchParams: Promise<{ sort?: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const { sort = 'featured' } = await searchParams;

  const t = await getTranslations('Collection');
  const nav = await getTranslations('Nav');
  const products = await getProducts(sort as SortKey);

  return (
    <div className="mx-auto max-w-content px-4 py-10 sm:px-6 lg:py-14">
      <Breadcrumbs items={[{ label: nav('shop'), href: '/shop' }, { label: t('allProducts') }]} />
      <h1 className="mt-6 font-display text-4xl font-light sm:text-5xl">{t('allProducts')}</h1>
      <CollectionToolbar count={products.length} sort={sort} />
      <div className="mt-10">
        <ProductGrid products={products} />
      </div>
    </div>
  );
}
