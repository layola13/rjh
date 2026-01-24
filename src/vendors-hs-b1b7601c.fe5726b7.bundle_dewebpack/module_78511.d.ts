/**
 * Observable utility function for resource management with automatic cleanup.
 * 
 * Creates an Observable that manages a resource's lifecycle, automatically
 * unsubscribing when the Observable completes or is unsubscribed.
 * 
 * @module using
 */

import { Observable } from 'rxjs';

/**
 * Represents a resource that can be unsubscribed/cleaned up.
 */
export interface Unsubscribable {
  unsubscribe(): void;
}

/**
 * Factory function that creates a resource.
 * 
 * @returns A resource that implements the Unsubscribable interface
 */
export type ResourceFactory<T extends Unsubscribable> = () => T;

/**
 * Function that takes a resource and returns an Observable or ObservableInput.
 * 
 * @param resource - The resource created by the factory
 * @returns An Observable or ObservableInput to be subscribed to
 */
export type ObservableFactory<T extends Unsubscribable, R> = (
  resource: T
) => Observable<R> | ObservableInput<R> | null | undefined;

/**
 * Type representing any value that can be converted to an Observable.
 */
export type ObservableInput<T> = 
  | Observable<T>
  | Promise<T>
  | Iterable<T>
  | AsyncIterable<T>
  | ReadableStreamLike<T>;

/**
 * Interface for readable stream-like objects.
 */
export interface ReadableStreamLike<T> {
  getReader(): ReadableStreamDefaultReader<T>;
}

/**
 * Creates an Observable that manages resource lifecycle with automatic cleanup.
 * 
 * The `using` operator creates an Observable by calling a resource factory function,
 * then passing that resource to an Observable factory. When the resulting Observable
 * completes, errors, or is unsubscribed, the resource's `unsubscribe` method is called
 * to perform cleanup.
 * 
 * @template T - The type of the resource (must be Unsubscribable)
 * @template R - The type of values emitted by the resulting Observable
 * 
 * @param resourceFactory - Function that creates and returns a resource
 * @param observableFactory - Function that takes the resource and returns an Observable
 * 
 * @returns An Observable that emits values from the Observable created by observableFactory
 * 
 * @example
 *