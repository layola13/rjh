/**
 * Side channel implementation using ES6 Map for storing metadata
 * without polluting object properties.
 * 
 * @module SideChannel
 */

/**
 * Side channel interface for storing arbitrary data associated with objects
 * without modifying the objects themselves.
 */
interface SideChannel<K = any, V = any> {
  /**
   * Asserts that a key exists in the side channel.
   * Throws an error if the key is not found.
   * 
   * @param key - The key to check for existence
   * @throws {TypeError} When the key does not exist in the side channel
   */
  assert(key: K): void;

  /**
   * Deletes a key-value pair from the side channel.
   * 
   * @param key - The key to delete
   * @returns True if the key existed and was deleted, false otherwise
   */
  delete(key: K): boolean;

  /**
   * Retrieves the value associated with a key.
   * 
   * @param key - The key to look up
   * @returns The value associated with the key, or undefined if not found
   */
  get(key: K): V | undefined;

  /**
   * Checks whether a key exists in the side channel.
   * 
   * @param key - The key to check
   * @returns True if the key exists, false otherwise
   */
  has(key: K): boolean;

  /**
   * Associates a value with a key in the side channel.
   * 
   * @param key - The key to set
   * @param value - The value to associate with the key
   */
  set(key: K, value: V): void;
}

/**
 * Factory function that creates a new side channel instance.
 * Returns false if Map is not available in the environment.
 * 
 * @returns A new SideChannel instance, or false if not supported
 */
type SideChannelFactory = (() => SideChannel) | false;

/**
 * Exported side channel factory.
 * Either a function that creates side channel instances,
 * or false if the environment doesn't support Map.
 */
declare const sideChannelFactory: SideChannelFactory;

export = sideChannelFactory;