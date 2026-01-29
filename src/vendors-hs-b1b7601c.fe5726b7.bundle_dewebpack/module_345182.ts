type CustomComparator = (
  valueA: unknown,
  valueB: unknown,
  key?: string
) => boolean | undefined;

function deepEqual(
  objectA: unknown,
  objectB: unknown,
  customizer?: CustomComparator,
  context?: unknown
): boolean {
  const customizerResult = customizer
    ? customizer.call(context, objectA, objectB)
    : undefined;

  if (customizerResult !== undefined) {
    return !!customizerResult;
  }

  if (objectA === objectB) {
    return true;
  }

  if (
    typeof objectA !== "object" ||
    objectA === null ||
    typeof objectB !== "object" ||
    objectB === null
  ) {
    return false;
  }

  const keysA = Object.keys(objectA);
  const keysB = Object.keys(objectB);

  if (keysA.length !== keysB.length) {
    return false;
  }

  const hasProperty = Object.prototype.hasOwnProperty.bind(objectB);

  for (let index = 0; index < keysA.length; index++) {
    const currentKey = keysA[index];

    if (!hasProperty(currentKey)) {
      return false;
    }

    const valueA = (objectA as Record<string, unknown>)[currentKey];
    const valueB = (objectB as Record<string, unknown>)[currentKey];

    const keyComparisonResult = customizer
      ? customizer.call(context, valueA, valueB, currentKey)
      : undefined;

    if (
      keyComparisonResult === false ||
      (keyComparisonResult === undefined && valueA !== valueB)
    ) {
      return false;
    }
  }

  return true;
}

export default deepEqual;