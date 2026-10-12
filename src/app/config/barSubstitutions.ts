/** Within a group, owning any member satisfies a requirement for any other member. */
export type SubstitutionGroup = readonly string[];

export type SubstitutionMode = 'none' | 'common' | 'loose';

/**
 * Peer swaps used when Substitutions is set to Common (and Loose).
 * Tune per spirit family as recipes demand.
 */
export const COMMON_SUBSTITUTIONS: SubstitutionGroup[] = [
  ['bourbon', 'rye-whiskey'],
  ['cognac', 'brandy', 'apple-brandy'],
  ['orange-liqueur', 'triple-sec', 'curacao', 'dry-curacao'],
  ['rhum-agricole', 'cachaca'],
];

/**
 * Broader peer swaps layered on top of Common when Substitutions is Loose.
 * Left sparse until per-spirit rules are decided.
 */
export const LOOSE_SUBSTITUTIONS: SubstitutionGroup[] = [];

export function getSubstitutionGroups(
  mode: SubstitutionMode,
): SubstitutionGroup[] {
  if (mode === 'none') {
    return [];
  }
  if (mode === 'common') {
    return [...COMMON_SUBSTITUTIONS];
  }
  return [...COMMON_SUBSTITUTIONS, ...LOOSE_SUBSTITUTIONS];
}
