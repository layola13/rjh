/**
 * RxJS Library Type Definitions
 * Core observable types, subjects, schedulers, operators, and creation functions
 */

import { Observable } from './Observable';
import { ConnectableObservable } from './ConnectableObservable';
import { GroupedObservable } from './GroupedObservable';
import { Subject } from './Subject';
import { BehaviorSubject } from './BehaviorSubject';
import { ReplaySubject } from './ReplaySubject';
import { AsyncSubject } from './AsyncSubject';
import { SchedulerLike } from './types';
import { Subscription } from './Subscription';
import { Subscriber } from './Subscriber';
import { Notification } from './Notification';

// ============================================================================
// Core Observable Types
// ============================================================================

/**
 * Base Observable class for creating and managing data streams
 */
export { Observable };

/**
 * Observable that multicasts to multiple subscribers through a Subject
 */
export { ConnectableObservable };

/**
 * Observable representing grouped values sharing a common key
 */
export { GroupedObservable };

// ============================================================================
// Subject Types
// ============================================================================

/**
 * Special Observable that allows multicasting to multiple observers
 */
export { Subject };

/**
 * Subject that requires an initial value and emits current value to new subscribers
 */
export { BehaviorSubject };

/**
 * Subject that buffers and replays a specified number of values to new subscribers
 */
export { ReplaySubject };

/**
 * Subject that only emits the last value upon completion
 */
export { AsyncSubject };

// ============================================================================
// Schedulers
// ============================================================================

/**
 * Scheduler that executes tasks asynchronously as soon as possible (microtask queue)
 */
export const asapScheduler: SchedulerLike;

/**
 * Scheduler that executes tasks asynchronously using setTimeout (macrotask queue)
 */
export const asyncScheduler: SchedulerLike;

/**
 * Scheduler that executes tasks synchronously in a queue
 */
export const queueScheduler: SchedulerLike;

/**
 * Scheduler that executes tasks synchronized with browser repaint using requestAnimationFrame
 */
export const animationFrameScheduler: SchedulerLike;

/**
 * Scheduler for virtual time testing scenarios
 */
export class VirtualTimeScheduler {
  /** Time conversion factor for virtual time units */
  static frameTimeFactor: number;
  /** Maximum number of frames to process */
  maxFrames: number;
  /** Current frame number */
  frame: number;
  /** Flush all scheduled actions up to maxFrames */
  flush(): void;
}

/**
 * Action used with VirtualTimeScheduler
 */
export class VirtualAction<T = any> {
  /** Schedule work with optional state and delay */
  schedule(state?: T, delay?: number): Subscription;
}

/**
 * Base Scheduler class
 */
export class Scheduler implements SchedulerLike {
  /** Schedule a unit of work */
  schedule<T>(work: (state?: T) => void, delay?: number, state?: T): Subscription;
  /** Get current time according to scheduler */
  now(): number;
}

// ============================================================================
// Subscription Management
// ============================================================================

/**
 * Represents a disposable resource with cleanup logic
 */
export { Subscription };

/**
 * Observer that can be used to feed values into a Subject or Observable
 */
export { Subscriber };

// ============================================================================
// Notification & Utilities
// ============================================================================

/**
 * Represents a signal emitted by an Observable (next, error, or complete)
 */
export { Notification };

/**
 * Compose multiple unary operators into a single operator
 */
export function pipe<T, R>(...operations: Array<(source: T) => R>): (source: T) => R;

/**
 * No-operation function that does nothing
 */
export function noop(): void;

/**
 * Identity function that returns its input unchanged
 */
export function identity<T>(x: T): T;

/**
 * Check if a value is an Observable
 */
export function isObservable<T = any>(value: any): value is Observable<T>;

// ============================================================================
// Error Types
// ============================================================================

/**
 * Error thrown when an argument is out of valid range
 */
export class ArgumentOutOfRangeError extends Error {
  constructor();
}

/**
 * Error thrown when an Observable unexpectedly completes empty
 */
export class EmptyError extends Error {
  constructor();
}

/**
 * Error thrown when attempting to emit on an unsubscribed Subject
 */
export class ObjectUnsubscribedError extends Error {
  constructor();
}

/**
 * Error thrown when one or more errors occur during unsubscription
 */
export class UnsubscriptionError extends Error {
  readonly errors: any[];
  constructor(errors: any[]);
}

/**
 * Error thrown when a timeout occurs
 */
export class TimeoutError extends Error {
  constructor();
}

// ============================================================================
// Creation Functions
// ============================================================================

/**
 * Convert a callback-style API to an Observable
 * @param callbackFunc Function that accepts a callback as last parameter
 * @param resultSelector Optional function to transform callback results
 * @param scheduler Optional scheduler for async execution
 */
export function bindCallback<T>(
  callbackFunc: (...args: any[]) => void,
  resultSelector?: (...args: any[]) => T,
  scheduler?: SchedulerLike
): (...args: any[]) => Observable<T>;

/**
 * Convert a Node.js-style callback API (error-first) to an Observable
 * @param callbackFunc Function that accepts an error-first callback as last parameter
 * @param resultSelector Optional function to transform callback results
 * @param scheduler Optional scheduler for async execution
 */
export function bindNodeCallback<T>(
  callbackFunc: (...args: any[]) => void,
  resultSelector?: (...args: any[]) => T,
  scheduler?: SchedulerLike
): (...args: any[]) => Observable<T>;

/**
 * Combine multiple Observables; emit array of latest values when any input emits
 */
export function combineLatest<T, R>(
  ...observables: Array<Observable<T> | ((...values: T[]) => R)>
): Observable<R>;

/**
 * Concatenate multiple Observables sequentially
 */
export function concat<T>(...observables: Array<Observable<T>>): Observable<T>;

/**
 * Create an Observable lazily when subscribed
 * @param observableFactory Factory function that returns an Observable
 */
export function defer<T>(observableFactory: () => Observable<T>): Observable<T>;

/**
 * Create an Observable that immediately completes
 * @param scheduler Optional scheduler for completion notification
 */
export function empty<T>(scheduler?: SchedulerLike): Observable<T>;

/**
 * Wait for all Observables to complete, then emit array of final values
 */
export function forkJoin<T>(...sources: Array<Observable<T>>): Observable<T[]>;
export function forkJoin<T, R>(
  ...sourcesAndResultSelector: Array<Observable<T> | ((...values: T[]) => R)>
): Observable<R>;

/**
 * Convert various input types (array, promise, iterable, observable) to Observable
 */
export function from<T>(input: Observable<T> | Promise<T> | ArrayLike<T> | Iterable<T>): Observable<T>;

/**
 * Create Observable from DOM events
 * @param target Event target (DOM element, Node.js EventEmitter, etc.)
 * @param eventName Name of the event
 * @param options Optional event listener options or result selector
 * @param resultSelector Optional function to transform event data
 */
export function fromEvent<T>(
  target: any,
  eventName: string,
  options?: EventListenerOptions | ((...args: any[]) => T),
  resultSelector?: (...args: any[]) => T
): Observable<T>;

/**
 * Create Observable from arbitrary event registration API
 * @param addHandler Function to register event handler
 * @param removeHandler Optional function to unregister event handler
 * @param resultSelector Optional function to transform event data
 */
export function fromEventPattern<T>(
  addHandler: (handler: Function) => any,
  removeHandler?: (handler: Function, signal?: any) => void,
  resultSelector?: (...args: any[]) => T
): Observable<T>;

/**
 * Generate Observable sequence by iterative state transformation
 */
export function generate<T, S>(
  initialState: S,
  condition: (state: S) => boolean,
  iterate: (state: S) => S,
  resultSelector?: (state: S) => T,
  scheduler?: SchedulerLike
): Observable<T>;
export function generate<S>(options: {
  initialState: S;
  condition?: (state: S) => boolean;
  iterate: (state: S) => S;
  resultSelector?: (state: S) => any;
  scheduler?: SchedulerLike;
}): Observable<any>;

/**
 * Conditionally choose between two Observables based on predicate
 * @param condition Predicate function evaluated at subscription time
 * @param trueResult Observable emitted if condition is true
 * @param falseResult Observable emitted if condition is false
 */
export function iif<T>(
  condition: () => boolean,
  trueResult?: Observable<T>,
  falseResult?: Observable<T>
): Observable<T>;

/**
 * Create Observable that emits sequential numbers at fixed intervals
 * @param period Interval duration in milliseconds
 * @param scheduler Optional scheduler (defaults to asyncScheduler)
 */
export function interval(period?: number, scheduler?: SchedulerLike): Observable<number>;

/**
 * Merge multiple Observables into single Observable emitting all values concurrently
 */
export function merge<T>(...observables: Array<Observable<T>>): Observable<T>;
export function merge<T>(
  ...observables: Array<Observable<T> | SchedulerLike | number>
): Observable<T>;

/**
 * Create Observable that never emits and never completes
 */
export function never(): Observable<never>;

/**
 * Emit variable number of values synchronously
 */
export function of<T>(...values: T[]): Observable<T>;
export function of<T>(...values: Array<T | SchedulerLike>): Observable<T>;

/**
 * Continue subscribing to subsequent Observables when errors occur
 */
export function onErrorResumeNext<T>(...sources: Array<Observable<T>>): Observable<T>;

/**
 * Create Observable from object's key-value pairs
 * @param obj Object to convert to Observable
 * @param scheduler Optional scheduler for emission timing
 */
export function pairs<T>(
  obj: Record<string, T>,
  scheduler?: SchedulerLike
): Observable<[string, T]>;

/**
 * Race multiple Observables; emit from the first to emit
 */
export function race<T>(...observables: Array<Observable<T>>): Observable<T>;

/**
 * Emit sequence of numbers within specified range
 * @param start Starting value (inclusive)
 * @param count Number of values to emit
 * @param scheduler Optional scheduler for emission timing
 */
export function range(
  start?: number,
  count?: number,
  scheduler?: SchedulerLike
): Observable<number>;

/**
 * Create Observable that immediately emits an error
 * @param error Error to emit
 * @param scheduler Optional scheduler for error emission
 */
export function throwError(error: any, scheduler?: SchedulerLike): Observable<never>;

/**
 * Create Observable that emits after specified delay, then optionally at intervals
 * @param dueTime Initial delay in milliseconds or Date
 * @param periodOrScheduler Optional period in ms or scheduler
 * @param scheduler Optional scheduler
 */
export function timer(
  dueTime?: number | Date,
  periodOrScheduler?: number | SchedulerLike,
  scheduler?: SchedulerLike
): Observable<number>;

/**
 * Create Observable from resource that is disposed when unsubscribed
 * @param resourceFactory Factory function that creates disposable resource
 * @param observableFactory Factory function that creates Observable using resource
 */
export function using<T>(
  resourceFactory: () => Subscription | void,
  observableFactory: (resource: Subscription | void) => Observable<T>
): Observable<T>;

/**
 * Combine multiple Observables; emit array when all have emitted at each index
 */
export function zip<T, R>(
  ...observables: Array<Observable<T> | ((...values: T[]) => R)>
): Observable<R>;

// ============================================================================
// Constants
// ============================================================================

/**
 * Shared empty Observable that immediately completes
 */
export const EMPTY: Observable<never>;

/**
 * Shared Observable that never emits and never completes
 */
export const NEVER: Observable<never>;

/**
 * Global RxJS configuration object
 */
export const config: {
  /** Promise constructor used internally */
  Promise?: PromiseConstructorLike;
  /** Enable/disable promise rejection tracking */
  useDeprecatedSynchronousErrorHandling?: boolean;
  /** Enable/disable deprecated next context */
  useDeprecatedNextContext?: boolean;
};