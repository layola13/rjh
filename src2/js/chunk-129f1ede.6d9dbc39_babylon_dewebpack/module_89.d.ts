/**
 * Converts various input types (Observable, Promise, Array, Iterable) into a subscribable function.
 * This is a core utility for RxJS that normalizes different async/sync data sources into a unified subscription pattern.
 * 
 * @module ObservableInputConverter
 */

import { Observable } from 'rxjs';
import { Observer, ObservableInput, SubscribableOrPromise } from 'rxjs/internal/types';

/**
 * Type guard for checking if value is an Observable instance
 */
export function isObservable<T>(value: any): value is Observable<T>;

/**
 * Type guard for checking if value is a Promise
 */
export function isPromise<T>(value: any): value is Promise<T>;

/**
 * Type guard for checking if value is an Iterable
 */
export function isIterable<T>(value: any): value is Iterable<T>;

/**
 * Type guard for checking if value has an observable property (Symbol.observable)
 */
export function isObservableLike<T>(value: any): value is { [Symbol.observable]: () => Observable<T> };

/**
 * Converts various input types into a subscription function.
 * 
 * Supports conversion from:
 * - Observable: Returns a function that subscribes to the observable
 * - Promise: Converts promise to observable subscription
 * - Array: Converts array to observable that emits each element
 * - Iterable: Converts iterable to observable that emits each value
 * - Observable-like: Objects with Symbol.observable method
 * 
 * @template T The type of values emitted by the resulting observable
 * @param input The input value to convert (Observable, Promise, Array, Iterable, or Observable-like)
 * @returns A function that accepts an Observer and performs the subscription
 * @throws {TypeError} When provided value is not a valid observable input type
 * 
 * @example
 *