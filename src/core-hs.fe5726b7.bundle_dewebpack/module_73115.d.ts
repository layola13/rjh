/**
 * Object.is Polyfill
 * 
 * Determines whether two values are the same value.
 * This polyfill provides compatibility for environments that don't natively support Object.is.
 * 
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is
 */

/**
 * Compares two values for equality using the SameValue algorithm.
 * 
 * Differences from === operator:
 * - Object.is(NaN, NaN) returns true (=== returns false)
 * - Object.is(+0, -0) returns false (=== returns true)
 * 
 * @template T - The type of the first value
 * @template U - The type of the second value
 * @param value1 - The first value to compare
 * @param value2 - The second value to compare
 * @returns true if the values are the same value, false otherwise
 * 
 * @example
 * objectIs(25, 25);                 // true
 * objectIs('foo', 'foo');           // true
 * objectIs(NaN, NaN);               // true (unlike === which returns false)
 * objectIs(0, -0);                  // false (unlike === which returns true)
 * objectIs(+0, -0);                 // false
 * objectIs(null, null);             // true
 * objectIs(undefined, undefined);   // true
 * objectIs({}, {});                 // false (different object references)
 */
declare function objectIs<T, U>(value1: T, value2: U): boolean;

export = objectIs;