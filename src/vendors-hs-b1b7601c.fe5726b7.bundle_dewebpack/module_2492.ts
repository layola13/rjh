import { Stack } from './Stack';
import { equalArrays } from './equalArrays';
import { equalByTag } from './equalByTag';
import { equalObjects } from './equalObjects';
import { getTag } from './getTag';
import { isArray } from './isArray';
import { isBuffer } from './isBuffer';
import { isTypedArray } from './isTypedArray';

const ARGUMENTS_TAG = '[object Arguments]';
const ARRAY_TAG = '[object Array]';
const OBJECT_TAG = '[object Object]';

const hasOwnProperty = Object.prototype.hasOwnProperty;

const COMPARE_PARTIAL_FLAG = 1;

/**
 * Deep equality comparison function for complex objects
 * 
 * @param value - The first value to compare
 * @param other - The second value to compare
 * @param bitmask - Bitmask flags controlling comparison behavior
 * @param customizer - Optional function to customize comparisons
 * @param equalFunc - The function to use for recursive equality checks
 * @param stack - Stack to track circular references
 * @returns True if values are equal, false otherwise
 */
export function baseIsEqualDeep(
  value: unknown,
  other: unknown,
  bitmask: number,
  customizer: ((value: unknown, other: unknown) => boolean | undefined) | undefined,
  equalFunc: (value: unknown, other: unknown, bitmask: number, customizer: ((value: unknown, other: unknown) => boolean | undefined) | undefined, stack: Stack) => boolean,
  stack?: Stack
): boolean {
  const valueIsArray = isArray(value);
  const otherIsArray = isArray(other);
  
  let valueTag = valueIsArray ? ARRAY_TAG : getTag(value);
  let otherTag = otherIsArray ? ARRAY_TAG : getTag(other);
  
  valueTag = valueTag === ARGUMENTS_TAG ? OBJECT_TAG : valueTag;
  otherTag = otherTag === ARGUMENTS_TAG ? OBJECT_TAG : otherTag;
  
  const valueIsObject = valueTag === OBJECT_TAG;
  const otherIsObject = otherTag === OBJECT_TAG;
  const isSameTag = valueTag === otherTag;

  if (isSameTag && isBuffer(value)) {
    if (!isBuffer(other)) {
      return false;
    }
    valueIsArray = true;
    valueIsObject = false;
  }

  if (isSameTag && !valueIsObject) {
    stack = stack ?? new Stack();
    return valueIsArray || isTypedArray(value)
      ? equalArrays(value, other, bitmask, customizer, equalFunc, stack)
      : equalByTag(value, other, valueTag, bitmask, customizer, equalFunc, stack);
  }

  if (!(bitmask & COMPARE_PARTIAL_FLAG)) {
    const valueIsWrapped = valueIsObject && hasOwnProperty.call(value, '__wrapped__');
    const otherIsWrapped = otherIsObject && hasOwnProperty.call(other, '__wrapped__');

    if (valueIsWrapped || otherIsWrapped) {
      const valueUnwrapped = valueIsWrapped ? (value as { value(): unknown }).value() : value;
      const otherUnwrapped = otherIsWrapped ? (other as { value(): unknown }).value() : other;
      
      stack = stack ?? new Stack();
      return equalFunc(valueUnwrapped, otherUnwrapped, bitmask, customizer, stack);
    }
  }

  if (!isSameTag) {
    return false;
  }

  stack = stack ?? new Stack();
  return equalObjects(value, other, bitmask, customizer, equalFunc, stack);
}