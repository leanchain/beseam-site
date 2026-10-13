import { de } from "./de";
import { en, type Dictionary } from "./en";
import type { Locale } from "./locale-rules.mjs";
import { nl } from "./nl";

const DICTIONARIES: Record<Locale, Dictionary> = { en, de, nl };

export function getDictionary(locale: Locale): Dictionary {
  return DICTIONARIES[locale];
}

export type { Dictionary };
export type { Locale };
