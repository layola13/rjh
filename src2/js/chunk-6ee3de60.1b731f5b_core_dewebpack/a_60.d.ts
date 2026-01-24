/**
 * Compose utility functions for function composition
 * Allows chaining multiple transformations together
 */

/**
 * Identity function that returns its input unchanged
 * @template T - The type of the input value
 * @param value - The value to return
 * @returns The same value unchanged
 */
export declare function identity<T>(value: T): T;

/**
 * Composes multiple functions into a single function.
 * Functions are applied from right to left (last to first).
 * 
 * @template T - The input type
 * @template R - The return type
 * @param {...Array<Function>} functions - Functions to compose
 * @returns A composed function that applies all functions in sequence
 * 
 * @example
 * const addOne = (x: number) => x + 1;
 * const double = (x: number) => x * 2;
 * const composed = compose(double, addOne);
 * composed(5); // Returns 12 (5 + 1 = 6, 6 * 2 = 12)
 */
export declare function compose<T = any, R = T>(...functions: Array<(arg: any) => any>): (input: T) => R;

/**
 * Internal implementation that handles the composition logic.
 * 
 * @template T - The input type
 * @template R - The return type
 * @param functions - Array of functions to compose
 * @returns A composed function or identity function if array is empty
 */
export declare function composeInternal<T = any, R = T>(
  functions: Array<(arg: any) => any>
): (input: T) => R;