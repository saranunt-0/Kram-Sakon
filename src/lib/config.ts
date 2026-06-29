/*
  Storefront feature flags.

  SHOW_PRICES: prices are hidden for now (no confirmed pricing yet). The pricing
  code, mock prices, and currency conversion are all kept intact — flip this back
  to `true` to restore price display everywhere (cards, PDP, search). While off,
  the UI shows a "price on request" label and routes shoppers to Contact.
*/
export const SHOW_PRICES = false;
