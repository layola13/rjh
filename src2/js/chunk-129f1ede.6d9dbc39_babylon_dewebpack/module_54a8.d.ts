/**
 * Number.prototype.toPrecision polyfill module
 * 
 * This module patches the native toPrecision method to ensure consistent behavior
 * across environments, particularly handling edge cases with undefined precision
 * and incorrect invocations.
 */

/**
 * Export function that registers the Number.prototype.toPrecision polyfill
 * 
 * @param exportTarget - The export target object (typically module.exports)
 * @param moduleRegistry - The module registry for importing dependencies
 * @param importFunction - Function to import other modules by ID
 */
export function registerToPrecisionPolyfill(
  exportTarget: unknown,
  moduleRegistry: unknown,
  importFunction: (moduleId: string) => unknown
): void;

/**
 * Configuration flags for polyfill registration
 */
interface PolyfillFlags {
  /** Prototype method flag */
  P: number;
  /** Force override flag */
  F: number;
}

/**
 * Polyfill registration utility
 * Registers methods on built-in prototypes with optional force override
 */
interface PolyfillExporter {
  (flags: number, targetName: string, methods: Record<string, Function>): void;
  P: number;
  F: number;
}

/**
 * Checks if a function throws an error
 * 
 * @param fn - Function to test for errors
 * @returns true if the function throws, false otherwise
 */
type ErrorChecker = (fn: () => void) => boolean;

/**
 * Validates the context object for Number methods
 * 
 * @param context - The this context to validate
 * @param errorMessage - Error message to throw if validation fails
 * @returns The validated number value
 * @throws TypeError if context is not a valid number object
 */
type ContextValidator = (context: unknown, errorMessage: string) => number;

/**
 * Enhanced Number.prototype.toPrecision with polyfill fixes
 * 
 * Fixes:
 * - Ensures calling with undefined precision returns default behavior
 * - Validates that method is called on proper Number context
 * 
 * @param precision - The number of significant digits (optional)
 * @returns String representation of the number with specified precision
 * @throws TypeError if called on non-number context
 */
interface EnhancedToPrecision {
  (this: number, precision?: number): string;
}

/**
 * Native Number.prototype.toPrecision reference
 */
type NativeToPrecision = (this: number, precision?: number) => string;

declare module 'module_54a8' {
  const polyfill: typeof registerToPrecisionPolyfill;
  export default polyfill;
}