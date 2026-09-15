export function shouldShowPrimaryCta({
  isHome,
  isScanPage,
  pastHero,
}: {
  isHome: boolean;
  isScanPage: boolean;
  pastHero: boolean;
}): boolean {
  // The scan page earns its activation handoff only after it has a real scan
  // result, where AnswerCheck can carry the normalized domain into registration.
  // A generic navbar registration link would discard that context.
  if (isScanPage) return false;
  return !isHome || pastHero;
}
