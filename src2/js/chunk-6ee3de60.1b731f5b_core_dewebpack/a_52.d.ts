import { Observable } from 'rxjs';
import { Subject } from 'rxjs';
import { Subscription } from 'rxjs';
import { Subscriber } from 'rxjs';

/**
 * Factory function type for creating Subject instances
 * @template T The type of values emitted by the subject
 */
export type SubjectFactory<T> = () => Subject<T>;

/**
 * Connectable observable that can be manually connected to start emitting values
 * @template T The type of values emitted by the observable
 */
export declare class ConnectableObservable<T> extends Observable<T> {
  /**
   * The source observable to connect to
   */
  protected source: Observable<T>;

  /**
   * Factory function for creating the internal subject
   */
  protected subjectFactory: SubjectFactory<T>;

  /**
   * Current reference count for automatic connection management
   */
  protected _refCount: number;

  /**
   * Internal subject used for multicasting
   */
  protected _subject: Subject<T> | null;

  /**
   * Active connection subscription
   */
  protected _connection: Subscription | null;

  /**
   * Flag indicating whether the observable has completed
   */
  protected _isComplete: boolean;

  /**
   * Creates a new ConnectableObservable
   * @param source The source observable to multicast
   * @param subjectFactory Factory function for creating subjects
   */
  constructor(source: Observable<T>, subjectFactory: SubjectFactory<T>);

  /**
   * Subscribe to the connectable observable
   * @param subscriber The subscriber to receive values
   * @returns Subscription for cleanup
   */
  protected _subscribe(subscriber: Subscriber<T>): Subscription;

  /**
   * Gets or creates the internal subject
   * @returns The active subject instance
   */
  getSubject(): Subject<T>;

  /**
   * Connects to the source observable and starts multicasting
   * @returns Subscription representing the connection
   */
  connect(): Subscription;

  /**
   * Returns an observable that automatically connects and disconnects based on subscriptions
   * @returns Observable with automatic connection management
   */
  refCount(): Observable<T>;
}

/**
 * Property descriptor map for ConnectableObservable prototype
 */
export declare const connectableObservableDescriptor: PropertyDescriptorMap;

/**
 * Internal subscriber that manages the connection between source and subject
 * @template T The type of values being transmitted
 */
declare class ConnectionSubscriber<T> extends Subscriber<T> {
  /**
   * Reference to the parent connectable observable
   */
  protected connectable: ConnectableObservable<T> | null;

  /**
   * Creates a new ConnectionSubscriber
   * @param destination The subject to forward values to
   * @param connectable The parent connectable observable
   */
  constructor(destination: Subject<T>, connectable: ConnectableObservable<T>);

  /**
   * Handles error events from the source
   * @param error The error that occurred
   */
  protected _error(error: unknown): void;

  /**
   * Handles completion of the source observable
   */
  protected _complete(): void;

  /**
   * Cleans up the connection when unsubscribing
   */
  protected _unsubscribe(): void;
}

/**
 * Named export for ConnectableObservable class
 */
export { ConnectableObservable as a };

/**
 * Named export for property descriptor map
 */
export { connectableObservableDescriptor as b };