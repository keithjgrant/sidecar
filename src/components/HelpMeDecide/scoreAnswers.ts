import type { ScoredDrink } from './getWeightedRandom';
import type { DecideDrink, QuestionDef } from './types';

export const SCORE_CUTOFF = 3;

/**
 * Score drinks against answered Help Me Decide questions and drop weak matches.
 */
export function scoreAndCutoff(
  drinks: DecideDrink[],
  questions: QuestionDef[],
  answers: string[],
  cutoff: number = SCORE_CUTOFF,
): ScoredDrink[] {
  const scored = questions.reduce((acc, question, index) => {
    return question.score(acc, answers[index]);
  }, drinks);

  return (scored as ScoredDrink[]).filter((d) => d.score >= cutoff);
}
