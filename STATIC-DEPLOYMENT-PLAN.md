# Static Frontend Deployment Plan — `deploy/static-frontend`

**Goal:** Ship the Kram Sakon first-draft storefront as a **fully static, frontend-only website** (no Node server, no backend, no Shopify) so the founder can review it on a public URL. Everything already runs on the mock data layer, so no data backend is needed — we only need to make the Next.js app produce static HTML/CSS/JS and host the output folder.

> **Branch:** `deploy/static-frontend` (off `main`). The `main` branch keeps the full SSR-capable app; this branch carries the static-export configuration so we don't compromise the production architecture. **This document is the plan only — no code has been changed yet.**

---

## 1. Scope & non-goals

**In scope**
- Static export of all pages (both `/en` and `/th`) to plain files via Next.js `output: 'export'`.
- Keep all current behaviour that is already client-side: cart (localStorage), TH|EN switch, region/currency switch, search, cookie consent, forms (demo success states), motion.
- A public demo URL on a free static host.

**Out of scope (unchanged from the draft)**
- Real Shopify data, cart, or hosted checkout.
- Real photography (indigo SVG placeholders stay).
- Form backends, live Instagram feed, map embed, analytics.
- Server-side locale **detection** (see §4.3 — we lose the auto Thai-for-Thailand redirect; a light client-side fallback is offered).

---

## 2. Why the current app isn't static-ready yet

The draft was built SSR-capable. Four things block a clean `output: 'export'`. Each has a contained fix:

| # | Blocker | Where | Fix (summary) |
|---|---|---|---|
| 1 | **Proxy/middleware** (locale routing) — not supported by static export | `src/proxy.ts` | Delete it; adopt next-intl's no-middleware static-export setup. |
| 2 | **`searchParams`** forces dynamic rendering (no request at runtime in a static site) | `shop/page.tsx`, `collections/[handle]/page.tsx` | Move **sort** from the URL query to **client-side state** in `CollectionToolbar`. |
| 3 | **Root `/` redirect** to default locale was done by middleware | (was `proxy.ts`) | Add a static root page that client-redirects to `/en` (meta-refresh + JS). |
| 4 | **Image optimizer** needs a server | `next.config.ts` | Set `images.unoptimized: true` (we only use CSS background SVGs today, so no visual change). |

Everything else is already compatible: all `[handle]` routes have `generateStaticParams`, we use `setRequestLocale`, fonts are self-hosted via `next/font`, and `sitemap.ts`/`robots.ts` are emitted as static files on export.

---

## 3. Target host

**Recommendation: Cloudflare Pages or Netlify** — both serve a static `out/` folder at the domain root for free, with no `basePath` gymnastics, instant rollbacks, and a shareable preview URL. Either works; pick one.

| Option | Root-path hosting | Config needed | Notes |
|---|---|---|---|
| **Cloudflare Pages** ⭐ | ✅ | none (build cmd `npm run build`, output `out`) | Recommended. Generous free tier. |
| **Netlify** ⭐ | ✅ | none (publish dir `out`) | Recommended. Drag-and-drop the `out/` folder also works. |
| **Vercel (static)** | ✅ | detects Next automatically | Fine, but it'll try SSR features; force static via `output: 'export'`. |
| **GitHub Pages** | ⚠️ subpath | needs `basePath`/`assetPrefix` = `/<repo>` + `trailingSlash: true` | Only if we must use Pages. Adds config; covered in §5.4. |

The plan below assumes **root-path hosting** (Cloudflare/Netlify). GitHub Pages specifics are isolated in §5.4 so they don't complicate the default path.

---

## 4. Implementation steps (do in this order — still no code yet, this is the checklist)

### 4.1 Next config → static export
- In `next.config.ts`: add `output: 'export'`, `images: { unoptimized: true }`, and (host-dependent) optionally `trailingSlash: true`.
- Keep the `next-intl` plugin wrapper.

### 4.2 Remove middleware-based routing
- Delete `src/proxy.ts`.
- Keep `src/i18n/routing.ts` with `localePrefix: 'always'` (already set), but drop `localeDetection` reliance (no middleware to honour it).
- Confirm `generateStaticParams` returns both locales in `app/[locale]/layout.tsx` (already does).

### 4.3 Root redirect to default locale
- Add `src/app/page.tsx` (a root, non-localized page) that renders a tiny client redirect to `/en`:
  - `<meta httpEquiv="refresh" content="0; url=/en">` for no-JS, plus a `useEffect` that reads `navigator.language` and routes to `/th` for Thai users, else `/en` (this restores a *client-side* version of the lost auto-detection).
- Verify this page itself exports statically (it must not use server-only dynamic APIs).

### 4.4 Make Shop + Collection sort client-side
- `CollectionToolbar.tsx`: replace the `router.push(?sort=…)` query approach with local React state (and optionally `useState` lifted into the page via a small client wrapper), sorting the already-rendered product list in the browser.
- `shop/page.tsx` and `collections/[handle]/page.tsx`: remove the `searchParams` prop; render the full product list server-side at build time and let the client component handle sort order.
- Net effect: identical UX, but no dynamic request — these two routes become fully static (`○`/`●` instead of `ƒ`).

### 4.5 Env for build
- Set `NEXT_PUBLIC_SITE_URL` to the final deploy URL (drives `sitemap.xml`, `robots.txt`, `metadataBase`, hreflang). Use the host's build-env settings.

### 4.6 Local verification
- `npm run build` → must succeed and produce `out/`.
- Confirm in the route table that **no route is marked `ƒ` (Dynamic)** — all should be `○`/`●`.
- Serve `out/` locally (`npx serve out`) and smoke-test: `/` redirects to `/en`; TH|EN switch; a PDP; cart add → drawer → `/checkout-demo`; cookie banner; `/sitemap.xml` and `/robots.txt` resolve.

### 4.7 Deploy
- Connect the repo (subdirectory `storefront/`) to Cloudflare Pages/Netlify with build command `npm run build` and output dir `out`, **or** drag-and-drop the `out/` folder for a one-off.
- Set `NEXT_PUBLIC_SITE_URL` in the host env and rebuild so SEO URLs are correct.

### 4.8 (Optional) CI
- Add a GitHub Actions workflow that builds on push to `deploy/static-frontend` and publishes `out/` to the chosen host. Optional for a first review; manual deploy is fine.

---

## 5. Detail notes & gotchas

### 5.1 i18n without middleware
- next-intl's `Link`, `usePathname`, `useRouter` (from `src/i18n/navigation.ts`) keep working client-side — they generate locale-prefixed paths. We only lose the *server* redirect/detection, which §4.3 replaces on the client.
- `hreflang` alternates and per-locale `sitemap` are still emitted (static), so SEO posture holds.

### 5.2 Cart, forms, consent, search
- All already client-only and localStorage-backed → zero changes. They behave identically on a static host.

### 5.3 Checkout
- `/checkout-demo` stays as the safe stand-in. No payment code ships (consistent with the build guide). Nothing to change for static.

### 5.4 GitHub Pages only (skip if using Cloudflare/Netlify)
- Set `basePath: '/<repo-name>'` and `assetPrefix: '/<repo-name>/'` in `next.config.ts`, plus `trailingSlash: true`.
- Internal `next-intl` links respect `basePath` automatically; double-check the §4.3 root redirect uses a relative/basePath-aware URL.
- Add `.nojekyll` to `out/` so files starting with `_` (e.g. `_next/`) are served.

### 5.5 Things that will *not* work on a static site (and are acceptable here)
- No server redirects/rewrites, no on-demand revalidation, no API routes (we have none), no Image Optimization API (using `unoptimized`).
- Auto locale detection becomes best-effort client-side only.

---

## 6. Acceptance criteria

- [ ] `npm run build` succeeds with `output: 'export'`; `out/` is produced.
- [ ] Route table shows **no `ƒ` Dynamic routes**.
- [ ] Visiting `/` redirects to `/en` (and `/th` for Thai-preference browsers).
- [ ] Both locales fully navigable; TH|EN + currency switches persist; PDP, cart drawer, search, cookie banner all work from the static output.
- [ ] `sitemap.xml` + `robots.xml` present with correct absolute URLs (from `NEXT_PUBLIC_SITE_URL`).
- [ ] Deployed to a public URL; shareable for founder review.
- [ ] `main` branch untouched — full SSR app preserved there.

---

## 7. Estimated effort

| Task | Est. |
|---|---|
| Config + remove proxy + root redirect (§4.1–4.3) | ~30 min |
| Client-side sort refactor (§4.4) | ~30–45 min |
| Build/verify locally (§4.6) | ~20 min |
| Host setup + deploy (§4.7) | ~20 min |
| **Total** | **~1.5–2 hrs** |

---

## 8. Rollback / safety

- All changes are isolated to `deploy/static-frontend`. `main` keeps the SSR-capable app — no risk to the production architecture path.
- If a static limitation proves unacceptable (e.g. we later need real server-side detection or Shopify SSR), we simply deploy `main` to a Node host instead; this branch remains the "static demo" lane.
- Reverting is `git checkout main`; the host can roll back to any previous build instantly.

---

## 9. Open questions for the founder / approver

1. **Host preference?** Cloudflare Pages, Netlify, Vercel, or must it be GitHub Pages (adds `basePath` config)?
2. **Domain?** A host-provided preview subdomain for now, or a custom domain (e.g. `staging.kramsakon.com`)?
3. **Default landing locale** when we can't detect — keep English as default per current config?

*Once a host + URL are chosen, I'll implement §4 on this branch and hand back the live link.*
