type Comparator<T = any> = (
  a: T,
  b: T,
  index: number,
  arrayA: T[],
  arrayB: T[],
  cache: Map<any, any>
) => boolean | undefined;

type Equalizer<T = any> = (
  a: T,
  b: T,
  flags: number,
  customizer: Comparator<T> | undefined,
  cache: Map<any, any>
) => boolean;

interface SetCache {
  has(value: any): boolean;
  push(value: any): void;
}

const COMPARE_PARTIAL_FLAG = 1;
const COMPARE_UNORDERED_FLAG = 2;

function equalArrays<T>(
  array: T[],
  other: T[],
  flags: number,
  customizer: Comparator<T> | undefined,
  equalizer: Equalizer<T>,
  cache: Map<any, any>
): boolean {
  const isPartial = !!(flags & COMPARE_PARTIAL_FLAG);
  const arrayLength = array.length;
  const otherLength = other.length;

  if (arrayLength !== otherLength && !(isPartial && otherLength > arrayLength)) {
    return false;
  }

  const arrayCached = cache.get(array);
  const otherCached = cache.get(other);

  if (arrayCached && otherCached) {
    return arrayCached === other && otherCached === array;
  }

  let index = -1;
  let result = true;
  const seen: SetCache | undefined = (flags & COMPARE_UNORDERED_FLAG) ? createSetCache() : undefined;

  cache.set(array, other);
  cache.set(other, array);

  while (++index < arrayLength) {
    const arrayValue = array[index];
    const otherValue = other[index];

    let compared: boolean | undefined;
    if (customizer) {
      compared = isPartial
        ? customizer(otherValue, arrayValue, index, other, array, cache)
        : customizer(arrayValue, otherValue, index, array, other, cache);
    }

    if (compared !== undefined) {
      if (compared) {
        continue;
      }
      result = false;
      break;
    }

    if (seen) {
      if (!arraySome(other, (otherValue: T, otherIndex: number): boolean => {
        if (!cacheHas(seen, otherIndex) && (arrayValue === otherValue || equalizer(arrayValue, otherValue, flags, customizer, cache))) {
          seen.push(otherIndex);
          return true;
        }
        return false;
      })) {
        result = false;
        break;
      }
    } else if (arrayValue !== otherValue && !equalizer(arrayValue, otherValue, flags, customizer, cache)) {
      result = false;
      break;
    }
  }

  cache.delete(array);
  cache.delete(other);

  return result;
}

function createSetCache(): SetCache {
  const set = new Set<any>();
  return {
    has: (value: any): boolean => set.has(value),
    push: (value: any): void => { set.add(value); }
  };
}

function arraySome<T>(array: T[], predicate: (value: T, index: number) => boolean): boolean {
  let index = -1;
  const length = array.length;

  while (++index < length) {
    if (predicate(array[index], index)) {
      return true;
    }
  }
  return false;
}

function cacheHas(cache: SetCache, key: any): boolean {
  return cache.has(key);
}

export default equalArrays;