import { describe, expect, it } from 'vitest';
import { scoreAndCutoff, SCORE_CUTOFF } from './scoreAnswers';
import bitterOrSmooth from './questions/bitterOrSmooth';
import citrusyOrRich from './questions/citrusyOrRich';
import sweetOrStiff from './questions/sweetOrStiff';
import { makeDrink } from './testHelpers';

describe('scoreAndCutoff', () => {
  it('should accumulate scores across multiple questions', () => {
    const drinks = [
      makeDrink({
        path: '/drinks/negroni',
        tags: ['campari', 'gin', 'lemon'],
        sweetness: 2,
      }),
      makeDrink({
        path: '/drinks/cream',
        tags: ['cream', 'egg'],
        sweetness: 3,
      }),
    ];

    const results = scoreAndCutoff(
      drinks,
      [bitterOrSmooth, citrusyOrRich],
      ['bitter', 'citrusy'],
      Number.NEGATIVE_INFINITY,
    );

    const negroni = results.find((d) => d.path === '/drinks/negroni');
    const cream = results.find((d) => d.path === '/drinks/cream');

    expect(negroni?.score).toBe(9); // bitter +5; citrus lemon+4 gin+1 campari-1
    expect(cream?.score).toBeDefined();
    expect(cream!.score).toBeLessThan(negroni!.score);
  });

  it('should drop drinks below the cutoff', () => {
    const drinks = [
      makeDrink({
        path: '/drinks/sweet',
        sweetness: 3,
      }),
      makeDrink({
        path: '/drinks/dry',
        sweetness: 1,
      }),
      makeDrink({
        path: '/drinks/middle',
        sweetness: 2,
      }),
    ];

    const results = scoreAndCutoff(drinks, [sweetOrStiff], ['sweet']);

    expect(results.map((d) => d.path)).toEqual(['/drinks/sweet']);
    expect(results[0].score).toBeGreaterThanOrEqual(SCORE_CUTOFF);
  });

  it('should keep drinks that meet the cutoff exactly', () => {
    const drinks = [
      makeDrink({
        path: '/drinks/sweet',
        sweetness: 3,
      }),
    ];

    const results = scoreAndCutoff(drinks, [sweetOrStiff], ['sweet'], 5);

    expect(results).toHaveLength(1);
    expect(results[0].score).toBe(5);
  });

  it('should return an empty list when nothing meets the cutoff', () => {
    const drinks = [
      makeDrink({ path: '/drinks/dry', sweetness: 1 }),
    ];

    expect(scoreAndCutoff(drinks, [sweetOrStiff], ['sweet'])).toEqual([]);
  });
});
