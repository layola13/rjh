/**
 * Module: module_set
 * Original ID: set
 * 
 * Sets a key-value pair in the collection with support for frozen object handling.
 */

/**
 * Internal state interface for tracking frozen objects
 */
interface InternalState {
  /** Map storing frozen object references */
  frozen?: Map<unknown, unknown>;
}

/**
 * Collection interface with frozen object support
 * @template K - Key type
 * @template V - Value type
 */
interface FrozenAwareCollection<K = unknown, V = unknown> {
  /**
   * Sets a value for the given key in the collection.
   * 
   * For objects that are extensible and not arrays:
   * - If not already defined on the object, stores in frozen map
   * - Otherwise updates the property directly
   * 
   * For primitive values or arrays:
   * - Updates the property directly
   * 
   * @param key - The key to set
   * @param value - The value to associate with the key
   * @returns The collection instance for chaining
   */
  set(key: K, value: V): this;
}

/**
 * Checks if value is an object (not primitive)
 * @param value - Value to check
 * @returns True if value is an object
 */
declare function h(value: unknown): value is object;

/**
 * Checks if value is an array
 * @param value - Value to check
 * @returns True if value is an array
 */
declare function y(value: unknown): value is unknown[];

/**
 * Gets internal state for the collection instance
 * @param instance - The collection instance
 * @returns Internal state object
 */
declare function u(instance: unknown): InternalState;

/**
 * Checks if key is already defined on the collection
 * @param instance - The collection instance
 * @param key - The key to check
 * @returns True if key is defined
 */
declare function D(instance: unknown, key: unknown): boolean;

/**
 * Internal implementation to set property directly
 * @param instance - The collection instance
 * @param key - The key to set
 * @param value - The value to set
 */
declare function I(instance: unknown, key: unknown, value: unknown): void;

export type { FrozenAwareCollection, InternalState };