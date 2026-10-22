import { describe, expect, it } from 'vitest';
import { BAR_EXCLUDED_TAGS, BAR_PARENTS } from '../config/barConfig';
import {
  ASSUMED_SUBSTITUTION_STAPLES,
  COMMON_SUBSTITUTIONS,
  FORGIVING_SUBSTITUTIONS,
} from '../config/barSubstitutions';
import { getTagKind, type TagKind } from '../config/tagTaxonomy';
import { getAllBarTags } from '../features/my-bar/myBarUtils';
import { loadDrinks } from './loadDrinks';

const drinks = loadDrinks();
const barTags = new Set(getAllBarTags());

/** Ingredient kinds My Bar tracks — typos here are silently ignored at runtime. */
const BAR_INGREDIENT_KINDS = new Set<TagKind>([
  'spirit',
  'amaro',
  'liqueur',
  'vermouth',
  'syrup',
  'citrus',
  'bitters',
]);

describe('my-bar', () => {
  describe('BAR_CATALOG', () => {
    it('should only use catalogued (or explicitly excluded) ingredient tags', () => {
      // Taxonomy ingredient tags that aren't in BAR_CATALOG are dropped by
      // getRequiredBarTags — the drink looks makeable without that bottle.
      // Flavor / technique / occasion tags ("other") are fine to leave untracked.
      const invalid = drinks
        .map((d) => ({
          file: d.file,
          unknown: d.tags.filter((tag) => {
            if (barTags.has(tag) || BAR_EXCLUDED_TAGS.has(tag)) {
              return false;
            }
            return BAR_INGREDIENT_KINDS.has(getTagKind(tag));
          }),
        }))
        .filter((d) => d.unknown.length > 0);

      expect(invalid.map((d) => `${d.file} (${d.unknown.join(', ')})`)).toEqual(
        []
      );
    });
  });

  describe('my-bar config integrity', () => {
    it('should nest only catalog tags in BAR_PARENTS', () => {
      const invalid = Object.entries(BAR_PARENTS).flatMap(([child, parent]) => {
        const missing: string[] = [];
        if (!barTags.has(child)) missing.push(child);
        if (!barTags.has(parent)) missing.push(parent);
        return missing;
      });
      expect(invalid).toEqual([]);
    });

    it('should reference only catalog tags (or assumed staples) in substitutions', () => {
      const allowed = new Set([...barTags, ...ASSUMED_SUBSTITUTION_STAPLES]);
      const groups = [...COMMON_SUBSTITUTIONS, ...FORGIVING_SUBSTITUTIONS];
      const invalid = groups.flatMap((group) =>
        group.filter((tag) => !allowed.has(tag))
      );
      expect(invalid).toEqual([]);
    });

    it('should keep assumed staples out of the selectable catalog', () => {
      // Staples are substitution peers only — never inventory checkboxes.
      const overlap = ASSUMED_SUBSTITUTION_STAPLES.filter((tag) =>
        barTags.has(tag)
      );
      expect(overlap).toEqual([]);
    });
  });
});
