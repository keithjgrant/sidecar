/**
 * Display overrides for tags whose title-cased slug is wrong (accents,
 * brand casing, acronyms). Unlisted tags fall through to title case.
 */
export const BAR_LABEL_OVERRIDES: Record<string, string> = {
  'angostura-bitters': 'Angostura/aromatic Bitters',
  benedictine: 'Bénédictine',
  'black-pepper': 'Black Pepper Syrup',
  cachaca: 'Cachaça',
  'creme-de-cacao': 'Crème de Cacao',
  'creme-de-mure': 'Crème de Mûre',
  curacao: 'Curaçao',
  'dry-curacao': 'Dry Curaçao',
  egg: 'Egg (or aquafaba)',
  ginger: 'Ginger Syrup',
  'green-chartreuse': 'Green Chartreuse (or substitute)',
  honey: 'Honey Syrup',
  'ipa-syrup': 'IPA Syrup',
  'jalapeno-syrup': 'Jalapeño Syrup',
  'punt-e-mes': 'Punt e Mes',
};

/** Format a tag slug for display (overrides, else title case). */
export function formatBarLabel(tag: string): string {
  const override = BAR_LABEL_OVERRIDES[tag];
  if (override) {
    return override;
  }
  return tag
    .split('-')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');
}
