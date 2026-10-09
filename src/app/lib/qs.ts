import qs from 'querystring';

export function getParams(): qs.ParsedUrlQuery {
  if (typeof window === 'undefined' || typeof window.location === 'undefined') {
    return {};
  }
  const search = window.location.search || '';
  return qs.parse(search.replace(/^\?/, ''));
}

export function setParam(key: string, value: string): void {
  if (typeof window === 'undefined' || typeof window.location === 'undefined') {
    return;
  }

  const q = qs.stringify({
    ...getParams(),
    [key]: encodeURIComponent(value),
  });
  window.history.replaceState({}, '', `${window.location.pathname}?${q}`);
}
