# Kram Sakon Storefront — Developer Handoff

**Status:** First draft / locally-testable demo. Built to the *Kram Sakon Storefront Build Specification* (`/instruction/Kram-Sakon-Website-Build-Guide.md`).
**Important:** This draft runs entirely on **mock data** — there is **no Shopify subscription, no payment processing, and no real photography** yet. It exists so the founder can review design and structure and give feedback. Everything stubbed is isolated behind clean seams so it can be swapped for the real thing without rewriting the UI.

---

## 1. Run it locally

```bash
cd storefront
npm install        # already installed in this workspace
npm run dev        # http://localhost:3000  → redirects to /en or /th
npm run build      # production build (also the type/lint gate)
npm run start      # serve the production build
```

No `.env` is required for the demo. For Shopify, copy `.env.example` → `.env.local`.

**Browse:** `/en` and `/th`. Try the TH | EN switch (top-right), region/currency switch (top-left), product pages, add-to-cart → cart drawer → "Checkout" (lands on the demo handoff page), search (header magnifier), and the cookie-consent banner.

---

## 2. Tech stack (as specified, §3)

| Concern | Choice | Notes |
|---|---|---|
| Framework | **Next.js 16 (App Router) + TypeScript** | ⚠️ Next 16 renamed Middleware → **Proxy** (`src/proxy.ts`). `params`/`searchParams` are **async** (`await params`). |
| Styling | **Tailwind CSS v4** + CSS custom properties | Tokens live in `src/app/globals.css` under `@theme` (Tailwind v4 uses CSS, not `tailwind.config.ts` — the guide's v3 config snippet was translated into `@theme`). |
| i18n | **next-intl** | Sub-path routing `/th` `/en`; messages in `messages/{th,en}.json`. |
| Fonts | **next/font** (self-hosted) | Fraunces, Inter, Noto Serif Thai, IBM Plex Sans Thai — `src/app/fonts.ts`. |
| Motion | **motion** (Framer Motion's `motion/react`) | Restrained; honors `prefers-reduced-motion`. |
| Commerce | **Mock layer** (this draft) → **Shopify Storefront API** (production) | See §4. |

---

## 3. Project map

```
src/
  proxy.ts                     # next-intl locale detection (Next 16 "Proxy", was middleware)
  i18n/                        # routing.ts, request.ts, navigation.ts (locale-aware <Link>, useRouter)
  app/
    globals.css                # 🎨 design tokens (@theme), Thai typography rules, signature devices
    fonts.ts                   # self-hosted font setup
    sitemap.ts, robots.ts      # per-locale sitemap w/ hreflang
    not-found.tsx              # global 404 (renders its own <html>)
    [locale]/
      layout.tsx               # app shell: providers, AnnouncementBar, Header, Footer, CartDrawer, CookieConsent
      page.tsx                 # Home (§7.1 section order)
      shop/, collections/, products/[handle]/
      story/, journal/[handle]/, visit/, contact/, stockists/
      pages/[handle]/          # policies: shipping, returns, privacy (PDPA), terms
      checkout-demo/           # stand-in for Shopify hosted checkout
      not-found.tsx            # localized 404
  components/                  # all UI components (Header, Footer, ProductCard, CartDrawer, etc.)
  lib/
    commerce/
      types.ts                 # Shopify-shaped types (the contract the UI depends on)
      mock-data.ts             # 🔁 MOCK products + collections
      client.ts                # 🔁 data accessors — THE SWAP POINT for real Shopify
    cart/context.tsx           # cart + region/currency state (localStorage)
    journal.ts                 # 🔁 MOCK journal posts
    cloth.ts                   # 🔁 generates indigo SVG placeholders (stands in for photography)
    money.ts                   # 🔁 mock multi-currency conversion
messages/{en,th}.json          # all UI strings (human-written, NOT machine-translated)
```

🔁 = mock/placeholder to replace before launch.

---

## 4. Going live: replace the mocks

The UI never touches mock data directly — it calls `src/lib/commerce/client.ts`. To go live, **reimplement those functions against the Shopify Storefront API without changing their signatures.**

### 4.1 Commerce data (highest priority)
1. Add a Storefront API client (`@shopify/storefront-api-client` or `fetch`). Read `SHOPIFY_STOREFRONT_API_TOKEN` **server-side only** — never expose it (§1.2, §11).
2. Reimplement each function in `client.ts` (`getProducts`, `getProduct`, `getCollection`, `getProductsByCollection`, `getMostLoved`, `getRelatedProducts`, handle lists) with GraphQL queries. Use `@inContext(language: TH|EN, country: …)` for localized content + Markets pricing.
3. Map Shopify results into the `types.ts` shapes. Two adjustments to make there:
   - `Product.title/description/materials/care` are currently `Localized<T>` (`{en, th}`) because mock data carries both languages at once. With `@inContext` you fetch **one** locale per request, so either keep the localized map (fetch both) or simplify to plain strings and fetch per-request. Simplest: change these to `string` and drop the `[locale]` indexing in the components (search for `[locale]` in `components/`).
   - `ProductImage.seed` → replace with a real `url`; see §4.3.

### 4.2 Cart & checkout
- `lib/cart/context.tsx` is currently a localStorage cart. Replace with a Shopify cart: `cartCreate` / `cartLinesAdd` / `cartLinesUpdate`, persist the **cart id**, and read `cart.checkoutUrl`.
- In `components/CartDrawer.tsx`, change the "Checkout" link from `/checkout-demo` to **`cart.checkoutUrl`** (Shopify's hosted checkout). Delete the `checkout-demo` route. **No payment/card code belongs in this repo** (§1.2, §11).

### 4.3 Photography (replace the cloth placeholders)
- Real images are a human deliverable (§14). Until then, `components/ClothImage.tsx` renders deterministic indigo SVGs via `lib/cloth.ts`.
- To switch to real photos: replace `<ClothImage seed=… />` usages with `next/image` (`<Image>`), and add the Shopify CDN host to `next.config.ts` → `images.remotePatterns` (e.g. `{ protocol: 'https', hostname: 'cdn.shopify.com' }`). Keep the **bilingual alt text** (§9).
- The mock `ProductImage.kind` (`flat`/`context`/`process`) maps to the photography brief in §14 (flat-lay, on-body, process shots).

### 4.4 Currency
- `lib/money.ts` uses fixed demo rates. With Shopify Markets, prices come already-converted via `@inContext(country)`; the `RegionCurrencySwitcher` should set the country and you can drop the manual conversion.

### 4.5 Content & translations
- UI strings: `messages/{en,th}.json` — human-written. Add keys here, never machine-translate (§11).
- Product/editorial content: Shopify translations (Translate & Adapt) via `@inContext`. Journal currently mocks Shopify blog (`lib/journal.ts`) → swap for the blog/article API.
- Forms (Contact, Stockists, Newsletter) are front-end only (`components/DemoForm.tsx`, `NewsletterForm.tsx`). Wire to a server action / Shopify / Klaviyo.

---

## 5. What's implemented vs. the spec

**Done (M0–M2 + some M3):**
- ✅ Design tokens, indigo/cream/brass identity, signature devices (dip-dye gradient, woven-selvedge hairline, shibori bloom) — §4, §5.6.
- ✅ Centered-logo header w/ mega-menu + mobile drawer; dark footer — §5.2, §6.
- ✅ Home in the exact §7.1 section order; Shop, Collections, PDP, Story, Journal, Visit, Contact, Stockists, Policies.
- ✅ Bilingual TH/EN routing + persistent switcher; per-locale `<html lang>`; hreflang + per-locale sitemap — §8.
- ✅ **Thai typography rules (§8.4)**: per-locale line-height, no all-caps eyebrows for Thai, Thai-capable fonts on both locales.
- ✅ Cart drawer → checkout redirect pattern; "each piece varies" note on every PDP — §6, §11.
- ✅ Multi-currency (mock); THB default for the Thailand region.
- ✅ PDPA cookie consent (analytics gated) + bilingual privacy policy — §10.
- ✅ Structured data: `Product`, `BreadcrumbList`, `Organization`-ish, `LocalBusiness` (Visit) — §9.
- ✅ Restrained motion honoring `prefers-reduced-motion`; crisp corners; brass kept to accents.
- ✅ Clean `npm run build` (59 pages, both locales).

**Deliberately stubbed (needs the human/Shopify):**
- 🔁 Real Shopify data + cart + hosted checkout (§4.1–4.2).
- 🔁 Real photography (§4.3) and the brass **SVG logo** (currently a styled lockup in `components/Wordmark.tsx`, §14).
- 🔁 Real policy/legal copy (privacy etc. are placeholders — see the in-page draft notice).
- 🔁 Live Instagram feed, map embed on Visit, working form backends, GA4 wiring.

**Not yet done (M3 polish / acceptance gates to verify after real assets land):**
- ⏳ Lighthouse gates (Perf ≥90 / A11y ≥95 / SEO ≥95 / BP ≥95) and LCP <2.5s — measure once real images + `next/image` are in (placeholders are inline SVG, so current numbers aren't representative).
- ⏳ Full a11y audit and QA from 360px up in both languages.
- ⏳ Faceted filtering (the CollectionToolbar "Filter" button is a stub; sort works).

---

## 6. Design decisions & deviations (for your review)

- **Tailwind v4, not the v3 `tailwind.config.ts`** from the guide. `create-next-app` ships v4; tokens are in `globals.css @theme` instead. Same token values, cleaner setup. Colours are available as `bg-indigo-vat`, `text-cream-resist`, `border-line`, etc.
- **Next.js 16 specifics**: middleware is `src/proxy.ts`; all `params`/`searchParams` are awaited. Don't "fix" these back to old patterns.
- **Placeholder visuals are brand-correct, not grey boxes.** `lib/cloth.ts` generates deterministic indigo dip-dye + shibori/itajime/arashi SVGs so the layout reads as the real brand during review. Same seed → same image.
- **Cart is client-side/localStorage** for the demo so add-to-cart is testable offline. Replace with a Shopify cart (§4.2).
- **`/checkout-demo`** exists only to make the checkout button do something safe in the demo. Delete it when wiring `cart.checkoutUrl`.
- **Type shape note** (`Localized<T>`): see §4.1 — decide whether to keep per-field bilingual maps or move to per-request `@inContext` strings.

---

## 7. Suggested next steps (in order)
1. Founder reviews the demo, gives feedback on design direction.
2. Provide real assets (§14): Shopify store + Storefront token, SVG logo, photography, native copy, policy text.
3. Implement `client.ts` against Shopify (§4.1) → swap `ClothImage` for `next/image` (§4.3).
4. Real Shopify cart + `checkoutUrl` (§4.2); remove `/checkout-demo`.
5. Wire forms, Instagram, map, consent-gated GA4.
6. M3: performance/a11y/SEO passes to the §9 gates; QA both locales from 360px.
