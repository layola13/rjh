interface GetKeysFunction {
  (obj: object): string[];
}

interface EqualityComparerFunction {
  (
    value: unknown,
    other: unknown,
    bitmask: number,
    customizer: CustomizerFunction | undefined,
    stack: Stack
  ): boolean;
}

interface CustomizerFunction {
  (
    objValue: unknown,
    othValue: unknown,
    key: string | number | symbol,
    object: unknown,
    other: unknown,
    stack: Stack
  ): boolean | undefined;
}

interface Stack {
  get(key: object): unknown;
  set(key: object, value: unknown): void;
  delete(key: object): void;
}

const COMPARE_PARTIAL_FLAG = 1;

const hasOwnProperty = Object.prototype.hasOwnProperty;

export function equalObjects(
  object: Record<string | number | symbol, unknown>,
  other: Record<string | number | symbol, unknown>,
  bitmask: number,
  customizer: CustomizerFunction | undefined,
  equalFunc: EqualityComparerFunction,
  stack: Stack,
  getKeys: GetKeysFunction
): boolean {
  const isPartial = (bitmask & COMPARE_PARTIAL_FLAG) !== 0;
  const objectKeys = getKeys(object);
  const objectLength = objectKeys.length;

  if (objectLength !== getKeys(other).length && !isPartial) {
    return false;
  }

  let index = objectLength;
  while (index--) {
    const key = objectKeys[index];
    if (!(isPartial ? key in other : hasOwnProperty.call(other, key))) {
      return false;
    }
  }

  const objectStacked = stack.get(object);
  const otherStacked = stack.get(other);

  if (objectStacked && otherStacked) {
    return objectStacked === other && otherStacked === object;
  }

  let result = true;
  stack.set(object, other);
  stack.set(other, object);

  let skipConstructor = isPartial;
  index = -1;

  while (++index < objectLength) {
    const key = objectKeys[index];
    const objectValue = object[key];
    const otherValue = other[key];

    let compared: boolean | undefined;
    if (customizer) {
      compared = isPartial
        ? customizer(otherValue, objectValue, key, other, object, stack)
        : customizer(objectValue, otherValue, key, object, other, stack);
    }

    if (
      !(
        compared === undefined
          ? objectValue === otherValue ||
            equalFunc(objectValue, otherValue, bitmask, customizer, stack)
          : compared
      )
    ) {
      result = false;
      break;
    }

    skipConstructor = skipConstructor || key === 'constructor';
  }

  if (result && !skipConstructor) {
    const objectConstructor = (object as { constructor?: unknown }).constructor;
    const otherConstructor = (other as { constructor?: unknown }).constructor;

    if (
      objectConstructor !== otherConstructor &&
      'constructor' in object &&
      'constructor' in other &&
      !(
        typeof objectConstructor === 'function' &&
        objectConstructor instanceof objectConstructor &&
        typeof otherConstructor === 'function' &&
        otherConstructor instanceof otherConstructor
      )
    ) {
      result = false;
    }
  }

  stack.delete(object);
  stack.delete(other);

  return result;
}