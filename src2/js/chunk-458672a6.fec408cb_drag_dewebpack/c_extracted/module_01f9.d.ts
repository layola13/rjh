/**
 * Iterator Factory Module
 * 
 * Creates iterator implementations for collections and registers them on prototypes.
 * This module provides standardized iterator support for custom collection types.
 */

/**
 * Iterator method names
 */
type IteratorKind = 'keys' | 'values' | 'entries';

/**
 * Iterator result object
 */
interface IteratorResult<T> {
  done: boolean;
  value: T;
}

/**
 * Standard iterator interface
 */
interface Iterator<T> {
  next(): IteratorResult<T>;
}

/**
 * Iterable interface with iterator symbol
 */
interface Iterable<T> {
  [Symbol.iterator](): Iterator<T>;
}

/**
 * Iterator methods that can be defined on a collection
 */
interface IteratorMethods<T, K> {
  /** Returns an iterator over values */
  values?: () => Iterator<T>;
  /** Returns an iterator over keys */
  keys?: () => Iterator<K>;
  /** Returns an iterator over [key, value] pairs */
  entries?: () => Iterator<[K, T]>;
}

/**
 * Constructor for objects that can be iterated
 */
interface IterableConstructor<T> {
  new (...args: any[]): T;
  prototype: T;
}

/**
 * Iterator implementation constructor
 */
interface IteratorConstructor<T, K> {
  new (iterable: any, kind: IteratorKind): Iterator<T | K | [K, T]>;
}

/**
 * Creates and registers iterator methods on a collection prototype.
 * 
 * @param Constructor - The constructor function of the collection type
 * @param constructorName - Name of the constructor (e.g., 'Array', 'Map')
 * @param IteratorImpl - Iterator implementation class
 * @param defaultIteratorKind - Default iteration kind ('keys', 'values', or 'entries')
 * @param iteratorKind - The kind of iterator to create
 * @param keysIterator - Whether this is a keys iterator
 * @param forced - Force override even if iterator already exists
 * 
 * @returns Object containing the created iterator methods (keys, values, entries)
 * 
 * @example
 *