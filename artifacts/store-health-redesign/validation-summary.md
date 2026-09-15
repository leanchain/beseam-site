# Beseam Store Health marketing validation

Validated on 2026-07-18 against the production static export served from Docker
with gzip enabled.

## Production builds

- `landings/beseam-site: bun run build` — passed, 111 static pages.
- Canonical homepage: 2.39 kB route, 122 kB first-load JavaScript.
- Store Health Review: 3.8 kB route, 106 kB first-load JavaScript.
- `landings/beseam-tracking-lp: bun run build` — passed, 89 static pages.
- Both builds report the existing retired `/reports` backend-fetch static-bailout
  warning, but complete successfully. The public Worker redirects this route
  before static assets are served.

Baseline before the redesign: homepage 3.97 kB route, 160 kB first-load
JavaScript.

## Lighthouse

Mobile simulated throttling against the production export:

- Performance: 92
- Accessibility: 100
- Best practices: 100
- SEO: 100
- FCP: 1.4 s
- LCP: 3.3 s
- TBT: 10 ms
- CLS: 0

The full report is in `lighthouse-home.json`.

## Accessibility and browser checks

- Axe: zero violations on homepage (1440 and 430), About, Store Health Review,
  and the scanner tool.
- Responsive smoke: 375, 430, 768, 1024, 1440 and 1920, with no horizontal
  overflow or page errors.
- Internal public links return 200.
- Required anchors, login, review CTA, form fields, consent controls and legal
  links are present.
- No Google analytics resource is requested before consent.
- Cal.com opens on demand, loads the configured Beseam calendar, and preserves
  UTM parameters.

## Code and Worker checks

- Main and tracking TypeScript checks passed.
- Focused ESLint checks have zero errors. The canonical repository-wide lint
  command still reports pre-existing errors in untouched legacy routes.
- Main and tracking Wrangler dry-runs passed.
- Review endpoint smoke: valid request 202, invalid request 400, cross-origin
  request 403, mocked email delivery called once.
- Redirect smoke: permanent 301 responses preserve query parameters.
