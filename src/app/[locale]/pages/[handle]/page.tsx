import { notFound } from 'next/navigation';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import type { Locale } from '@/lib/commerce/types';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { routing } from '@/i18n/routing';

const HANDLES = ['shipping', 'returns', 'privacy', 'terms'] as const;
type PolicyHandle = (typeof HANDLES)[number];

const TITLE_KEY: Record<PolicyHandle, string> = {
  shipping: 'shippingTitle',
  returns: 'returnsTitle',
  privacy: 'privacyTitle',
  terms: 'termsTitle',
};

/* Placeholder policy bodies (bilingual). REPLACE with legally reviewed copy. */
const BODY: Record<PolicyHandle, Record<Locale, { heading: string; text: string }[]>> = {
  shipping: {
    en: [
      { heading: 'Within Thailand', text: 'Complimentary shipping on all orders within Thailand, dispatched within 2–4 business days from Sakon Nakhon.' },
      { heading: 'International', text: 'We ship worldwide via tracked courier. Duties and taxes are calculated at checkout where Shopify Markets is enabled.' },
    ],
    th: [
      { heading: 'ภายในประเทศไทย', text: 'จัดส่งฟรีสำหรับทุกคำสั่งซื้อภายในประเทศไทย จัดส่งภายใน 2–4 วันทำการจากสกลนคร' },
      { heading: 'ต่างประเทศ', text: 'เราจัดส่งทั่วโลกผ่านบริการขนส่งแบบมีหมายเลขติดตาม ภาษีและอากรจะคำนวณในขั้นตอนชำระเงิน' },
    ],
  },
  returns: {
    en: [
      { heading: 'Returns', text: 'Unworn pieces may be returned within 14 days of delivery. Because every piece is dyed by hand, slight colour and pattern variation is not a defect and is not grounds for return.' },
      { heading: 'How to return', text: 'Contact us with your order number and we will guide you through the process.' },
    ],
    th: [
      { heading: 'การคืนสินค้า', text: 'สินค้าที่ยังไม่ผ่านการใช้งานสามารถคืนได้ภายใน 14 วันหลังได้รับสินค้า เนื่องจากทุกผืนย้อมด้วยมือ ความต่างเล็กน้อยของสีและลวดลายไม่ถือเป็นตำหนิและไม่เป็นเหตุในการคืน' },
      { heading: 'ขั้นตอนการคืน', text: 'ติดต่อเราพร้อมหมายเลขคำสั่งซื้อ แล้วเราจะแนะนำขั้นตอนให้' },
    ],
  },
  privacy: {
    en: [
      { heading: 'Personal Data Protection Act (PDPA)', text: 'This policy explains how Kram Sakon collects, uses, and protects your personal data in accordance with Thailand’s Personal Data Protection Act B.E. 2562 (2019).' },
      { heading: 'What we collect', text: 'Contact details, order and delivery information, and — only with your consent — analytics about how you use this site.' },
      { heading: 'Your rights', text: 'You may access, correct, or request deletion of your data, and withdraw analytics consent at any time. Contact hello@kramsakon.com.' },
      { heading: 'Cookies', text: 'Essential cookies run the site; analytics and marketing cookies load only after you accept them in the consent banner.' },
    ],
    th: [
      { heading: 'พระราชบัญญัติคุ้มครองข้อมูลส่วนบุคคล (PDPA)', text: 'นโยบายนี้อธิบายวิธีที่ครามสกลเก็บรวบรวม ใช้ และคุ้มครองข้อมูลส่วนบุคคลของคุณ ตามพระราชบัญญัติคุ้มครองข้อมูลส่วนบุคคล พ.ศ. 2562' },
      { heading: 'ข้อมูลที่เราเก็บ', text: 'ข้อมูลติดต่อ ข้อมูลคำสั่งซื้อและการจัดส่ง และข้อมูลการใช้งานเว็บไซต์เฉพาะเมื่อได้รับความยินยอมจากคุณเท่านั้น' },
      { heading: 'สิทธิของคุณ', text: 'คุณสามารถเข้าถึง แก้ไข หรือขอลบข้อมูลของคุณ และถอนความยินยอมการวิเคราะห์ได้ทุกเมื่อ ติดต่อ hello@kramsakon.com' },
      { heading: 'คุกกี้', text: 'คุกกี้ที่จำเป็นใช้เพื่อให้เว็บไซต์ทำงาน ส่วนคุกกี้วิเคราะห์และการตลาดจะทำงานหลังจากคุณยอมรับในแถบความยินยอมแล้วเท่านั้น' },
    ],
  },
  terms: {
    en: [
      { heading: 'Terms of Service', text: 'By using this site and placing an order you agree to these terms. Prices and availability are subject to change.' },
      { heading: 'Handmade goods', text: 'All pieces are made by hand; descriptions and images are indicative. Variation between pieces is inherent to natural indigo craft.' },
    ],
    th: [
      { heading: 'ข้อกำหนดการให้บริการ', text: 'การใช้เว็บไซต์นี้และการสั่งซื้อถือว่าคุณยอมรับข้อกำหนดเหล่านี้ ราคาและความพร้อมจำหน่ายอาจเปลี่ยนแปลงได้' },
      { heading: 'สินค้าทำมือ', text: 'สินค้าทุกชิ้นทำด้วยมือ คำอธิบายและรูปภาพเป็นเพียงตัวอย่าง ความแตกต่างระหว่างชิ้นเป็นธรรมชาติของงานครามทำมือ' },
    ],
  },
};

export function generateStaticParams() {
  return routing.locales.flatMap((locale) => HANDLES.map((handle) => ({ locale, handle })));
}

export default async function PolicyPage({
  params,
}: {
  params: Promise<{ locale: Locale; handle: string }>;
}) {
  const { locale, handle } = await params;
  setRequestLocale(locale);

  if (!HANDLES.includes(handle as PolicyHandle)) notFound();
  const h = handle as PolicyHandle;

  const t = await getTranslations('Policy');
  const sections = BODY[h][locale];

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:py-16">
      <Breadcrumbs items={[{ label: t(TITLE_KEY[h]) }]} />
      <h1 className="mt-6 font-display text-4xl font-light sm:text-5xl">{t(TITLE_KEY[h])}</h1>
      <p className="mt-3 text-xs uppercase tracking-widest text-indigo-first">
        {t('lastUpdated')}: 2026-06-26
      </p>

      <div className="mt-4 border-l-2 border-brass bg-cream-cotton/60 p-4 text-sm text-tamarind">
        {t('draftNote')}
      </div>

      <div className="mt-10 flex flex-col gap-8">
        {sections.map((s, i) => (
          <section key={i}>
            <h2 className="font-display text-2xl font-light">{s.heading}</h2>
            <p className="measure mt-3 text-indigo-night/85">{s.text}</p>
          </section>
        ))}
      </div>
    </div>
  );
}
