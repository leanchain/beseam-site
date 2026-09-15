# Messaging learnings — audit against `beseam-site` (2026-08-18)

Five learnings supplied, checked against current site (`src/components/beseam/*`, `src/lib/marketing-pages.ts`, `src/app/{manifesto,about}/page.tsx`) and the two governing docs already in this repo: `REDESIGN_PLAN.md` and the canonical audit in `docs/internal/strategy/AI_COMMERCE_CONTROL_PLANE_TRACKER.md`. Three learnings are additive — build them. One is directional but needs recalibration to survive the site's existing evidence rule. One directly contradicts a deliberate, repeated site policy and I'd push back rather than implement literally.

## 1. Context & origin — build, currently buried

The founder origin story is good and already written (`manifesto/page.tsx:225-260`, "For the past year, I have worked closely with ecommerce founders... Before Beseam, I worked on measurement, reliability, and large-scale data systems at Google and Amazon... That is why I am building Beseam"). It just isn't on the homepage — `why-beseam.tsx` runs the abstract thesis ("The shift / The blind spot / Why it stays broken") with zero first-person origin beat, and only links out to `/manifesto`.

Change: pull 2-3 sentences of the real origin story into `why-beseam.tsx` or a new short section between it and `first-month-promise.tsx`. Don't invent a founding-myth anecdote — use what's already true and written.

Category benchmarks: not built at all today. `gap-track-figure.tsx` shows exactly one real data point (a dancewear/clothing merchant, 30-day window, competitor withheld) — good instrument, single anecdote. For high-volume categories (electronics, food/supplements, apparel) there's no equivalent proof. Two options, in order of honesty: (a) run the same check for a real merchant in each target category and publish real per-category Fig.1s as they become available — matches the site's existing "numbers are real, never invented" rule (see comment at top of `gap-track-figure.tsx`); (b) do not publish a category "benchmark" stat until you have one. Do not fabricate an industry-average gap number to fill the gap — that's exactly what the guardrails in `REDESIGN_PLAN.md` and the copy test in the tracker doc ("are we claiming only what the evidence supports?") exist to prevent.

## 2. Risk & FOMO framing — recalibrate, don't invert

The site already has the right instrument for this: `gap-track-figure.tsx` is *literally* "you are here, your competitor is here" (filled dot = you, hollow dot = rival, tinted segment between them). The hero headline ("See why AI picked someone else") is already loss-framed, not gain-framed. This learning isn't a reversal of current direction — it's "stop underselling the instrument you built."

Change: promote the gap figure higher on the page (closer to hero, not deep in a scroll), and let copy around it do FOMO work explicitly — "your competitor is already the answer in 81% of ChatGPT sessions where you're in 6%" reads as a real stat, not hype, because it's sourced. Do not add invented urgency copy (the banned list in `REDESIGN_PLAN.md` — "first alert in 60s", "stops revenue loss", generic speed/completeness claims) — that's a different kind of FOMO (manufactured urgency) than what's asked for (real competitive gap), and the site has already explicitly rejected the manufactured kind for good reason (it's the same move the AI-washing competitors make, and the comparison pages call it out).

## 3. Binary AI visibility / trust shift — net-new, safe to add

Not currently stated anywhere on the site. It's a factual mechanism claim, not an outcome claim, so it clears the copy test cleanly. Add explicitly, probably in `why-beseam.tsx`'s "The shift" row or as a new short beat: *unlike a Google ranking, where position 4 vs position 40 is a matter of degree, there is no position in a ChatGPT answer — your product is named or it is not.* If citing a stat on consumers trusting AI recommendations over search, use a real published source (Beseam's own numbers only cover the engine-gap claim, not shopper trust behavior) — don't let a McKinsey/Gartner-style number slip in uncredited.

## 4. Infrastructure over surface — already the site's spine, no change needed

This is the strongest existing alignment. `gap-track-figure.tsx`'s own note: *"Fewer than half of Claude's answers named any brand at all — an answer-data gap, not a competitor win. The fix is product data, not marketing."* `why-beseam.tsx` step 4: "trace each miss to the product field behind it." The whole "read-only, we propose the exact product-data change, you approve" loop is depth-over-face by construction. Worth sharpening as an explicit competitive line against theme/CRO agencies ("they sell surface, we sell the store's answer-readiness") but the substance doesn't need to change.

## 5. "We guarantee visibility in AI surfaces" — do not implement as stated

This is the one place the learning conflicts directly with a deliberate, repeated, load-bearing site policy, not an oversight to fix.

- `marketing-pages.ts` contains ~15 explicit "no guaranteed X" statements (ranking, recommendation, traffic, revenue, alert time, indexing outcome).
- `why-beseam.tsx`, step 5, titled "What we will not claim": *"Placement inside an answer no vendor controls. A revenue number in the contract."*
- `REDESIGN_PLAN.md`, under "Keep": *"the `limits[]` / 'what Beseam does not claim' blocks — the credibility there is the whole differentiator against AI-washing, and it survives the repositioning intact."*
- The canonical audit's copy test asks, for every new line: *"Are we claiming only what the evidence supports?"*

A literal outcome guarantee also fails on the merits Beseam itself states elsewhere: placement inside a ChatGPT/Gemini/Claude answer is controlled by a vendor Beseam has no contract with. Guaranteeing it is either false or requires a refund mechanism the product can't back (behavior can regress for reasons outside the store's or Beseam's control the day after a "guaranteed" placement).

What I'd do instead — same psychological job, no false claim: `first-month-promise.tsx` is already a de facto guarantee of *effort and honesty*, not outcome — 30 days, no fee, "we do not promise a recommendation, ranking, traffic increase, or sales increase," you decide at day 30. Reframe that section's label as the guarantee: *"Our guarantee: we'll show you the exact competitor beating you and the exact fix — free, for 30 days. No visible result, no bill."* That's a real, honorable guarantee (of the diagnostic work and the no-fee terms) sitting one inch away from the outcome guarantee the learning wants, without the site lying about something it doesn't control.

If the guarantee claim is a hard business requirement regardless (e.g. leadership wants it for a specific campaign), that's a call above this audit — flag it explicitly rather than slip it into a landing section, since it reverses a policy multiple docs treat as the site's central trust asset.

## Net

Build 1, 3, 4 mostly as stated. Build 2 by amplifying the existing gap-figure asset rather than adding invented urgency copy. Do not build 5 literally; propose the reframed 30-day guarantee as the substitute and get an explicit decision if the literal claim is still wanted.

## Addendum — hero default result card (2026-08-18)

Follow-up: the hero's default proof card is the same dance-shoe/dancewear anecdote, not a separate thing. `production-homepage.tsx:94` renders `<LiveAnswerCheck placement="homepage_hero" />`, which falls back to `SAMPLE_SCAN` (`src/data/sample-scan.ts`) — "Low-Top Dance Sneakers (Rosé Gold)" — until a visitor types their own domain. `SAMPLE_LOOP` (same store) backs the Check→Understand→Fix→Check-again section below it, and `gap-track-figure.tsx`'s Fig. 1 is that store's numbers too. Agreed: this is one real merchant's data doing hero, proof-loop, and gap-figure duty across the whole page, and dancewear is a niche vertical, not one of the stated high-volume target categories. It goes together with the category-benchmark point in §1, not separately.

**What withgauge.com does differently** — no single customer's result is in the hero at all. Structure: headline + subhead → CTA row → trust-logo bar ("Trusted by MotherDuck, Braintrust, Supabase...") → generic 3-step framework (Track/Understand/Act) → a dedicated case-study section further down the page, one card per named customer, each from a different vertical (dev tools, crypto, finance). The single-SKU live-result card pattern Beseam uses in the hero doesn't exist on their site — proof is deferred past the fold and spread across multiple companies instead of carried by one.

**Two separate things to take from that, not one:**

1. **Structure — adopt.** Stop putting one merchant's product card in the hero. Hero becomes headline + subhead + CTA (+ maybe the live `LiveAnswerCheck` input un-run, i.e. an empty state inviting the visitor's own domain rather than defaulting to someone else's result). Move the worked example (Check→Understand→Fix→Check-again, gap figure) to its own labeled "Example" section below the fold, same content, less hero real estate. This also directly fixes the category mismatch: an unrun input has no vertical at all, so it stops implicitly branding the hero as "for dance/apparel stores."

2. **Copy register — do not adopt.** Gauge's case-study section is exactly the outcome-claim style Beseam's own docs reject: "3x-5x uplift," "1,713% increase," "grew LLM-referred traffic 41x," an FAQ literally titled "What results can I expect to see?" answered with an aggregate lift number. That's the same move flagged as a conflict in §5 of this audit (no guaranteed/typical outcome claims) — copying Gauge's structure is fine, copying Gauge's claims is the thing the site's guardrails exist to prevent. If/when Beseam has real per-store before/after numbers to show in a case-study section, present them the way `gap-track-figure.tsx` already does — one real store, stated window, named or honestly-withheld competitor, no "typical customer" aggregate.

**Sequencing:** don't fabricate an electronics/food/supplements hero example to replace the shoe one — restructure the hero to not need a single-vertical example (option 1 above) now, and add real high-volume-category proof to the below-fold example/case-study section as those merchants become available, same as the category-benchmark recommendation in §1.

## Addendum 2 — dropped the real-store proof entirely (2026-08-18)

Superseded: the "demote to a labeled Example section" plan above. Decision: don't gate this on sourcing real per-category data — match Gauge's actual structure, which carries zero merchant-specific example pre-scan (its Track/Understand/Act section is plain prose; real numbers only show up later, in a dedicated Case Studies section, spread across many named companies, not one running through hero/proof/gaps).

Changes made:
- `production-homepage.tsx`: removed the `#example` section (the `SampleLoopShowcase` walkthrough added in Addendum 1) entirely — reverted.
- `#engine-gaps`: removed `<GapTrackFigure />` (the dancewear store's real percentages). Section keeps its heading/paragraph, now single-column, still makes the "different engines disagree" point in prose only, no chart, no numbers, no named store.
- Both `gap-track-figure.tsx` and the `SampleLoopShowcase` export in `answer-check.tsx` are left in place, just unrendered on the homepage — not deleted, still available if a real per-category proof point gets built later.

**Found in the process, not yet acted on:** `#proof`'s `EvidenceFigure` still renders `/images/product-live/product-workflow.gif` — an actual app screenshot of "Dancing Queens" (workspace name, live domain `dancingqueens.ch`, product title, SEO fields all visible in plaintext). This is a different exposure than the anonymized `SAMPLE_SCAN`/`GapTrackFigure` numbers just removed — it's a real named advisor's store, fully identified, not stripped. Wasn't in scope of this round's decision (which covered `#example` and `#engine-gaps` only) — flagging for an explicit call on whether it goes too, gets reshot with a different/anonymized store, or stays (it may be there with the advisor's knowledge/consent, which I can't verify from the repo alone).
