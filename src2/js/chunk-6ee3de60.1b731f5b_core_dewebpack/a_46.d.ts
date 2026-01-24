/**
 * Creates an observable operator that converts a Promise into an observable sequence.
 * When the promise resolves, emits the value and completes the observer.
 * When the promise rejects, propagates the error to the observer.
 * 
 * @module PromiseToObservable
 */

import { reportUnhandledError } from './error-handler';

/**
 * Represents an observer that can receive notifications.
 * 
 * @template T - The type of values the observer can receive
 */
interface Observer<T> {
  /** Indicates whether the observer has been closed/unsubscribed */
  closed: boolean;
  /** Emits the next value to the observer */
  next(value: T): void;
  /** Signals successful completion of the observable sequence */
  complete(): void;
  /** Propagates an error to the observer */
  error(err: unknown): void;
}

/**
 * Operator function type that transforms an observer.
 * 
 * @template T - The type of values being observed
 */
type OperatorFunction<T> = (observer: Observer<T>) => Observer<T>;

/**
 * Converts a Promise into an observable operator.
 * 
 * Takes a promise and returns an operator function that:
 * 1. Waits for the promise to resolve
 * 2. Emits the resolved value to the observer (if not closed)
 * 3. Completes the observer
 * 4. On rejection, propagates the error to the observer
 * 5. Handles any unhandled errors during the process
 * 
 * @template T - The type of value the promise resolves to
 * @param promise - The promise to convert into an observable sequence
 * @returns An operator function that processes the promise result
 * 
 * @example
 *