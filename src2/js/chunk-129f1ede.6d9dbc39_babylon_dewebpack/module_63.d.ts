/**
 * RxJS combineLatest operator module
 * Combines multiple observables and emits an array of their latest values whenever any observable emits
 */

import { Observable } from 'rxjs';
import { ObservableInput, OperatorFunction, SchedulerLike } from 'rxjs/internal/types';

/**
 * Sentinel value used internally to track uninitialized observable values
 * @internal
 */
declare const NONE: unique symbol;

/**
 * Combines multiple observables into a single observable that emits arrays of the latest values
 * 
 * @template T - The type of values emitted by input observables
 * @template R - The type of result after applying optional result selector
 * 
 * @param observables - Array of observable sources to combine
 * @param resultSelector - Optional function to transform combined values
 * @param scheduler - Optional scheduler for managing timing of emissions
 * @returns Observable that emits combined latest values as array or transformed result
 * 
 * @example
 *