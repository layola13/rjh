/**
 * Checks if a value is empty.
 * 
 * A value is considered empty if it is:
 * - null or undefined
 * - An array-like object (array, string, arguments, buffer, typed array) with length 0
 * - A Map or Set with size 0
 * - An object with no enumerable own properties
 * 
 * @param value - The value to check
 * @returns Returns true if the value is empty, else false
 * 
 * @example
 * isEmpty(null) // => true
 * isEmpty([]) // => true
 * isEmpty({}) // => true
 * isEmpty('') // => true
 * isEmpty([1, 2, 3]) // => false
 * isEmpty({ a: 1 }) // => false
 */
export declare function isEmpty(value: unknown): boolean;