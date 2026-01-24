/**
 * RxJS operator that skips the last N values emitted by the source Observable.
 * 
 * @module skipLast
 * @description
 * This operator buffers the last N values and only emits values once enough
 * new values have been received to push older values out of the buffer.
 */

import { MonoTypeOperatorFunction, Observable } from 'rxjs';

/**
 * Skips the last `count` values emitted by the source Observable.
 * 
 * @template T - The type of values emitted by the source Observable
 * @param count - The number of values to skip from the end of the sequence
 * @returns A MonoTypeOperatorFunction that emits values from the source Observable
 *          except for the last `count` values
 * 
 * @example
 *