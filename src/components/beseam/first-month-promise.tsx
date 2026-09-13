import { ArrowRight } from "lucide-react";

import { Reveal } from "@/components/beseam/reveal";
import TrackedLink from "@/components/beseam/tracked-link";
import { getDictionary } from "@/i18n";
import type { Locale } from "@/i18n/locale-rules.mjs";

/**
 * The launch-home closer repeats the same first action as the hero instead of
 * opening a second acquisition path. Registration belongs after a useful scan:
 * the result page already carries the scanned domain into the app signup flow.
 */
export default function FirstMonthPromise({
  showManifestoLink = true,
  locale = "en",
}: {
  showManifestoLink?: boolean;
  locale?: Locale;
}) {
  void showManifestoLink;
  const t = getDictionary(locale);
  const promise = t.sections.promise;
  const scanHref = locale === "de" ? "/de/scan" : "/scan";

  return (
    <section
      id="promise"
      className="scroll-mt-24 border-t border-black/10 bg-ground"
    >
      <div className="mx-auto max-w-[92rem] px-5 py-16 sm:px-8 sm:py-24 lg:px-10 lg:py-28">
        <Reveal>
          <div className="grid gap-8 lg:grid-cols-[minmax(0,0.72fr)_minmax(0,1.28fr)] lg:items-end lg:gap-16">
            <div>
              <h2 className="max-w-[20ch] text-balance font-display text-[clamp(2.2rem,3.3vw,3.4rem)] font-normal leading-[1.04] tracking-[-0.02em] text-ink-deep">
                <span className="block">{promise.headingLine1}</span>
                <span className="block">{promise.headingLine2}</span>
              </h2>
            </div>
            <div>
              <p className="max-w-[52ch] text-[17px] leading-[1.72] text-black/64">
                {promise.body}
              </p>
              <TrackedLink
                href={scanHref}
                eventName="marketing_primary_cta_clicked"
                eventCategory="conversion"
                placement="first_month_promise"
                preserveUtm
                className="group mt-8 inline-flex min-h-12 items-center justify-center gap-2 bg-signal-ink px-7 text-[15px] font-semibold text-white transition-colors hover:bg-pigment"
              >
                {promise.cta}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </TrackedLink>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
