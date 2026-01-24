/**
 * Module: module_s
 * Original ID: s
 * 
 * This appears to be a function that calls another function `n` with context `e`.
 * Due to incomplete source code, exact types are inferred based on common patterns.
 */

/**
 * Type definition for the callable function `n`
 */
type CallableFunction = (this: unknown, ...args: unknown[]) => unknown;

/**
 * Main module function that invokes `n` with a specific execution context
 * @param n - The function to be invoked
 * @param e - The execution context (this binding) for the function call
 * @returns The result of calling `n` with context `e`
 */
declare function moduleS(n: CallableFunction, e: unknown): unknown;

export default moduleS;