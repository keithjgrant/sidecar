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

  // Ingredient count indicators (most important factor)
  if (drink.ingredients.length >= 6) {
    score += unit * 3; // Very elaborate
  } else if (drink.ingredients.length === 5) {
    score += unit * 2; // Moderately elaborate
  } else if (drink.ingredients.length === 4) {
    score += unit * 1; // Slightly elaborate
  } else if (drink.ingredients.length === 3) {
    score -= unit * 1; // Slightly simple
  } else if (drink.ingredients.length <= 2) {
    score -= unit * 3; // Very simple
  }

  // Instruction complexity (secondary factor)
  const stripped = drink.html.replace(/<[^>]*>/g, '');
  if (stripped.length > 300) {
    score += unit * 2; // Very elaborate instructions
  } else if (stripped.length > 200) {
    score += unit * 1; // Moderately elaborate instructions
  } else if (stripped.length < 80) {
    score -= unit * 2; // Very simple instructions
  } else if (stripped.length < 120) {
    score -= unit * 1; // Simple instructions
  }

  // Tag count as complexity indicator (tertiary factor)
  if (drink.tags.length > 8) {
    score += unit * 1; // Many tags suggest complexity
  } else if (drink.tags.length < 4) {
    score -= unit * 1; // Few tags suggest simplicity
  }

  // Cap the score at ±5
  return Math.max(-5, Math.min(5, score));
}
