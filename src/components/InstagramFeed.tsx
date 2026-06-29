import { getTranslations } from 'next-intl/server';
import { ClothImage } from './ClothImage';

/* @kramsakon grid (§6). Placeholder tiles until the IG feed is wired in. */
export async function InstagramFeed() {
  const t = await getTranslations('Home');
  const tiles = Array.from({ length: 6 }, (_, i) => `ig-${i + 1}`);

  return (
    <section className="mx-auto max-w-content px-4 py-16 sm:px-6">
      <div className="mb-8 flex items-end justify-between">
        <div>
          <p className="eyebrow">{t('instagram')}</p>
          <h2 className="mt-2 font-display text-3xl">@kramsakon</h2>
        </div>
        <a
          href="https://instagram.com/kramsakon"
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm underline decoration-brass underline-offset-4 hover:text-indigo-dip"
        >
          {t('instagramCta')}
        </a>
      </div>
      <div className="grid grid-cols-3 gap-2 sm:gap-3 md:grid-cols-6">
        {tiles.map((seed, i) => (
          <a
            key={seed}
            href="https://instagram.com/kramsakon"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative aspect-square overflow-hidden bg-cream-cotton"
          >
            <ClothImage
              seed={seed}
              alt={`Kram Sakon on Instagram, post ${i + 1}`}
              className="absolute inset-0 h-full w-full transition-transform duration-500 group-hover:scale-105"
            />
          </a>
        ))}
      </div>
    </section>
  );
}
