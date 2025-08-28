const citrusyOrRich = {
  key: 'citrusy',
  prompt: 'citrusy or rich?',
  options: [
    ['citrusy', 'Citrusy and bright'],
    ['rich', 'Rich and warming'],
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

export default citrusyOrRich;

function scoreDrink(drink, answer) {
  if (!['citrusy', 'rich'].includes(answer)) {
    throw new Error(`Unknown answer: ${answer}`);
  }
  if (!drink) {
    throw new Error(`No drink given ${drink}`);
  }

  let score = 0;
  const unit = answer === 'citrusy' ? 1 : -1;

  // Strong citrus indicators (±5)
  if (doListsIntersect(drink.tags, ['lemon', 'lime', 'grapefruit', 'orange'])) {
    score += unit * 4;

    if (drink.tags.includes('meyer-lemon')) {
      score -= unit;
    }
  }

  // Strong rich indicators (±5)
  if (
    doListsIntersect(drink.tags, ['cream', 'egg', 'butter', 'butter-syrup'])
  ) {
    score -= unit * 4;
  }

  // Drink family indicators (±3-4)
  if (drink.family === 'sour' || drink.family === 'sidecar') {
    score += unit;
  } else if (drink.family === 'flip') {
    score -= unit;
  }

  // rich liqueurs/amari
  if (
    doListsIntersect(drink.tags, [
      'amaretto',
      'baileys',
      'kahlua',
      'averna',
      'amaro-nonino',
    ])
  ) {
    score -= unit * 2;
  }
  // herbal liqueurs
  if (doListsIntersect(drink.tags, ['benedictine', 'drambuie'])) {
    score -= unit;
  }

  if (drink.tags.includes('gin')) {
    score += unit;
  }
  if (drink.tags.includes('whiskey')) {
    if (drink.family === 'sour' || drink.family === 'sidecar') {
      score -= unit;
    } else {
      score -= unit * 3;
    }
  }
  if (drink.tags.includes('brandy')) {
    if (drink.family === 'sour' || drink.family === 'sidecar') {
      score -= unit;
    } else {
      score -= unit * 2;
    }
  }

  if (drink.tags.includes('hot')) {
    score -= unit * 2;
  }

  // rich syrups
  if (doListsIntersect(drink.tags, ['honey', 'maple-syrup', 'orgeat'])) {
    score -= unit;
  }
  // warming spices
  if (
    doListsIntersect(drink.tags, ['nutmeg', 'cinnamon', 'vanilla', 'coffee'])
  ) {
    score -= unit;
  }

  // bright herbs
  if (doListsIntersect(drink.tags, ['mint', 'basil'])) {
    score += unit;
  }

  // Cap the score at ±6 (beyond ±5 is rare)
  return Math.max(-6, Math.min(6, score));
}

function doListsIntersect(listA, listB) {
  for (var item of listA) {
    if (listB.includes(item)) {
      return true;
    }
  }
  return false;
}
