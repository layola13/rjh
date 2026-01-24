/**
 * Performs a loose (abstract) inequality comparison between two values.
 * Uses JavaScript's != operator which performs type coercion before comparison.
 * 
 * @template T - Type of the first value
 * @template U - Type of the second value
 * @param e - The first value to compare
 * @param s - The second value to compare
 * @returns True if values are not equal after type coercion, false otherwise
 * 
 * @example
 *