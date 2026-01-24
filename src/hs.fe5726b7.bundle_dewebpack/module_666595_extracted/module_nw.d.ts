/**
 * Module: module_nw
 * Original ID: nw
 * 
 * Combined north-west directional change handler.
 * Merges the results of north and west directional changes.
 */

/**
 * Parameters for directional change operations
 */
interface DirectionalChangeParams {
  /** Primary transformation parameter */
  t: unknown;
  /** Secondary transformation parameter */
  n: unknown;
  /** Tertiary transformation parameter */
  i: unknown;
}

/**
 * Result of a directional change operation
 */
interface ChangeResult {
  [key: string]: unknown;
}

/**
 * Internal change operations for different directions
 */
interface ChangeOperations {
  /** North direction change handler */
  n: (t: unknown, n: unknown, i: unknown) => ChangeResult;
  /** West direction change handler */
  w: (t: unknown, n: unknown, i: unknown) => ChangeResult;
}

/**
 * Base class or context providing change operations and extend utility
 */
interface ChangeContext {
  /** Internal change operations */
  _change: ChangeOperations;
  
  /**
   * Extends (merges) multiple objects into a single result
   * @param sources - Objects to merge
   * @returns Merged object
   */
  extend(...sources: ChangeResult[]): ChangeResult;
}

/**
 * Applies combined north-west directional changes.
 * 
 * This function merges the results of both north and west directional
 * transformations using the extend utility.
 * 
 * @param this - Context containing change operations and extend method
 * @param t - Primary transformation parameter
 * @param n - Secondary transformation parameter
 * @param i - Tertiary transformation parameter
 * @returns Merged result of north and west changes
 */
declare function moduleNorthWest(
  this: ChangeContext,
  t: unknown,
  n: unknown,
  i: unknown
): ChangeResult;

export { moduleNorthWest as default };
export type { ChangeContext, ChangeOperations, ChangeResult, DirectionalChangeParams };