/**
 * Set.prototype.isSupersetOf polyfill module
 * 
 * This module extends the native Set prototype with the isSupersetOf method,
 * which checks if the current set is a superset of another set.
 * 
 * @module SetIsSupersetOf
 */

/**
 * Configuration options for defining a new property or method on a global object
 */
interface ExportOptions {
  /** The target global object or constructor name (e.g., "Set", "Array", "Object") */
  target: string;
  
  /** Whether to add the property to the prototype chain */
  proto?: boolean;
  
  /** Whether this is a real implementation (not a shim or fallback) */
  real?: boolean;
  
  /** Whether to force the polyfill even if the method already exists */
  forced?: boolean;
  
  /** Additional flag for static methods */
  stat?: boolean;
}

/**
 * Implementation function that checks if this set is a superset of another set.
 * 
 * A set A is a superset of set B if every element in B is also in A.
 * 
 * @template T - The type of elements in the set
 * @param this - The Set instance to check
 * @param other - The set to compare against
 * @returns true if this set is a superset of other, false otherwise
 * 
 * @example
 * const setA = new Set([1, 2, 3, 4]);
 * const setB = new Set([2, 3]);
 * setA.isSupersetOf(setB); // true
 */
type IsSupersetOfImplementation = <T>(this: Set<T>, other: Set<T>) => boolean;

/**
 * Exports a polyfill to the global scope
 * 
 * @param options - Configuration for the export
 * @param exports - Object containing the methods to export
 */
declare function exportPolyfill(
  options: ExportOptions,
  exports: Record<string, unknown>
): void;

/**
 * Checks if a method name is already defined (used to determine if polyfill is needed)
 * 
 * @param methodName - The name of the method to check
 * @returns true if the method already exists natively, false otherwise
 */
declare function hasNativeMethod(methodName: string): boolean;

/**
 * Module augmentation to extend the built-in Set interface with isSupersetOf method
 */
declare global {
  interface Set<T> {
    /**
     * Determines whether this set is a superset of another set.
     * 
     * A set A is a superset of set B if all elements of B are also elements of A.
     * 
     * @param other - The set to compare against
     * @returns true if this set is a superset of the other set, false otherwise
     * 
     * @example
     * const superset = new Set([1, 2, 3, 4, 5]);
     * const subset = new Set([2, 3, 4]);
     * console.log(superset.isSupersetOf(subset)); // true
     * 
     * @example
     * const set1 = new Set(['a', 'b', 'c']);
     * const set2 = new Set(['a', 'b', 'c', 'd']);
     * console.log(set1.isSupersetOf(set2)); // false
     */
    isSupersetOf(other: Set<T>): boolean;
  }
}

export {};