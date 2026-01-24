/**
 * RxJS zip operator type definitions
 * Combines multiple observables by pairing their emissions at corresponding indices
 */

import { Observable, OperatorFunction } from 'rxjs';

/**
 * Combines the source observable with multiple other observables, emitting arrays of values
 * collected from each observable at the same index position.
 * 
 * @template T - Type of values emitted by the source observable
 * @template R - Types of values emitted by additional observables
 * @param observables - Additional observables to zip with the source
 * @returns An operator function that returns an observable emitting tuples of values
 * 
 * @example
 *