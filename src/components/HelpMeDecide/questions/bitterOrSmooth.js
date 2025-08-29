import { doListsIntersect } from '../util.js';

const bitterOrSmooth = {
  key: 'bitter',
  prompt: 'bitter or smooth?',
  options: [
    ['bitter', 'Bitter and complex'],
    ['smooth', 'Smooth and easy'],
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

export default bitterOrSmooth;

function scoreDrink(drink, answer) {
  if (!['bitter', 'smooth'].includes(answer)) {
    throw new Error(`Unknown answer: ${answer}`);
  }
  if (!drink) {
    throw new Error(`No drink given ${drink}`);
  }

  let score = 0;
  const unit = answer === 'bitter' ? 1 : -1;

  // Strong bitter indicators (±5) - perfect matches
  if (doListsIntersect(drink.tags, ['campari', 'bitter', 'fernet'])) {
    return unit * 5; // Perfect bitter match
  }

  // Strong smooth indicators (±5) - perfect matches
  if (doListsIntersect(drink.tags, ['cream', 'smooth', 'silky'])) {
    return -unit * 5; // Perfect smooth match
  }

  // Since no perfect match found, evaluate other indicators

  // Amaro and bitter liqueur indicators (±3-4)
  if (doListsIntersect(drink.tags, ['aperol', 'cynar', 'averna'])) {
    score += unit * 4; // Strong bitter aperitifs/amari
  }
  if (
    doListsIntersect(drink.tags, ['amaro', 'amaro-nonino', 'amaro-montenegro'])
  ) {
    score += unit * 3; // Amari are bitter but often balanced
  }
  if (doListsIntersect(drink.tags, ['suze', 'chartreuse'])) {
    score += unit * 3; // Herbal bitter liqueurs
  }

  // Smooth liqueur indicators (±3-4)
  if (doListsIntersect(drink.tags, ['baileys', 'kahlua', 'frangelico'])) {
    score -= unit * 4; // Very smooth cream/coffee liqueurs
  }
  if (
    doListsIntersect(drink.tags, ['amaretto', 'cointreau', 'grand-marnier'])
  ) {
    score -= unit * 2; // Smooth but can have some complexity
  }

  // Bitters and cocktail modifiers (±2-3)
  if (
    doListsIntersect(drink.tags, ['angostura', 'peychauds', 'orange-bitters'])
  ) {
    score += unit * 2; // Bitters add bitter complexity
  }
  if (drink.tags.includes('absinthe')) {
    score += unit * 3; // Absinthe has bitter herbal notes
  }

  // Vermouth indicators (±1-2)
  if (drink.tags.includes('dry-vermouth')) {
    score += unit * 2; // Dry vermouth has bitter herbal notes
  }
  if (drink.tags.includes('sweet-vermouth')) {
    score -= unit * 1; // Sweet vermouth is smoother but can have complexity
  }

  // Spirit-based indicators (±1-3)
  if (drink.tags.includes('mezcal')) {
    score += unit * 2; // Mezcal has earthy, complex character
  }
  if (drink.tags.includes('rye-whiskey')) {
    score += unit * 1; // Rye has spicy bite
  }
  if (drink.tags.includes('vodka')) {
    score -= unit * 3; // Vodka is smooth and neutral
  }
  if (drink.tags.includes('irish-whiskey')) {
    score -= unit * 2; // Irish whiskey is typically smooth
  }

  // Texture and preparation indicators (±1-2)
  if (doListsIntersect(drink.tags, ['egg', 'egg-white'])) {
    score -= unit * 3; // Eggs create smooth, silky texture
  }
  if (drink.tags.includes('stirred')) {
    score -= unit * 1; // Stirred drinks are often smoother
  }
  if (drink.tags.includes('shaken')) {
    score += unit * 1; // Shaking can add texture/complexity
  }

  // Family-based indicators (±1-2)
  if (drink.family === 'negroni' || drink.family === 'martini') {
    score += unit * 2; // These families often feature bitter elements
  }
  if (drink.family === 'flip') {
    score -= unit * 3; // Flips are rich and smooth
  }
  if (drink.family === 'sour') {
    score -= unit * 1; // Sours are balanced, not typically bitter
  }

  // Additional modifiers (±1)
  if (doListsIntersect(drink.tags, ['honey', 'maple-syrup'])) {
    score -= unit * 1; // Sweet elements smooth out drinks
  }
  if (drink.tags.includes('coffee')) {
    score += unit * 1; // Coffee adds bitter notes
  }

  // Cap the score at ±5
  return Math.max(-5, Math.min(5, score));
}
