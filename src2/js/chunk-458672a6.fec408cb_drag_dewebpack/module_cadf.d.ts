/**
 * Array iterator module
 * Provides iteration capabilities for arrays with support for keys, values, and entries.
 * 
 * @module cadf
 * @dependencies
 * - 9c6c: Iterator registration utility
 * - d53b: Iterator result creator
 * - 84f2: Iterators registry
 * - 6821: Array-like to indexed object converter
 * - 01f9: Iterator factory/creator
 */

/**
 * Iterator kind type
 * Determines what the iterator yields
 */
type IteratorKind = 'keys' | 'values' | 'entries';

/**
 * Iterator result structure
 */
interface IteratorResult<T> {
  /** Indicates if iteration is complete */
  done: boolean;
  /** The current iteration value (undefined when done) */
  value?: T;
}

/**
 * Internal state for array iterator
 */
interface ArrayIteratorState<T> {
  /** The target array or array-like object being iterated */
  _t: ArrayLike<T> | undefined;
  /** Current iteration index */
  _i: number;
  /** Iterator kind: 'keys', 'values', or 'entries' */
  _k: IteratorKind;
}

/**
 * Array iterator class
 * Implements iteration protocol for arrays
 */
interface ArrayIterator<T> extends ArrayIteratorState<T> {
  /**
   * Get the next iteration result
   * @returns Iterator result containing either the key, value, or [key, value] pair
   */
  next(): IteratorResult<number | T | [number, T]>;
}

/**
 * Registers an iterator method on a constructor
 * @param method - The iterator method name to register
 */
declare function registerIterator(method: string): void;

/**
 * Creates an iterator result object
 * @param done - Whether iteration is complete (0 = false, 1 = true)
 * @param value - Optional value for the current iteration
 * @returns Iterator result object
 */
declare function createIteratorResult<T>(
  done: 0 | 1,
  value?: T
): IteratorResult<T>;

/**
 * Converts array-like object to indexed object
 * @param target - Array or array-like object
 * @returns Indexed object representation
 */
declare function toIndexedObject<T>(target: ArrayLike<T>): ArrayLike<T>;

/**
 * Creates an iterator factory for a given constructor
 * @param Constructor - The constructor to attach iterator to
 * @param name - Name of the constructor
 * @param initializer - Function to initialize iterator state
 * @param nextFunction - Function to get next iteration value
 * @param defaultKind - Default iteration kind
 * @returns The modified constructor with iterator support
 */
declare function createIteratorFactory<T>(
  Constructor: ArrayConstructor,
  name: string,
  initializer: (target: ArrayLike<T>, kind: IteratorKind) => void,
  nextFunction: () => IteratorResult<number | T | [number, T]>,
  defaultKind: IteratorKind
): ArrayConstructor;

/**
 * Global iterators registry
 */
declare const Iterators: {
  /** Array iterator reference */
  Array: any;
  /** Arguments object iterator reference */
  Arguments: any;
};

/**
 * Array iterator module export
 * Sets up iteration support for Array with keys, values, and entries methods
 */
declare module 'cadf' {
  /**
   * Initializes array iteration capabilities
   * - Creates iterator with keys, values, and entries support
   * - Registers 'keys', 'values', and 'entries' methods
   * - Sets Arguments iterator to match Array iterator
   */
  const arrayIteratorModule: ArrayConstructor;
  export = arrayIteratorModule;
}