/**
 * Optional "tenth bottle" tags gated by the Ten Bottle Bar selector.
 */
export const TENTH_BOTTLE_TAGS = [
  'absinthe',
  'aged-rum',
  'apple-brandy',
  'benedictine',
  'campari',
  'cynar',
  'elderflower-liqueur',
  'genever-gin',
  'green-chartreuse',
  'maraschino-liqueur',
  'mezcal',
  'vodka',
] as const;

export type TenthBottleTag = (typeof TENTH_BOTTLE_TAGS)[number];
