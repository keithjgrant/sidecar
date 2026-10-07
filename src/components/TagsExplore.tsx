import React, { useState, useEffect } from 'react';
import styled, { css } from 'styled-components';
import Card from './Card';
import { GridForm, GridFormLabel, ButtonGroup, TextInput } from './forms';
import CollapsibleSection from './CollapsibleSection';
import TagList from './TagList';
import { getParams, setParam } from '../util/qs';
import { filterTags, type TagKind } from '../util/tagFilters';

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

const KIND_OPTIONS: Array<TagKind | 'all'> = [
  'all',
  'spirit',
  'citrus',
  'technique',
  'other',
];

interface TagsExploreProps {
  tags: string[];
}

export default function TagsExplore({ tags }: TagsExploreProps) {
  const params = getParams();
  const [query, setQuery] = useState('');
  const [kind, setKind] = useState<TagKind | 'all'>('all');
  const filtersSet = !!(params.q || (params.kind && params.kind !== 'all'));

  useEffect(() => {
    if (params.q) {
      setQuery(decodeURIComponent(String(params.q)));
    }
    if (params.kind && KIND_OPTIONS.includes(String(params.kind) as TagKind | 'all')) {
      setKind(String(params.kind) as TagKind | 'all');
    }
  }, []);

  const filtered = filterTags(tags, query, kind);

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
              <GridFormLabel>Kind</GridFormLabel>
              <ButtonGroup
                name="kind"
                value={kind}
                options={KIND_OPTIONS}
                onChange={(value) => {
                  setKind(value as TagKind | 'all');
                  setParam('kind', value);
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
