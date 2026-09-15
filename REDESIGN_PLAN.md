# Beseam.com Redesign — Store Health, review-led (file-specific plan)

Status: in progress · Date: 2026-07-17 · No commit; leave for review.

## Goal
Replace the scan-first, 15-section merged homepage with a calm, editorial, **Store health for Shopify** site whose one conversion is **Book a Store Health Review**. Represent the *shipped* Store Health product honestly (no synthetic-checkout claims, no fabricated proof). Consolidate tracking.beseam.com in as "Purchase Health."

Harness has no native image generation → mock-generation step skipped; build from brief + real product contract. Hero/product visual = a faithful **static "Example Store Health workspace"** built from the shipped response contract (labeled as example) — a real screenshot can be swapped in later (running the full app for a capture is out of scope this pass).

## Design system (edit `src/app/globals.css`)
Keep Figtree + coral `--primary: #ff6041`. Add: warm off-white body `--surface: #fbfaf8` (subtle, not cream), true-white panels, graphite ink, near-black headings, hairline `--rule` borders. Editorial type scale (hero clamp ~42→88px, headings 44–64, body 17–20, labels 12–14), tight headline tracking (≥ -0.03em), generous section padding. Remove reliance on blob/gradient/glass/animated-border/card-soup patterns. Respect existing dark mode. `prefers-reduced-motion` alternatives for all reveals.

## Homepage — rewrite `src/app/page.tsx` to ~8 sections (new/rewritten components in `src/components/beseam/`)
1. `hero-section.tsx` (rewrite) — eyebrow "Store health for Shopify"; headline "Know when your Shopify store loses visibility—or the purchase experience degrades."; support copy; **primary CTA "Book a Store Health Review" → `/store-health-review`**; secondary "See how it works" → scroll `#how-it-works`; microcopy. **Remove store-domain input.** Visual = `StoreHealthWorkspace` (below).
2. `problem-section.tsx` (rewrite) — "A store can look fine while traffic or purchases are quietly degrading." 3 gaps (teams can't see every regression / storefront failures are partial / evidence is split). No invented stats.
3. `store-health-model-section.tsx` (new, `id="product"`) — ONE architecture diagram: Outside=Discoverability, Inside=Purchase, Resolution layer (severity/evidence/freshness/owner/action/deep-link). Not 12 cards.
4. `how-it-works-section.tsx` (rewrite, `id="how-it-works"`) — Connect → Observe → Verify → Act pipeline; make the trust model visible (`unknown` ≠ healthy).
5. `evidence-section.tsx` (new) — two large compositions from the real contract: (A) discoverability issue "Product schema changed after a theme update" (pdp_verification finding: affected product, source, seen, evidence catalog-vs-rendered, owner=development, action); (B) purchase issue "Payment-error signals increased on mobile sessions" (friction incident: stage, evidence, status/confidence, last seen). Use "likely related / correlated with / requires verification." No revenue-saved, no "root cause confirmed."
6. `teams-section.tsx` (new, `id="teams"`) — "Beseam does not replace your SEO team. It gives them better evidence." 3 roles (SEO/content, ecommerce/ops, dev/agencies). Answers "we already have an SEO team."
7. `founder-section.tsx` (new) — approved qualitative founder framing ("engineer who spent his career making large systems measurable and reliable") + real trust assets (Shopify-native, reversible publish, evidence-backed status, privacy). **No** fake customers/logos/ratings/SOC2. Detailed bio → `/about`.
8. (compact) `pilot-section.tsx` (new) — "Beseam Store Health Pilot" bullets, no pricing, CTA "Book a Store Health Review."
9. `final-cta-section.tsx` (rewrite) — "Start with the health of your actual store." primary review CTA; secondary text "Already using Beseam? Log in." No scan.

Shared: `book-review-cta.tsx` (new) — single CTA component, label "Book a Store Health Review", href `/store-health-review`, fires `trackEvent('cta_book_review', ...)` (wires the currently-untracked conversion). `StoreHealthWorkspace.tsx` (new) — faithful static product panel (overall status, 2 domain cards, monitoring-coverage row incl. one `stale` source, one prioritized issue + evidence), "Example Store Health workspace" label.

## Navbar / footer
- `navbar.tsx` (rewrite): Product `#product` · How it works `#how-it-works` · Who it's for `#teams` · About `/about` · Log in (`app.beseam.com/login`) · **Book a Store Health Review**. Remove Recent Reports / Free Scan / Fix Sprint / scan.
- `footer.tsx` (rewrite): remove scan + Recent Reports; product story, one review CTA, links (Product/How it works/Who it's for/About/Review/Login/Privacy/Terms). **Superseded 2026-08-22:** the canonical standalone tool is `/tools/ai-discovery-scan`, using the same live-check experience as the homepage; the old standalone visibility-scan route has been removed.

## Routes
- **`src/app/store-health-review/page.tsx`** (new, canonical) — what the review covers / who / what happens after / Cal.com embed (reuse `namespace="Beseam" calLink="pankaj.kumar/Beseam"` from `/demo`) + short contact-form fallback (name, work email, store URL, optional message) + success state. `next.config` redirect `/demo` → `/store-health-review`.
- **AI discovery scan route** — **superseded 2026-08-22:** the canonical page is `/tools/ai-discovery-scan`; the duplicate standalone lead form and old compatibility route were removed.
- **`src/app/about/page.tsx`** (rewrite) — same visual system; founder story/experience/motivation/advisors(with permission)/contact; drop inflated cards.
- **`src/app/product/page.tsx`** (new) — fuller product page reusing model/how-it-works/evidence sections. (Nav "Product" points to `#product` anchor; `/product` is the deep page.)
- Retire from render (leave files, stop importing): stats-bar, alert-ticker, detection, comparison, testimonials, proof, seo-scan, pricing, before-after-ai, outcomes, trust, workspace-preview, mid-page-cta.

## Metadata / SEO (`src/app/layout.tsx`, `head.tsx`, `sitemap.ts`)
Title stays "Beseam — Store Health for Shopify"; rewrite description + OG/Twitter to review-led Store Health (drop scan-first); JSON-LD Organization/WebSite honest (no `aggregateRating`); canonical `https://beseam.com`. **Superseded 2026-08-22:** list `/tools/ai-discovery-scan` in the sitemap; the old visibility-scan route is not published.

## Consolidate tracking.beseam.com (`landings/beseam-tracking-lp`)
Static export → only Netlify/CF redirects work. Update existing `netlify.toml [[redirects]]` `to = "https://beseam.com/#purchase-health"` (force 301, UTMs auto-forward); add `public/_redirects` (`/* https://beseam.com/#purchase-health 301!`) for the Cloudflare target; set layout metadata `robots: noindex`. Keep repo; do NOT delete (deployment ownership unknown — flag).

## Copy/claim guardrails (hard)
One CTA vocabulary. No: "catches every failure", "in under 30 min", "first alert in 60s", "zero speed impact", "3×/2× more likely", "stops revenue loss", fabricated testimonials/logos/ratings, revenue-saved, SOC2. Lead vocabulary: store/visibility/purchase experience/issue/evidence/source/change/fix/verify/technical SEO/Shopify (not AEO/GEO/agentic/118-checks).

## Verify
`cd landings/beseam-site && npm run build` (exit 0) · start `next dev` + screenshot every homepage section + review page at desktop+mobile, iterate on craft · confirm no scan CTA in primary journey · confirm single CTA vocabulary · `npm run build` on tracking-lp not needed (redirect only). No commit.

## Deliberately NOT built
Synthetic checkout tests (future), real customer-proof section (scaffold component so it can be added without redesign), pricing on homepage (no approved price), real hero screenshot capture (needs full app launch).
