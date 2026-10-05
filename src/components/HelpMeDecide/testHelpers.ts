import type { DecideDrink } from './types';

export function makeDrink(
  overrides: Partial<DecideDrink> = {},
): DecideDrink {
  return {
    title: overrides.title ?? overrides.path ?? 'Test Drink',
    path: overrides.path ?? '/drinks/test',
    glass: 'coupe',
    tags: [],
    ingredients: ['2 oz spirit', '0.75 oz modifier'],
    ...overrides,
  };
}
