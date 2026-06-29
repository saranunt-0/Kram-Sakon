'use client';

import { useState } from 'react';
import { ClothImage } from './ClothImage';
import type { ProductImage } from '@/lib/commerce/types';

/* PDP gallery — large image + thumbnails (§6). Zoom = simple scale on hover. */
export function ProductGallery({ images }: { images: ProductImage[] }) {
  const [active, setActive] = useState(0);
  const current = images[active] ?? images[0];

  return (
    <div className="flex flex-col-reverse gap-4 md:flex-row">
      {images.length > 1 && (
        <div className="flex gap-3 md:flex-col">
          {images.map((img, i) => (
            <button
              key={img.seed}
              type="button"
              onClick={() => setActive(i)}
              aria-label={img.altText}
              aria-current={i === active}
              className={`relative h-20 w-16 shrink-0 overflow-hidden border transition-colors ${
                i === active ? 'border-indigo-vat' : 'border-line hover:border-indigo-first'
              }`}
            >
              <ClothImage seed={img.seed} alt={img.altText} className="absolute inset-0 h-full w-full" />
            </button>
          ))}
        </div>
      )}

      <div className="group relative aspect-[4/5] flex-1 overflow-hidden bg-cream-cotton">
        <ClothImage
          seed={current.seed}
          alt={current.altText}
          priority
          className="absolute inset-0 h-full w-full transition-transform duration-700 group-hover:scale-105"
        />
      </div>
    </div>
  );
}
