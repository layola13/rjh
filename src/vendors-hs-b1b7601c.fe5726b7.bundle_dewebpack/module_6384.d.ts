/**
 * Stack data structure implementation using ListCache internally.
 * Provides a stack with fast access to recently added items.
 * 
 * @module Stack
 */

import ListCache from './ListCache';

/**
 * Stack entry containing key-value pairs
 */
interface StackEntry<K = any, V = any> {
  key: K;
  value: V;
}

/**
 * Creates a stack cache object to store key-value pairs.
 * 
 * @class Stack
 * @template K - The type of keys in the stack
 * @template V - The type of values in the stack
 * 
 * @example
 * const stack = new Stack<string, number>();
 * stack.set('key1', 100);
 * stack.get('key1'); // 100
 * stack.has('key1'); // true
 * stack.delete('key1'); // true
 * stack.clear();
 */
declare class Stack<K = any, V = any> {
  /**
   * The internal data store for the stack
   * @private
   */
  private __data__: ListCache<K, V>;

  /**
   * The number of entries in the stack
   */
  size: number;

  /**
   * Creates a new Stack instance.
   * 
   * @param entries - Optional array of key-value pairs to initialize the stack
   */
  constructor(entries?: Array<[K, V]>);

  /**
   * Removes all key-value pairs from the stack.
   * 
   * @returns {void}
   */
  clear(): void;

  /**
   * Removes the specified key and its value from the stack.
   * 
   * @param key - The key of the entry to remove
   * @returns {boolean} Returns `true` if the entry was removed, else `false`
   */
  delete(key: K): boolean;

  /**
   * Gets the value associated with the specified key.
   * 
   * @param key - The key of the entry to get
   * @returns {V | undefined} Returns the value if found, else `undefined`
   */
  get(key: K): V | undefined;

  /**
   * Checks if a key exists in the stack.
   * 
   * @param key - The key to check
   * @returns {boolean} Returns `true` if the key exists, else `false`
   */
  has(key: K): boolean;

  /**
   * Sets the value for the specified key in the stack.
   * If the key already exists, its value is updated.
   * 
   * @param key - The key of the entry to set
   * @param value - The value to set
   * @returns {this} Returns the Stack instance for chaining
   */
  set(key: K, value: V): this;
}

export default Stack;