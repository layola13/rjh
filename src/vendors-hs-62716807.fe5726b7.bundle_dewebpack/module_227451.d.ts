/**
 * String Iterator Implementation
 * Provides iteration support for strings with proper Unicode handling
 * @module StringIterator
 */

/**
 * Iterator state for string iteration
 */
interface StringIteratorState {
  /** Type identifier for the iterator */
  type: 'String Iterator';
  /** The string being iterated over */
  string: string;
  /** Current character index in the string */
  index: number;
}

/**
 * Result of an iterator step
 * @template T The type of the value being iterated
 */
interface IteratorResult<T> {
  /** The current value, or undefined when done */
  value: T | undefined;
  /** Whether the iteration is complete */
  done: boolean;
}

/**
 * Converts a character at the given index, handling Unicode properly
 * @param str - The string to read from
 * @param index - The position to read the character from
 * @returns The character (potentially multi-byte) at the given position
 */
declare function charAt(str: string, index: number): string;

/**
 * Converts value to string
 * @param value - The value to convert to string
 * @returns String representation of the value
 */
declare function toString(value: unknown): string;

/**
 * Creates iterator result object
 * @template T The type of the value
 * @param value - The value for this iteration step
 * @param done - Whether iteration is complete
 * @returns Iterator result object
 */
declare function createIteratorResult<T>(value: T | undefined, done: boolean): IteratorResult<T>;

/**
 * State management for iterator instances
 */
declare const iteratorState: {
  /** Sets internal state for an iterator instance */
  set(instance: object, state: StringIteratorState): void;
  /** Gets internal state for an iterator instance */
  getterFor(type: string): (instance: object) => StringIteratorState;
};

/**
 * Defines the String iterator on the String prototype
 * Enables strings to be iterable with proper Unicode character support
 * 
 * @param target - The String constructor
 * @param name - The name identifier for the iterator
 * @param constructor - Initialization function for the iterator
 * @param next - Function that returns the next iteration result
 */
declare function defineIterator(
  target: StringConstructor,
  name: string,
  constructor: (this: StringIterator, str: unknown) => void,
  next: (this: StringIterator) => IteratorResult<string>
): void;

/**
 * String Iterator class
 * Provides character-by-character iteration over strings with Unicode support
 */
declare class StringIterator implements Iterator<string> {
  /**
   * Creates a new string iterator
   * @param str - The string to iterate over
   */
  constructor(str: unknown);

  /**
   * Returns the next character in the string
   * Properly handles multi-byte Unicode characters
   * @returns Iterator result containing the next character or completion signal
   */
  next(): IteratorResult<string>;

  /** Iterator protocol */
  [Symbol.iterator](): StringIterator;
}

/**
 * Module initialization
 * Installs the String iterator on String.prototype
 * 
 * Implementation details:
 * - Uses internal state management to track iteration position
 * - Handles Unicode characters correctly via charAt utility
 * - Returns {value: undefined, done: true} when iteration completes
 * - Advances index by character length (handles surrogate pairs)
 */
export {};

declare global {
  interface String {
    /** Returns an iterator for the string */
    [Symbol.iterator](): StringIterator;
  }
}