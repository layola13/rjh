/**
 * Finds the index of the first element in an observable sequence that satisfies a predicate.
 * 
 * @module findIndex
 */

import { operate } from './operate';
import { createFind } from './createFind';

/**
 * Predicate function to test each element.
 * 
 * @template T - The type of elements in the source observable
 * @param value - The current element being tested
 * @param index - The zero-based index of the current element
 * @param source - The source observable array
 * @returns True if the element satisfies the condition, false otherwise
 */
export type PredicateFn<T> = (value: T, index: number, source: T[]) => boolean;

/**
 * Optional context object to use as `this` when executing the predicate.
 */
export type ThisArg = unknown;

/**
 * Finds the index of the first element in the observable sequence that matches the predicate.
 * 
 * @template T - The type of elements being searched
 * @param predicate - Function to test each element for a condition
 * @param thisArg - Optional object to use as `this` when executing the predicate
 * @returns An operator function that returns the index of the first matching element, or -1 if not found
 * 
 * @example
 *