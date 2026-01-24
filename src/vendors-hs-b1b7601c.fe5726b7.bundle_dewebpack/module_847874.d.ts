/**
 * RxJS takeUntil operator type definitions
 * 
 * The takeUntil operator emits values from the source Observable until a notifier Observable emits.
 * When the notifier emits, the source Observable completes.
 */

import { ObservableInput, OperatorFunction } from 'rxjs';

/**
 * Emits the values emitted by the source Observable until a notifier Observable emits a value.
 * 
 * @template T - The type of elements in the source Observable
 * @param {ObservableInput<unknown>} notifier - The Observable whose first emitted value will cause the output Observable to complete
 * @returns {OperatorFunction<T, T>} An operator function that returns an Observable that emits values from the source until notifier emits
 * 
 * @example
 *