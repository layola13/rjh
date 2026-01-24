/**
 * Returns an iterator over all keys in the collection.
 * Filters out keys that are not own properties of the internal hash object.
 * 
 * @returns An iterator containing all keys from the __keys__ property
 */
declare function getKeys<T = unknown>(): Iterator<T>;

/**
 * Internal hash structure containing keys collection
 */
interface InternalHash<K = unknown> {
  /** Collection of keys stored in the hash */
  __keys__: Record<string, K>;
  [key: string]: unknown;
}

/**
 * Context object containing the internal hash structure
 */
interface KeysModuleContext<K = unknown> {
  /** Internal hash object storing keys */
  h: InternalHash<K>;
}

/**
 * Utility namespace for iterator operations
 */
declare namespace C {
  /**
   * Creates an iterator from an array
   * @param items - Array of items to iterate over
   * @returns Iterator for the provided array
   */
  function iter<T>(items: T[]): Iterator<T>;
}

/**
 * Iterator interface for traversing collections
 */
interface Iterator<T> {
  next(): IteratorResult<T>;
  [Symbol.iterator](): Iterator<T>;
}

/**
 * Result of an iterator operation
 */
interface IteratorResult<T> {
  done: boolean;
  value: T | undefined;
}