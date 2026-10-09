import type { Drink } from '../types';

export function alphaSort(a: Drink, b: Drink): number {
  const titleA = a.title.toLowerCase();
  const titleB = b.title.toLowerCase();
  if (titleA < titleB) {
    return -1;
  }
  if (titleA > titleB) {
    return 1;
  }
  return 0;
}

export function dateSort(a: Drink, b: Drink): number {
  const aDate = new Date(a.date ?? 0);
  const bDate = new Date(b.date ?? 0);
  if (aDate < bDate) {
    return 1;
  }
  if (aDate > bDate) {
    return -1;
  }
  return 0;
}

export function sortDrinks(drinks: Drink[], sortBy: string): Drink[] {
  const sorted = [...drinks];
  return sortBy === 'date' ? sorted.sort(dateSort) : sorted.sort(alphaSort);
}
