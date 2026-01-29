/**
 * Function composition utility module
 * 
 * Provides utilities for composing multiple functions into a single function,
 * supporting both left-to-right and right-to-left composition patterns.
 */

/**
 * Composes multiple functions into a single function that applies them in sequence.
 * 
 * This utility creates a new function that, when called, executes the provided
 * functions from left to right (or right to left, depending on implementation),
 * passing the result of each function as the argument to the next.
 * 
 * The composition follows the mathematical notation: compose(f, g, h)(x) = h(g(f(x)))
 * 
 * @template T - The input type of the first function
 * @template R - The return type of the last function
 * @param fns - The functions to compose, in order of execution
 * @returns A new function that represents the composition of all input functions
 * 
 * @example
 * ```typescript
 * // Simple function composition
 * const add5 = (x: number) => x + 5;
 * const multiply2 = (x: number) => x * 2;
 * const subtract3 = (x: number) => x - 3;
 * 
 * const composed = compose(add5, multiply2, subtract3);
 * composed(10); // ((10 + 5) * 2) - 3 = 27
 * 
 * // String transformation pipeline
 * const trim = (s: string) => s.trim();
 * const uppercase = (s: string) => s.toUpperCase();
 * const addExclamation = (s: string) => s + '!';
 * 
 * const transform = compose(trim, uppercase, addExclamation);
 * transform('  hello  '); // "HELLO!"
 * 
 * // Type-safe composition with different types
 * const parseNumber = (s: string) => parseInt(s, 10);
 * const isEven = (n: number) => n % 2 === 0;
 * const checkEven = compose(parseNumber, isEven);
 * checkEven('42'); // true
 * ```
 */
declare function compose<T, R>(
  ...fns: Array<(arg: any) => any>
): (arg: T) => R;

/**
 * Composes multiple functions from right to left (mathematical composition order).
 * 
 * @template T - The input type
 * @template R - The return type
 * @param fns - The functions to compose
 * @returns A new composed function
 * 
 * @example
 * ```typescript
 * const add1 = (x: number) => x + 1;
 * const double = (x: number) => x * 2;
 * 
 * const f = pipe(add1, double);
 * f(5); // (5 + 1) * 2 = 12
 * ```
 */
declare function pipe<T, R>(
  ...fns: Array<(arg: any) => any>
): (arg: T) => R;

export { compose, pipe };