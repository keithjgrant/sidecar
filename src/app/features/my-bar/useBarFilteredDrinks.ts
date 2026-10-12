import { useEffect, useMemo, useState } from 'react';
import barDb from '../../storage/bar';
import settingsDb, {
  DEFAULT_BAR_SETTINGS,
  FILTER_DRINKS,
  FILTER_FAVORITES,
  type BarFilterSetting,
  type BarSettings,
} from '../../storage/settings';
import { filterMakeableDrinks, shouldFilterByBar } from './myBarLogic';

export { FILTER_DRINKS, FILTER_FAVORITES, type BarFilterSetting };

export type BarFilteredDrinksResult<T> = {
  drinks: T[];
  /** True when the bar setting is on and the bar is configured. */
  isFiltering: boolean;
};

/**
 * Load bar inventory + settings, then optionally narrow `drinks` to what the
 * user can make (when the given setting is on and the bar is configured).
 */
export function useBarFilteredDrinks<T extends { tags: string[] }>(
  drinks: T[],
  filterSetting: BarFilterSetting,
): BarFilteredDrinksResult<T> {
  const [owned, setOwned] = useState<string[]>([]);
  const [settings, setSettings] = useState<BarSettings>(DEFAULT_BAR_SETTINGS);

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
    const isFiltering = shouldFilterByBar(settings[filterSetting], owned);
    if (!isFiltering) {
      return { drinks, isFiltering: false };
    }
    return {
      drinks: filterMakeableDrinks(drinks, owned, settings.substitutions),
      isFiltering: true,
    };
  }, [drinks, owned, settings, filterSetting]);
}
