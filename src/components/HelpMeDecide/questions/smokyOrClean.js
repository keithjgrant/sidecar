import { doListsIntersect } from '../util.js';

const smokyOrClean = {
  key: 'smoky',
  prompt: 'smoky or clean?',
  options: [
    ['smoky', 'Smoky'],
    ['clean', 'Clean and crisp'],
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

export default smokyOrClean;

function scoreDrink(drink, answer) {
  if (!['smoky', 'clean'].includes(answer)) {
    throw new Error(`Unknown answer: ${answer}`);
  }
  if (!drink) {
    throw new Error(`No drink given ${drink}`);
  }
  
  let score = 0;
  const unit = answer === 'smoky' ? 1 : -1;
  
  // Strong smoky indicators (±5) - perfect matches
  if (doListsIntersect(drink.tags, ['mezcal', 'smoky', 'smokey'])) {
    return unit * 5; // Perfect smoky match
  }
  
  // Peaty/Islay Scotch is also a perfect smoky match (±5)
  if (drink.tags.includes('scotch') && doListsIntersect(drink.tags, ['peaty', 'islay'])) {
    return unit * 5; // Perfect smoky match for peaty Scotch
  }
  
  // Strong clean indicators (±5) - perfect matches  
  if (doListsIntersect(drink.tags, ['vodka', 'clean', 'crisp'])) {
    return -unit * 5; // Perfect clean match
  }
  
  // Since no perfect match found, evaluate other indicators
  
  // Regular Scotch (without peaty indicators) is moderately smoky
  if (drink.tags.includes('scotch')) {
    score += unit * 3; // Regular scotch has some smokiness/character
  }
  
  // Spirit-based indicators (±2-4)
  if (drink.tags.includes('gin')) {
    score -= unit * 3; // Gin is clean and botanical
  }
  if (drink.tags.includes('london-dry-gin')) {
    score -= unit * 4; // London dry gin is very clean
  }
  if (drink.tags.includes('white-rum')) {
    score -= unit * 3; // White rum is clean
  }
  if (drink.tags.includes('silver-tequila') || drink.tags.includes('tequila-blanco')) {
    score -= unit * 3; // Blanco tequila is clean
  }
  if (drink.tags.includes('tequila-reposado')) {
    score += unit * 1; // Aged tequila has more character
  }
  
  // Whiskey indicators (±1-2)
  if (drink.tags.includes('rye-whiskey')) {
    score += unit * 2; // Rye has spicy, complex character
  }
  if (drink.tags.includes('bourbon')) {
    score += unit * 2; // Bourbon has richness/character
  }
  if (drink.tags.includes('irish-whiskey')) {
    score -= unit * 1; // Irish whiskey is typically smoother/cleaner
  }
  
  // Liqueur and modifier indicators (±1-2)
  if (doListsIntersect(drink.tags, ['chartreuse', 'benedictine', 'drambuie'])) {
    score += unit * 2; // Complex herbal liqueurs add character
  }
  if (doListsIntersect(drink.tags, ['elderflower-liqueur', 'st-germain'])) {
    score -= unit * 2; // Clean floral liqueurs
  }
  
  // Technique and preparation indicators (±1)
  if (drink.tags.includes('stirred')) {
    score -= unit * 1; // Stirred drinks are often cleaner
  }
  if (drink.tags.includes('built')) {
    score += unit * 1; // Built drinks can be more rustic/smoky
  }
  
  // Additional clean indicators (±1)
  if (drink.tags.includes('refreshing')) {
    score -= unit * 2; // Refreshing drinks are clean/crisp
  }
  
  // Cap the score at ±5
  return Math.max(-5, Math.min(5, score));
}

