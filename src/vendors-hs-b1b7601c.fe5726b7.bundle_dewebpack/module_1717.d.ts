/**
 * Higher-order function that creates a wrapper function.
 * This is a curried function implementation that takes a function and returns
 * another function that will apply the original function to its argument.
 * 
 * Common use case: Function composition, partial application, or creating
 * function decorators/wrappers.
 * 
 * @template T - The input type for the inner function
 * @template R - The return type of the handler function
 * @param handler - The function to be wrapped/applied
 * @returns A function that takes an argument and applies the handler to it
 * 
 * @example
 * const double = (x: number) => x * 2;
 * const wrapper = createFunctionWrapper(double);
 * wrapper(5); // Returns 10
 */
export default function createFunctionWrapper<T, R>(
  handler: (value: T) => R
): (value: T) => R {
  return function applyHandler(value: T): R {
    return handler(value);
  };
}