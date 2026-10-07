import { describe, expect, it } from 'vitest';
import { byTagKind, byTagQuery, filterTags } from './tagFilters';

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

describe('byTagKind', () => {
  it('should keep every tag when kind is all', () => {
    const tags = ['gin', 'lemon', 'stirred', 'campari'];
    expect(tags.filter(byTagKind('all'))).toEqual(tags);
  });

  it('should keep only tags of the selected kind', () => {
    const tags = ['gin', 'lemon', 'stirred', 'campari'];
    expect(tags.filter(byTagKind('spirit'))).toEqual(['gin']);
    expect(tags.filter(byTagKind('citrus'))).toEqual(['lemon']);
    expect(tags.filter(byTagKind('technique'))).toEqual(['stirred']);
    expect(tags.filter(byTagKind('other'))).toEqual(['campari']);
  });
});

describe('filterTags', () => {
  const tags = ['gin', 'ginger', 'lemon', 'lime', 'stirred', 'campari'];

  it('should return matching tags by query alone', () => {
    expect(filterTags(tags, 'l')).toEqual(['lemon', 'lime']);
  });

  it('should return all tags when query is empty and kind is all', () => {
    expect(filterTags(['a', 'b'], '')).toEqual(['a', 'b']);
  });

  it('should filter by kind alone when query is empty', () => {
    expect(filterTags(tags, '', 'citrus')).toEqual(['lemon', 'lime']);
  });

  it('should apply kind and query together', () => {
    expect(filterTags(tags, 'g', 'spirit')).toEqual(['gin']);
    expect(filterTags(tags, 'g', 'other')).toEqual(['ginger']);
  });

  it('should return an empty list when kind and query exclude each other', () => {
    expect(filterTags(tags, 'campari', 'spirit')).toEqual([]);
  });
});
