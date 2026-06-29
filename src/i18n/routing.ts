import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  // Bilingual storefront: Thai + English (Build Guide §8.1)
  locales: ['th', 'en'],
  defaultLocale: 'en',
  // Always show the locale prefix so the TH | EN switch is explicit and shareable.
  localePrefix: 'always',
  // Detect region → default Thai for Thailand, English elsewhere; remember choice in a cookie.
  localeDetection: true,
});

export type Locale = (typeof routing.locales)[number];
