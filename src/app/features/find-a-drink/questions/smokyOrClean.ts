import { doListsIntersect } from '../util';
import type { DecideDrink, QuestionDef, ScoredDecideDrink } from '../types';

const smokyOrClean: QuestionDef = {
  key: 'smoky',
  prompt: 'smoky or clean?',
  options: [
    ['smoky', 'Smoky'],
    ['clean', 'Clean and crisp'],
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

export default smokyOrClean;

function scoreDrink(drink: DecideDrink, answer: string): number {
  if (!['smoky', 'clean'].includes(answer)) {
    throw new Error(`Unknown answer: ${answer}`);
  }
  if (!drink) {
    throw new Error(`No drink given ${drink}`);
  }

  let score = 0;
  const unit = answer === 'smoky' ? 1 : -1;

  // Strong smoky indicators
  if (drink.tags.includes('smoky')) {
    return unit * 5;
  }

  // Strong clean indicators
  if (doListsIntersect(drink.tags, ['clean', 'crisp'])) {
    return -unit * 5;
  }

  if (doListsIntersect(drink.tags, ['scotch', 'mezcal'])) {
    score += unit * 4;
  }

  if (drink.family === 'sour') {
    score -= unit;
  }

  // Spirit-based indicators
  if (drink.tags.includes('gin')) {
    score -= unit * 2;
  }
  if (drink.tags.includes('london-dry-gin')) {
    score -= unit;
  }
  if (drink.tags.includes('white-rum')) {
    score -= unit * 2;
  }
  if (drink.tags.includes('tequila-blanco')) {
    score -= unit;
  }
  if (drink.tags.includes('tequila-reposado')) {
    score += unit;
  }
  if (drink.tags.includes('whiskey')) {
    score += unit;
  }

  // herbal liqueurs
  if (doListsIntersect(drink.tags, ['chartreuse', 'benedictine', 'drambuie'])) {
    score += unit;
  }
  // floral liqueurs
  if (doListsIntersect(drink.tags, ['elderflower-liqueur'])) {
    score -= unit;
  }

  if (drink.tags.includes('refreshing')) {
    score -= unit * 2;
  }

  // Cap the score at ±5
  return Math.max(-5, Math.min(5, score));
}
