/**
 * RxJS `every` operator type definitions
 * 
 * Tests whether every element emitted by the source Observable satisfies a condition.
 * Returns an Observable that emits `true` if all values pass the predicate, otherwise `false`.
 */

/**
 * Predicate function type for testing each emitted value
 * 
 * @template T - The type of values emitted by the source Observable
 * @param value - The current value being tested
 * @param index - The zero-based index of the value in the sequence
 * @param source - Reference to the source Observable
 * @returns `true` if the value passes the test, `false` otherwise
 */
export type EveryPredicate<T> = (
  value: T,
  index: number,
  source: Observable<T>
) => boolean;

/**
 * Tests whether every element emitted by the source Observable passes the condition
 * specified by the predicate function.
 * 
 * If any value fails the predicate test, the result Observable immediately emits `false`
 * and completes. If all values pass (or the source completes without emitting), 
 * it emits `true` and completes.
 * 
 * @template T - The type of values emitted by the source Observable
 * @param predicate - A function called for each emitted value to test for a condition
 * @param thisArg - Optional `this` context to use when executing the predicate function
 * @returns An OperatorFunction that emits a single boolean value
 * 
 * @example
 *