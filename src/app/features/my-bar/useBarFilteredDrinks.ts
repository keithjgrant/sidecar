import { useMemo } from 'react';
import { getParams } from '../../lib/qs';
import { useBar } from '../../storage/bar';
import {
  FILTER_DRINKS,
  FILTER_FAVORITES,
  type BarFilterSetting,
  useSettings,
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
  const { tags: owned, isLoading: barLoading, error: barError } = useBar();
  const {
    settings,
    isLoading: settingsLoading,
    error: settingsError,
  } = useSettings();
  const unfilteredView = readUnfilteredParam();
  const ready = !barLoading && !settingsLoading && !barError && !settingsError;

  return useMemo(() => {
    // Until both stores settle successfully, keep the unfiltered default so
    // we never flash an empty list from owned=[] + filter-on.
    const filterEnabled = ready ? settings[filterSetting] : false;
    const { isFiltering, isUnfilteredView } = resolveBarFilterState(
      filterEnabled,
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
  }, [drinks, owned, settings, filterSetting, unfilteredView, ready]);
}
