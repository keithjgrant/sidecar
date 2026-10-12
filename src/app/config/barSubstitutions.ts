/** Within a group, owning any member satisfies a requirement for any other member. */
export type SubstitutionGroup = readonly string[];

export type SubstitutionMode = 'none' | 'common' | 'loose';

/**
 * Peer swaps used when Substitution Mode is set to Common (and Loose).
 */
export const COMMON_SUBSTITUTIONS: SubstitutionGroup[] = [
  ['bourbon', 'rye-whiskey'],
  ['cognac', 'brandy'],
  ['orange-liqueur', 'triple-sec', 'curacao', 'dry-curacao'],
  ['rhum-agricole', 'cachaca'],
  ['sweet-vermouth', 'punt-e-mes'],
  ['gin', 'london-dry-gin'],
  ['tequila-blanco', 'tequila-reposado'],
  ['peach-liqueur', 'apricot-liqueur'],
  ['demerara-syrup', 'brown-sugar-syrup'],
];

/**
 * Layered on top of Common when Substitution Mode is set to Loose.
 */
export const LOOSE_SUBSTITUTIONS: SubstitutionGroup[] = [
  ['spiced-rum', 'dark-rum'],
  ['bourbon', 'rye-whiskey', 'irish-whiskey'],
  ['dry-vermouth', 'blanc-vermouth'],
  ['genever-gin', 'old-tom-gin'],
  ['averna', 'cynar', 'amaro-nonino'],
  ['campari', 'aperol'],
  ['ancho-reyes', 'ancho-reyes-verde'],
];

export function getSubstitutionGroups(
  mode: SubstitutionMode
): SubstitutionGroup[] {
  if (mode === 'none') {
    return [];
  }
  if (mode === 'common') {
    return [...COMMON_SUBSTITUTIONS];
  }
  return [...COMMON_SUBSTITUTIONS, ...LOOSE_SUBSTITUTIONS];
}
