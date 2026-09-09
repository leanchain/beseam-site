import {
  ActionsScreen,
  CatalogScreen,
  DiscoveryScreen,
  ImpactScreen,
  OverviewScreen,
} from "@/components/beseam/app-screens";
import { Reveal } from "@/components/beseam/reveal";

/**
 * What a merchant actually opens, in the app's own order and under the app's
 * own labels (`frontend/src/lib/primary-navigation.ts`, the five entries that
 * survive at `guided` depth, by `shallowOrder`). The descriptions are the
 * app's descriptions; if a label is renamed there it is renamed here.
 *
 * This is the page's spine because it is the one thing the homepage cannot
 * say: the homepage argues that the work shares one record, and this shows
 * the five places that work is done.
 */

const SURFACES = [
  {
    label: "Home",
    route: "/overview",
    question: "What deserves attention today?",
    detail:
      "Current store state, largest commercial issue, and the next decision to make.",
    screen: <OverviewScreen />,
    dark: false,
  },
  {
    label: "Discovery",
    route: "/visibility",
    question: "Who gets named when shoppers ask?",
    detail:
      "AI shopping visibility, shopper questions, competitors, citations, sources, and readiness.",
    screen: <DiscoveryScreen />,
    dark: false,
  },
  {
    label: "Products",
    route: "/products",
    question: "What does the catalog get wrong at the decision point?",
    detail:
      "Catalog truth, product issues, channel readiness, fixes, publication, and verification.",
    screen: <CatalogScreen />,
    dark: false,
  },
  {
    label: "Growth plan",
    route: "/actions",
    question: "What is worth changing next, and who approves it?",
    detail:
      "One ranked growth plan for opportunities, approvals, execution, and proof.",
    // The wide queue is a 60rem table; in this column it clipped its own
    // status chip. The compact view is the same rows, stacked.
    screen: <ActionsScreen compact />,
    dark: false,
  },
  {
    label: "Results",
    route: "/impact",
    question: "Did the change move the outcome?",
    detail:
      "Verified outcomes with booked, observed, attributed, and modeled money kept separate.",
    screen: <ImpactScreen />,
    dark: true,
  },
] as const;

export default function PlatformSurfaces() {
  return (
    <section className="border-b border-rule bg-white">
      <div className="mx-auto max-w-[92rem] px-5 py-16 sm:px-8 sm:py-20 lg:px-10 lg:py-24">
        <Reveal>
          <div className="grid gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:items-end lg:gap-20">
            <h2 className="max-w-[16ch] font-display text-[clamp(2.2rem,3.6vw,3.4rem)] font-normal leading-[1.04] tracking-[-0.02em] text-ink-deep">
              Five places, and what each one answers.
            </h2>
            <p className="max-w-[52ch] text-[16px] leading-[1.7] text-black/64">
              This is what you open after connecting a store. Same names as the
              app, same order. Screens are drawn with example figures, not
              customer data.
            </p>
          </div>
        </Reveal>

        <div className="mt-12 flex flex-col border-t border-black/16 lg:mt-16">
          {SURFACES.map(({ label, route, question, detail, screen, dark }) => (
            <Reveal key={route}>
              <div className="grid gap-6 border-b border-black/12 py-9 lg:grid-cols-[minmax(0,0.62fr)_minmax(0,1.38fr)] lg:gap-16 lg:py-12">
                <div>
                  <div className="flex items-baseline gap-3">
                    <p className="text-[17px] font-semibold tracking-[-0.01em] text-ink-deep">
                      {label}
                    </p>
                    <p className="font-mono text-[11px] uppercase tracking-[0.08em] text-black/45">
                      {route}
                    </p>
                  </div>
                  <p className="mt-3 max-w-[24ch] text-[19px] leading-[1.3] tracking-[-0.01em] text-ink-deep">
                    {question}
                  </p>
                  <p className="mt-3 max-w-[38ch] text-[13.5px] leading-[1.6] text-black/60">
                    {detail}
                  </p>
                </div>

                {/* The results ledger is drawn for a dark ground, so it keeps
                    one here rather than being recoloured for the row. */}
                <div className={dark ? "bg-ink-deep p-4 sm:p-5" : ""}>
                  {screen}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
