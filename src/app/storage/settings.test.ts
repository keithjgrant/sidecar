import { describe, expect, it } from 'vitest';
import { DEFAULT_BAR_SETTINGS } from './settings';

describe('bar settings defaults', () => {
  it('should filter drinks by default and leave favorites unfiltered', () => {
    expect(DEFAULT_BAR_SETTINGS.filterDrinksByBar).toBe(true);
    expect(DEFAULT_BAR_SETTINGS.filterFavoritesByBar).toBe(false);
  });

  it('should default substitutions to common', () => {
    expect(DEFAULT_BAR_SETTINGS.substitutions).toBe('common');
  });
});
