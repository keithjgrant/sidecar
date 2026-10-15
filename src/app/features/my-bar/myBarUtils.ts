import {
  BAR_CATALOG,
  BAR_LABEL_OVERRIDES,
  BAR_PARENTS,
  type BarCatalogGroup,
} from '../../config/barConfig';
import {
  ASSUMED_SUBSTITUTION_STAPLES,
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

/** Owned tags plus untracked pantry staples used only as substitution peers. */
function withAssumedStaples(owned: Iterable<string>): Set<string> {
  return new Set([...owned, ...ASSUMED_SUBSTITUTION_STAPLES]);
}

function peersFor(
  tag: string,
  mode: SubstitutionMode
): ReadonlySet<string> | null {
  const peers = new Set<string>();
  for (const group of getSubstitutionGroups(mode)) {
    if (!group.includes(tag)) {
      continue;
    }
    for (const member of group) {
      peers.add(member);
    }
  }
  return peers.size > 0 ? peers : null;
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

/** Owned bottle(s) standing in for a drink’s required bar tag. */
export type ActiveSubstitution = {
  /** Tag the drink asks for (missing from the bar). */
  required: string;
  /** Owned tags that cover `required` via parent/child or peer swap. */
  using: string[];
};

function ownedPeerStandIns(
  required: string,
  owned: Set<string>,
  mode: SubstitutionMode
): string[] {
  const peers = peersFor(required, mode);
  if (!peers) {
    return [];
  }
  return [...owned].filter((tag) => peers.has(tag) && tag !== required);
}

/**
 * Peer stand-ins for display. In forgiving mode, prefer common peers when any
 * are owned; only fall back to the full forgiving set when necessary.
 */
function preferredPeerStandIns(
  required: string,
  owned: Set<string>,
  mode: SubstitutionMode
): string[] {
  if (mode === 'none') {
    return [];
  }
  if (mode === 'common') {
    return ownedPeerStandIns(required, owned, 'common');
  }
  const common = ownedPeerStandIns(required, owned, 'common');
  if (common.length > 0) {
    return common;
  }
  return ownedPeerStandIns(required, owned, 'forgiving');
}

/**
 * For each required bar tag the user does not own exactly, list owned bottles
 * that cover it (subtype→parent, or peer substitution for the given mode).
 * Multiple stand-ins for the same required tag are grouped into one entry.
 */
export function getDrinkSubstitutions(
  drinkTags: string[] | undefined,
  owned: Iterable<string>,
  substitutions: SubstitutionMode = 'common'
): ActiveSubstitution[] {
  const required = getRequiredBarTags(drinkTags);
  const ownedSet = withAssumedStaples(owned);
  const results: ActiveSubstitution[] = [];

  for (const req of required) {
    if (ownedSet.has(req)) {
      continue;
    }

    const using: string[] = [];
    const seen = new Set<string>();

    for (const tag of ownedSet) {
      if (BAR_PARENTS[tag] === req && !seen.has(tag)) {
        seen.add(tag);
        using.push(tag);
      }
    }

    for (const tag of preferredPeerStandIns(req, ownedSet, substitutions)) {
      if (!seen.has(tag)) {
        seen.add(tag);
        using.push(tag);
      }
    }

    if (using.length > 0) {
      results.push({ required: req, using });
    }
  }

  return results;
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
  const ownedSet = withAssumedStaples(owned);
  return required.every((tag) => coversTag(tag, ownedSet, substitutions));
}

export function filterMakeableDrinks<T extends { tags: string[] }>(
  drinks: T[],
  owned: Iterable<string>,
  substitutions: SubstitutionMode = 'common'
): T[] {
  return drinks.filter((drink) =>
    canMakeDrink(drink, owned, substitutions)
  );
}
