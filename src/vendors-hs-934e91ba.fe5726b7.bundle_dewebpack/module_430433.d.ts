/**
 * Deep equality comparison function for complex data structures.
 * Handles arrays, objects, typed arrays, and other special cases.
 * 
 * @param value - The first value to compare
 * @param other - The second value to compare
 * @param bitmask - Comparison behavior flags (bit 1: partial comparison)
 * @param customizer - Optional function to customize comparisons
 * @param equalFunc - Recursive equality function for nested comparisons
 * @param stack - Stack to detect circular references
 * @returns True if values are equal, false otherwise
 * 
 * @internal
 */
declare function baseIsEqualDeep(
  value: unknown,
  other: unknown,
  bitmask: number,
  customizer: ((value: unknown, other: unknown) => boolean | undefined) | undefined,
  equalFunc: (value: unknown, other: unknown, bitmask: number, customizer: unknown, stack: Stack) => boolean,
  stack: Stack
): boolean;

/**
 * Stack structure for tracking circular references during deep comparisons.
 * Prevents infinite recursion when comparing objects with circular references.
 */
interface Stack {
  /**
   * Clears all entries from the stack
   */
  clear(): void;
  
  /**
   * Removes an entry from the stack
   * @param key - The key to remove
   */
  delete(key: unknown): boolean;
  
  /**
   * Gets a value from the stack
   * @param key - The key to look up
   */
  get(key: unknown): unknown;
  
  /**
   * Checks if a key exists in the stack
   * @param key - The key to check
   */
  has(key: unknown): boolean;
  
  /**
   * Sets a value in the stack
   * @param key - The key to set
   * @param value - The value to associate with the key
   */
  set(key: unknown, value: unknown): this;
}

export = baseIsEqualDeep;