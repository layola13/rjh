/**
 * RxJS Subject implementation module
 * Provides reactive programming constructs for observable streams
 */

import { Observable } from './Observable';
import { Subscriber } from './Subscriber';
import { Subscription, EMPTY_SUBSCRIPTION } from './Subscription';
import { ObjectUnsubscribedError } from './errors';
import { SubjectSubscription } from './SubjectSubscription';
import { SymbolObservable } from './symbol';

/**
 * Observer interface for receiving notifications from an Observable
 */
export interface Observer<T> {
  next?: (value: T) => void;
  error?: (err: any) => void;
  complete?: () => void;
}

/**
 * A Subject is a special type of Observable that allows values to be
 * multicasted to many Observers. Subjects are like EventEmitters.
 * 
 * @template T The type of values emitted by the Subject
 */
export class Subject<T> extends Observable<T> {
  /** Array of observers subscribed to this Subject */
  observers: Observer<T>[] = [];
  
  /** Indicates whether the Subject has been closed */
  closed: boolean = false;
  
  /** Indicates whether the Subject has been stopped */
  isStopped: boolean = false;
  
  /** Indicates whether an error has occurred */
  hasError: boolean = false;
  
  /** The error that was thrown, if any */
  thrownError: any = null;

  constructor() {
    super();
  }

  /**
   * Symbol.observable implementation for interoperability
   * @returns A new AnonymousSubject wrapping this Subject
   */
  [SymbolObservable](): AnonymousSubject<T> {
    return new AnonymousSubject(this);
  }

  /**
   * Creates a new Observable with this Subject as the source,
   * and the passed Operator defined as the new observable's operator.
   * 
   * @param operator The operator defining the operation to take on the observable
   * @returns A new Observable with the Operator applied
   */
  lift<R>(operator: Operator<T, R>): Observable<R> {
    const subject = new AnonymousSubject<R>(this, this);
    subject.operator = operator;
    return subject;
  }

  /**
   * Emits a new value to all registered observers
   * 
   * @param value The value to emit
   * @throws {ObjectUnsubscribedError} If the Subject is closed
   */
  next(value: T): void {
    if (this.closed) {
      throw new ObjectUnsubscribedError();
    }
    
    if (!this.isStopped) {
      const observers = this.observers;
      const len = observers.length;
      const copy = observers.slice();
      
      for (let i = 0; i < len; i++) {
        copy[i].next?.(value);
      }
    }
  }

  /**
   * Emits an error to all registered observers and stops the Subject
   * 
   * @param err The error to emit
   * @throws {ObjectUnsubscribedError} If the Subject is closed
   */
  error(err: any): void {
    if (this.closed) {
      throw new ObjectUnsubscribedError();
    }
    
    this.hasError = true;
    this.thrownError = err;
    this.isStopped = true;
    
    const observers = this.observers;
    const len = observers.length;
    const copy = observers.slice();
    
    for (let i = 0; i < len; i++) {
      copy[i].error?.(err);
    }
    
    this.observers.length = 0;
  }

  /**
   * Notifies all registered observers of completion and stops the Subject
   * 
   * @throws {ObjectUnsubscribedError} If the Subject is closed
   */
  complete(): void {
    if (this.closed) {
      throw new ObjectUnsubscribedError();
    }
    
    this.isStopped = true;
    
    const observers = this.observers;
    const len = observers.length;
    const copy = observers.slice();
    
    for (let i = 0; i < len; i++) {
      copy[i].complete?.();
    }
    
    this.observers.length = 0;
  }

  /**
   * Disposes of all resources held by the Subject
   */
  unsubscribe(): void {
    this.isStopped = true;
    this.closed = true;
    this.observers = null;
  }

  /**
   * Attempts to subscribe an observer to this Subject
   * 
   * @param subscriber The subscriber to add
   * @returns A subscription
   * @throws {ObjectUnsubscribedError} If the Subject is closed
   * @internal
   */
  protected _trySubscribe(subscriber: Subscriber<T>): Subscription {
    if (this.closed) {
      throw new ObjectUnsubscribedError();
    }
    return super._trySubscribe(subscriber);
  }

  /**
   * Internal subscription logic
   * 
   * @param subscriber The subscriber to add
   * @returns A subscription that can be used to unsubscribe
   * @throws {ObjectUnsubscribedError} If the Subject is closed
   * @internal
   */
  protected _subscribe(subscriber: Subscriber<T>): Subscription {
    if (this.closed) {
      throw new ObjectUnsubscribedError();
    }
    
    if (this.hasError) {
      subscriber.error(this.thrownError);
      return EMPTY_SUBSCRIPTION;
    }
    
    if (this.isStopped) {
      subscriber.complete();
      return EMPTY_SUBSCRIPTION;
    }
    
    this.observers.push(subscriber);
    return new SubjectSubscription(this, subscriber);
  }

  /**
   * Converts the Subject to a plain Observable
   * 
   * @returns A new Observable with this Subject as the source
   */
  asObservable(): Observable<T> {
    const observable = new Observable<T>();
    observable.source = this;
    return observable;
  }

  /**
   * Factory method to create a new AnonymousSubject
   * 
   * @param destination The destination observer
   * @param source The source observable
   * @returns A new AnonymousSubject
   */
  static create<T>(
    destination: Observer<T>,
    source: Observable<T>
  ): AnonymousSubject<T> {
    return new AnonymousSubject<T>(destination, source);
  }
}

/**
 * An AnonymousSubject is a Subject without its own observable protocol.
 * It can be subscribed to, and when subscribed, forwards to an internal source.
 * 
 * @template T The type of values emitted
 */
export class AnonymousSubject<T> extends Subject<T> {
  /** The destination observer to forward notifications to */
  destination: Observer<T>;
  
  /** The source observable to subscribe to */
  source: Observable<T>;

  constructor(destination?: Observer<T>, source?: Observable<T>) {
    super();
    this.destination = destination;
    this.source = source;
  }

  /**
   * Forwards next notifications to the destination observer
   * 
   * @param value The value to emit
   */
  next(value: T): void {
    const destination = this.destination;
    if (destination?.next) {
      destination.next(value);
    }
  }

  /**
   * Forwards error notifications to the destination observer
   * 
   * @param err The error to emit
   */
  error(err: any): void {
    const destination = this.destination;
    if (destination?.error) {
      this.destination.error(err);
    }
  }

  /**
   * Forwards completion notifications to the destination observer
   */
  complete(): void {
    const destination = this.destination;
    if (destination?.complete) {
      this.destination.complete();
    }
  }

  /**
   * Subscribes to the source observable if available
   * 
   * @param subscriber The subscriber to add
   * @returns A subscription, or EMPTY if no source
   * @internal
   */
  protected _subscribe(subscriber: Subscriber<T>): Subscription {
    return this.source ? this.source.subscribe(subscriber) : EMPTY_SUBSCRIPTION;
  }
}

/**
 * Operator interface for transforming observables
 * @template T Input type
 * @template R Output type
 */
export interface Operator<T, R> {
  call(subscriber: Subscriber<R>, source: any): Subscription;
}

export { Subject as b, AnonymousSubject as a };