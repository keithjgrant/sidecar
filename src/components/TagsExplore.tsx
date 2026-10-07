import React, { useState, useEffect } from 'react';
import styled, { css } from 'styled-components';
import Card from './Card';
import { GridForm, GridFormLabel, TextInput } from './forms';
import CollapsibleSection from './CollapsibleSection';
import TagList from './TagList';
import { getParams, setParam } from '../util/qs';
import { filterTags } from '../util/tagFilters';

const FilterBar = styled.div`
  margin-bottom: var(--gap-size);
`;

const Toggle = styled.button<{ $isExpanded?: boolean }>`
  position: relative;
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

interface TagsExploreProps {
  tags: string[];
}

export default function TagsExplore({ tags }: TagsExploreProps) {
  const params = getParams();
  const [query, setQuery] = useState('');
  const filtersSet = !!params.q;

  useEffect(() => {
    if (params.q) {
      setQuery(decodeURIComponent(String(params.q)));
    }
  }, []);

  const filtered = filterTags(tags, query);

  return (
    <>
      <FilterBar>
        <CollapsibleSection
          startExpanded={filtersSet}
          renderToggle={({ toggle, isExpanded }) => (
            <Toggle onClick={toggle} $isExpanded={isExpanded} className="button">
              Filter
            </Toggle>
          )}
        >
          <Card>
            <GridForm
              onSubmit={(event) => {
                event.preventDefault();
              }}
            >
              <GridFormLabel props={{ htmlFor: 'tag-search' }}>Search</GridFormLabel>
              <TextInput
                id="tag-search"
                name="q"
                value={query}
                placeholder="Filter tags"
                onChange={(value) => {
                  setQuery(value);
                  setParam('q', value);
                }}
              />
            </GridForm>
          </Card>
        </CollapsibleSection>
      </FilterBar>
      {!filtered.length ? (
        <p style={{ padding: '0 1em' }}>No tags matched your query</p>
      ) : (
        <TagList tags={filtered} />
      )}
    </>
  );
}
