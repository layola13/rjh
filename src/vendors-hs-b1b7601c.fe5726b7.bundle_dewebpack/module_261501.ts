import { combineLatest } from './combineLatest';

/**
 * Combines multiple observables with the source observable.
 * 
 * @param sources - Observable sources to combine with
 * @returns A function that combines the source with provided observables
 */
export function combineLatestWith<T>(...sources: unknown[]): unknown {
  return combineLatest(...sources);
}