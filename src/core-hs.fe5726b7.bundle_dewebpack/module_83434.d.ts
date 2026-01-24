/**
 * Polyfill for Object.assign that handles edge cases with property descriptors
 * and ensures correct behavior across different JavaScript environments.
 * 
 * @remarks
 * This module provides a robust implementation of Object.assign that:
 * - Handles non-enumerable properties correctly
 * - Preserves symbol properties
 * - Works around browser inconsistencies
 * 
 * @returns A function compatible with Object.assign that copies properties from source objects to target
 */
declare function objectAssignPolyfill<T extends object, U>(
  target: T,
  source: U
): T & U;

declare function objectAssignPolyfill<T extends object, U, V>(
  target: T,
  source1: U,
  source2: V
): T & U & V;

declare function objectAssignPolyfill<T extends object, U, V, W>(
  target: T,
  source1: U,
  source2: V,
  source3: W
): T & U & V & W;

declare function objectAssignPolyfill(
  target: object,
  ...sources: unknown[]
): unknown;

export = objectAssignPolyfill;