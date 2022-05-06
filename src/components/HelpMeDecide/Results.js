import React, { useMemo, useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import ResultItem from './ResultItem';
import getWeightedRandom from './getWeightedRandom';

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

const CUTOFF = 3;
const NUM_RESULTS = 3;

export default function Results({ drinks, questions, answers, imageMap }) {
  const results = useMemo(() => {
    const scored = questions.reduce((acc, question, index) => {
      return question.score(acc, answers[index]);
    }, drinks);
    return Object.values(scored).filter((d) => d.score >= CUTOFF);
  }, [answers]);

  const [weightedSelection, setWeightedSelection] = useState([]);

  const selectWeightedSelection = useCallback(() => {
    setWeightedSelection(getWeightedRandom(results, NUM_RESULTS));
  }, [results]);

  useEffect(() => {
    selectWeightedSelection();
  }, [answers]);

  return (
    <div>
      <Header>
        <p>Try one of these:</p>
        <button className="button" onClick={selectWeightedSelection}>
          Re-roll
        </button>
      </Header>
      <ResultsList>
        {weightedSelection.map((drink) => {
          const slug = drink.path.replace(/^\/drinks\//, '');
          return (
            <ResultItem key={drink.path} drink={drink} image={imageMap[slug]} />
          );
        })}
      </ResultsList>
      {/* <ul>
        {results.sort(byScore).map((drink) => (
          <li key={drink.path}>
            {weightedSelection.includes(drink) ? '***' : null}
            {drink.title} ({drink.score})
          </li>
        ))}
      </ul> */}
    </div>
  );
}
