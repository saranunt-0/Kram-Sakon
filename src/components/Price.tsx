'use client';

import { useShop } from '@/lib/cart/context';
import { formatMoney } from '@/lib/money';
import type { Money } from '@/lib/commerce/types';

/*
  Renders a price in the shopper's selected region currency (§8.3). THB for Thai
  region; converted otherwise. Demo conversion only — production uses Shopify
  Markets pricing.
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
