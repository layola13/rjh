/**
 * Module: module_764332
 * Original ID: 764332
 * 
 * Deeply merges enumerable properties from source objects into a target object.
 * Includes both string keys and enumerable symbol properties.
 */

/**
 * Merges all enumerable own properties (including symbols) from one or more source objects 
 * into the target object and returns the target object.
 * 
 * @template T - The type of the target object
 * @param target - The target object to merge properties into
 * @param sources - One or more source objects whose properties will be merged
 * @returns The target object with merged properties
 * 
 * @example
 * const target = { a: 1 };
 * const source1 = { b: 2 };
 * const source2 = { c: 3 };
 * const result = mergeObjects(target, source1, source2);
 * // result: { a: 1, b: 2, c: 3 }
 */
export default function mergeObjects<T extends Record<PropertyKey, unknown>>(
  target: T,
  ...sources: Array<Record<PropertyKey, unknown> | null | undefined>
): T;