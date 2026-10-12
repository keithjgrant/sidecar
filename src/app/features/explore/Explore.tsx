import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'gatsby';
import styled, { css } from 'styled-components';
import Card from '../../components/Card';
import {
  GridForm,
  GridFormLabel,
  ButtonGroup,
  TextInput,
} from '../../components/forms';
import CollapsibleSection from '../../components/CollapsibleSection';
import DrinkList from '../../components/DrinkList';
import { getParams, setParam } from '../../lib/qs';
import { filterDrinks, type DrinkWithFamily } from './drinkFilters';
import { BASE_SPIRITS } from '../../config/tagTaxonomy';
import { ALPHA_INDEX_GUTTER } from '../../components/AlphaIndex';
import barDb from '../../storage/bar';
import settingsDb, {
  DEFAULT_BAR_SETTINGS,
  type BarSettings,
} from '../../storage/settings';
import {
  filterMakeableDrinks,
  shouldFilterByBar,
} from '../my-bar/myBarLogic';

const Toggle = styled.button<{ $isExpanded?: boolean }>`
  position: relative;
  margin-left: 0.6rem;
  padding-right: 1.8em;

  &::after {
    content: '';
    position: absolute;
    top: 0.8em;
    right: 0.6em;
    border: 0.4em solid transparent;
    border-top-color: currentColor;
    transform-origin: center 0.2em;
  }

  ${(props) =>
    props.$isExpanded &&
    css`
      color: var(--gray-8);
      &::after {
        transform: rotate(180deg);
      }
    `}
`;

const Controls = styled.div`
  display: flex;

  & > *:not(:first-child) {
    margin-left: 0.6em;
  }
`;

interface ExploreProps {
  drinks: DrinkWithFamily[];
  imageMap: Record<string, unknown>;
}

export default function Explore({ drinks, imageMap }: ExploreProps) {
  const params = getParams();

  const [base, setBase] = useState('all');
  const [family, setFamily] = useState('all');
  const [query, setQuery] = useState('');
  const [owned, setOwned] = useState<string[]>([]);
  const [settings, setSettings] = useState<BarSettings>(DEFAULT_BAR_SETTINGS);
  const filtersSet = !!(params.base || params.family || params.q);

  useEffect(() => {
    if (params.base && params.base !== 'all') {
      setBase(String(params.base));
    }
    if (params.family && params.family !== 'all') {
      setFamily(decodeURIComponent(String(params.family)));
    }
    if (params.q) {
      setQuery(decodeURIComponent(String(params.q)));
    }
  }, []);

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

  const barFiltered = useMemo(() => {
    if (!shouldFilterByBar(settings.filterDrinksByBar, owned)) {
      return drinks;
    }
    return filterMakeableDrinks(drinks, owned, settings.substitutions);
  }, [drinks, owned, settings.filterDrinksByBar, settings.substitutions]);

  const filtered = filterDrinks(barFiltered, base, family, query);
  return (
    <>
      <CollapsibleSection
        startExpanded={filtersSet}
        renderToggle={({ toggle, isExpanded }) => (
          <Controls>
            <Toggle
              onClick={toggle}
              $isExpanded={isExpanded}
              className="button"
            >
              Filter
            </Toggle>
            <Link className="button" to="/help-me-decide">
              Help me decide
            </Link>
          </Controls>
        )}
      >
        <Card style={{ marginRight: ALPHA_INDEX_GUTTER }}>
          <GridForm
            onSubmit={(event) => {
              event.preventDefault();
            }}
          >
            <GridFormLabel props={{ htmlFor: 'drink-search' }}>
              Search
            </GridFormLabel>
            <TextInput
              id="drink-search"
              name="q"
              value={query}
              placeholder="Filter by name"
              onChange={(value) => {
                setQuery(value);
                setParam('q', value);
              }}
            />
            <GridFormLabel>Base Spirit</GridFormLabel>
            <ButtonGroup
              name="base"
              value={base}
              options={['all', ...BASE_SPIRITS]}
              onChange={(value) => {
                setBase(value);
                setParam('base', value);
              }}
            />
            <GridFormLabel>Drink family</GridFormLabel>
            <ButtonGroup
              name="family"
              value={family}
              options={[
                'all',
                'sour',
                'sidecar',
                'old fashioned',
                'martini',
                'highball',
                'flip',
              ]}
              onChange={(value) => {
                setFamily(value);
                setParam('family', value);
              }}
            />
          </GridForm>
        </Card>
      </CollapsibleSection>
      <DrinkList drinks={filtered} imageMap={imageMap} />
    </>
  );
}
