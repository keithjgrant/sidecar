import { describe, expect, it } from 'vitest';
import { getRequiredBarTags } from '../features/my-bar/myBarUtils';
import { loadDrinks } from './loadDrinks';

const drinks = loadDrinks();

describe('drink tags', () => {
  it('should have at least one bar-tracked tag', () => {
    // Empty required set → canMakeDrink is always false → drink vanishes
    // when My Bar filtering is on.
    const invalid = drinks.filter(
      (d) => getRequiredBarTags(d.tags).length === 0
    );
    expect(invalid.map((d) => d.file)).toEqual([]);
  });

  it('should comma-separate all tags', () => {
    // e.g. `cinnamon` + `shaken` without a comma → tag "cinnamon shaken",
    // which My Bar ignores (not in the catalog).
    const invalid = drinks
      .map((d) => ({
        file: d.file,
        bad: d.tags.filter((t) => t.includes(' ') || !/^[a-z0-9-]+$/.test(t)),
      }))
      .filter((d) => d.bad.length > 0);

    expect(invalid.map((d) => `${d.file} (${d.bad.join(', ')})`)).toEqual([]);
  });
});
