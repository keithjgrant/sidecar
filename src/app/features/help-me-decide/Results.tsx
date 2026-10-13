import React, { useMemo, useState, useEffect, useCallback } from 'react';
import { Link } from 'gatsby';
import styled from 'styled-components';
import BarFilterNotice from '../my-bar/BarFilterNotice';
import ResultItem from './ResultItem';
import type { ResultImageProps } from './ResultImage';
import getWeightedRandom from './getWeightedRandom';
import type { ScoredDrink } from './getWeightedRandom';
import { scoreAndCutoff } from './scoreAnswers';
import type { DecideDrink, QuestionDef } from './types';

const Header = styled.div`
  margin-top: 1em;
  padding-top: 1em;
  border-top: 1px solid var(--gray-4);
  display: flex;
  align-items: baseline;

  & > button {
    margin-left: auto;
  }

  @media (min-width: 30em) {
    margin-top: 3em;
  }
`;

const EmptyMessage = styled.p`
  margin: 1em 0 0;
  padding-top: 1em;
  border-top: 1px solid var(--gray-4);

  @media (min-width: 30em) {
    margin-top: 3em;
  }
`;

const ResultsList = styled.ul`
  margin: 0;
  padding-left: 0;
  list-style-type: none;

  & > *:not(:first-child) {
    margin-top: 0.4rem;
  }

  @media (min-width: 30em) {
    display: grid;
    grid-gap: 1em;
    grid-template-columns: repeat(auto-fill, minmax(20em, 1fr));
    min-height: 19em;

    & > *:not(:first-child) {
      margin-top: 0;
    }
  }
`;

const NUM_RESULTS = 3;

interface ResultsProps {
  drinks: DecideDrink[];
  questions: QuestionDef[];
  answers: string[];
  imageMap: Record<string, unknown>;
  isFilteringByBar?: boolean;
}

export default function Results({
  drinks,
  questions,
  answers,
  imageMap,
  isFilteringByBar = false,
}: ResultsProps) {
  const results = useMemo(
    () => scoreAndCutoff(drinks, questions, answers),
    [drinks, questions, answers]
  );

  const [weightedSelection, setWeightedSelection] = useState<ScoredDrink[]>([]);

  const selectWeightedSelection = useCallback(() => {
    setWeightedSelection(getWeightedRandom(results, NUM_RESULTS));
  }, [results]);

  useEffect(() => {
    selectWeightedSelection();
  }, [selectWeightedSelection]);

  if (results.length === 0) {
    return (
      <EmptyMessage>
        No matches. Try different answers
        {isFilteringByBar ? (
          <>
            {' '}
            or add to <Link to="/my-bar">your bar</Link>
          </>
        ) : null}
        .
      </EmptyMessage>
    );
  }

  return (
    <div>
      <Header>
        <p>Try one of these:</p>
        <button className="button" onClick={selectWeightedSelection}>
          Re-roll
        </button>
      </Header>
      <BarFilterNotice active={isFilteringByBar} />
      <ResultsList>
        {weightedSelection.map((drink) => {
          const slug = drink.path.replace(/^\/drinks\//, '');
          return (
            <ResultItem
              key={drink.path}
              drink={drink}
              image={imageMap[slug] as ResultImageProps['imageData']}
            />
          );
        })}
      </ResultsList>
    </div>
  );
}
