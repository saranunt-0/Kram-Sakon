import { getLocale, getTranslations } from 'next-intl/server';
import { ClothImage } from './ClothImage';
import { ButtonLink } from './ui';
import { ProductCard } from './ProductCard';
import { Reveal } from './Reveal';
import type { Locale, Product } from '@/lib/commerce/types';

/*
  Large process image + editorial copy + CTAs + a couple of product cards
  (≈ Fable "Pretty Pansies", §6, §7.1).
*/
export async function FeaturedChapter({ products }: { products: Product[] }) {
  const t = await getTranslations('Home');
  const locale = (await getLocale()) as Locale;

  return (
    <section className="mx-auto max-w-content px-4 py-20 sm:px-6 lg:py-28">
      <div className="grid items-center gap-12 lg:grid-cols-2">
        <Reveal className="relative aspect-[4/5] overflow-hidden bg-cream-cotton">
          <ClothImage
            seed="chapter-process-vat"
            src="/images/closeup_01.jpg"
            alt="A dyer lowering folded cloth into the living indigo vat"
            motif="spiral"
            className="absolute inset-0 h-full w-full"
          />
        </Reveal>

        <Reveal delay={0.1} className="lg:pl-6">
          <p className="eyebrow">{t('chapterEyebrow')}</p>
          <h2 className="mt-3 font-display text-3xl font-light leading-tight sm:text-4xl">
            {t('chapterHeadline')}
          </h2>
          <p className="measure mt-5 text-base text-tamarind">{t('chapterBody')}</p>
          <div className="mt-7 flex flex-wrap gap-4">
            <ButtonLink href="/story" variant="secondary">
              {t('chapterCtaStory')}
            </ButtonLink>
            <ButtonLink href="/shop" variant="text">
              {t('chapterCtaShop')}
            </ButtonLink>
          </div>

          {products.length > 0 && (
            <div className="mt-10 grid grid-cols-2 gap-6">
              {products.slice(0, 2).map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          )}
          <span className="sr-only">{locale}</span>
        </Reveal>
      </div>
    </section>
  );
}
