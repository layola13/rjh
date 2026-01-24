/**
 * Composes multiple functions from right to left.
 * 
 * @template T - The type of the innermost function's arguments
 * @template R - The return type of the composed function chain
 * 
 * @param {...Function[]} functions - Functions to compose. Each function is expected to take 
 *                                     the return value of the function that follows.
 * @returns A function that represents the composition of the input functions.
 *          When called, it applies the rightmost function first, then passes its result
 *          to the next function, continuing right-to-left.
 * 
 * @example
 * const addOne = (x: number) => x + 1;
 * const double = (x: number) => x * 2;
 * const composed = compose(addOne, double);
 * composed(3); // Returns 7 (double(3) = 6, then addOne(6) = 7)
 */
export default function compose<R>(...functions: Function[]): (...args: any[]) => R;

/**
 * Overload: No functions provided - returns identity function
 */
export default function compose(): <T>(arg: T) => T;

/**
 * Overload: Single function provided - returns that function
 */
export default function compose<F extends Function>(func: F): F;

/**
 * Overload: Two functions
 */
export default function compose<A, R>(
  func1: (a: A) => R,
  func2: (...args: any[]) => A
): (...args: any[]) => R;

/**
 * Overload: Three functions
 */
export default function compose<A, B, R>(
  func1: (b: B) => R,
  func2: (a: A) => B,
  func3: (...args: any[]) => A
): (...args: any[]) => R;

/**
 * Overload: Four functions
 */
export default function compose<A, B, C, R>(
  func1: (c: C) => R,
  func2: (b: B) => C,
  func3: (a: A) => B,
  func4: (...args: any[]) => A
): (...args: any[]) => R;

/**
 * Overload: Five or more functions
 */
export default function compose<R>(
  ...functions: Array<(arg: any) => any>
): (...args: any[]) => R;