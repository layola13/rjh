/**
 * Hash clear function - Clears all key-value pairs from the hash data structure
 * 
 * This constructor function initializes an empty hash map using Object.create(null)
 * to avoid prototype pollution and ensure clean object storage.
 * 
 * @module HashClear
 */

/**
 * Factory function type that creates objects with null prototype
 * Typically references Object.create or similar utility
 */
type ObjectCreateFunction = ((proto: null) => Record<string, unknown>) | undefined;

/**
 * Represents a hash data structure with size tracking
 * 
 * @interface Hash
 * @property {Record<string, unknown>} __data__ - Internal storage for hash entries
 * @property {number} size - Number of entries in the hash
 */
interface Hash {
  /** Internal data store with null prototype to prevent prototype chain issues */
  __data__: Record<string, unknown>;
  
  /** Current count of key-value pairs stored in the hash */
  size: number;
}

/**
 * Hash constructor function that initializes an empty hash
 * 
 * Clears the hash by:
 * - Creating a new object with null prototype (if nativeCreate is available)
 * - Or falling back to an empty object literal
 * - Resetting the size counter to 0
 * 
 * @this {Hash} The hash instance being initialized
 * @returns {void}
 * 
 * @example
 * const hash = new HashClear();
 * // hash.__data__ = Object.create(null) or {}
 * // hash.size = 0
 */
declare function HashClear(this: Hash): void;

export = HashClear;