import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import DrinkItem from './DrinkItem';
import { ButtonGroup } from '../forms';
import AlphaIndex, { ALPHA_INDEX_GUTTER, LetterHeading } from '../AlphaIndex';
import { getParams, setParam } from '../../lib/qs';
import { sortDrinks } from '../../lib/drinkSort';
import { groupByAlphaLetter, sectionIdForLetter } from '../../lib/alphaGroup';
import type { Drink } from '../../types';
import type { DrinkItemProps } from './DrinkItem';

const ID_PREFIX = 'alpha-drink';

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

const AlphaList = styled.div<{ $withIndex?: boolean }>`
  padding-right: ${(props) => (props.$withIndex ? ALPHA_INDEX_GUTTER : '0')};
`;

const LetterSection = styled.section`
  margin-bottom: 1em;
`;

const Container = styled.div<{ $withIndex?: boolean }>`
  margin-bottom: var(--gap-size);
  padding-right: ${(props) => (props.$withIndex ? ALPHA_INDEX_GUTTER : '0')};
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
  const useAlpha = sortBy === 'name' && sorted.length > 0;
  const groups = useAlpha
    ? groupByAlphaLetter(sorted, (drink) => drink.title)
    : [];
  const letters = groups.map((group) => group.letter);
  const showIndex = letters.length >= 2;

  const renderDrink = (drink: Drink) => {
    const slug = drink.path.replace(/^\/drinks\//, '');
    return (
      <DrinkItem
        key={drink.path}
        drink={drink}
        image={imageMap[slug] as DrinkItemProps['image']}
      />
    );
  };

  return (
    <>
      <Container $withIndex={showIndex}>
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
      {useAlpha ? (
        <AlphaList $withIndex={showIndex}>
          {groups.map(({ letter, items }) => (
            <LetterSection
              key={letter}
              id={sectionIdForLetter(ID_PREFIX, letter)}
            >
              <LetterHeading>{letter}</LetterHeading>
              <List>{items.map(renderDrink)}</List>
            </LetterSection>
          ))}
          {showIndex ? <AlphaIndex letters={letters} idPrefix={ID_PREFIX} /> : null}
        </AlphaList>
      ) : (
        <List>{sorted.map(renderDrink)}</List>
      )}
    </>
  );
}
