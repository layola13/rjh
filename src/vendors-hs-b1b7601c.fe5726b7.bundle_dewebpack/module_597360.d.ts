/**
 * RxJS operator that maps each source value to the same inner Observable,
 * then merges the resulting Observables into a single output Observable.
 * 
 * @module mergeMapTo
 */

import { Observable } from 'rxjs';
import { ObservableInput, OperatorFunction } from 'rxjs';

/**
 * Projects each source value to the same Observable which is merged multiple times
 * in the output Observable.
 *
 * @template T - The type of elements in the source Observable
 * @template R - The type of elements in the inner Observable and output Observable
 * @param innerObservable - An Observable to replace each value from the source Observable
 * @param resultSelector - Optional function to produce the value on the output Observable based on the values and indices of the source and inner Observables
 * @param concurrent - Maximum number of input Observables being subscribed to concurrently. Defaults to Infinity
 * @returns An operator function that returns an Observable that emits items from the given inner Observable
 */
export function mergeMapTo<T, R>(
  innerObservable: ObservableInput<R>,
  resultSelector?: ((outerValue: T, innerValue: R, outerIndex: number, innerIndex: number) => R) | number,
  concurrent?: number
): OperatorFunction<T, R>;

/**
 * Projects each source value to the same Observable which is merged multiple times
 * in the output Observable.
 *
 * @template T - The type of elements in the source Observable
 * @template R - The type of elements in the inner Observable and output Observable
 * @param innerObservable - An Observable to replace each value from the source Observable
 * @param concurrent - Maximum number of input Observables being subscribed to concurrently
 * @returns An operator function that returns an Observable that emits items from the given inner Observable
 */
export function mergeMapTo<T, R>(
  innerObservable: ObservableInput<R>,
  concurrent: number
): OperatorFunction<T, R>;