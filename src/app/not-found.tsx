import Link from "next/link";

import { ArrowRight } from "lucide-react";

import { BookReviewCta } from "@/components/beseam/book-review-cta";
import Halftone from "@/components/beseam/halftone";
import { Reveal } from "@/components/beseam/reveal";

/** Where a lost visitor most likely wanted to go. */
const DESTINATIONS = [
  [
    "Homepage",
    "See how Beseam makes AI a revenue channel for your webshop.",
    "/",
  ],
  [
    "AI visibility tracking",
    "See when ChatGPT and other AI assistants recommend your products.",
    "/product/ai-visibility-tracking",
  ],
  ["Contact", "Book a 20-minute intro call, or send us a message.", "/contact"],
  [
    "Blog",
    "Practical guides on getting your products recommended by AI.",
    "/blog",
  ],
] as const;

export default function NotFound() {
  return (
    <div className="bg-ground text-[#151515]">
      <section className="relative isolate overflow-hidden bg-[#fff9e8]">
        <Halftone corner="top-right" size={220} className="hidden xl:block" />
        <div className="relative z-10 mx-auto max-w-[56rem] px-5 py-16 text-center sm:px-8 sm:py-20 lg:px-10 lg:py-24">
          <Reveal>
            <p className="mx-auto inline-flex rounded-button bg-signal px-2.5 py-1 text-[13px] font-semibold text-ink-deep">
              Error 404
            </p>
            <h1 className="mx-auto mt-6 max-w-[18ch] text-balance font-display text-[clamp(2.6rem,5vw,4.25rem)] font-semibold leading-[1.02] tracking-[-0.035em] text-ink-deep">
              This page is not here.
            </h1>
            <p className="mx-auto mt-6 max-w-[52ch] text-[17px] leading-[1.7] text-black/72 sm:text-[18px]">
              The address may have changed, or the page may never have existed.
              Nothing is broken on your side.
            </p>
            <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                href="/"
                className="group inline-flex min-h-12 w-full items-center justify-center gap-3 rounded-button bg-signal-ink px-7 py-3 text-[15px] font-semibold text-white sm:w-auto"
              >
                Back to the homepage
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
              <BookReviewCta
                label="Request a demo"
                location="not_found"
                className="w-full border border-black/15 bg-white text-ink-deep transition-colors hover:border-black/40 sm:w-auto"
              />
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-ground">
        <div className="mx-auto max-w-[76rem] px-5 py-12 sm:px-8 sm:py-14 lg:px-10 lg:py-16">
          <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {DESTINATIONS.map(([title, body, href]) => (
              <li key={href}>
                <Link
                  href={href}
                  className="group flex h-full flex-col rounded-media border border-black/10 bg-white p-6 transition-colors hover:border-black/30"
                >
                  <h2 className="text-[18px] font-semibold tracking-[-0.01em] text-ink-deep">
                    {title}
                  </h2>
                  <p className="mt-2 flex-1 text-[15px] leading-[1.6] text-black/64">
                    {body}
                  </p>
                  <ArrowRight className="mt-4 h-4 w-4 text-ink-deep transition-transform group-hover:translate-x-0.5" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}
