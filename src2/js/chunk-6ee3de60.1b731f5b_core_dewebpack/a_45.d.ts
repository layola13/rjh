/**
 * Represents a disposable resource, such as the execution of an Observable.
 * A Subscription has one important method, `unsubscribe`, that takes no argument
 * and just disposes the resource held by the subscription.
 */
export declare class Subscription {
  /**
   * A flag to indicate whether this Subscription has already been unsubscribed.
   */
  closed: boolean;

  /**
   * An empty subscription that does nothing when unsubscribed.
   */
  static readonly EMPTY: Subscription;

  /**
   * @param unsubscribe - A function describing how to perform the disposal of resources
   * when the `unsubscribe` method is called.
   */
  constructor(unsubscribe?: () => void);

  /**
   * Disposes the resources held by the subscription.
   * May, for instance, cancel an ongoing Observable execution or cancel any other type of work that started when the Subscription was created.
   * @throws {UnsubscriptionError} If any errors occur during unsubscription.
   */
  unsubscribe(): void;

  /**
   * Adds a teardown to be called during the unsubscribe() of this Subscription.
   * Can also be used to add a child subscription.
   * 
   * @param teardown - The additional logic to execute on teardown.
   * Can be a function, a Subscription, or void.
   * @returns The Subscription itself for chaining, or EMPTY if the teardown is invalid.
   * @throws {Error} If an unrecognized teardown value is provided.
   */
  add(teardown: TeardownLogic): Subscription;

  /**
   * Removes a teardown from the internal list of teardowns that will execute upon unsubscribe.
   * 
   * @param teardown - The teardown to remove from the subscriptions list.
   */
  remove(teardown: Subscription): void;

  /**
   * Internal parent reference used for managing subscription hierarchies.
   * @internal
   */
  protected _parent: Subscription | null;

  /**
   * Internal array of parent subscriptions.
   * @internal
   */
  protected _parents: Subscription[] | null;

  /**
   * Internal unsubscribe function to be called on cleanup.
   * @internal
   */
  protected _unsubscribe?: () => void;

  /**
   * Internal array of child subscriptions or teardown functions.
   * @internal
   */
  protected _subscriptions: (Subscription | (() => void))[] | null;

  /**
   * Adds a parent reference to this subscription.
   * @internal
   */
  protected _addParent(parent: Subscription): void;
}

/**
 * Represents the teardown logic that can be added to a Subscription.
 * Can be a function that performs cleanup, another Subscription, or void.
 */
export type TeardownLogic = Subscription | (() => void) | void;

/**
 * An error thrown when one or more errors occurred during the unsubscribe process.
 */
export declare class UnsubscriptionError extends Error {
  /**
   * @param errors - The array of errors that occurred during unsubscription.
   */
  constructor(errors: any[]);

  /**
   * The errors that occurred during unsubscription.
   */
  readonly errors: any[];
}