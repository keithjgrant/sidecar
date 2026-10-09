import { afterEach, describe, expect, it, vi } from 'vitest';
import getWeightedRandom, { byScore, type ScoredDrink } from './getWeightedRandom';

function drink(overrides: Partial<ScoredDrink> & Pick<ScoredDrink, 'path' | 'score'>): ScoredDrink {
  return {
    title: overrides.path,
    glass: 'coupe',
    tags: [],
    ingredients: [],
    ...overrides,
  };
}

describe('byScore', () => {
  it('should sort higher scores first', () => {
    expect(byScore(drink({ path: '/a', score: 3 }), drink({ path: '/b', score: 5 }))).toBe(1);
    expect(byScore(drink({ path: '/a', score: 5 }), drink({ path: '/b', score: 3 }))).toBe(-1);
    expect(byScore(drink({ path: '/a', score: 3 }), drink({ path: '/b', score: 3 }))).toBe(0);
  });
});

describe('getWeightedRandom', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should return all drinks when the list is smaller than numResults', () => {
    const drinks = [
      drink({ path: '/a', score: 2 }),
      drink({ path: '/b', score: 5 }),
    ];

    const results = getWeightedRandom(drinks, 5);

    expect(results).toHaveLength(2);
    expect(results.map((d) => d.path)).toEqual(['/b', '/a']);
  });

  it('should return unique drinks sorted by score', () => {
    // Alternating low/high random values select different weighted slots
    vi.spyOn(Math, 'random')
      .mockReturnValueOnce(0)
      .mockReturnValueOnce(0.99)
      .mockReturnValue(0.5);

    const drinks = [
      drink({ path: '/low', score: 1 }),
      drink({ path: '/mid', score: 3 }),
      drink({ path: '/high', score: 5 }),
      drink({ path: '/also-low', score: 1 }),
    ];

    const results = getWeightedRandom(drinks, 2);

    expect(results).toHaveLength(2);
    expect(new Set(results.map((d) => d.path)).size).toBe(2);
    expect(results[0].score).toBeGreaterThanOrEqual(results[1].score);
  });

  it('should prefer higher-scored drinks when random values are low', () => {
    vi.spyOn(Math, 'random').mockReturnValue(0);

    const drinks = [
      drink({ path: '/a', score: 10 }),
      drink({ path: '/b', score: 1 }),
      drink({ path: '/c', score: 1 }),
      drink({ path: '/d', score: 1 }),
    ];

    const results = getWeightedRandom(drinks, 1);

    expect(results).toHaveLength(1);
    expect(results[0].path).toBe('/a');
  });
});
