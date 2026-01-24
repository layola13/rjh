/**
 * Checks if two values are strictly equal or both are NaN.
 * 
 * This function performs a strict equality check (===) first,
 * and if that fails, it checks if both values are NaN by using
 * the property that NaN is the only value in JavaScript that is
 * not equal to itself.
 * 
 * @param value - The first value to compare
 * @param other - The second value to compare
 * @returns True if values are strictly equal or both are NaN, false otherwise
 * 
 * @example
 *