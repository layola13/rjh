/**
 * Collection constructor factory for creating polyfills of ES6 collection types.
 * This module creates polyfilled versions of Map, Set, WeakMap, and WeakSet
 * with proper prototype methods and internal implementation.
 */

/**
 * Configuration options for the collection constructor
 */
interface CollectionOptions {
  /** Context object containing helper methods */
  that: any;
  /** Whether entries should be treated as key-value pairs */
  AS_ENTRIES: boolean;
}

/**
 * Collection constructor prototype methods
 */
interface CollectionPrototype<K = any, V = any> {
  /** Adds a new element with a specified value to the collection */
  add?(value: V): this;
  
  /** Sets a key-value pair in the collection */
  set?(key: K, value: V): this;
  
  /** Removes an element from the collection */
  delete(key: K): boolean;
  
  /** Checks if an element exists in the collection */
  has(key: K): boolean;
  
  /** Retrieves a value by key */
  get?(key: K): V | undefined;
  
  /** Removes all elements from the collection */
  clear?(): void;
  
  /** Iterates over collection entries */
  forEach?(callbackfn: (value: V, key: K, collection: any) => void, thisArg?: any): void;
  
  /** Returns an iterable of entries */
  entries?(): IterableIterator<[K, V]>;
  
  /** Constructor reference */
  constructor: Function;
}

/**
 * Collection constructor interface
 */
interface CollectionConstructor<K = any, V = any> {
  new(iterable?: Iterable<[K, V]> | null): CollectionPrototype<K, V>;
  prototype: CollectionPrototype<K, V>;
}

/**
 * Factory function that creates or polyfills a collection constructor (Map, Set, WeakMap, WeakSet)
 * 
 * @param collectionName - Name of the collection type ('Map', 'Set', 'WeakMap', 'WeakSet')
 * @param constructorWrapper - Wrapper function to create the new constructor
 * @param collectionHelper - Helper object with additional methods (getConstructor, setStrong)
 * @returns The polyfilled or original collection constructor
 * 
 * @example
 *