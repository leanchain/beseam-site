import type { Locale } from "./locale-rules.mjs";
import { de } from "./de";
import { en, type Dictionary } from "./en";

const DICTIONARIES: Record<Locale, Dictionary> = { en, de };

export function getDictionary(locale: Locale): Dictionary {
  return DICTIONARIES[locale];
}

export type { Dictionary };
export type { Locale };
