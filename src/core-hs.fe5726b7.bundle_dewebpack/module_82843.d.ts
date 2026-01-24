/**
 * Set symmetric difference operation
 * Returns elements that are in either set but not in both (XOR operation)
 * 
 * @module SetSymmetricDifference
 * @description Implements the symmetric difference algorithm for Set-like collections
 */

/**
 * Performs symmetric difference operation on a Set
 * Elements present in either the source set or target iterable, but not in both
 * 
 * @template T - The type of elements in the set
 * @param this - The source Set instance
 * @param other - An iterable to compute symmetric difference with
 * @returns A new Set containing the symmetric difference
 * 
 * @example
 * const setA = new Set([1, 2, 3]);
 * const setB = [2, 3, 4];
 * const result = symmetricDifference.call(setA, setB); // Set {1, 4}
 */
declare function symmetricDifference<T>(
  this: Set<T>,
  other: Iterable<T>
): Set<T>;

export = symmetricDifference;