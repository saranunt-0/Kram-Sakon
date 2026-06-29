'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { LanguageSwitcher } from './LanguageSwitcher';
import { RegionCurrencySwitcher } from './RegionCurrencySwitcher';

/*
  Thin Night-Indigo bar with rotating messages; hosts the region/currency and
  language switches (§6). Rotation pauses for reduced-motion users.
*/
export function AnnouncementBar() {
  const t = useTranslations('Announcement');
  const messages = [t('natural'), t('handmade')];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % messages.length), 5000);
    return () => clearInterval(id);
  }, [messages.length]);

  return (
    <div className="bg-indigo-night text-cream-resist">
      <div className="mx-auto flex max-w-content items-center justify-between gap-4 px-4 py-2 sm:px-6">
        <div className="hidden w-40 sm:block">
          <RegionCurrencySwitcher tone="cream" />
        </div>
        <p
          key={index}
          className="flex-1 text-center text-xs tracking-wide opacity-90"
          style={{ animation: 'fade-in 600ms ease' }}
        >
          {messages[index]}
        </p>
        <div className="flex w-40 justify-end">
          <LanguageSwitcher tone="cream" />
        </div>
      </div>
      <style>{`@keyframes fade-in { from { opacity: 0 } to { opacity: 0.9 } }`}</style>
    </div>
  );
}
