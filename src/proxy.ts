// Next.js 16: "Middleware" is now "Proxy" (same functionality, new file name).
// next-intl's request handler runs here to detect locale and rewrite to /th or /en.
import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

export default createMiddleware(routing);

export const config = {
  // Run on everything except API routes, Next internals, and files with an extension.
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
};
