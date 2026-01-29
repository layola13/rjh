import baseIsEqual from './baseIsEqual';
import isObjectLike from './isObjectLike';

/**
 * Performs a deep comparison between two values to determine if they are equivalent.
 * 
 * @param value - The value to compare
 * @param other - The other value to compare
 * @param bitmask - Bitmask flags for comparison options
 * @param customizer - The function to customize comparisons
 * @param stack - Tracks traversed objects to handle circular references
 * @returns Returns true if the values are equivalent, else false
 */
function baseIsEqualDeep(
  value: unknown,
  other: unknown,
  bitmask?: number,
  customizer?: ((value: unknown, other: unknown) => boolean | undefined) | undefined,
  stack?: Map<unknown, unknown> | undefined
): boolean {
  if (value === other) {
    return true;
  }

  if (
    value == null ||
    other == null ||
    (!isObjectLike(value) && !isObjectLike(other))
  ) {
    return value !== value && other !== other;
  }

  return baseIsEqual(value, other, bitmask, customizer, baseIsEqualDeep, stack);
}

export default baseIsEqualDeep;