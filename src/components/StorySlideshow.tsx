'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { useTranslations } from 'next-intl';
import { ButtonLink } from './ui';

/*
  Small home-page story section: a slideshow that rotates between a few process
  photographs with a short caption (§7.1). Auto-advances unless the visitor
  prefers reduced motion. Pure client component over real static images.
*/
const SLIDES = [
  { src: '/images/process_01.jpg', key: 'slide1' },
  { src: '/images/process_03.png', key: 'slide2' },
  { src: '/images/process_05.png', key: 'slide3' },
] as const;

export function StorySlideshow() {
  const t = useTranslations('Home');
  const reduce = useReducedMotion();
  const [i, setI] = useState(0);

  useEffect(() => {
    if (reduce) return;
    const id = setInterval(() => setI((n) => (n + 1) % SLIDES.length), 5000);
    return () => clearInterval(id);
  }, [reduce]);

  const slide = SLIDES[i];

  return (
    <section className="mx-auto max-w-content px-4 py-16 sm:px-6 lg:py-24">
      <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
        {/* Image stage */}
        <div className="relative aspect-[4/3] overflow-hidden bg-cream-cotton">
          <AnimatePresence mode="sync">
            <motion.div
              key={slide.key}
              className="absolute inset-0 bg-indigo-night bg-cover bg-center"
              style={{ backgroundImage: `url("${slide.src}")` }}
              initial={reduce ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={reduce ? undefined : { opacity: 0 }}
              transition={{ duration: 1 }}
              role="img"
              aria-label={t(`story.${slide.key}.alt`)}
            />
          </AnimatePresence>
          {/* Dots */}
          <div className="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 gap-2">
            {SLIDES.map((s, idx) => (
              <button
                key={s.key}
                type="button"
                aria-label={`Slide ${idx + 1}`}
                aria-current={idx === i}
                onClick={() => setI(idx)}
                className={`h-1.5 w-6 rounded-full transition-colors ${
                  idx === i ? 'bg-cream-resist' : 'bg-cream-resist/40'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Caption */}
        <div className="lg:pl-4">
          <p className="eyebrow">{t('story.eyebrow')}</p>
          <h2 className="mt-3 font-display text-3xl font-light leading-tight sm:text-4xl">
            {t('story.headline')}
          </h2>
          <AnimatePresence mode="wait">
            <motion.p
              key={slide.key}
              className="measure mt-5 min-h-[5.5rem] text-tamarind"
              initial={reduce ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? undefined : { opacity: 0, y: -8 }}
              transition={{ duration: 0.5 }}
            >
              {t(`story.${slide.key}.text`)}
            </motion.p>
          </AnimatePresence>
          <div className="mt-7 flex flex-wrap gap-4">
            <ButtonLink href="/story" variant="secondary">
              {t('story.cta')}
            </ButtonLink>
            <ButtonLink href="/workshop" variant="text">
              {t('story.workshopCta')}
            </ButtonLink>
          </div>
        </div>
      </div>
    </section>
  );
}
