import { describe, expect, it } from 'vitest';
import citrusyOrRich from './citrusyOrRich';
import type { DecideDrink } from '../types';

function drink(overrides: Partial<DecideDrink> = {}): DecideDrink {
  return {
    title: 'Test Drink',
    path: '/test',
    glass: 'coupe',
    tags: [],
    ingredients: [],
    ...overrides,
  };
}

describe('citrusyOrRich', () => {
  it('should score citrus tags positively when answer is citrusy', () => {
    const [scored] = citrusyOrRich.score(
      [drink({ tags: ['lemon', 'gin'] })],
      'citrusy',
    );

    // lemon (+4) + gin (+1)
    expect(scored.score).toBe(5);
  });

  it('should score citrus tags negatively when answer is rich', () => {
    const [scored] = citrusyOrRich.score(
      [drink({ tags: ['lemon'] })],
      'rich',
    );

    expect(scored.score).toBe(-4);
  });

  it('should score cream/egg drinks as rich', () => {
    const [scored] = citrusyOrRich.score(
      [drink({ tags: ['cream', 'egg'] })],
      'rich',
    );

    expect(scored.score).toBe(3);
  });

  it('should cap scores at ±5', () => {
    const [scored] = citrusyOrRich.score(
      [drink({ tags: ['lemon', 'lime', 'gin', 'mint'] })],
      'citrusy',
    );

    expect(scored.score).toBeLessThanOrEqual(5);
    expect(scored.score).toBeGreaterThanOrEqual(-5);
  });

  it('should throw for an unknown answer', () => {
    expect(() => citrusyOrRich.score([drink()], 'bitter')).toThrow(
      /Unknown answer/,
    );
  });
});
