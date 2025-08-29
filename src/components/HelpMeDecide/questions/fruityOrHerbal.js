import { hasIngredientsContaining, doListsIntersect } from '../util.js';

const fruityOrHerbal = {
  key: 'fruity',
  prompt: 'fruity or herbal?',
  options: [
    ['fruity', 'Fruity'],
    ['herbal', 'Herbal/botanical'],
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

export default fruityOrHerbal;

function scoreDrink(drink, answer) {
  if (!['fruity', 'herbal'].includes(answer)) {
    throw new Error(`Unknown answer: ${answer}`);
  }
  if (!drink) {
    throw new Error(`No drink given ${drink}`);
  }

  let score = 0;
  const unit = answer === 'fruity' ? 1 : -1;

  // Strong fruity indicator
  if (
    doListsIntersect(drink.tags, [
      'apple',
      'pear',
      'peach',
      'cherry',
      'blackberry',
      'raspberry',
      'strawberry',
      'cranberry',
      'fruity',
    ])
  ) {
    score += unit * 5;
  }

  // Strong herbal indicators
  if (
    doListsIntersect(drink.tags, [
      'green-chartreuse',
      'yellow-chartreuse',
      'benedictine',
      'herbal',
    ])
  ) {
    score -= unit * 5;
  }

  if (score === 5 || score === -5) {
    return score;
  }

  // citrus
  if (doListsIntersect(drink.tags, ['lemon', 'lime', 'grapefruit', 'orange'])) {
    score += unit * 4;
  }

  // Gin-based indicators (±3-4) - gin is botanical/herbal
  if (drink.tags.includes('gin')) {
    score -= unit * 3;
    if (drink.tags.includes('london-dry-gin')) {
      score -= unit;
    }
  }

  // fruity liqueur
  if (doListsIntersect(drink.tags, ['maraschino-liqueur', 'creme-de-cassis'])) {
    score += unit * 4;
  }
  // herbal liqueurs
  if (doListsIntersect(drink.tags, ['elderflower-liqueur'])) {
    score -= unit * 3;
  }
  // nutty liqueurs
  if (doListsIntersect(drink.tags, ['amaretto', 'frangelico'])) {
    score += unit * 2;
  }

  // herbs
  if (doListsIntersect(drink.tags, ['mint', 'basil', 'rosemary', 'thyme'])) {
    score -= unit * 3;
  }
  if (doListsIntersect(drink.tags, ['lavender', 'sage'])) {
    score -= unit * 2;
  }

  if (doListsIntersect(drink.tags, ['campari', 'aperol'])) {
    score -= unit * 2;
  }
  // Check for bitters in ingredients (not tags)
  if (hasIngredientsContaining(drink.ingredients, ['angostura', 'orange bitters', 'orange-bitters'])) {
    score -= unit * 1;
  }

  // wine & vermouth
  if (doListsIntersect(drink.tags, ['red-wine', 'port'])) {
    score += unit * 2;
  }
  if (drink.tags.includes('dry-vermouth')) {
    score -= unit * 2;
  }
  if (drink.tags.includes('sweet-vermouth')) {
    score += unit * 1;
  }

  // Seasonal and fresh indicators
  if (doListsIntersect(drink.tags, ['watermelon', 'cucumber'])) {
    score += unit * 1;
  }
  if (drink.tags.includes('floral')) {
    score -= unit * 1;
  }

  // if (drink.family === 'sour') {
  //   score += unit * 1;
  // }

  return score;
  // Cap the score at ±5
  return Math.max(-5, Math.min(5, score));
}

