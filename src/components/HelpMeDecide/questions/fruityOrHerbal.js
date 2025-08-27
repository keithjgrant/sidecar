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
  
  // Strong fruity indicators (±5) - perfect matches
  if (doListsIntersect(drink.tags, ['apple', 'pear', 'peach', 'cherry', 'blackberry', 'raspberry', 'strawberry', 'cranberry'])) {
    return unit * 5; // Perfect fruity match, no need to check further
  }
  
  // Strong herbal indicators (±5) - perfect matches
  if (doListsIntersect(drink.tags, ['green-chartreuse', 'yellow-chartreuse', 'benedictine', 'herbal'])) {
    return -unit * 5; // Perfect herbal match, no need to check further
  }
  
  // Since no perfect match found, evaluate other indicators
  
  // Citrus fruits are fruity but not as strong as other fruits (±4)
  if (doListsIntersect(drink.tags, ['lemon', 'lime', 'grapefruit', 'orange'])) {
    score += unit * 4; // Citrus is fruity but more tart than sweet fruit
  }
  
  // Gin-based indicators (±3-4) - gin is botanical/herbal
  if (drink.tags.includes('gin')) {
    score -= unit * 3; // Gin is herbal/botanical
  }
  if (drink.tags.includes('london-dry-gin')) {
    score -= unit * 4; // London dry gin is very botanical
  }
  
  // Liqueur indicators (±2-4)
  if (doListsIntersect(drink.tags, ['maraschino-liqueur', 'crème-de-cassis', 'chambord'])) {
    score += unit * 4; // Fruit liqueurs are very fruity
  }
  if (doListsIntersect(drink.tags, ['elderflower-liqueur', 'st-germain'])) {
    score -= unit * 3; // Elderflower is floral/herbal
  }
  if (doListsIntersect(drink.tags, ['amaretto', 'frangelico'])) {
    score += unit * 2; // Nut liqueurs have fruity sweetness
  }
  
  // Fresh herb and botanical indicators (±2-3)
  if (doListsIntersect(drink.tags, ['mint', 'basil', 'rosemary', 'thyme'])) {
    score -= unit * 3; // Fresh herbs are clearly herbal
  }
  if (doListsIntersect(drink.tags, ['lavender', 'sage'])) {
    score -= unit * 2; // Aromatic herbs
  }
  
  // Bitters and aperitifs (±1-2)
  if (doListsIntersect(drink.tags, ['campari', 'aperol'])) {
    score -= unit * 2; // Bitter herbal aperitifs
  }
  if (doListsIntersect(drink.tags, ['angostura', 'orange-bitters'])) {
    score -= unit * 1; // Herbal bitters
  }
  
  // Wine-based indicators (±1-2)
  if (doListsIntersect(drink.tags, ['red-wine', 'port'])) {
    score += unit * 2; // Wine often has fruity notes
  }
  if (drink.tags.includes('dry-vermouth')) {
    score -= unit * 2; // Dry vermouth is herbal
  }
  if (drink.tags.includes('sweet-vermouth')) {
    score += unit * 1; // Sweet vermouth has some fruit character
  }
  
  // Seasonal and fresh indicators (±1)
  if (doListsIntersect(drink.tags, ['watermelon', 'cucumber'])) {
    score += unit * 1; // Fresh, fruity (though cucumber is mild)
  }
  if (drink.tags.includes('floral')) {
    score -= unit * 1; // Floral leans herbal/botanical
  }
  
  // Drink family context (±1)
  if (drink.family === 'sour') {
    score += unit * 1; // Sours often feature fruit
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
