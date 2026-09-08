import type { Metadata } from "next";

import AnswerCheck, { FreeScanPromise } from "@/components/beseam/answer-check";
import { ActionsScreen, ImpactScreen } from "@/components/beseam/app-screens";
import { BookReviewCta } from "@/components/beseam/book-review-cta";
import BuyingDecisionStory from "@/components/beseam/buying-decision-story";
import CategoryBenchmarksSection from "@/components/beseam/category-benchmarks-section";
import { ChannelIcon, type ChannelBrand } from "@/components/beseam/channel-icon";
import ConnectedEvidence from "@/components/beseam/connected-evidence";
import CredibilityRail from "@/components/beseam/credibility-rail";
import DecisionBridge from "@/components/beseam/decision-bridge";
import EvidenceToWork from "@/components/beseam/evidence-to-work";
import FaqSection from "@/components/beseam/faq-section";
import FirstMonthPromise from "@/components/beseam/first-month-promise";
import HeroSurfaceShift from "@/components/beseam/hero-surface-shift";
import Logo from "@/components/beseam/logo";
import LogoConcepts from "@/components/beseam/logo-concepts";
import MarketsSection from "@/components/beseam/markets-section";
import MeasureImpact from "@/components/beseam/measure-impact";
import OperatingLoop from "@/components/beseam/operating-loop";
import ProductArt, { type ProductArtKind } from "@/components/beseam/product-art";
import ShopperLoss from "@/components/beseam/shopper-loss";
import TeamsSection from "@/components/beseam/teams-section";
import WhatBeseamDoes from "@/components/beseam/what-beseam-does";
import WhyBeseam from "@/components/beseam/why-beseam";

export const metadata: Metadata = {
  title: "Component Playbook | Beseam",
  description: "Internal visual inventory of the Beseam marketing components.",
  robots: { index: false, follow: false },
};

type Status = "Homepage" | "Used elsewhere" | "Unused" | "Foundation" | "Rejected";

type InventoryItem = { name: string; status: Status; note: string };

const INVENTORY: readonly InventoryItem[] = [
  { name: "answer-check", status: "Homepage", note: "Hero scan form and scan result UI" },
  { name: "app-screens", status: "Homepage", note: "Actions and Impact product views" },
  { name: "book-review-cta", status: "Foundation", note: "Store-review CTA" },
  { name: "buying-decision-story", status: "Unused", note: "Previous stacked Observe / Understand / Act / Learn story" },
  { name: "category-benchmark", status: "Used elsewhere", note: "Individual report figure on /benchmarks" },
  { name: "category-benchmarks-section", status: "Homepage", note: "AI Shopping Report ledger on the homepage" },
  { name: "channel-icon", status: "Foundation", note: "AI / commerce channel marks" },
  { name: "connected-evidence", status: "Homepage", note: "Trimmed decision trace — ends at the finding" },
  { name: "credibility-rail", status: "Homepage", note: "Two-register proof band under the hero" },
  { name: "decision-bridge", status: "Used elsewhere", note: "Connected-system architecture on /platform" },
  { name: "evidence-to-work", status: "Homepage", note: "Standalone Actions-queue section" },
  { name: "faq-section", status: "Homepage", note: "Homepage FAQ" },
  { name: "first-month-promise", status: "Homepage", note: "Current final start section" },
  { name: "footer", status: "Foundation", note: "Global site footer" },
  { name: "hero-surface-shift", status: "Homepage", note: "Hero knowledge graph" },
  { name: "logo", status: "Foundation", note: "Beseam brand mark" },
  { name: "logo-concepts", status: "Rejected", note: "Sewing direction, ruled out — implies fabric/tailoring, not AI shopping visibility" },
  { name: "marketing-detail-page", status: "Used elsewhere", note: "Shared marketing-page template" },
  { name: "markets-section", status: "Unused", note: "Previous market-differences section" },
  { name: "measure-impact", status: "Homepage", note: "Standalone Impact-ledger section" },
  { name: "mobile-sticky-cta", status: "Homepage", note: "Mobile-only conversion control" },
  { name: "navbar", status: "Foundation", note: "Global site navigation" },
  { name: "operating-loop", status: "Unused", note: "Superseded on homepage by the compact loop rail in what-beseam-does" },
  { name: "pipeline-graphic", status: "Used elsewhere", note: "Drawn Observe/Understand/Act/Learn pipeline on /platform" },
  { name: "product-art", status: "Foundation", note: "Illustrative product specimen art" },
  { name: "production-homepage", status: "Homepage", note: "Homepage composition" },
  { name: "resource-index", status: "Used elsewhere", note: "Resource library browser" },
  { name: "reveal", status: "Foundation", note: "Scroll reveal wrapper" },
  { name: "shopper-loss", status: "Unused", note: "Previous three-loss-scenarios section" },
  { name: "teams-section", status: "Used elsewhere", note: "Used on /about" },
  { name: "tracked-link", status: "Foundation", note: "Analytics-aware link wrapper" },
  { name: "what-beseam-does", status: "Homepage", note: "Concrete discovery-to-purchase capability journey" },
  { name: "why-beseam", status: "Unused", note: "Previous prioritize / work-together section" },
] as const;

const STATUS_CLASS: Record<Status, string> = {
  Homepage: "border-[#1f7a4d]/25 bg-[#1f7a4d]/[0.07] text-[#1a6b43]",
  "Used elsewhere": "border-[#2e5da6]/25 bg-[#2e5da6]/[0.07] text-[#2e5da6]",
  Unused: "border-signal-ink/25 bg-signal-ink/[0.07] text-signal-ink",
  Foundation: "border-black/16 bg-black/[0.04] text-black/58",
  // Ruled out, not merely idle. Distinct from Unused so nobody revives it.
  Rejected: "border-[#8f3416]/30 bg-[#8f3416]/[0.08] text-[#8f3416] line-through decoration-[#8f3416]/40",
};

function PreviewHeader({ name, status, note }: InventoryItem) {
  return (
    <div className="border-y border-black/14 bg-white">
      <div className="mx-auto flex max-w-[92rem] flex-col gap-2 px-5 py-3 sm:px-8 md:flex-row md:items-center md:justify-between lg:px-10">
        <div className="flex flex-wrap items-center gap-3">
          <code className="font-mono text-[12px] font-semibold text-ink-deep">{name}.tsx</code>
          <span className={`border px-2 py-0.5 font-mono text-[9px] font-semibold uppercase tracking-[0.08em] ${STATUS_CLASS[status]}`}>{status}</span>
        </div>
        <p className="text-[12px] text-black/52">{note}</p>
      </div>
    </div>
  );
}

function MajorPreview({ name, status, note, children }: InventoryItem & { children: React.ReactNode }) {
  return (
    <section id={`component-${name}`} className="scroll-mt-20">
      <PreviewHeader name={name} status={status} note={note} />
      {children}
    </section>
  );
}

const CHANNELS: readonly { brand: ChannelBrand; label: string }[] = [
  { brand: "openai", label: "OpenAI" },
  { brand: "gemini", label: "Gemini" },
  { brand: "claude", label: "Claude" },
  { brand: "perplexity", label: "Perplexity" },
  { brand: "microsoft", label: "Microsoft" },
  { brand: "shopify", label: "Shopify" },
  { brand: "store", label: "Store" },
  { brand: "agentic", label: "Agentic" },
] as const;

const PRODUCT_KINDS: readonly ProductArtKind[] = ["tee", "hoodie", "shell", "protein"];

export default function PlaybookPage() {
  const counts = INVENTORY.reduce<Record<Status, number>>(
    (acc, item) => {
      acc[item.status] += 1;
      return acc;
    },
    { Homepage: 0, "Used elsewhere": 0, Unused: 0, Foundation: 0, Rejected: 0 },
  );

  return (
    <main className="bg-ground text-ink-deep">
      <section className="border-b border-black/14 bg-white">
        <div className="mx-auto max-w-[92rem] px-5 py-16 sm:px-8 sm:py-20 lg:px-10">
          <p className="font-mono text-[12px] font-semibold uppercase tracking-[0.14em] text-signal-ink">Internal playbook</p>
          <div className="mt-6 grid gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-end lg:gap-16">
            <h1 className="max-w-[16ch] text-balance font-display text-[clamp(2.8rem,5vw,4.7rem)] font-normal leading-[1] tracking-[-0.025em]">Every Beseam component in one place.</h1>
            <div>
              <p className="max-w-[58ch] text-[17px] leading-[1.7] text-black/64">Use this page before deleting, replacing, or reusing landing-page work. Major visual sections render live below. Smaller wrappers and templates stay in the inventory even when a standalone preview would not be meaningful.</p>
              <div className="mt-6 flex flex-wrap gap-2">
                {(Object.keys(counts) as Status[]).map((status) => <span key={status} className={`border px-2.5 py-1 font-mono text-[10px] font-semibold uppercase tracking-[0.08em] ${STATUS_CLASS[status]}`}>{counts[status]} {status}</span>)}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-black/14 bg-ground">
        <div className="mx-auto max-w-[92rem] px-5 py-10 sm:px-8 lg:px-10">
          <h2 className="font-display text-[clamp(1.8rem,2.8vw,2.6rem)] font-normal">Inventory</h2>
          <div className="mt-6 overflow-hidden border border-black/14 bg-white">
            <div className="hidden grid-cols-[15rem_9rem_minmax(0,1fr)] border-b border-black/14 bg-ground px-4 py-2 font-mono text-[10px] font-semibold uppercase tracking-[0.1em] text-black/50 sm:grid"><span>Component</span><span>Status</span><span>Purpose</span></div>
            {INVENTORY.map((item) => (
              <div key={item.name} className="grid gap-2 border-b border-black/10 px-4 py-3 last:border-b-0 sm:grid-cols-[15rem_9rem_minmax(0,1fr)] sm:items-center">
                <a href={`#component-${item.name}`} className="font-mono text-[12px] font-semibold text-ink-deep underline decoration-transparent underline-offset-4 hover:decoration-black/30">{item.name}</a>
                <span className={`w-fit border px-2 py-0.5 font-mono text-[9px] font-semibold uppercase tracking-[0.08em] ${STATUS_CLASS[item.status]}`}>{item.status}</span>
                <span className="text-[13px] text-black/58">{item.note}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="border-b border-black/14 bg-[#faf1eb] px-5 py-3 text-center font-mono text-[10px] font-semibold uppercase tracking-[0.12em] text-signal-ink">Current homepage sections</div>
      <MajorPreview name="credibility-rail" status="Homepage" note="Two-register proof band under the hero"><CredibilityRail /></MajorPreview>
      <MajorPreview name="what-beseam-does" status="Homepage" note="Concrete discovery-to-purchase capability journey"><WhatBeseamDoes /></MajorPreview>
      <MajorPreview name="connected-evidence" status="Homepage" note="Worked evidence trace before the product action view"><ConnectedEvidence /></MajorPreview>
      <MajorPreview name="evidence-to-work" status="Homepage" note="Standalone Actions-queue section"><EvidenceToWork /></MajorPreview>
      <MajorPreview name="measure-impact" status="Homepage" note="Standalone Impact-ledger section"><MeasureImpact /></MajorPreview>
      <MajorPreview name="category-benchmarks-section" status="Homepage" note="AI Shopping Report ledger on the homepage"><CategoryBenchmarksSection /></MajorPreview>
      <MajorPreview name="first-month-promise" status="Homepage" note="Current scan / continuous-loop start section"><FirstMonthPromise /></MajorPreview>
      <MajorPreview name="faq-section" status="Homepage" note="Current homepage FAQ"><FaqSection /></MajorPreview>

      <div className="border-b border-black/14 bg-[#faf1eb] px-5 py-3 text-center font-mono text-[10px] font-semibold uppercase tracking-[0.12em] text-signal-ink">Used elsewhere</div>
      <MajorPreview name="decision-bridge" status="Used elsewhere" note="Connected-system architecture on /platform"><DecisionBridge /></MajorPreview>
      <MajorPreview name="teams-section" status="Used elsewhere" note="Currently used on /about"><TeamsSection /></MajorPreview>

      <div className="border-b border-black/14 bg-[#fff4ee] px-5 py-3 text-center font-mono text-[10px] font-semibold uppercase tracking-[0.12em] text-signal-ink">Currently unused sections</div>
      <MajorPreview name="buying-decision-story" status="Unused" note="Previous stacked end-to-end buying-decision story"><BuyingDecisionStory /></MajorPreview>
      <MajorPreview name="markets-section" status="Unused" note="Previous market-context section"><MarketsSection /></MajorPreview>
      <MajorPreview name="operating-loop" status="Unused" note="Superseded by the compact loop rail in what-beseam-does"><OperatingLoop /></MajorPreview>
      <MajorPreview name="shopper-loss" status="Unused" note="Previous three example loss scenarios"><ShopperLoss /></MajorPreview>
      <MajorPreview name="why-beseam" status="Unused" note="Previous prioritize / work-together section"><WhyBeseam /></MajorPreview>

      <div className="border-b border-black/14 bg-ground px-5 py-3 text-center font-mono text-[10px] font-semibold uppercase tracking-[0.12em] text-black/52">Product UI and foundations</div>
      <section id="component-app-screens" className="scroll-mt-20 border-b border-black/14 bg-white">
        <PreviewHeader name="app-screens" status="Homepage" note="Actions and Impact UI specimens" />
        <div className="mx-auto grid max-w-[92rem] gap-10 px-5 py-14 sm:px-8 lg:grid-cols-2 lg:px-10"><div><p className="mb-4 font-mono text-[11px] font-semibold uppercase tracking-[0.1em] text-black/50">Actions · compact</p><ActionsScreen compact /></div><div className="bg-ink-deep p-4"><p className="mb-4 font-mono text-[11px] font-semibold uppercase tracking-[0.1em] text-white/50">Impact</p><ImpactScreen /></div></div>
      </section>

      <section id="component-answer-check" className="scroll-mt-20 border-b border-black/14 bg-ground">
        <PreviewHeader name="answer-check" status="Homepage" note="Free scan form and promise" />
        <div className="mx-auto max-w-[64rem] px-5 py-14 sm:px-8 lg:px-10"><FreeScanPromise compact /><div className="mt-7"><AnswerCheck placement="playbook" handOffTo="/scan" /></div></div>
      </section>

      <section id="component-hero-surface-shift" className="scroll-mt-20 border-b border-black/14 bg-white">
        <PreviewHeader name="hero-surface-shift" status="Homepage" note="Interactive hero knowledge graph" />
        <div className="mx-auto max-w-[92rem] px-5 py-10 sm:px-8 lg:px-10"><div className="relative h-[34rem] overflow-hidden border border-black/14 bg-ground"><HeroSurfaceShift /></div></div>
      </section>

      <section id="component-channel-icon" className="scroll-mt-20 border-b border-black/14 bg-ground">
        <PreviewHeader name="channel-icon" status="Foundation" note="Channel and AI assistant icon system" />
        <div className="mx-auto grid max-w-[92rem] grid-cols-2 gap-px bg-black/12 px-5 py-12 sm:grid-cols-4 sm:px-8 lg:grid-cols-8 lg:px-10">{CHANNELS.map((item) => <div key={item.label} className="flex flex-col items-center gap-3 bg-white p-6 text-center"><ChannelIcon brand={item.brand} className="h-7 w-7" /><span className="text-[12px] font-semibold">{item.label}</span></div>)}</div>
      </section>

      <section id="component-product-art" className="scroll-mt-20 border-b border-black/14 bg-white">
        <PreviewHeader name="product-art" status="Foundation" note="Illustrative product specimen artwork" />
        <div className="mx-auto grid max-w-[64rem] grid-cols-2 gap-6 px-5 py-12 sm:px-8 lg:grid-cols-4 lg:px-10">{PRODUCT_KINDS.map((kind) => <div key={kind} className="border border-black/14 bg-ground p-5"><ProductArt kind={kind} className="mx-auto h-36 w-36" /><p className="mt-4 text-center font-mono text-[11px] font-semibold uppercase tracking-[0.1em] text-black/58">{kind}</p></div>)}</div>
      </section>

      <section id="component-logo" className="scroll-mt-20 border-b border-black/14 bg-ground">
        <PreviewHeader name="logo" status="Foundation" note="Beseam brand mark" />
        <div className="mx-auto flex max-w-[64rem] flex-wrap items-center gap-10 px-5 py-12 sm:px-8 lg:px-10"><Logo /><div className="bg-ink-deep p-5"><Logo className="text-white" /></div></div>
      </section>

      <section id="component-logo-concepts" className="scroll-mt-20 border-b border-black/14 bg-white">
        <PreviewHeader
          name="logo-concepts"
          status="Rejected"
          note="Sewing direction, ruled out — implies fabric/tailoring, not AI shopping visibility. The shipped mark dropped its stitches for the same reason; kept here only as a record."
        />
        <LogoConcepts />
      </section>

      <section id="component-book-review-cta" className="scroll-mt-20 border-b border-black/14 bg-white">
        <PreviewHeader name="book-review-cta" status="Foundation" note="Store-review CTA variants" />
        <div className="mx-auto flex max-w-[64rem] flex-wrap items-center gap-4 px-5 py-12 sm:px-8 lg:px-10"><BookReviewCta location="playbook" label="See Beseam on my store" /><BookReviewCta location="playbook" variant="secondary" label="See how Beseam works" /></div>
      </section>

      <section className="bg-ink-deep text-white"><div className="mx-auto max-w-[92rem] px-5 py-14 sm:px-8 lg:px-10"><p className="font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-signal">Not rendered standalone</p><p className="mt-4 max-w-[70ch] text-[15px] leading-[1.7] text-white/66">Navbar and footer already wrap this page globally. ProductionHomepage and MarketingDetailPage are compositions rather than leaf components. ResourceIndex needs resource data. Reveal and TrackedLink are behavioral wrappers. MobileStickyCta is viewport-state dependent. They remain listed above so the inventory still covers the full Beseam component directory.</p></div></section>
    </main>
  );
}
