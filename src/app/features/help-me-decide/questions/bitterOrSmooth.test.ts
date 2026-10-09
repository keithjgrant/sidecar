import { describe, expect, it } from 'vitest';
import bitterOrSmooth from './bitterOrSmooth';
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

describe('bitterOrSmooth', () => {
  it('should give a strong positive score for bitter tags when answer is bitter', () => {
    const [scored] = bitterOrSmooth.score(
      [drink({ tags: ['campari', 'gin'] })],
      'bitter',
    );

    expect(scored.score).toBe(5);
  });

  it('should give a strong negative score for bitter tags when answer is smooth', () => {
    const [scored] = bitterOrSmooth.score(
      [drink({ tags: ['campari', 'gin'] })],
      'smooth',
    );

    expect(scored.score).toBe(-5);
  });

  it('should give a strong positive score for smooth tags when answer is smooth', () => {
    const [scored] = bitterOrSmooth.score(
      [drink({ tags: ['cream', 'baileys'] })],
      'smooth',
    );

    expect(scored.score).toBe(5);
  });

  it('should accumulate onto an existing score', () => {
    const [scored] = bitterOrSmooth.score(
      [drink({ tags: ['campari'], score: 2 })],
      'bitter',
    );

    expect(scored.score).toBe(7);
  });

  it('should throw for an unknown answer', () => {
    expect(() => bitterOrSmooth.score([drink()], 'spicy')).toThrow(
      /Unknown answer/,
    );
  });
});
