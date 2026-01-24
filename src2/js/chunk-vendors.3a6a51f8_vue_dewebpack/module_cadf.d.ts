/**
 * Array iterator module implementing ES6 iteration protocols for arrays.
 * Provides keys(), values(), and entries() iteration methods.
 * @module ArrayIterator
 */

/**
 * Iterator kind type definition
 * - "keys": iterate over array indices
 * - "values": iterate over array values
 * - "entries": iterate over [index, value] tuples
 */
type IteratorKind = "keys" | "values" | "entries";

/**
 * Iterator result object returned by iterator.next()
 * @template T - The type of the value being iterated
 */
interface IteratorResult<T> {
  /** Indicates whether the iterator has completed */
  done: boolean;
  /** The current iteration value (undefined when done is true) */
  value: T | undefined;
}

/**
 * Array iterator state interface
 * @template T - The type of array elements
 */
interface ArrayIteratorState<T> {
  /** The array being iterated over */
  _t: ArrayLike<T> | undefined;
  /** Current iteration index */
  _i: number;
  /** The kind of iteration (keys, values, or entries) */
  _k: IteratorKind;
}

/**
 * Creates an iterator result object
 * @template T - The type of the iteration value
 * @param done - Whether the iteration is complete (0 = ongoing, 1 = done)
 * @param value - The value to return (omitted when done)
 * @returns Iterator result object
 */
declare function createIteratorResult<T>(
  done: 0 | 1,
  value?: T
): IteratorResult<T>;

/**
 * Converts value to array-like object
 * @template T - The type of array elements
 * @param value - Value to convert to array-like
 * @returns Array-like object
 */
declare function toIndexedObject<T>(value: unknown): ArrayLike<T>;

/**
 * Adds well-known symbol to iterators collection
 * @param name - Iterator method name to register
 */
declare function addIteratorToCollection(name: string): void;

/**
 * Creates an iterator constructor with prototype methods
 * @template T - The type of array elements
 * @param Constructor - The base constructor (Array)
 * @param name - The constructor name
 * @param next - The iterator next() method implementation
 * @param kind - The default iteration kind
 * @returns Iterator constructor function
 */
declare function defineIterator<T>(
  Constructor: ArrayConstructor,
  name: string,
  iteratorFactory: (array: ArrayLike<T>, kind: IteratorKind) => void,
  nextMethod: () => IteratorResult<T | number | [number, T]>,
  defaultKind: IteratorKind
): void;

/**
 * Global iterators registry for built-in types
 */
declare const Iterators: {
  /** Array iterator implementation */
  Array: Iterator<unknown>;
  /** Arguments object iterator (aliases Array iterator) */
  Arguments: Iterator<unknown>;
};

/**
 * Array iterator constructor function
 * Initializes iterator state for array iteration
 * @template T - The type of array elements
 * @param array - The array to iterate over
 * @param kind - The kind of iteration to perform
 */
declare function ArrayIterator<T>(
  this: ArrayIteratorState<T>,
  array: ArrayLike<T>,
  kind: IteratorKind
): void;

/**
 * Iterator next() method implementation
 * Returns the next value in the iteration sequence
 * @template T - The type of array elements
 * @this {ArrayIteratorState<T>}
 * @returns Iterator result with value based on iteration kind
 */
declare function next<T>(
  this: ArrayIteratorState<T>
): IteratorResult<T | number | [number, T]>;

export { ArrayIterator, IteratorKind, IteratorResult, ArrayIteratorState };
export default ArrayIterator;