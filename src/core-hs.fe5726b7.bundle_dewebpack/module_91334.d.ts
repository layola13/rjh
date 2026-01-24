/**
 * Set.prototype.difference polyfill module
 * 
 * This module adds the `difference` method to the Set prototype,
 * which returns a new Set containing elements that are in this Set
 * but not in the given Set.
 * 
 * @module SetDifference
 * @see https://tc39.es/proposal-set-methods/
 */

/**
 * Configuration options for installing a Set method polyfill
 */
interface InstallMethodOptions {
  /** The global object or constructor to extend (e.g., "Set") */
  target: string;
  /** Whether to add the method to the prototype */
  proto: boolean;
  /** Whether this is a real method (not just a helper) */
  real: boolean;
  /** Whether to force install even if the method already exists */
  forced: boolean;
}

/**
 * Returns a new Set containing elements in this Set but not in the other Set
 * 
 * @template T - The type of elements in the Set
 * @param this - The Set to perform the difference operation on
 * @param other - The Set to compare against
 * @returns A new Set containing elements in this Set but not in other
 * 
 * @example
 * const setA = new Set([1, 2, 3, 4]);
 * const setB = new Set([3, 4, 5, 6]);
 * const diff = setA.difference(setB); // Set { 1, 2 }
 */
declare function difference<T>(this: Set<T>, other: Set<T>): Set<T>;

/**
 * Checks if a method with the given name exists natively on Set.prototype
 * 
 * @param methodName - The name of the method to check
 * @returns true if the method exists natively, false otherwise
 */
declare function hasNativeSetMethod(methodName: string): boolean;

/**
 * Installs a polyfill method on a global constructor
 * 
 * @param options - Configuration options for the polyfill
 * @param methods - Object containing method implementations to install
 */
declare function installPolyfill(
  options: InstallMethodOptions,
  methods: Record<string, Function>
): void;

/**
 * Augment the global Set interface with the difference method
 */
declare global {
  interface Set<T> {
    /**
     * Returns a new Set containing elements that are in this Set but not in the other Set
     * 
     * @param other - The Set to compare against
     * @returns A new Set with the difference
     */
    difference(other: Set<T>): Set<T>;
  }
}

export { difference, installPolyfill, hasNativeSetMethod, InstallMethodOptions };