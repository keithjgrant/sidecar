const simpleOrElaborate = {
  key: 'simple',
  prompt: 'simple or elaborate?',
  options: [
    ['simple', 'Simple'],
    ['elaborate', 'Elaborate'],
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

export default simpleOrElaborate;

function scoreDrink(drink, answer) {
  let score = 0;
  const unit = answer === 'elaborate' ? 1 : -1;

  if (drink.tags.includes('built')) {
    score -= unit * 2;
  }

  // Ingredient count indicators
  if (drink.ingredients.length >= 6) {
    score += unit * 3;
  } else if (drink.ingredients.length === 5) {
    score += unit * 2;
  } else if (drink.ingredients.length === 4) {
    score += unit * 1;
  } else if (drink.ingredients.length === 3) {
    score -= unit * 1;
  } else if (drink.ingredients.length <= 2) {
    score -= unit * 3;
  }

  // Instruction complexity
  const stripped = drink.html.replace(/<[^>]*>/g, '');
  if (stripped.length > 300) {
    score += unit * 2;
  } else if (stripped.length > 200) {
    score += unit * 1;
  } else if (stripped.length < 80) {
    score -= unit * 2;
  } else if (stripped.length < 120) {
    score -= unit * 1;
  }

  return Math.max(-5, Math.min(5, score));
}
