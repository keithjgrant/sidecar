const simpleOrElaborate = {
  prompt: 'Simple or eloborate?',
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
  let unit = answer === 'elaborate' ? 1 : -1;

  if (drink.ingredients.length > 5) {
    score += unit;
  } else if (drink.ingredients.length < 4) {
    score -= unit;
  }

  const stripped = drink.html.replace(/<[^>]*>/g, '');
  if (stripped.length > 200) {
    score += unit;
  } else if (stripped.length < 100) {
    score -= unit;
  }

  if (drink.tags.length > 6) {
    score += unit;
  } else if (drink.tags.length < 5) {
    score -= unit;
  }

  if (score > 3) {
    console.debug(`${drink.path} scored ${answer} of ${score}`);
  }
  return score;
}
