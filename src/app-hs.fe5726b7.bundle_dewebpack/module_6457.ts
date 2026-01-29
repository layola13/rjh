type EqualityComparator = (a: unknown, b: unknown) => boolean;
type Stack = Map<unknown, unknown>;

const enum ComparisonFlags {
  PARTIAL = 1,
  UNORDERED = 2
}

interface DataView {
  byteLength: number;
  byteOffset: number;
  buffer: ArrayBuffer;
}

interface TypedArray {
  length: number;
  [index: number]: number;
}

const ObjectPrototype = Object.prototype;
const SymbolPrototype = typeof Symbol !== 'undefined' ? Symbol.prototype : undefined;
const symbolValueOf = SymbolPrototype?.valueOf;

function mapToArray<K, V>(map: Map<K, V>): Array<[K, V]> {
  const result: Array<[K, V]> = [];
  map.forEach((value, key) => {
    result.push([key, value]);
  });
  return result;
}

function setToArray<T>(set: Set<T>): T[] {
  const result: T[] = [];
  set.forEach(value => {
    result.push(value);
  });
  return result;
}

function equalArrays(
  arr1: unknown[],
  arr2: unknown[],
  flags: number,
  customizer: EqualityComparator | undefined,
  equalFunc: EqualityComparator,
  stack: Stack
): boolean {
  const isPartial = (flags & ComparisonFlags.PARTIAL) !== 0;
  const length = arr1.length;
  
  if (length !== arr2.length && !isPartial) {
    return false;
  }
  
  for (let i = 0; i < length; i++) {
    if (!equalFunc(arr1[i], arr2[i])) {
      return false;
    }
  }
  
  return true;
}

function Uint8ArrayConstructor(buffer: ArrayBuffer): TypedArray {
  return new Uint8Array(buffer);
}

function isStrictEqual(value: unknown, other: unknown): boolean {
  return value === other || (value !== value && other !== other);
}

export default function equalByTag(
  object: unknown,
  other: unknown,
  tag: string,
  flags: number,
  customizer: EqualityComparator | undefined,
  equalFunc: EqualityComparator,
  stack: Stack
): boolean {
  switch (tag) {
    case "[object DataView]": {
      const objView = object as DataView;
      const othView = other as DataView;
      
      if (objView.byteLength !== othView.byteLength || objView.byteOffset !== othView.byteOffset) {
        return false;
      }
      
      return equalFunc(
        new Uint8Array(objView.buffer),
        new Uint8Array(othView.buffer)
      );
    }

    case "[object ArrayBuffer]": {
      const objBuffer = object as ArrayBuffer;
      const othBuffer = other as ArrayBuffer;
      
      if (objBuffer.byteLength !== othBuffer.byteLength) {
        return false;
      }
      
      return equalFunc(
        Uint8ArrayConstructor(objBuffer),
        Uint8ArrayConstructor(othBuffer)
      );
    }

    case "[object Boolean]":
    case "[object Date]":
    case "[object Number]":
      return isStrictEqual(+(object as number | boolean | Date), +(other as number | boolean | Date));

    case "[object Error]": {
      const objError = object as Error;
      const othError = other as Error;
      return objError.name === othError.name && objError.message === othError.message;
    }

    case "[object RegExp]":
    case "[object String]":
      return String(object) === String(other);

    case "[object Map]": {
      const objMap = object as Map<unknown, unknown>;
      const othMap = other as Map<unknown, unknown>;
      const convert = mapToArray;
      const isPartial = (flags & ComparisonFlags.PARTIAL) !== 0;
      
      if (objMap.size !== othMap.size && !isPartial) {
        return false;
      }
      
      const stacked = stack.get(objMap);
      if (stacked !== undefined) {
        return stacked === othMap;
      }
      
      const newFlags = flags | ComparisonFlags.UNORDERED;
      stack.set(objMap, othMap);
      
      const result = equalArrays(
        convert(objMap),
        convert(othMap),
        newFlags,
        customizer,
        equalFunc,
        stack
      );
      
      stack.delete(objMap);
      return result;
    }

    case "[object Set]": {
      const objSet = object as Set<unknown>;
      const othSet = other as Set<unknown>;
      const convert = setToArray;
      const isPartial = (flags & ComparisonFlags.PARTIAL) !== 0;
      
      if (objSet.size !== othSet.size && !isPartial) {
        return false;
      }
      
      const stacked = stack.get(objSet);
      if (stacked !== undefined) {
        return stacked === othSet;
      }
      
      const newFlags = flags | ComparisonFlags.UNORDERED;
      stack.set(objSet, othSet);
      
      const result = equalArrays(
        convert(objSet),
        convert(othSet),
        newFlags,
        customizer,
        equalFunc,
        stack
      );
      
      stack.delete(objSet);
      return result;
    }

    case "[object Symbol]":
      if (symbolValueOf) {
        return symbolValueOf.call(object) === symbolValueOf.call(other);
      }
      return false;

    default:
      return false;
  }
}