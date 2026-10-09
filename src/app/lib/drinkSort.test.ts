import { describe, expect, it } from 'vitest';
import { alphaSort, dateSort, sortDrinks } from './drinkSort';
import type { Drink } from '../types';

function drink(overrides: Partial<Drink> & Pick<Drink, 'title' | 'path'>): Drink {
  return {
    glass: 'coupe',
    tags: [],
    ingredients: [],
    ...overrides,
  };
}

describe('alphaSort', () => {
  it('should sort titles case-insensitively', () => {
    const drinks = [
      drink({ title: 'zombie', path: '/z' }),
      drink({ title: 'Aviation', path: '/a' }),
      drink({ title: 'negroni', path: '/n' }),
    ];

    expect(sortDrinks(drinks, 'name').map((d) => d.title)).toEqual([
      'Aviation',
      'negroni',
      'zombie',
    ]);
  });

  it('should treat equal titles as equal', () => {
    expect(
      alphaSort(
        drink({ title: 'Negroni', path: '/a' }),
        drink({ title: 'negroni', path: '/b' }),
      ),
    ).toBe(0);
  });
});

describe('dateSort', () => {
  it('should sort newest first', () => {
    const drinks = [
      drink({ title: 'Old', path: '/old', date: '2020-01-01' }),
      drink({ title: 'New', path: '/new', date: '2024-06-01' }),
      drink({ title: 'Mid', path: '/mid', date: '2022-03-15' }),
    ];

    expect(sortDrinks(drinks, 'date').map((d) => d.path)).toEqual([
      '/new',
      '/mid',
      '/old',
    ]);
  });

  it('should treat missing dates as the epoch', () => {
    expect(
      dateSort(
        drink({ title: 'Dated', path: '/d', date: '2020-01-01' }),
        drink({ title: 'Undated', path: '/u' }),
      ),
    ).toBe(-1);
  });
});

describe('sortDrinks', () => {
  it('should not mutate the original array', () => {
    const drinks = [
      drink({ title: 'B', path: '/b' }),
      drink({ title: 'A', path: '/a' }),
    ];
    const originalOrder = drinks.map((d) => d.path);

    sortDrinks(drinks, 'name');

    expect(drinks.map((d) => d.path)).toEqual(originalOrder);
  });
});
