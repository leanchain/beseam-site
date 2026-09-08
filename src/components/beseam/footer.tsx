import Link from "next/link";

import Logo from "@/components/beseam/logo";

const FOOTER_GROUPS = [
  {
    label: "Product",
    links: [
      ["Platform", "/platform"],
      ["AI shopping discovery", "/ai-visibility-monitoring"],
      ["Compare", "/compare"],
    ],
  },
  {
    label: "AI shopping agents",
    links: [
      ["AI shopping data", "/data"],
      ["For shopping agents", "/agents"],
      ["AI Shopping Report", "/benchmarks"],
    ],
  },
  {
    label: "Company",
    links: [
      ["How we work", "/how-we-work"],
      ["About", "/about"],
      ["Manifesto", "/manifesto"],
      ["Contact us", "/contact"],
    ],
  },
  {
    label: "Fieldbook",
    links: [["Fieldbook", "/resources"]],
  },
] as const;

export default function BeseamFooter() {
  return (
    <footer className="relative overflow-hidden bg-ink-deep text-white">
      <div className="relative mx-auto max-w-[92rem] px-5 pb-8 pt-14 sm:px-8 sm:pt-16 lg:px-10">
        <div className="grid gap-12 border-b border-white/18 pb-12 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1.25fr)] lg:gap-20">
          <div>
            <Link href="/" aria-label="Beseam home" className="inline-flex max-w-full">
              <Logo
                variant="secondary-inverted"
                className="text-white"
                style={{ fontSize: "clamp(72px, 9vw, 96px)" }}
                markGlow={
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[42rem] w-[42rem] -translate-x-1/2 -translate-y-1/2 opacity-90 blur-3xl"
                    style={{
                      background:
                        "radial-gradient(circle, rgba(255,91,61,0.22) 0%, rgba(255,91,61,0.10) 34%, rgba(255,91,61,0.025) 56%, transparent 72%)",
                    }}
                  />
                }
              />
            </Link>
            <p className="mt-7 max-w-[20ch] font-display text-[34px] leading-[1.08] tracking-[-0.02em] text-white/92">
              Make products easier to{" "}
              <span className="text-signal">find, choose, and buy</span>.
            </p>
            <p className="mt-6 max-w-[54ch] text-[14px] leading-relaxed text-white/62">
              Beseam continuously watches the buying journey, finds what is worth
              improving, applies approved changes where supported, and measures
              what changed.
            </p>
          </div>

          <div
            className="grid w-full grid-cols-2 gap-x-8 gap-y-8 sm:grid-cols-4 sm:gap-x-8"
            style={{ maxWidth: "48rem", marginLeft: "auto" }}
          >
            {FOOTER_GROUPS.map((group) => (
              <nav key={group.label} aria-label={group.label}>
                <p className="text-[13px] font-semibold text-white">
                  {group.label}
                </p>
                <ul className="mt-4 space-y-1.5">
                  {group.links.map(([label, href]) => (
                    <li key={label}>
                      <Link
                        href={href}
                        className="inline-flex min-h-11 items-center text-[13px] text-white/62 transition-colors hover:text-white lg:min-h-9"
                      >
                        {label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-5 pt-8 text-[12px] text-white/52 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
            <p>© {new Date().getFullYear()} Beseam. All rights reserved.</p>
            <Link
              href="/privacy-policy"
              className="transition-colors hover:text-white"
            >
              Privacy
            </Link>
            <Link
              href="/terms-of-service"
              className="transition-colors hover:text-white"
            >
              Terms
            </Link>
            <Link href="/bot" className="transition-colors hover:text-white">
              BeseamBot
            </Link>
          </div>

          <p className="inline-flex items-center gap-2 sm:justify-end">
            <span>Made with love in Switzerland</span>
            <span
              aria-label="Swiss flag"
              role="img"
              className="relative inline-block h-4 w-4 shrink-0 bg-[#d52b1e]"
            >
              <span className="absolute left-1/2 top-[3px] h-[10px] w-[3px] -translate-x-1/2 bg-white" />
              <span className="absolute left-[3px] top-1/2 h-[3px] w-[10px] -translate-y-1/2 bg-white" />
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
}
