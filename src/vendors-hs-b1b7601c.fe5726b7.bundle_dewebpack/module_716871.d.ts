/**
 * Memoization utilities for caching function results with configurable equality checks
 * @module memoization
 */

/**
 * Default equality check function using strict equality (===)
 * @param a - First value to compare
 * @param b - Second value to compare
 * @returns True if values are strictly equal
 */
export declare function defaultEqualityCheck<T = any>(a: T, b: T): boolean;

/**
 * Configuration options for memoization
 */
export interface MemoizeOptions<T = any, R = any> {
  /**
   * Custom equality check function for comparing arguments
   * @default defaultEqualityCheck
   */
  equalityCheck?: (a: T, b: T) => boolean;
  
  /**
   * Maximum number of cached results to store
   * @default 1
   */
  maxSize?: number;
  
  /**
   * Custom equality check for comparing result values
   * Used to return existing cached result if new result is equivalent
   */
  resultEqualityCheck?: (a: R, b: R) => boolean;
}

/**
 * Cache entry storing a key-value pair
 */
export interface CacheEntry<K = any, V = any> {
  /** The cache key (typically function arguments) */
  key: K;
  /** The cached value (function result) */
  value: V;
}

/**
 * Internal cache interface for managing memoized results
 */
export interface Cache<K = any, V = any> {
  /**
   * Retrieve a cached value by key
   * @param key - The cache key to look up
   * @returns The cached value or undefined if not found
   */
  get(key: K): V | undefined;
  
  /**
   * Store a value in the cache
   * @param key - The cache key
   * @param value - The value to cache
   */
  put(key: K, value: V): void;
  
  /**
   * Get all cache entries
   * @returns Array of all cached entries
   */
  getEntries(): CacheEntry<K, V>[];
  
  /**
   * Clear all cached entries
   */
  clear(): void;
}

/**
 * Memoized function with cache clearing capability
 */
export interface MemoizedFunction<F extends (...args: any[]) => any> {
  (...args: Parameters<F>): ReturnType<F>;
  
  /**
   * Clear all cached results
   */
  clearCache(): void;
}

/**
 * Creates a cache key comparator function that compares arrays element-by-element
 * @param equalityCheck - Function to compare individual elements
 * @returns Comparator function that checks if two argument arrays are equal
 */
export declare function createCacheKeyComparator<T = any>(
  equalityCheck: (a: T, b: T) => boolean
): (a: T[] | null, b: T[] | null) => boolean;

/**
 * Creates a memoized version of a function with configurable caching behavior
 * 
 * @template F - The function type to memoize
 * @param func - The function to memoize
 * @param options - Memoization options or custom equality check function
 * @returns Memoized function with clearCache method
 * 
 * @example
 *