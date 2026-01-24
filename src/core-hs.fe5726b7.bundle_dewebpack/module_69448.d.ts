/**
 * Iterator map function type declaration
 * Provides type-safe iterator mapping functionality
 */

/**
 * Mapper function that transforms iterator values
 * @template T - The input value type
 * @template R - The return value type
 */
type MapperFunction<T, R> = (value: T, index: number) => R;

/**
 * Iterator state interface for mapped iterations
 * @template T - The source iterator type
 * @template R - The mapped result type
 */
interface MappedIteratorState<T, R> {
  /** The underlying iterator being mapped */
  iterator: Iterator<T>;
  /** The mapper function to apply to each value */
  mapper: MapperFunction<T, R>;
  /** Current iteration counter */
  counter: number;
  /** Whether the iteration has completed */
  done: boolean;
  /** The next method for iteration */
  next: () => IteratorResult<R>;
}

/**
 * Mapped iterator class that applies a transformation function
 * @template T - The source iterator type
 * @template R - The mapped result type
 */
declare class MappedIterator<T, R> implements Iterator<R> {
  constructor(iterator: Iterator<T>, options: { mapper: MapperFunction<T, R> });
  
  /** The underlying iterator */
  iterator: Iterator<T>;
  /** The mapper function */
  mapper: MapperFunction<T, R>;
  /** Current iteration counter */
  counter: number;
  /** Completion flag */
  done: boolean;
  
  /** Advances the iterator and returns the next mapped value */
  next(): IteratorResult<R>;
}

/**
 * Creates a new iterator that applies a mapping function to each value
 * @template T - The type of values in the source iterator
 * @template R - The type of values in the resulting iterator
 * @param mapper - Function to transform each value
 * @returns A new mapped iterator
 * @example
 * const numbers = [1, 2, 3][Symbol.iterator]();
 * const doubled = mapIterator.call(numbers, x => x * 2);
 */
declare function mapIterator<T, R>(
  this: Iterator<T>,
  mapper: MapperFunction<T, R>
): MappedIterator<T, R>;

export = mapIterator;