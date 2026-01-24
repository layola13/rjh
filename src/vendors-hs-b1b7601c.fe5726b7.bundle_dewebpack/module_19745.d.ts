/**
 * Side channel data structure for storing key-value pairs without polluting the object prototype.
 * Uses a linked list implementation to avoid memory leaks and prototype pollution.
 */

/**
 * Node in the linked list representing a key-value pair
 */
interface SideChannelNode<K = any, V = any> {
  /** The key associated with this node */
  key: K;
  /** The value stored in this node */
  value: V;
  /** Reference to the next node in the list */
  next: SideChannelNode<K, V> | undefined;
}

/**
 * Head node of the linked list (sentinel node)
 */
interface SideChannelHead {
  /** Reference to the first actual node in the list */
  next: SideChannelNode | undefined;
}

/**
 * Side channel interface for storing metadata associated with objects
 * without modifying the objects themselves.
 */
interface SideChannel<K = any, V = any> {
  /**
   * Asserts that a key exists in the side channel.
   * Throws an error if the key is not found.
   * @param key - The key to check
   * @throws {TypeError} When the key does not exist in the side channel
   */
  assert(key: K): void;

  /**
   * Deletes a key-value pair from the side channel.
   * @param key - The key to delete
   * @returns true if the key was found and deleted, false otherwise
   */
  delete(key: K): boolean;

  /**
   * Retrieves the value associated with a key.
   * @param key - The key to look up
   * @returns The value associated with the key, or undefined if not found
   */
  get(key: K): V | undefined;

  /**
   * Checks if a key exists in the side channel.
   * @param key - The key to check
   * @returns true if the key exists, false otherwise
   */
  has(key: K): boolean;

  /**
   * Sets a key-value pair in the side channel.
   * If the key already exists, its value is updated.
   * @param key - The key to set
   * @param value - The value to associate with the key
   */
  set(key: K, value: V): void;
}

/**
 * Factory function that creates a new side channel instance.
 * A side channel provides a way to store metadata associated with objects
 * without modifying the objects themselves, avoiding prototype pollution.
 * 
 * @returns A new SideChannel instance
 * 
 * @example
 * const channel = createSideChannel();
 * const obj = {};
 * channel.set(obj, 'metadata');
 * console.log(channel.get(obj)); // 'metadata'
 */
declare function createSideChannel<K = any, V = any>(): SideChannel<K, V>;

export = createSideChannel;