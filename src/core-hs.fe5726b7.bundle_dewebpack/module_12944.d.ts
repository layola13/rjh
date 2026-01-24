/**
 * Set.prototype.isSubsetOf polyfill module
 * 
 * This module extends the native Set prototype with the isSubsetOf method,
 * which checks whether all elements of this set are contained in another set.
 * 
 * @module SetIsSubsetOfPolyfill
 */

/**
 * Configuration options for registering a polyfill method
 */
interface PolyfillRegistrationOptions {
  /** The target object/class to extend (e.g., "Set", "Array") */
  target: string;
  
  /** Whether to extend the prototype (true) or the constructor itself (false) */
  proto: boolean;
  
  /** Whether this is a real implementation (true) or a shim (false) */
  real: boolean;
  
  /** Whether to force installation even if the method already exists */
  forced: boolean;
}

/**
 * Polyfill registration function
 * Installs new methods on built-in objects
 * 
 * @param options - Configuration for the polyfill installation
 * @param methods - Object containing method name-implementation pairs to install
 */
declare function registerPolyfill(
  options: PolyfillRegistrationOptions,
  methods: Record<string, Function>
): void;

/**
 * Checks if a method already exists on a prototype
 * 
 * @param methodName - The name of the method to check
 * @returns true if the method already exists natively, false otherwise
 */
declare function hasNativeMethod(methodName: string): boolean;

/**
 * Implementation of Set.prototype.isSubsetOf
 * Checks whether all elements in this set are present in the other set
 * 
 * @template T - The type of elements in the sets
 * @param this - The set instance calling this method
 * @param other - The set to check against
 * @returns true if this set is a subset of the other set, false otherwise
 * 
 * @example
 * const setA = new Set([1, 2]);
 * const setB = new Set([1, 2, 3]);
 * setA.isSubsetOf(setB); // true
 * 
 * @example
 * const setC = new Set([1, 4]);
 * const setD = new Set([1, 2, 3]);
 * setC.isSubsetOf(setD); // false
 */
declare function isSubsetOf<T>(this: Set<T>, other: Set<T>): boolean;

/**
 * Augment the global Set interface with the isSubsetOf method
 */
declare global {
  interface Set<T> {
    /**
     * Determines whether this set is a subset of another set.
     * A set A is a subset of set B if all elements of A are also elements of B.
     * 
     * @param other - The set to compare against
     * @returns true if this set is a subset of the other set, false otherwise
     */
    isSubsetOf(other: Set<T>): boolean;
  }
}

export {};