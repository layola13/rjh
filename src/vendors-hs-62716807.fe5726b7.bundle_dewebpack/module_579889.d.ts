/**
 * A utility for constructing className strings conditionally.
 * Combines multiple class values into a single space-separated string.
 */

/**
 * Valid input types for class name values
 */
type ClassValue = 
  | string 
  | number 
  | boolean 
  | undefined 
  | null 
  | ClassArray 
  | ClassDictionary;

/**
 * Array of class values
 */
interface ClassArray extends Array<ClassValue> {}

/**
 * Object mapping class names to boolean conditions
 */
interface ClassDictionary {
  [key: string]: unknown;
}

/**
 * Recursively converts a single class value into a string.
 * 
 * @param value - The class value to convert (string, number, array, or object)
 * @returns A space-separated string of class names
 */
declare function toVal(value: ClassValue): string;

/**
 * Constructs a className string from multiple arguments.
 * Accepts strings, numbers, arrays, and objects with conditional class names.
 * 
 * @param inputs - Any number of class values to combine
 * @returns A space-separated string of class names
 * 
 * @example
 * clsx('foo', 'bar'); // 'foo bar'
 * clsx('foo', { bar: true, baz: false }); // 'foo bar'
 * clsx(['foo', 'bar'], { baz: true }); // 'foo bar baz'
 */
declare function clsx(...inputs: ClassValue[]): string;

/**
 * Default export of the clsx function
 */
export default clsx;

/**
 * Named export of the clsx function
 */
export { clsx };