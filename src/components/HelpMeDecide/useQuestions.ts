import { useState, useEffect } from 'react';
import { navigate } from 'gatsby';
import lightOrDark from './questions/lightOrDark';
import sweetOrStiff from './questions/sweetOrStiff';
import refreshingOrIntense from './questions/refreshingOrIntense';
import simpleOrElaborate from './questions/simpleOrElaborate';
import boozyOrMild from './questions/boozyOrMild';
import seasonalOrTimeless from './questions/seasonalOrTimeless';
import citrusyOrRich from './questions/citrusyOrRich';
import fruityOrHerbal from './questions/fruityOrHerbal';
import smokyOrClean from './questions/smokyOrClean';
import spicyOrMellow from './questions/spicyOrMellow';
import bitterOrSmooth from './questions/bitterOrSmooth';
import type { QuestionDef } from './types';

const NUM_QUESTIONS = 2;

const allQuestions: QuestionDef[] = [
  lightOrDark,
  sweetOrStiff,
  refreshingOrIntense,
  simpleOrElaborate,
  boozyOrMild,
  seasonalOrTimeless,
  citrusyOrRich,
  fruityOrHerbal,
  smokyOrClean,
  spicyOrMellow, // TODO: spicy or floral?
  bitterOrSmooth, // TODO: test balance
];

export default function useQuestions(): QuestionDef[] {
  const [questions, setQuestions] = useState<QuestionDef[]>([]);

  useEffect(() => {
    const url = new URL(window.location.href);
    const q = url.searchParams.get('q');
    if (q) {
      setQuestions(loadFromQuery(q));
      return;
    }

    const [selected, indexes] = selectQuestions();
    url.searchParams.set('q', indexes.join(','));
    navigate(`${url.pathname}${url.search}`, { replace: true });
    setQuestions(selected);
  }, []);

  return questions;
}

function loadFromQuery(query: string): QuestionDef[] {
  const selected: QuestionDef[] = [];
  const indexes = query
    .split(',')
    .map(Number)
    .filter((n) => !isNaN(n));
  indexes.forEach((index) => {
    const q = allQuestions[index];
    if (q) {
      selected.push(q);
    }
  });
  return selected;
}

function selectQuestions(): [QuestionDef[], number[]] {
  const selected: QuestionDef[] = [];
  const indexes: number[] = [];
  let attempts = 0;

  while (selected.length < NUM_QUESTIONS && attempts < 20) {
    const index = Math.floor(Math.random() * allQuestions.length);
    const q = allQuestions[index];
    if (!selected.includes(q)) {
      indexes.push(index);
      selected.push(q);
    }
    attempts++;
  }
  return [selected, indexes];
}
