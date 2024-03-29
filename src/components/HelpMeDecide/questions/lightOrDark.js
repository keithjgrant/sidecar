const lightOrDark = {
  key: 'light',
  prompt: 'with a brown spirit or a clear spirit?',
  options: [
    ['brown', 'Brown'],
    ['clear', 'Clear'],
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

export default lightOrDark;

function scoreDrink(drink, answer) {
  if (!['brown', 'clear'].includes(answer)) {
    throw new Error(`Unknown answer: ${answer}`);
  }
  if (!drink) {
    throw new Error(`No drink given ${drink}`);
  }
  let score = 0;
  const unit = answer === 'brown' ? -1 : 1;
  if (doListsIntersect(drink.tags, ['gin', 'vodka', 'mezcal', 'white-rum'])) {
    score += unit * 4;
  }
  if (
    doListsIntersect(drink.tags, [
      'whiskey',
      'brandy',
      'aged-rum',
      'tequila-reposado',
    ])
  ) {
    score -= unit * 4;
  }
  if (score === 4 || score === -4) {
    return score;
  }
  if (drink.tags.includes('tequila')) {
    score += 1;
  }
  if (doListsIntersect(drink.tags, ['dry-vermouth', 'blanc-vermouth'])) {
    score += unit;
  }
  if (drink.tags.includes('sweet-vermouth')) {
    score -= unit;
  }
  return score;
}

function doListsIntersect(listA, listB) {
  for (var item of listA) {
    if (listB.includes(item)) {
      return true;
    }
  }
  return false;
}
