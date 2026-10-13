import { Fragment, type ReactNode } from "react";

import Link from "next/link";

import { localizedPath, type Locale } from "@/i18n/locale-rules.mjs";

/**
 * Renders the blog's inline markup: `[label](href)` links and `**bold**`.
 * Internal links use Next's Link and stay in the reader's language;
 * external links open in a new tab.
 */
export default function BlogText({
  text,
  locale = "en",
}: {
  text: string;
  locale?: Locale;
}) {
  const parts: ReactNode[] = [];
  const pattern = /\[([^\]]+)\]\(([^)]+)\)|\*\*([^*]+)\*\*|`([^`]+)`/g;
  let last = 0;
  let match: RegExpExecArray | null;
  while ((match = pattern.exec(text))) {
    if (match.index > last) parts.push(text.slice(last, match.index));
    const [, label, href, bold, code] = match;
    if (label && href) {
      parts.push(
        href.startsWith("/") ? (
          <Link
            key={match.index}
            href={localizedPath(href, locale)}
            className="font-semibold text-ink-deep underline decoration-signal decoration-2 underline-offset-4 hover:decoration-ink-deep"
          >
            {label}
          </Link>
        ) : (
          <a
            key={match.index}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-ink-deep underline decoration-signal decoration-2 underline-offset-4 hover:decoration-ink-deep"
          >
            {label}
          </a>
        ),
      );
    } else if (bold) {
      parts.push(
        <strong key={match.index} className="font-semibold text-ink-deep">
          {bold}
        </strong>,
      );
    } else if (code) {
      parts.push(
        <code
          key={match.index}
          className="rounded-[4px] bg-black/[0.06] px-1.5 py-0.5 text-[0.9em] text-ink-deep [overflow-wrap:anywhere]"
        >
          {code}
        </code>,
      );
    }
    last = match.index + match[0].length;
  }
  if (last < text.length) parts.push(text.slice(last));
  return (
    <>
      {parts.map((part, i) => (
        <Fragment key={i}>{part}</Fragment>
      ))}
    </>
  );
}
