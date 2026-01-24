/**
 * RxJS timestamp operator type definitions
 * Attaches a timestamp to each emitted value from the source Observable
 */

import { MonoTypeOperatorFunction, OperatorFunction } from 'rxjs';

/**
 * Timestamp provider interface for generating timestamps
 */
export interface TimestampProvider {
  /**
   * Returns the current timestamp in milliseconds
   */
  now(): number;
}

/**
 * Object emitted by the timestamp operator containing the original value and its timestamp
 * @template T The type of the original value
 */
export interface Timestamp<T> {
  /**
   * The original value emitted by the source Observable
   */
  value: T;
  
  /**
   * The timestamp (in milliseconds) when the value was emitted
   */
  timestamp: number;
}

/**
 * Attaches a timestamp to each value emitted by the source Observable.
 * 
 * @template T The type of values emitted by the source Observable
 * @param timestampProvider Optional provider for generating timestamps. 
 *                          Defaults to the built-in dateTimestampProvider if not specified.
 * @returns An operator function that transforms source values into Timestamp objects
 * 
 * @example
 *