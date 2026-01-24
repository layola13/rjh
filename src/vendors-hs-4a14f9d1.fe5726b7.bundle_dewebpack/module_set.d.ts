/**
 * Module: module_set
 * Original ID: set
 * 
 * Set-like data structure that stores key-value pairs using object IDs as internal keys.
 * This implementation assigns unique IDs to objects and uses them for fast lookups.
 */

/**
 * Global counter for generating unique object IDs
 */
interface IDCounter {
  count: number;
}

declare const p: IDCounter;

/**
 * Internal storage structure for the Set implementation
 */
interface SetStorage<T> {
  /** Map from object ID to stored value */
  [id: number]: T;
  /** Reverse map from object ID to original key object */
  __keys__: {
    [id: number]: any;
  };
}

/**
 * Object that can be used as a key in the Set.
 * The __id__ property is automatically assigned when the object is first used as a key.
 */
interface KeyObject {
  /** Unique identifier assigned to this object */
  __id__?: number;
}

/**
 * Custom Set implementation that uses object identity for key storage.
 * 
 * @template T The type of values stored in the set
 */
declare class ModuleSet<T = any> {
  /**
   * Internal storage hash map
   */
  private h: SetStorage<T>;

  /**
   * Adds or updates a value in the set associated with the given key object.
   * If the key object doesn't have an ID, one will be assigned automatically.
   * 
   * @param key - The object to use as a key. Will receive a unique __id__ if it doesn't have one.
   * @param value - The value to store for this key.
   * @returns void
   */
  set(key: KeyObject, value: T): void;
}

export = ModuleSet;