import baseIsEqualDeep from './baseIsEqualDeep';
import isObjectLike from './isObjectLike';

/**
 * The base implementation of `isEqual` which supports partial comparisons
 * and tracks traversed objects.
 *
 * @param value - The value to compare.
 * @param other - The other value to compare.
 * @param bitmask - The bitmask flags (for partial/unordered comparisons).
 * @param customizer - The function to customize comparisons.
 * @param stack - Tracks traversed `value` and `other` objects.
 * @returns Returns `true` if the values are equivalent, else `false`.
 */
function baseIsEqual(
  value: unknown,
  other: unknown,
  bitmask?: number,
  customizer?: (value: unknown, other: unknown) => boolean | undefined,
  stack?: Map<unknown, unknown> | WeakMap<object, unknown>
): boolean {
  if (value === other) {
    return true;
  }

  if (value == null || other == null || (!isObjectLike(value) && !isObjectLike(other))) {
    // NaN comparison: NaN !== NaN but should be considered equal
    return value !== value && other !== other;
  }

  return baseIsEqualDeep(value, other, bitmask, customizer, baseIsEqual, stack);
}

export default baseIsEqual;