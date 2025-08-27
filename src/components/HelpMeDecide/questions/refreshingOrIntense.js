const refreshingOrIntense = {
  key: 'refreshing',
  prompt: 'refreshing or intensely flavored?',
  options: [
    ['refreshing', 'Refreshing'],
    ['intense', 'Intense'],
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

export default refreshingOrIntense;

function scoreDrink(drink, answer) {
  if (!['refreshing', 'intense'].includes(answer)) {
    throw new Error(`Unknown answer: ${answer}`);
  }
  if (!drink) {
    throw new Error(`No drink given ${drink}`);
  }
  const unit = answer === 'refreshing' ? 1 : -1;

  // Strong refreshing indicator - perfect match
  if (drink.tags.includes('refreshing')) {
    return unit * 5;
  }

  let score = 0;

  // Drink family indicators
  if (drink.family === 'highball') {
    score += unit * 4; // Highballs are very refreshing
  }
  if (drink.family === 'sour') {
    score += unit * 2; // Sours are moderately refreshing
  }
  if (drink.family === 'martini') {
    score -= unit * 4; // Martinis are intense, not refreshing
  }
  if (drink.family === 'old fashioned') {
    score -= unit * 2; // Old fashioneds are intense
  }

  // Spirit-based indicators
  if (drink.tags.includes('gin')) {
    score += unit * 1; // Gin leans refreshing
  }
  if (drink.tags.includes('whiskey')) {
    score -= unit * 2; // Whiskey leans intense
  }
  if (drink.tags.includes('mezcal')) {
    score -= unit * 3; // Mezcal is very intense
  }

  // Booziness indicators
  if (drink.booziness === 1) {
    score += unit * 2; // Low alcohol is more refreshing
  } else if (drink.booziness === 3) {
    score -= unit * 2; // High alcohol is more intense
  }

  return score;
}
