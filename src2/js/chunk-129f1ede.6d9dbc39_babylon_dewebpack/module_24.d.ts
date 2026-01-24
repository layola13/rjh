/**
 * Inner subscriber for handling nested observable subscriptions.
 * Used in higher-order observable operators (e.g., mergeMap, switchMap).
 * 
 * This class manages the communication between inner and outer observables,
 * tracking indices and forwarding notifications to the parent subscriber.
 * 
 * @module InnerSubscriber
 */

import { Subscriber } from 'rxjs';
import type { OuterSubscriber } from './OuterSubscriber';

/**
 * Subscriber for inner observables in higher-order observable chains.
 * Extends the base Subscriber class to provide notifications back to
 * the parent OuterSubscriber.
 * 
 * @template T - The type of values emitted by the inner observable
 * @template R - The type of values emitted by the outer observable
 */
export declare class InnerSubscriber<T, R> extends Subscriber<T> {
  /**
   * Reference to the parent OuterSubscriber that created this inner subscription.
   */
  protected parent: OuterSubscriber<R, T>;

  /**
   * The value emitted by the outer observable that triggered this inner subscription.
   */
  protected outerValue: R;

  /**
   * The index of the outer value in the outer observable's emission sequence.
   */
  protected outerIndex: number;

  /**
   * The current index of values emitted by this inner observable.
   * Increments with each emission.
   */
  protected index: number;

  /**
   * Creates an instance of InnerSubscriber.
   * 
   * @param parent - The parent OuterSubscriber to notify of events
   * @param outerValue - The value from the outer observable
   * @param outerIndex - The index of the outer value
   */
  constructor(parent: OuterSubscriber<R, T>, outerValue: R, outerIndex: number);

  /**
   * Handles the next value emitted by the inner observable.
   * Notifies the parent with context about both inner and outer observables.
   * 
   * @param value - The value emitted by the inner observable
   */
  protected _next(value: T): void;

  /**
   * Handles errors from the inner observable.
   * Forwards the error to the parent and unsubscribes.
   * 
   * @param error - The error that occurred
   */
  protected _error(error: unknown): void;

  /**
   * Handles completion of the inner observable.
   * Notifies the parent of completion and unsubscribes.
   */
  protected _complete(): void;
}