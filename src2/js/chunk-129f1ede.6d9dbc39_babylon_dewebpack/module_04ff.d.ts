/**
 * Polyfill module for Number.parseInt
 * 
 * This module ensures Number.parseInt is properly defined by using a fallback implementation
 * when the native Number.parseInt differs from the global parseInt function.
 * 
 * @module NumberParseIntPolyfill
 */

/**
 * Type definition for the export function that handles static method exports
 * 
 * @param target - The target object to attach the export to (e.g., Number)
 * @param options - Export options flags
 * @param options.S - Static method flag
 * @param options.F - Force override flag when condition is true
 * @param key - The key name on the target object
 * @param methods - Object containing the methods to export
 */
declare function exportStaticMethod(
  target: any,
  options: { S: number; F: boolean },
  key: string,
  methods: Record<string, Function>
): void;

/**
 * Reference to the global parseInt function used as a polyfill
 * when Number.parseInt is not available or differs from the global implementation
 */
declare const parseIntPolyfill: (value: string, radix?: number) => number;

declare global {
  interface NumberConstructor {
    /**
     * Converts a string to an integer.
     * @param value - A string to convert into a number.
     * @param radix - A value between 2 and 36 that specifies the base of the number in value.
     * If this argument is not supplied, strings with a prefix of '0x' are considered hexadecimal.
     * All other strings are considered decimal.
     */
    parseInt(value: string, radix?: number): number;
  }
}

export {};