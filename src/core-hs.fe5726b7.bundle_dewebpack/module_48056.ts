function arrayAt<T>(this: T[], index: number): T | undefined {
  const object = toObject(this);
  const length = lengthOfArrayLike(object);
  const relativeIndex = toIntegerOrInfinity(index);
  const actualIndex = relativeIndex >= 0 ? relativeIndex : length + relativeIndex;
  
  return actualIndex < 0 || actualIndex >= length ? undefined : object[actualIndex];
}

function toObject<T>(value: unknown): T {
  if (value === null || value === undefined) {
    throw new TypeError('Cannot convert undefined or null to object');
  }
  return Object(value) as T;
}

function lengthOfArrayLike(obj: ArrayLike<unknown>): number {
  const len = obj.length;
  return typeof len === 'number' && len >= 0 && len <= Number.MAX_SAFE_INTEGER
    ? Math.floor(len)
    : 0;
}

function toIntegerOrInfinity(value: unknown): number {
  const number = Number(value);
  if (Number.isNaN(number) || number === 0) {
    return 0;
  }
  if (!Number.isFinite(number)) {
    return number;
  }
  return Math.trunc(number);
}

function addToUnscopables(key: string): void {
  const unscopables = Array.prototype[Symbol.unscopables];
  if (unscopables && typeof unscopables === 'object') {
    (unscopables as Record<string, boolean>)[key] = true;
  }
}

export function installArrayAt(): void {
  if (!Array.prototype.at) {
    Object.defineProperty(Array.prototype, 'at', {
      value: arrayAt,
      writable: true,
      enumerable: false,
      configurable: true
    });
    
    addToUnscopables('at');
  }
}

export { arrayAt };