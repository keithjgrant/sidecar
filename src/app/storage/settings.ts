import { useState, useEffect } from 'react';
import { attachDbDebug, getDb, toError } from './db';
import type { SubstitutionMode } from '../config/barSubstitutions';

const BAR_SETTINGS_KEY = 'bar';

export type BarSettings = {
  filterDrinksByBar: boolean;
  filterFavoritesByBar: boolean;
  substitutions: SubstitutionMode;
};

export const FILTER_DRINKS = 'filterDrinksByBar' satisfies keyof BarSettings;
export const FILTER_FAVORITES =
  'filterFavoritesByBar' satisfies keyof BarSettings;

export type BarFilterSetting = typeof FILTER_DRINKS | typeof FILTER_FAVORITES;

export const DEFAULT_BAR_SETTINGS: BarSettings = {
  filterDrinksByBar: false,
  filterFavoritesByBar: false,
  substitutions: 'common',
};

interface SettingsRow {
  key: string;
  value: Partial<BarSettings>;
}

function mergeSettings(partial?: Partial<BarSettings> | null): BarSettings {
  return {
    ...DEFAULT_BAR_SETTINGS,
    ...partial,
  };
}

export async function getBarSettings(): Promise<BarSettings> {
  const db = await getDb();
  const row = (await db.get('settings', BAR_SETTINGS_KEY)) as
    | SettingsRow
    | undefined;
  return mergeSettings(row?.value);
}

export async function setBarSettings(
  partial: Partial<BarSettings>
): Promise<BarSettings> {
  const current = await getBarSettings();
  const next = mergeSettings({ ...current, ...partial });
  const db = await getDb();
  await db.put('settings', {
    key: BAR_SETTINGS_KEY,
    value: next,
  } satisfies SettingsRow);
  return next;
}

export function useSettings() {
  const [settings, setSettings] = useState<BarSettings>(DEFAULT_BAR_SETTINGS);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const loadedSettings = await getBarSettings();
        if (!cancelled) {
          setSettings(loadedSettings);
          setError(null);
        }
      } catch (err) {
        console.error('Failed to load bar settings', err);
        if (!cancelled) {
          setError(toError(err));
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  return { settings, isLoading, error };
}

const settingsDb = {
  getBarSettings,
  setBarSettings,
  DEFAULT_BAR_SETTINGS,
};

attachDbDebug(settingsDb);

export default settingsDb;
