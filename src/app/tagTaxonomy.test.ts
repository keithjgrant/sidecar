import { describe, expect, it } from 'vitest';
import {
  AMARO_TAGS,
  BASE_SPIRITS,
  BASIC_SYRUP_TAGS,
  CITRUS_TAGS,
  FANCY_SYRUP_TAGS,
  FLAVOR_TAGS,
  LIQUEUR_TAGS,
  SPIRIT_TAGS,
  SYRUP_TAGS,
  TECHNIQUE_TAGS,
  VERMOUTH_TAGS,
  WINE_TAGS,
  getTagKind,
} from './tagTaxonomy';

const KIND_SETS: Array<[string, readonly string[]]> = [
  ['spirit', SPIRIT_TAGS],
  ['amaro', AMARO_TAGS],
  ['liqueur', LIQUEUR_TAGS],
  ['vermouth', VERMOUTH_TAGS],
  ['wine', WINE_TAGS],
  ['syrup', SYRUP_TAGS],
  ['citrus', CITRUS_TAGS],
  ['flavor', FLAVOR_TAGS],
  ['technique', TECHNIQUE_TAGS],
];

describe('tagTaxonomy sets', () => {
  it('should include every Explore base spirit in SPIRIT_TAGS', () => {
    for (const tag of BASE_SPIRITS) {
      expect(SPIRIT_TAGS).toContain(tag);
    }
  });

  it('should not overlap across classified kinds', () => {
    const sets = KIND_SETS.map(([, tags]) => new Set<string>(tags));

    for (let i = 0; i < sets.length; i += 1) {
      for (let j = i + 1; j < sets.length; j += 1) {
        for (const tag of sets[i]) {
          expect(sets[j].has(tag)).toBe(false);
        }
      }
    }
  });

  it('should classify every taxonomy member as its own kind', () => {
    for (const [kind, tags] of KIND_SETS) {
      for (const tag of tags) {
        expect(getTagKind(tag)).toBe(kind);
      }
    }
  });

  it('should classify spirit subtypes as spirit', () => {
    expect(getTagKind('rye-whiskey')).toBe('spirit');
    expect(getTagKind('aged-rum')).toBe('spirit');
    expect(getTagKind('london-dry-gin')).toBe('spirit');
  });

  it('should classify meyer-lemon as citrus', () => {
    expect(getTagKind('meyer-lemon')).toBe('citrus');
  });

  it('should classify red-wine and sparkling-wine as wine and leave generic wine as other', () => {
    expect(getTagKind('red-wine')).toBe('wine');
    expect(getTagKind('sparkling-wine')).toBe('wine');
    expect(getTagKind('wine')).toBe('other');
  });

  it('should classify unlisted tags as other', () => {
    expect(getTagKind('classic-cocktail')).toBe('other');
    expect(getTagKind('ten-bottle-bar')).toBe('other');
    expect(getTagKind('negroni')).toBe('other');
  });

  it('should compose syrup tags from basic and fancy lists without overlap', () => {
    const basic = new Set<string>(BASIC_SYRUP_TAGS);
    const fancy = new Set<string>(FANCY_SYRUP_TAGS);

    for (const tag of BASIC_SYRUP_TAGS) {
      expect(fancy.has(tag)).toBe(false);
      expect(SYRUP_TAGS).toContain(tag);
    }
    for (const tag of FANCY_SYRUP_TAGS) {
      expect(basic.has(tag)).toBe(false);
      expect(SYRUP_TAGS).toContain(tag);
    }
    expect(SYRUP_TAGS).toHaveLength(
      BASIC_SYRUP_TAGS.length + FANCY_SYRUP_TAGS.length,
    );
    expect(getTagKind('ginger')).toBe('syrup');
    expect(getTagKind('honey')).toBe('syrup');
    expect(getTagKind('black-pepper')).toBe('syrup');
  });
});
