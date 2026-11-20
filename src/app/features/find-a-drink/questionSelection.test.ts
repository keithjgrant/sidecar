import { describe, expect, it, vi, afterEach } from 'vitest';
import {
  allQuestions,
  loadFromQuery,
  selectQuestions,
} from './questionSelection';

describe('loadFromQuery', () => {
  it('should load questions by comma-separated indexes', () => {
    const questions = loadFromQuery('0,6');

    expect(questions).toHaveLength(2);
    expect(questions[0]).toBe(allQuestions[0]);
    expect(questions[1]).toBe(allQuestions[6]);
  });

  it('should skip invalid and out-of-range indexes', () => {
    const questions = loadFromQuery('0,foo,99,3');

    expect(questions).toHaveLength(2);
    expect(questions[0]).toBe(allQuestions[0]);
    expect(questions[1]).toBe(allQuestions[3]);
  });

  it('should return an empty list for an empty query', () => {
    expect(loadFromQuery('')).toEqual([]);
  });
});

describe('selectQuestions', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should select the requested number of distinct questions', () => {
    vi.spyOn(Math, 'random')
      .mockReturnValueOnce(0) // index 0
      .mockReturnValueOnce(0) // duplicate attempt
      .mockReturnValueOnce(0.5); // middle of list

    const [selected, indexes] = selectQuestions(2);

    expect(selected).toHaveLength(2);
    expect(indexes).toHaveLength(2);
    expect(new Set(indexes).size).toBe(2);
    expect(selected[0]).toBe(allQuestions[indexes[0]]);
    expect(selected[1]).toBe(allQuestions[indexes[1]]);
  });

  it('should default to two questions', () => {
    const [selected] = selectQuestions();
    expect(selected).toHaveLength(2);
  });
});
