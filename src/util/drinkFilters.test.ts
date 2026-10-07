import { describe, expect, it } from 'vitest';
import {
  byBase,
  byFamily,
  byQuery,
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

describe('byQuery', () => {
  it('should keep every drink when query is empty or whitespace', () => {
    const drinks = [
      drink({ path: '/a', title: 'Negroni' }),
      drink({ path: '/b', title: 'Martini' }),
    ];
    expect(drinks.filter(byQuery(''))).toHaveLength(2);
    expect(drinks.filter(byQuery('   '))).toHaveLength(2);
  });

  it('should keep drinks whose title contains the query case-insensitively', () => {
    const drinks = [
      drink({ path: '/negroni', title: 'Negroni' }),
      drink({ path: '/white-negroni', title: 'White Negroni' }),
      drink({ path: '/martini', title: 'Martini' }),
    ];
    expect(drinks.filter(byQuery('negr')).map((d) => d.path)).toEqual([
      '/negroni',
      '/white-negroni',
    ]);
  });

  it('should exclude drinks whose title does not match', () => {
    expect(byQuery('sour')(drink({ path: '/martini', title: 'Martini' }))).toBe(
      false,
    );
  });
});

describe('filterDrinks', () => {
  const drinks = [
    drink({
      path: '/negroni',
      title: 'Negroni',
      tags: ['gin', 'campari'],
      family: 'negroni',
    }),
    drink({
      path: '/gin-sour',
      title: 'Gin Sour',
      tags: ['gin', 'lemon'],
      family: 'sour',
    }),
    drink({
      path: '/whiskey-sour',
      title: 'Whiskey Sour',
      tags: ['whiskey', 'lemon'],
      family: 'sour',
    }),
    drink({
      path: '/old-fashioned',
      title: 'Old Fashioned',
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

  it('should filter by query alone when base and family are all', () => {
    expect(
      filterDrinks(drinks, 'all', 'all', 'negr').map((d) => d.path),
    ).toEqual(['/negroni']);
  });

  it('should apply search query together with base', () => {
    expect(
      filterDrinks(drinks, 'whiskey', 'all', 'sour').map((d) => d.path),
    ).toEqual(['/whiskey-sour']);
  });

  it('should apply search query together with family', () => {
    expect(
      filterDrinks(drinks, 'all', 'sour', 'gin').map((d) => d.path),
    ).toEqual(['/gin-sour']);
  });

  it('should apply base, family, and query together', () => {
    expect(
      filterDrinks(drinks, 'gin', 'sour', 'sour').map((d) => d.path),
    ).toEqual(['/gin-sour']);
  });

  it('should return an empty list when query excludes base and family matches', () => {
    expect(filterDrinks(drinks, 'gin', 'sour', 'whiskey')).toEqual([]);
  });
});
