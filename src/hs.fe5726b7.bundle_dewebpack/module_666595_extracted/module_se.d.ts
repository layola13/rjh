/**
 * Module: module_se
 * Original ID: se
 * 
 * Extends and merges the results from _change.s and _change.e methods.
 * This appears to be part of a state/event change system.
 */

/**
 * Change handler interface containing start and end methods
 */
interface ChangeHandler {
  /**
   * Start method - processes initial change arguments
   */
  s: (...args: unknown[]) => Record<string, unknown>;
  
  /**
   * End method - processes final change arguments
   */
  e: (arg1: unknown, arg2: unknown, arg3: unknown) => Record<string, unknown>;
}

/**
 * Base class or utility with extend functionality
 */
interface ExtendUtility {
  /**
   * Extends/merges multiple objects into one
   */
  extend<T extends Record<string, unknown>, U extends Record<string, unknown>>(
    target: T,
    source: U
  ): T & U;
}

/**
 * Module SE - Handles change events by extending start and end results
 * 
 * @param t - First parameter (type unknown without more context)
 * @param n - Second parameter (type unknown without more context)
 * @param i - Third parameter (type unknown without more context)
 * @returns Merged result from start and end change handlers
 */
declare function moduleSE(
  this: { _change: ChangeHandler },
  t: unknown,
  n: unknown,
  i: unknown
): Record<string, unknown>;

export default moduleSE;