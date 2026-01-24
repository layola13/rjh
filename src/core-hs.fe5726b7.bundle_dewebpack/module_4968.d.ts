/**
 * Iterator.prototype.forEach implementation
 * 
 * Provides a forEach method for Iterator instances that executes a callback
 * function for each element yielded by the iterator.
 * 
 * @module IteratorForEach
 */

/**
 * Callback function invoked for each iterator element
 * 
 * @template T - The type of values yielded by the iterator
 * @param value - The current value from the iterator
 * @param index - The zero-based index of the current iteration
 */
type ForEachCallback<T> = (value: T, index: number) => void;

/**
 * Options for iterator traversal
 */
interface IteratorTraversalOptions {
  /**
   * Indicates whether the iterator is treated as a record-like structure
   */
  IS_RECORD: boolean;
}

/**
 * Validates and returns an iterator instance
 * 
 * @template T - The type of values yielded by the iterator
 * @param iterator - The iterator to validate
 * @returns The validated iterator instance
 * @throws {TypeError} If the provided value is not a valid iterator
 */
declare function validateIterator<T>(iterator: Iterator<T>): Iterator<T>;

/**
 * Validates that a value is callable (function)
 * 
 * @param callback - The value to validate as a function
 * @throws {TypeError} If the value is not callable
 */
declare function requireCallback(callback: unknown): void;

/**
 * Iterates over an iterator and executes a callback for each element
 * 
 * @template T - The type of values yielded by the iterator
 * @param iterator - The iterator to traverse
 * @param callback - Function to execute for each element
 * @param options - Traversal configuration options
 */
declare function iterateIterator<T>(
  iterator: Iterator<T>,
  callback: (value: T) => void,
  options: IteratorTraversalOptions
): void;

/**
 * Registers a new method on a target prototype
 * 
 * @param config - Configuration object specifying target and method details
 */
declare function defineIteratorMethod(config: {
  /** The target object (e.g., "Iterator") */
  target: string;
  /** Whether to define on the prototype */
  proto: boolean;
  /** Whether this is a real (non-polyfill) implementation */
  real: boolean;
}): void;

/**
 * Iterator.prototype.forEach extension
 * 
 * Executes a provided callback function once for each value yielded by the iterator.
 * Similar to Array.prototype.forEach but for iterators.
 * 
 * @template T - The type of values yielded by the iterator
 */
declare global {
  interface Iterator<T> {
    /**
     * Executes a callback function for each element in the iterator
     * 
     * @param callback - Function to execute for each element, receiving the value and its index
     * @returns void
     * 
     * @example
     *