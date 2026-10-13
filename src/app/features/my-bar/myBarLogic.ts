import {
  getSubstitutionGroups,
  type SubstitutionMode,
} from '../../config/barSubstitutions';
import {
  AMARO_TAGS,
  BASE_SPIRITS,
  CITRUS_TAGS,
  LIQUEUR_TAGS,
  MIXER_TAGS,
  SPIRIT_TAGS,
  SYRUP_TAGS,
  VERMOUTH_TAGS,
  WINE_TAGS,
} from '../../config/tagTaxonomy';

/**
 * Taxonomy tags kept for drinks / Ten Bottle Bar / Help Me Decide, but omitted
 * from My Bar inventory and makeability requirements.
 */
const BAR_EXCLUDED_TAGS = new Set(['meyer-lemon', 'special-syrup']);

export const DEFAULT_BAR = ['lemon', 'lime'] as const;

/**
 * Subtype → parent. Owning a subtype satisfies a drink that only requires the
 * parent; owning only the parent does not satisfy a subtype requirement.
 */
export const SPIRIT_PARENTS: Record<string, string> = {
  bourbon: 'whiskey',
  'rye-whiskey': 'whiskey',
  scotch: 'whiskey',
  'irish-whiskey': 'whiskey',
  'genever-gin': 'gin',
  'london-dry-gin': 'gin',
  'old-tom-gin': 'gin',
  'plymouth-gin': 'gin',
  'aged-rum': 'rum',
  'dark-rum': 'rum',
  'spiced-rum': 'rum',
  'white-rum': 'rum',
  'rhum-agricole': 'rum',
  cachaca: 'rum',
  'tequila-blanco': 'tequila',
  'tequila-reposado': 'tequila',
  cognac: 'brandy',
  'apple-brandy': 'brandy',
};

const LIQUEUR_PARENTS: Record<string, string> = {
  'triple-sec': 'orange-liqueur',
  curacao: 'orange-liqueur',
  'dry-curacao': 'orange-liqueur',
};

/** All bar parent maps (spirits + liqueurs) used for nesting and matching. */
export const BAR_PARENTS: Record<string, string> = {
  ...SPIRIT_PARENTS,
  ...LIQUEUR_PARENTS,
};

export interface BarCatalogItem {
  tag: string;
  children?: readonly string[];
}

export interface BarCatalogGroup {
  id: string;
  label: string;
  items: readonly BarCatalogItem[];
}

function flatItems(tags: readonly string[]): BarCatalogItem[] {
  return tags.map((tag) => ({ tag }));
}

/**
 * Nest child tags under their parents. `preferredTopLevel` pins parent order
 * (e.g. base spirits first); remaining top-level tags follow `allTags` order.
 */
function buildNestedItems(
  allTags: readonly string[],
  parents: Record<string, string>,
  preferredTopLevel: readonly string[] = []
): BarCatalogItem[] {
  const tagSet = new Set<string>(allTags);
  const order = new Map<string, number>(
    allTags.map((tag, index) => [tag, index])
  );
  const childrenByParent = new Map<string, string[]>();

  for (const [child, parent] of Object.entries(parents)) {
    if (!tagSet.has(child) || !tagSet.has(parent)) {
      continue;
    }
    const list = childrenByParent.get(parent) ?? [];
    list.push(child);
    childrenByParent.set(parent, list);
  }

  for (const children of childrenByParent.values()) {
    children.sort((a, b) => (order.get(a) ?? 0) - (order.get(b) ?? 0));
  }

  const childTags = new Set(
    Object.keys(parents).filter((child) => tagSet.has(child))
  );
  const preferredSet = new Set<string>(preferredTopLevel);
  const topLevelOrder = [
    ...preferredTopLevel.filter((tag) => tagSet.has(tag)),
    ...allTags.filter((tag) => !preferredSet.has(tag) && !childTags.has(tag)),
  ];

  const items: BarCatalogItem[] = [];
  for (const tag of topLevelOrder) {
    if (childTags.has(tag)) {
      continue;
    }
    const children = childrenByParent.get(tag);
    items.push(children?.length ? { tag, children } : { tag });
  }
  return items;
}

export const BAR_CATALOG: BarCatalogGroup[] = [
  {
    id: 'spirits',
    label: 'Spirits',
    items: buildNestedItems(SPIRIT_TAGS, SPIRIT_PARENTS, BASE_SPIRITS),
  },
  { id: 'vermouth', label: 'Vermouth', items: flatItems(VERMOUTH_TAGS) },
  {
    id: 'liqueurs',
    label: 'Liqueurs',
    items: buildNestedItems(LIQUEUR_TAGS, LIQUEUR_PARENTS),
  },
  { id: 'amaro', label: 'Amaro', items: flatItems(AMARO_TAGS) },
  {
    id: 'syrups',
    label: 'Syrups',
    items: flatItems(SYRUP_TAGS.filter((tag) => !BAR_EXCLUDED_TAGS.has(tag))),
  },
  {
    id: 'citrus',
    label: 'Citrus',
    items: flatItems(CITRUS_TAGS.filter((tag) => !BAR_EXCLUDED_TAGS.has(tag))),
  },
  {
    id: 'misc',
    label: 'Miscellaneous',
    items: flatItems([...WINE_TAGS, ...MIXER_TAGS]),
  },
];

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

/**
 * Display overrides for tags whose title-cased slug is wrong (accents,
 * brand casing, acronyms). Unlisted tags fall through to title case.
 */
export const BAR_LABEL_OVERRIDES: Record<string, string> = {
  benedictine: 'Bénédictine',
  cachaca: 'Cachaça',
  'creme-de-cacao': 'Crème de Cacao',
  'creme-de-mure': 'Crème de Mûre',
  curacao: 'Curaçao',
  'dry-curacao': 'Dry Curaçao',
  'ipa-syrup': 'IPA Syrup',
  'jalapeno-syrup': 'Jalapeño Syrup',
  'punt-e-mes': 'Punt e Mes',
  'green-chartreuse': 'Green Chartreuse (or substitute)',
};

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

export function isBarConfigured(owned: Iterable<string>): boolean {
  const defaults = new Set<string>(DEFAULT_BAR);
  for (const tag of owned) {
    if (!defaults.has(tag)) {
      return true;
    }
  }
  return false;
}

export function shouldFilterByBar(
  filterEnabled: boolean,
  owned: Iterable<string>
): boolean {
  return filterEnabled && isBarConfigured(owned);
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
