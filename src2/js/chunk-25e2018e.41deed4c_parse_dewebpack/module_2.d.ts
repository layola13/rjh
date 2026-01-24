/**
 * Strict equality comparison function
 * Compares two values using the strict equality operator (===)
 * 
 * @template T - The type of the first value
 * @template U - The type of the second value
 * @param first - The first value to compare
 * @param second - The second value to compare
 * @returns True if both values are strictly equal, false otherwise
 */
declare function strictEqual<T, U>(first: T, second: U): boolean;

export default strictEqual;