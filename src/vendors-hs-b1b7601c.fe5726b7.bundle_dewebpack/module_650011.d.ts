/**
 * Filters out duplicate values from an Observable sequence.
 * 
 * @template T The type of items emitted by the source Observable
 * @template K The type of the key used for comparison
 */

import { MonoTypeOperatorFunction, ObservableInput } from 'rxjs';

/**
 * Returns an Observable that emits all items emitted by the source Observable that are distinct by comparison from previous items.
 * 
 * @param keySelector Optional function to select which value you want to check as distinct.
 * @param flushes Optional Observable that flushes the internal HashSet of the operator.
 * @returns A function that returns an Observable that emits items from the source Observable with distinct values.
 * 
 * @example
 *