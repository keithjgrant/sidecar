import { featuredBottles as bottles } from './featuredBottlesConfig';

export type FeaturedBottle = {
  tag: string;
  label: string;
  /** Filename under src/images/bottles/, including extension (e.g. campari.webp). */
  image?: string;
};

export type FeaturedBottleSelection = {
  monthKey: string;
  monthName: string;
  bottle: FeaturedBottle;
};

export type FeaturedBottleSchedule = Record<string, FeaturedBottle>;

export const featuredBottles: FeaturedBottleSchedule = bottles;

export function getFeaturedBottleTagPaths(
  schedule: FeaturedBottleSchedule = featuredBottles,
): string[] {
  return [
    ...new Set(
      Object.values(schedule).map((bottle) => `/tags/${bottle.tag}/`),
    ),
  ].sort();
}

export function getFeaturedBottle(
  date: Date = new Date(),
  schedule: FeaturedBottleSchedule = featuredBottles,
): FeaturedBottleSelection | null {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const monthKey = `${year}-${month}`;
  const bottle = schedule[monthKey];
  if (!bottle) {
    return null;
  }

  // Noon avoids timezone edge cases when deriving the month name from the key.
  const monthName = new Date(`${monthKey}-01T12:00:00`).toLocaleString(
    'en-US',
    { month: 'long' },
  );

  return { monthKey, monthName, bottle };
}
