/**
 * Type definitions for Object.assign polyfill module
 * 
 * This module augments the global Object with the assign method,
 * providing ES6 Object.assign functionality for environments that lack native support.
 * 
 * @module ObjectAssignPolyfill
 */

/**
 * Copies values from one or more source objects to a target object
 * @template T - The type of the target object
 * @template U - The types of source objects
 */
interface ObjectConstructor {
  /**
   * Copies all enumerable own properties from one or more source objects to a target object.
   * Returns the modified target object.
   * 
   * @param target - The target object to copy properties to
   * @param sources - One or more source objects from which to copy properties
   * @returns The modified target object
   */
  assign<T extends object, U extends object[]>(
    target: T,
    ...sources: U
  ): T & MergeTypes<U>;
}

/**
 * Helper type to merge multiple source types into a single type
 * @template T - Array of types to merge
 */
type MergeTypes<T extends readonly any[]> = T extends [infer First, ...infer Rest]
  ? First & MergeTypes<Rest>
  : unknown;

/**
 * Export configuration flags
 * S: Static method flag
 * F: Force flag (override existing implementation)
 */
export interface ExportConfig {
  /** Static method flag - indicates method should be added as static */
  readonly S: number;
  /** Force flag - indicates existing implementation should be overridden */
  readonly F: number;
}

/**
 * Module export function that registers polyfills
 * @param flags - Bitwise flags controlling export behavior (S | F)
 * @param targetName - Name of the global object to augment (e.g., "Object")
 * @param methods - Object containing methods to add to the target
 */
export function exportPolyfill(
  flags: number,
  targetName: string,
  methods: Record<string, Function>
): void;