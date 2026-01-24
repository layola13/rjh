/**
 * RxJS audit operator
 * 
 * Ignores source values for a duration determined by another Observable, 
 * then emits the most recent value from the source Observable, 
 * then repeats this process.
 * 
 * @module RxJS/Operators
 */

import { MonoTypeOperatorFunction, ObservableInput } from 'rxjs';

/**
 * Audit operator for RxJS observables.
 * 
 * Emits the most recent value from the source Observable on the output Observable 
 * as soon as its internal timer becomes silent, and then repeats this process. 
 * It ignores the source values while the internal timer is active.
 * 
 * @template T - The type of elements emitted by the source Observable
 * 
 * @param durationSelector - A function that receives a value from the source Observable
 *                           and returns an Observable or Promise that signals when to 
 *                           emit the value on the output Observable.
 * 
 * @returns A function that returns an Observable that performs the audit operation
 * 
 * @example
 *