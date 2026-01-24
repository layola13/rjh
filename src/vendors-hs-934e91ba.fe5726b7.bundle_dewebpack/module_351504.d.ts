/**
 * Checks if a collection contains a specific element.
 * 
 * @param collection - The collection to search in (e.g., Set, Map, or any object with a 'has' method)
 * @param element - The element to check for existence in the collection
 * @returns True if the collection contains the element, false otherwise
 * 
 * @example
 * const mySet = new Set([1, 2, 3]);
 * hasElement(mySet, 2); // returns true
 * hasElement(mySet, 5); // returns false
 */
export function hasElement<T>(
  collection: { has(element: T): boolean },
  element: T
): boolean;

export default hasElement;