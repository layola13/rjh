import { scanInternals } from './scanInternals';
import { operate } from './operate';

/**
 * Applies an accumulator function over the source Observable, and returns the accumulated result when the source completes.
 * 
 * @param accumulator - The accumulator function called on each source value.
 * @param seed - The initial accumulation value.
 * @returns A function that returns an Observable that emits a single value that is the result of accumulating the values emitted by the source Observable.
 */
export function reduce<T, R>(
  accumulator: (acc: R, value: T, index: number) => R,
  seed: R
): (source: unknown) => unknown;
export function reduce<T>(
  accumulator: (acc: T, value: T, index: number) => T
): (source: unknown) => unknown;
export function reduce<T, R>(
  accumulator: (acc: T | R, value: T, index: number) => R,
  seed?: R
): (source: unknown) => unknown {
  const hasSeed = arguments.length >= 2;
  const hasCompletion = false;
  const emitOnNext = true;

  return operate(scanInternals(accumulator, seed, hasSeed, hasCompletion, emitOnNext));
}