import { doListsIntersect } from '../util.js';

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
  const isSouthernHemisphere = detectSouthernHemisphere();

  let season;

  // Northern hemisphere seasons
  if (month >= 2 && month <= 4) season = 'spring'; // Mar, Apr, May
  else if (month >= 5 && month <= 7) season = 'summer'; // Jun, Jul, Aug
  else if (month >= 8 && month <= 10) season = 'fall'; // Sep, Oct, Nov
  else season = 'winter'; // Dec, Jan, Feb

  // Flip seasons for southern hemisphere
  if (isSouthernHemisphere) {
    const seasonMap = {
      spring: 'fall',
      summer: 'winter',
      fall: 'spring',
      winter: 'summer',
    };
    season = seasonMap[season];
  }

  return season;
}

function getSeasonalWeights(currentSeason) {
  const weights = {
    spring: { spring: 5, summer: 2, fall: -2, winter: -3 },
    summer: { summer: 5, spring: 2, fall: -2, winter: -3 },
    fall: { fall: 5, winter: 2, spring: -3, summer: -3 },
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
    score = getTimelessScore(drink);
  } else {
    score = getSeasonalScore(drink);
  }

  return Math.max(-5, Math.min(5, score));
}


function getTimelessScore(drink) {
  let score = 0;

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
    score -= 2;
  }

  // Sidecar originals are less timeless than classics
  if (drink.tags.includes('sidecar-original')) {
    score -= 2;
  }

  return score;
}

function getSeasonalScore(drink) {
  let score = 0;

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
  switch (currentSeason) {
    case 'winter':
      if (drink.tags.includes('hot')) score += 3; // Strong winter indicator
      if (doListsIntersect(drink.tags, ['egg', 'cream', 'nutmeg', 'cinnamon']))
        score += 1;
      if (drink.tags.includes('refreshing')) score -= 2;
      break;

    case 'summer':
      if (drink.tags.includes('refreshing')) score += 3;
      if (
        doListsIntersect(drink.tags, [
          'cucumber',
          'mint',
          'watermelon',
          'citrus',
        ])
      )
        score += 1;
      if (drink.tags.includes('hot')) score -= 4;
      if (drink.booziness === 3) score -= 1;
      break;

    case 'spring':
      if (
        doListsIntersect(drink.tags, ['floral', 'elderflower', 'gin', 'light'])
      )
        score += 1;
      if (drink.tags.includes('refreshing')) score += 2;
      break;

    case 'fall':
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
      break;
  }

  // Holiday-specific drinks - strong seasonal indicator
  if (doListsIntersect(drink.tags, ['christmas', 'holiday', 'thanksgiving'])) {
    score += currentSeason === 'winter' ? 4 : -3;
  }

  return score;
}

function detectSouthernHemisphere() {
  // Try to detect hemisphere from timezone as a reasonable guess
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  // Southern hemisphere timezones (not exhaustive, but covers major regions)
  const southernTimezones = [
    'Australia/',
    'Pacific/Auckland',
    'Pacific/Fiji',
    'Antarctica/',
    'America/Argentina',
    'America/Sao_Paulo',
    'America/Santiago',
    'America/Lima',
    'Africa/Johannesburg',
    'Africa/Cape_Town',
    'Indian/Mauritius',
  ];

  return southernTimezones.some((tz) => timezone.startsWith(tz));
}
