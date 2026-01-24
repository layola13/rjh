/**
 * Combines multiple observables into one by emitting an array of the latest values
 * from each source observable whenever any source emits.
 */

import { Observable } from 'rxjs';
import { SchedulerLike } from 'rxjs';
import { ObservableInput } from 'rxjs';

/**
 * Combines multiple observable sources and emits an array of their latest values.
 * 
 * @param sources - Array of observable sources to combine
 * @param scheduler - Optional scheduler to use for subscribing to sources
 * @param keyNames - Optional array of keys to create an object result instead of array
 * @returns A function that accepts an observer and returns a subscription
 */
export function combineLatestInit<T extends readonly unknown[]>(
  sources: readonly ObservableInput<T[number]>[],
  scheduler?: SchedulerLike,
  keyNames?: readonly string[]
): (observer: import('rxjs').Subscriber<T | Record<string, unknown>>) => void;

/**
 * Combines multiple observables by emitting an array of the latest values 
 * whenever any input observable emits.
 * 
 * @example
 *