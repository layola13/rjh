/**
 * Module: module_nw
 * Combined transformation applying north and west directional changes.
 * 
 * This module provides functionality to extend objects by applying
 * both north (n) and west (w) transformations sequentially.
 */

/**
 * Applies combined north and west directional changes to an object.
 * 
 * @template T - The type of the base object being extended
 * @template N - The type of the north transformation result
 * @template W - The type of the west transformation result
 * 
 * @param target - The primary target parameter for the transformation
 * @param name - The name or identifier parameter
 * @param index - The index or position parameter
 * 
 * @returns The extended object combining both north and west transformations
 * 
 * @remarks
 * This function performs a two-step transformation:
 * 1. Applies the north (n) transformation with all provided arguments
 * 2. Applies the west (w) transformation with the same arguments
 * 3. Extends the north result with the west result using a merge strategy
 */
declare function applyNorthWestTransformation<T = unknown, N = unknown, W = unknown>(
  target: T,
  name: string,
  index: number
): N & W;

/**
 * Interface representing the change operations object with directional methods
 */
interface ChangeOperations<T = unknown> {
  /**
   * North directional change operation
   * @param target - The target object
   * @param name - The name parameter
   * @param index - The index parameter
   */
  n(target: T, name: string, index: number): unknown;
  
  /**
   * West directional change operation
   * @param target - The target object
   * @param name - The name parameter
   * @param index - The index parameter
   */
  w(target: T, name: string, index: number): unknown;
}

/**
 * Interface for the extension utility
 */
interface ExtensionUtility {
  /**
   * Extends the target object with properties from source objects
   * @param target - The target object to extend
   * @param sources - Source objects to merge into the target
   */
  extend<T, S>(target: T, ...sources: S[]): T & S;
}

/**
 * Context object containing change operations and extension utilities
 */
interface TransformationContext {
  /** Change operations for directional transformations */
  readonly _change: ChangeOperations;
  
  /** Extension utility for merging objects */
  readonly extend: ExtensionUtility['extend'];
}

export { applyNorthWestTransformation, ChangeOperations, ExtensionUtility, TransformationContext };