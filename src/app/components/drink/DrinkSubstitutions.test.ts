import { describe, expect, it } from 'vitest';
import { formatOrList, formatSubstitutionSentence } from './DrinkSubstitutions';

describe('DrinkSubstitutions copy', () => {
  it('should format substitution lists with or', () => {
    expect(formatOrList(['Bourbon'])).toBe('Bourbon');
    expect(formatOrList(['Bourbon', 'Irish Whiskey'])).toBe(
      'Bourbon or Irish Whiskey'
    );
    expect(formatOrList(['A', 'B', 'C'])).toBe('A, B, or C');
  });

  it('should format a grouped substitution sentence', () => {
    expect(
      formatSubstitutionSentence({
        required: 'rye-whiskey',
        using: ['bourbon', 'irish-whiskey'],
      })
    ).toBe('Bourbon or Irish Whiskey for Rye Whiskey');
  });
});
