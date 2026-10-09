import { describe, expect, it } from 'vitest';
import {
  getAlphaLetter,
  groupByAlphaLetter,
  sectionIdForLetter,
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
