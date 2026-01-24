/**
 * Module: module_inc
 * Provides functionality to increment a multiplier value
 * @module inc
 */

/**
 * Interface representing an object with increment capability
 */
interface IncrementableMultiplier {
  /**
   * Current multiplier value
   */
  mult: number;
  
  /**
   * Increments the multiplier by 1
   * @returns void
   */
  increment(): void;
}

/**
 * Class that manages a multiplier with increment operations
 */
declare class MultiplierManager {
  /**
   * The current multiplier value
   */
  mult: number;
  
  /**
   * Increments the multiplier value by 1
   * @returns void
   */
  increment(): void;
}

/**
 * Namespace containing multiplier increment utilities
 */
declare namespace ModuleInc {
  /**
   * Increments the multiplier property on the current context
   * @this {{ mult: number }}
   * @returns void
   */
  function increment(this: { mult: number }): void;
}

export { IncrementableMultiplier, MultiplierManager, ModuleInc };
export default ModuleInc;