/**
 * Module: a
 * Original ID: 15
 * Exports: a
 */

import type { a as SubscriberType } from './33';
import type { a as observableOperator } from './100';

/**
 * Subscribes to an observable source with a subscriber.
 * Creates a new subscriber if not provided, or reuses an existing one if not closed.
 * 
 * @template T - The type of values emitted by the observable
 * @param source - The observable source value
 * @param operatorOrObservable - The operator or observable to apply
 * @param next - The next callback handler
 * @param error - The error callback handler
 * @param subscriber - Optional existing subscriber to reuse
 * @returns The result of applying the operator to the subscriber, or undefined if subscriber is closed
 */
export declare function a<T>(
  source: T,
  operatorOrObservable: unknown,
  next: unknown,
  error: unknown,
  subscriber?: SubscriberType
): unknown | undefined;