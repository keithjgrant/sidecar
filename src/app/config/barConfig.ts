import {
  AMARO_TAGS,
  BASE_SPIRITS,
  CITRUS_TAGS,
  LIQUEUR_TAGS,
  MISC_TAGS,
  SPIRIT_TAGS,
  BITTERS_TAGS,
  SYRUP_TAGS,
  VERMOUTH_TAGS,
} from './tagTaxonomy';

/**
 * Taxonomy tags kept for drinks / Ten Bottle Bar / Help Me Decide, but omitted
 * from My Bar inventory and makeability requirements.
 */
export const BAR_EXCLUDED_TAGS = new Set(['meyer-lemon', 'special-syrup']);

export const DEFAULT_BAR = [] as const;

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

export const BAR_CATALOG: BarCatalogGroup[] = [
  {
    id: 'spirits',
    label: 'Spirits',
    items: buildNestedItems(SPIRIT_TAGS, SPIRIT_PARENTS, BASE_SPIRITS),
  },
  {
    id: 'liqueurs',
    label: 'Liqueurs',
    items: buildNestedItems(LIQUEUR_TAGS, LIQUEUR_PARENTS),
  },
  { id: 'vermouth', label: 'Vermouth', items: flatItems(VERMOUTH_TAGS) },
  { id: 'amaro', label: 'Amaro', items: flatItems(AMARO_TAGS) },
  { id: 'bitters', label: 'Bitters', items: flatItems(BITTERS_TAGS) },
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
    items: flatItems(MISC_TAGS),
  },
];

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
