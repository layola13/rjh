/**
 * Validates that the actual argument count meets the minimum required count.
 * 
 * @throws {TypeError} When the actual count is less than the required count
 * @param actualCount - The actual number of arguments provided
 * @param requiredCount - The minimum number of arguments required
 * @returns The actual count if validation passes
 * 
 * @example
 * ```typescript
 * function myFunction(a: string, b: number) {
 *   validateArgumentCount(arguments.length, 2);
 *   // Function implementation
 * }
 * 
 * myFunction('test', 42);    // OK, passes validation
 * myFunction('test');        // Throws TypeError: Not enough arguments
 * ```
 */
declare function validateArgumentCount(actualCount: number, requiredCount: number): number;

export default validateArgumentCount;