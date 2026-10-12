import React, { useState, useEffect } from 'react';
import { Link } from 'gatsby';
import styled from 'styled-components';
import Card from '../../components/Card';
import CollapseToggle from '../../components/CollapseToggle';
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
import BarFilterNotice from '../my-bar/BarFilterNotice';
import {
  useBarFilteredDrinks,
  FILTER_DRINKS,
} from '../my-bar/useBarFilteredDrinks';

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
  const filtersSet = !!(params.base || params.family || params.q);
  const { drinks: barFiltered, isFiltering } = useBarFilteredDrinks(
    drinks,
    FILTER_DRINKS,
  );

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

  const filtered = filterDrinks(barFiltered, base, family, query);
  return (
    <>
      <BarFilterNotice active={isFiltering} />
      <CollapsibleSection
        startExpanded={filtersSet}
        renderToggle={({ toggle, isExpanded }) => (
          <Controls>
            <CollapseToggle isExpanded={isExpanded} onClick={toggle}>
              Filter
            </CollapseToggle>
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
