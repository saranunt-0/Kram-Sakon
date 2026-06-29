import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

const nextConfig: NextConfig = {
  // Static frontend deployment (deploy/static-frontend): emit plain HTML/CSS/JS
  // to `out/` with no Node server. See STATIC-DEPLOYMENT-PLAN.md.
  output: 'export',
  // Trailing slashes make directory-style URLs (`/en/`) resolve cleanly on
  // static hosts (Cloudflare Pages / Netlify) without server rewrites.
  trailingSlash: true,
  // No Image Optimization server in a static export. We only render CSS/SVG
  // placeholders today, so this has no visual impact. When real product imagery
  // lands, add the Shopify CDN host to remotePatterns and use a custom loader.
  images: {
    unoptimized: true,
    remotePatterns: [],
  },
};

export default withNextIntl(nextConfig);
