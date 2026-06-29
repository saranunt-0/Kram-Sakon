import { getTranslations, setRequestLocale } from 'next-intl/server';
import type { Locale } from '@/lib/commerce/types';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { DemoForm } from '@/components/DemoForm';

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('Contact');

  return (
    <div className="mx-auto max-w-content px-4 py-10 sm:px-6 lg:py-14">
      <Breadcrumbs items={[{ label: t('eyebrow') }]} />
      <div className="mt-6 grid gap-12 lg:grid-cols-2 lg:gap-20">
        <div>
          <p className="eyebrow">{t('eyebrow')}</p>
          <h1 className="mt-2 font-display text-4xl font-light sm:text-5xl">{t('title')}</h1>
          <p className="mt-4 max-w-md text-tamarind">{t('lead')}</p>

          <div className="mt-10">
            <h2 className="eyebrow !text-indigo-night/70">{t('detailsTitle')}</h2>
            <ul className="mt-3 flex flex-col gap-1 text-lg">
              <li>
                <a href="tel:+66915621671" className="hover:text-indigo-dip">
                  +66 91 562 1671
                </a>
              </li>
              <li>
                <a href="mailto:hello@kramsakon.com" className="hover:text-indigo-dip">
                  hello@kramsakon.com
                </a>
              </li>
              <li className="text-tamarind">Sakon Nakhon, Thailand</li>
            </ul>
          </div>
        </div>

        <div className="lg:pt-4">
          <DemoForm
            submitLabel={t('submit')}
            successMessage={t('success')}
            fields={[
              { name: 'name', label: t('name'), required: true },
              { name: 'email', label: t('email'), type: 'email', required: true },
              { name: 'subject', label: t('subject') },
              { name: 'message', label: t('message'), type: 'textarea', required: true },
            ]}
          />
        </div>
      </div>
    </div>
  );
}
