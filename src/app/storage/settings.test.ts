import { describe, expect, it } from 'vitest';
import { DEFAULT_BAR_SETTINGS } from './settings';

describe('bar settings defaults', () => {
  it('should leave drinks and favorites unfiltered by default', () => {
    expect(DEFAULT_BAR_SETTINGS.filterDrinksByBar).toBe(false);
    expect(DEFAULT_BAR_SETTINGS.filterFavoritesByBar).toBe(false);
  });

  it('should default substitutions to common', () => {
    expect(DEFAULT_BAR_SETTINGS.substitutions).toBe('common');
  });
});
