import { describe, expect, it } from 'vitest';
import {
  ALPHA_INDEX_MIN_ITEMS,
  ALPHA_INDEX_MIN_LETTERS,
  getAlphaLetter,
  groupByAlphaLetter,
  sectionIdForLetter,
  shouldUseAlphaIndex,
} from './alphaGroup';

describe('getAlphaLetter', () => {
  it('should return the uppercase first letter for A-Z labels', () => {
    expect(getAlphaLetter('negroni')).toBe('N');
    expect(getAlphaLetter(' Gin')).toBe('G');
  });

  it('should return # for labels that do not start with A-Z', () => {
    expect(getAlphaLetter('100 Year Old Cigar')).toBe('#');
    expect(getAlphaLetter('')).toBe('#');
  });
});

describe('groupByAlphaLetter', () => {
  it('should group items by first letter and put # first', () => {
    const items = [
      { name: 'Negroni' },
      { name: 'Martini' },
      { name: '100 Year Old Cigar' },
      { name: 'Manhattan' },
    ];
    expect(groupByAlphaLetter(items, (item) => item.name)).toEqual([
      { letter: '#', items: [{ name: '100 Year Old Cigar' }] },
      { letter: 'M', items: [{ name: 'Martini' }, { name: 'Manhattan' }] },
      { letter: 'N', items: [{ name: 'Negroni' }] },
    ]);
  });

  it('should return an empty list when there are no items', () => {
    expect(groupByAlphaLetter([], (item: { name: string }) => item.name)).toEqual(
      [],
    );
  });
});

describe('sectionIdForLetter', () => {
  it('should build a stable id for letter sections', () => {
    expect(sectionIdForLetter('alpha-drink', 'A')).toBe('alpha-drink-a');
    expect(sectionIdForLetter('alpha-tag', '#')).toBe('alpha-tag-num');
  });
});

describe('shouldUseAlphaIndex', () => {
  it('should return true when both item and letter thresholds are met', () => {
    expect(
      shouldUseAlphaIndex(ALPHA_INDEX_MIN_ITEMS, ALPHA_INDEX_MIN_LETTERS),
    ).toBe(true);
  });

  it('should return false when there are too few items', () => {
    expect(
      shouldUseAlphaIndex(ALPHA_INDEX_MIN_ITEMS - 1, ALPHA_INDEX_MIN_LETTERS),
    ).toBe(false);
  });

  it('should return false when there are too few letters', () => {
    expect(
      shouldUseAlphaIndex(ALPHA_INDEX_MIN_ITEMS, ALPHA_INDEX_MIN_LETTERS - 1),
    ).toBe(false);
  });
});
