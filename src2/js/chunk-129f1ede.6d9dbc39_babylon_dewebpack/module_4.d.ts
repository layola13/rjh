/**
 * Subscribes to an observable source with a given subscriber.
 * 
 * @template T The type of values emitted by the observable
 * @param source - The observable source to subscribe to
 * @param subscriber - The subscriber that will receive notifications
 * @param context - Optional execution context for the subscription
 * @param subscriberFactory - Factory function to create the subscriber if not provided
 * @returns The subscription object, or undefined if the subscriber is already closed
 */
export function subscribe<T>(
  source: Observable<T>,
  subscriber: Subscriber<T>,
  context?: unknown,
  subscriberFactory?: SubscriberFactory<T>
): Subscription | undefined {
  const finalSubscriber = subscriberFactory ?? new Subscriber<T>(source, context, subscriber);
  
  if (finalSubscriber.closed) {
    return undefined;
  }
  
  return executeSubscription(subscriber)(finalSubscriber);
}

/**
 * Represents an observable source that can be subscribed to.
 */
interface Observable<T> {
  subscribe(subscriber: Subscriber<T>): Subscription;
}

/**
 * Represents a subscriber that receives notifications from an observable.
 */
interface Subscriber<T> {
  readonly closed: boolean;
  next(value: T): void;
  error(err: unknown): void;
  complete(): void;
}

/**
 * Factory function type for creating subscribers.
 */
type SubscriberFactory<T> = (
  source: Observable<T>,
  context: unknown,
  subscriber: Subscriber<T>
) => Subscriber<T>;

/**
 * Represents a subscription that can be unsubscribed.
 */
interface Subscription {
  readonly closed: boolean;
  unsubscribe(): void;
}

/**
 * Executes the subscription logic.
 * 
 * @internal
 */
declare function executeSubscription<T>(
  subscriber: Subscriber<T>
): (finalSubscriber: Subscriber<T>) => Subscription;