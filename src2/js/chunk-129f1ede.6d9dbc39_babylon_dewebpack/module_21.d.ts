/**
 * Observable subscription conversion utilities
 * Converts various input types (promises, iterables, observables) into Observable instances
 */

import { Observable } from 'rxjs';
import { SchedulerLike } from 'rxjs/internal/types';

/**
 * Symbol for observable interop
 */
export declare const observableSymbol: symbol;

/**
 * Symbol for iterator protocol
 */
export declare const iteratorSymbol: symbol;

/**
 * Subscription management class
 */
export declare class Subscription {
  add(teardown: (() => void) | Subscription): void;
  closed: boolean;
}

/**
 * Observer interface for handling observable emissions
 */
export interface Observer<T> {
  next(value: T): void;
  error(error: unknown): void;
  complete(): void;
  closed?: boolean;
}

/**
 * Subscribable interface for objects that can be converted to observables
 */
export interface Subscribable<T> {
  subscribe(observer: Observer<T>): Subscription;
}

/**
 * Object with observable symbol method
 */
export interface ObservableLike<T> {
  [observableSymbol](): Subscribable<T>;
}

/**
 * Iterable input types
 */
export interface IterableLike<T> {
  [iteratorSymbol](): Iterator<T>;
}

/**
 * Valid input types that can be converted to Observable
 */
export type ObservableInput<T> = 
  | Observable<T>
  | ObservableLike<T>
  | Promise<T>
  | Iterable<T>
  | IterableLike<T>
  | ArrayLike<T>
  | string;

/**
 * Converts various input types into an Observable instance.
 * Supports: Observable, Promise, Iterable, Array-like, ObservableLike objects.
 * 
 * @template T - The type of values emitted by the resulting Observable
 * @param input - The input value to convert to an Observable
 * @param scheduler - Optional scheduler to control emission timing and subscription lifecycle
 * @returns An Observable that emits values from the input source
 * @throws {TypeError} If the input type cannot be converted to an Observable
 * 
 * @example
 * // Convert a promise
 * const obs1 = scheduled(Promise.resolve(42), asyncScheduler);
 * 
 * @example
 * // Convert an array
 * const obs2 = scheduled([1, 2, 3], queueScheduler);
 * 
 * @example
 * // Convert an iterable
 * const obs3 = scheduled(new Set([4, 5, 6]), asapScheduler);
 */
export declare function scheduled<T>(
  input: ObservableInput<T>,
  scheduler?: SchedulerLike
): Observable<T>;

/**
 * Checks if a value is a Promise-like object
 * @param value - Value to check
 * @returns True if the value has a 'then' method
 */
export declare function isPromise(value: unknown): value is PromiseLike<unknown>;

/**
 * Checks if a value is an iterable (Array-like object with numeric index access)
 * @param value - Value to check
 * @returns True if the value is array-like
 */
export declare function isArrayLike<T>(value: unknown): value is ArrayLike<T>;

/**
 * Checks if a value is iterable (has Symbol.iterator)
 * @param value - Value to check
 * @returns True if the value implements the iterable protocol
 */
export declare function isIterable<T>(value: unknown): value is Iterable<T>;

/**
 * Converts an iterable to an Observable with optional scheduling
 * @param iterable - The iterable to convert
 * @param scheduler - Optional scheduler for controlling emissions
 * @returns Observable emitting each value from the iterable
 */
declare function fromIterable<T>(
  iterable: Iterable<T> | IterableLike<T>,
  scheduler?: SchedulerLike
): Observable<T>;

/**
 * Converts a Promise to an Observable with optional scheduling
 * @param promise - The promise to convert
 * @param scheduler - Optional scheduler for controlling emissions
 * @returns Observable that emits the promise result and completes
 */
declare function fromPromise<T>(
  promise: PromiseLike<T>,
  scheduler?: SchedulerLike
): Observable<T>;

/**
 * Converts an array-like object to an Observable
 * @param arrayLike - Array-like object to convert
 * @param scheduler - Optional scheduler
 * @returns Observable emitting each element
 */
declare function fromArray<T>(
  arrayLike: ArrayLike<T>,
  scheduler?: SchedulerLike
): Observable<T>;

/**
 * Subscribes to an observable-like object using a scheduler
 * @param observableLike - Object with observable symbol method
 * @param scheduler - Optional scheduler
 * @returns Observable wrapping the subscribable
 */
declare function fromObservable<T>(
  observableLike: ObservableLike<T>,
  scheduler?: SchedulerLike
): Observable<T>;