import { notFound } from 'next/navigation';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import type { Locale } from '@/lib/commerce/types';
import { ClothImage } from '@/components/ClothImage';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { ButtonLink } from '@/components/ui';
import { getJournalPost, journalPosts } from '@/lib/journal';
import { routing } from '@/i18n/routing';

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    journalPosts.map((p) => ({ locale, handle: p.handle }))
  );
}

export default async function JournalArticle({
  params,
}: {
  params: Promise<{ locale: Locale; handle: string }>;
}) {
  const { locale, handle } = await params;
  setRequestLocale(locale);
  const post = getJournalPost(handle);
  if (!post) notFound();

  const t = await getTranslations('Journal');

  return (
    <article className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:py-14">
      <Breadcrumbs
        items={[{ label: t('eyebrow'), href: '/journal' }, { label: post.title[locale] }]}
      />
      <header className="mt-6">
        <p className="eyebrow">
          {new Intl.DateTimeFormat(locale === 'th' ? 'th-TH' : 'en-GB', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
          }).format(new Date(post.date))}
          {' · '}
          {t('readingTime', { min: post.readingMinutes })}
        </p>
        <h1 className="mt-3 font-display text-4xl font-light leading-tight sm:text-5xl">
          {post.title[locale]}
        </h1>
      </header>

      <div className="relative mt-8 aspect-[16/9] overflow-hidden bg-cream-cotton">
        <ClothImage seed={post.seed} alt={post.title[locale]} priority className="absolute inset-0 h-full w-full" />
      </div>

      <div className="measure mx-auto mt-10 flex flex-col gap-6 text-lg leading-relaxed text-indigo-night/90">
        {post.body[locale].map((para, i) => (
          <p key={i}>{para}</p>
        ))}
      </div>

      <div className="mt-12">
        <ButtonLink href="/journal" variant="text">
          ← {t('eyebrow')}
        </ButtonLink>
      </div>
    </article>
  );
}
