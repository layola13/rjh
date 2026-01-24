/**
 * ParseInt Polyfill Module
 * 
 * Ensures consistent parseInt behavior across different JavaScript environments
 * by replacing the native implementation if it differs from the polyfill version.
 * 
 * @module ParseIntPolyfill
 */

/**
 * Standard parseInt function signature that parses a string and returns an integer.
 * 
 * @param value - The value to parse. If not a string, it will be converted to one.
 * @param radix - An integer between 2 and 36 that represents the radix (base) of the string.
 *                If undefined or 0, the radix is assumed to be 10 (or 16 if the string begins with "0x").
 * @returns The parsed integer number, or NaN if the first character cannot be converted to a number.
 */
export declare function parseInt(value: string | number, radix?: number): number;

/**
 * Configuration options for polyfill installation
 */
export interface PolyfillConfig {
  /**
   * Whether to install the polyfill globally on the window/global object
   */
  global: boolean;
  
  /**
   * Whether to force the polyfill even if a native implementation exists
   */
  forced: boolean;
}

/**
 * Installs the parseInt polyfill with the specified configuration
 * 
 * @param config - Configuration options for the polyfill installation
 * @param implementations - Object containing the polyfill implementations
 */
export declare function installPolyfill(
  config: PolyfillConfig,
  implementations: {
    parseInt: typeof parseInt;
  }
): void;