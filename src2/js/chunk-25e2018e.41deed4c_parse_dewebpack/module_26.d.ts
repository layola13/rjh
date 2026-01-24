/**
 * Performs a strict inequality comparison between two values.
 * Uses the !== operator to check if two values are not equal in both value and type.
 * 
 * @template T - The type of the first value
 * @template U - The type of the second value
 * @param {T} first - The first value to compare
 * @param {U} second - The second value to compare
 * @returns {boolean} Returns true if the values are not strictly equal, false otherwise
 * 
 * @example
 * strictNotEqual(1, 2); // true
 * strictNotEqual(1, "1"); // true
 * strictNotEqual(1, 1); // false
 */
export function strictNotEqual<T, U>(first: T, second: U): boolean {
  return first !== second;
}