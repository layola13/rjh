/**
 * Type definitions for utility module bundle
 * 
 * This module provides common utility functions for data manipulation:
 * - set: Set values in nested objects/arrays
 * - keySeq: Generate sequences of keys from collections
 * - get: Safely retrieve nested values
 * - includes: Check for value existence in collections
 */

/**
 * Sets a value at the specified path in an object or array.
 * Creates intermediate objects/arrays as needed.
 * 
 * @param collection - The target object or array to modify
 * @param path - The path to the property (string, array, or nested keys)
 * @param value - The value to set
 * @returns A new collection with the value set (immutable operation)
 * 
 * @example
 * set({ a: { b: 1 } }, ['a', 'c'], 2) // { a: { b: 1, c: 2 } }
 * set([1, 2, 3], 1, 5) // [1, 5, 3]
 */
export function set<T = unknown>(
  collection: Record<string, unknown> | unknown[],
  path: string | number | Array<string | number>,
  value: unknown
): T;

/**
 * Extracts a sequence of keys from a collection (object or Map).
 * Returns an iterable sequence of all keys.
 * 
 * @param collection - The object, Map, or iterable to extract keys from
 * @returns An iterable sequence of keys
 * 
 * @example
 * keySeq({ a: 1, b: 2 }) // Iterable<'a' | 'b'>
 * keySeq(new Map([['x', 10]])) // Iterable<'x'>
 */
export function keySeq<K extends string | number | symbol>(
  collection: Record<K, unknown> | Map<K, unknown> | Iterable<[K, unknown]>
): Iterable<K>;

/**
 * Safely retrieves a value at the specified path in a nested structure.
 * Returns undefined if any part of the path doesn't exist.
 * 
 * @param collection - The source object or array
 * @param path - The path to the property (string, array, or nested keys)
 * @param defaultValue - Optional default value if path doesn't exist
 * @returns The value at the path, or defaultValue if not found
 * 
 * @example
 * get({ a: { b: { c: 3 } } }, ['a', 'b', 'c']) // 3
 * get({ a: 1 }, ['x', 'y'], 'default') // 'default'
 */
export function get<T = unknown>(
  collection: Record<string, unknown> | unknown[] | null | undefined,
  path: string | number | Array<string | number>,
  defaultValue?: T
): T | undefined;

/**
 * Checks if a collection contains a specific value.
 * Works with arrays, strings, objects, Maps, and Sets.
 * 
 * @param collection - The collection to search in
 * @param value - The value to search for
 * @returns true if the value exists in the collection, false otherwise
 * 
 * @example
 * includes([1, 2, 3], 2) // true
 * includes('hello', 'ell') // true
 * includes({ a: 1, b: 2 }, 2) // true
 */
export function includes<T = unknown>(
  collection: T[] | string | Record<string, T> | Set<T> | Map<unknown, T>,
  value: T
): boolean;