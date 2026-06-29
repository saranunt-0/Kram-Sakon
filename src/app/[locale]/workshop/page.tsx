'use client';

import { useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { Link, useRouter } from '@/i18n/navigation';

/*
  Workshop is a nav entry that simply forwards visitors to the Contact page,
  where workshops are arranged (founder guidance). Kept as a real `/workshop`
  route so the URL exists and is shareable; it client-redirects to /contact and
  offers a manual link as a no-JS fallback. The locale prefix is preserved by
  next-intl's locale-aware router/Link.
*/
export default function WorkshopRedirect() {
  const router = useRouter();
  const t = useTranslations('Nav');

  useEffect(() => {
    router.replace('/contact');
  }, [router]);

  return (
    <div className="mx-auto flex min-h-[40vh] max-w-content flex-col items-center justify-center px-4 py-20 text-center">
      <p className="text-tamarind">
        {t('workshop')} ·{' '}
        <Link href="/contact" className="underline decoration-brass underline-offset-4 hover:text-indigo-dip">
          {t('contact')}
        </Link>
      </p>
    </div>
  );
}
