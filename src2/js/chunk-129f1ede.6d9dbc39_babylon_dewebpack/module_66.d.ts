/**
 * RxJS Zip Operator Type Definitions
 * Combines multiple observables by waiting for all to emit, then emitting an array of values
 */

import { Observable } from 'rxjs';
import { OperatorFunction } from 'rxjs';
import { ObservableInput } from 'rxjs';

/**
 * Result selector function type for zip operator
 * Combines emitted values from multiple sources into a single result
 */
type ZipResultSelector<T, R> = (...values: T[]) => R;

/**
 * Zip function overloads for combining multiple observables
 * Waits for all input observables to emit, then combines their values
 * 
 * @param observables - Array of observable inputs to combine
 * @param resultSelector - Optional function to transform combined values
 * @returns Observable that emits combined values as arrays or transformed results
 */
export function zip<T>(...observables: ObservableInput<T>[]): Observable<T[]>;
export function zip<T, R>(
  ...observables: [...ObservableInput<T>[], ZipResultSelector<T, R>]
): Observable<R>;
export function zip<T1, T2>(
  v1: ObservableInput<T1>,
  v2: ObservableInput<T2>
): Observable<[T1, T2]>;
export function zip<T1, T2, T3>(
  v1: ObservableInput<T1>,
  v2: ObservableInput<T2>,
  v3: ObservableInput<T3>
): Observable<[T1, T2, T3]>;
export function zip<T1, T2, T3, T4>(
  v1: ObservableInput<T1>,
  v2: ObservableInput<T2>,
  v3: ObservableInput<T3>,
  v4: ObservableInput<T4>
): Observable<[T1, T2, T3, T4]>;
export function zip<T1, T2, T3, T4, T5>(
  v1: ObservableInput<T1>,
  v2: ObservableInput<T2>,
  v3: ObservableInput<T3>,
  v4: ObservableInput<T4>,
  v5: ObservableInput<T5>
): Observable<[T1, T2, T3, T4, T5]>;
export function zip<T1, T2, T3, T4, T5, T6>(
  v1: ObservableInput<T1>,
  v2: ObservableInput<T2>,
  v3: ObservableInput<T3>,
  v4: ObservableInput<T4>,
  v5: ObservableInput<T5>,
  v6: ObservableInput<T6>
): Observable<[T1, T2, T3, T4, T5, T6]>;

/**
 * Zip operator class
 * Implements the RxJS operator pattern for combining multiple observables
 */
export class ZipOperator<T, R> implements OperatorFunction<T, R> {
  /**
   * @param resultSelector - Optional function to transform combined values
   */
  constructor(resultSelector?: ZipResultSelector<T, R>);
  
  /**
   * Applies the zip operator to a source observable
   * @param source - The source observable to zip with others
   * @param subscriber - The destination subscriber
   */
  call(subscriber: Subscriber<R>, source: Observable<T>): Subscription;
}

/**
 * Iterator interface for zip operation
 * Manages value emission and completion state for each input source
 */
interface ZipIterator<T> {
  /**
   * Checks if the iterator has a buffered value ready
   */
  hasValue(): boolean;
  
  /**
   * Retrieves the next value from the iterator
   */
  next(): IteratorResult<T>;
  
  /**
   * Checks if the iterator has completed emission
   */
  hasCompleted(): boolean;
}

/**
 * Array-based iterator for zip operation
 * Iterates over array values synchronously
 */
declare class ArrayIterator<T> implements ZipIterator<T> {
  private readonly array: T[];
  private index: number;
  private readonly length: number;
  
  constructor(array: T[]);
  
  [Symbol.iterator](): this;
  hasValue(): boolean;
  next(): IteratorResult<T>;
  hasCompleted(): boolean;
}

/**
 * Standard iterator wrapper for zip operation
 * Wraps ES6 iterators for use in zip
 */
declare class StandardIterator<T> implements ZipIterator<T> {
  private readonly iterator: Iterator<T>;
  private nextResult: IteratorResult<T>;
  
  constructor(iterator: Iterator<T>);
  
  hasValue(): boolean;
  next(): IteratorResult<T>;
  hasCompleted(): boolean;
}

/**
 * Observable-based iterator for zip operation
 * Buffers values from an observable source for zip combination
 */
declare class ObservableIterator<T> implements ZipIterator<T> {
  private readonly destination: Subscriber<unknown>;
  private readonly parent: ZipSubscriber<unknown, unknown>;
  private readonly observable: ObservableInput<T>;
  private readonly buffer: T[];
  private isComplete: boolean;
  private stillUnsubscribed: boolean;
  
  constructor(
    destination: Subscriber<unknown>,
    parent: ZipSubscriber<unknown, unknown>,
    observable: ObservableInput<T>
  );
  
  [Symbol.iterator](): this;
  hasValue(): boolean;
  next(): IteratorResult<T>;
  hasCompleted(): boolean;
  notifyComplete(): void;
  notifyNext(value: T): void;
  subscribe(index: number): Subscription;
}

/**
 * Subscriber implementation for zip operator
 * Manages multiple iterators and combines their values
 */
declare class ZipSubscriber<T, R> extends Subscriber<T> {
  private readonly iterators: ZipIterator<unknown>[];
  private active: number;
  private readonly resultSelector: ZipResultSelector<unknown, R> | null;
  private readonly values: Record<string, unknown>;
  
  constructor(
    destination: Subscriber<R>,
    resultSelector?: ZipResultSelector<unknown, R> | null,
    values?: Record<string, unknown>
  );
  
  protected _next(value: T): void;
  protected _complete(): void;
  
  /**
   * Notifies when an iterator becomes inactive
   * Completes the zip when all iterators are inactive
   */
  notifyInactive(): void;
  
  /**
   * Checks all iterators and emits combined values when ready
   */
  checkIterators(): void;
  
  /**
   * Attempts to apply result selector to combined values
   */
  private _tryresultSelector(values: unknown[]): void;
}

export { ZipOperator as a };