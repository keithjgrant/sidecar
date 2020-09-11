const boozyOrMild = {
  prompt: 'Boozy or mild?',
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
      3: 3,
      2: 1,
      1: -3,
    };
  } else if (answer === 'mild') {
    map = {
      3: -3,
      2: 1,
      1: 3,
    };
  } else {
    map = {
      3: 0,
      2: 3,
      1: 0,
    };
  }

  return map[booziness];
}
