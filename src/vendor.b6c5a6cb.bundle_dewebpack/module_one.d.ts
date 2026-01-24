/**
 * Module: module_one
 * Original ID: one
 * 
 * Performs a computation or transformation using the Ct helper function.
 * 
 * @typeParam T - The type of data being processed
 * @param t - First parameter passed to the Ct function
 * @param r - Second parameter passed to the Ct function
 * @param e - Third parameter passed to the Ct function
 * @param n - Fourth parameter passed to the Ct function
 * @returns The result from the Ct function with mode 1
 */
declare function moduleOne<T = unknown>(
  t: T,
  r: unknown,
  e: unknown,
  n: unknown
): unknown;

/**
 * Core computation function used by module_one
 * 
 * @typeParam T - The type of the first parameter
 * @param context - The context object (typically 'this')
 * @param t - First data parameter
 * @param r - Second data parameter
 * @param e - Third data parameter
 * @param n - Fourth data parameter
 * @param mode - Operation mode (1 in this case)
 * @returns The computed result
 */
declare function Ct<T = unknown>(
  context: unknown,
  t: T,
  r: unknown,
  e: unknown,
  n: unknown,
  mode: number
): unknown;

export { moduleOne, Ct };