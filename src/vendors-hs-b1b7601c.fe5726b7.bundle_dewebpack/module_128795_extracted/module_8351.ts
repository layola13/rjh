type EqualityComparer = (a: unknown, b: unknown) => boolean;

type ComparisonStack = Map<object, object>;

const COMPARE_PARTIAL_FLAG = 1;
const COMPARE_UNORDERED_FLAG = 2;

const symbolProto = typeof Symbol !== 'undefined' ? Symbol.prototype : undefined;
const symbolValueOf = symbolProto?.valueOf;

function mapToArray<K, V>(map: Map<K, V>): Array<[K, V]> {
  const result: Array<[K, V]> = [];
  map.forEach((value, key) => {
    result.push([key, value]);
  });
  return result;
}

function setToArray<T>(set: Set<T>): T[] {
  return Array.from(set);
}

function isEqual(a: number, b: number): boolean {
  return a === b || (a !== a && b !== b);
}

function equalArrays(
  arrA: unknown[],
  arrB: unknown[],
  bitmask: number,
  customizer: ((a: unknown, b: unknown) => boolean | undefined) | undefined,
  equalFunc: EqualityComparer,
  stack: ComparisonStack
): boolean {
  const isPartial = (bitmask & COMPARE_PARTIAL_FLAG) !== 0;
  const arrLength = arrA.length;
  const othLength = arrB.length;

  if (arrLength !== othLength && !isPartial) {
    return false;
  }

  let index = -1;
  let result = true;

  while (++index < arrLength) {
    const arrValue = arrA[index];
    const othValue = arrB[index];

    if (customizer) {
      const compared = customizer(arrValue, othValue);
      if (compared !== undefined) {
        if (compared) {
          continue;
        }
        result = false;
        break;
      }
    }

    if (!equalFunc(arrValue, othValue)) {
      result = false;
      break;
    }
  }

  return result;
}

export function equalByTag(
  objectA: object,
  objectB: object,
  tag: string,
  bitmask: number,
  customizer: ((a: unknown, b: unknown) => boolean | undefined) | undefined,
  equalFunc: EqualityComparer,
  stack: ComparisonStack
): boolean {
  switch (tag) {
    case '[object DataView]': {
      const dataViewA = objectA as DataView;
      const dataViewB = objectB as DataView;
      
      if (
        dataViewA.byteLength !== dataViewB.byteLength ||
        dataViewA.byteOffset !== dataViewB.byteOffset
      ) {
        return false;
      }
      
      const bufferA = dataViewA.buffer;
      const bufferB = dataViewB.buffer;
      
      return equalFunc(
        new Uint8Array(bufferA),
        new Uint8Array(bufferB)
      );
    }

    case '[object ArrayBuffer]': {
      const arrayBufferA = objectA as ArrayBuffer;
      const arrayBufferB = objectB as ArrayBuffer;
      
      if (arrayBufferA.byteLength !== arrayBufferB.byteLength) {
        return false;
      }
      
      return equalFunc(
        new Uint8Array(arrayBufferA),
        new Uint8Array(arrayBufferB)
      );
    }

    case '[object Boolean]':
    case '[object Date]':
    case '[object Number]':
      return isEqual(+(objectA as any), +(objectB as any));

    case '[object Error]': {
      const errorA = objectA as Error;
      const errorB = objectB as Error;
      return errorA.name === errorB.name && errorA.message === errorB.message;
    }

    case '[object RegExp]':
    case '[object String]':
      return String(objectA) === String(objectB);

    case '[object Map]': {
      const mapA = objectA as Map<unknown, unknown>;
      const mapB = objectB as Map<unknown, unknown>;
      const convertFunc = mapToArray;
      const isPartial = (bitmask & COMPARE_PARTIAL_FLAG) !== 0;

      if (mapA.size !== mapB.size && !isPartial) {
        return false;
      }

      const stacked = stack.get(mapA);
      if (stacked) {
        return stacked === mapB;
      }

      const newBitmask = bitmask | COMPARE_UNORDERED_FLAG;
      stack.set(mapA, mapB);

      const result = equalArrays(
        convertFunc(mapA),
        convertFunc(mapB),
        newBitmask,
        customizer,
        equalFunc,
        stack
      );

      stack.delete(mapA);
      return result;
    }

    case '[object Set]': {
      const setA = objectA as Set<unknown>;
      const setB = objectB as Set<unknown>;
      const convertFunc = setToArray;
      const isPartial = (bitmask & COMPARE_PARTIAL_FLAG) !== 0;

      if (setA.size !== setB.size && !isPartial) {
        return false;
      }

      const stacked = stack.get(setA);
      if (stacked) {
        return stacked === setB;
      }

      const newBitmask = bitmask | COMPARE_UNORDERED_FLAG;
      stack.set(setA, setB);

      const result = equalArrays(
        convertFunc(setA),
        convertFunc(setB),
        newBitmask,
        customizer,
        equalFunc,
        stack
      );

      stack.delete(setA);
      return result;
    }

    case '[object Symbol]': {
      if (symbolValueOf) {
        return symbolValueOf.call(objectA) === symbolValueOf.call(objectB);
      }
      return false;
    }
  }

  return false;
}