/**
 * Collection constructor factory for creating ES6 Set/Map implementations
 * 
 * This module provides a factory function that creates or patches collection constructors
 * (Set, Map, WeakSet, WeakMap) with proper ES6 behavior, handling edge cases and
 * ensuring cross-browser compatibility.
 * 
 * @module CollectionFactory
 */

/**
 * Type representing collection method names
 */
type CollectionMethod = 'add' | 'set' | 'get' | 'has' | 'delete';

/**
 * Configuration for collection iteration
 */
interface CollectionIterationConfig {
  /** The collection method to use for adding items */
  method: 'set' | 'add';
  /** Whether this is a key-value collection (Map) vs value-only (Set) */
  isKeyValue: boolean;
}

/**
 * Collection helper methods interface
 */
interface CollectionHelper {
  /**
   * Get the constructor for the collection
   * @param wrapper - Wrapper constructor function
   * @param collectionName - Name of the collection type
   * @param isKeyValue - Whether collection stores key-value pairs
   * @param methodName - Name of the add/set method
   * @returns Constructor function
   */
  getConstructor<T>(
    wrapper: Function,
    collectionName: string,
    isKeyValue: boolean,
    methodName: string
  ): new (...args: any[]) => T;

  /**
   * Set strong typing and additional methods on the collection
   * @param constructor - The collection constructor
   * @param collectionName - Name of the collection type
   * @param isKeyValue - Whether collection stores key-value pairs
   */
  setStrong(
    constructor: Function,
    collectionName: string,
    isKeyValue: boolean
  ): void;
}

/**
 * Collection constructor factory function
 * 
 * Creates or patches a collection constructor (Set, Map, WeakSet, WeakMap) to ensure
 * proper ES6 behavior including:
 * - Correct handling of -0/+0
 * - Proper iterator protocol
 * - Constructor behavior with initial values
 * - Method availability and correctness
 * 
 * @param collectionName - Name of the collection ('Set', 'Map', 'WeakSet', 'WeakMap')
 * @param wrapperConstructor - Constructor wrapper function
 * @param methods - Object containing method implementations
 * @param collectionHelper - Helper object with getConstructor and setStrong methods
 * @param isKeyValue - Whether this collection stores key-value pairs (true for Map, false for Set)
 * @param allowOnlyObject - Whether to restrict keys to objects only (true for Weak collections)
 * @returns The created or patched collection constructor
 * 
 * @example
 *