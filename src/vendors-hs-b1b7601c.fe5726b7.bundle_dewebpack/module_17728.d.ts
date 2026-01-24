/**
 * RxJS sequenceEqual operator type definitions
 * Compares two observables to determine if they emit the same sequence of values
 */

import { Observable, OperatorFunction } from 'rxjs';

/**
 * Comparison function type for comparing emitted values
 * @template T The type of values being compared
 */
export type SequenceEqualComparator<T> = (a: T, b: T) => boolean;

/**
 * Creates an operator that compares the sequence of values emitted by the source observable
 * with the sequence of values emitted by another observable.
 * 
 * @template T The type of values emitted by the observables
 * @param compareTo The observable to compare against
 * @param comparator Optional custom comparison function. Defaults to strict equality (===)
 * @returns An OperatorFunction that emits a single boolean value indicating whether both sequences are equal
 * 
 * @example
 *