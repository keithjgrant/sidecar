// Shared utility functions for help-me-decide questions

/**
 * Check if any ingredient contains any of the search terms (case-insensitive)
 * @param {string[]} ingredients - Array of ingredient strings
 * @param {string[]} searchTerms - Array of terms to search for
 * @returns {boolean} - True if any ingredient contains any search term
 */
export function hasIngredientsContaining(ingredients, searchTerms) {
  if (!ingredients || !Array.isArray(ingredients)) {
    return false;
  }
  
  return ingredients.some(ingredient => {
    const ingredientLower = ingredient.toLowerCase();
    return searchTerms.some(term => ingredientLower.includes(term.toLowerCase()));
  });
}

/**
 * Check if two arrays have any common elements
 * @param {any[]} listA - First array
 * @param {any[]} listB - Second array
 * @returns {boolean} - True if arrays intersect
 */
export function doListsIntersect(listA, listB) {
  for (var item of listA) {
    if (listB.includes(item)) {
      return true;
    }
  }
  return false;
}
