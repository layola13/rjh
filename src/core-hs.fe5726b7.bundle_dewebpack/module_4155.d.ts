/**
 * Array Iterator Module
 * 
 * Provides iteration support for arrays with three iteration modes:
 * - "keys": iterates over array indices
 * - "values": iterates over array values
 * - "entries": iterates over [index, value] pairs
 * 
 * This module implements the standard JavaScript Array Iterator protocol
 * and ensures compatibility across different environments.
 */

/**
 * Type of iteration to perform on the array
 */
type IterationKind = 'keys' | 'values' | 'entries';

/**
 * Internal state maintained for each array iterator instance
 */
interface ArrayIteratorState<T = unknown> {
  /** Type identifier for the iterator */
  type: 'Array Iterator';
  /** The array being iterated over */
  target: T[] | undefined;
  /** Current position in the array */
  index: number;
  /** The kind of iteration being performed */
  kind: IterationKind;
}

/**
 * Result returned by iterator.next()
 */
interface IteratorResult<T> {
  /** The current iteration value */
  value: T | undefined;
  /** Whether the iteration is complete */
  done: boolean;
}

/**
 * Converts an array-like object to an actual array
 */
declare function toIndexedObject<T>(value: ArrayLike<T>): T[];

/**
 * Adds well-known symbols to the specified constructor
 */
declare function addToUnscopables(propertyName: string): void;

/**
 * Creates an iterator result object
 */
declare function createIteratorResult<T>(value: T | undefined, done: boolean): IteratorResult<T>;

/**
 * Defines or modifies a property on an object
 */
declare function defineProperty<T extends object>(
  target: T,
  propertyName: string,
  descriptor: PropertyDescriptor
): void;

/**
 * Creates a new iterator constructor with the specified behavior
 */
declare function createIteratorConstructor<T>(
  Constructor: new (...args: any[]) => T,
  name: string,
  initialize: (target: unknown, kind: IterationKind) => void,
  next: () => IteratorResult<unknown>,
  defaultKind: IterationKind
): void;

/**
 * Manages internal state for iterator instances
 */
interface InternalStateManager<T> {
  /** Sets internal state for an instance */
  set(instance: object, state: T): void;
  /** Gets internal state accessor function */
  getterFor(type: string): (instance: object) => T;
}

/**
 * Global iterators registry
 */
interface IteratorsRegistry {
  /** Array iterator */
  Array?: Iterator<unknown>;
  /** Arguments object iterator */
  Arguments?: Iterator<unknown>;
}

/**
 * Standard Iterator interface
 */
interface Iterator<T> {
  /** Returns the next iteration result */
  next(): IteratorResult<T>;
  /** Optional name property */
  name?: string;
}

declare const internalState: InternalStateManager<ArrayIteratorState>;
declare const iterators: IteratorsRegistry;
declare const descriptors: boolean;
declare const isNativeImplementation: boolean;

/**
 * Module exports - Array iterator implementation
 * 
 * Initializes Array.prototype iteration methods (keys, values, entries)
 * and ensures the Arguments object shares the same iterator behavior.
 * 
 * @remarks
 * The implementation:
 * 1. Creates an iterator constructor for arrays
 * 2. Initializes iterator state with target array, index, and kind
 * 3. Implements next() method to advance through array elements
 * 4. Handles edge cases (empty arrays, out of bounds, undefined targets)
 * 5. Ensures Arguments object uses the same iterator
 * 6. Attempts to set correct "name" property in compatible environments
 */
export {};