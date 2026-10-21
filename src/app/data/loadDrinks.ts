import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';

const DRINKS_DIR = path.resolve(import.meta.dirname, '../../pages/drinks');

/** Frontmatter + source file for a drink markdown document. */
export interface DrinkDocument {
  /** Basename of the markdown file, e.g. `manhattan.md`. */
  file: string;
  title: string;
  path: string;
  tags: string[];
  tenBottleCandidate: boolean;
  glass?: string;
  family?: string;
  ingredients: string[];
  garnish?: string;
  sweetness?: number;
  booziness?: number;
}

let cachedDrinks: DrinkDocument[] | null = null;

/**
 * Load every drink under `src/pages/drinks/*.md` via gray-matter.
 * Results are memoized so multiple test files share one parse per process.
 * Intended for data-validation tests and offline scripts — not for the Gatsby app.
 */
export function loadDrinks(): DrinkDocument[] {
  if (cachedDrinks) {
    return cachedDrinks;
  }

  cachedDrinks = fs
    .readdirSync(DRINKS_DIR)
    .filter((file) => file.endsWith('.md'))
    .sort()
    .map((file) => {
      const raw = fs.readFileSync(path.join(DRINKS_DIR, file), 'utf8');
      const { data } = matter(raw);

      return {
        file,
        title: String(data.title ?? ''),
        path: String(data.path ?? ''),
        tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
        tenBottleCandidate: data.tenBottleCandidate === true,
        glass: data.glass != null ? String(data.glass) : undefined,
        family: data.family != null ? String(data.family) : undefined,
        ingredients: Array.isArray(data.ingredients)
          ? data.ingredients.map(String)
          : [],
        garnish: data.garnish != null ? String(data.garnish) : undefined,
        sweetness:
          typeof data.sweetness === 'number' ? data.sweetness : undefined,
        booziness:
          typeof data.booziness === 'number' ? data.booziness : undefined,
      };
    });

  return cachedDrinks;
}
