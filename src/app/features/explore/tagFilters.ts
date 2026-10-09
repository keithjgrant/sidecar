import { getTagKind, type TagKind } from '../../tagTaxonomy';

export type { TagKind };

export function byTagQuery(query: string) {
  const normalized = query.trim().toLowerCase();
  return (tag: string) => !normalized || tag.toLowerCase().includes(normalized);
}

export function byTagKind(kind: TagKind | 'all') {
  return (tag: string) => kind === 'all' || getTagKind(tag) === kind;
}

export function filterTags(
  tags: string[],
  query = '',
  kind: TagKind | 'all' = 'all',
): string[] {
  return tags.filter(byTagKind(kind)).filter(byTagQuery(query));
}
