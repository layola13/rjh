/**
 * Two-tone color configuration module for icon components.
 * Provides utilities to get and set primary and secondary colors for two-tone icons.
 * @module TwoToneColorUtils
 */

/**
 * Color configuration object containing primary and secondary colors.
 */
export interface TwoToneColors {
  /** Primary color value (hex or named color) */
  primaryColor: string;
  /** Secondary color value (hex or named color) */
  secondaryColor: string;
  /** Flag indicating if colors have been calculated/normalized */
  calculated?: boolean;
}

/**
 * Input type for setting two-tone colors.
 * Can be a single color string or a tuple of [primary, secondary] colors.
 */
export type TwoToneColorInput = string | [string, string];

/**
 * Retrieves the current two-tone color configuration.
 * 
 * @returns {string | [string, string]} If colors are not calculated, returns only the primary color.
 *                                       Otherwise returns a tuple of [primaryColor, secondaryColor].
 * 
 * @example
 *