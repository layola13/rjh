/**
 * RxJS mergeMap operator type definitions
 * Provides type-safe mergeMap (flatMap) functionality for Observable streams
 */

import { Observable, OperatorFunction, ObservableInput, ObservedValueOf } from 'rxjs';
import { Subscriber } from 'rxjs/internal/Subscriber';
import { OuterSubscriber } from 'rxjs/internal/OuterSubscriber';
import { InnerSubscriber } from 'rxjs/internal/InnerSubscriber';

/**
 * Project function that maps source values to Observable streams
 * @template T - Source value type
 * @template R - Result value type
 * @param value - The source value to project
 * @param index - The index of the source value in the sequence
 * @returns An ObservableInput that will be merged into the output Observable
 */
export type MergeMapProjectFunction<T, R> = (value: T, index: number) => ObservableInput<R>;

/**
 * Result selector function for combining source and inner values
 * @template T - Source value type
 * @template I - Inner Observable value type
 * @template R - Result value type
 * @param outerValue - The value from the source Observable
 * @param innerValue - The value from the projected inner Observable
 * @param outerIndex - The index of the outer value
 * @param innerIndex - The index of the inner value
 * @returns The combined result value
 */
export type MergeMapResultSelector<T, I, R> = (
  outerValue: T,
  innerValue: I,
  outerIndex: number,
  innerIndex: number
) => R;

/**
 * mergeMap operator overloads
 * 
 * Maps each source value to an Observable, then flattens all inner Observables
 * using mergeAll. Supports optional concurrency limiting.
 */

/**
 * mergeMap with project function and result selector
 * @template T - Source Observable value type
 * @template I - Intermediate projected Observable value type
 * @template R - Final result value type
 * @param project - Function to map source values to inner Observables
 * @param resultSelector - Function to combine outer and inner values
 * @param concurrent - Maximum number of inner Observables subscribed concurrently (default: Infinity)
 * @returns Operator function that applies mergeMap transformation
 */
export function mergeMap<T, I, R>(
  project: MergeMapProjectFunction<T, I>,
  resultSelector: MergeMapResultSelector<T, I, R>,
  concurrent?: number
): OperatorFunction<T, R>;

/**
 * mergeMap with project function only
 * @template T - Source Observable value type
 * @template R - Result Observable value type
 * @param project - Function to map source values to inner Observables
 * @param concurrent - Maximum number of inner Observables subscribed concurrently (default: Infinity)
 * @returns Operator function that applies mergeMap transformation
 */
export function mergeMap<T, R>(
  project: MergeMapProjectFunction<T, R>,
  concurrent?: number
): OperatorFunction<T, ObservedValueOf<R>>;

/**
 * Internal operator class implementing mergeMap logic
 * @internal
 */
declare class MergeMapOperator<T, R> {
  constructor(project: MergeMapProjectFunction<T, R>, concurrent: number);
  
  /** Project function to transform source values */
  readonly project: MergeMapProjectFunction<T, R>;
  
  /** Maximum concurrent inner subscriptions */
  readonly concurrent: number;
  
  /**
   * Apply operator to source Observable
   * @param subscriber - The output subscriber
   * @param source - The source Observable
   * @returns Subscription
   */
  call(subscriber: Subscriber<R>, source: Observable<T>): any;
}

/**
 * Subscriber handling mergeMap logic with concurrency control
 * @internal
 */
declare class MergeMapSubscriber<T, R> extends OuterSubscriber<T, R> {
  constructor(
    destination: Subscriber<R>,
    project: MergeMapProjectFunction<T, R>,
    concurrent: number
  );
  
  /** Project function to transform source values */
  private readonly project: MergeMapProjectFunction<T, R>;
  
  /** Maximum concurrent inner subscriptions */
  private readonly concurrent: number;
  
  /** Whether the source Observable has completed */
  private hasCompleted: boolean;
  
  /** Buffer for values waiting to be processed */
  private buffer: T[];
  
  /** Current number of active inner subscriptions */
  private active: number;
  
  /** Current index in the source sequence */
  private index: number;
  
  /** Handle next value from source */
  protected _next(value: T): void;
  
  /** Attempt to project and subscribe to next value */
  private _tryNext(value: T): void;
  
  /** Subscribe to inner Observable */
  private _innerSub(observable: ObservableInput<R>, outerValue: T, outerIndex: number): void;
  
  /** Handle source completion */
  protected _complete(): void;
  
  /** Handle inner Observable emitting a value */
  notifyNext(outerValue: T, innerValue: R, outerIndex: number, innerIndex: number, innerSub: InnerSubscriber<T, R>): void;
  
  /** Handle inner Observable completion */
  notifyComplete(innerSub: InnerSubscriber<T, R>): void;
}