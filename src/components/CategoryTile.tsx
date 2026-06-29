import { Link } from '@/i18n/navigation';
import { ClothImage } from './ClothImage';
import type { Collection, Locale } from '@/lib/commerce/types';

/* Image + label tile for the "shop by category" row (§6, §7.1). */
export function CategoryTile({
  collection,
  locale,
}: {
  collection: Collection;
  locale: Locale;
}) {
  return (
    <Link href={`/collections/${collection.handle}`} className="group block">
      <div className="relative aspect-[3/4] overflow-hidden bg-cream-cotton">
        <ClothImage
          seed={collection.image.seed}
          src={collection.image.src}
          alt={collection.image.altText}
          position="top"
          className="absolute inset-0 h-full w-full transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-indigo-night/55 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 p-5">
          <h3 className="font-display text-2xl text-cream-resist">{collection.title[locale]}</h3>
          <span className="mt-1 inline-block text-xs uppercase tracking-widest text-cream-resist/80 underline decoration-brass underline-offset-4 opacity-0 transition-opacity group-hover:opacity-100">
            {collection.description[locale]}
          </span>
        </div>
      </div>
    </Link>
  );
}
