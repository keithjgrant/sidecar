import { describe, expect, it } from 'vitest';
import { loadDrinks } from './loadDrinks';

const drinks = loadDrinks();

describe('loadDrinks', () => {
  it('should load every drink markdown file', () => {
    expect(drinks.length).toBeGreaterThan(100);
  });

  it('should give every drink a title, path, and tags array', () => {
    const invalid = drinks.filter(
      (d) =>
        !d.title || !d.path.startsWith('/drinks/') || !Array.isArray(d.tags),
    );
    expect(invalid.map((d) => d.file)).toEqual([]);
  });
});
