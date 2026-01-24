/**
 * Iterator Factory Module
 * 
 * Creates iterator implementations for collection types (Array, String, Map, Set, etc.)
 * Provides polyfill for ES6 iterator protocol in environments that don't natively support it.
 * 
 * @module IteratorFactory
 */

/**
 * Iterator configuration type for different iteration modes
 */
type IteratorKind = 'keys' | 'values' | 'entries';

/**
 * Iterator result object conforming to ES6 iterator protocol
 */
interface IteratorResult<T> {
  done: boolean;
  value: T;
}

/**
 * Standard ES6 Iterator interface
 */
interface Iterator<T> {
  next(): IteratorResult<T>;
}

/**
 * Iterable object with Symbol.iterator method
 */
interface Iterable<T> {
  [Symbol.iterator](): Iterator<T>;
}

/**
 * Iterator methods collection returned by the factory
 */
interface IteratorMethods<T> {
  /** Returns an iterator over the keys */
  keys: () => Iterator<number | string>;
  /** Returns an iterator over the values */
  values: () => Iterator<T>;
  /** Returns an iterator over [key, value] pairs */
  entries: () => Iterator<[number | string, T]>;
}

/**
 * Creates and installs iterator methods on a constructor's prototype
 * 
 * @template T - The type of elements in the collection
 * @param Constructor - The constructor function to add iterator methods to (e.g., Array, String)
 * @param constructorName - Name of the constructor for error messages and debugging
 * @param IteratorConstructor - Constructor that creates the actual iterator implementation
 * @param defaultIteratorName - The default iteration mode ('keys', 'values', or 'entries')
 * @param returnValueKind - Specifies what the iterator returns
 * @param isValuesDefault - Whether 'values' is the default iteration mode
 * @param forceInstallation - Force installation even if iterator already exists
 * @returns Object containing the three iterator methods (keys, values, entries)
 * 
 * @example
 *