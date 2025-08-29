import { doListsIntersect, hasIngredientsContaining } from '../util.js';

const spicyOrMellow = {
  key: 'spicy',
  prompt: 'spicy or mellow?',
  options: [
    ['spicy', 'With some heat'],
    ['middle', 'Somewhere in between'],
    ['mellow', 'Nice and mellow'],
  ],
  score: (drinks, answer) => {
    const scores = [];
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

export default spicyOrMellow;

function scoreDrink(drink, answer) {
  if (!['spicy', 'middle', 'mellow'].includes(answer)) {
    throw new Error(`Unknown answer: ${answer}`);
  }
  if (!drink) {
    throw new Error(`No drink given ${drink}`);
  }

  let score = 0;
  const unit = answer === 'spicy' ? 1 : -1;

  // Strong spicy indicators
  if (
    doListsIntersect(drink.tags, [
      'spicy',
      'jalapeno',
      'habanero',
      'cayenne',
      'hot-sauce',
    ])
  ) {
    score = unit * 5;
  }

  // Strong mellow indicators
  if (doListsIntersect(drink.tags, ['mellow', 'smooth', 'creamy'])) {
    score = unit * -5;
  }

  if (score === 5 || score === -5) {
    if (answer === 'middle') {
      return 0;
    }
    return score;
  }

  // Spice-related ingredients
  if (doListsIntersect(drink.tags, ['black-pepper', 'white-pepper'])) {
    score += unit * 4;
  }
  if (drink.tags.includes('ginger')) {
    score += unit * 3;
  }
  if (
    doListsIntersect(drink.tags, ['cinnamon', 'nutmeg', 'allspice']) ||
    drink.garnish?.includes('nutmeg') ||
    drink.garnish?.includes('cinnamon')
  ) {
    score += unit * 1;
  }

  // Spirit-based indicators
  if (drink.tags.includes('rye-whiskey')) {
    score += unit * 1;
  }
  if (doListsIntersect(drink.tags, ['ancho-reyes'])) {
    score += unit * 4;
  }

  // Mellow spirit indicators
  if (drink.tags.includes('irish-whiskey')) {
    score -= unit;
  }
  if (doListsIntersect(drink.tags, ['cream', 'baileys'])) {
    score -= unit * 4;
  } else {
    // don't score eggs if cream also present
    if (doListsIntersect(drink.tags, ['egg', 'egg-white'])) {
      score -= unit * 2;
    }
  }

  // Preparation indicators
  if (drink.tags.includes('built')) {
    score += unit * 1;
  }
  if (drink.tags.includes('shaken')) {
    score -= unit * 1;
  }

  if (hasIngredientsContaining(drink.tags, ['angostura', 'bitters'])) {
    score += unit * 1;
  }

  if (drink.family === 'flip') {
    score -= unit * 2;
  }

  // Cap the score at ±5
  score = Math.max(-5, Math.min(5, score));
  if (answer === 'middle') {
    return 5 - Math.abs(score);
  }
  return score;
}
