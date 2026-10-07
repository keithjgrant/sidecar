import { describe, expect, it } from 'vitest';
import { byTagQuery, filterTags } from './tagFilters';

describe('byTagQuery', () => {
  it('should keep every tag when query is empty or whitespace', () => {
    const tags = ['gin', 'whiskey'];
    expect(tags.filter(byTagQuery(''))).toHaveLength(2);
    expect(tags.filter(byTagQuery('  '))).toHaveLength(2);
  });

  it('should keep tags that contain the query case-insensitively', () => {
    const tags = ['gin', 'ginger', 'whiskey'];
    expect(tags.filter(byTagQuery('GIN'))).toEqual(['gin', 'ginger']);
  });

  it('should exclude tags that do not match', () => {
    expect(byTagQuery('rum')('gin')).toBe(false);
  });
});

describe('filterTags', () => {
  it('should return matching tags', () => {
    expect(filterTags(['lemon', 'lime', 'gin'], 'l')).toEqual(['lemon', 'lime']);
  });

  it('should return all tags when query is empty', () => {
    expect(filterTags(['a', 'b'], '')).toEqual(['a', 'b']);
  });
});
