import { Stack } from './Stack';
import { equalArrays } from './equalArrays';
import { equalByTag } from './equalByTag';
import { equalObjects } from './equalObjects';
import { getTag } from './getTag';
import { isArray } from './isArray';
import { isBuffer } from './isBuffer';
import { isTypedArray } from './isTypedArray';

const ARGUMENTS_TAG = "[object Arguments]";
const ARRAY_TAG = "[object Array]";
const OBJECT_TAG = "[object Object]";

const hasOwnProperty = Object.prototype.hasOwnProperty;

type Comparator = (value: unknown, other: unknown, bitmask: number, customizer?: Customizer, stack?: Stack) => boolean;
type Customizer = (value: unknown, other: unknown, index?: number | string, parent?: unknown, otherParent?: unknown, stack?: Stack) => boolean | undefined;

/**
 * A specialized version of `baseIsEqual` for comparing objects of
 * the same `toStringTag`.
 *
 * @param value - The value to compare.
 * @param other - The other value to compare.
 * @param bitmask - The bitmask flags (1: unordered comparison, 2: partial comparison).
 * @param customizer - The function to customize comparisons.
 * @param equalFunc - The function to determine equivalents of values.
 * @param stack - Tracks traversed `value` and `other` objects.
 * @returns Returns `true` if the objects are equivalent, else `false`.
 */
export function baseIsEqualDeep(
  value: unknown,
  other: unknown,
  bitmask: number,
  customizer: Customizer | undefined,
  equalFunc: Comparator,
  stack?: Stack
): boolean {
  const valueIsArray = isArray(value);
  const otherIsArray = isArray(other);
  let valueTag = valueIsArray ? ARRAY_TAG : getTag(value);
  let otherTag = otherIsArray ? ARRAY_TAG : getTag(other);
  const valueIsObject = (valueTag === ARGUMENTS_TAG ? OBJECT_TAG : valueTag) === OBJECT_TAG;
  const otherIsObject = (otherTag === ARGUMENTS_TAG ? OBJECT_TAG : otherTag) === OBJECT_TAG;
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

  if (!(bitmask & 1)) {
    const valueIsWrapped = valueIsObject && hasOwnProperty.call(value, "__wrapped__");
    const otherIsWrapped = otherIsObject && hasOwnProperty.call(other, "__wrapped__");

    if (valueIsWrapped || otherIsWrapped) {
      const valueUnwrapped = valueIsWrapped ? (value as { value: () => unknown }).value() : value;
      const otherUnwrapped = otherIsWrapped ? (other as { value: () => unknown }).value() : other;
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