/**
 * Set.prototype.union polyfill module
 * 
 * This module extends the native Set prototype with a union method
 * that combines two sets and returns a new Set containing all unique elements.
 * 
 * @module SetUnionPolyfill
 */

/**
 * Configuration object for defining polyfills on native prototypes
 */
interface PolyfillConfig {
  /** The target object or constructor to extend (e.g., "Set", "Map", "Array") */
  target: string;
  
  /** Whether to apply the polyfill to the prototype */
  proto: boolean;
  
  /** Whether this polyfill implements a real standard feature */
  real: boolean;
  
  /** Whether to force the polyfill even if native implementation exists */
  forced: boolean;
}

/**
 * Returns the union of the current set with another iterable
 * 
 * @template T - The type of elements in the set
 * @param other - An iterable whose elements will be combined with the current set
 * @returns A new Set containing all unique elements from both sets
 * 
 * @example
 * const set1 = new Set([1, 2, 3]);
 * const set2 = new Set([3, 4, 5]);
 * const result = set1.union(set2);
 * // result: Set(5) { 1, 2, 3, 4, 5 }
 */
declare global {
  interface Set<T> {
    union<U>(other: Iterable<U>): Set<T | U>;
  }
}

/**
 * Applies a polyfill to a global constructor or object
 * 
 * @param config - Configuration specifying the target and behavior
 * @param methods - Object containing method implementations to add
 */
declare function applyPolyfill(
  config: PolyfillConfig,
  methods: Record<string, Function>
): void;

/**
 * Implementation of Set.prototype.union
 * Creates a new set containing all unique elements from both sets
 */
declare const unionImplementation: <T, U>(
  this: Set<T>,
  other: Iterable<U>
) => Set<T | U>;

/**
 * Checks if a method name has been marked as unsupported/unavailable
 * 
 * @param methodName - The name of the method to check
 * @returns true if the method is marked as unsupported
 */
declare function checkUnsupportedMethod(methodName: string): boolean;

export {};