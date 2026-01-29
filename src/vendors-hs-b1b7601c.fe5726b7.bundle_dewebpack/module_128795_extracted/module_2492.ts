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
 * A specialized version of `baseIsEqual` for arrays and objects which performs
 * deep comparisons and tracks traversed objects enabling objects with circular
 * references to be compared.
 *
 * @param value - The value to compare.
 * @param other - The other value to compare.
 * @param bitmask - The bitmask flags. 1 - Unordered comparison, 2 - Partial comparison.
 * @param customizer - The function to customize comparisons.
 * @param equalFunc - The function to determine equivalents of values.
 * @param stack - Tracks traversed `value` and `other` objects.
 * @returns Returns `true` if the values are equivalent, else `false`.
 */
export function baseIsEqualDeep(
  value: any,
  other: any,
  bitmask: number,
  customizer: ((value: any, other: any, index?: number | string, parent?: any, otherParent?: any, stack?: Stack) => boolean | undefined) | undefined,
  equalFunc: (value: any, other: any, bitmask: number, customizer?: any, stack?: Stack) => boolean,
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
    stack = stack || new Stack();
    return valueIsArray || isTypedArray(value)
      ? equalArrays(value, other, bitmask, customizer, equalFunc, stack)
      : equalByTag(value, other, valueTag, bitmask, customizer, equalFunc, stack);
  }

  if (!(bitmask & COMPARE_PARTIAL_FLAG)) {
    const valueIsWrapped = valueIsObject && hasOwnProperty.call(value, '__wrapped__');
    const otherIsWrapped = otherIsObject && hasOwnProperty.call(other, '__wrapped__');

    if (valueIsWrapped || otherIsWrapped) {
      const valueUnwrapped = valueIsWrapped ? value.value() : value;
      const otherUnwrapped = otherIsWrapped ? other.value() : other;
      stack = stack || new Stack();
      return equalFunc(valueUnwrapped, otherUnwrapped, bitmask, customizer, stack);
    }
  }

  if (!isSameTag) {
    return false;
  }

  stack = stack || new Stack();
  return equalObjects(value, other, bitmask, customizer, equalFunc, stack);
}