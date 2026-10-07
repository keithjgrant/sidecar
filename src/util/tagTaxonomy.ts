/** Base spirit tags used by Explore filters (and related UI). */
export const BASE_SPIRITS = [
  'brandy',
  'gin',
  'mezcal',
  'rum',
  'tequila',
  'vodka',
  'whiskey',
] as const;

/** Primary citrus ingredient tags. */
export const CITRUS_TAGS = ['lemon', 'lime', 'grapefruit', 'orange'] as const;

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
