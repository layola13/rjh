import { not } from './96003';
import { filter } from './225265';
import { innerFrom } from './267411';

/**
 * Partitions an observable into two arrays based on a predicate function.
 * 
 * @param source - The source observable or iterable to partition
 * @param predicate - Function that determines which partition each value belongs to
 * @param thisArg - Optional context object to use as `this` when executing the predicate
 * @returns A tuple of two observables: [matching items, non-matching items]
 */
export function partition<T>(
  source: any,
  predicate: (value: T, index: number) => boolean,
  thisArg?: any
): [any, any] {
  const innerSource = innerFrom(source);
  
  return [
    filter(predicate, thisArg)(innerSource),
    filter(not(predicate, thisArg))(innerSource)
  ];
}