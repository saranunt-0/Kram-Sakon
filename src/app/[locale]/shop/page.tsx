import { getTranslations, setRequestLocale } from 'next-intl/server';
import type { Locale } from '@/lib/commerce/types';
import { ProductBrowser } from '@/components/ProductBrowser';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { getProducts } from '@/lib/commerce/client';

export default async function ShopPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations('Collection');
  const nav = await getTranslations('Nav');
  // Full list in featured order; the client ProductBrowser reorders on sort.
  const products = await getProducts('featured');

  return (
    <div className="mx-auto max-w-content px-4 py-10 sm:px-6 lg:py-14">
      <Breadcrumbs items={[{ label: nav('shop'), href: '/shop' }, { label: t('allProducts') }]} />
      <h1 className="mt-6 font-display text-4xl font-light sm:text-5xl">{t('allProducts')}</h1>
      <ProductBrowser products={products} />
    </div>
  );
}
