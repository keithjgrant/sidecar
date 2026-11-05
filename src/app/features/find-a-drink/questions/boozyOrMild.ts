import type { DecideDrink, QuestionDef, ScoredDecideDrink } from '../types';

const boozyOrMild: QuestionDef = {
  key: 'boozy',
  prompt: 'boozy or mild?',
  options: [
    ['boozy', 'Boozy'],
    ['middle', 'Somewhere in between'],
    ['mild', 'Mild'],
  ],
  score: (drinks, answer) => {
    const scores: ScoredDecideDrink[] = [];
    drinks.forEach((drink, i) => {
      const score = scoreDrink(drink, answer);
      scores[i] = {
        ...drink,
        score: drink.score ? drink.score + score : score,
      };
    });
    return scores;
  },
};

export default boozyOrMild;

function scoreDrink(drink: DecideDrink, answer: string): number {
  const booziness = drink.booziness || 2;

  let map;
  if (answer === 'boozy') {
    map = {
      3: 5,
      2: 2,
      1: -4,
    };
  } else if (answer === 'mild') {
    map = {
      3: -4,
      2: 2,
      1: 5,
    };
  } else {
    map = {
      3: -1,
      2: 5,
      1: -1,
    };
  }

  return map[booziness as keyof typeof map] ?? 0;
}
