/**
 * RxJS take operator - Emits only the first n values emitted by the source Observable.
 * 
 * @module take
 * @description
 * Returns an Observable that emits only the first `count` values emitted by the source Observable.
 * If the source emits fewer than `count` values, all of its values are emitted.
 * After that, the Observable completes, regardless of whether the source completes.
 */

import { Observable, EMPTY } from 'rxjs';
import { operate } from 'rxjs/internal/operators/operate';
import { createOperatorSubscriber } from 'rxjs/internal/operators/OperatorSubscriber';
import { MonoTypeOperatorFunction } from 'rxjs';

/**
 * Emits only the first `count` values emitted by the source Observable.
 * 
 * @template T The type of elements emitted by the source Observable
 * @param {number} count The maximum number of values to emit from the source
 * @returns {MonoTypeOperatorFunction<T>} A function that returns an Observable that emits only the first `count` values
 * 
 * @example
 *