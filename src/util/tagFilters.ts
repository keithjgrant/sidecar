export function byTagQuery(query: string) {
  const normalized = query.trim().toLowerCase();
  return (tag: string) => !normalized || tag.toLowerCase().includes(normalized);
}

export function filterTags(tags: string[], query = ''): string[] {
  return tags.filter(byTagQuery(query));
}
