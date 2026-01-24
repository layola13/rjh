/**
 * Removes data from a cache object associated with an element.
 * 
 * This function is part of a data management system (likely jQuery-style) that stores
 * arbitrary data on DOM elements or plain objects using an expando property.
 * 
 * @param target - The target element or object from which to remove data
 * @param keys - Optional key(s) to remove. Can be a string, array of strings, or undefined.
 *               If undefined, removes all data and cleans up the expando property.
 * 
 * @remarks
 * - If keys are provided, only those specific keys are removed from the cache
 * - If no keys are provided (or all keys removed), the entire expando property is cleaned up
 * - For DOM nodes, the expando is set to undefined; for plain objects, it's deleted
 * - Keys are normalized to camelCase format before removal
 * 
 * @internal
 */
declare function remove(
  this: { expando: string | symbol },
  target: Element | Record<string, unknown>,
  keys?: string | string[]
): void;

/**
 * Type definition for the data cache object stored on elements
 */
interface DataCache {
  [key: string]: unknown;
}

/**
 * Utility type for elements that can have data attached
 */
type DataTarget = (Element | Node) & {
  [expando: string]: DataCache | undefined;
};

/**
 * Type definition for the remove function with proper context binding
 */
interface RemoveFunction {
  /**
   * The expando property name used to store data on objects
   */
  expando: string;
  
  /**
   * Removes data entries from the target object's cache
   * 
   * @param target - Element or object containing cached data
   * @param keys - Key(s) to remove from cache. If omitted, removes all data.
   */
  (
    target: Element | Record<string, unknown>,
    keys?: string | string[]
  ): void;
}