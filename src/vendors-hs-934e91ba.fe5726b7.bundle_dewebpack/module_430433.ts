import Stack from './Stack';
import equalArrays from './equalArrays';
import equalByTag from './equalByTag';
import equalObjects from './equalObjects';
import getTag from './getTag';
import isArray from './isArray';
import isBuffer from './isBuffer';
import isTypedArray from './isTypedArray';

const ARGS_TAG = "[object Arguments]";
const ARRAY_TAG = "[object Array]";
const OBJECT_TAG = "[object Object]";

const hasOwnProperty = Object.prototype.hasOwnProperty;

/**
 * Deep comparison function for base equality check
 * @param value - The value to compare
 * @param other - The other value to compare
 * @param bitmask - Bitmask flags for comparison behavior
 * @param customizer - Optional function to customize comparisons
 * @param equalFunc - The function to recursively compare values
 * @param stack - Stack to track circular references
 * @returns True if values are equal, false otherwise
 */
function baseIsEqualDeep(
  value: unknown,
  other: unknown,
  bitmask: number,
  customizer?: ((value: unknown, other: unknown) => boolean | undefined) | undefined,
  equalFunc?: (value: unknown, other: unknown, bitmask: number, customizer?: ((value: unknown, other: unknown) => boolean | undefined) | undefined, stack?: Stack) => boolean,
  stack?: Stack
): boolean {
  const valueIsArray = isArray(value);
  const otherIsArray = isArray(other);
  
  let valueTag = valueIsArray ? ARRAY_TAG : getTag(value);
  let otherTag = otherIsArray ? ARRAY_TAG : getTag(other);
  
  const valueIsObject = (valueTag === ARGS_TAG ? OBJECT_TAG : valueTag) === OBJECT_TAG;
  const otherIsObject = (otherTag === ARGS_TAG ? OBJECT_TAG : otherTag) === OBJECT_TAG;
  const isSameTag = valueTag === otherTag;

  if (isSameTag && isBuffer(value)) {
    if (!isBuffer(other)) {
      return false;
    }
    valueIsArray = true;
    valueIsObject = false;
  }

  if (isSameTag && !valueIsObject) {
    stack = stack || new Stack();
    return valueIsArray || isTypedArray(value)
      ? equalArrays(value, other, bitmask, customizer, equalFunc, stack)
      : equalByTag(value, other, valueTag, bitmask, customizer, equalFunc, stack);
  }

  const COMPARE_PARTIAL_FLAG = 1;
  if (!(bitmask & COMPARE_PARTIAL_FLAG)) {
    const valueIsWrapped = valueIsObject && hasOwnProperty.call(value, "__wrapped__");
    const otherIsWrapped = otherIsObject && hasOwnProperty.call(other, "__wrapped__");

    if (valueIsWrapped || otherIsWrapped) {
      const unwrappedValue = valueIsWrapped ? (value as { value: () => unknown }).value() : value;
      const unwrappedOther = otherIsWrapped ? (other as { value: () => unknown }).value() : other;
      
      stack = stack || new Stack();
      return equalFunc!(unwrappedValue, unwrappedOther, bitmask, customizer, stack);
    }
  }

  if (!isSameTag) {
    return false;
  }

  stack = stack || new Stack();
  return equalObjects(value, other, bitmask, customizer, equalFunc, stack);
}

export default baseIsEqualDeep;