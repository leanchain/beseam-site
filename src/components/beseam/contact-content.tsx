"use client";

import { useRef, useState, type FormEvent } from "react";

import Image from "next/image";
import Link from "next/link";

import { CalendarDays } from "lucide-react";

import { BookReviewCta } from "@/components/beseam/book-review-cta";
import Halftone from "@/components/beseam/halftone";
import { Reveal } from "@/components/beseam/reveal";
import useAnalytics from "@/hooks/useAnalytics";
import { localizedPath, type Locale } from "@/i18n/locale-rules.mjs";
import { getPageCopy, type PageCopy } from "@/i18n/pages";
import {
  getMarketingProperties,
  getUtmValues,
} from "@/lib/marketing-analytics";

type ContactCopy = PageCopy["contact"];

const inputClass =
  "mt-1.5 min-h-11 w-full rounded-button border border-black/15 bg-white px-3.5 py-2.5 text-[15px] text-ink-deep outline-none transition-colors placeholder:text-black/52 focus:border-ink-deep focus:ring-2 focus:ring-signal";

function ContactForm({ t }: { t: ContactCopy }) {
  const { trackEvent } = useAnalytics();
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const submissionRef = useRef<{ fingerprint: string; id: string } | null>(
    null,
  );
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
    website: "",
  });

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitting(true);
    setError("");

    try {
      const payload = {
        ...form,
        source: "contact",
        utm: getUtmValues(),
      };
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

      if (!response.ok) throw new Error("The message could not be sent.");

      trackEvent({
        action: "contact_form_submitted",
        category: "marketing",
        ...getMarketingProperties("contact_page", "/api/lead"),
      });
      setSubmitted(true);
    } catch {
      setError(t.sendError);
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div
        role="status"
        className="rounded-media border border-black/10 bg-white p-8 text-center shadow-[0_18px_40px_-24px_rgba(17,19,24,0.35)]"
      >
        <p className="mx-auto inline-flex rounded-button bg-signal px-2.5 py-1 text-[12px] font-semibold text-ink-deep">
          {t.sentEyebrow}
        </p>
        <h2 className="mt-4 text-balance font-display text-[28px] font-semibold leading-[1.1] tracking-[-0.03em] text-ink-deep">
          {t.sentHeading}
        </h2>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className="rounded-media border border-black/10 bg-white p-6 shadow-[0_18px_40px_-24px_rgba(17,19,24,0.35)] md:p-8"
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="text-[13px] font-medium text-foreground">
          {t.name}
          <input
            required
            autoComplete="name"
            maxLength={100}
            value={form.name}
            onChange={(event) => setForm({ ...form, name: event.target.value })}
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
        <label className="text-[13px] font-medium text-foreground sm:col-span-2">
          {t.message}
          <textarea
            required
            rows={4}
            maxLength={2000}
            value={form.message}
            onChange={(event) =>
              setForm({ ...form, message: event.target.value })
            }
            className={inputClass}
            placeholder={t.messagePlaceholder}
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
        className="mt-5 inline-flex min-h-12 items-center justify-center rounded-button bg-signal-ink px-7 text-[15px] font-semibold text-white focus-visible:ring-2 focus-visible:ring-signal-ink focus-visible:ring-offset-3 disabled:cursor-wait disabled:opacity-70"
      >
        {submitting ? t.sending : t.send}
      </button>
    </form>
  );
}

export default function ContactContent({ locale = "en" }: { locale?: Locale }) {
  const copy = getPageCopy(locale);
  const t = copy.contact;
  return (
    <div className="bg-ground text-[#151515]">
      <section className="relative isolate overflow-hidden bg-[#fff9e8]">
        {/* Top-right: the intro text sits bottom-right on desktop. */}
        <Halftone corner="top-right" size={220} className="hidden xl:block" />
        <div className="relative z-10 mx-auto max-w-[76rem] px-5 py-16 sm:px-8 sm:py-20 lg:px-10 lg:py-24">
          <nav
            aria-label={copy.common.breadcrumb}
            className="text-[13px] font-medium text-black/55"
          >
            <Link
              href={localizedPath("/", locale)}
              className="text-ink-deep underline-offset-4 hover:underline"
            >
              Beseam
            </Link>
            <span aria-hidden className="mx-2">
              /
            </span>
            <span>{t.breadcrumb}</span>
          </nav>
          <Reveal className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-end lg:gap-16">
            <h1 className="max-w-[16ch] text-balance font-display text-[clamp(2.6rem,5vw,4.25rem)] font-semibold leading-[1.02] tracking-[-0.035em] text-ink-deep">
              {t.title}
            </h1>
            <p className="max-w-[56ch] text-[17px] leading-[1.7] text-black/72 sm:text-[18px]">
              {t.intro}
            </p>
          </Reveal>
        </div>
      </section>

      <section className="bg-ground">
        <div className="mx-auto max-w-[76rem] px-5 py-12 sm:px-8 sm:py-14 lg:px-10 lg:py-16">
          <Reveal className="flex flex-col gap-5 rounded-media bg-[#fff9e8] p-6 sm:flex-row sm:items-center sm:justify-between md:p-8">
            <p className="flex items-center gap-3 text-[17px] font-semibold text-ink-deep">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-media bg-signal text-ink-deep">
                <CalendarDays className="h-5 w-5" aria-hidden="true" />
              </span>
              {t.callPrompt}
            </p>
            <BookReviewCta
              label={t.bookCall}
              location="contact_page"
              className="w-full sm:w-auto"
            />
          </Reveal>
        </div>
      </section>

      <section className="bg-[#fff9e8]">
        <div className="mx-auto max-w-2xl px-5 py-12 sm:px-8 sm:py-14 lg:px-10 lg:py-16">
          <Reveal>
            <p className="text-center font-display text-[12px] font-semibold uppercase tracking-[0.08em] text-black/50">
              {t.formEyebrow}
            </p>
            <h2 className="mt-4 text-balance text-center font-display text-[clamp(2rem,3.2vw,3rem)] font-semibold leading-[1.05] tracking-[-0.03em] text-ink-deep">
              {t.formHeading}
            </h2>
            <div className="mt-8">
              <ContactForm t={t} />
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-ground">
        <div className="mx-auto grid max-w-[76rem] items-center gap-10 px-5 py-12 sm:px-8 sm:py-14 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-16 lg:px-10 lg:py-16">
          <Reveal>
            <p className="inline-flex items-center gap-2.5 text-[15px] font-semibold text-ink-deep">
              <span
                role="img"
                aria-label={t.swissFlag}
                className="relative inline-block h-4 w-4 shrink-0 rounded-[2px] bg-[#d52b1e]"
              >
                <span className="absolute left-1/2 top-[3px] h-[10px] w-[3px] -translate-x-1/2 bg-white" />
                <span className="absolute left-[3px] top-1/2 h-[3px] w-[10px] -translate-y-1/2 bg-white" />
              </span>
              {t.officeEyebrow}
            </p>
            <h2 className="mt-4 text-balance font-display text-[clamp(2rem,3.2vw,3rem)] font-semibold leading-[1.05] tracking-[-0.03em] text-ink-deep">
              {t.officeHeading}
            </h2>
            <p className="mt-5 max-w-[48ch] text-[17px] leading-[1.7] text-black/64">
              {t.officeBody}
            </p>
          </Reveal>
          <Reveal delay={0.06}>
            <Image
              src="/images/contact/zurich.svg"
              alt={t.officeImageAlt}
              width={1200}
              height={720}
              className="w-full rounded-media border border-black/10"
            />
          </Reveal>
        </div>
      </section>
    </div>
  );
}
