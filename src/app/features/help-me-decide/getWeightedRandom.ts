import type { Drink } from '../../types';

export interface ScoredDrink extends Drink {
  score: number;
}

export default function getWeightedRandom(drinks: ScoredDrink[], numResults: number): ScoredDrink[] {
  const sorted = drinks.sort(byScore);
  if (sorted.length <= numResults) {
    return sorted;
  }

  const cumulativeWeights: number[] = [];
  sorted.forEach((drink, i) => {
    cumulativeWeights[i] = drink.score * 2 + (cumulativeWeights[i - 1] || 0);
  });

  const results: ScoredDrink[] = [];
  let attempts = 0;

  const cutoffs = getScoreBasedCutoffs(sorted, numResults);

  while (results.length < numResults && attempts < 100) {
    // make earlier selections from closer to top of list to ensure
    // at least one strong match result
    const tierIndex = Math.min(results.length, cutoffs.length - 1);
    const partialList = sorted.slice(0, cutoffs[tierIndex]);
    const selection = select(partialList, cumulativeWeights);

    if (selection && !results.find((d) => d.path === selection.path)) {
      results.push(selection);
    }

    attempts++;
  }

  return results.sort(byScore);
}

function select(drinks: ScoredDrink[], cumulativeWeights: number[]): ScoredDrink | undefined {
  const maxCumulative = cumulativeWeights[drinks.length - 1];
  const randomNumber = maxCumulative * Math.random();
  for (let i = 0; i < drinks.length; i++) {
    if (cumulativeWeights[i] >= randomNumber) {
      return drinks[i];
    }
  }
}

export function byScore(a: ScoredDrink, b: ScoredDrink): number {
  if (a.score > b.score) {
    return -1;
  }
  if (a.score < b.score) {
    return 1;
  }
  return 0;
}

function getScoreBasedCutoffs(sortedDrinks: ScoredDrink[], numResults: number): number[] {
  if (sortedDrinks.length <= numResults) {
    return Array(numResults).fill(sortedDrinks.length);
  }

  const targetPositions = [
    Math.floor(sortedDrinks.length * 0.33), // Target 1/3
    Math.floor(sortedDrinks.length * 0.67), // Target 2/3
    sortedDrinks.length, // Full list
  ];

  return targetPositions.map((target) => {
    if (target >= sortedDrinks.length) return sortedDrinks.length;

    // score of the drink at the target cutoff
    const scoreAtTarget = sortedDrinks[target].score;
    let cutoff = target;

    // Extend cutoff to include all drinks with same score
    while (
      cutoff < sortedDrinks.length &&
      sortedDrinks[cutoff].score === scoreAtTarget
    ) {
      cutoff++;
    }

    return cutoff;
  });
}
