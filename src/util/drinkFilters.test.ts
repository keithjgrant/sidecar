import { describe, expect, it } from 'vitest';
import {
  byBase,
  byFamily,
  filterDrinks,
  type DrinkWithFamily,
} from './drinkFilters';

function drink(
  overrides: Partial<DrinkWithFamily> & Pick<DrinkWithFamily, 'path'>,
): DrinkWithFamily {
  return {
    title: overrides.title ?? overrides.path,
    glass: 'coupe',
    tags: [],
    ingredients: [],
    ...overrides,
  };
}

describe('byBase', () => {
  it('should keep every drink when base is all', () => {
    const drinks = [
      drink({ path: '/a', tags: ['gin'] }),
      drink({ path: '/b', tags: ['whiskey'] }),
    ];
    expect(drinks.filter(byBase('all'))).toHaveLength(2);
  });

  it('should keep drinks tagged with the selected base', () => {
    const drinks = [
      drink({ path: '/gin', tags: ['gin', 'lemon'] }),
      drink({ path: '/rye', tags: ['whiskey', 'rye-whiskey'] }),
    ];
    expect(drinks.filter(byBase('gin')).map((d) => d.path)).toEqual([
      '/gin',
    ]);
  });

  it('should exclude drinks missing the base tag', () => {
    const whiskeyOnly = drink({ path: '/manhattan', tags: ['whiskey'] });
    expect(byBase('gin')(whiskeyOnly)).toBe(false);
  });
});

describe('byFamily', () => {
  it('should keep every drink when family is all', () => {
    const drinks = [
      drink({ path: '/a', family: 'sour' }),
      drink({ path: '/b', family: 'martini' }),
    ];
    expect(drinks.filter(byFamily('all'))).toHaveLength(2);
  });

  it('should keep drinks matching the selected family', () => {
    const drinks = [
      drink({ path: '/daiquiri', family: 'sour' }),
      drink({ path: '/martini', family: 'martini' }),
    ];
    expect(drinks.filter(byFamily('sour')).map((d) => d.path)).toEqual([
      '/daiquiri',
    ]);
  });

  it('should exclude drinks with a different family', () => {
    expect(
      byFamily('martini')(drink({ path: '/old-fashioned', family: 'old fashioned' })),
    ).toBe(false);
  });
});

describe('filterDrinks', () => {
  const drinks = [
    drink({ path: '/negroni', tags: ['gin', 'campari'], family: 'negroni' }),
    drink({ path: '/gin-sour', tags: ['gin', 'lemon'], family: 'sour' }),
    drink({
      path: '/whiskey-sour',
      tags: ['whiskey', 'lemon'],
      family: 'sour',
    }),
    drink({
      path: '/old-fashioned',
      tags: ['whiskey'],
      family: 'old fashioned',
    }),
  ];

  it('should apply base and family filters together', () => {
    expect(
      filterDrinks(drinks, 'gin', 'sour').map((d) => d.path),
    ).toEqual(['/gin-sour']);
  });

  it('should return all drinks when both filters are all', () => {
    expect(filterDrinks(drinks, 'all', 'all')).toHaveLength(4);
  });

  it('should return an empty list when nothing matches', () => {
    expect(filterDrinks(drinks, 'vodka', 'flip')).toEqual([]);
  });

  it('should filter by base alone when family is all', () => {
    expect(
      filterDrinks(drinks, 'whiskey', 'all').map((d) => d.path),
    ).toEqual(['/whiskey-sour', '/old-fashioned']);
  });

  it('should filter by family alone when base is all', () => {
    expect(filterDrinks(drinks, 'all', 'sour').map((d) => d.path)).toEqual([
      '/gin-sour',
      '/whiskey-sour',
    ]);
  });
});
