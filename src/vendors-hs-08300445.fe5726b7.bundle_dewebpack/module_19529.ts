function isStrictEqual(valueA: unknown, valueB: unknown): boolean {
  return valueA === valueB 
    ? valueA !== 0 || valueB !== 0 || 1 / (valueA as number) === 1 / (valueB as number)
    : valueA !== valueA && valueB !== valueB;
}

function shallowEqual(objA: unknown, objB: unknown): boolean {
  if (isStrictEqual(objA, objB)) {
    return true;
  }

  if (
    typeof objA !== 'object' ||
    objA === null ||
    typeof objB !== 'object' ||
    objB === null
  ) {
    return false;
  }

  const keysA = Object.keys(objA);
  const keysB = Object.keys(objB);

  if (keysA.length !== keysB.length) {
    return false;
  }

  for (let i = 0; i < keysA.length; i++) {
    const key = keysA[i];
    if (
      !Object.prototype.hasOwnProperty.call(objB, key) ||
      !isStrictEqual((objA as Record<string, unknown>)[key], (objB as Record<string, unknown>)[key])
    ) {
      return false;
    }
  }

  return true;
}

export default shallowEqual;