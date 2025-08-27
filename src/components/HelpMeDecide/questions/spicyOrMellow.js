const spicyOrMellow = {
  key: 'spicy',
  prompt: 'spicy or mellow?',
  options: [
    ['spicy', 'With some heat'],
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
  if (!['spicy', 'mellow'].includes(answer)) {
    throw new Error(`Unknown answer: ${answer}`);
  }
  if (!drink) {
    throw new Error(`No drink given ${drink}`);
  }
  
  let score = 0;
  const unit = answer === 'spicy' ? 1 : -1;
  
  // Strong spicy indicators (±5) - perfect matches
  if (doListsIntersect(drink.tags, ['spicy', 'jalapeño', 'habanero', 'cayenne', 'hot-sauce'])) {
    return unit * 5; // Perfect spicy match
  }
  
  // Strong mellow indicators (±5) - perfect matches  
  if (doListsIntersect(drink.tags, ['mellow', 'smooth', 'creamy'])) {
    return -unit * 5; // Perfect mellow match
  }
  
  // Since no perfect match found, evaluate other indicators
  
  // Spice-related ingredients (±3-4)
  if (doListsIntersect(drink.tags, ['black-pepper', 'white-pepper', 'ginger'])) {
    score += unit * 4; // Strong spicy indicators
  }
  if (doListsIntersect(drink.tags, ['cinnamon', 'nutmeg', 'allspice'])) {
    score += unit * 3; // Warming spices (less intense than hot peppers)
  }
  
  // Spirit-based indicators (±2-4)
  if (drink.tags.includes('rye-whiskey')) {
    score += unit * 3; // Rye has spicy character
  }
  if (drink.tags.includes('mezcal')) {
    score += unit * 2; // Mezcal has intensity/heat
  }
  if (doListsIntersect(drink.tags, ['ancho-reyes', 'fireball'])) {
    score += unit * 4; // Spicy liqueurs
  }
  
  // Mellow spirit indicators (±2-3)
  if (drink.tags.includes('irish-whiskey')) {
    score -= unit * 3; // Irish whiskey is typically mellow
  }
  if (doListsIntersect(drink.tags, ['cream', 'baileys'])) {
    score -= unit * 4; // Cream-based drinks are very mellow
  }
  if (drink.tags.includes('vodka')) {
    score -= unit * 2; // Vodka is neutral/mellow
  }
  
  // Preparation and temperature indicators (±1-3)
  if (drink.tags.includes('hot')) {
    score += unit * 2; // Hot drinks can enhance spice perception
  }
  if (drink.tags.includes('built')) {
    score += unit * 1; // Built drinks can be more intense
  }
  if (drink.tags.includes('shaken')) {
    score -= unit * 1; // Shaken drinks often smoother/more integrated
  }
  
  // Ingredient modifiers (±1-2)
  if (doListsIntersect(drink.tags, ['bitters', 'angostura'])) {
    score += unit * 1; // Bitters add complexity/bite
  }
  if (doListsIntersect(drink.tags, ['honey', 'simple-syrup', 'agave'])) {
    score -= unit * 1; // Sweet syrups mellow drinks
  }
  if (doListsIntersect(drink.tags, ['egg', 'egg-white'])) {
    score -= unit * 2; // Eggs create smooth, mellow texture
  }
  
  // Citrus can balance spice but also add brightness
  if (doListsIntersect(drink.tags, ['lime', 'lemon'])) {
    score -= unit * 1; // Citrus provides cooling balance
  }
  
  // Family-based indicators (±1)
  if (drink.family === 'flip') {
    score -= unit * 2; // Flips are rich and mellow
  }
  if (drink.family === 'sour') {
    score -= unit * 1; // Sours are balanced/mellowed by citrus
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
