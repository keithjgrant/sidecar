const sweetOrStiff = {
  key: 'sweet',
  prompt: 'sweet or dry?',
  options: [
    ['sweet', 'Sweet'],
    ['middle', 'Somewhere in between'],
    ['dry', 'Dry'],
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

export default sweetOrStiff;

function scoreDrink(drink, answer) {
  const sweetness = drink.sweetness || 2;
  let map;
  if (answer === 'sweet') {
    map = {
      3: 3,
      2: 0,
      1: -3,
    };
  } else if (answer === 'dry') {
    map = {
      3: -3,
      2: 0,
      1: 3,
    };
  } else {
    map = {
      3: 0,
      2: 3,
      1: 0,
    };
  }

  return map[sweetness];
}
