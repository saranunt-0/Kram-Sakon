import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

const nextConfig: NextConfig = {
  // When real product imagery lands, add the Shopify CDN host here so next/image
  // can optimize it, e.g. { protocol: 'https', hostname: 'cdn.shopify.com' }.
  images: {
    remotePatterns: [],
  },
};

export default withNextIntl(nextConfig);
