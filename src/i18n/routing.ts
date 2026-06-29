import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  // Bilingual storefront: Thai + English (Build Guide §8.1)
  locales: ['th', 'en'],
  defaultLocale: 'en',
  // Always show the locale prefix so the TH | EN switch is explicit and shareable.
  localePrefix: 'always',
  // No middleware in the static export, so server-side locale detection is gone.
  // A client redirect in src/app/page.tsx restores best-effort detection (§4.3).
  localeDetection: false,
});

export type Locale = (typeof routing.locales)[number];
