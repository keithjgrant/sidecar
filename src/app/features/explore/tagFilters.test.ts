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
    const tags = ['gin', 'campari', 'orgeat', 'bitter', 'sweet-vermouth'];
    expect(tags.filter(byTagKind('all'))).toEqual(tags);
  });

  it('should keep only tags of the selected kind', () => {
    const tags = [
      'gin',
      'rye-whiskey',
      'campari',
      'curacao',
      'sweet-vermouth',
      'orgeat',
      'lemon',
      'bitter',
      'stirred',
      'negroni',
    ];
    expect(tags.filter(byTagKind('spirit'))).toEqual(['gin', 'rye-whiskey']);
    expect(tags.filter(byTagKind('amaro'))).toEqual(['campari']);
    expect(tags.filter(byTagKind('liqueur'))).toEqual(['curacao']);
    expect(tags.filter(byTagKind('vermouth'))).toEqual(['sweet-vermouth']);
    expect(tags.filter(byTagKind('wine'))).toEqual([]);
    expect(tags.filter(byTagKind('syrup'))).toEqual(['orgeat']);
    expect(tags.filter(byTagKind('citrus'))).toEqual(['lemon']);
    expect(tags.filter(byTagKind('flavor'))).toEqual(['bitter']);
    expect(tags.filter(byTagKind('technique'))).toEqual(['stirred']);
    expect(tags.filter(byTagKind('other'))).toEqual(['negroni']);
  });
});

describe('filterTags', () => {
  const tags = [
    'gin',
    'ginger',
    'rye-whiskey',
    'lemon',
    'lime',
    'stirred',
    'campari',
    'curacao',
    'orgeat',
    'bitter',
    'sweet-vermouth',
  ];

  it('should return matching tags by query alone', () => {
    expect(filterTags(tags, 'l')).toEqual(['lemon', 'lime']);
  });

  it('should return all tags when query is empty and kind is all', () => {
    expect(filterTags(['a', 'b'], '')).toEqual(['a', 'b']);
  });

  it('should filter by kind alone when query is empty', () => {
    expect(filterTags(tags, '', 'citrus')).toEqual(['lemon', 'lime']);
    expect(filterTags(tags, '', 'amaro')).toEqual(['campari']);
    expect(filterTags(tags, '', 'syrup')).toEqual(['ginger', 'orgeat']);
    expect(filterTags(tags, '', 'flavor')).toEqual(['bitter']);
    expect(filterTags(tags, '', 'vermouth')).toEqual(['sweet-vermouth']);
  });

  it('should apply kind and query together', () => {
    expect(filterTags(tags, 'g', 'spirit')).toEqual(['gin']);
    expect(filterTags(tags, 'ginger', 'syrup')).toEqual(['ginger']);
  });

  it('should return an empty list when kind and query exclude each other', () => {
    expect(filterTags(tags, 'campari', 'spirit')).toEqual([]);
  });
});
