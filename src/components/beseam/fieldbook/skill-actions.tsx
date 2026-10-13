"use client";

import { useState } from "react";

import { Check, Copy, Download } from "lucide-react";

export default function SkillActions({
  copyText,
  downloadHref,
}: {
  copyText: string;
  downloadHref: string;
}) {
  const [copied, setCopied] = useState(false);
  async function copySkill() {
    try {
      await navigator.clipboard.writeText(copyText);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  }
  return (
    <div className="mt-7 flex flex-wrap gap-3">
      <button
        type="button"
        onClick={copySkill}
        className="inline-flex min-h-11 items-center gap-2 bg-[var(--beseam-technical)] px-4 text-[12px] font-semibold text-white transition-colors hover:bg-[var(--beseam-technical-hover)]"
      >
        {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
        {copied ? "Copied skill" : "Copy skill"}
      </button>
      <a
        href={downloadHref}
        download
        className="rounded-button inline-flex min-h-11 items-center gap-2 border border-black/18 px-4 text-[12px] font-semibold text-[var(--beseam-ink)] transition-colors hover:bg-[var(--beseam-panel)]"
      >
        <Download className="h-4 w-4 text-[var(--beseam-accent)]" />
        Download SKILL.md
      </a>
    </div>
  );
}
