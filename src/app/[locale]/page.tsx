import { getTranslations, setRequestLocale } from 'next-intl/server';
import type { Locale } from '@/lib/commerce/types';
import { Hero } from '@/components/Hero';
import { StorySlideshow } from '@/components/StorySlideshow';
import { CategoryTile } from '@/components/CategoryTile';
import { FeaturedChapter } from '@/components/FeaturedChapter';
import { CredibilityBand } from '@/components/CredibilityBand';
import { InstagramFeed } from '@/components/InstagramFeed';
import { ProductGrid } from '@/components/ProductGrid';
import { Reveal } from '@/components/Reveal';
import { ButtonLink } from '@/components/ui';
import { getCollections, getMostLoved } from '@/lib/commerce/client';

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations('Home');
  const [collections, mostLoved] = await Promise.all([getCollections(), getMostLoved()]);

  return (
    <>
      <Hero />

      {/* Small story section — rotating process photography */}
      <StorySlideshow />

      {/* Brand thesis + category tiles */}
      <section className="mx-auto max-w-content px-4 py-20 sm:px-6 lg:py-28">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.4fr] lg:gap-16">
          <Reveal className="lg:sticky lg:top-32 lg:self-start">
            <p className="eyebrow">{t('thesisEyebrow')}</p>
            <h2 className="mt-3 font-display text-4xl font-light leading-tight sm:text-5xl">
              {t('thesisHeadline')}
            </h2>
            <p className="measure mt-6 text-tamarind">{t('thesisBody')}</p>
            <div className="mt-8">
              <ButtonLink href="/story" variant="text">
                {t('thesisCta')}
              </ButtonLink>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="eyebrow mb-5">{t('shopByCategory')}</p>
            <div className="grid grid-cols-2 gap-5 sm:grid-cols-3">
              {collections.map((c) => (
                <CategoryTile key={c.handle} collection={c} locale={locale} />
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <FeaturedChapter products={mostLoved} />

      <CredibilityBand />

      {/* Most loved */}
      <section className="mx-auto max-w-content px-4 py-20 sm:px-6 lg:py-28">
        <Reveal className="mb-10 flex items-end justify-between">
          <div>
            <p className="eyebrow">{t('mostLoved')}</p>
            <p className="mt-2 max-w-md font-display text-2xl font-light text-indigo-night/80">
              {t('mostLovedSub')}
            </p>
          </div>
          <ButtonLink href="/shop" variant="text" className="hidden sm:inline-flex">
            {t('viewAll')}
          </ButtonLink>
        </Reveal>
        <ProductGrid products={mostLoved} />
      </section>

      <InstagramFeed />
    </>
  );
}
