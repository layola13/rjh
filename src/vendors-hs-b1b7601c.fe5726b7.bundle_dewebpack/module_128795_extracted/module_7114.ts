interface ComparisonCache {
  get(key: unknown): unknown;
  set(key: unknown, value: unknown): void;
  delete(key: unknown): boolean;
}

interface ComparisonCustomizer {
  (
    valueA: unknown,
    valueB: unknown,
    index: number,
    arrayA: unknown[],
    arrayB: unknown[],
    cache: ComparisonCache
  ): boolean | undefined;
}

interface EqualityComparator {
  (
    valueA: unknown,
    valueB: unknown,
    bitmask: number,
    customizer: ComparisonCustomizer | undefined,
    cache: ComparisonCache
  ): boolean;
}

const COMPARE_PARTIAL_FLAG = 1;
const COMPARE_UNORDERED_FLAG = 2;

/**
 * Compares two arrays for equality with deep comparison support.
 * Supports partial comparison and custom comparison logic.
 */
function equalArrays(
  arrayA: unknown[],
  arrayB: unknown[],
  bitmask: number,
  customizer: ComparisonCustomizer | undefined,
  equalityComparator: EqualityComparator,
  cache: ComparisonCache
): boolean {
  const isPartial = (bitmask & COMPARE_PARTIAL_FLAG) !== 0;
  const lengthA = arrayA.length;
  const lengthB = arrayB.length;

  if (lengthA !== lengthB && !(isPartial && lengthB > lengthA)) {
    return false;
  }

  const cachedA = cache.get(arrayA);
  const cachedB = cache.get(arrayB);

  if (cachedA && cachedB) {
    return cachedA === arrayB && cachedB === arrayA;
  }

  let index = -1;
  let isEqual = true;
  const seen = (bitmask & COMPARE_UNORDERED_FLAG) !== 0 ? new Set<number>() : undefined;

  cache.set(arrayA, arrayB);
  cache.set(arrayB, arrayA);

  while (++index < lengthA) {
    const valueA = arrayA[index];
    const valueB = arrayB[index];

    let comparisonResult: boolean | undefined;

    if (customizer) {
      comparisonResult = isPartial
        ? customizer(valueB, valueA, index, arrayB, arrayA, cache)
        : customizer(valueA, valueB, index, arrayA, arrayB, cache);
    }

    if (comparisonResult !== undefined) {
      if (comparisonResult) {
        continue;
      }
      isEqual = false;
      break;
    }

    if (seen) {
      const found = arrayB.some((elementB, indexB) => {
        if (!seen.has(indexB) && (valueA === elementB || equalityComparator(valueA, elementB, bitmask, customizer, cache))) {
          seen.add(indexB);
          return true;
        }
        return false;
      });

      if (!found) {
        isEqual = false;
        break;
      }
    } else if (valueA !== valueB && !equalityComparator(valueA, valueB, bitmask, customizer, cache)) {
      isEqual = false;
      break;
    }
  }

  cache.delete(arrayA);
  cache.delete(arrayB);

  return isEqual;
}

export default equalArrays;