/**
 * RxJS TakeLast Operator
 * Emits only the last value (when there is one) emitted by the source Observable.
 * Buffers the last emitted value and only emits it upon completion.
 * 
 * @module TakeLastOperator
 */

import { Observable } from 'rxjs';
import { Subscriber } from 'rxjs/internal/Subscriber';
import { Subscription } from 'rxjs/internal/Subscription';

/**
 * Represents a subscription object that can be empty.
 * Used as a constant for empty subscriptions.
 */
export declare const EMPTY_SUBSCRIPTION: Subscription;

/**
 * TakeLastSubscriber - Specialized subscriber that buffers and emits only the last value
 * upon source completion.
 * 
 * @template T The type of values emitted by the observable
 */
export declare class TakeLastSubscriber<T> extends Subscriber<T> {
  /**
   * The last value received from the source observable
   */
  private value: T | null;

  /**
   * Flag indicating whether at least one value has been received
   */
  private hasNext: boolean;

  /**
   * Flag indicating whether the source observable has completed
   */
  private hasCompleted: boolean;

  constructor(destination: Subscriber<T>);

  /**
   * Custom subscription logic that handles error and completion states.
   * Returns EMPTY if already errored or if completed with a value.
   * 
   * @param subscriber The subscriber to add
   * @returns Subscription or EMPTY_SUBSCRIPTION
   */
  protected _subscribe(subscriber: Subscriber<T>): Subscription;

  /**
   * Buffers each incoming value, storing only the most recent one.
   * Does nothing if source has already completed.
   * 
   * @param value The value emitted by the source
   */
  next(value: T): void;

  /**
   * Handles error from source observable.
   * Propagates error only if not yet completed.
   * 
   * @param error The error to propagate
   */
  error(error: Error): void;

  /**
   * Marks completion and emits the buffered value if one exists.
   * Only emits the last value after source completes.
   */
  complete(): void;
}

/**
 * Factory function or operator that creates a TakeLastSubscriber instance.
 * Typically used as an RxJS pipeable operator.
 */
export declare const takeLast: typeof TakeLastSubscriber;