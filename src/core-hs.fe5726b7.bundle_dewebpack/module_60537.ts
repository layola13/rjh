import { exportToGlobal } from './utils/export';
import { toObject } from './utils/to-object';
import { lengthOfArrayLike } from './utils/length-of-array-like';
import { setArrayLength } from './utils/set-array-length';
import { validateArrayLength } from './utils/validate-array-length';

interface ArrayLike {
  length: number;
  [index: number]: unknown;
}

const ARRAY_MAX_LENGTH = 4294967296;
const ARRAY_OVERFLOW_VALUE = 4294967297;

/**
 * Checks if native Array.push has overflow bug
 */
function hasNativePushBug(): boolean {
  const testArray: unknown[] = [];
  const result = testArray.push.call({ length: ARRAY_MAX_LENGTH }, 1);
  return result !== ARRAY_OVERFLOW_VALUE;
}

/**
 * Checks if Array.length is properly non-writable
 */
function canDefineNonWritableLength(): boolean {
  try {
    Object.defineProperty([], 'length', { writable: false }).push();
    return false;
  } catch (error) {
    return error instanceof TypeError;
  }
}

/**
 * Polyfill for Array.prototype.push
 * Fixes edge cases with length boundaries and non-writable length
 */
function pushPolyfill<T>(this: ArrayLike, ...items: T[]): number {
  const target = toObject(this);
  let currentLength = lengthOfArrayLike(target);
  const itemCount = items.length;

  validateArrayLength(currentLength + itemCount);

  for (let i = 0; i < itemCount; i++) {
    target[currentLength] = items[i];
    currentLength++;
  }

  setArrayLength(target, currentLength);
  return currentLength;
}

exportToGlobal({
  target: 'Array',
  proto: true,
  arity: 1,
  forced: hasNativePushBug() || !canDefineNonWritableLength()
}, {
  push: pushPolyfill
});