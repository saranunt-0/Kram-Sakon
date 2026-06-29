import { getTranslations, setRequestLocale } from 'next-intl/server';
import type { Locale } from '@/lib/commerce/types';
import { ClothImage } from '@/components/ClothImage';
import { Reveal } from '@/components/Reveal';
import { ButtonLink } from '@/components/ui';

export default async function StoryPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('Story');

  const chapters = [
    { title: t('s1Title'), body: t('s1Body'), seed: 'story-plant', motif: 'fold' as const },
    { title: t('s2Title'), body: t('s2Body'), seed: 'story-vat', motif: 'shibori' as const },
    { title: t('s3Title'), body: t('s3Body'), seed: 'story-hand', motif: 'spiral' as const },
    { title: t('s4Title'), body: t('s4Body'), seed: 'story-city', motif: 'shibori' as const },
  ];

  return (
    <article>
      {/* Hero */}
      <section className="relative h-[64vh] min-h-[440px] overflow-hidden">
        <ClothImage
          seed="story-hero-loom"
          alt="Indigo cloth on the loom in Sakon Nakhon"
          priority
          motif="shibori"
          className="absolute inset-0 h-full w-full"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-indigo-night/80 via-indigo-night/30 to-indigo-night/20" />
        <div className="relative mx-auto flex h-full max-w-content flex-col justify-end px-4 pb-16 sm:px-6">
          <p className="eyebrow !text-cream-resist/80">{t('eyebrow')}</p>
          <h1 className="mt-3 max-w-3xl font-display text-4xl font-light leading-tight text-cream-resist sm:text-6xl">
            {t('title')}
          </h1>
        </div>
      </section>

      {/* Lead */}
      <section className="mx-auto max-w-content px-4 py-20 text-center sm:px-6">
        <p className="mx-auto max-w-2xl font-display text-2xl font-light leading-relaxed text-indigo-night/85 sm:text-3xl">
          {t('lead')}
        </p>
      </section>

      {/* Chapters — alternating image/text */}
      {chapters.map((ch, i) => (
        <section
          key={ch.seed}
          className={`mx-auto grid max-w-content items-center gap-10 px-4 py-12 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:py-16 ${
            i % 2 === 1 ? 'lg:[&>div:first-child]:order-2' : ''
          }`}
        >
          <Reveal className="relative aspect-[4/5] overflow-hidden bg-cream-cotton">
            <ClothImage
              seed={ch.seed}
              alt={ch.title}
              motif={ch.motif}
              className="absolute inset-0 h-full w-full"
            />
          </Reveal>
          <Reveal delay={0.1}>
            <p className="eyebrow">{`0${i + 1}`}</p>
            <h2 className="mt-3 font-display text-3xl font-light sm:text-4xl">{ch.title}</h2>
            <p className="measure mt-5 text-tamarind">{ch.body}</p>
          </Reveal>
        </section>
      ))}

      {/* Close */}
      <section className="dip-dye mt-12 text-cream-resist">
        <div className="mx-auto max-w-content px-4 py-20 text-center sm:px-6">
          <p className="mx-auto max-w-xl font-display text-2xl font-light italic">
            “{t('s2Body').split('.')[0]}.”
          </p>
          <div className="mt-8">
            <ButtonLink
              href="/shop"
              variant="primary"
              className="bg-cream-resist !text-indigo-night hover:!bg-brass hover:!text-cream-resist"
            >
              {locale === 'th' ? 'เลือกชมคอลเลกชัน' : 'Shop the collection'}
            </ButtonLink>
          </div>
        </div>
      </section>
    </article>
  );
}
