import { getDictionary } from "@/i18n";
import type { Locale } from "@/i18n/locale-rules.mjs";

/**
 * Credibility strip along the bottom of the hero, for a business without
 * customer logos yet. It sits inside the hero block and takes its background.
 *
 * Lists the AI assistants Beseam actually checks (the scan channels mapped in
 * `channel-icon.tsx` and probed from `answer-check.tsx`). Names are set as
 * plain muted wordmarks, not the companies' logos, and framed as where
 * shoppers ask -- never as partners or customers.
 */
const PLATFORMS = [
  "ChatGPT",
  "Claude",
  "Gemini",
  "Google AI Mode",
  "Perplexity",
  "Copilot",
] as const;

export default function AiPlatformsStrip({
  locale = "en",
}: {
  locale?: Locale;
}) {
  const t = getDictionary(locale).sections.platforms;

  return (
    <section
      aria-label={t.eyebrow}
      className="relative z-10 mx-auto max-w-[76rem] px-5 sm:px-8 lg:px-10"
    >
      {/* Narrow and centred, one line from desktop width, so the line and
          names end before the hero's corner dots. */}
      <div className="mx-auto flex max-w-[50rem] flex-col items-center gap-3 border-t border-black/8 py-6 lg:flex-row lg:justify-center lg:gap-8">
        <p className="shrink-0 font-display text-[11px] font-semibold uppercase tracking-[0.08em] text-black/50">
          {t.eyebrow}
        </p>
        <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 sm:gap-x-8">
          {PLATFORMS.map((name) => (
            <li
              key={name}
              className="font-display text-[17px] font-semibold tracking-[-0.02em] text-black/45"
            >
              {name}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
