/**
 * RxJS connectable operator module
 * Provides reference-counted connection management for connectable observables
 */

/**
 * Interface representing a connectable observable with reference counting
 */
export interface ConnectableObservable<T> {
  /** Current reference count */
  _refCount: number;
  /** The underlying connection */
  _connection: Subscription | null;
  /** Establishes the connection */
  connect(): Subscription;
}

/**
 * Subscription interface for managing subscriptions
 */
export interface Subscription {
  /** Whether the subscription is closed */
  closed: boolean;
  /** Unsubscribes from the observable */
  unsubscribe(): void;
}

/**
 * Observer interface for receiving notifications
 */
export interface Observer<T> {
  next?(value: T): void;
  error?(err: unknown): void;
  complete?(): void;
}

/**
 * Subscriber interface extending Observer with subscription management
 */
export interface Subscriber<T> extends Observer<T>, Subscription {
  /** The connection associated with this subscriber */
  connection?: Subscription | null;
}

/**
 * Observable interface with lift operation support
 */
export interface Observable<T> {
  /**
   * Creates a new Observable with an operator applied
   * @param operator - The operator to apply
   * @returns A new Observable
   */
  lift<R>(operator: Operator<T, R>): Observable<R>;
}

/**
 * Operator interface for transforming observables
 */
export interface Operator<T, R> {
  /**
   * Applies the operator transformation
   * @param subscriber - The subscriber to receive values
   * @param source - The source observable
   * @returns A subscription
   */
  call(subscriber: Subscriber<R>, source: Observable<T>): Subscription;
}

/**
 * Creates a reference-counted connectable operator
 * 
 * This operator manages connections to a connectable observable using reference counting.
 * The connection is established when the first subscriber subscribes and closed when
 * the last subscriber unsubscribes.
 * 
 * @template T - The type of values emitted by the observable
 * @returns An operator function that can be applied to an observable
 * 
 * @example
 *