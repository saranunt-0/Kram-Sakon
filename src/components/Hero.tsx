'use client';

import { motion, useReducedMotion } from 'motion/react';
import { useTranslations } from 'next-intl';
import { ClothImage } from './ClothImage';
import { ButtonLink } from './ui';

/*
  Full-bleed indigo material + serif headline + one CTA, slow reveal (§5, §7.1).
  The cloth is the hero — no stock lifestyle banner.
*/
export function Hero() {
  const t = useTranslations('Home');
  const reduce = useReducedMotion();

  return (
    <section className="relative h-[82vh] min-h-[560px] w-full overflow-hidden">
      <ClothImage
        seed="hero-indigo-vat"
        src="/images/closeup_16.png"
        alt="Cloth lifted from a natural indigo vat, oxidising from green to deep blue"
        motif="shibori"
        priority
        className="absolute inset-0 h-full w-full"
      />
      {/* Legibility scrim */}
      <div className="absolute inset-0 bg-gradient-to-t from-indigo-night/80 via-indigo-night/30 to-indigo-night/10" />

      <div className="relative mx-auto flex h-full max-w-content flex-col items-start justify-end px-4 pb-20 sm:px-6 lg:pb-28">
        <motion.p
          className="eyebrow !text-cream-resist/80"
          initial={reduce ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          {t('heroEyebrow')}
        </motion.p>
        <motion.h1
          className="mt-4 max-w-3xl font-display text-4xl font-light leading-[1.05] text-cream-resist sm:text-6xl lg:text-7xl"
          initial={reduce ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        >
          {t('heroHeadline')}
        </motion.h1>
        <motion.p
          className="mt-5 max-w-xl text-base text-cream-resist/85 sm:text-lg"
          initial={reduce ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.25, ease: 'easeOut' }}
        >
          {t('heroSub')}
        </motion.p>
        <motion.div
          className="mt-8"
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.4, ease: 'easeOut' }}
        >
          <ButtonLink
            href="/shop"
            variant="primary"
            className="bg-cream-resist !text-indigo-night hover:!bg-brass hover:!text-cream-resist"
          >
            {t('heroCta')}
          </ButtonLink>
        </motion.div>
      </div>
    </section>
  );
}
