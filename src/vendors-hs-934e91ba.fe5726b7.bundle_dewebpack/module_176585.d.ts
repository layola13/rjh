/**
 * Appends elements from a source array to the end of a target array.
 * 
 * This function mutates the target array by adding all elements from the source array
 * to its end, starting at the position equal to the target's original length.
 * 
 * @template T - The type of elements in both arrays
 * @param target - The array to which elements will be appended (mutated in place)
 * @param source - The array containing elements to append
 * @returns The modified target array with appended elements
 * 
 * @example
 * const arr1 = [1, 2, 3];
 * const arr2 = [4, 5, 6];
 * const result = appendArrayElements(arr1, arr2);
 * // result === arr1 === [1, 2, 3, 4, 5, 6]
 */
export declare function appendArrayElements<T>(
  target: T[], 
  source: readonly T[]
): T[];