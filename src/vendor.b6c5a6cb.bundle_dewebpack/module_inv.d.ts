/**
 * Extracts bit information from a number based on its bit pattern.
 * 
 * This function performs bitwise operations to extract specific bits:
 * - If bit 3 (value 8) is set, returns the lower 4 bits (bits 0-3)
 * - Otherwise, returns the result of bitwise AND between 7 and the negation of the input
 * 
 * @param value - The input number to process
 * @returns The extracted bit value (0-15)
 * 
 * @example
 *