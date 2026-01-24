/**
 * Module: module_770174
 * Original ID: 770174
 * 
 * Provides the `raceWith` operator for RxJS observables.
 * This operator races the source observable with multiple other observables,
 * emitting values from whichever observable emits first.
 */

import { raceInit } from './race-init';
import { operate } from './operate';
import { identity } from './identity';
import type { Observable } from './observable';
import type { OperatorFunction } from './operator-function';

/**
 * Race the source observable with multiple other observables.
 * 
 * Creates an observable that mirrors the first source observable to emit an item.
 * Once one observable emits, the others are unsubscribed.
 * 
 * @template T - The type of values emitted by the observables
 * @param otherSources - Additional observables to race against the source
 * @returns An operator function that races the source with other observables
 * 
 * @example
 *