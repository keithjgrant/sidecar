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
      3: 5, // Very sweet drinks are perfect matches
      2: 0, // Balanced drinks are neutral
      1: -4, // Dry drinks are poor matches
    };
  } else if (answer === 'dry') {
    map = {
      3: -4, // Sweet drinks are poor matches for dry preference
      2: 0,  // Balanced drinks are neutral
      1: 5,  // Very dry drinks are perfect matches
    };
  } else {
    map = {
      3: -1, // Very sweet is slightly off for "in between"
      2: 5,  // Balanced drinks are perfect for "in between"
      1: -1, // Very dry is slightly off for "in between"
    };
  }

  return map[sweetness];
}
