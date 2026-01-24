/**
 * Module: module_s
 * Original module identifier in webpack bundle
 */

/**
 * Executes a callable function in the context of a specified target
 * @param n - A callable function or method to be invoked
 * @param e - The context (this value) in which the function should be called
 * @returns The result of the function call
 */
declare function executeInContext<T = unknown, TContext = unknown>(
  n: (this: TContext, ...args: unknown[]) => T,
  e: TContext
): T;

/**
 * Alternative interpretation: Module initialization function
 * @internal
 */
declare function initializeModule(): void;

export { executeInContext, initializeModule };