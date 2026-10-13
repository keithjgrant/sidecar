import React, { useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
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
  type BarCatalogGroup,
} from '../../config/barConfig';
import { getAllBarTags, getGroupTags } from './myBarUtils';

const Warning = styled.p`
  margin: 0 0 1rem;
  padding: 0.75rem 0.9rem;
  border: 1px solid var(--card-border);
  border-radius: var(--border-radius);
  background: var(--gray-dark);
  color: var(--gray-8);
`;

export default function MyBar() {
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
    </>
  );
}
