/**
 * Memory operation interface for WebAssembly-style operations
 */
interface MemoryOperations {
  /** Memory array for 32-bit integer operations */
  a: Int32Array;
  /** Stack pointer register */
  j: number;
}

/**
 * Calculates the required memory size for a string operation
 * @param source - Source memory address
 * @returns Number of bytes required
 */
declare function rt(source: number): number;

/**
 * Allocates memory of specified size
 * @param size - Number of bytes to allocate
 * @returns Pointer to allocated memory, or 0 if allocation fails
 */
declare function q(size: number): number;

/**
 * Copies string data from source to destination
 * @param destination - Destination memory address
 * @param source - Source memory address
 * @param length - Number of bytes to copy
 * @returns Destination address
 */
declare function SA(destination: number, source: number, length: number): number;

/**
 * Module B: String duplication function
 * Duplicates a string by allocating new memory and copying contents
 * 
 * @param inputAddress - Memory address of the input string
 * @returns Memory address of the duplicated string, or 0 if allocation fails
 * 
 * @remarks
 * This function performs the following operations:
 * 1. Saves the input address to stack-allocated temporary storage
 * 2. Retrieves the actual string pointer from the input structure (offset +4 bytes)
 * 3. Calculates required memory size (string length + 1 for null terminator)
 * 4. Allocates memory for the new string
 * 5. Copies the string content if allocation succeeded
 * 6. Returns the address of the duplicated string
 * 
 * @example
 * const originalString = 0x1000;
 * const duplicatedString = module_B(originalString);
 * if (duplicatedString !== 0) {
 *   // Successfully duplicated
 * }
 */
declare function module_B(inputAddress: number): number;