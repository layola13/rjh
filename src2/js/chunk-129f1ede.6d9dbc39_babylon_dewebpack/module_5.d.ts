import { Subscriber } from 'rxjs';
import { OuterSubscriber } from './OuterSubscriber';

/**
 * Inner subscriber that forwards notifications to the destination subscriber.
 * Extends OuterSubscriber to handle nested observable subscriptions.
 * 
 * @template T - The type of values emitted by the observable
 */
export class InnerSubscriber<T> extends OuterSubscriber<T> {
  /**
   * Handles the next value from an inner observable subscription.
   * Forwards the value directly to the destination subscriber.
   * 
   * @param outerValue - The value from the outer observable
   * @param innerValue - The value from the inner observable
   * @param outerIndex - The index of the outer value
   * @param innerIndex - The index of the inner value
   * @param innerSub - The inner subscription
   */
  notifyNext(
    outerValue: unknown,
    innerValue: T,
    outerIndex: number,
    innerIndex: number,
    innerSub: unknown
  ): void {
    this.destination.next(innerValue);
  }

  /**
   * Handles errors from an inner observable subscription.
   * Forwards the error to the destination subscriber.
   * 
   * @param error - The error that occurred
   * @param innerSub - The inner subscription that errored
   */
  notifyError(error: Error, innerSub: unknown): void {
    this.destination.error(error);
  }

  /**
   * Handles completion of an inner observable subscription.
   * Signals completion to the destination subscriber.
   * 
   * @param innerSub - The inner subscription that completed
   */
  notifyComplete(innerSub: unknown): void {
    this.destination.complete();
  }
}