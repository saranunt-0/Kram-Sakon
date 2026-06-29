import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { hasLocale, NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations, setRequestLocale } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import { ShopProvider } from '@/lib/cart/context';
import { AnnouncementBar } from '@/components/AnnouncementBar';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { CartDrawer } from '@/components/CartDrawer';
import { CookieConsent } from '@/components/CookieConsent';
import { getCollections, getProducts } from '@/lib/commerce/client';
import { fontVariables } from '../fonts';
import '../globals.css';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Brand' });
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';

  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: `${t('name')} — ${t('tagline')}`,
      template: `%s · ${t('name')}`,
    },
    description: t('tagline'),
    alternates: {
      languages: { th: '/th', en: '/en', 'x-default': '/en' },
    },
    openGraph: {
      title: `${t('name')} — ${t('tagline')}`,
      description: t('tagline'),
      type: 'website',
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();

  // Enable static rendering for this locale.
  setRequestLocale(locale);

  const messages = await getMessages();
  const [collections, products] = await Promise.all([getCollections(), getProducts()]);

  return (
    <html lang={locale} className={fontVariables}>
      <body className="min-h-screen bg-cream text-indigo-night antialiased">
        <NextIntlClientProvider locale={locale} messages={messages}>
          <ShopProvider>
            <a
              href="#main"
              className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:bg-indigo-vat focus:px-4 focus:py-2 focus:text-cream-resist"
            >
              Skip to content
            </a>
            <AnnouncementBar />
            <Header collections={collections} products={products} />
            <main id="main">{children}</main>
            <Footer />
            <CartDrawer />
            <CookieConsent />
          </ShopProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
