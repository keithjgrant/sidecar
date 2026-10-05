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

export const NUM_QUESTIONS = 2;

export const allQuestions: QuestionDef[] = [
  lightOrDark,
  sweetOrStiff,
  refreshingOrIntense,
  simpleOrElaborate,
  boozyOrMild,
  seasonalOrTimeless,
  citrusyOrRich,
  fruityOrHerbal,
  smokyOrClean,
  spicyOrMellow,
  bitterOrSmooth,
];

export function loadFromQuery(query: string): QuestionDef[] {
  const selected: QuestionDef[] = [];
  const indexes = query
    .split(',')
    .map((part) => part.trim())
    .filter((part) => part !== '')
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

export function selectQuestions(
  count: number = NUM_QUESTIONS,
): [QuestionDef[], number[]] {
  const selected: QuestionDef[] = [];
  const indexes: number[] = [];
  let attempts = 0;

  while (selected.length < count && attempts < 20) {
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

export function persistQuestionSelection(indexes: number[]): void {
  const url = new URL(window.location.href);
  url.searchParams.set('q', indexes.join(','));
  navigate(`${url.pathname}${url.search}`, { replace: true });
}
