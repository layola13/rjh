export interface Iterable<T> {
  [ITERABLE_SYMBOL]: boolean;
}

export interface KeyedIterable<K, V> extends Iterable<[K, V]> {
  [KEYED_SYMBOL]: boolean;
}

export interface IndexedIterable<T> extends Iterable<T> {
  [INDEXED_SYMBOL]: boolean;
}

export interface OrderedIterable<T> extends Iterable<T> {
  [ORDERED_SYMBOL]: boolean;
}

const ITERABLE_SYMBOL = '@@__IMMUTABLE_ITERABLE__@@';
const KEYED_SYMBOL = '@@__IMMUTABLE_KEYED__@@';
const INDEXED_SYMBOL = '@@__IMMUTABLE_INDEXED__@@';
const ORDERED_SYMBOL = '@@__IMMUTABLE_ORDERED__@@';

const DELETE_MARKER = 'delete';
const SHIFT = 5;
const SIZE = 1 << SHIFT;
const MASK = SIZE - 1;

const NOT_SET = {};
const CHANGED_VALUE = { value: false };
const DID_ALTER_VALUE = { value: false };

function setOwner(node: any): any {
  node.value = false;
  return node;
}

function markDidAlter(didAlter?: any): void {
  if (didAlter) {
    didAlter.value = true;
  }
}

function ownerID(): void {}

function arrCopy(arr: any[], offset?: number): any[] {
  offset = offset || 0;
  const length = Math.max(0, arr.length - offset);
  const result = new Array(length);
  for (let i = 0; i < length; i++) {
    result[i] = arr[i + offset];
  }
  return result;
}

function getSize(iterable: any): number {
  if (iterable.size === undefined) {
    iterable.size = iterable.__iterate(returnTrue);
  }
  return iterable.size;
}

function wrapIndex(iterable: any, index: number): number {
  if (typeof index !== 'number') {
    const uint = index >>> 0;
    if ('' + uint !== index || uint === 4294967295) {
      return NaN;
    }
    index = uint;
  }
  return index < 0 ? getSize(iterable) + index : index;
}

function returnTrue(): boolean {
  return true;
}

function rangeIncludes(begin: number, end: number, size?: number): boolean {
  return (
    (begin === 0 || (size !== undefined && begin <= -size)) &&
    (end === undefined || (size !== undefined && end >= size))
  );
}

function resolveBegin(begin: number | undefined, size: number): number {
  return resolveIndex(begin, size, 0);
}

function resolveEnd(end: number | undefined, size: number): number {
  return resolveIndex(end, size, size);
}

function resolveIndex(
  index: number | undefined,
  size: number,
  defaultValue: number
): number {
  return index === undefined
    ? defaultValue
    : index < 0
    ? Math.max(0, size + index)
    : size === undefined
    ? index
    : Math.min(size, index);
}

const ITERATE_KEYS = 0;
const ITERATE_VALUES = 1;
const ITERATE_ENTRIES = 2;

const ITERATOR_SYMBOL =
  typeof Symbol === 'function' && Symbol.iterator
    ? Symbol.iterator
    : '@@iterator';

class Iterator<T> {
  next: () => IteratorResult<T>;

  constructor(nextFn: () => IteratorResult<T>) {
    this.next = nextFn;
  }

  toString(): string {
    return '[Iterator]';
  }

  [ITERATOR_SYMBOL](): Iterator<T> {
    return this;
  }
}

Iterator.prototype.inspect = Iterator.prototype.toSource = function (): string {
  return this.toString();
};

function makeIteratorResult<T>(
  type: number,
  key: any,
  value: T,
  result?: IteratorResult<T>
): IteratorResult<T> {
  const resultValue = type === ITERATE_KEYS ? key : type === ITERATE_VALUES ? value : [key, value];
  return result ? ((result.value = resultValue), result) : { value: resultValue, done: false };
}

function iteratorDone(): IteratorResult<any> {
  return { value: undefined, done: true };
}

function isIterator(maybeIterator: any): boolean {
  return !!getIterator(maybeIterator);
}

function hasIteratorNext(maybeIterator: any): boolean {
  return maybeIterator && typeof maybeIterator.next === 'function';
}

function getIteratorValue(iterable: any): Iterator<any> | undefined {
  const iterator = getIterator(iterable);
  return iterator && iterator.call(iterable);
}

function getIterator(iterable: any): Function | undefined {
  const iteratorFn = iterable && ((typeof Symbol === 'function' && iterable[Symbol.iterator]) || iterable['@@iterator']);
  if (typeof iteratorFn === 'function') {
    return iteratorFn;
  }
}

function isArrayLike(value: any): boolean {
  return value && typeof value.length === 'number';
}

function hash(value: any): number {
  if (value === false || value == null) return 0;
  if (typeof value.valueOf === 'function') {
    value = value.valueOf();
    if (value === false || value == null) return 0;
  }
  if (value === true) return 1;

  const type = typeof value;

  if (type === 'number') {
    if (value !== value || value === Infinity) return 0;
    let hashed = value | 0;
    if (hashed !== value) {
      hashed ^= value * 4294967295;
    }
    while (value > 4294967295) {
      value /= 4294967295;
      hashed ^= value;
    }
    return smi(hashed);
  }

  if (type === 'string') {
    return value.length > STRING_HASH_CACHE_MIN_STRLEN
      ? cachedHashString(value)
      : hashString(value);
  }

  if (typeof value.hashCode === 'function') {
    return value.hashCode();
  }

  if (type === 'object') {
    return hashObject(value);
  }

  if (typeof value.toString === 'function') {
    return hashString(value.toString());
  }

  throw new Error('Value type ' + type + ' cannot be hashed.');
}

function hashString(str: string): number {
  let hashed = 0;
  for (let i = 0; i < str.length; i++) {
    hashed = (31 * hashed + str.charCodeAt(i)) | 0;
  }
  return smi(hashed);
}

function smi(i32: number): number {
  return ((i32 >>> 1) & 0x40000000) | (i32 & 0xbfffffff);
}

let weakMap: WeakMap<object, number> | undefined;
const isExtensible = Object.isExtensible;

const canDefineProperty = (function (): boolean {
  try {
    Object.defineProperty({}, '@', {});
    return true;
  } catch (e) {
    return false;
  }
})();

const supportsWeakMap = typeof WeakMap === 'function';
if (supportsWeakMap) {
  weakMap = new WeakMap();
}

let objHashUID = 0;
const UID_HASH_KEY = '__immutablehash__';
if (typeof Symbol === 'function') {
  // Symbol(UID_HASH_KEY);
}

const STRING_HASH_CACHE_MIN_STRLEN = 16;
const STRING_HASH_CACHE_MAX_SIZE = 255;
let stringHashCacheSize = 0;
const stringHashCache: Record<string, number> = {};

function cachedHashString(str: string): number {
  let cached = stringHashCache[str];
  if (cached === undefined) {
    cached = hashString(str);
    if (stringHashCacheSize === STRING_HASH_CACHE_MAX_SIZE) {
      stringHashCacheSize = 0;
      stringHashCache = {};
    }
    stringHashCacheSize++;
    stringHashCache[str] = cached;
  }
  return cached;
}

function hashObject(obj: object): number {
  let hashed: number | undefined;
  if (supportsWeakMap && weakMap) {
    hashed = weakMap.get(obj);
    if (hashed !== undefined) return hashed;
  }

  hashed = (obj as any)[UID_HASH_KEY];
  if (hashed !== undefined) return hashed;

  if (!canDefineProperty) {
    hashed = (obj as any).propertyIsEnumerable?.[UID_HASH_KEY];
    if (hashed !== undefined) return hashed;

    hashed = getIENodeHash(obj);
    if (hashed !== undefined) return hashed;
  }

  hashed = ++objHashUID;
  if (objHashUID & 0x40000000) {
    objHashUID = 0;
  }

  if (supportsWeakMap && weakMap) {
    weakMap.set(obj, hashed);
  } else {
    if (isExtensible !== undefined && isExtensible(obj) === false) {
      throw new Error('Non-extensible objects are not allowed as keys.');
    }

    if (canDefineProperty) {
      Object.defineProperty(obj, UID_HASH_KEY, {
        enumerable: false,
        configurable: false,
        writable: false,
        value: hashed,
      });
    } else if (
      (obj as any).propertyIsEnumerable !== undefined &&
      (obj as any).propertyIsEnumerable === (obj as any).constructor.prototype.propertyIsEnumerable
    ) {
      (obj as any).propertyIsEnumerable = function (this: any) {
        return this.constructor.prototype.propertyIsEnumerable.apply(this, arguments);
      };
      (obj as any).propertyIsEnumerable[UID_HASH_KEY] = hashed;
    } else if ((obj as any).nodeType !== undefined) {
      (obj as any)[UID_HASH_KEY] = hashed;
    } else {
      throw new Error('Unable to set a non-enumerable property on object.');
    }
  }

  return hashed;
}

function getIENodeHash(node: any): number | undefined {
  if (node && node.nodeType > 0) {
    switch (node.nodeType) {
      case 1:
        return node.uniqueID;
      case 9:
        return node.documentElement?.uniqueID;
    }
  }
}

function assertNotInfinite(size: number): void {
  if (size === Infinity) {
    throw new Error('Cannot perform this action with an infinite size.');
  }
}

function is(valueA: any, valueB: any): boolean {
  if (valueA === valueB || (valueA !== valueA && valueB !== valueB)) {
    return true;
  }
  if (!valueA || !valueB) {
    return false;
  }
  if (typeof valueA.valueOf === 'function' && typeof valueB.valueOf === 'function') {
    valueA = valueA.valueOf();
    valueB = valueB.valueOf();
    if (valueA === valueB || (valueA !== valueA && valueB !== valueB)) {
      return true;
    }
    if (!valueA || !valueB) {
      return false;
    }
  }
  return !!(
    typeof valueA.equals === 'function' &&
    typeof valueB.equals === 'function' &&
    valueA.equals(valueB)
  );
}

function imul(a: number, b: number): number {
  const ah = (a >>> 16) & 0xffff;
  const al = a & 0xffff;
  const bh = (b >>> 16) & 0xffff;
  const bl = b & 0xffff;
  return (al * bl + (((ah * bl + al * bh) << 16) >>> 0)) | 0;
}

const multiplyImul =
  typeof Math.imul === 'function' && Math.imul(0xffffffff, 2) === -2 ? Math.imul : imul;

export { hash, is };