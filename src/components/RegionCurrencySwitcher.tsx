'use client';

import { useShop } from '@/lib/cart/context';
import { REGIONS } from '@/lib/money';
import type { CurrencyCode } from '@/lib/commerce/types';

/*
  Region & currency switch (§6, §8.3). In the demo this drives mock conversion;
  in production it maps to a Shopify Markets country for @inContext pricing.
*/
export function RegionCurrencySwitcher({ tone = 'cream' }: { tone?: 'cream' | 'indigo' }) {
  const { region, setRegion } = useShop();
  const text = tone === 'cream' ? 'text-cream-resist' : 'text-indigo-night';

  return (
    <label className={`flex items-center gap-1 text-xs ${text}`}>
      <span className="sr-only">Region and currency</span>
      <select
        value={region}
        onChange={(e) => setRegion(e.target.value as CurrencyCode)}
        className={`bg-transparent text-xs ${text} cursor-pointer outline-none [&>option]:text-indigo-night`}
      >
        {REGIONS.map((r) => (
          <option key={r.code} value={r.code}>
            {r.flag} {r.label}
          </option>
        ))}
      </select>
    </label>
  );
}
