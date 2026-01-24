/**
 * Polyfill module for the global parseFloat function.
 * Ensures a consistent parseFloat implementation across environments by
 * replacing the native implementation if it differs from the polyfilled version.
 * 
 * @module ParseFloatPolyfill
 */

/**
 * Core polyfill registration function.
 * Registers polyfills globally or to specific namespaces.
 * 
 * @param config - Configuration object for the polyfill
 * @param config.global - Whether to register the polyfill globally
 * @param config.forced - Whether to force override the existing implementation
 * @param implementations - Map of function names to their polyfilled implementations
 */
declare function registerPolyfill(
  config: {
    global: boolean;
    forced: boolean;
  },
  implementations: Record<string, (...args: unknown[]) => unknown>
): void;

/**
 * Polyfilled parseFloat implementation.
 * Converts a string to a floating-point number.
 * 
 * @param value - The string value to parse
 * @returns The parsed floating-point number, or NaN if parsing fails
 */
declare function polyfillParseFloat(value: string): number;

/**
 * Module exports - registers the parseFloat polyfill globally if the
 * native implementation differs from the polyfilled version.
 */
declare module 'parse-float-polyfill' {
  export default registerPolyfill;
}