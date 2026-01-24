/**
 * Stack data structure implementation.
 * A stack-based collection that provides O(1) operations for add, remove, and query.
 * Internally uses a ListCache for small datasets and MapCache for larger ones.
 * 
 * @template T - The type of elements stored in the stack
 */
declare class Stack<T = any> {
  /**
   * The internal data structure backing this stack.
   * @private
   */
  private __data__: ListCache<T>;

  /**
   * The number of elements in the stack.
   */
  size: number;

  /**
   * Creates a new Stack instance.
   * 
   * @param entries - Optional initial entries to populate the stack
   */
  constructor(entries?: Array<[string | number | symbol, T]>);

  /**
   * Removes all key-value pairs from the stack.
   * Resets the internal cache to an empty ListCache.
   */
  clear(): void;

  /**
   * Removes the specified key and its associated value from the stack.
   * 
   * @param key - The key to remove
   * @returns True if the entry was found and removed, false otherwise
   */
  delete(key: string | number | symbol): boolean;

  /**
   * Retrieves the value associated with the given key.
   * 
   * @param key - The key to look up
   * @returns The value associated with the key, or undefined if not found
   */
  get(key: string | number | symbol): T | undefined;

  /**
   * Checks whether the stack contains the specified key.
   * 
   * @param key - The key to check for
   * @returns True if the key exists in the stack, false otherwise
   */
  has(key: string | number | symbol): boolean;

  /**
   * Sets a key-value pair in the stack.
   * If the stack size exceeds 200 entries, upgrades from ListCache to MapCache.
   * 
   * @param key - The key to set
   * @param value - The value to associate with the key
   * @returns The Stack instance for method chaining
   */
  set(key: string | number | symbol, value: T): this;
}

/**
 * Internal cache type used for small collections.
 * @private
 */
interface ListCache<T> {
  size: number;
}

export = Stack;