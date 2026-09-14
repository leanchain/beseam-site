# Beseam — Store Health + AI Visibility for Shopify

This is the canonical public marketing site for [beseam.com](https://beseam.com).
It presents two equal, connected product stories:

- Store Health: technical discoverability, purchase paths and monitoring-source freshness.
- AI Visibility (GEO): answer-engine visibility, product accuracy, merchant control, citations and competitors.

Both workspaces keep the underlying evidence and observation time visible. The
primary conversion route is the homepage journey; the free AI discovery scan
is available at `/scan`.

## Local development

```bash
npm run dev            # worker on :7002 in front of next dev on :7003
```

The free scan, the product-image proxy, and the verification link live in the
Cloudflare Worker (`main.js`), so `next dev` alone answers them with
"The scan service is unavailable right now." `npm run dev` therefore runs both:
Wrangler serves `/api/*` and `/scan/verify`, and hands everything else to Next,
so hot reload still works.

It points at a local API on `http://localhost:8123/api`. Override with:

```bash
LOCAL_API_BASE=https://api.beseam.com/api npm run dev   # scan against production
LOCAL_APP_BASE=http://localhost:5123 npm run dev         # Continue/sign-in links target this app
LP_PORT=7012 LP_NEXT_PORT=7013 npm run dev              # different ports
npm run dev:next-only                                   # Next alone, no /api/*
```

## Local validation

Use Bun, matching the repository lockfile:

```bash
bun install
bun run test:worker
bunx tsc --noEmit
bun run build
```

The production build is a static Next.js export in `out/`.

## Cloudflare deployment

`main.js` serves the static export through the Workers Assets binding, handles
legacy redirects, and accepts the same-origin review fallback form.

Before deployment:

1. Confirm that the Worker named `beseam` owns `beseam.com`.
2. Authenticate Wrangler for the intended Cloudflare account.
3. In the Beseam Trevra workspace, create a **Lead capture** source for the website.
4. Store its Trevra connection values in Worker secrets:

   ```bash
   npx wrangler secret put TREVRA_CAPTURE_API_BASE_URL
   npx wrangler secret put TREVRA_CAPTURE_SOURCE_ID
   npx wrangler secret put TREVRA_CAPTURE_SECRET
   ```

   `TREVRA_CAPTURE_API_BASE_URL` is the Trevra API origin, without `/api` at the end.
   The signing secret is shown by Trevra only when the source is created or rotated.

5. Enable Email Sending for the zone and verify `website@beseam.com` while review notifications are still desired.
6. Confirm that `contact@beseam.com` is an allowed notification destination.
7. Set the public analytics and Cal.com values in the deployment environment.
8. Run `bun run build`, then `npx wrangler deploy`.

When all three Trevra capture values are configured, `/api/lead` writes its
canonical Person + inbound Submission to Trevra and does **not** duplicate that
lead into SendPulse. Browser forms attach one stable `submissionId` to an unchanged
logical form submission, and the Worker reuses it as Trevra's idempotency key across
browser retries and its own transient retry. Review email is then best-effort notification only. If the
Trevra values are absent, the Worker deliberately retains the previous
SendPulse/email path so deploying this code before provisioning the Capture
Source cannot black-hole production leads. Remove that fallback only after the
live Trevra source has been verified.
