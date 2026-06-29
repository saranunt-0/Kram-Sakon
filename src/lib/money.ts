/*
  Money formatting + mock multi-currency.

  In production, prices come already-converted from Shopify Markets via
  @inContext(country: …). Here we approximate with fixed rates so the
  RegionCurrencySwitcher visibly does something in the demo. THB is the source.
*/
import type { CurrencyCode, Money } from './commerce/types';

export const REGIONS: { code: CurrencyCode; label: string; flag: string }[] = [
  { code: 'THB', label: 'Thailand (THB ฿)', flag: '🇹🇭' },
  { code: 'USD', label: 'International (USD $)', flag: '🌐' },
  { code: 'EUR', label: 'Europe (EUR €)', flag: '🇪🇺' },
];

// Indicative demo rates from THB. Real rates come from Shopify Markets.
const RATES: Record<CurrencyCode, number> = {
  THB: 1,
  USD: 0.027,
  EUR: 0.025,
};

const LOCALE_FOR: Record<CurrencyCode, string> = {
  THB: 'th-TH',
  USD: 'en-US',
  EUR: 'en-IE',
};

export function convert(money: Money, to: CurrencyCode): Money {
  if (money.currencyCode === to) return money;
  const base = parseFloat(money.amount) / RATES[money.currencyCode];
  return { amount: (base * RATES[to]).toFixed(2), currencyCode: to };
}

export function formatMoney(money: Money, to?: CurrencyCode): string {
  const target = to ?? money.currencyCode;
  const m = convert(money, target);
  return new Intl.NumberFormat(LOCALE_FOR[target], {
    style: 'currency',
    currency: target,
    maximumFractionDigits: target === 'THB' ? 0 : 2,
  }).format(parseFloat(m.amount));
}
