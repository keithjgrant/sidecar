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

export function clearParam(key: string): void {
  if (typeof window === 'undefined' || typeof window.location === 'undefined') {
    return;
  }

  window.history.replaceState({}, '', hrefWithParam(key, null));
}

/**
 * Build a same-page href with `key` set to `value`, or removed when `value`
 * is null. Preserves other query params.
 */
export function hrefWithParam(key: string, value: string | null): string {
  const path =
    typeof window !== 'undefined' && window.location
      ? window.location.pathname
      : '';
  const params = { ...getParams() };
  if (value === null) {
    delete params[key];
  } else {
    params[key] = value;
  }
  const q = qs.stringify(params);
  return q ? `${path}?${q}` : path;
}
