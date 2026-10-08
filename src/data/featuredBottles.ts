import {
  featuredBottles as bottles,
  getFeaturedBottleTagPaths,
} from './featuredBottlesConfig';

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

export const featuredBottles: Record<string, FeaturedBottle> = bottles;

export { getFeaturedBottleTagPaths };

export function getFeaturedBottle(
  date: Date = new Date(),
): FeaturedBottleSelection | null {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const monthKey = `${year}-${month}`;
  const bottle = featuredBottles[monthKey];
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
