/**
 * ConnectableObservable module
 * Provides multicast functionality for RxJS observables
 */

import { Observable, Subject, Subscriber, Subscription } from 'rxjs';

/**
 * A ConnectableObservable is a special type of Observable that shares a single
 * subscription to the underlying source and multicasts values to multiple observers.
 */
export declare class ConnectableObservable<T> extends Observable<T> {
  protected _subject: Subject<T> | null;
  protected _connection: Subscription | null;
  protected _refCount: number;
  protected _isComplete: boolean;
  protected source: Observable<T>;
  protected subjectFactory: () => Subject<T>;

  constructor(source: Observable<T>, subjectFactory: () => Subject<T>);

  /**
   * Gets or creates the internal Subject for multicasting
   */
  getSubject(): Subject<T>;

  /**
   * Connects the observable to the source and begins multicasting
   * @returns A subscription that can be used to disconnect
   */
  connect(): Subscription;

  /**
   * Creates a reference-counted ConnectableObservable
   * @returns An Observable that automatically connects/disconnects based on subscriber count
   */
  refCount(): Observable<T>;
}

/**
 * Property descriptors for ConnectableObservable
 */
export declare const connectableObservableDescriptor: PropertyDescriptorMap;

/**
 * Internal subscriber class for handling ConnectableObservable connections
 */
declare class ConnectableSubscriber<T> extends Subscriber<T> {
  protected connectable: ConnectableObservable<T> | null;

  constructor(destination: Subject<T>, connectable: ConnectableObservable<T>);

  protected _error(error: any): void;
  protected _complete(): void;
  protected _unsubscribe(): void;
}