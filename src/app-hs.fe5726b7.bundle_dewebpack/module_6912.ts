import flatten from './flatten';
import baseRest from './baseRest';
import baseFlatten from './baseFlatten';
import isIterateeCall from './isIterateeCall';

/**
 * Creates an array of unique values, in order, from all given arrays using
 * SameValueZero for equality comparisons.
 */
function union<T>(...arrays: Array<ArrayLike<T> | null | undefined>): T[] {
  return baseRest((arrays: Array<ArrayLike<T> | null | undefined>) => {
    return baseFlatten(flatten(arrays, 1, isIterateeCall, true));
  })(...arrays);
}

export default union;