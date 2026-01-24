/**
 * Iterator Helper Factory Module
 * 
 * This module provides factory functions for creating iterator helper classes
 * that wrap and enhance standard JavaScript iterators with additional functionality.
 */

/**
 * Internal state stored for each iterator helper instance
 */
interface IteratorHelperState<T = unknown> {
  /** The underlying iterator being wrapped */
  iterator: Iterator<T>;
  /** The next method of the iterator */
  next: () => IteratorResult<T>;
  /** Type identifier: 'IteratorHelper' or 'WrapForValidIterator' */
  type: string;
  /** Custom handler function for next() calls */
  nextHandler: () => T | undefined;
  /** Counter tracking iteration progress */
  counter: number;
  /** Flag indicating if iteration is complete */
  done: boolean;
  /** Optional inner iterator for nested iteration scenarios */
  inner?: {
    iterator: Iterator<unknown>;
  };
}

/**
 * Iterator result object
 */
interface IteratorResult<T> {
  value: T | undefined;
  done: boolean;
}

/**
 * Iterator interface
 */
interface Iterator<T> {
  next(): IteratorResult<T>;
  return?(): IteratorResult<T>;
  throw?(error?: unknown): IteratorResult<T>;
}

/**
 * Constructor function for iterator helper instances
 */
interface IteratorHelperConstructor<T = unknown> {
  /**
   * Creates a new iterator helper instance
   * @param source - Source iterator or initial state
   * @param state - Optional existing state to reuse
   */
  new(source: Iterator<T> | IteratorHelperState<T>, state?: IteratorHelperState<T>): Iterator<T>;
  
  /** Prototype chain for iterator helper instances */
  prototype: Iterator<T>;
}

/**
 * Factory function that creates iterator helper constructor
 * 
 * @param nextHandler - Function to handle next() calls and produce values
 * @param isWrapForValid - If true, creates a WrapForValidIterator; otherwise creates IteratorHelper
 * @returns Constructor function for creating iterator helper instances
 * 
 * @example
 *