import { describe, expect, it } from 'vitest';
import {
  featuredBottles,
  getFeaturedBottle,
  getFeaturedBottleTagPaths,
} from './featuredBottles';
import { featuredBottles as configBottles } from './featuredBottlesConfig';

describe('getFeaturedBottle', () => {
  it('should return the bottle for the matching year-month', () => {
    const result = getFeaturedBottle(new Date('2026-10-15T12:00:00'));
    expect(result).toEqual({
      monthKey: '2026-10',
      monthName: 'October',
      bottle: featuredBottles['2026-10'],
    });
  });

  it('should return null when the month is not configured', () => {
    expect(getFeaturedBottle(new Date('2025-06-01T12:00:00'))).toBeNull();
  });

  it('should format the month name for the link copy', () => {
    const result = getFeaturedBottle(new Date('2027-01-08T12:00:00'));
    expect(result?.monthName).toBe('January');
  });

  it('should preserve a long bottle label', () => {
    const result = getFeaturedBottle(new Date('2026-12-01T12:00:00'));
    expect(result?.bottle.label).toBe(
      'Green Chartreuse (substitutions available)',
    );
  });

  it('should use an explicit image filename including extension', () => {
    expect(featuredBottles['2026-10'].image).toBe('campari.webp');
  });
});

describe('getFeaturedBottleTagPaths', () => {
  it('should include every featured bottle tag in offline precache paths', () => {
    const tags = new Set(
      Object.values(configBottles).map((bottle) => `/tags/${bottle.tag}/`),
    );
    expect(getFeaturedBottleTagPaths()).toEqual([...tags].sort());
  });
});
