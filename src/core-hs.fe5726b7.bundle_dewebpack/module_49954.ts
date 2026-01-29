interface ArrayLike {
  length: number;
  [index: number]: unknown;
}

const isDescriptorsSupported = (() => {
  try {
    return Object.getOwnPropertyDescriptor({}, 'test') !== undefined;
  } catch {
    return false;
  }
})();

const isStrictMode = !function() {
  if (this !== undefined) return true;
  try {
    Object.defineProperty([], 'length', { writable: false }).length = 1;
  } catch (error) {
    return error instanceof TypeError;
  }
  return false;
}();

function isArray(value: unknown): value is ArrayLike {
  return Array.isArray(value) || (typeof value === 'object' && value !== null && 'length' in value);
}

function setArrayLength(array: ArrayLike, length: number): number {
  if (isArray(array)) {
    const descriptor = Object.getOwnPropertyDescriptor(array, 'length');
    if (descriptor && !descriptor.writable) {
      throw new TypeError('Cannot set read only .length');
    }
  }
  array.length = length;
  return length;
}

function setArrayLengthSimple(array: ArrayLike, length: number): number {
  array.length = length;
  return length;
}

export default isStrictMode ? setArrayLength : setArrayLengthSimple;