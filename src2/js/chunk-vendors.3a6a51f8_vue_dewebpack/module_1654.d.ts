/**
 * String iterator implementation for ES6-style string iteration.
 * Provides proper iteration over Unicode code points, handling surrogate pairs correctly.
 * 
 * @module StringIterator
 */

/**
 * Internal state interface for the string iterator.
 */
interface StringIteratorState {
  /** The string being iterated over */
  _t: string;
  /** Current iteration index position */
  _i: number;
}

/**
 * Result of an iterator step operation.
 * 
 * @template T - The type of value yielded by the iterator
 */
interface IteratorResult<T> {
  /** The value at the current iteration position */
  value: T | undefined;
  /** Whether the iteration has completed */
  done: boolean;
}

/**
 * Iterator interface for string traversal.
 */
interface StringIterator extends StringIteratorState {
  /**
   * Advances the iterator and returns the next character or code point.
   * 
   * @returns An iterator result containing the next value or completion status
   */
  next(): IteratorResult<string>;
}

/**
 * Function that retrieves the next Unicode code point from a string at the given position.
 * Handles both single characters and surrogate pairs correctly.
 * 
 * @param str - The source string
 * @param index - The current position in the string
 * @returns The next character or code point (may be 1-2 characters for surrogate pairs)
 */
declare function getNextCodePoint(str: string, index: number): string;

/**
 * Defines the string iterator implementation on the String prototype.
 * Enables for...of loops and other iteration protocols on strings.
 * 
 * @param StringConstructor - The String constructor to extend
 * @param name - The name identifier for this iterator ("String")
 * @param initializer - Function to initialize iterator state with the target string
 * @param nextFunction - Function that implements the next() method logic
 */
declare function defineStringIterator(
  StringConstructor: StringConstructor,
  name: string,
  initializer: (this: StringIteratorState, value: unknown) => void,
  nextFunction: (this: StringIterator) => IteratorResult<string>
): void;

/**
 * Initializes a new string iterator instance.
 * 
 * @this StringIteratorState
 * @param value - The value to convert to string and iterate over
 */
declare function initializeIterator(this: StringIteratorState, value: unknown): void;

/**
 * Advances the iterator to the next character/code point.
 * 
 * @this StringIterator
 * @returns Iterator result with the next value or done status
 */
declare function next(this: StringIterator): IteratorResult<string>;