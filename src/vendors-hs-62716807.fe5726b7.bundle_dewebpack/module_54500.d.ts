/**
 * Bit manipulation utilities for 32-bit signed integers.
 * Provides efficient bitwise operations and mathematical functions.
 * @module bit-twiddle
 */

/**
 * Number of bits in a standard integer
 */
export const INT_BITS: 32;

/**
 * Maximum value for a 32-bit signed integer (2^31 - 1)
 */
export const INT_MAX: 2147483647;

/**
 * Minimum value for a 32-bit signed integer (-2^31)
 */
export const INT_MIN: -2147483648;

/**
 * Computes the sign of an integer.
 * @param value - The integer to check
 * @returns 1 if positive, -1 if negative, 0 if zero
 */
export function sign(value: number): -1 | 0 | 1;

/**
 * Computes the absolute value of an integer using bitwise operations.
 * @param value - The integer value
 * @returns The absolute value
 */
export function abs(value: number): number;

/**
 * Returns the minimum of two integers using bitwise operations.
 * @param a - First integer
 * @param b - Second integer
 * @returns The smaller value
 */
export function min(a: number, b: number): number;

/**
 * Returns the maximum of two integers using bitwise operations.
 * @param a - First integer
 * @param b - Second integer
 * @returns The larger value
 */
export function max(a: number, b: number): number;

/**
 * Checks if an integer is a power of 2.
 * @param value - The integer to check
 * @returns true if value is a power of 2, false otherwise
 */
export function isPow2(value: number): boolean;

/**
 * Computes floor(log2(value)) for positive integers.
 * @param value - A positive integer
 * @returns The base-2 logarithm (floor)
 */
export function log2(value: number): number;

/**
 * Computes floor(log10(value)) for positive integers.
 * @param value - A positive integer
 * @returns The base-10 logarithm (floor)
 */
export function log10(value: number): number;

/**
 * Counts the number of set bits (1s) in an integer (population count / Hamming weight).
 * @param value - The integer value
 * @returns The number of set bits
 */
export function popCount(value: number): number;

/**
 * Counts the number of trailing zero bits.
 * @param value - The integer value
 * @returns The number of trailing zeros
 */
export function countTrailingZeros(value: number): number;

/**
 * Rounds up to the next power of 2.
 * @param value - The integer value
 * @returns The next power of 2 greater than or equal to value
 */
export function nextPow2(value: number): number;

/**
 * Rounds down to the previous power of 2.
 * @param value - The integer value
 * @returns The largest power of 2 less than or equal to value
 */
export function prevPow2(value: number): number;

/**
 * Computes the parity of an integer (XOR of all bits).
 * @param value - The integer value
 * @returns 1 if odd number of set bits, 0 if even
 */
export function parity(value: number): 0 | 1;

/**
 * Reverses the bits in a 32-bit integer.
 * @param value - The integer value
 * @returns The bit-reversed value
 */
export function reverse(value: number): number;

/**
 * Interleaves the bits of two 16-bit integers (Z-order curve / Morton code).
 * Used for spatial indexing in 2D space.
 * @param x - First 16-bit integer
 * @param y - Second 16-bit integer
 * @returns 32-bit integer with interleaved bits
 */
export function interleave2(x: number, y: number): number;

/**
 * Extracts one component from a 2D interleaved bit pattern.
 * @param interleavedValue - The interleaved 32-bit value
 * @param component - Component index (0 for x, 1 for y)
 * @returns The extracted 16-bit component
 */
export function deinterleave2(interleavedValue: number, component: 0 | 1): number;

/**
 * Interleaves the bits of three 10-bit integers (Z-order curve for 3D space).
 * Used for spatial indexing in 3D space.
 * @param x - First 10-bit integer
 * @param y - Second 10-bit integer
 * @param z - Third 10-bit integer
 * @returns 32-bit integer with interleaved bits
 */
export function interleave3(x: number, y: number, z: number): number;

/**
 * Extracts one component from a 3D interleaved bit pattern.
 * @param interleavedValue - The interleaved 32-bit value
 * @param component - Component index (0 for x, 1 for y, 2 for z)
 * @returns The extracted 10-bit component
 */
export function deinterleave3(interleavedValue: number, component: 0 | 1 | 2): number;

/**
 * Generates the next combination in lexicographic order (Gosper's hack).
 * Used for iterating through all n-bit combinations with k set bits.
 * @param value - Current combination
 * @returns Next combination with the same number of set bits
 */
export function nextCombination(value: number): number;