/**
 * Performs a bitwise right shift operation (sign-propagating).
 * Shifts the bits of the first operand to the right by the number of positions
 * specified by the second operand. The sign bit is used to fill the vacated bits.
 * 
 * @param value - The number to be shifted
 * @param positions - The number of bit positions to shift (0-31 are meaningful for 32-bit integers)
 * @returns The result of the right shift operation
 * 
 * @example
 *