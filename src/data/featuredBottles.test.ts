import { describe, expect, it } from 'vitest';
import {
  getFeaturedBottle,
  getFeaturedBottleTagPaths,
  type FeaturedBottleSchedule,
} from './featuredBottles';

const schedule: FeaturedBottleSchedule = {
  '2099-03': {
    tag: 'test-amaro',
    label: 'Test Amaro (extra note)',
    image: 'test-amaro.webp',
  },
  '2099-04': { tag: 'other-bottle', label: 'Other Bottle' },
  '2099-05': { tag: 'test-amaro', label: 'Test Amaro again' },
};

describe('getFeaturedBottle', () => {
  it('should return the bottle for the matching year-month', () => {
    const result = getFeaturedBottle(new Date('2099-03-15T12:00:00'), schedule);
    expect(result).toEqual({
      monthKey: '2099-03',
      monthName: 'March',
      bottle: schedule['2099-03'],
    });
  });

  it('should return null when the month is not configured', () => {
    expect(
      getFeaturedBottle(new Date('2025-06-01T12:00:00'), schedule),
    ).toBeNull();
  });

  it('should format the month name for the link copy', () => {
    const result = getFeaturedBottle(new Date('2099-04-08T12:00:00'), schedule);
    expect(result?.monthName).toBe('April');
  });

  it('should preserve a long bottle label', () => {
    const result = getFeaturedBottle(new Date('2099-03-01T12:00:00'), schedule);
    expect(result?.bottle.label).toBe('Test Amaro (extra note)');
  });

  it('should use an explicit image filename including extension', () => {
    const result = getFeaturedBottle(new Date('2099-03-01T12:00:00'), schedule);
    expect(result?.bottle.image).toBe('test-amaro.webp');
  });
});

describe('getFeaturedBottleTagPaths', () => {
  it('should return unique sorted tag paths from the schedule', () => {
    expect(getFeaturedBottleTagPaths(schedule)).toEqual([
      '/tags/other-bottle/',
      '/tags/test-amaro/',
    ]);
  });
});
