/**
 * Module: module_s
 * Original module ID: s
 */

/**
 * Executes a callback function with a specific context
 * @param n - The function to be called with the provided context
 * @param e - The execution context (this binding) for the function call
 * @returns The result of calling function n with context e
 */
declare function executeWithContext<T = unknown, R = unknown>(
  n: (this: T) => R,
  e: T
): R;

export { executeWithContext };