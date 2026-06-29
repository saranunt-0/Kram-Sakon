import { getTranslations } from 'next-intl/server';

/* Quiet single-row credential band (§6, §7.1). */
export async function CredibilityBand() {
  const t = await getTranslations('Home');
  return (
    <section className="dip-dye text-cream-resist">
      <div className="mx-auto max-w-content px-4 py-12 text-center sm:px-6">
        <p className="mx-auto max-w-3xl font-display text-lg font-light tracking-wide sm:text-xl">
          {t('credibility')}
        </p>
      </div>
    </section>
  );
}
