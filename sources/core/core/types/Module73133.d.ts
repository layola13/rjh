/**
 * Set method detection utility
 * @description Checks if specific Set methods are available and working correctly
 * @example
 * const hasUnion = detectSetMethod('union');
 * const hasIntersection = detectSetMethod('intersection');
 */

/**
 * Detects if a specific Set method is available
 * @param methodName - The name of the Set method to detect
 * @returns True if the method is available and working, false otherwise
 */
declare function detectSetMethod(methodName: string): boolean;

export { detectSetMethod };