import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import type { Locale } from '@/lib/commerce/types';
import { ProductGallery } from '@/components/ProductGallery';
import { ProductInfo } from '@/components/ProductInfo';
import { ProductGrid } from '@/components/ProductGrid';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { SectionHeading } from '@/components/Breadcrumbs';
import {
  getAllProductHandles,
  getProduct,
  getRelatedProducts,
} from '@/lib/commerce/client';
import { routing } from '@/i18n/routing';

export async function generateStaticParams() {
  const handles = await getAllProductHandles();
  return routing.locales.flatMap((locale) => handles.map((handle) => ({ locale, handle })));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale; handle: string }>;
}): Promise<Metadata> {
  const { locale, handle } = await params;
  const product = await getProduct(handle);
  if (!product) return {};
  return {
    title: product.title[locale],
    description: product.description[locale].slice(0, 160),
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ locale: Locale; handle: string }>;
}) {
  const { locale, handle } = await params;
  setRequestLocale(locale);

  const product = await getProduct(handle);
  if (!product) notFound();

  const nav = await getTranslations('Nav');
  const t = await getTranslations('Product');
  const related = await getRelatedProducts(handle);

  const minPrice = product.variants.reduce(
    (min, v) => (parseFloat(v.price.amount) < parseFloat(min.amount) ? v.price : min),
    product.variants[0].price
  );

  // Product structured data (§9). Note: this advertises THB; a production build
  // would emit per-locale/region offers from Shopify Markets.
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.title[locale],
    description: product.description[locale],
    brand: { '@type': 'Brand', name: 'Kram Sakon' },
    offers: {
      '@type': 'Offer',
      priceCurrency: minPrice.currencyCode,
      price: minPrice.amount,
      availability: product.variants.some((v) => v.availableForSale)
        ? 'https://schema.org/InStock'
        : 'https://schema.org/OutOfStock',
    },
  };

  return (
    <div className="mx-auto max-w-content px-4 py-10 sm:px-6 lg:py-14">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Breadcrumbs
        items={[
          { label: nav('shop'), href: '/shop' },
          { label: product.title[locale] },
        ]}
      />

      <div className="mt-6 grid gap-10 lg:grid-cols-2 lg:gap-16">
        <ProductGallery images={product.images} />
        <div className="lg:pt-4">
          <ProductInfo product={product} />
        </div>
      </div>

      {related.length > 0 && (
        <section className="mt-24">
          <SectionHeading title={t('relatedTitle')} />
          <div className="mt-8">
            <ProductGrid products={related} />
          </div>
        </section>
      )}
    </div>
  );
}
