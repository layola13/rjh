/**
 * Set.prototype.intersection polyfill module
 * 
 * Adds the `intersection` method to the Set prototype if not natively supported.
 * This method returns a new Set containing elements present in both sets.
 * 
 * @module SetIntersectionPolyfill
 */

/**
 * Registers a polyfill for Set.prototype.intersection
 * 
 * @param config - Configuration object for the polyfill registration
 * @param config.target - The target object/constructor to extend ("Set")
 * @param config.proto - Whether to add to the prototype (true)
 * @param config.real - Whether this is a real method addition (true)
 * @param config.forced - Whether to force the polyfill even if native exists
 * @param methods - Object containing the polyfill implementation
 */
declare function registerSetPolyfill(
  config: {
    target: string;
    proto: boolean;
    real: boolean;
    forced: boolean;
  },
  methods: {
    intersection: SetIntersectionMethod;
  }
): void;

/**
 * Type definition for the Set intersection method implementation
 * 
 * @typeParam T - The type of elements in the Set
 */
type SetIntersectionMethod = <T>(this: Set<T>, other: Set<T>) => Set<T>;

/**
 * Checks if a native method exists on the Set prototype
 * 
 * @param methodName - The name of the method to check
 * @returns true if the method exists natively, false otherwise
 */
declare function hasNativeSetMethod(methodName: string): boolean;

/**
 * Augment the Set interface with the intersection method
 */
declare global {
  interface Set<T> {
    /**
     * Returns a new Set containing elements that exist in both this Set and the other Set
     * 
     * @param other - The other Set to intersect with
     * @returns A new Set containing the intersection of both Sets
     * 
     * @example
     *