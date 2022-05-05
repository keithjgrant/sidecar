import React, { useMemo, useState, useEffect, useCallback } from 'react';
import { Link } from 'gatsby';
import getWeightedRandom, { byScore } from './getWeightedRandom';

const CUTOFF = 3;
const NUM_RESULTS = 3;

export default function Results({ drinks, questions, answers, imageMap }) {
  const results = useMemo(() => {
    const scored = questions.reduce((acc, question, index) => {
      return question.score(acc, answers[index]);
    }, drinks);
    return Object.values(scored).filter((d) => d.score >= CUTOFF);
  }, [answers]);
  // const sorted = useMemo(() =>
  //   Object.values(drinks).filter((d) => d.score >= CUTOFF)
  // );

  const [weightedSelection, setWeightedSelection] = useState([]);

  const selectWeightedSelection = useCallback(() => {
    setWeightedSelection(getWeightedRandom(results, NUM_RESULTS));
  }, []);

  useEffect(() => {
    selectWeightedSelection();
  }, []);

  return (
    <div>
      <ul>
        {weightedSelection.map((drink) => (
          <li key={drink.path}>
            <Link to={drink.path}>
              {drink.title} ({drink.score})
            </Link>
          </li>
        ))}
      </ul>
      <button onClick={selectWeightedSelection}>try again</button>
      <ul>
        {results.sort(byScore).map((drink) => (
          <li key={drink.path}>
            <Link to={drink.path}>
              {drink.title} ({drink.score})
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
