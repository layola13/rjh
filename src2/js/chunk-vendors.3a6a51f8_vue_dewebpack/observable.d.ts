/**
 * Observable implementation following the ES Observable proposal.
 * Provides a standard interface for push-based data streams.
 */

/**
 * Subscription cleanup function or object with unsubscribe method
 */
export type CleanupFunction = (() => void) | { unsubscribe(): void };

/**
 * Observer interface for receiving notifications from an Observable
 * @template T The type of values emitted by the Observable
 */
export interface Observer<T> {
  /**
   * Receives the next value in the sequence
   * @param value The emitted value
   */
  next?(value: T): void;

  /**
   * Receives the error termination notification
   * @param error The error that occurred
   */
  error?(error: unknown): void;

  /**
   * Receives the completion notification (no more values will be emitted)
   */
  complete?(): void;
}

/**
 * Subscription state types
 */
type SubscriptionState = 'initializing' | 'ready' | 'running' | 'buffering' | 'closed';

/**
 * Queued notification for buffered delivery
 */
interface QueuedNotification<T> {
  type: 'next' | 'error' | 'complete';
  value?: T;
}

/**
 * Subscription object returned from Observable.subscribe()
 * Represents the execution of an Observable and provides cleanup
 */
export interface Subscription {
  /**
   * Cancels the subscription and performs cleanup
   */
  unsubscribe(): void;

  /**
   * Indicates whether the subscription has been closed
   */
  readonly closed: boolean;
}

/**
 * Subscription observer passed to the subscriber function
 * @template T The type of values to be emitted
 */
export interface SubscriptionObserver<T> {
  /**
   * Sends the next value to the observer
   * @param value The value to emit
   */
  next(value: T): void;

  /**
   * Sends an error notification to the observer and closes the subscription
   * @param error The error to report
   */
  error(error: unknown): void;

  /**
   * Sends a completion notification to the observer and closes the subscription
   */
  complete(): void;

  /**
   * Indicates whether the subscription has been closed
   */
  readonly closed: boolean;
}

/**
 * Subscriber function that initializes an Observable
 * @template T The type of values the Observable will emit
 * @param observer The subscription observer to send notifications through
 * @returns Optional cleanup function or object to be called on unsubscribe
 */
export type Subscriber<T> = (observer: SubscriptionObserver<T>) => void | CleanupFunction;

/**
 * Observable represents a push-based data stream
 * Implements the ES Observable proposal specification
 * @template T The type of values emitted by the Observable
 */
export declare class Observable<T> {
  /**
   * Creates a new Observable
   * @param subscriber Function called when Observable is subscribed to
   * @throws {TypeError} If subscriber is not a function or Observable is called without 'new'
   */
  constructor(subscriber: Subscriber<T>);

  /**
   * Subscribes to the Observable
   * @param observer Observer object or next callback function
   * @param error Optional error callback (used when first arg is a function)
   * @param complete Optional completion callback (used when first arg is a function)
   * @returns Subscription object for cancellation and cleanup
   */
  subscribe(observer: Observer<T> | ((value: T) => void), error?: (error: unknown) => void, complete?: () => void): Subscription;

  /**
   * Iterates over each value emitted by the Observable
   * @param callback Function called for each value with (value, done) signature
   * @returns Promise that resolves when Observable completes or rejects on error
   * @throws {TypeError} If callback is not a function
   */
  forEach(callback: (value: T, done: () => void) => void): Promise<void>;

  /**
   * Transforms each value emitted by applying a projection function
   * @template R The type of the transformed values
   * @param project Function to transform each value
   * @returns New Observable emitting transformed values
   * @throws {TypeError} If project is not a function
   */
  map<R>(project: (value: T) => R): Observable<R>;

  /**
   * Filters values emitted based on a predicate function
   * @param predicate Function to test each value
   * @returns New Observable emitting only values that pass the predicate
   * @throws {TypeError} If predicate is not a function
   */
  filter(predicate: (value: T) => boolean): Observable<T>;

  /**
   * Reduces the Observable sequence to a single value
   * @template R The type of the accumulated value
   * @param accumulator Function to accumulate values
   * @param seed Optional initial accumulator value
   * @returns New Observable emitting the final reduced value
   * @throws {TypeError} If accumulator is not a function or sequence is empty without seed
   */
  reduce<R>(accumulator: (acc: R, value: T) => R, seed?: R): Observable<R>;

  /**
   * Concatenates multiple Observables sequentially
   * @param sources Additional Observables or Observable-like objects to concat
   * @returns New Observable emitting all values from each source in sequence
   */
  concat(...sources: Array<Observable<T> | ObservableLike<T>>): Observable<T>;

  /**
   * Projects each value to an Observable and flattens all into one Observable
   * @template R The type of values emitted by projected Observables
   * @param project Function to transform each value into an Observable
   * @returns New Observable emitting flattened values from all projected Observables
   * @throws {TypeError} If project is not a function
   */
  flatMap<R>(project: (value: T) => Observable<R> | ObservableLike<R>): Observable<R>;

  /**
   * Returns this Observable (makes Observable compatible with Observable protocol)
   * @returns This Observable instance
   */
  [Symbol.observable](): Observable<T>;

  /**
   * Creates an Observable from various sources
   * @template T The type of values the Observable will emit
   * @param source Observable, iterable, or array-like object
   * @returns New Observable emitting values from the source
   * @throws {TypeError} If source is null/undefined or not observable/iterable
   */
  static from<T>(source: Observable<T> | ObservableLike<T> | Iterable<T> | ArrayLike<T>): Observable<T>;

  /**
   * Creates an Observable that emits the provided values synchronously
   * @template T The type of values to emit
   * @param values Values to emit
   * @returns New Observable emitting the provided values
   */
  static of<T>(...values: T[]): Observable<T>;

  /**
   * Returns the constructor (for subclassing support)
   */
  static get [Symbol.species](): typeof Observable;
}

/**
 * Object with Symbol.observable method (Observable protocol)
 * @template T The type of values emitted
 */
export interface ObservableLike<T> {
  [Symbol.observable](): Observable<T> | ObservableLike<T>;
}

/**
 * Extensions metadata attached to Observable constructor
 */
export interface ObservableExtensions {
  /**
   * The Symbol used for the observable protocol
   */
  symbol: symbol;

  /**
   * Function to report unhandled errors
   * @param error The error to report
   */
  hostReportError(error: unknown): void;
}