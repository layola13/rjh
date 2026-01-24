/**
 * Cache module for storing data associated with DOM nodes or objects.
 * Provides a mechanism to attach metadata without polluting the object's own properties.
 */

/**
 * Retrieves or creates a cache object for the given target.
 * 
 * @template T - The type of the target object
 * @param target - The DOM node or object to cache data for
 * @returns The cache object associated with the target
 * 
 * @remarks
 * - For DOM nodes (with nodeType), the cache is stored directly on the node
 * - For other objects, the cache is stored as a non-enumerable property
 * - Uses an expando property name to avoid conflicts with existing properties
 */
declare function getCache<T extends object>(target: T): Record<string, unknown>;

/**
 * Interface representing a cacheable object with an expando property.
 */
interface CacheableObject {
  readonly nodeType?: number;
  [expando: string]: unknown;
}

/**
 * Interface for the cache manager instance.
 */
interface CacheManager {
  /**
   * The expando property name used to store cache data.
   * Generated to be unique and avoid collisions.
   */
  readonly expando: string;

  /**
   * Retrieves or initializes cache for a target object.
   * 
   * @param target - The object to retrieve cache for
   * @returns The cache object
   */
  get(target: CacheableObject): Record<string, unknown>;
}

/**
 * Checks if an object is valid for caching.
 * 
 * @param target - The object to validate
 * @returns True if the object can be cached
 */
declare function isValidCacheTarget(target: unknown): target is CacheableObject;

export type { CacheManager, CacheableObject };
export { getCache, isValidCacheTarget };