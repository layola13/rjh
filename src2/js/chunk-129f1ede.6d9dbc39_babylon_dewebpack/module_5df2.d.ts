/**
 * Number.parseFloat polyfill module
 * 
 * This module ensures that the native Number.parseFloat method is available.
 * If the native implementation differs from the global parseFloat, it applies
 * a polyfill to maintain consistency across environments.
 * 
 * @module NumberParseFloatPolyfill
 */

/**
 * Export interface for the core module system
 * Provides the static method registration functionality
 */
interface ExportModule {
  /**
   * Static method flag - indicates this is a static method (S)
   */
  S: number;
  
  /**
   * Forced flag - indicates forced override even if native exists (F)
   */
  F: number;
}

/**
 * Registers a polyfill for Number.parseFloat
 * 
 * @param exportFlags - Flags object containing S (Static) and F (Forced) properties
 * @param targetObject - The target object name to extend (e.g., "Number")
 * @param methods - Object containing the method implementations to add
 * 
 * @example
 * // Registers parseFloat as a static method on Number
 * export(export.S + export.F, "Number", { parseFloat: globalParseFloat });
 */
declare function exportPolyfill(
  exportFlags: number,
  targetObject: string,
  methods: { parseFloat: typeof parseFloat }
): void;

/**
 * Native or polyfilled parseFloat implementation
 * Converts a string to a floating-point number
 * 
 * @param value - The string value to parse
 * @returns The parsed floating-point number, or NaN if parsing fails
 */
declare const globalParseFloat: (value: string) => number;

/**
 * Extended Number interface with parseFloat static method
 */
declare global {
  interface NumberConstructor {
    /**
     * Converts a string to a floating-point number
     * 
     * @param value - The string value to parse
     * @returns The parsed floating-point number, or NaN if parsing fails
     * 
     * @example
     * Number.parseFloat("3.14"); // 3.14
     * Number.parseFloat("  42  "); // 42
     * Number.parseFloat("invalid"); // NaN
     */
    parseFloat(value: string): number;
  }
}

export {};