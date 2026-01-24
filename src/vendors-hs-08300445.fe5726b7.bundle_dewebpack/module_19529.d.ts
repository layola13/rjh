/**
 * Deep equality comparison utility
 * 
 * Performs a shallow equality check for objects and handles special cases
 * like NaN comparison and +0/-0 distinction.
 */

/**
 * Checks if two values are strictly equal, with special handling for:
 * - NaN values (NaN === NaN returns true)
 * - +0 and -0 distinction (treated as different)
 * 
 * @param value1 - First value to compare
 * @param value2 - Second value to compare
 * @returns True if values are equal according to the special rules
 */
declare function is(value1: unknown, value2: unknown): boolean;

/**
 * Performs a shallow equality comparison between two values.
 * 
 * For primitive values, uses the `is()` function for comparison.
 * For objects, compares all own enumerable properties shallowly.
 * 
 * @param objA - First value to compare
 * @param objB - Second value to compare
 * @returns True if both values are shallowly equal
 * 
 * @example
 *