import {
  AMARO_TAGS,
  CITRUS_TAGS,
  LIQUEUR_TAGS,
  SPIRIT_TAGS,
  SYRUP_TAGS,
  VERMOUTH_TAGS,
  getTagKind,
  type TagKind,
} from './tagTaxonomy';

const BAR_TAG_KINDS = new Set<TagKind>([
  'spirit',
  'amaro',
  'liqueur',
  'vermouth',
  'syrup',
  'citrus',
]);

/** Taxonomy citrus kept for Help Me Decide / tags; omitted from the bar UI. */
const BAR_EXCLUDED_TAGS = new Set(['meyer-lemon']);

export const DEFAULT_BAR = ['lemon', 'lime'] as const;

/**
 * Subtype → base spirit. Owning a subtype satisfies a drink that only requires
 * the parent; owning only the parent does not satisfy a subtype requirement.
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

export interface BarCatalogGroup {
  id: string;
  label: string;
  tags: readonly string[];
}

export const BAR_CATALOG: BarCatalogGroup[] = [
  { id: 'spirits', label: 'Spirits', tags: SPIRIT_TAGS },
  { id: 'amaro', label: 'Amaro', tags: AMARO_TAGS },
  { id: 'liqueurs', label: 'Liqueurs', tags: LIQUEUR_TAGS },
  { id: 'vermouth', label: 'Vermouth', tags: VERMOUTH_TAGS },
  { id: 'syrups', label: 'Syrups', tags: SYRUP_TAGS },
  {
    id: 'citrus',
    label: 'Citrus',
    tags: CITRUS_TAGS.filter((tag) => !BAR_EXCLUDED_TAGS.has(tag)),
  },
];

export function formatBarLabel(tag: string): string {
  return tag
    .split('-')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');
}

export function getRequiredBarTags(tags: string[] | undefined): string[] {
  if (!tags?.length) {
    return [];
  }
  return tags.filter(
    (tag) =>
      BAR_TAG_KINDS.has(getTagKind(tag)) && !BAR_EXCLUDED_TAGS.has(tag),
  );
}

function coversTag(required: string, owned: Set<string>): boolean {
  if (owned.has(required)) {
    return true;
  }
  for (const tag of owned) {
    if (SPIRIT_PARENTS[tag] === required) {
      return true;
    }
  }
  return false;
}

export function canMakeDrink(
  drink: { tags: string[] },
  owned: Iterable<string>,
): boolean {
  const required = getRequiredBarTags(drink.tags);
  if (required.length === 0) {
    return false;
  }
  const ownedSet = owned instanceof Set ? owned : new Set(owned);
  return required.every((tag) => coversTag(tag, ownedSet));
}

export function filterMakeableDrinks<T extends { tags: string[] }>(
  drinks: T[],
  owned: Iterable<string>,
): T[] {
  const ownedSet = owned instanceof Set ? owned : new Set(owned);
  return drinks.filter((drink) => canMakeDrink(drink, ownedSet));
}
