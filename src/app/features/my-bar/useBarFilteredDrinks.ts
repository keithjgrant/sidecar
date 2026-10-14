import { useEffect, useMemo, useState } from 'react';
import { getParams } from '../../lib/qs';
import barDb from '../../storage/bar';
import settingsDb, {
  DEFAULT_BAR_SETTINGS,
  FILTER_DRINKS,
  FILTER_FAVORITES,
  type BarFilterSetting,
  type BarSettings,
} from '../../storage/settings';
import {
  filterMakeableDrinks,
  resolveBarFilterState,
  UNFILTERED_PARAM,
} from './myBarUtils';

export { FILTER_DRINKS, FILTER_FAVORITES, type BarFilterSetting };
export { UNFILTERED_PARAM };

export type BarFilteredDrinksResult<T> = {
  drinks: T[];
  /** True when the bar filter setting is on and not overridden. */
  isFiltering: boolean;
  /**
   * True when the setting is on but the `unfiltered` query param is
   * suppressing it for this view only.
   */
  isUnfilteredView: boolean;
};

function readUnfilteredParam(): boolean {
  return String(getParams()[UNFILTERED_PARAM] ?? '') === '1';
}

/**
 * Load bar inventory + settings, then optionally narrow `drinks` to what the
 * user can make (when the given setting is on). Pass `?unfiltered=1` for a
 * one-off full list without changing settings.
 */
export function useBarFilteredDrinks<T extends { tags: string[] }>(
  drinks: T[],
  filterSetting: BarFilterSetting
): BarFilteredDrinksResult<T> {
  const [owned, setOwned] = useState<string[]>([]);
  const [settings, setSettings] = useState<BarSettings>(DEFAULT_BAR_SETTINGS);
  const unfilteredView = readUnfilteredParam();

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const [tags, loadedSettings] = await Promise.all([
          barDb.getBarTags(),
          settingsDb.getBarSettings(),
        ]);
        if (!cancelled) {
          setOwned(tags);
          setSettings(loadedSettings);
        }
      } catch (err) {
        console.error('Failed to load bar filter state', err);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  return useMemo(() => {
    const { isFiltering, isUnfilteredView } = resolveBarFilterState(
      settings[filterSetting],
      unfilteredView
    );
    if (!isFiltering) {
      return { drinks, isFiltering: false, isUnfilteredView };
    }
    return {
      drinks: filterMakeableDrinks(drinks, owned, settings.substitutions),
      isFiltering: true,
      isUnfilteredView: false,
    };
  }, [drinks, owned, settings, filterSetting, unfilteredView]);
}
