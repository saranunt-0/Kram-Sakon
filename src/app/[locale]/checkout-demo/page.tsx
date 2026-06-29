import { setRequestLocale } from 'next-intl/server';
import type { Locale } from '@/lib/commerce/types';
import { ButtonLink } from '@/components/ui';

/*
  Stand-in for Shopify's hosted checkout. In production the CartDrawer's
  "Checkout" redirects to cart.checkoutUrl on Shopify (no payment code lives in
  this repo — §1.2, §11). This page documents that handoff for the demo.
*/
export default async function CheckoutDemoPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const th = locale === 'th';

  return (
    <div className="mx-auto flex max-w-xl flex-col items-center px-6 py-28 text-center">
      <div className="grid h-16 w-16 place-items-center rounded-full bg-indigo-vat text-cream-resist">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden>
          <path d="M6 8h12l-1 12H7L6 8Z M9 8V6a3 3 0 0 1 6 0v2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      <h1 className="mt-6 font-display text-3xl font-light">
        {th ? 'นี่คือจุดเชื่อมต่อการชำระเงิน' : 'This is the checkout handoff'}
      </h1>
      <p className="mt-4 text-tamarind">
        {th
          ? 'ในเว็บไซต์จริง ปุ่ม “ชำระเงิน” จะพาคุณไปยังหน้าชำระเงินที่ปลอดภัยของ Shopify (cart.checkoutUrl) เว็บนี้เป็นเวอร์ชันสาธิต จึงไม่มีการประมวลผลการชำระเงินจริง'
          : 'In the live site, the “Checkout” button redirects to Shopify’s secure hosted checkout (cart.checkoutUrl). This is a demo build, so no real payment is processed and no card data is handled here.'}
      </p>
      <div className="mt-8 flex gap-4">
        <ButtonLink href="/shop" variant="secondary">
          {th ? 'เลือกชมสินค้าต่อ' : 'Continue shopping'}
        </ButtonLink>
        <ButtonLink href="/" variant="text">
          {th ? 'กลับหน้าแรก' : 'Back home'}
        </ButtonLink>
      </div>
    </div>
  );
}
