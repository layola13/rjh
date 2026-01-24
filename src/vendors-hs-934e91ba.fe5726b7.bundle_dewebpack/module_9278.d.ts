/**
 * Creates a duplicate-free version of an array using iteratee for comparisons.
 * This is the base implementation for methods like `uniq` and `uniqBy`.
 * 
 * @param array - The array to inspect
 * @param iteratee - The iteratee invoked per element to generate the criterion for uniqueness
 * @param comparator - The comparator invoked to compare elements
 * @returns Returns the new duplicate free array
 * 
 * @example
 *