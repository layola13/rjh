interface EqualityComparator {
  (a: unknown, b: unknown, index: number, arrayA: unknown[], arrayB: unknown[], cache: Map<unknown, unknown>): boolean | undefined;
}

interface DeepEqualFunction {
  (a: unknown, b: unknown, flags: number, customizer: EqualityComparator | undefined, cache: Map<unknown, unknown>): boolean;
}

function equalArrays(
  arrayA: unknown[],
  arrayB: unknown[],
  flags: number,
  customizer: EqualityComparator | undefined,
  deepEqual: DeepEqualFunction,
  cache: Map<unknown, unknown>
): boolean {
  const isPartial = (flags & 1) !== 0;
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
  const seen = (flags & 2) !== 0 ? new Set<number>() : undefined;

  cache.set(arrayA, arrayB);
  cache.set(arrayB, arrayA);

  while (++index < lengthA) {
    const valueA = arrayA[index];
    const valueB = arrayB[index];

    let compared: boolean | undefined;
    if (customizer) {
      compared = isPartial
        ? customizer(valueB, valueA, index, arrayB, arrayA, cache)
        : customizer(valueA, valueB, index, arrayA, arrayB, cache);
    }

    if (compared !== undefined) {
      if (compared) {
        continue;
      }
      isEqual = false;
      break;
    }

    if (seen) {
      let found = false;
      for (let innerIndex = 0; innerIndex < lengthB; innerIndex++) {
        const innerValue = arrayB[innerIndex];
        if (
          !seen.has(innerIndex) &&
          (valueA === innerValue || deepEqual(valueA, innerValue, flags, customizer, cache))
        ) {
          seen.add(innerIndex);
          found = true;
          break;
        }
      }
      if (!found) {
        isEqual = false;
        break;
      }
    } else if (valueA !== valueB && !deepEqual(valueA, valueB, flags, customizer, cache)) {
      isEqual = false;
      break;
    }
  }

  cache.delete(arrayA);
  cache.delete(arrayB);

  return isEqual;
}

export default equalArrays;