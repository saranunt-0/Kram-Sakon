'use client';

import { useTranslations } from 'next-intl';
import type { SortKey } from './ProductBrowser';

/*
  Filter + sort toolbar (§6). First draft ships sort + a result count; the filter
  button is a stub until faceted filtering is wired to the Storefront API.

  Sort is handled client-side via onSortChange (no URL query) so Shop + Collection
  stay fully static in the export (STATIC-DEPLOYMENT-PLAN.md §4.4).
*/
export function CollectionToolbar({
  count,
  sort,
  onSortChange,
}: {
  count: number;
  sort: SortKey;
  onSortChange: (value: SortKey) => void;
}) {
  const t = useTranslations('Collection');

  const onSort = (value: string) => onSortChange(value as SortKey);

  return (
    <div className="flex items-center justify-between border-b border-line py-4">
      <p className="text-sm text-tamarind">{t('results', { count })}</p>
      <div className="flex items-center gap-5 text-sm">
        <button type="button" className="hidden items-center gap-1.5 text-indigo-night hover:text-indigo-dip sm:inline-flex">
          {t('filter')}
        </button>
        <label className="flex items-center gap-2">
          <span className="text-tamarind">{t('sort')}</span>
          <select
            value={sort}
            onChange={(e) => onSort(e.target.value)}
            className="cursor-pointer border-b border-indigo-vat bg-transparent py-1 outline-none"
          >
            <option value="featured">{t('sortFeatured')}</option>
            <option value="newest">{t('sortNewest')}</option>
            <option value="price-asc">{t('sortPriceAsc')}</option>
            <option value="price-desc">{t('sortPriceDesc')}</option>
          </select>
        </label>
      </div>
    </div>
  );
}
