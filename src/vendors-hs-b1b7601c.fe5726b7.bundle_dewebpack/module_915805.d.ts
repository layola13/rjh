/**
 * RxJS connect operator - Multicasting with dynamic connector factory
 * Allows sharing a single subscription among multiple subscribers using a Subject
 */

import { ObservableInput, OperatorFunction, SubjectLike } from 'rxjs';

/**
 * Configuration options for the connect operator
 */
export interface ConnectConfig<T> {
  /**
   * Factory function that creates a new Subject (or SubjectLike) for multicasting
   * @returns A Subject or Subject-like object to multicast source emissions
   */
  connector: () => SubjectLike<T>;
}

/**
 * Creates a multicasting operator that shares a single subscription to the source Observable.
 * 
 * The `connect` operator allows multiple subscribers to share a single subscription to the source
 * Observable by using a Subject created from the provided connector factory.
 * 
 * @template T - The type of values emitted by the source Observable
 * @template O - The type of values in the Observable returned by the selector function
 * 
 * @param selector - Function that receives the multicast Observable and returns an Observable to subscribe to
 * @param config - Configuration object with connector factory (defaults to creating a new Subject)
 * 
 * @returns An OperatorFunction that multicasts the source Observable through a Subject
 * 
 * @example
 *