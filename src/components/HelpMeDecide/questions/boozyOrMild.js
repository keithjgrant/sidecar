const boozyOrMild = {
  key: 'boozy',
  prompt: 'boozy or mild?',
  options: [
    ['boozy', 'Boozy'],
    ['middle', 'Somewhere in between'],
    ['mild', 'Mild'],
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

export default boozyOrMild;

function scoreDrink(drink, answer) {
  const booziness = drink.booziness || 2;

  let map;
  if (answer === 'boozy') {
    map = {
      3: 5,  // Very boozy drinks are perfect matches
      2: 2,  // Medium booziness is good but not perfect
      1: -4, // Mild drinks are poor matches
    };
  } else if (answer === 'mild') {
    map = {
      3: -4, // Very boozy drinks are poor matches for mild preference
      2: 2,  // Medium booziness is acceptable for mild
      1: 5,  // Very mild drinks are perfect matches
    };
  } else {
    map = {
      3: -1, // Very boozy is slightly off for "in between"
      2: 5,  // Medium booziness is perfect for "in between"
      1: -1, // Very mild is slightly off for "in between"
    };
  }

  return map[booziness];
}
