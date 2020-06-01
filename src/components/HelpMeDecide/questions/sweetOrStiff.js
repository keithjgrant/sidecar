const lightOrDark = {
  prompt: 'Brown spirit or clear spirit?',
  options: [
    ['light', 'Brown'],
    ['dark', 'Clear'],
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

export default lightOrDark;

function scoreDrink(drink, answer) {
  //
}
