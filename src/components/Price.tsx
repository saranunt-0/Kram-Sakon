'use client';

import { useTranslations } from 'next-intl';
import { useShop } from '@/lib/cart/context';
import { formatMoney } from '@/lib/money';
import { SHOW_PRICES } from '@/lib/config';
import type { Money } from '@/lib/commerce/types';

/*
  Renders a price in the shopper's selected region currency (§8.3). THB for Thai
  region; converted otherwise. Demo conversion only — production uses Shopify
  Markets pricing.

  While SHOW_PRICES is off (no confirmed pricing yet) this renders a
  "price on request" label instead of the amount; shoppers are routed to Contact
  via the product page's "Contact to order" action. All pricing logic is kept.
*/
export function Price({
  money,
  compareAt,
  className = '',
}: {
  money: Money;
  compareAt?: Money | null;
  className?: string;
}) {
  const { region } = useShop();
  const t = useTranslations('Product');

  if (!SHOW_PRICES) {
    return <span className={`text-tamarind ${className}`}>{t('priceOnRequest')}</span>;
  }

  return (
    <span className={`tabular-nums ${className}`}>
      {compareAt && (
        <span className="mr-2 text-indigo-first line-through">
          {formatMoney(compareAt, region)}
        </span>
      )}
      {formatMoney(money, region)}
    </span>
  );
}
