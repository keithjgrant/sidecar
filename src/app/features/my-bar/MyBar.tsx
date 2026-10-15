import React, { useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import InstallBanner from '../../components/InstallBanner';
import { subscribeStorageBlocked } from '../../storage/db';
import { useBar } from '../../storage/bar';
import { useSettings } from '../../storage/settings';
import BarInventory from './BarInventory';
import BarSettingsPanel from './BarSettingsPanel';
import { type BarCatalogGroup } from '../../config/barConfig';
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
  const {
    tags,
    isLoading: barLoading,
    error: barError,
    replaceTags,
    setTag,
  } = useBar();
  const {
    settings,
    isLoading: settingsLoading,
    error: settingsError,
    updateSettings,
  } = useSettings();
  const [storageBlocked, setStorageBlocked] = useState(false);

  useEffect(() => subscribeStorageBlocked(setStorageBlocked), []);

  const owned = useMemo(() => new Set(tags), [tags]);
  const storageReady =
    !barLoading && !settingsLoading && !barError && !settingsError;
  const allBarTags = useMemo(() => getAllBarTags(), []);

  function selectGroup(group: BarCatalogGroup) {
    const next = new Set(tags);
    for (const tag of getGroupTags(group)) {
      next.add(tag);
    }
    void replaceTags([...next]);
  }

  function clearGroup(group: BarCatalogGroup) {
    const next = new Set(tags);
    for (const tag of getGroupTags(group)) {
      next.delete(tag);
    }
    void replaceTags([...next]);
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
        // Remount once storage resolves so startExpanded is initial-only
        // (empty bar → open) and later inventory changes cannot reopen it.
        key={storageReady ? 'ready' : 'pending'}
        settings={settings}
        startExpanded={storageReady && owned.size === 0}
        onChange={(partial) => {
          void updateSettings(partial);
        }}
      />

      <BarInventory
        owned={owned}
        onToggle={(tag, checked) => {
          void setTag(tag, checked);
        }}
        onSelectAll={() => {
          void replaceTags(allBarTags);
        }}
        onClearAll={() => {
          void replaceTags([]);
        }}
        onSelectGroup={selectGroup}
        onClearGroup={clearGroup}
      />
    </>
  );
}
