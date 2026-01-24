/**
 * RxJS reduce operator type definitions
 * Reduces the source Observable to a single value by applying an accumulator function.
 */

import { OperatorFunction } from 'rxjs';

/**
 * Accumulator function type for the reduce operator
 * @template T - The type of items emitted by the source Observable
 * @template R - The type of the accumulated result
 */
export type AccumulatorFunction<T, R> = (accumulator: R, value: T, index: number) => R;

/**
 * Applies an accumulator function over the source Observable, and returns the accumulated result
 * when the source completes, given an optional seed value.
 * 
 * @template T - The type of items emitted by the source Observable
 * @template R - The type of the accumulated result
 * @param accumulator - The accumulator function called on each source value
 * @param seed - The initial accumulation value (optional)
 * @returns An OperatorFunction that emits a single value - the result of accumulating the values emitted by the source Observable
 * 
 * @example
 *