import { describe, expect, it } from 'vitest';
import { doListsIntersect, hasIngredientsContaining } from './util';

describe('doListsIntersect', () => {
  it('should return true when lists share an element', () => {
    expect(doListsIntersect(['campari', 'gin'], ['campari', 'vodka'])).toBe(
      true,
    );
  });

  it('should return false when lists have no common elements', () => {
    expect(doListsIntersect(['bourbon', 'rye'], ['gin', 'vodka'])).toBe(false);
  });

  it('should return false when either list is empty', () => {
    expect(doListsIntersect([], ['gin'])).toBe(false);
    expect(doListsIntersect(['gin'], [])).toBe(false);
  });
});

describe('hasIngredientsContaining', () => {
  it('should match case-insensitively on partial ingredient names', () => {
    expect(
      hasIngredientsContaining(
        ['2 oz Bourbon', '0.5 oz Sweet Vermouth'],
        ['bourbon'],
      ),
    ).toBe(true);
  });

  it('should return true if any search term matches any ingredient', () => {
    expect(
      hasIngredientsContaining(['1 oz Gin', '0.75 oz Lemon juice'], [
        'lime',
        'lemon',
      ]),
    ).toBe(true);
  });

  it('should return false when no ingredients match', () => {
    expect(
      hasIngredientsContaining(['2 oz Mezcal', '0.5 oz Agave'], ['lemon']),
    ).toBe(false);
  });

  it('should return false for undefined or non-array ingredients', () => {
    expect(hasIngredientsContaining(undefined, ['gin'])).toBe(false);
  });
});
