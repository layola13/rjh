/**
 * RxJS refCount operator type definitions
 * Automatically connects and disconnects a ConnectableObservable based on subscriber count
 */

import { Observable, ConnectableObservable, Subscription, Subscriber } from 'rxjs';

/**
 * Reference counting operator that manages ConnectableObservable subscriptions
 * @returns MonoTypeOperatorFunction that applies reference counting behavior
 */
export function refCount<T>(): (source: Observable<T>) => Observable<T>;

/**
 * Operator class that implements reference counting logic for ConnectableObservable
 * @internal
 */
declare class RefCountOperator<T> {
  constructor(connectable: ConnectableObservable<T>);
  
  /**
   * The ConnectableObservable being managed
   */
  connectable: ConnectableObservable<T>;
  
  /**
   * Applies the operator to create a new subscription
   * @param subscriber - The subscriber to receive values
   * @param source - The source observable
   * @returns Subscription handle
   */
  call(subscriber: Subscriber<T>, source: Observable<T>): Subscription;
}

/**
 * Subscriber that manages reference counting and connection lifecycle
 * @internal
 */
declare class RefCountSubscriber<T> extends Subscriber<T> {
  constructor(destination: Subscriber<T>, connectable: ConnectableObservable<T>);
  
  /**
   * The ConnectableObservable being tracked
   */
  connectable: ConnectableObservable<T> | null;
  
  /**
   * The active connection subscription
   */
  connection: Subscription | null;
  
  /**
   * Handles unsubscription and decrements reference count
   * Disconnects the ConnectableObservable when count reaches zero
   * @protected
   */
  protected _unsubscribe(): void;
}