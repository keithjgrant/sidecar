import type { Drink } from '../types';

export interface DrinkWithFamily extends Drink {
  family?: string;
}

export function byBase(base: string) {
  return (drink: DrinkWithFamily) =>
    base === 'all' || drink.tags.includes(base);
}

export function byFamily(family: string) {
  return (drink: DrinkWithFamily) =>
    family === 'all' || drink.family === family;
}

export function filterDrinks(
  drinks: DrinkWithFamily[],
  base: string,
  family: string,
): DrinkWithFamily[] {
  return drinks.filter(byBase(base)).filter(byFamily(family));
}
