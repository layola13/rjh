/**
 * A generic storage class that manages a list of key-value pairs with namespace path matching.
 * Keys are arrays of strings representing nested paths, values can be of any type.
 * 
 * @template T - The type of values stored in the list
 */
export default class NamePathStore<T = unknown> {
  /**
   * Internal list storing key-value pairs
   * @private
   */
  private list: Array<{ key: string[]; value: T }>;

  /**
   * Creates a new NamePathStore instance
   */
  constructor();

  /**
   * Sets a value for the given name path key.
   * If the key already exists, updates its value; otherwise adds a new entry.
   * 
   * @param key - The name path as an array of strings (e.g., ['user', 'profile', 'name'])
   * @param value - The value to store
   */
  set(key: string[], value: T): void;

  /**
   * Retrieves the value associated with the given name path key.
   * 
   * @param key - The name path to search for
   * @returns The stored value if found, undefined otherwise
   */
  get(key: string[]): T | undefined;

  /**
   * Updates an existing value by applying a transformer function.
   * If the transformer returns a truthy value, the entry is updated;
   * otherwise the entry is deleted.
   * 
   * @param key - The name path to update
   * @param transformer - Function that receives the current value and returns the new value or null/undefined to delete
   */
  update(key: string[], transformer: (value: T | undefined) => T | null | undefined): void;

  /**
   * Removes the entry with the given name path key.
   * 
   * @param key - The name path to delete
   */
  delete(key: string[]): void;

  /**
   * Applies a mapping function to each entry in the list.
   * 
   * @template R - The return type of the mapper function
   * @param mapper - Function to transform each entry
   * @returns Array of mapped results
   */
  map<R>(mapper: (entry: { key: string[]; value: T }) => R): R[];

  /**
   * Converts the store to a plain JSON object.
   * Keys are joined with dots (e.g., ['user', 'name'] becomes 'user.name').
   * 
   * @returns A plain object with dot-notation keys and their corresponding values
   */
  toJSON(): Record<string, T>;
}