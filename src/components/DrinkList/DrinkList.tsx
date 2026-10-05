import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import DrinkItem from './DrinkItem';
import { ButtonGroup } from '../forms';
import { getParams, setParam } from '../../util/qs';
import { sortDrinks } from '../../util/drinkSort';
import type { Drink } from '../../types';
import type { DrinkItemProps } from './DrinkItem';

const List = styled.ul`
  margin: 0;
  padding-left: 0;
  list-style-type: none;

  @media (min-width: 30em) {
    display: grid;
    grid-gap: 1em;
    grid-template-columns: repeat(auto-fill, minmax(20em, 1fr));
  }
`;

const Container = styled.div`
  margin-bottom: var(--gap-size);
  display: flex;
  justify-content: flex-end;
  align-items: baseline;

  & > *:not(:first-child) {
    margin-left: var(--gap-size);
  }
`;

interface DrinkListProps {
  drinks: Drink[];
  imageMap: Record<string, unknown>;
}

export default function DrinkList({ drinks, imageMap }: DrinkListProps) {
  const params = getParams();

  const [sortBy, setSortBy] = useState('name');

  useEffect(() => {
    if (params.sort === 'date') {
      setSortBy('date');
    }
  }, []);

  const sorted = sortDrinks(drinks, sortBy);
  return (
    <>
      <Container>
        <div>Sort by</div>
        <ButtonGroup
          name="sort"
          value={sortBy}
          options={[
            ['name', 'name'],
            ['date', 'most recent'],
          ]}
          onChange={(value) => {
            setSortBy(value);
            setParam('sort', value);
          }}
        />
      </Container>
      {!sorted.length ? (
        <p style={{ padding: '0 1em' }}>No drinks matched your query</p>
      ) : null}
      <List>
        {sorted.map((drink) => {
          const slug = drink.path.replace(/^\/drinks\//, '');
          return (
            <DrinkItem key={drink.path} drink={drink} image={imageMap[slug] as DrinkItemProps['image']} />
          );
        })}
      </List>
    </>
  );
}
