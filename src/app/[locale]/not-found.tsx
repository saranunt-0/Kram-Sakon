import { getTranslations } from 'next-intl/server';
import { ButtonLink } from '@/components/ui';

export default async function NotFound() {
  const t = await getTranslations('Common');
  return (
    <div className="mx-auto flex max-w-content flex-col items-center justify-center px-6 py-32 text-center">
      <p className="eyebrow">404</p>
      <h1 className="mt-3 font-display text-4xl font-light">{t('notFoundTitle')}</h1>
      <p className="mt-4 max-w-md text-tamarind">{t('notFoundBody')}</p>
      <div className="mt-8">
        <ButtonLink href="/" variant="secondary">
          {t('notFoundCta')}
        </ButtonLink>
      </div>
    </div>
  );
}
