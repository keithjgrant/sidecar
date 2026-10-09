import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'gatsby';
import styled from 'styled-components';
import Card from '../../components/Card';
import DrinkList from '../../components/DrinkList';
import { Checkbox } from '../../components/forms';
import { subscribeStorageBlocked } from '../../storage/db';
import barDb from '../../storage/bar';
import {
  BAR_CATALOG,
  DEFAULT_BAR,
  filterMakeableDrinks,
  formatBarLabel,
} from './myBarLogic';
import type { Drink } from '../../types';

const Intro = styled.p`
  margin: 0 0 1rem;
`;

const Warning = styled.p`
  margin: 0 0 1rem;
  padding: 0.75rem 0.9rem;
  border: 1px solid var(--card-border);
  border-radius: var(--border-radius);
  background: var(--gray-dark);
  color: var(--gray-8);
`;

const Group = styled.section`
  &:not(:first-child) {
    margin-top: 1.25rem;
  }
`;

const GroupHeading = styled.h2`
  margin: 0 0 0.6rem;
  font-size: 1.1rem;
  color: var(--gray-8);
`;

const CheckboxGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 0.55rem 1rem;

  @media (min-width: 500px) {
    grid-template-columns: 1fr 1fr;
  }

  @media (min-width: 800px) {
    grid-template-columns: 1fr 1fr 1fr;
  }
`;

const ResultsHeading = styled.h2`
  margin: 0 0 0.75rem;
  font-size: 1.15rem;
`;

interface MyBarProps {
  allDrinks: Drink[];
  imageMap: Record<string, unknown>;
}

export default function MyBar({ allDrinks, imageMap }: MyBarProps) {
  const [owned, setOwned] = useState<Set<string>>(() => new Set(DEFAULT_BAR));
  const [storageReady, setStorageReady] = useState(false);
  const [storageBlocked, setStorageBlocked] = useState(false);

  useEffect(() => subscribeStorageBlocked(setStorageBlocked), []);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const tags = await barDb.getBarTags();
        if (!cancelled) {
          setOwned(new Set(tags));
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
    () => filterMakeableDrinks(allDrinks, owned),
    [allDrinks, owned]
  );

  async function toggleTag(tag: string, checked: boolean) {
    setOwned((prev) => {
      const next = new Set(prev);
      if (checked) {
        next.add(tag);
      } else {
        next.delete(tag);
      }
      return next;
    });
    try {
      await barDb.setBarTag(tag, checked);
    } catch (err) {
      console.error('Failed to save bar tag', err);
    }
  }

  return (
    <>
      {storageBlocked && (
        <Warning>
          Your bar can’t be saved yet because open tabs are preventing a
          database update. Close all Sidecar tabs, then open this page again.
        </Warning>
      )}

      <Card>
        <Intro>
          What’s in your bar? Used on a <Link to="/drinks">Drinks</Link> page
          filter to show you which drinks you can make.
        </Intro>
        {BAR_CATALOG.map((group) => (
          <Group key={group.id}>
            <GroupHeading>{group.label}</GroupHeading>
            <CheckboxGrid>
              {group.tags.map((tag) => (
                <Checkbox
                  key={tag}
                  id={`bar-${tag}`}
                  checked={owned.has(tag)}
                  onChange={(checked) => {
                    void toggleTag(tag, checked);
                  }}
                  label={formatBarLabel(tag)}
                />
              ))}
            </CheckboxGrid>
          </Group>
        ))}
      </Card>

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

      <p className="footnote">
        {storageReady
          ? 'Your bar is saved locally in this browser. It will not carry over between browsers or devices.'
          : storageBlocked
            ? 'Local saving is paused until storage is available again.'
            : 'Connecting to local storage…'}{' '}
        <Link to="/installation">Install</Link> Sidecar for more durable
        storage.
      </p>
    </>
  );
}
