const citrusyOrRich = {
  key: 'citrusy',
  prompt: 'citrusy or rich and warming?',
  options: [
    ['citrusy', 'Citrusy and bright'],
    ['rich', 'Rich and warming'],
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

export default citrusyOrRich;

function scoreDrink(drink, answer) {
  if (!['citrusy', 'rich'].includes(answer)) {
    throw new Error(`Unknown answer: ${answer}`);
  }
  if (!drink) {
    throw new Error(`No drink given ${drink}`);
  }
  
  let score = 0;
  const unit = answer === 'citrusy' ? 1 : -1;
  
  // Strong citrus indicators (±5) - perfect matches
  if (doListsIntersect(drink.tags, ['lemon', 'lime', 'grapefruit', 'orange'])) {
    return unit * 5; // Perfect citrus match, no need to check further
  }
  
  // Strong rich indicators (±5) - perfect matches
  if (doListsIntersect(drink.tags, ['cream', 'egg', 'butter'])) {
    return -unit * 5; // Perfect rich match, no need to check further
  }
  
  // Since no perfect match found, evaluate other indicators
  
  // Drink family indicators (±3-4) - only matters if no strong ingredient tags
  if (drink.family === 'sour') {
    score += unit * 4; // Sours are very citrusy
  } else if (drink.family === 'flip') {
    score -= unit * 4; // Flips are very rich (egg-based)
  } else if (drink.family === 'old fashioned') {
    score -= unit * 3; // Old fashioneds are rich and warming
  } else if (drink.family === 'martini') {
    score += unit * 2; // Martinis lean citrusy/bright
  }
  
  // Ingredient-based indicators (±2-3)
  if (doListsIntersect(drink.tags, ['amaretto', 'baileys', 'kahlua'])) {
    score -= unit * 3; // Sweet liqueurs are rich
  }
  if (doListsIntersect(drink.tags, ['chartreuse', 'benedictine', 'drambuie'])) {
    score -= unit * 2; // Herbal liqueurs are rich/warming
  }
  if (doListsIntersect(drink.tags, ['campari', 'aperol'])) {
    score += unit * 2; // Bitter citrus aperitifs are bright
  }
  
  // Spirit-based indicators (±1-2)
  if (drink.tags.includes('gin')) {
    score += unit * 1; // Gin leans bright/citrusy
  }
  if (drink.tags.includes('whiskey')) {
    score -= unit * 2; // Whiskey is rich and warming
  }
  if (drink.tags.includes('brandy')) {
    score -= unit * 2; // Brandy is rich and warming
  }
  
  // Temperature and technique indicators (±1-3)
  if (drink.tags.includes('hot')) {
    score -= unit * 3; // Hot drinks are warming, not citrusy
  }
  if (drink.tags.includes('refreshing')) {
    score += unit * 2; // Refreshing drinks are often citrusy
  }
  
  // Additional rich indicators (±1)
  if (doListsIntersect(drink.tags, ['honey', 'maple-syrup', 'orgeat'])) {
    score -= unit * 1; // Rich syrups
  }
  if (doListsIntersect(drink.tags, ['nutmeg', 'cinnamon', 'vanilla'])) {
    score -= unit * 1; // Warming spices
  }
  
  // Additional citrusy/bright indicators (±1)
  if (doListsIntersect(drink.tags, ['mint', 'basil', 'cucumber'])) {
    score += unit * 1; // Fresh, bright ingredients
  }
  
  // Cap the score at ±5
  return Math.max(-5, Math.min(5, score));
}

function doListsIntersect(listA, listB) {
  for (var item of listA) {
    if (listB.includes(item)) {
      return true;
    }
  }
  return false;
}
