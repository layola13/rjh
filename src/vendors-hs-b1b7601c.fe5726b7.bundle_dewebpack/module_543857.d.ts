import { ObservableInput, OperatorFunction, ObservedValueOf } from 'rxjs';

/**
 * Projects each source value to an Observable which is merged in the output Observable,
 * emitting values only from the most recently projected Observable.
 * 
 * @template T The type of the source Observable values
 * @template R The type of the result Observable values
 * @param project A function that, when applied to an item emitted by the source Observable,
 *                returns an Observable.
 * @param resultSelector Optional function to produce the value on the output Observable
 *                       based on the values and the indices of the source and inner Observables.
 * @returns An operator function that returns an Observable that emits the result of applying
 *          the projection function to each item emitted by the source Observable and taking
 *          only the values from the most recently projected inner Observable.
 */
export function switchMap<T, R>(
  project: (value: T, index: number) => ObservableInput<R>,
  resultSelector?: (
    outerValue: T,
    innerValue: R,
    outerIndex: number,
    innerIndex: number
  ) => R
): OperatorFunction<T, R>;

/**
 * Projects each source value to an Observable which is merged in the output Observable,
 * emitting values only from the most recently projected Observable.
 * 
 * @template T The type of the source Observable values
 * @template O The type of the ObservableInput returned by the project function
 * @param project A function that, when applied to an item emitted by the source Observable,
 *                returns an Observable.
 * @returns An operator function that returns an Observable that emits the result of applying
 *          the projection function to each item emitted by the source Observable and taking
 *          only the values from the most recently projected inner Observable.
 */
export function switchMap<T, O extends ObservableInput<unknown>>(
  project: (value: T, index: number) => O
): OperatorFunction<T, ObservedValueOf<O>>;