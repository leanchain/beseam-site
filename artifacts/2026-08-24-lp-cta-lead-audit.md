# beseam-site — CTA / lead-capture / post-verification audit

Date: 2026-08-24 · Repo: `landings/beseam-site` (own git, branch `main`, **ahead 26** of `origin/main`)

Verified by: worker unit tests (7/7 pass), `tsc --noEmit` (clean), live curl probes against beseam.com + api.beseam.com, `wrangler secret list` / `deployments list`.

---

## P0 — Production is not running this code

| Fact | Evidence |
| --- | --- |
| Live worker = `origin/main`, deployed **2026-08-17** | `wrangler deployments list --name beseam` |
| Local branch is **26 commits ahead**, undeployed | `git log origin/main..HEAD` |
| Live `/scan` → **301** `/tools/ai-visibility-scan` | `curl -I https://beseam.com/scan` |
| Live `/scan/verify` (no token) → `/?scan_error=missing_token` (old worker sends to `/`, new one to `/scan`) | live curl |

Everything below about `/scan`, the new redirect targets and the Trevra path is **unshipped**.

## P0 — No Worker secrets exist → lead capture is dead

`wrangler secret list --name beseam` → `[]`. Neither Trevra nor SendPulse is configured.

Consequences in `main.js`:
- `trevraCaptureConfigured()` false → every lead falls to `addLeadToSendPulse()`
- SendPulse creds absent → it throws
- `submitScanLead` → **HTTP 502 "We could not store your email right now."** for `ai_visibility_scan` / `platform_audit`
- `submitReview` (contact) survives **only** because the `REVIEW_EMAIL` binding sends the notification; the lead is never persisted anywhere

Fix = the three secrets at the bottom of this file.

## P0 — Deploying this branch 404s 14 live URLs

`origin/main:main.js` carries a `LEGACY_PATHS` map that local `main.js` **deleted entirely**. After deploy these all 404 (`not_found_handling: "404-page"`):

`/tools/ai-visibility-scan` (today's canonical, indexed scan page), `/store-health-review`, `/shopify-store-health`, `/demo`, `/product`, `/scan`*, `/free-scan`, `/ai-visibility-scan`, `/pdp-analyzer`, `/example-pdp`, `/optimised-pdp`, `/reports`, `/alternatives`, `/comparison`, `/old`

\* `/scan` becomes a real page in the new build — that one is fine. The rest are not.

Re-add a slimmed map pointing the scan aliases at `/scan` and `/alternatives|/comparison` at `/compare` before deploying.

## P1 — Broken CTA: `/tools/ai-discovery-scan` (×3)

Route never existed in either build (live one is ai-**visibility**-scan). All three 404 today and after deploy:

| File:line | Surface |
| --- | --- |
| `src/app/benchmarks/page.tsx:198` | "Check my store" primary CTA |
| `src/lib/marketing-pages.ts:136` | "Try the free AI discovery scan" related link |
| `src/lib/commerce-fieldbook.ts:922` | fieldbook entry `url` |

Target should be `/scan`.

## OK — CTAs that check out

- `/#promise` (navbar "30 days free") → `first-month-promise.tsx:15` `id="promise"`, rendered at `production-homepage.tsx:369`. Not broken.
- `/#proof`, `/#ai-check`, `/#benchmarks`, `#main-content` anchors all present. (`/#scope` was retired when the scope section was folded into `/#proof`.)
- All 16 `/compare/[slug]`, all resources `[slug]` routes resolve from their content sources.
- Footer / nav / not-found destinations all resolve.
- `BookReviewCta` primary = Cal.com embed (`pankaj.kumar/Beseam`), UTMs attached; secondary = `/#proof`.
- Contact page: `mailto:pankaj@beseam.com` + Cal CTA + form.

## Contact form — works

`contact-content.tsx` → POST `/api/lead` `{source:"contact", submissionId}` → `submitReview()`: name ≥2, message ≥3, honeypot `website`, 8 KB cap, origin allowlist, 202 on success, error copy falls back to the mailto.

Live probes: honeypot body → `200 {ok:true}` (no side effect); `source:"nope"` → `400 Unknown lead source.` Route is live and validating.

Gap: with no Trevra secret the message is email-only — nothing lands in the CRM.

## Post-email-verification flow — it does continue

1. POST `/api/answer-check` `{domain, email:null}` → row `AWAITING_VERIFICATION`, `page_audits_status=queued`, router fires `monitoring.run_public_answer_check_page_audits` (free 5-PDP sample).
2. POST again with `email` → `verify_token = secrets.token_urlsafe(32)`, verification mail with `{PUBLIC_ANSWER_CHECK_SITE_URL}/scan/verify?token=…[&report_id=…]`. Setting defaults to `https://beseam.com` (`core/config.py:389`) — link host is correct.
3. GET `/scan/verify` → worker POSTs `…/answer-check/verify` → `verify_and_enqueue()` (`service.py:500-537`): sets `verified_at`, nulls the token (single use), sets status `RUNNING`, **commits**, then starts activity `monitoring.run_public_answer_check`.
4. Redirect → `/scan?domain=…` (or `app.beseam.com/report/{id}` when the email carried `report_id`).
5. `answer-check.tsx:2480` reads `?domain`, GETs the row; status is already `RUNNING` (committed pre-redirect) so `isScanInFlight` is true → polls every 6 s, max 60 (~6 min).

**The 3 post-verification steps** (`execute_probe`, `service.py:538-607`): `generate_questions` → `run_answer_probe` (ChatGPT + Google AI Mode) → `attach_product_images`, then status `READY` + result email. No redirect/poll race — the status commit happens before the browser is redirected.

### Risks in that flow

| Sev | Issue |
| --- | --- |
| High | `verify_and_enqueue` re-checks **neither** `PUBLIC_ANSWER_CHECK_ENABLED` nor `PUBLIC_ANSWER_CHECK_DAILY_CAP` — a token minted before the cap still buys a paid probe after it. |
| High | Verification tokens **never expire**; any age works while the row is `AWAITING_VERIFICATION`. |
| Med | If `start_activity` throws, status falls back to `QUEUED`, which is a live status — the card spins 6 min and then stops with no error. |
| Low | `report_id` is derived from the client-supplied `source` (`pdp_report:<n>`), so the post-verify redirect target is attacker-influenced (redirect only, no access granted). |
| Low | Result email links `/?domain=` while verify/share link `/scan?domain=`. Both render `AnswerCheck`, but pick one. |
| Low | First live hit of `/api/answer-check?domain=` timed out at 60 s; the next two returned 200 in <0.7 s. Cold-start or upstream blip — worth a synthetic check. |

## Housekeeping

- `netlify.toml` still points at `@netlify/plugin-nextjs` publishing `.next`. Deployment is Cloudflare Workers + static `out/`. A Netlify build ships a site with **no `/api/*` worker** — lead capture and the scan proxy would be dead. Delete it or make it explicitly unused.
- Worker `LEAD_SOURCES` still lists `ai_visibility_scan`, `platform_audit`, `product_visibility_monitoring`, `store_health_review`; nothing in `src/` posts them any more. Only `contact` is reachable.
- Scan emails never reach `/api/lead`, so scan leads are not written to Trevra at all — they live only in `PublicAnswerCheck.email` in the backend DB.

## Verification run

```
node --test main.test.mjs   → 7 pass / 0 fail
npx tsc --noEmit            → clean
curl https://beseam.com/api/lead (honeypot)        → 200 {ok:true}
curl https://beseam.com/api/lead (bad source)      → 400
curl https://beseam.com/api/answer-check?domain=…  → 200
curl https://beseam.com/scan/verify                → 302 /?scan_error=missing_token
wrangler secret list --name beseam                 → []
```

---

# Post-deploy verification (2026-08-24, version `0cac81b2`)

Deployed `npx wrangler deploy` — 245 assets, worker live. Secrets survived: `wrangler secret list --name beseam` → `TREVRA_CAPTURE_API_BASE_URL`, `TREVRA_CAPTURE_SECRET`, `TREVRA_CAPTURE_SOURCE_ID`.

## Passing

| Check | Result |
| --- | --- |
| 20 routes incl. `/scan`, dynamic `/compare/profound`, `/resources/skills/*`, `robots.txt`, `sitemap.xml` | all 200 |
| Homepage anchors `#main-content #scope #proof #ai-check #promise` | all resolve to real ids |
| `/benchmarks` anchors (16) | 0 broken; "Check my store" now → `/scan` |
| `/api/lead` real contact submission → Trevra | **202** ×2 with the same `submissionId` (202 only returns if Trevra answered 2xx) |
| `/api/lead` honeypot / bad source / missing message | 200 / 400 / 400 |
| `/scan/verify` no token → `/scan?scan_error=missing_token`; bad token → `/scan?scan_error=link_used` | correct |
| `/api/answer-check` GET/POST proxy | 200, 0.7 s |
| `/api/product-image` with a real Shopify CDN URL | 200 `image/png` 48 KB |
| 404 page | 404 |
| Scan card renders live (allbirds.com) | store + catalog + 3 Understand sections |

## BLOCKER — the email gate never appears, so no scan lead is ever captured

Reproduced live on three fresh domains (`beardbrand.com`, `kotn.com`, `tentree.com`):

```
POST /api/answer-check {domain}          → status=running  page_audits_status=queued
GET  /api/answer-check?domain=kotn.com   → still queued after 8 polls / 2 min, 0 audits
```

Chain:

1. `service.execute_free_page_audits` sets `page_audits_status="running"` **as its first write**. Prod is stuck on `"queued"` ⇒ the Temporal activity `monitoring.run_public_answer_check_page_audits` **is never executed**. The router's enqueue did not throw (it would have written `"failed"`, `router.py:106-124`), so the job is accepted and then dropped — prod worker is not consuming that activity.
2. `service.to_payload` (`service.py:283-292`) masks `awaiting_verification` → `running` for as long as `page_audits_status ∈ {queued, running}`.
3. The card's email form renders only on `result.status === "awaiting_verification"` (`answer-check.tsx:2674`). Masked ⇒ **never rendered**.
4. No email ⇒ no `verify_token` ⇒ `/scan/verify` unreachable ⇒ the paid Understand stage (`generate_questions` → `run_answer_probe` → `attach_product_images`) can never run.
5. Client polls 60 × 6 s then stops; card sits on "Inspecting pages" forever.

Secondary: even with a healthy worker, step 2 hides the email ask for the whole duration of the free PDP sample. The mask comment says "the email gate is driven by `page_audits_status`" — the frontend does not agree. Either stop masking, or gate the form on `page_audits_status` as the comment intends.

Fix order: (a) get the Temporal worker consuming `monitoring.run_public_answer_check_page_audits` in prod; (b) decouple the email gate from the masked `status`.

## Security — tracked `.env` now holds the Trevra signing secret

`.gitignore` only covers `.env*.local`. `.env` is **tracked** (`git ls-files .env`, last touched in `06b31af`) and is currently modified with `TREVRA_CAPTURE_SECRET`. Do not commit. Untrack it, ignore `.env` + `.dev.vars`, and rotate the secret in Trevra if it has already been pushed anywhere.

---

# Round 2 — remaining CTAs and flows (version `e20df9d6`)

## Fixed and shipped

**`/audit-report` crashed on every visit.** Its default domain is `vediclab.com`, whose row predates the inventory stage and returns `site_inventory: {}` / `catalog_inventory: {}`. An empty object is truthy, so `ResultCard`'s `!inventory` guards passed and `inventory?.locales.length` threw `TypeError: Cannot read properties of undefined (reading 'length')` (`573-*.js:1:23235`), taking the whole page down with "Application error: a client-side exception has occurred". `?domain=allbirds.com` rendered fine, which is why it looked healthy.

Fix (`answer-check.tsx:1089-1105`): normalize an incomplete `site_inventory` / `catalog_inventory` to `undefined` so the existing guards do their job. Verified in prod: `/audit-report`, `?domain=vediclab.com` and `?domain=allbirds.com` all render, 0 uncaught exceptions.

**Build-cache trap:** the first attempt at this fix deployed nothing. `next build` reused `.next/` and re-emitted the pre-fix chunk (`573-e410f33c37360509.js` still contained `K.locales.length`). Only `rm -rf .next out && npm run build` produced a new hash. Clear both directories before any deploy that must contain a source change.

## Verified working

| Flow / CTA | Evidence |
| --- | --- |
| Sitewide link integrity | 128 unique targets fetched, 0 broken (2 LinkedIn 999s are anti-bot, not errors) |
| Uncaught JS exceptions | 25 routes swept via CDP `Runtime.exceptionThrown` → 0 |
| Hash anchors | 0 unresolved across every page |
| Cal.com booking | "Talk to us" opens the modal, `app.cal.com/pankaj.kumar/Beseam/embed`, "Sessions Beseam · 20m · Zoom", live availability |
| Contact form (real UI submit) | success state "MESSAGE RECEIVED", form replaced, no error |
| Mobile sticky CTA | at 390px past 600px scroll → `fixed inset-x-4 bottom-4 md:hidden` → `app.beseam.com/register`; correctly suppressed while the cookie banner, menu, dialog or footer is on screen |
| Scan card | live run on allbirds.com renders store, catalog and the 3 Understand sections |
| Brand book | "Copy page link" / "Print" / "Review the VEDIC LAB evidence" all work, no crash |
| Cookie consent | reject path works and persists |

## Still open

- **Email gate never appears** (see the post-deploy section) — the Temporal worker is not consuming `monitoring.run_public_answer_check_page_audits`, so `page_audits_status` never leaves `queued`. Unchanged by this deploy; it is a backend/infra fix.
- Cal.com shows a single bookable slot in the next three weeks. Not a bug, but it caps the primary CTA's conversion.
- `.env` is still git-tracked with the Trevra signing secret in it.
