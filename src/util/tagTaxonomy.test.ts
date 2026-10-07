import { describe, expect, it } from 'vitest';
import {
  BASE_SPIRITS,
  CITRUS_TAGS,
  TECHNIQUE_TAGS,
  getTagKind,
} from './tagTaxonomy';

describe('tagTaxonomy sets', () => {
  it('should not overlap across spirit, citrus, and technique', () => {
    const spirits = new Set<string>(BASE_SPIRITS);
    const citrus = new Set<string>(CITRUS_TAGS);
    const techniques = new Set<string>(TECHNIQUE_TAGS);

    for (const tag of BASE_SPIRITS) {
      expect(citrus.has(tag)).toBe(false);
      expect(techniques.has(tag)).toBe(false);
    }
    for (const tag of CITRUS_TAGS) {
      expect(spirits.has(tag)).toBe(false);
      expect(techniques.has(tag)).toBe(false);
    }
  });

  it('should classify every taxonomy member as its own kind', () => {
    for (const tag of BASE_SPIRITS) {
      expect(getTagKind(tag)).toBe('spirit');
    }
    for (const tag of CITRUS_TAGS) {
      expect(getTagKind(tag)).toBe('citrus');
    }
    for (const tag of TECHNIQUE_TAGS) {
      expect(getTagKind(tag)).toBe('technique');
    }
  });

  it('should classify unlisted tags as other', () => {
    expect(getTagKind('campari')).toBe('other');
    expect(getTagKind('rye-whiskey')).toBe('other');
    expect(getTagKind('classic-cocktail')).toBe('other');
  });
});
