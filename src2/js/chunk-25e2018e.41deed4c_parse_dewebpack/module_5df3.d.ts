/**
 * String Iterator Module
 * Provides iterator functionality for String objects with proper Unicode support
 */

/**
 * Iterator state for string traversal
 */
interface StringIteratorState {
  /** The string being iterated */
  _t: string;
  /** Current iteration index */
  _i: number;
}

/**
 * Iterator result returned by the string iterator
 */
interface IteratorResult<T> {
  /** The current value in the iteration */
  value: T | undefined;
  /** Whether the iteration has completed */
  done: boolean;
}

/**
 * Function that extracts a character (or Unicode code point) from a string at a given position
 * @param str - The source string
 * @param index - The position to read from
 * @returns The character(s) at the position, accounting for Unicode surrogate pairs
 */
type CharAtFunction = (str: string, index: number) => string;

/**
 * String iterator constructor function
 * @param value - The string value to iterate over
 */
interface StringIteratorConstructor {
  new (value: string): StringIterator;
  (value: string): StringIterator;
}

/**
 * String iterator instance
 */
interface StringIterator extends StringIteratorState {
  /**
   * Returns the next character in the iteration sequence
   * @returns An iterator result with the next character or completion status
   */
  next(): IteratorResult<string>;
}

/**
 * Installs a string iterator on the String prototype
 * @param constructor - The String constructor
 * @param constructorName - The name of the constructor ("String")
 * @param iteratorInit - Initialization function for the iterator state
 * @param iteratorNext - Function that produces the next value in iteration
 */
declare function installStringIterator(
  constructor: StringConstructor,
  constructorName: 'String',
  iteratorInit: (this: StringIteratorState, value: string) => void,
  iteratorNext: (this: StringIteratorState) => IteratorResult<string>
): void;

/**
 * Creates a Unicode-aware character reader
 * @param supportSurrogatePairs - Whether to handle Unicode surrogate pairs correctly
 * @returns A function that reads characters from strings
 */
declare function createCharAtFunction(supportSurrogatePairs: boolean): CharAtFunction;

export type {
  StringIteratorState,
  IteratorResult,
  CharAtFunction,
  StringIteratorConstructor,
  StringIterator
};

export { installStringIterator, createCharAtFunction };