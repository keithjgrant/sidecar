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
      3: 5,
      2: 0,
      1: -5,
    };
  } else if (answer === 'dry') {
    map = {
      3: -5,
      2: 0,
      1: 5,
    };
  } else {
    map = {
      3: -1,
      2: 5,
      1: -1,
    };
  }

  return map[sweetness];
}
