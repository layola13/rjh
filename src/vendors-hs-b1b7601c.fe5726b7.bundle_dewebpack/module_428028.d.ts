/**
 * RxJS publish operator - converts a cold Observable into a hot Observable
 * by multicasting values through a Subject.
 * 
 * @module publish
 */

import { Subject } from 'rxjs';
import { multicast } from 'rxjs/operators';
import { connect } from 'rxjs/operators';
import { Observable, OperatorFunction, UnaryFunction } from 'rxjs';

/**
 * Publishes values from the source Observable to multiple subscribers.
 * 
 * When a selector function is provided, uses the connect operator.
 * Otherwise, multicasts values through a Subject.
 * 
 * @template T - The type of values emitted by the source Observable
 * @template R - The return type when using a selector function
 * @param selector - Optional function that receives the shared Observable and returns a new Observable
 * @returns An operator function that converts a cold Observable into a hot Observable
 * 
 * @example
 * // Without selector - simple multicast
 * const published$ = source$.pipe(publish());
 * 
 * @example
 * // With selector - auto-connect behavior
 * const result$ = source$.pipe(
 *   publish(shared$ => shared$.pipe(map(x => x * 2)))
 * );
 */
export declare function publish<T, R>(
  selector?: (shared: Observable<T>) => Observable<R>
): UnaryFunction<Observable<T>, Observable<T | R>>;

export declare function publish<T>(
  selector?: undefined
): OperatorFunction<T, T>;

export declare function publish<T, R>(
  selector: (shared: Observable<T>) => Observable<R>
): OperatorFunction<T, R>;