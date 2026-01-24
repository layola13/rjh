/**
 * Creates a function that applies an array of arguments to a given function.
 * This is a curried implementation of Function.prototype.apply.
 * 
 * @example
 * const sum = (a: number, b: number) => a + b;
 * const applyArgs = createApplyFunction(sum);
 * applyArgs([1, 2]); // Returns 3
 */
declare function createApplyFunction<TArgs extends unknown[], TReturn>(
  fn: (...args: TArgs) => TReturn
): (args: TArgs) => TReturn;

export = createApplyFunction;