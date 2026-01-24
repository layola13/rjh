/**
 * Checks if the current set is a subset of another set.
 * A set A is a subset of set B if all elements of A are contained in B.
 * 
 * @template T - The type of elements in the set
 * @param other - The set to compare against
 * @returns true if this set is a subset of the other set, false otherwise
 * 
 * @example
 * const setA = new Set([1, 2]);
 * const setB = new Set([1, 2, 3]);
 * isSubsetOf.call(setA, setB); // true
 */
declare function isSubsetOf<T>(this: Set<T>, other: Set<T> | Iterable<T>): boolean;

export = isSubsetOf;