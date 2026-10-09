import { afterEach, describe, expect, it, vi } from 'vitest';
import lightOrDark from './lightOrDark';
import sweetOrStiff from './sweetOrStiff';
import boozyOrMild from './boozyOrMild';
import simpleOrElaborate from './simpleOrElaborate';
import refreshingOrIntense from './refreshingOrIntense';
import seasonalOrTimeless from './seasonalOrTimeless';
import fruityOrHerbal from './fruityOrHerbal';
import smokyOrClean from './smokyOrClean';
import spicyOrMellow from './spicyOrMellow';
import { makeDrink } from '../testHelpers';

describe('lightOrDark', () => {
  it('should strongly prefer clear spirits for clear answers', () => {
    const [scored] = lightOrDark.score(
      [makeDrink({ tags: ['gin'] })],
      'clear',
    );
    expect(scored.score).toBe(5);
  });

  it('should strongly prefer brown spirits for brown answers', () => {
    const [scored] = lightOrDark.score(
      [makeDrink({ tags: ['whiskey'] })],
      'brown',
    );
    expect(scored.score).toBe(5);
  });

  it('should throw for an unknown answer', () => {
    expect(() => lightOrDark.score([makeDrink()], 'amber')).toThrow(
      /Unknown answer/,
    );
  });
});

describe('sweetOrStiff', () => {
  it('should score high-sweetness drinks highly when answer is sweet', () => {
    const [scored] = sweetOrStiff.score(
      [makeDrink({ sweetness: 3 })],
      'sweet',
    );
    expect(scored.score).toBe(5);
  });

  it('should score low-sweetness drinks highly when answer is dry', () => {
    const [scored] = sweetOrStiff.score([makeDrink({ sweetness: 1 })], 'dry');
    expect(scored.score).toBe(5);
  });

  it('should prefer mid sweetness when answer is middle', () => {
    const [scored] = sweetOrStiff.score(
      [makeDrink({ sweetness: 2 })],
      'middle',
    );
    expect(scored.score).toBe(5);
  });

  it('should default missing sweetness to 2', () => {
    const [scored] = sweetOrStiff.score([makeDrink()], 'middle');
    expect(scored.score).toBe(5);
  });
});

describe('boozyOrMild', () => {
  it('should score high-booziness drinks highly when answer is boozy', () => {
    const [scored] = boozyOrMild.score(
      [makeDrink({ booziness: 3 })],
      'boozy',
    );
    expect(scored.score).toBe(5);
  });

  it('should score low-booziness drinks highly when answer is mild', () => {
    const [scored] = boozyOrMild.score([makeDrink({ booziness: 1 })], 'mild');
    expect(scored.score).toBe(5);
  });

  it('should prefer mid booziness when answer is middle', () => {
    const [scored] = boozyOrMild.score(
      [makeDrink({ booziness: 2 })],
      'middle',
    );
    expect(scored.score).toBe(5);
  });
});

describe('simpleOrElaborate', () => {
  it('should score few-ingredient built drinks as simple', () => {
    const [scored] = simpleOrElaborate.score(
      [
        makeDrink({
          tags: ['built'],
          ingredients: ['2 oz whiskey', '1 sugar cube'],
          html: '<p>Build in glass.</p>',
        }),
      ],
      'simple',
    );
    expect(scored.score).toBeGreaterThan(0);
  });

  it('should score many-ingredient long-recipe drinks as elaborate', () => {
    const [scored] = simpleOrElaborate.score(
      [
        makeDrink({
          ingredients: [
            'a',
            'b',
            'c',
            'd',
            'e',
            'f',
          ],
          html: `<p>${'x'.repeat(320)}</p>`,
        }),
      ],
      'elaborate',
    );
    expect(scored.score).toBe(5);
  });
});

describe('refreshingOrIntense', () => {
  it('should give a perfect score for refreshing-tagged drinks', () => {
    const [scored] = refreshingOrIntense.score(
      [makeDrink({ tags: ['refreshing'] })],
      'refreshing',
    );
    expect(scored.score).toBe(5);
  });

  it('should score highballs as refreshing', () => {
    const [scored] = refreshingOrIntense.score(
      [makeDrink({ family: 'highball' })],
      'refreshing',
    );
    expect(scored.score).toBe(3);
  });

  it('should clamp hot drinks when seeking refreshing', () => {
    const [scored] = refreshingOrIntense.score(
      [makeDrink({ tags: ['hot', 'gin'], family: 'highball', booziness: 1 })],
      'refreshing',
    );
    expect(scored.score).toBeLessThanOrEqual(-1);
  });
});

describe('seasonalOrTimeless', () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  it('should score classic cocktails as timeless', () => {
    const [scored] = seasonalOrTimeless.score(
      [makeDrink({ tags: ['classic-cocktail'] })],
      'timeless',
    );
    expect(scored.score).toBe(5);
  });

  it('should penalize seasonal tags for timeless answers', () => {
    const [scored] = seasonalOrTimeless.score(
      [makeDrink({ tags: ['classic-cocktail', 'winter'] })],
      'timeless',
    );
    expect(scored.score).toBe(1);
  });

  it('should boost drinks tagged for the current season', () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2026-07-15T12:00:00Z'));
    vi.spyOn(Intl.DateTimeFormat.prototype, 'resolvedOptions').mockReturnValue({
      locale: 'en-US',
      calendar: 'gregory',
      numberingSystem: 'latn',
      timeZone: 'America/New_York',
    });

    const [scored] = seasonalOrTimeless.score(
      [makeDrink({ tags: ['summer'] })],
      'seasonal',
    );
    expect(scored.score).toBe(5);
  });
});

describe('fruityOrHerbal', () => {
  it('should strongly score fruit tags as fruity', () => {
    const [scored] = fruityOrHerbal.score(
      [makeDrink({ tags: ['blackberry'] })],
      'fruity',
    );
    expect(scored.score).toBe(5);
  });

  it('should strongly score chartreuse as herbal', () => {
    const [scored] = fruityOrHerbal.score(
      [makeDrink({ tags: ['green-chartreuse'] })],
      'herbal',
    );
    expect(scored.score).toBe(5);
  });

  it('should weigh gin toward herbal', () => {
    const [scored] = fruityOrHerbal.score(
      [makeDrink({ tags: ['gin'] })],
      'herbal',
    );
    expect(scored.score).toBe(3);
  });
});

describe('smokyOrClean', () => {
  it('should give a perfect score for smoky-tagged drinks', () => {
    const [scored] = smokyOrClean.score(
      [makeDrink({ tags: ['smoky'] })],
      'smoky',
    );
    expect(scored.score).toBe(5);
  });

  it('should score mezcal as smoky', () => {
    const [scored] = smokyOrClean.score(
      [makeDrink({ tags: ['mezcal'] })],
      'smoky',
    );
    expect(scored.score).toBe(4);
  });

  it('should score gin as clean', () => {
    const [scored] = smokyOrClean.score(
      [makeDrink({ tags: ['gin'] })],
      'clean',
    );
    expect(scored.score).toBe(2);
  });
});

describe('spicyOrMellow', () => {
  it('should give a perfect score for spicy tags when seeking spicy', () => {
    const [scored] = spicyOrMellow.score(
      [makeDrink({ tags: ['jalapeno'] })],
      'spicy',
    );
    expect(scored.score).toBe(5);
  });

  it('should return zero for strong matches when answer is middle', () => {
    const [scored] = spicyOrMellow.score(
      [makeDrink({ tags: ['spicy'] })],
      'middle',
    );
    expect(scored.score).toBe(0);
  });

  it('should score cream drinks as mellow', () => {
    const [scored] = spicyOrMellow.score(
      [makeDrink({ tags: ['cream'] })],
      'mellow',
    );
    expect(scored.score).toBe(4);
  });
});
