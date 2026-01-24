/**
 * Checks if a key exists in the collection.
 * Handles both regular properties and frozen state for special key types.
 * 
 * @param key - The key to check for existence
 * @returns True if the key exists in the collection or frozen storage, false otherwise
 * 
 * @remarks
 * This method supports two storage mechanisms:
 * - Direct property lookup for primitive keys
 * - Frozen storage for object keys that cannot be directly attached
 */
declare function has<K>(key: K): boolean;

/**
 * Represents the internal state of a collection that may contain frozen entries.
 */
interface CollectionState {
  /** Storage for keys that cannot be directly attached to the collection (e.g., frozen objects) */
  frozen?: WeakMap<object, unknown> | Map<unknown, unknown> | Set<unknown>;
}

/**
 * Checks if a value is an object type (including functions and objects).
 * Used to determine if special handling is needed for keys.
 * 
 * @param value - The value to check
 * @returns True if the value is an object or function
 */
declare function isObject(value: unknown): value is object;

/**
 * Checks if an object is frozen or sealed, preventing direct property attachment.
 * 
 * @param obj - The object to check
 * @returns True if the object is frozen or sealed
 */
declare function isFrozen(obj: object): boolean;

/**
 * Retrieves the internal state associated with the collection instance.
 * 
 * @param instance - The collection instance
 * @returns The internal state containing frozen storage and other metadata
 */
declare function getInternalState(instance: unknown): CollectionState;

/**
 * Performs direct property existence check on the collection.
 * 
 * @param instance - The collection instance
 * @param key - The key to check
 * @returns True if the key exists as a direct property
 */
declare function hasDirectProperty<K>(instance: unknown, key: K): boolean;