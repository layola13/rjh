/**
 * RxJS groupBy operator - Groups emissions from the source Observable based on a key selector function.
 * Each group is emitted as a GroupedObservable.
 */

import { Observable } from 'rxjs';
import { Subject } from 'rxjs';
import { Subscriber } from 'rxjs';
import { Subscription } from 'rxjs';
import { OperatorFunction } from 'rxjs';

/**
 * Represents a grouped observable with a key identifier.
 * @template K - The type of the grouping key
 * @template T - The type of the elements in the group
 */
export interface GroupedObservable<K, T> extends Observable<T> {
  /** The key associated with this group */
  readonly key: K;
}

/**
 * Selector function to extract a key from a value.
 * @template T - The type of the source value
 * @template K - The type of the key
 */
export type KeySelector<T, K> = (value: T) => K;

/**
 * Selector function to transform elements before grouping.
 * @template T - The type of the source value
 * @template R - The type of the transformed element
 */
export type ElementSelector<T, R> = (value: T) => R;

/**
 * Factory function to create a Subject for each group.
 * @template T - The type of values in the subject
 */
export type SubjectSelector<T> = () => Subject<T>;

/**
 * Selector function to determine the duration of each group.
 * @template K - The type of the grouping key
 * @template T - The type of the group elements
 */
export type DurationSelector<K, T> = (grouped: GroupedObservable<K, T>) => Observable<unknown>;

/**
 * Groups the items emitted by an Observable according to a specified key selector function.
 * 
 * @template T - The type of items emitted by the source Observable
 * @template K - The type of the grouping key
 * @template R - The type of items emitted by the grouped Observables (defaults to T)
 * 
 * @param keySelector - Function to extract the grouping key from each item
 * @param elementSelector - Optional function to transform elements before grouping
 * @param durationSelector - Optional function to determine when a group should complete
 * @param subjectSelector - Optional factory function to create custom Subject for each group
 * 
 * @returns An OperatorFunction that returns an Observable of GroupedObservables
 * 
 * @example
 *