/**
 * Array Iterator implementation module
 * Provides iterator functionality for arrays with support for keys, values, and entries iteration modes
 */

/**
 * Iterator kind type
 * Defines the mode of iteration over array elements
 */
type IteratorKind = 'keys' | 'values' | 'entries';

/**
 * Iterator state stored internally for each array iterator instance
 */
interface ArrayIteratorState {
  /** Type identifier for the iterator */
  type: 'Array Iterator';
  /** The array being iterated over */
  target: unknown[] | null;
  /** Current position in the iteration */
  index: number;
  /** Mode of iteration (keys/values/entries) */
  kind: IteratorKind;
}

/**
 * Result returned by iterator next() method
 */
interface IteratorResult<T> {
  /** The current iteration value */
  value: T;
  /** Whether the iteration has completed */
  done: boolean;
}

/**
 * Creates an iterator result object
 * @param value - The value to return
 * @param done - Whether iteration is complete
 * @returns Iterator result object
 */
declare function createIteratorResult<T>(value: T, done: boolean): IteratorResult<T>;

/**
 * Defines a property on an object
 * @param target - The target object
 * @param propertyKey - The property name
 * @param descriptor - Property descriptor
 */
declare function defineProperty(
  target: object,
  propertyKey: string,
  descriptor: PropertyDescriptor
): void;

/**
 * Adds well-known iterator symbols to the global registry
 * @param name - The iterator method name
 */
declare function addToUnscopables(name: string): void;

/**
 * Converts value to indexed object (array-like)
 * @param value - Value to convert
 * @returns Indexed object
 */
declare function toIndexedObject(value: unknown): unknown[];

/**
 * Creates an iterator constructor for the given collection type
 * @param Constructor - The collection constructor (e.g., Array)
 * @param name - Name of the collection type
 * @param iteratorFactory - Factory function that sets up iterator state
 * @param nextMethod - Method that advances the iterator and returns next value
 * @param defaultKind - Default iteration kind
 * @returns The iterator constructor
 */
declare function createIteratorConstructor(
  Constructor: ArrayConstructor,
  name: string,
  iteratorFactory: (target: unknown, kind: IteratorKind) => void,
  nextMethod: () => IteratorResult<unknown>,
  defaultKind: IteratorKind
): unknown;

/**
 * Sets internal state for an iterator instance
 * @param instance - The iterator instance
 * @param state - State object to store
 */
declare function setInternalState(instance: object, state: ArrayIteratorState): void;

/**
 * Gets internal state for an iterator instance
 * @param instance - The iterator instance
 * @returns The stored state
 */
declare function getInternalState(instance: object): ArrayIteratorState;

/**
 * Global iterators registry
 */
declare const Iterators: {
  Arguments: unknown;
  Array: unknown;
};

/**
 * Whether the environment is a pure (non-polluting) mode
 */
declare const PURE_MODE: boolean;

/**
 * Whether the environment has descriptor support
 */
declare const DESCRIPTORS: boolean;

/**
 * Module exports: Creates and configures Array iterator
 * Sets up iterator for Array with keys, values, and entries methods
 */
export default function setupArrayIterator(): void;