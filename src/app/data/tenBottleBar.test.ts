import { describe, expect, it } from 'vitest';
import { FANCY_SYRUP_TAGS } from '../config/tagTaxonomy';
import { TENTH_BOTTLE_TAGS } from '../config/tenBottleBar';
import { loadDrinks, type DrinkDocument } from './loadDrinks';

const drinks = loadDrinks();

function taggedDrinks(): DrinkDocument[] {
  return drinks.filter((d) => d.tags.includes('ten-bottle-bar'));
}

function vermouthTags(drink: DrinkDocument): string[] {
  return drink.tags.filter((t) => t.endsWith('-vermouth'));
}

function intersectingTags(
  drink: DrinkDocument,
  blocked: readonly string[]
): string[] {
  return drink.tags.filter((t) => (blocked as readonly string[]).includes(t));
}

describe('ten-bottle-bar drink data', () => {
  it('should mark every tagged drink as a tenBottleCandidate', () => {
    const invalid = taggedDrinks().filter((d) => !d.tenBottleCandidate);
    expect(invalid.map((d) => d.file)).toEqual([]);
  });

  it('should not tag drinks that require a tenth bottle', () => {
    const invalid = taggedDrinks()
      .map((d) => ({
        file: d.file,
        blocked: intersectingTags(d, TENTH_BOTTLE_TAGS),
      }))
      .filter((d) => d.blocked.length > 0);

    expect(invalid.map((d) => `${d.file} (${d.blocked.join(', ')})`)).toEqual(
      []
    );
  });

  it('should not tag drinks that require a specialty syrup', () => {
    const invalid = taggedDrinks()
      .map((d) => ({
        file: d.file,
        blocked: intersectingTags(d, FANCY_SYRUP_TAGS),
      }))
      .filter((d) => d.blocked.length > 0);

    expect(invalid.map((d) => `${d.file} (${d.blocked.join(', ')})`)).toEqual(
      []
    );
  });

  it('should not tag drinks with more than one vermouth style', () => {
    const invalid = taggedDrinks()
      .map((d) => ({ file: d.file, vermouth: vermouthTags(d) }))
      .filter((d) => d.vermouth.length > 1);

    expect(invalid.map((d) => `${d.file} (${d.vermouth.join(', ')})`)).toEqual(
      []
    );
  });
});
