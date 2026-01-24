/**
 * InnerSubscriber - A specialized subscriber for handling nested observables in RxJS
 * 
 * This class is used internally by higher-order observable operators (like mergeMap, switchMap)
 * to manage subscriptions to inner observables and communicate their events back to the parent subscriber.
 * 
 * @template T - The type of values emitted by the inner observable
 * @template R - The type of the outer value from the parent observable
 */
declare class InnerSubscriber<T, R> extends Subscriber<T> {
  /**
   * The parent subscriber that manages this inner subscription
   */
  protected readonly parent: OuterSubscriber<R, T>;

  /**
   * The value from the outer observable that triggered this inner subscription
   */
  protected readonly outerValue: R;

  /**
   * The index of the outer value in the outer observable sequence
   */
  protected readonly outerIndex: number;

  /**
   * The current index of values received from the inner observable
   */
  protected index: number;

  /**
   * Creates an instance of InnerSubscriber
   * 
   * @param parent - The outer subscriber managing this subscription
   * @param outerValue - The outer value that produced this inner observable
   * @param outerIndex - The index of the outer value in the sequence
   */
  constructor(parent: OuterSubscriber<R, T>, outerValue: R, outerIndex: number);

  /**
   * Handles the next value emitted by the inner observable
   * Notifies the parent subscriber with context about the emission
   * 
   * @param value - The value emitted by the inner observable
   */
  protected _next(value: T): void;

  /**
   * Handles errors from the inner observable
   * Propagates the error to the parent and unsubscribes
   * 
   * @param error - The error emitted by the inner observable
   */
  protected _error(error: unknown): void;

  /**
   * Handles completion of the inner observable
   * Notifies the parent of completion and cleans up the subscription
   */
  protected _complete(): void;
}

/**
 * OuterSubscriber interface - Defines the contract for subscribers that manage inner observables
 * 
 * @template T - The type of values from the outer observable
 * @template R - The type of values from the inner observable
 */
interface OuterSubscriber<T, R> {
  /**
   * Called when an inner observable emits a value
   * 
   * @param outerValue - The outer value that created this inner subscription
   * @param innerValue - The value emitted by the inner observable
   * @param outerIndex - The index of the outer value
   * @param innerIndex - The index of the inner value
   * @param innerSub - The inner subscriber instance
   */
  notifyNext(
    outerValue: T,
    innerValue: R,
    outerIndex: number,
    innerIndex: number,
    innerSub: InnerSubscriber<R, T>
  ): void;

  /**
   * Called when an inner observable encounters an error
   * 
   * @param error - The error from the inner observable
   * @param innerSub - The inner subscriber instance
   */
  notifyError(error: unknown, innerSub: InnerSubscriber<unknown, T>): void;

  /**
   * Called when an inner observable completes
   * 
   * @param innerSub - The inner subscriber instance that completed
   */
  notifyComplete(innerSub: InnerSubscriber<unknown, T>): void;
}

/**
 * Subscriber base class - RxJS base subscriber type
 * 
 * @template T - The type of values this subscriber handles
 */
declare class Subscriber<T> {
  /**
   * Unsubscribes from the observable and releases resources
   */
  unsubscribe(): void;
}

export { InnerSubscriber };