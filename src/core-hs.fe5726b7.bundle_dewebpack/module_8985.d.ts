/**
 * WeakMap polyfill module with support for frozen and sealed objects
 * Provides enhanced WeakMap functionality for non-extensible objects in legacy environments
 */

/**
 * Internal state for tracking frozen WeakMap entries
 */
interface WeakMapInternalState<K extends object, V> {
  /** WeakMap instance for storing frozen/sealed object references */
  frozen?: WeakMap<K, V>;
}

/**
 * Sentinel object representing frozen state
 */
declare const FROZEN_SENTINEL: unique symbol;
type FrozenSentinel = typeof FROZEN_SENTINEL;

/**
 * Sentinel object representing sealed state
 */
declare const SEALED_SENTINEL: unique symbol;
type SealedSentinel = typeof SEALED_SENTINEL;

/**
 * Enhanced WeakMap constructor that handles non-extensible objects
 * @template K - Key type (must be an object)
 * @template V - Value type
 */
declare class EnhancedWeakMap<K extends object = object, V = any> {
  /**
   * Creates a new WeakMap instance
   * @param entries - Optional iterable of key-value pairs
   */
  constructor(entries?: readonly (readonly [K, V])[] | null);

  /**
   * Deletes a key-value pair from the WeakMap
   * Handles frozen and sealed objects by storing them in a separate internal WeakMap
   * @param key - The object key to delete
   * @returns True if the key existed and was deleted, false otherwise
   */
  delete(key: K): boolean;

  /**
   * Checks if a key exists in the WeakMap
   * Searches both the main map and the internal frozen object map
   * @param key - The object key to check
   * @returns True if the key exists, false otherwise
   */
  has(key: K): boolean;

  /**
   * Retrieves the value associated with a key
   * Checks both extensible and non-extensible object storage
   * @param key - The object key to retrieve
   * @returns The associated value, or undefined if not found
   */
  get(key: K): V | undefined;

  /**
   * Sets a key-value pair in the WeakMap
   * Automatically freezes/seals arrays if they were previously frozen/sealed
   * @param key - The object key
   * @param value - The value to store
   * @returns The WeakMap instance for chaining
   */
  set(key: K, value: V): this;
}

/**
 * Type guard to check if an object is an object type (not primitive)
 * @param value - Value to check
 * @returns True if value is an object
 */
declare function isObject(value: unknown): value is object;

/**
 * Gets or creates the internal state for a WeakMap instance
 * @template K - Key type
 * @template V - Value type
 * @param target - The WeakMap instance
 * @returns The internal state object
 */
declare function enforceInternalState<K extends object, V>(
  target: EnhancedWeakMap<K, V>
): WeakMapInternalState<K, V>;

/**
 * Detects if running in an environment with ActiveXObject memory leak issues
 * @returns True if ActiveXObject exists but is not callable (IE11 quirk)
 */
declare const hasActiveXObjectIssue: boolean;

/**
 * Polyfills the global WeakMap with enhanced frozen/sealed object support
 */
export {};