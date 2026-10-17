/** Base spirit tags used by Explore drink filters. */
export const BASE_SPIRITS = [
  'brandy',
  'gin',
  'mezcal',
  'rum',
  'tequila',
  'vodka',
  'whiskey',
] as const;

/**
 * All spirit tags for tag-kind classification (bases + subtypes).
 * Explore drink filters still use BASE_SPIRITS only.
 */
export const SPIRIT_TAGS = [
  ...BASE_SPIRITS,
  'absinthe',
  'aged-rum',
  'apple-brandy',
  'bourbon',
  'cachaca',
  'cognac',
  'dark-rum',
  'genever-gin',
  'irish-whiskey',
  'london-dry-gin',
  'old-tom-gin',
  'plymouth-gin',
  'rhum-agricole',
  'rye-whiskey',
  'scotch',
  'spiced-rum',
  'tequila-blanco',
  'tequila-reposado',
  'white-rum',
] as const;

/** Bitter aperitif / amaro ingredient tags. */
export const AMARO_TAGS = [
  'amaro-nonino',
  'aperol',
  'averna',
  'bruto-americano',
  'campari',
  'cynar',
  'fernet',
  'suze',
] as const;

/** Liqueur / cordial modifier tags (excluding amaro). */
export const LIQUEUR_TAGS = [
  'amaretto',
  'ancho-reyes',
  'ancho-reyes-verde',
  'apricot-liqueur',
  'benedictine',
  'coffee-liqueur',
  'creme-de-cacao',
  'creme-de-mure',
  'curacao',
  'drambuie',
  'dry-curacao',
  'elderflower-liqueur',
  'green-chartreuse',
  'maraschino',
  'orange-liqueur',
  'peach-liqueur',
  'sloe-gin',
  'triple-sec',
] as const;

/** Vermouth and related aromatized-wine tags. */
export const VERMOUTH_TAGS = [
  'blanc-vermouth',
  'dry-vermouth',
  'punt-e-mes',
  'sweet-vermouth',
] as const;

export const BITTERS_TAGS = [
  'angostura-bitters',
  'orange-bitters',
  'peychaud-bitters',
  'absinthe-bitters',
  'barrel-aged-bitters',
  'black-walnut-bitters',
  'chocolate-bitters',
  'mole-bitters',
  'pecan-bitters',
  'rosemary-bitters',
];

export const MISC_TAGS = [
  'red-wine',
  'sparkling-wine',
  'tonic-water',
  'cream',
  'milk',
  'egg',
] as const;

/**
 * Pantry-staple sweeteners. Not gated by Ten Bottle Bar's specialty-syrups
 * checkbox (simple syrup / agave are untagged; these are the tagged staples).
 */
export const BASIC_SYRUP_TAGS = [
  'brown-sugar-syrup',
  'demerara-syrup',
] as const;

/**
 * Specialty / homemade syrups. Used by Ten Bottle Bar to hide drinks unless
 * "Specialty syrups" is checked. Flavor-named tags stand in for syrups for now
 * (every use today is via that syrup); split later if non-syrup uses appear.
 */
export const FANCY_SYRUP_TAGS = [
  'agave',
  'burnt-sugar-syrup',
  'butter-syrup',
  'ipa-syrup',
  'grenadine',
  'jalapeno-syrup',
  'maple-syrup',
  'muscovado-syrup',
  'orgeat',
  'special-syrup',
  'vanilla-syrup',
  // flavor stand-ins
  'black-pepper',
  'ginger',
  'honey',
] as const;

/** Syrup and sweetener tags (staples + specialty). */
export const SYRUP_TAGS = [...BASIC_SYRUP_TAGS, ...FANCY_SYRUP_TAGS] as const;

/** Taste / flavor-profile tags (not occasion or drink-family labels). */
export const FLAVOR_TAGS = [
  'bitter',
  'bright',
  'fruity',
  'herbal',
  'hot',
  'refreshing',
  'smoky',
  'spicy',
  'sweet',
] as const;

/** Primary citrus ingredient tags. */
export const CITRUS_TAGS = [
  'lemon',
  'lime',
  'grapefruit',
  'orange',
  'meyer-lemon',
] as const;

/** Prep / technique tags (matches drink frontmatter convention). */
export const TECHNIQUE_TAGS = [
  'stirred',
  'shaken',
  'built',
  'muddled',
] as const;

/**
 * Order used when choosing a single prep-method label for a drink that may
 * have more than one technique tag.
 */
export const PREP_METHOD_PRIORITY = ['shaken', 'stirred', 'built'] as const;

/**
 * Ordered tag-kind labels for classification.
 * Wine bottles live under MISC_TAGS / `other`, not a dedicated kind.
 */
export const TAG_KINDS = [
  'spirit',
  'amaro',
  'liqueur',
  'vermouth',
  'syrup',
  'citrus',
  'bitters',
  'flavor',
  'technique',
  'other',
] as const;

export type TagKind = (typeof TAG_KINDS)[number];

const SPIRIT_SET = new Set<string>(SPIRIT_TAGS);
const AMARO_SET = new Set<string>(AMARO_TAGS);
const LIQUEUR_SET = new Set<string>(LIQUEUR_TAGS);
const VERMOUTH_SET = new Set<string>(VERMOUTH_TAGS);
const SYRUP_SET = new Set<string>(SYRUP_TAGS);
const CITRUS_SET = new Set<string>(CITRUS_TAGS);
const BITTERS_SET = new Set<string>(BITTERS_TAGS);
const FLAVOR_SET = new Set<string>(FLAVOR_TAGS);
const TECHNIQUE_SET = new Set<string>(TECHNIQUE_TAGS);

export function getTagKind(tag: string): TagKind {
  if (SPIRIT_SET.has(tag)) {
    return 'spirit';
  }
  if (AMARO_SET.has(tag)) {
    return 'amaro';
  }
  if (LIQUEUR_SET.has(tag)) {
    return 'liqueur';
  }
  if (VERMOUTH_SET.has(tag)) {
    return 'vermouth';
  }
  if (SYRUP_SET.has(tag)) {
    return 'syrup';
  }
  if (CITRUS_SET.has(tag)) {
    return 'citrus';
  }
  if (BITTERS_SET.has(tag)) {
    return 'bitters';
  }
  if (FLAVOR_SET.has(tag)) {
    return 'flavor';
  }
  if (TECHNIQUE_SET.has(tag)) {
    return 'technique';
  }
  return 'other';
}
