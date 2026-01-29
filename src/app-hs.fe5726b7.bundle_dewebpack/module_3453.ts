import { arrayPush } from './arrayPush';
import { isFlattenable } from './isFlattenable';

/**
 * The base implementation of `flatten` with support for restricting flattening.
 *
 * @param array - The array to flatten.
 * @param depth - The maximum recursion depth.
 * @param predicate - The function invoked per iteration.
 * @param isStrict - Restrict to values that pass `predicate` check.
 * @param result - The initial result value.
 * @returns Returns the new flattened array.
 */
function baseFlatten<T>(
  array: ArrayLike<T>,
  depth: number,
  predicate?: (value: unknown) => boolean,
  isStrict?: boolean,
  result?: unknown[]
): unknown[] {
  const arrayLength = array.length;
  let index = -1;

  predicate = predicate ?? isFlattenable;
  result = result ?? [];

  while (++index < arrayLength) {
    const value = array[index];

    if (depth > 0 && predicate(value)) {
      if (depth > 1) {
        baseFlatten(value as ArrayLike<T>, depth - 1, predicate, isStrict, result);
      } else {
        arrayPush(result, value as unknown[]);
      }
    } else if (!isStrict) {
      result[result.length] = value;
    }
  }

  return result;
}

export { baseFlatten };