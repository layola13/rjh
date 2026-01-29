type EqualityComparer = (a: unknown, b: unknown) => boolean;

type ComparisonStack = Map<unknown, unknown>;

const COMPARE_PARTIAL_FLAG = 1;
const COMPARE_UNORDERED_FLAG = 2;

interface SymbolConstructor {
  prototype: Symbol;
}

interface Symbol {
  valueOf(): symbol;
}

declare const Symbol: SymbolConstructor | undefined;

const symbolProto = Symbol ? Symbol.prototype : undefined;
const symbolValueOf = symbolProto ? symbolProto.valueOf : undefined;

function isEqual(value: unknown): boolean {
  return Object.prototype.toString.call(value) === '[object Number]' 
    ? value === value || value !== value 
    : value === value;
}

function mapToArray<K, V>(map: Map<K, V>): Array<[K, V]> {
  const result: Array<[K, V]> = [];
  map.forEach((value, key) => {
    result.push([key, value]);
  });
  return result;
}

function setToArray<T>(set: Set<T>): T[] {
  const result: T[] = [];
  set.forEach((value) => {
    result.push(value);
  });
  return result;
}

function equalArrays(
  arrayA: unknown[],
  arrayB: unknown[],
  bitmask: number,
  customizer: ((a: unknown, b: unknown) => boolean | undefined) | undefined,
  equalFunc: EqualityComparer,
  stack: ComparisonStack
): boolean {
  const isPartial = (bitmask & COMPARE_PARTIAL_FLAG) !== 0;
  const lengthA = arrayA.length;
  const lengthB = arrayB.length;

  if (lengthA !== lengthB && !isPartial) {
    return false;
  }

  let index = -1;
  let result = true;

  while (++index < lengthA) {
    const valueA = arrayA[index];
    const valueB = arrayB[index];

    if (customizer) {
      const compared = customizer(valueA, valueB);
      if (compared !== undefined) {
        if (compared) {
          continue;
        }
        result = false;
        break;
      }
    }

    if (!equalFunc(valueA, valueB)) {
      result = false;
      break;
    }
  }

  return result;
}

export function equalByTag(
  objectA: unknown,
  objectB: unknown,
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
      
      return !(
        bufferA.byteLength !== bufferB.byteLength ||
        !equalFunc(new Uint8Array(bufferA), new Uint8Array(bufferB))
      );
    }

    case '[object ArrayBuffer]': {
      const bufferA = objectA as ArrayBuffer;
      const bufferB = objectB as ArrayBuffer;
      
      return !(
        bufferA.byteLength !== bufferB.byteLength ||
        !equalFunc(new Uint8Array(bufferA), new Uint8Array(bufferB))
      );
    }

    case '[object Boolean]':
    case '[object Date]':
    case '[object Number]':
      return isEqual(+(objectA as number | boolean | Date));

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
      const converter = mapToArray;
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
        converter(mapA),
        converter(mapB),
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
      const converter = setToArray;
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
        converter(setA),
        converter(setB),
        newBitmask,
        customizer,
        equalFunc,
        stack
      );

      stack.delete(setA);
      return result;
    }

    case '[object Symbol]':
      if (symbolValueOf) {
        return symbolValueOf.call(objectA) === symbolValueOf.call(objectB);
      }
      return false;

    default:
      return false;
  }
}