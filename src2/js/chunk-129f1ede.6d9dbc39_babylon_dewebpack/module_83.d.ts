/**
 * RxJS race operator type definitions
 * Subscribes to the first observable that emits, unsubscribing from all others
 */

import { Observable } from 'rxjs';
import { OperatorFunction } from 'rxjs';
import { ObservableInput } from 'rxjs';

/**
 * Returns an observable that mirrors the first source observable to emit an item.
 * Once any observable emits a value, race unsubscribes from all other observables.
 * 
 * @template T The type of elements emitted by the observables
 * @param observables Array of observables or individual observable arguments to race
 * @returns Observable that emits the same items as the first observable to emit
 * 
 * @example
 *