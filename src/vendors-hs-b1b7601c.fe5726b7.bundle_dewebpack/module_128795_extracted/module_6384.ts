import ListCache from './ListCache';
import listCacheClear from './listCacheClear';
import listCacheDelete from './listCacheDelete';
import listCacheGet from './listCacheGet';
import listCacheHas from './listCacheHas';
import listCacheSet from './listCacheSet';

/**
 * Creates a stack cache object to store key-value pairs.
 */
class Stack<K = any, V = any> {
  private __data__: ListCache<K, V>;
  public size: number;

  /**
   * Creates a stack cache instance.
   * @param entries - Optional array of key-value pairs to initialize the stack
   */
  constructor(entries?: Array<[K, V]>) {
    const cache = new ListCache<K, V>(entries);
    this.__data__ = cache;
    this.size = cache.size;
  }

  /**
   * Removes all key-value pairs from the stack.
   */
  clear(): void {
    listCacheClear.call(this);
  }

  /**
   * Removes the entry for the given key.
   * @param key - The key of the entry to remove
   * @returns Returns true if the entry was removed, else false
   */
  delete(key: K): boolean {
    return listCacheDelete.call(this, key);
  }

  /**
   * Gets the value for the given key.
   * @param key - The key of the entry to get
   * @returns Returns the entry value
   */
  get(key: K): V | undefined {
    return listCacheGet.call(this, key);
  }

  /**
   * Checks if an entry for the given key exists.
   * @param key - The key of the entry to check
   * @returns Returns true if an entry exists, else false
   */
  has(key: K): boolean {
    return listCacheHas.call(this, key);
  }

  /**
   * Sets the value for the given key.
   * @param key - The key of the entry to set
   * @param value - The value to set
   * @returns Returns the stack instance
   */
  set(key: K, value: V): this {
    return listCacheSet.call(this, key, value);
  }
}

export default Stack;