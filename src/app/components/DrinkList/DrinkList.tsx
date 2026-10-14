import React from 'react';
import styled from 'styled-components';
import DrinkItem from './DrinkItem';
import AlphaIndex, { ALPHA_INDEX_GUTTER, LetterHeading } from '../AlphaIndex';
import { sortDrinks } from '../../lib/drinkSort';
import {
  groupByAlphaLetter,
  sectionIdForLetter,
  shouldUseAlphaIndex,
} from '../../lib/alphaGroup';
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

const AlphaList = styled.div`
  padding-right: ${ALPHA_INDEX_GUTTER};
`;

const LetterSection = styled.section`
  margin-bottom: 1em;
`;

interface DrinkListProps {
  drinks: Drink[];
  imageMap: Record<string, unknown>;
  /** Alphabetical with alpha index (default), or newest-first flat list. */
  sortBy?: 'name' | 'date';
}

export default function DrinkList({
  drinks,
  imageMap,
  sortBy = 'name',
}: DrinkListProps) {
  const sorted = sortDrinks(drinks, sortBy);
  const groups =
    sortBy === 'name'
      ? groupByAlphaLetter(sorted, (drink) => drink.title)
      : [];
  const letters = groups.map((group) => group.letter);
  const useAlpha =
    sortBy === 'name' && shouldUseAlphaIndex(sorted.length, letters.length);

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
      {!sorted.length ? (
        <p style={{ padding: '0 1em' }}>No drinks matched your query</p>
      ) : null}
      {useAlpha ? (
        <AlphaList>
          {groups.map(({ letter, items }) => (
            <LetterSection
              key={letter}
              id={sectionIdForLetter(ID_PREFIX, letter)}
            >
              <LetterHeading>{letter}</LetterHeading>
              <List>{items.map(renderDrink)}</List>
            </LetterSection>
          ))}
          <AlphaIndex letters={letters} idPrefix={ID_PREFIX} />
        </AlphaList>
      ) : (
        <List>{sorted.map(renderDrink)}</List>
      )}
    </>
  );
}
