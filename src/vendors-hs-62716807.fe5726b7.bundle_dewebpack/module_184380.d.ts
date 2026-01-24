/**
 * Function.prototype.bind polyfill implementation
 * Provides a polyfill for the native bind method to ensure compatibility across environments
 * @module FunctionBindPolyfill
 */

/**
 * Bound function type that maintains the original function signature
 * @template TFunction - The original function type
 * @template TContext - The context (this) type to bind
 */
type BoundFunction<TFunction extends Function, TContext> = TFunction;

/**
 * Arguments tuple type helper
 */
type ArgumentsArray = readonly unknown[];

/**
 * Bind polyfill function signature
 * Creates a new function that, when called, has its this keyword set to the provided value
 * 
 * @template TContext - The value to be passed as the this parameter
 * @template TArgs - The type of pre-bound arguments
 * @param thisArg - The value to be passed as the this parameter to the target function when the bound function is called
 * @param args - Arguments to prepend to arguments provided to the bound function when invoking the target function
 * @returns A copy of the given function with the specified this value and initial arguments
 * @throws {TypeError} When called on a non-function value
 */
export declare function bind<TContext, TArgs extends unknown[]>(
  this: Function,
  thisArg: TContext,
  ...args: TArgs
): Function;

/**
 * Internal utility: Concatenates two array-like objects into a single array
 * @template T - Element type of the first array
 * @template U - Element type of the second array
 * @param first - The first array-like object
 * @param second - The second array-like object
 * @returns A new array containing all elements from both inputs
 */
declare function concatenateArrays<T, U>(
  first: ArrayLike<T>,
  second: ArrayLike<U>
): Array<T | U>;

/**
 * Internal utility: Slices an array-like object starting from a specific offset
 * @template T - Element type
 * @param arrayLike - The array-like object to slice
 * @param offset - The starting index (defaults to 0)
 * @returns A new array containing elements from the offset to the end
 */
declare function sliceArrayLike<T>(
  arrayLike: ArrayLike<T>,
  offset?: number
): T[];

/**
 * Internal utility: Joins array elements with a separator
 * @template T - Element type
 * @param array - The array to join
 * @param separator - The string to use as separator between elements
 * @returns A string with all array elements joined by the separator
 */
declare function joinArray<T>(
  array: T[],
  separator: string
): string;

/**
 * Configuration for the bind polyfill
 */
interface BindPolyfillConfig {
  /** Whether to preserve the prototype chain of the original function */
  readonly preservePrototype: boolean;
  /** Whether to perform strict type checking */
  readonly strictTypeChecking: boolean;
}

/**
 * Internal binder function interface
 * Represents the actual binding logic wrapped by the generated function
 */
interface BinderFunction {
  /**
   * Applies the bound function with the appropriate context and arguments
   * @param context - The context to apply
   * @param args - The arguments to pass
   * @returns The result of the function invocation
   */
  apply(context: unknown, args: unknown[]): unknown;
}

/**
 * Module export type
 * The polyfill function that will be assigned to Function.prototype.bind if not available
 */
declare const functionBindPolyfill: typeof bind;

export default functionBindPolyfill;

/**
 * @remarks
 * This polyfill implementation:
 * - Validates that it's called on a function using Object.prototype.toString
 * - Calculates the maximum remaining parameters after binding (Math.max(0, originalLength - boundArgsLength))
 * - Dynamically generates a function with the correct arity using Function constructor
 * - Handles both constructor invocation (new operator) and regular function calls
 * - Preserves the prototype chain for constructor functions
 * - Concatenates pre-bound arguments with call-time arguments
 * 
 * @example
 *