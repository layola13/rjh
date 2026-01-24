/**
 * Stack constructor that initializes an empty stack.
 * Creates a new stack data structure with an internal ListCache storage.
 * The stack starts with a size of 0.
 */
declare class Stack<T = any> {
  /**
   * Internal data storage using ListCache.
   * @internal
   */
  __data__: ListCache<T>;

  /**
   * The number of elements in the stack.
   */
  size: number;

  /**
   * Constructs a new Stack instance.
   * Initializes the internal data structure and sets size to 0.
   */
  constructor();
}

/**
 * ListCache is the underlying data structure used by Stack.
 * This is typically a simple key-value cache implementation.
 */
declare class ListCache<T = any> {
  constructor();
}

export = Stack;