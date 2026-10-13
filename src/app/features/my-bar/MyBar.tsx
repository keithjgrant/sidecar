import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'gatsby';
import styled from 'styled-components';
import DrinkList from '../../components/DrinkList';
import InstallBanner from '../../components/InstallBanner';
import { subscribeStorageBlocked } from '../../storage/db';
import barDb from '../../storage/bar';
import settingsDb, {
  DEFAULT_BAR_SETTINGS,
  type BarSettings,
} from '../../storage/settings';
import BarInventory from './BarInventory';
import BarSettingsPanel from './BarSettingsPanel';
import {
  DEFAULT_BAR,
  filterMakeableDrinks,
  getAllBarTags,
  getGroupTags,
  type BarCatalogGroup,
} from './myBarLogic';
import type { Drink } from '../../types';

const Warning = styled.p`
  margin: 0 0 1rem;
  padding: 0.75rem 0.9rem;
  border: 1px solid var(--card-border);
  border-radius: var(--border-radius);
  background: var(--gray-dark);
  color: var(--gray-8);
`;

const ResultsHeading = styled.h2`
  margin: 0 0 0.75rem;
  font-size: 1.15rem;
  color: var(--gray-8);
`;

interface MyBarProps {
  allDrinks: Drink[];
  imageMap: Record<string, unknown>;
}

export default function MyBar({ allDrinks, imageMap }: MyBarProps) {
  const [owned, setOwned] = useState<Set<string>>(() => new Set(DEFAULT_BAR));
  const [settings, setSettings] = useState<BarSettings>(DEFAULT_BAR_SETTINGS);
  const [storageReady, setStorageReady] = useState(false);
  const [storageBlocked, setStorageBlocked] = useState(false);

  useEffect(() => subscribeStorageBlocked(setStorageBlocked), []);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const [tags, loadedSettings] = await Promise.all([
          barDb.getBarTags(),
          settingsDb.getBarSettings(),
        ]);
        if (!cancelled) {
          setOwned(new Set(tags));
          setSettings(loadedSettings);
          setStorageReady(true);
        }
      } catch (err) {
        console.error('Failed to load bar from IndexedDB', err);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const makeable = useMemo(
    () => filterMakeableDrinks(allDrinks, owned, settings.substitutions),
    [allDrinks, owned, settings.substitutions]
  );

  const allBarTags = useMemo(() => getAllBarTags(), []);

  async function persistSettings(partial: Partial<BarSettings>) {
    const next = { ...settings, ...partial };
    setSettings(next);
    try {
      await settingsDb.setBarSettings(partial);
    } catch (err) {
      console.error('Failed to save bar settings', err);
    }
  }

  async function persistOwned(next: Set<string>) {
    setOwned(next);
    try {
      await barDb.replaceBar([...next]);
    } catch (err) {
      console.error('Failed to save bar', err);
    }
  }

  async function toggleTag(tag: string, checked: boolean) {
    const next = new Set(owned);
    if (checked) {
      next.add(tag);
    } else {
      next.delete(tag);
    }
    await persistOwned(next);
  }

  function selectGroup(group: BarCatalogGroup) {
    const next = new Set(owned);
    for (const tag of getGroupTags(group)) {
      next.add(tag);
    }
    void persistOwned(next);
  }

  function clearGroup(group: BarCatalogGroup) {
    const next = new Set(owned);
    for (const tag of getGroupTags(group)) {
      next.delete(tag);
    }
    void persistOwned(next);
  }

  return (
    <>
      <InstallBanner />

      {storageBlocked && (
        <Warning>
          Your bar can’t be saved yet because open tabs are preventing a
          database update. Close all Sidecar tabs, then open this page again.
        </Warning>
      )}

      <BarSettingsPanel
        settings={settings}
        onChange={(partial) => {
          void persistSettings(partial);
        }}
      />

      <BarInventory
        owned={owned}
        onToggle={(tag, checked) => {
          void toggleTag(tag, checked);
        }}
        onSelectAll={() => {
          void persistOwned(new Set(allBarTags));
        }}
        onClearAll={() => {
          void persistOwned(new Set());
        }}
        onSelectGroup={selectGroup}
        onClearGroup={clearGroup}
      />

      {owned.size === 0 ? (
        <p>No results.</p>
      ) : (
        <>
          <ResultsHeading>
            {makeable.length} drink{makeable.length === 1 ? '' : 's'} you can
            make
          </ResultsHeading>
          {makeable.length > 0 ? (
            <DrinkList drinks={makeable} imageMap={imageMap} />
          ) : (
            <p>
              Nothing matches yet. Add more bottles, or browse the full{' '}
              <Link to="/drinks">drink list</Link>.
            </p>
          )}
        </>
      )}

    </>
  );
}
