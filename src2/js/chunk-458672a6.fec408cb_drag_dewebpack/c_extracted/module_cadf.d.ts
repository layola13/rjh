/**
 * Array iterator module implementing ES6 iteration protocols
 * @module cadf
 */

/**
 * Iterator kind specifying what values the iterator yields
 */
type IteratorKind = 'keys' | 'values' | 'entries';

/**
 * Iterator result object conforming to ES6 IteratorResult interface
 * @template T The type of value being iterated
 */
interface IteratorResult<T> {
  /** Indicates whether the iterator has completed */
  done: boolean;
  /** The current value, undefined if done is true */
  value: T | undefined;
}

/**
 * Internal state for array iterator
 * @template T The type of array elements
 */
interface ArrayIteratorState<T> {
  /** The array being iterated */
  _t: ArrayLike<T> | undefined;
  /** Current iteration index */
  _i: number;
  /** Iterator kind (keys/values/entries) */
  _k: IteratorKind;
}

/**
 * Creates an iterator result object
 * @template T The type of the value
 * @param done - Whether iteration is complete
 * @param value - The value to yield (optional)
 * @returns Iterator result conforming to ES6 spec
 */
declare function createIteratorResult<T>(
  done: 0 | 1,
  value?: T
): IteratorResult<T>;

/**
 * Converts a value to an indexed object (array-like)
 * @template T The element type
 * @param value - Value to convert to indexed object
 * @returns Array-like object with numeric indices
 */
declare function toIndexedObject<T>(value: unknown): ArrayLike<T>;

/**
 * Adds a well-known symbol to an object
 * @param name - The symbol name to add
 */
declare function addWellKnownSymbol(name: string): void;

/**
 * Collection of iterator prototypes
 */
declare const Iterators: {
  /** Arguments object iterator prototype */
  Arguments: object;
  /** Array iterator prototype */
  Array: object;
};

/**
 * Creates an iterator constructor for a given type
 * @template T The type being iterated
 * @param Constructor - The constructor function for the iterable type
 * @param name - Name of the constructor
 * @param init - Initialization function setting up iterator state
 * @param next - Next function defining iteration behavior
 * @param defaultKind - Default iterator kind when not specified
 * @returns The configured iterator
 */
declare function defineIterator<T>(
  Constructor: ArrayConstructor,
  name: string,
  init: (target: ArrayLike<T>, kind: IteratorKind) => void,
  next: () => IteratorResult<T | number | [number, T]>,
  defaultKind: IteratorKind
): void;

/**
 * Array iterator implementation
 * Provides keys(), values(), and entries() iteration for arrays
 */
declare module 'cadf' {
  /**
   * Initializes array iterator with target and kind
   * Sets up internal state for iteration
   */
  const arrayIterator: void;
  
  export = arrayIterator;
}