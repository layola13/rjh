/**
 * Iterator result interface conforming to ES2015 IteratorResult specification
 * @template T - The type of value being iterated
 */
interface IteratorResult<T> {
  /** Indicates whether the iteration has completed */
  done: boolean;
  /** The current value in the iteration, or undefined if done is true */
  value: T | undefined;
}

/**
 * Number iterator interface
 * Provides iteration over a numeric range from 0 to a specified limit
 */
interface NumberIterator {
  /** Internal limit value for the iteration */
  _l: number;
  /** Internal current index position in the iteration */
  _i: number;
  /** Returns the next value in the iteration sequence */
  next(): IteratorResult<number>;
}

/**
 * Constructor function type for creating number iterators
 * @param limit - The upper bound (exclusive) for the iteration
 */
type NumberIteratorConstructor = new (limit: number) => NumberIterator;

/**
 * Installs an iterator on the Number constructor
 * This function extends the Number type with iteration capabilities
 * 
 * @param target - The Number constructor to extend
 * @param name - The name identifier for this extension ("Number")
 * @param constructor - Factory function that initializes iterator state
 * @param next - Function that generates the next iteration value
 * 
 * @remarks
 * The iterator creates a sequence from 0 to (limit - 1), where:
 * - `_l` stores the numeric limit
 * - `_i` tracks the current iteration position
 * - Each call to `next()` increments `_i` and returns the previous value
 * - Returns `done: true` when `_i` reaches or exceeds `_l`
 */
declare function installNumberIterator(
  target: NumberConstructor,
  name: "Number",
  constructor: (this: NumberIterator, limit: number) => void,
  next: (this: NumberIterator) => IteratorResult<number>
): void;

/**
 * Module augmentation for Number with iterator support
 */
declare global {
  interface Number {
    [Symbol.iterator]?(): NumberIterator;
  }
}

export { installNumberIterator, NumberIterator, NumberIteratorConstructor, IteratorResult };