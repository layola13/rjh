import SetCache from './SetCache';
import arraySome from './arraySome';
import cacheHas from './cacheHas';

/**
 * Compares two arrays for equality with support for partial comparison and custom comparators.
 * 
 * @param array - The first array to compare
 * @param other - The second array to compare
 * @param bitmask - Bitmask flags controlling comparison behavior (bit 1: partial, bit 2: unordered)
 * @param customizer - Optional function to customize element comparisons
 * @param equalFunc - Function to perform deep equality checks
 * @param stack - Stack to track circular references
 * @returns True if arrays are equal, false otherwise
 */
function equalArrays<T>(
  array: T[],
  other: T[],
  bitmask: number,
  customizer: ((a: unknown, b: unknown, index: number, arrayA: T[], arrayB: T[], stack: Map<unknown, unknown>) => boolean | undefined) | undefined,
  equalFunc: (a: unknown, b: unknown, bitmask: number, customizer: unknown, stack: Map<unknown, unknown>) => boolean,
  stack: Map<unknown, unknown>
): boolean {
  const isPartial = (bitmask & 1) !== 0;
  const arrayLength = array.length;
  const otherLength = other.length;

  if (arrayLength !== otherLength && !(isPartial && otherLength > arrayLength)) {
    return false;
  }

  const arrayCached = stack.get(array);
  const otherCached = stack.get(other);

  if (arrayCached && otherCached) {
    return arrayCached === other && otherCached === array;
  }

  let index = -1;
  let result = true;
  const seen = (bitmask & 2) !== 0 ? new SetCache() : undefined;

  stack.set(array, other);
  stack.set(other, array);

  while (++index < arrayLength) {
    const arrayValue = array[index];
    const otherValue = other[index];

    let compared: boolean | undefined;
    if (customizer) {
      compared = isPartial
        ? customizer(otherValue, arrayValue, index, other, array, stack)
        : customizer(arrayValue, otherValue, index, array, other, stack);
    }

    if (compared !== undefined) {
      if (compared) {
        continue;
      }
      result = false;
      break;
    }

    if (seen) {
      if (!arraySome(other, (otherVal: T, otherIndex: number) => {
        if (!cacheHas(seen, otherIndex) && (arrayValue === otherVal || equalFunc(arrayValue, otherVal, bitmask, customizer, stack))) {
          return seen.push(otherIndex);
        }
      })) {
        result = false;
        break;
      }
    } else if (arrayValue !== otherValue && !equalFunc(arrayValue, otherValue, bitmask, customizer, stack)) {
      result = false;
      break;
    }
  }

  stack.delete(array);
  stack.delete(other);

  return result;
}

export default equalArrays;