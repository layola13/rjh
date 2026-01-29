interface EqualityComparer {
  (a: unknown, b: unknown, bitmask: number, customizer: CustomEqualFunction | undefined, stack: Map<unknown, unknown>): boolean;
}

interface CustomEqualFunction {
  (objValue: unknown, othValue: unknown, key: string | number | symbol, object: unknown, other: unknown, stack: Map<unknown, unknown>): boolean | undefined;
}

interface GetAllKeysFunction {
  (object: object): Array<string | symbol>;
}

const hasOwnProperty = Object.prototype.hasOwnProperty;

const COMPARE_PARTIAL_FLAG = 1;

function equalObjects(
  object: Record<string | symbol, unknown>,
  other: Record<string | symbol, unknown>,
  bitmask: number,
  customizer: CustomEqualFunction | undefined,
  equalFunc: EqualityComparer,
  stack: Map<unknown, unknown>,
  getAllKeys: GetAllKeysFunction = (obj: object): Array<string | symbol> => Object.keys(obj)
): boolean {
  const isPartial = (bitmask & COMPARE_PARTIAL_FLAG) !== 0;
  const objKeys = getAllKeys(object);
  const objLength = objKeys.length;
  const othKeys = getAllKeys(other);

  if (objLength !== othKeys.length && !isPartial) {
    return false;
  }

  let index = objLength;
  while (index--) {
    const key = objKeys[index];
    if (!(isPartial ? key in other : hasOwnProperty.call(other, key))) {
      return false;
    }
  }

  const objStacked = stack.get(object);
  const othStacked = stack.get(other);

  if (objStacked && othStacked) {
    return objStacked === other && othStacked === object;
  }

  let result = true;
  stack.set(object, other);
  stack.set(other, object);

  let skipConstructor = isPartial;
  index = -1;

  while (++index < objLength) {
    const key = objKeys[index];
    const objValue = object[key];
    const othValue = other[key];

    let compared: boolean | undefined;
    if (customizer) {
      compared = isPartial
        ? customizer(othValue, objValue, key, other, object, stack)
        : customizer(objValue, othValue, key, object, other, stack);
    }

    if (!(compared === undefined ? (objValue === othValue || equalFunc(objValue, othValue, bitmask, customizer, stack)) : compared)) {
      result = false;
      break;
    }

    skipConstructor ||= (key === 'constructor');
  }

  if (result && !skipConstructor) {
    const objConstructor = (object as { constructor?: Function }).constructor;
    const othConstructor = (other as { constructor?: Function }).constructor;

    if (
      objConstructor !== othConstructor &&
      ('constructor' in object) &&
      ('constructor' in other) &&
      !(typeof objConstructor === 'function' && objConstructor instanceof objConstructor &&
        typeof othConstructor === 'function' && othConstructor instanceof othConstructor)
    ) {
      result = false;
    }
  }

  stack.delete(object);
  stack.delete(other);

  return result;
}

export default equalObjects;