/**
 * Utility functions for color value conversion and validation
 */

/**
 * Checks if a value is "1.0" or "1." (floating point one as string)
 * @param value - The value to check
 * @returns True if the value is a string representation of 1.0
 */
export declare function isOnePointZero(value: unknown): boolean;

/**
 * Checks if a value is a percentage string (contains '%')
 * @param value - The value to check
 * @returns True if the value is a percentage string
 */
export declare function isPercentage(value: unknown): boolean;

/**
 * Converts a value to a normalized number between 0 and 1
 * Handles percentage strings and floating point strings
 * @param value - The value to normalize (number or string with optional '%')
 * @param max - The maximum value for normalization (e.g., 255 for RGB, 360 for hue)
 * @returns Normalized value between 0 and 1
 */
export declare function bound01(value: string | number, max: number): number;

/**
 * Ensures an alpha value is within valid range [0, 1]
 * @param alpha - The alpha value to validate
 * @returns Clamped alpha value between 0 and 1, defaults to 1 if invalid
 */
export declare function boundAlpha(alpha: string | number): number;

/**
 * Clamps a value between 0 and 1
 * @param value - The value to clamp
 * @returns Value constrained to [0, 1]
 */
export declare function clamp01(value: number): number;

/**
 * Converts a decimal value to percentage string
 * If value <= 1, multiplies by 100 and appends '%'
 * Otherwise returns the value as-is
 * @param value - The value to convert
 * @returns Percentage string or original value
 */
export declare function convertToPercentage(value: string | number): string;

/**
 * Pads a string to 2 characters with leading zero if needed
 * @param value - The string to pad
 * @returns Two-character string with leading zero if original length was 1
 */
export declare function pad2(value: string): string;