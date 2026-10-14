import {
  BAR_CATALOG,
  BAR_LABEL_OVERRIDES,
  BAR_PARENTS,
  type BarCatalogGroup,
} from '../../config/barConfig';
import {
  getSubstitutionGroups,
  type SubstitutionMode,
} from '../../config/barSubstitutions';

/** Flatten a catalog group to every selectable tag (parents + children). */
export function getGroupTags(group: BarCatalogGroup): string[] {
  const tags: string[] = [];
  for (const item of group.items) {
    tags.push(item.tag);
    if (item.children?.length) {
      tags.push(...item.children);
    }
  }
  return tags;
}

export function getAllBarTags(): string[] {
  return BAR_CATALOG.flatMap(getGroupTags);
}

export function countOwnedInGroup(
  group: BarCatalogGroup,
  owned: Iterable<string>
): number {
  const ownedSet = owned instanceof Set ? owned : new Set(owned);
  return getGroupTags(group).filter((tag) => ownedSet.has(tag)).length;
}

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

/** Query param for a one-off unfiltered list view (does not change settings). */
export const UNFILTERED_PARAM = 'unfiltered';

/**
 * Resolve whether My Bar filtering applies, accounting for a one-off
 * unfiltered view (e.g. `?unfiltered=1`) that does not change settings.
 */
export function resolveBarFilterState(
  filterEnabled: boolean,
  unfilteredView: boolean
): { isFiltering: boolean; isUnfilteredView: boolean } {
  return {
    isFiltering: filterEnabled && !unfilteredView,
    isUnfilteredView: filterEnabled && unfilteredView,
  };
}

export function getRequiredBarTags(tags: string[] | undefined): string[] {
  if (!tags?.length) {
    return [];
  }
  const tracked = new Set(getAllBarTags());
  const required = tags.filter((tag) => tracked.has(tag));
  return normalizeRequiredTags(required);
}

/**
 * Drop a parent requirement when a child of that parent is also required
 * (e.g. cognac + brandy → cognac only).
 */
export function normalizeRequiredTags(required: string[]): string[] {
  const requiredSet = new Set(required);
  return required.filter((tag) => {
    for (const other of requiredSet) {
      if (other !== tag && BAR_PARENTS[other] === tag) {
        return false;
      }
    }
    return true;
  });
}

function peersFor(
  tag: string,
  mode: SubstitutionMode
): ReadonlySet<string> | null {
  for (const group of getSubstitutionGroups(mode)) {
    if (group.includes(tag)) {
      return new Set(group);
    }
  }
  return null;
}

function coversTag(
  required: string,
  owned: Set<string>,
  mode: SubstitutionMode
): boolean {
  if (owned.has(required)) {
    return true;
  }
  for (const tag of owned) {
    if (BAR_PARENTS[tag] === required) {
      return true;
    }
  }
  const peers = peersFor(required, mode);
  if (peers) {
    for (const tag of owned) {
      if (peers.has(tag)) {
        return true;
      }
    }
  }
  return false;
}

export function canMakeDrink(
  drink: { tags: string[] },
  owned: Iterable<string>,
  substitutions: SubstitutionMode = 'common'
): boolean {
  const required = getRequiredBarTags(drink.tags);
  if (required.length === 0) {
    return false;
  }
  const ownedSet = owned instanceof Set ? owned : new Set(owned);
  return required.every((tag) => coversTag(tag, ownedSet, substitutions));
}

export function filterMakeableDrinks<T extends { tags: string[] }>(
  drinks: T[],
  owned: Iterable<string>,
  substitutions: SubstitutionMode = 'common'
): T[] {
  const ownedSet = owned instanceof Set ? owned : new Set(owned);
  return drinks.filter((drink) => canMakeDrink(drink, ownedSet, substitutions));
}
