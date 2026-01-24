/**
 * Iterator Factory Module
 * 
 * Creates iterator implementations for objects, typically used to add
 * ES6 iterator protocol support to built-in or custom types.
 */

/**
 * Iterator kind - specifies what values the iterator should yield
 */
type IteratorKind = 'keys' | 'values' | 'entries';

/**
 * Iterator result object returned by iterator.next()
 */
interface IteratorResult<T> {
  done: boolean;
  value: T;
}

/**
 * Base iterator interface
 */
interface Iterator<T> {
  next(): IteratorResult<T>;
}

/**
 * Iterable interface
 */
interface Iterable<T> {
  [Symbol.iterator](): Iterator<T>;
}

/**
 * Iterator methods collection
 */
interface IteratorMethods<T, K = unknown> {
  /** Returns an iterator over values */
  values: () => Iterator<T>;
  /** Returns an iterator over keys */
  keys: () => Iterator<K>;
  /** Returns an iterator over [key, value] entries */
  entries: () => Iterator<[K, T]>;
}

/**
 * Constructor type for objects that can be iterated
 */
type IterableConstructor<T = any> = new (...args: any[]) => T;

/**
 * Creates iterator functionality for a given constructor
 * 
 * @param Constructor - The constructor function to add iterator support to
 * @param constructorName - Name of the constructor (e.g., 'Array', 'Map')
 * @param IteratorConstructor - The iterator implementation constructor
 * @param iteratorMethod - Default iteration method implementation
 * @param iteratorKind - Type of iteration: 'keys', 'values', or 'entries'
 * @param returnKeys - Whether the iterator should return keys instead of values
 * @param forceOverride - Force override existing iterator implementations
 * 
 * @returns Object containing iterator methods (keys, values, entries)
 * 
 * @example
 *