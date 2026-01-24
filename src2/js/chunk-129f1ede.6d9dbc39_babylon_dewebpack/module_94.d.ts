/**
 * Creates an observable subscription from an iterable source.
 * Iterates through the iterable and emits each value to the observer.
 * Handles cleanup by calling the iterator's return method when the subscription is closed.
 * 
 * @template T - The type of values emitted by the iterable
 * @param source - The iterable source to subscribe to
 * @returns A function that accepts an observer and returns the observer after subscription
 */
export function subscribeToIterable<T>(source: Iterable<T>): (observer: Observer<T>) => Observer<T>;

/**
 * Observer interface for receiving values from an observable sequence.
 * 
 * @template T - The type of values the observer can receive
 */
export interface Observer<T> {
  /**
   * Receives the next value in the sequence.
   * @param value - The emitted value
   */
  next(value: T): void;

  /**
   * Notifies the observer that the sequence has completed successfully.
   */
  complete(): void;

  /**
   * Indicates whether the observer has been closed/unsubscribed.
   */
  readonly closed: boolean;

  /**
   * Adds a teardown function to be called when the subscription ends.
   * @param teardown - Cleanup function to execute on unsubscription
   */
  add(teardown: () => void): void;
}

/**
 * Symbol for accessing an object's iterator.
 * Represents the @@iterator well-known symbol.
 */
export declare const iteratorSymbol: symbol;