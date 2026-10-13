import type { CSSProperties, ReactNode } from "react";

import Image from "next/image";

import {
  ArrowDownWideNarrow,
  Check,
  Clock,
  Sparkles,
  TrendingUp,
  X,
} from "lucide-react";

import CountUp from "@/components/beseam/count-up";
import { Reveal } from "@/components/beseam/reveal";
import RevealOnView from "@/components/beseam/reveal-on-view";
import { getDictionary, type Dictionary } from "@/i18n";
import type { Locale } from "@/i18n/locale-rules.mjs";

type Features = Dictionary["sections"]["features"];
type FeatureKey = keyof Features;

/**
 * Four alternating rows under the hero: a heading and body on one side, a
 * small illustrative product card on the other. Even rows put the visual
 * first on desktop; on mobile the text always leads, so the heading is read
 * before the picture that illustrates it.
 *
 * The visuals are drawn in markup rather than shipped as images, so they stay
 * sharp, follow the site tokens, and translate with the dictionary. Their
 * figures are placeholder examples, not customer results.
 */
const ROWS: readonly FeatureKey[] = [
  "webshops",
  "presence",
  "revenue",
  "impact",
];

export default function FeatureRows({ locale = "en" }: { locale?: Locale }) {
  const t = getDictionary(locale);
  const features = t.sections.features;

  return (
    <section id="features" className="scroll-mt-24">
      {ROWS.map((key, index) => {
        const item = features[key];
        const visualFirst = index % 2 === 1;
        // Bands alternate light and warm, starting light so the first row
        // separates clearly from the cream hero above it.
        const warm = index % 2 === 1;
        return (
          <div
            key={key}
            data-band={warm ? "warm" : "light"}
            className={`group ${warm ? "bg-[#fff9e8]" : "bg-ground"}`}
          >
            <div className="mx-auto max-w-[76rem] px-5 py-12 sm:px-8 sm:py-14 lg:px-10 lg:py-16">
              <Reveal>
                <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-20">
                  <div className={visualFirst ? "lg:order-2" : undefined}>
                    <h2 className="max-w-[20ch] text-balance font-display text-[clamp(2.25rem,3.6vw,3.5rem)] font-semibold leading-[1.02] tracking-[-0.035em] text-ink-deep">
                      {item.title}
                    </h2>
                    <p className="mt-6 max-w-[46ch] text-[17px] leading-[1.7] text-black/64">
                      {item.body}
                    </p>
                  </div>
                  <div className={visualFirst ? "lg:order-1" : undefined}>
                    <FeatureVisual feature={key} features={features} />
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        );
      })}
    </section>
  );
}

function FeatureVisual({
  feature,
  features,
}: {
  feature: FeatureKey;
  features: Features;
}) {
  switch (feature) {
    case "webshops":
      return <CatalogVisual copy={features.webshops.visual} />;
    case "presence":
      return <PresenceVisual copy={features.presence.visual} />;
    case "revenue":
      return <RevenueVisual copy={features.revenue.visual} />;
    case "impact":
      return <ImpactVisual copy={features.impact.visual} />;
  }
}

/** Stagger delay for one `.fx-item` / `.fx-pop` element, in ms. */
const fx = (ms: number) => ({ "--fx-delay": `${ms}ms` }) as CSSProperties;

/** Tinted stage with one white card and one floating chip, like a product shot. */
function Stage({
  label,
  chip,
  children,
}: {
  label: string;
  chip: ReactNode;
  children: ReactNode;
}) {
  return (
    <figure className="mx-auto w-full max-w-[34rem]">
      {/* The stage always contrasts with its band: warm on light bands,
          near-white on warm ones. */}
      {/* The card builds itself once when it scrolls into view; the
          sticker pops in last. */}
      <RevealOnView className="relative rounded-media bg-[#fff9e8] px-6 pb-12 pt-8 group-data-[band=warm]:bg-white/70 sm:px-10 sm:pb-14 sm:pt-10">
        {/* One fixed card height from tablet up, so the four rows line up. */}
        <div className="flex flex-col overflow-hidden rounded-media border border-black/12 bg-white shadow-[0_18px_40px_-24px_rgba(17,19,24,0.35)] sm:h-[216px]">
          <p className="border-b border-black/10 px-4 py-3 font-display font-semibold text-[11px] uppercase tracking-[0.08em] text-black/50">
            {label}
          </p>
          <div className="flex flex-1 flex-col justify-center px-4 py-3">
            {children}
          </div>
        </div>
        <div
          className="fx-pop absolute bottom-7 right-4 sm:right-8"
          style={fx(950)}
        >
          {chip}
        </div>
      </RevealOnView>
    </figure>
  );
}

function Chip({ icon, children }: { icon: ReactNode; children: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-button bg-signal px-3 py-2 text-[13px] font-semibold text-ink-deep shadow-[0_10px_24px_-12px_rgba(17,19,24,0.5)]">
      {icon}
      {children}
    </span>
  );
}

/**
 * Free Unsplash photos (Unsplash licence: free commercial use, no attribution
 * required), cropped to 480 x 360. Unbranded on purpose, like the jackets in
 * `what-beseam-does.tsx`:
 * - boot.webp: "black leather boot on white table" by mostafa mahmoudi,
 *   unsplash.com/photos/KKsB-eOAjVo
 * - tshirt.webp: "A plain white t-shirt hangs on a wooden hanger" by Avtar
 *   Singh, unsplash.com/photos/8ACmRoleM24
 * - beanie.webp: "yellow knit bubble cap" by Kerim Ayar,
 *   unsplash.com/photos/WWpJViNdatc
 */
const CATALOG_PHOTOS = [
  "/images/catalog/boot.webp",
  "/images/catalog/tshirt.webp",
  "/images/catalog/beanie.webp",
] as const;

function CatalogVisual({ copy }: { copy: Features["webshops"]["visual"] }) {
  return (
    <Stage
      label={copy.label}
      chip={
        <Chip icon={<Check aria-hidden="true" className="h-4 w-4" />}>
          {copy.status}
        </Chip>
      }
    >
      <div className="grid grid-cols-3 gap-3">
        {CATALOG_PHOTOS.map((src, index) => (
          <div
            key={src}
            className="fx-item overflow-hidden rounded-sm border border-black/8 p-1.5"
            style={fx(150 + index * 140)}
          >
            <Image
              src={src}
              alt=""
              width={480}
              height={360}
              sizes="160px"
              className="aspect-[4/3] w-full rounded-[2px] object-cover"
            />
          </div>
        ))}
      </div>
      <p
        className="fx-item mt-3 text-[14px] font-semibold text-ink-deep"
        style={fx(600)}
      >
        {copy.stat}
      </p>
    </Stage>
  );
}

function PresenceVisual({ copy }: { copy: Features["presence"]["visual"] }) {
  const rows = [
    { channel: "ChatGPT", named: true },
    { channel: "Claude", named: true },
    { channel: "Gemini", named: false },
  ];
  return (
    <Stage
      label={copy.label}
      chip={
        <Chip icon={<TrendingUp aria-hidden="true" className="h-4 w-4" />}>
          {copy.trend}
        </Chip>
      }
    >
      <ul className="divide-y divide-black/8">
        {rows.map(({ channel, named }, index) => (
          <li
            key={channel}
            className="fx-item flex items-center justify-between gap-4 py-3"
            style={fx(150 + index * 150)}
          >
            <span className="text-[14px] font-medium text-ink-deep">
              {channel}
            </span>
            <span
              className={`fx-pop inline-flex items-center gap-1.5 rounded-button px-2 py-0.5 text-[12px] font-semibold ${
                named
                  ? "bg-[#1f7a4d]/[0.1] text-[#1a6b43]"
                  : "bg-black/[0.06] text-black/56"
              }`}
              style={fx(450 + index * 150)}
            >
              {named ? (
                <Check aria-hidden="true" className="h-3.5 w-3.5" />
              ) : (
                <X aria-hidden="true" className="h-3.5 w-3.5" />
              )}
              {named ? copy.named : copy.missed}
            </span>
          </li>
        ))}
      </ul>
    </Stage>
  );
}

function RevenueVisual({ copy }: { copy: Features["revenue"]["visual"] }) {
  const rows = [
    { label: copy.items.description, amount: 2.4, decimals: 1, unit: "k" },
    { label: copy.items.data, amount: 1.1, decimals: 1, unit: "k" },
    { label: copy.items.speed, amount: 600, decimals: 0, unit: "" },
  ];
  return (
    <Stage
      label={copy.label}
      chip={
        <Chip
          icon={<ArrowDownWideNarrow aria-hidden="true" className="h-4 w-4" />}
        >
          {copy.sorted}
        </Chip>
      }
    >
      <ol className="space-y-2">
        {rows.map(({ label, amount, decimals, unit }, index) => (
          <li
            key={label}
            className="fx-item flex items-center gap-3 rounded-button border border-black/8 px-3 py-2"
            style={fx(150 + index * 140)}
          >
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-black/[0.06] font-mono text-[12px] font-semibold text-black/62">
              {index + 1}
            </span>
            <span className="min-w-0 flex-1 text-[13px] leading-snug sm:truncate font-medium text-ink-deep">
              {label}
            </span>
            <span className="shrink-0 font-mono text-[13px] font-semibold tabular-nums text-[#1a6b43]">
              <CountUp
                to={amount}
                decimals={decimals}
                prefix="+€"
                suffix={unit}
                delay={250 + index * 140}
              />
            </span>
          </li>
        ))}
      </ol>
    </Stage>
  );
}

function ImpactVisual({ copy }: { copy: Features["impact"]["visual"] }) {
  const rows = [
    { label: copy.rows.suggested, value: 8, done: false },
    { label: copy.rows.approved, value: 6, done: true },
    { label: copy.rows.automated, value: 2, done: true },
  ];
  return (
    <Stage
      label={copy.label}
      chip={
        <Chip icon={<Clock aria-hidden="true" className="h-4 w-4" />}>
          {copy.total}
        </Chip>
      }
    >
      <ul className="divide-y divide-black/8">
        {rows.map(({ label, value, done }, index) => (
          <li
            key={label}
            className="fx-item flex items-center gap-3 py-2.5"
            style={fx(150 + index * 150)}
          >
            <span
              style={fx(400 + index * 150)}
              className={`fx-pop flex h-6 w-6 shrink-0 items-center justify-center rounded-full ${
                done
                  ? "bg-signal-ink text-white"
                  : "bg-black/[0.06] text-black/62"
              }`}
            >
              {done ? (
                <Check aria-hidden="true" className="h-3.5 w-3.5" />
              ) : (
                <Sparkles aria-hidden="true" className="h-3.5 w-3.5" />
              )}
            </span>
            <span className="flex-1 text-[14px] font-medium text-ink-deep">
              {label}
            </span>
            <span className="font-display text-[18px] font-semibold tabular-nums text-ink-deep">
              <CountUp to={value} delay={250 + index * 150} duration={700} />
            </span>
          </li>
        ))}
      </ul>
    </Stage>
  );
}
