/**
 * String.prototype.includes polyfill module
 * Provides includes method for String prototype
 */

/**
 * Checks if a string contains a specified substring
 * 
 * @param searchString - The string to search for within this string
 * @param position - The position within the string at which to begin searching (defaults to 0)
 * @returns true if the search string is found, false otherwise
 * 
 * @example
 * ```typescript
 * const str = "Hello World";
 * str.includes("World"); // true
 * str.includes("world"); // false (case-sensitive)
 * str.includes("Hello", 0); // true
 * str.includes("World", 7); // false (starts searching from position 7)
 * ```
 */
declare module 'Polyfill8' {
  export function includes(this: string, searchString: string, position?: number): boolean;
}