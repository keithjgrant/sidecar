export default function getWeightedRandom(drinks, numResults) {
  const sorted = drinks.sort(byScore);
  if (sorted.length <= numResults) {
    return sorted;
  }

  const cumulativeWeights = [];
  sorted.forEach((drink, i) => {
    cumulativeWeights[i] = drink.score * 2 + (cumulativeWeights[i - 1] || 0);
  });

  const results = [];
  let attempts = 0;

  while (results.length < numResults && attempts < 100) {
    // make earlier selections from closer to top of list to ensure
    // at least one strong match result
    const partialList = getPartialList(sorted, results.length + 1, numResults);
    const selection = select(partialList, cumulativeWeights);

    if (!results.find((d) => d.path === selection.path)) {
      results.push(selection);
    }

    attempts++;
  }

  return results.sort(byScore);
}

function select(drinks, cumulativeWeights) {
  const maxCumulative = cumulativeWeights[drinks.length - 1];
  const randomNumber = maxCumulative * Math.random();
  for (let i = 0; i < drinks.length; i++) {
    if (cumulativeWeights[i] >= randomNumber) {
      return drinks[i];
    }
  }
}

export function byScore(a, b) {
  if (a.score > b.score) {
    return -1;
  }
  if (a.score < b.score) {
    return 1;
  }
  if (a.score === b.score) {
    return 0;
  }
}

function getPartialList(allItems, portion, numPortions) {
  const numItems = Math.round((allItems.length * portion) / numPortions);
  return allItems.slice(0, numItems);
}
