const seasonalOrTimeless = {
  key: 'seasonal',
  prompt: 'seasonal or timeless?',
  options: [
    ['seasonal', 'Something seasonal'],
    ['timeless', 'A timeless classic'],
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

export default seasonalOrTimeless;

function getCurrentSeason() {
  const now = new Date();
  const month = now.getMonth(); // 0-11

  // Northern hemisphere seasons
  if (month >= 2 && month <= 4) return 'spring'; // Mar, Apr, May
  if (month >= 5 && month <= 7) return 'summer'; // Jun, Jul, Aug
  if (month >= 8 && month <= 10) return 'fall'; // Sep, Oct, Nov
  return 'winter'; // Dec, Jan, Feb
}

function getSeasonalWeights(currentSeason) {
  const weights = {
    spring: { spring: 5, summer: 2, fall: -2, winter: -3 },
    summer: { summer: 5, spring: 2, fall: -2, winter: -3 },
    fall: { fall: 5, winter: 2, spring: -2, summer: -3 },
    winter: { winter: 5, fall: 2, summer: -3, spring: -2 },
  };
  return weights[currentSeason];
}

function scoreDrink(drink, answer) {
  if (!['seasonal', 'timeless'].includes(answer)) {
    throw new Error(`Unknown answer: ${answer}`);
  }
  if (!drink) {
    throw new Error(`No drink given ${drink}`);
  }

  let score = 0;

  if (answer === 'timeless') {
    // Classic cocktail is a strong timeless indicator
    if (drink.tags.includes('classic-cocktail')) {
      score += 5;
    }

    // Seasonal tags count against timeless
    if (doListsIntersect(drink.tags, ['winter', 'summer', 'fall', 'spring'])) {
      score -= 4;
    }

    // Hot drinks are less timeless
    if (drink.tags.includes('hot')) {
      score -= 3;
    }

    // Sidecar originals are less timeless than classics
    if (drink.tags.includes('sidecar-original')) {
      score -= 1;
    }

    return score;
  }

  // For seasonal selection, weight by current season
  const currentSeason = getCurrentSeason();
  const seasonWeights = getSeasonalWeights(currentSeason);

  // Apply seasonal weights based on drink tags
  const seasonalTags = ['spring', 'summer', 'fall', 'winter'];
  for (const season of seasonalTags) {
    if (drink.tags.includes(season)) {
      score += seasonWeights[season];
    }
  }

  // Additional seasonal scoring based on characteristics
  if (currentSeason === 'winter') {
    if (drink.tags.includes('hot')) score += 3; // Strong winter indicator
    if (doListsIntersect(drink.tags, ['egg', 'cream', 'nutmeg', 'cinnamon']))
      score += 1;
    if (drink.tags.includes('refreshing')) score -= 2; // Less appealing in winter
  } else if (currentSeason === 'summer') {
    if (drink.tags.includes('refreshing')) score += 3; // Strong summer indicator
    if (
      doListsIntersect(drink.tags, ['cucumber', 'mint', 'watermelon', 'citrus'])
    )
      score += 1;
    if (drink.tags.includes('hot')) score -= 4; // Very inappropriate in summer
    if (drink.booziness === 3) score -= 1; // Heavy drinks less appealing in heat
  } else if (currentSeason === 'fall') {
    if (
      doListsIntersect(drink.tags, [
        'apple',
        'pumpkin',
        'cinnamon',
        'nutmeg',
        'maple-syrup',
      ])
    )
      score += 2;
    if (drink.tags.includes('whiskey')) score += 1; // Whiskey drinks feel autumnal
  } else if (currentSeason === 'spring') {
    if (doListsIntersect(drink.tags, ['floral', 'elderflower', 'gin', 'light']))
      score += 1;
    if (drink.tags.includes('refreshing')) score += 2;
  }

  // Holiday-specific drinks - strong seasonal indicator
  if (doListsIntersect(drink.tags, ['christmas', 'holiday', 'thanksgiving'])) {
    score += currentSeason === 'winter' ? 4 : -2;
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
