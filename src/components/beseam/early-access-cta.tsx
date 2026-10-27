"use client";

import {
  useEffect,
  useId,
  useRef,
  useState,
  type FormEvent,
  type ReactNode,
} from "react";

import { X } from "lucide-react";

import useAnalytics from "@/hooks/useAnalytics";
import { useDictionary } from "@/i18n/use-locale";
import {
  getMarketingProperties,
  getUtmValues,
} from "@/lib/marketing-analytics";

const inputClass =
  "mt-1.5 min-h-11 w-full rounded-button border border-black/15 bg-white px-3.5 py-2.5 text-[15px] text-ink-deep outline-none transition-colors placeholder:text-black/52 focus:border-ink-deep focus:ring-2 focus:ring-signal";

const EMPTY_FORM = { name: "", email: "", company: "", website: "" };

/** Window event the buttons send and the dialog listens for. */
const OPEN_EVENT = "beseam:early-access";

/**
 * The site's primary call to action. The button only opens the shared
 * dialog (`EarlyAccessDialog`, mounted once in the root layout), so a button
 * that unmounts on scroll, like the navbar or mobile sticky one, can't take
 * the open form with it.
 *
 * Styling stays with the caller, so each placement keeps its own button look:
 * pass the same className and children the old sign-up link had.
 */
export function EarlyAccessCta({
  placement,
  className,
  children,
  onOpen,
}: {
  placement: string;
  className?: string;
  children: ReactNode;
  /** Runs when the dialog opens, e.g. to close the mobile menu. */
  onOpen?: () => void;
}) {
  const { trackEvent } = useAnalytics();
  return (
    <button
      type="button"
      onClick={() => {
        trackEvent({
          action: "marketing_primary_cta_clicked",
          category: "conversion",
          ...getMarketingProperties(placement, "early_access_form"),
        });
        onOpen?.();
        window.dispatchEvent(
          new CustomEvent(OPEN_EVENT, { detail: { placement } }),
        );
      }}
      className={className}
    >
      {children}
    </button>
  );
}

/**
 * The early access form: name, work email and company. The request goes to
 * /api/lead as an `early_access` lead, which the Worker emails to the team.
 */
export function EarlyAccessDialog() {
  const t = useDictionary().earlyAccess;
  const { trackEvent } = useAnalytics();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const placementRef = useRef("unknown");
  const titleId = useId();
  const [form, setForm] = useState(EMPTY_FORM);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const submissionRef = useRef<{ fingerprint: string; id: string } | null>(
    null,
  );

  useEffect(() => {
    const onOpenRequest = (event: Event) => {
      placementRef.current =
        (event as CustomEvent<{ placement?: string }>).detail?.placement ??
        "unknown";
      dialogRef.current?.showModal();
    };
    window.addEventListener(OPEN_EVENT, onOpenRequest);
    return () => window.removeEventListener(OPEN_EVENT, onOpenRequest);
  }, []);

  const close = () => dialogRef.current?.close();

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitting(true);
    setError("");

    try {
      const payload = { ...form, source: "early_access", utm: getUtmValues() };
      const fingerprint = JSON.stringify(payload);
      if (
        !submissionRef.current ||
        submissionRef.current.fingerprint !== fingerprint
      ) {
        submissionRef.current = { fingerprint, id: crypto.randomUUID() };
      }
      const response = await fetch("/api/lead", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          ...payload,
          submissionId: submissionRef.current.id,
        }),
      });
      if (!response.ok) throw new Error("The request could not be sent.");

      trackEvent({
        action: "early_access_requested",
        category: "conversion",
        ...getMarketingProperties(placementRef.current, "/api/lead"),
      });
      setSubmitted(true);
      setForm(EMPTY_FORM);
    } catch {
      setError(t.error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby={titleId}
      // A click on the backdrop lands on the dialog element itself.
      onClick={(event) => {
        if (event.target === event.currentTarget) close();
      }}
      onClose={() => {
        setError("");
        setSubmitted(false);
      }}
      className="m-auto w-[calc(100%-2rem)] max-w-md rounded-media border border-black/10 bg-white p-0 text-left text-ink-deep shadow-[0_30px_80px_-30px_rgba(17,19,24,0.55)] backdrop:bg-ink-deep/55 backdrop:backdrop-blur-[2px]"
    >
      <div className="relative p-6 sm:p-8">
        <button
          type="button"
          onClick={close}
          aria-label={t.close}
          className="absolute right-3 top-3 inline-flex h-10 w-10 items-center justify-center rounded-button text-black/55 transition-colors hover:bg-black/[0.05] hover:text-ink-deep"
        >
          <X aria-hidden="true" className="h-5 w-5" />
        </button>

        {submitted ? (
          <div role="status" className="py-4 text-center">
            <p className="mx-auto inline-flex rounded-button bg-signal px-2.5 py-1 text-[12px] font-semibold text-ink-deep">
              {t.successEyebrow}
            </p>
            <h2
              id={titleId}
              className="mt-4 text-balance font-display text-[26px] font-semibold leading-[1.1] tracking-[-0.03em]"
            >
              {t.successTitle}
            </h2>
            <p className="mt-3 text-[15px] leading-relaxed text-black/64">
              {t.successBody}
            </p>
            <button
              type="button"
              onClick={close}
              className="mt-6 inline-flex min-h-11 items-center justify-center rounded-button bg-signal-ink px-6 text-[14px] font-semibold text-white focus-visible:ring-2 focus-visible:ring-signal-ink focus-visible:ring-offset-3"
            >
              {t.close}
            </button>
          </div>
        ) : (
          <form onSubmit={onSubmit}>
            <h2
              id={titleId}
              className="pr-8 text-balance font-display text-[26px] font-semibold leading-[1.1] tracking-[-0.03em]"
            >
              {t.title}
            </h2>
            <p className="mt-3 text-[15px] leading-relaxed text-black/64">
              {t.body}
            </p>
            <div className="mt-6 grid gap-4">
              <label className="text-[13px] font-medium text-foreground">
                {t.name}
                <input
                  required
                  minLength={2}
                  autoComplete="name"
                  maxLength={100}
                  value={form.name}
                  onChange={(event) =>
                    setForm({ ...form, name: event.target.value })
                  }
                  className={inputClass}
                />
              </label>
              <label className="text-[13px] font-medium text-foreground">
                {t.email}
                <input
                  required
                  type="email"
                  autoComplete="email"
                  maxLength={200}
                  value={form.email}
                  onChange={(event) =>
                    setForm({ ...form, email: event.target.value })
                  }
                  className={inputClass}
                />
              </label>
              <label className="text-[13px] font-medium text-foreground">
                {t.company}
                <input
                  required
                  minLength={2}
                  autoComplete="organization"
                  maxLength={200}
                  value={form.company}
                  onChange={(event) =>
                    setForm({ ...form, company: event.target.value })
                  }
                  className={inputClass}
                />
              </label>
              <label className="sr-only" aria-hidden="true">
                {t.honeypot}
                <input
                  tabIndex={-1}
                  autoComplete="off"
                  value={form.website}
                  onChange={(event) =>
                    setForm({ ...form, website: event.target.value })
                  }
                />
              </label>
            </div>
            {error ? (
              <p role="alert" className="mt-4 text-[13px] text-destructive">
                {error}
              </p>
            ) : null}
            <button
              type="submit"
              disabled={submitting}
              className="mt-6 inline-flex min-h-12 w-full items-center justify-center rounded-button bg-signal-ink px-7 text-[15px] font-semibold text-white focus-visible:ring-2 focus-visible:ring-signal-ink focus-visible:ring-offset-3 disabled:cursor-wait disabled:opacity-70"
            >
              {submitting ? t.sending : t.submit}
            </button>
          </form>
        )}
      </div>
    </dialog>
  );
}
