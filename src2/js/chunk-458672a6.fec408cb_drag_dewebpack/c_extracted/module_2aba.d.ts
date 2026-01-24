/**
 * Core module for redefining/wrapping object methods while preserving source inspection
 * 
 * This module provides functionality to:
 * - Replace methods on objects (including built-in prototypes)
 * - Maintain references to original implementations
 * - Enable source code inspection of wrapped functions
 * 
 * @module CoreMethodRedefiner
 */

/**
 * Unique key used to store the original source reference on wrapped functions
 */
declare const SOURCE_KEY: unique symbol;

/**
 * Options for controlling method redefinition behavior
 */
interface RedefineOptions {
  /**
   * If true, only redefine if the property doesn't exist
   */
  safe?: boolean;
  
  /**
   * If true, treat target as global object
   */
  isGlobal?: boolean;
}

/**
 * Inspect and retrieve the source code representation of a function
 * 
 * @param target - The function to inspect
 * @returns String representation of the function's source code
 * 
 * @example
 *