# Deployment Setup Runbook — Vercel + Cloudflare DNS + GitHub Actions

**Branch:** `deploy/static-frontend` · **Host:** Vercel · **DNS/Registrar:** Cloudflare · **CI/CD:** GitHub Actions (deploy from GitHub on push).

> This is the setup runbook only. No workflow/code is written yet. Once you hand over the keys in **§2** and confirm the choices in **§1**, I'll implement the static-export changes (per `STATIC-DEPLOYMENT-PLAN.md`) **and** the GitHub Actions workflow.

---

## 1. Two things to confirm first

**A. Which hostname for this demo?**
The build branch is the static review build. I recommend putting it on a **subdomain** so the apex `kramsakon.com` stays free for the real production site later:
- Recommended: `demo.kramsakon.com` (or `staging.kramsakon.com`)
- Or apex `kramsakon.com` + `www` if you want this to be the live site now.

Whatever you pick becomes `NEXT_PUBLIC_SITE_URL` (e.g. `https://demo.kramsakon.com`), which drives canonical URLs, `sitemap.xml`, `robots.txt`, and hreflang.

**B. CI/CD style — confirming your choice.**
You asked for "CI/CD that deploys directly from GitHub." There are two ways; I'll build the one you prefer:
- **(Your stated pick) GitHub Actions → Vercel CLI** — the workflow lives in the repo, builds, and pushes to Vercel. Explicit, portable, needs 3 secrets. *I'll do this unless you say otherwise.*
- **(Simpler alt) Vercel's native Git integration** — connect the repo once in Vercel's dashboard; it auto-deploys every push with **zero** GitHub secrets and gives preview URLs per PR. Less to manage. Mentioning only so you can choose knowingly.

> Note: Vercel can also run the full SSR app natively. We're intentionally keeping `output: 'export'` (static) on this branch per the plan; that's compatible with both CI/CD styles.

---

## 2. Keys / access I need from you

Minimized for security. **You never have to paste the secret Vercel token to me** — you add it to GitHub yourself; I only need the two non-secret IDs.

### Required

| # | Item | Sensitive? | How you provide it |
|---|---|---|---|
| 1 | **GitHub repo** for the project | — | Either (a) create an empty repo and **push it yourself**, then send me the URL; or (b) give me a **GitHub PAT** (`repo` + `workflow` scopes) and I'll create the repo and push this branch. |
| 2 | **`VERCEL_ORG_ID`** | low | Send me the value (from §3 step C). |
| 3 | **`VERCEL_PROJECT_ID`** | low | Send me the value (from §3 step C). |
| 4 | **`VERCEL_TOKEN`** | **HIGH** | **Don't send it to me.** Add it directly as a GitHub Actions **secret** named `VERCEL_TOKEN` (§3 step D). The workflow references it by name. |

### Optional — only if you want me to automate Cloudflare DNS

| # | Item | Sensitive? | Notes |
|---|---|---|---|
| 5 | **Cloudflare API Token** scoped `Zone → DNS → Edit` on the `kramsakon.com` zone, + the **Zone ID** | **HIGH** | If you'd rather not, **skip this** — DNS is 2 records you can add yourself in the Cloudflare dashboard in ~2 min (§4). Manual is the recommended, lower-risk path. |

**Summary of the minimum to get moving:** the **repo** (item 1), **`VERCEL_ORG_ID`** + **`VERCEL_PROJECT_ID`** (items 2–3) sent to me, and **`VERCEL_TOKEN`** (item 4) added by you to GitHub secrets. DNS you can do yourself with §4.

---

## 3. Step-by-step (Vercel + GitHub)

### A. Create the Vercel project
1. Go to vercel.com → **Add New… → Project**.
2. Import the GitHub repo (you can do this after the repo exists), **or** create a blank project named e.g. `kram-sakon-storefront`.
3. **Root Directory:** repo root (the Next app is at the repo root — the git repo was initialized inside `storefront/`).
4. Framework preset: **Next.js**. Leave build settings default; our config will emit a static export.
5. **Settings → Environment Variables →** add `NEXT_PUBLIC_SITE_URL = https://<your-domain>` for the **Production** environment.

### B. Create a Vercel token
1. vercel.com → **Account Settings → Tokens → Create Token**.
2. Scope it to your account/team; name it `github-actions-kram`. Copy the value once.
3. **Add it to GitHub** (step D) — not to this chat.

### C. Get the Org & Project IDs (non-secret)
Easiest: in the project, **Settings → General** shows **Project ID**; your **Team/Account Settings → General** shows the **Team ID** (= `VERCEL_ORG_ID`).
*(Alternative: running `vercel link` locally writes both into `.vercel/project.json` as `orgId`/`projectId`.)*
Send me these two values.

### D. Add GitHub Actions secrets
Repo → **Settings → Secrets and variables → Actions → New repository secret**:
- `VERCEL_TOKEN` = the token from step B (**you** paste it here).
- `VERCEL_ORG_ID`, `VERCEL_PROJECT_ID` — you can add these too, or just send them and I'll wire them; they're not sensitive.

### E. What I'll then add to the repo (after keys are in)
- `.github/workflows/deploy.yml` — on push to `deploy/static-frontend`: checkout → Node 20 → `npm ci` → `vercel pull` (brings env) → `vercel build --prod` → `vercel deploy --prebuilt --prod` using the secrets.
- The static-export config changes from `STATIC-DEPLOYMENT-PLAN.md` (remove proxy, client-side sort, root redirect, `output: 'export'`).

---

## 4. Cloudflare DNS → Vercel (you can do this in the dashboard)

After the domain is added in **Vercel → Project → Settings → Domains** (add `<your-domain>`), Vercel shows the exact records. They'll be:

**For a subdomain (e.g. `demo.kramsakon.com`) — recommended:**
- Type `CNAME`, Name `demo`, Target `cname.vercel-dns.com`
- **Proxy status: DNS only (grey cloud)** ← important, so Vercel can issue/serve TLS.

**For the apex (`kramsakon.com`) + www:**
- `A` · Name `@` · `76.76.21.21` · **DNS only**
- `CNAME` · Name `www` · `cname.vercel-dns.com` · **DNS only**

Then back in Vercel, the domain verifies and an SSL cert is issued automatically (a few minutes).

> Why DNS-only: leaving Cloudflare's orange-cloud proxy on with Vercel commonly causes TLS/redirect conflicts. Vercel already provides global CDN + TLS, so grey-cloud is the clean setup. (If you specifically want Cloudflare's proxy/WAF in front later, that's a separate, more involved config — we can revisit.)

---

## 5. Order of operations (once you give the go-ahead)

1. **You:** confirm hostname (§1A) and CI/CD style (§1B).
2. **You:** create/push the GitHub repo (or hand me a PAT), add `VERCEL_TOKEN` secret, send me `VERCEL_ORG_ID` + `VERCEL_PROJECT_ID`.
3. **Me:** implement static-export changes + `deploy.yml`, push to `deploy/static-frontend`.
4. **CI:** builds and deploys to Vercel automatically → I send you the `*.vercel.app` URL to verify.
5. **You/Me:** add the domain in Vercel + the Cloudflare DNS records (§4).
6. **Done:** demo live at `https://<your-domain>`.

---

## 6. Security notes
- Treat `VERCEL_TOKEN` and any Cloudflare API token like passwords — add them to **GitHub Secrets**, never commit them, never paste them in chat. If one is ever exposed, revoke and reissue.
- `VERCEL_ORG_ID` / `VERCEL_PROJECT_ID` are identifiers, not secrets — safe to share with me.
- Scope tokens minimally (Vercel token to this account/team; Cloudflare token to DNS-edit on the one zone).
- The workflow only reads secrets at build time inside GitHub's runners; they aren't exposed in the static output.
