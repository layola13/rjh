/**
 * RxJS delayWhen operator - Delays the emission of items from the source Observable
 * by a given time span determined by the emissions of another Observable.
 * 
 * @module delayWhen
 */

import { ObservableInput, OperatorFunction, MonoTypeOperatorFunction } from 'rxjs';

/**
 * Delays the emission of items from the source Observable by a time span
 * determined by the emissions of another Observable on a per-item basis.
 * 
 * @template T The type of elements in the source Observable
 * @param durationSelector A function that returns an Observable for each value emitted
 *        by the source Observable, which is then used to delay the emission of that item
 *        on the output Observable until the returned Observable emits a value.
 * @param subscriptionDelay An Observable that triggers the subscription to the source
 *        Observable once it emits any value. If not provided, subscription happens immediately.
 * @returns An operator function that returns an Observable that delays the emissions of
 *          the source Observable by an amount of time specified by the Observable returned
 *          by `durationSelector`.
 * 
 * @example
 *