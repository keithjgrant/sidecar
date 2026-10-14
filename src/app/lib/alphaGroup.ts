export function getAlphaLetter(label: string): string {
  const ch = label.trim().charAt(0).toUpperCase();
  return ch >= 'A' && ch <= 'Z' ? ch : '#';
}

export interface AlphaGroup<T> {
  letter: string;
  items: T[];
}

export function groupByAlphaLetter<T>(
  items: T[],
  getLabel: (item: T) => string
): AlphaGroup<T>[] {
  const map = new Map<string, T[]>();

  items.forEach((item) => {
    const letter = getAlphaLetter(getLabel(item));
    const group = map.get(letter);
    if (group) {
      group.push(item);
    } else {
      map.set(letter, [item]);
    }
  });

  const letters = [...map.keys()].sort((a, b) => {
    if (a === '#') {
      return -1;
    }
    if (b === '#') {
      return 1;
    }
    return a.localeCompare(b);
  });

  return letters.map((letter) => ({
    letter,
    items: map.get(letter) ?? [],
  }));
}

export function sectionIdForLetter(prefix: string, letter: string): string {
  const safe = letter === '#' ? 'num' : letter.toLowerCase();
  return `${prefix}-${safe}`;
}

/** Minimum list size before letter headings + right-rail navigation are useful. */
export const ALPHA_INDEX_MIN_ITEMS = 12;
/** Minimum distinct letters before the alpha index rail earns its keep. */
export const ALPHA_INDEX_MIN_LETTERS = 6;

/** Whether to show letter-grouped sections and the sticky alpha index. */
export function shouldUseAlphaIndex(
  itemCount: number,
  letterCount: number
): boolean {
  return (
    itemCount >= ALPHA_INDEX_MIN_ITEMS && letterCount >= ALPHA_INDEX_MIN_LETTERS
  );
}
