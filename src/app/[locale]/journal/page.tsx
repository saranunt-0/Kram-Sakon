import { getTranslations, setRequestLocale } from 'next-intl/server';
import type { Locale } from '@/lib/commerce/types';
import { Link } from '@/i18n/navigation';
import { ClothImage } from '@/components/ClothImage';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { journalPosts } from '@/lib/journal';

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

      <div className="mt-12 grid gap-x-8 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
        {journalPosts.map((post) => (
          <Link key={post.handle} href={`/journal/${post.handle}`} className="group block">
            <div className="relative aspect-[3/2] overflow-hidden bg-cream-cotton">
              <ClothImage
                seed={post.seed}
                alt={post.title[locale]}
                className="absolute inset-0 h-full w-full transition-transform duration-700 group-hover:scale-105"
              />
            </div>
            <p className="eyebrow mt-4">
              {new Intl.DateTimeFormat(locale === 'th' ? 'th-TH' : 'en-GB', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
              }).format(new Date(post.date))}
              {' · '}
              {t('readingTime', { min: post.readingMinutes })}
            </p>
            <h2 className="mt-2 font-display text-xl leading-snug group-hover:text-indigo-dip">
              {post.title[locale]}
            </h2>
            <p className="mt-2 text-sm text-tamarind">{post.excerpt[locale]}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
