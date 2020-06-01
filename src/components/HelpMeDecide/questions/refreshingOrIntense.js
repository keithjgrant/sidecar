const refreshingOrIntense = {
  prompt: 'Refreshing or intensely flavored?',
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
        score: drinks.score ? drinks.score + score : score,
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
  let score = 0;
  if (drink.tags.includes('refreshing')) {
    score += answer === 'refreshing' ? 3 : -3;
    return score;
  }
  const unit = answer === 'refreshing' ? 1 : -1;
  if (drink.family === 'highball') {
    score += unit * 2;
  }
  if (drink.family === 'sour') {
    score += unit;
  }
  if (drink.family === 'martini') {
    score -= unit * 2;
  }
  if (drink.tags.includes('gin')) {
    score += unit;
  }
  if (drink.tags.includes('whiskey')) {
    score -= unit;
  }
  if (drink.booziness === 1) {
    score += unit;
  } else if (drink.booziness === 3) {
    score -= unit;
  }

  if (score > 3) {
    console.debug(`${drink.path} scored ${answer} of ${score}`);
  }
  return score;
}
