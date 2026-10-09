import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'gatsby';
import styled, { css } from 'styled-components';
import Card from '../../components/Card';
import CollapsibleSection from '../../components/CollapsibleSection';
import DrinkList from '../../components/DrinkList';
import { Checkbox } from '../../components/forms';
import { subscribeStorageBlocked } from '../../storage/db';
import barDb from '../../storage/bar';
import {
  BAR_CATALOG,
  DEFAULT_BAR,
  countOwnedInGroup,
  filterMakeableDrinks,
  formatBarLabel,
  getAllBarTags,
  getGroupTags,
  type BarCatalogGroup,
  type BarCatalogItem,
} from './myBarLogic';
import type { Drink } from '../../types';

const Intro = styled.p`
  margin: 0 0 0.75rem;
`;

const PageActions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem 1rem;
  margin-bottom: 1rem;
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
    margin-top: 0.75rem;
  }
`;

const SectionHeader = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  gap: 0.25rem 0.75rem;
`;

const SectionToggle = styled.button<{ $isExpanded: boolean }>`
  display: flex;
  align-items: baseline;
  gap: 0.5rem;
  flex: 1 1 auto;
  min-width: 12rem;
  margin: 0;
  padding: 0.35rem 0;
  border: 0;
  background: transparent;
  color: var(--gray-8);
  text-align: left;
  cursor: pointer;

  &:hover {
    color: var(--white);
  }
`;

const SectionTitle = styled.span<{ $isExpanded: boolean }>`
  position: relative;
  padding-right: 1.3em;
  font-size: 1.1rem;
  font-weight: var(--font-weight-bold, 600);

  &::after {
    content: '';
    position: absolute;
    top: 0.45em;
    right: 0;
    border: 0.35em solid transparent;
    border-left-color: currentColor;
    transform-origin: 0.2em center;
    transition: transform 0.2s var(--ease-out-cubic, ease);
  }

  ${(props) =>
    props.$isExpanded &&
    css`
      &::after {
        transform: rotate(90deg);
      }
    `}
`;

const SectionCount = styled.span`
  font-size: 0.9rem;
  font-weight: var(--font-weight-normal, 400);
  color: var(--gray-6, #8a8588);
`;

const SectionActions = styled.div`
  display: flex;
  gap: 0.65rem;
`;

const TextButton = styled.button`
  margin: 0;
  padding: 0;
  border: 0;
  background: transparent;
  color: var(--gray-6, #8a8588);
  font-size: 0.9rem;
  cursor: pointer;
  text-decoration: underline;
  text-underline-offset: 0.15em;

  &:hover {
    color: var(--white);
  }
`;

const SectionBody = styled.div`
  padding: 0.5rem 0 0.25rem;
`;

const CheckboxGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 0.55rem 1rem;
  align-items: start;

  @media (min-width: 500px) {
    grid-template-columns: 1fr 1fr;
  }

  @media (min-width: 800px) {
    grid-template-columns: 1fr 1fr 1fr;
  }
`;

/**
 * Independent columns (newspaper-style): each column packs tightly.
 * CSS Grid can't do this — row tracks are shared across columns, so a tall
 * family forces gaps beside shorter neighbors even with span/column-flow.
 */
const SpiritColumns = styled.div`
  columns: 1;
  column-gap: 1rem;

  @media (min-width: 500px) {
    columns: 2;
  }

  @media (min-width: 800px) {
    columns: 3;
  }
`;

const SpiritFamily = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.45rem;
  break-inside: avoid;
  -webkit-column-break-inside: avoid;
  page-break-inside: avoid;
  margin-bottom: 0.85rem;
`;

const NestedChildren = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  margin-left: 0.35rem;
  padding-left: 1.1rem;
  border-left: 1px solid var(--card-border);
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
  const [owned, setOwned] = useState<Set<string>>(
    () => new Set(DEFAULT_BAR),
  );
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
    [allDrinks, owned],
  );

  const allBarTags = useMemo(() => getAllBarTags(), []);

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

  function selectAll() {
    void persistOwned(new Set(allBarTags));
  }

  function clearAll() {
    void persistOwned(new Set());
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

  function renderCheckbox(tag: string, label: string) {
    return (
      <Checkbox
        key={tag}
        id={`bar-${tag}`}
        checked={owned.has(tag)}
        onChange={(checked) => {
          void toggleTag(tag, checked);
        }}
        label={label}
      />
    );
  }

  function renderItem(item: BarCatalogItem) {
    return (
      <SpiritFamily key={item.tag}>
        {renderCheckbox(item.tag, formatBarLabel(item.tag))}
        {item.children?.length ? (
          <NestedChildren>
            {item.children.map((child) =>
              renderCheckbox(child, formatBarLabel(child)),
            )}
          </NestedChildren>
        ) : null}
      </SpiritFamily>
    );
  }

  function renderGroupBody(group: BarCatalogGroup) {
    const hasNesting = group.items.some((item) => item.children?.length);
    if (hasNesting) {
      return <SpiritColumns>{group.items.map(renderItem)}</SpiritColumns>;
    }
    return (
      <CheckboxGrid>
        {group.items.map((item) =>
          renderCheckbox(item.tag, formatBarLabel(item.tag)),
        )}
      </CheckboxGrid>
    );
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
          filter to show you which drinks you can make. Common bar staples
          (bitters, ice, garnishes) aren’t tracked and are assumed available.
        </Intro>
        <PageActions>
          <TextButton type="button" onClick={selectAll}>
            Select all
          </TextButton>
          <TextButton type="button" onClick={clearAll}>
            Clear all
          </TextButton>
        </PageActions>
        {BAR_CATALOG.map((group) => {
          const selectedCount = countOwnedInGroup(group, owned);
          const totalCount = getGroupTags(group).length;
          return (
            <Group key={group.id}>
              <CollapsibleSection
                startExpanded={false}
                renderToggle={({ toggle, isExpanded }) => (
                  <SectionHeader>
                    <SectionToggle
                      type="button"
                      onClick={toggle}
                      $isExpanded={isExpanded}
                      aria-expanded={isExpanded}
                    >
                      <SectionTitle $isExpanded={isExpanded}>
                        {group.label}
                      </SectionTitle>
                      {!isExpanded && (
                        <SectionCount>
                          {selectedCount} of {totalCount} selected
                        </SectionCount>
                      )}
                    </SectionToggle>
                    <SectionActions>
                      <TextButton
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          selectGroup(group);
                        }}
                      >
                        Select all
                      </TextButton>
                      <TextButton
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          clearGroup(group);
                        }}
                      >
                        Clear
                      </TextButton>
                    </SectionActions>
                  </SectionHeader>
                )}
              >
                <SectionBody>{renderGroupBody(group)}</SectionBody>
              </CollapsibleSection>
            </Group>
          );
        })}
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
