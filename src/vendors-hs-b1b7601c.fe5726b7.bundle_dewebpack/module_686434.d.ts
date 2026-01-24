/**
 * Type definitions for interop observable utilities
 * Provides type guards for checking Symbol.observable compatibility
 */

import { observable } from './observable-symbol';
import { isFunction } from './type-guards';

/**
 * Interop Observable interface
 * Represents an object that implements the Symbol.observable method
 */
export interface InteropObservable<T = unknown> {
  [Symbol.observable]: () => Observable<T>;
}

/**
 * Minimal Observable interface for type checking
 */
export interface Observable<T> {
  subscribe(observer: Observer<T>): Subscription;
}

/**
 * Observer interface
 */
export interface Observer<T> {
  next?: (value: T) => void;
  error?: (err: unknown) => void;
  complete?: () => void;
}

/**
 * Subscription interface
 */
export interface Subscription {
  unsubscribe(): void;
  readonly closed: boolean;
}

/**
 * Type guard to check if an object implements the interop observable pattern
 * 
 * An interop observable is an object that has a method at Symbol.observable
 * which returns an observable when called. This follows the TC39 Observable proposal.
 * 
 * @param value - The value to check
 * @returns True if the value has a callable Symbol.observable method
 * 
 * @example
 *