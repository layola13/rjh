/**
 * RxJS map operator - transforms each value emitted by the source Observable
 * by applying a projection function to each value.
 * 
 * @module RxJS/Operators
 */

import { OperatorFunction, ObservableInput, Subscriber } from 'rxjs';

/**
 * Applies a given project function to each value emitted by the source Observable,
 * and emits the resulting values as an Observable.
 *
 * @template T The type of items emitted by the source Observable
 * @template R The type of items emitted by the resulting Observable after projection
 * 
 * @param project - The function to apply to each value emitted by the source Observable.
 *                  It receives the value and the index of the emission.
 * @param thisArg - An optional argument to define what `this` will be in the project function.
 * 
 * @returns An OperatorFunction that returns an Observable that emits the values from the
 *          source Observable transformed by the given project function.
 * 
 * @example
 *