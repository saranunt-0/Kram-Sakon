import type { MetadataRoute } from 'next';
import { routing } from '@/i18n/routing';
import { getAllCollectionHandles, getAllProductHandles } from '@/lib/commerce/client';
import { journalPosts } from '@/lib/journal';

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';

// Emit a static sitemap.xml file in the export (output: 'export' requires this).
export const dynamic = 'force-static';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [collections, products] = await Promise.all([
    getAllCollectionHandles(),
    getAllProductHandles(),
  ]);

  const staticPaths = [
    '',
    'shop',
    'collections',
    'story',
    'journal',
    'visit',
    'contact',
    'stockists',
    'pages/shipping',
    'pages/returns',
    'pages/privacy',
    'pages/terms',
  ];

  const dynamicPaths = [
    ...collections.map((h) => `collections/${h}`),
    ...products.map((h) => `products/${h}`),
    ...journalPosts.map((p) => `journal/${p.handle}`),
  ];

  const all = [...staticPaths, ...dynamicPaths];

  // Per-locale entries with hreflang alternates (§8.2).
  return all.map((path) => {
    const languages = Object.fromEntries(
      routing.locales.map((l) => [l, `${BASE}/${l}${path ? `/${path}` : ''}`])
    );
    return {
      url: `${BASE}/${routing.defaultLocale}${path ? `/${path}` : ''}`,
      lastModified: new Date(),
      alternates: { languages },
    };
  });
}
