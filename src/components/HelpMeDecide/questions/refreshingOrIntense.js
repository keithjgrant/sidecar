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
  switch (drink.family) {
    case 'highball':
      score += unit * 3;
      break;
    case 'sour':
    case 'sidecar':
      score += unit * 2;
      break;
    case 'martini':
      score -= unit * 3;
      break;
    case 'old fashioned':
      score -= unit * 2;
      break;
  }

  // Spirit-based indicators
  if (drink.tags.includes('gin')) {
    score += unit * 1;
  }
  if (drink.tags.includes('whiskey')) {
    score -= unit * 1;
  }
  if (drink.tags.includes('mezcal')) {
    score -= unit * 1;
  }
  if (drink.tags.includes('dark-rum')) {
    score -= unit * 2;
  }

  // Booziness indicators
  if (drink.booziness === 1) {
    score += unit * 2;
  } else if (drink.booziness === 3) {
    score -= unit * 2;
  }

  if (drink.tags.includes('hot') && answer === 'refreshing') {
    return Math.min(score, -1);
  }

  return score;
}
