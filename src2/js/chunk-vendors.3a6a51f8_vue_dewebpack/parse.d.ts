/**
 * Theme utility functions for parsing, generating styles, and color manipulation
 * @module theme/utils
 */

/**
 * Color theme configuration object
 */
export interface ThemeColor {
  /** Base color value */
  base: string;
  /** Lightened variations of the base color */
  lighten1?: string;
  lighten2?: string;
  lighten3?: string;
  lighten4?: string;
  lighten5?: string;
  /** Darkened variations of the base color */
  darken1?: string;
  darken2?: string;
  darken3?: string;
  darken4?: string;
}

/**
 * Theme configuration with multiple color definitions
 */
export interface Theme {
  /** Anchor link color */
  anchor?: string;
  /** Primary theme color */
  primary?: ThemeColor | string;
  /** Secondary theme color */
  secondary?: ThemeColor | string;
  /** Accent theme color */
  accent?: ThemeColor | string;
  /** Error state color */
  error?: ThemeColor | string;
  /** Info state color */
  info?: ThemeColor | string;
  /** Success state color */
  success?: ThemeColor | string;
  /** Warning state color */
  warning?: ThemeColor | string;
  /** Additional custom colors */
  [key: string]: ThemeColor | string | undefined;
}

/**
 * Parsed theme with all colors as ThemeColor objects
 */
export interface ParsedTheme {
  /** Anchor link color in hex format */
  anchor: string;
  /** Theme colors with generated variations */
  [key: string]: ThemeColor | string;
}

/**
 * Parse theme configuration and generate color variations
 * @param theme - Raw theme configuration object
 * @param nested - Whether this is a nested parse operation
 * @param generateVariations - Whether to generate lighten/darken variations
 * @returns Parsed theme with all color variations
 */
export function parse(
  theme: Theme,
  nested?: boolean,
  generateVariations?: boolean
): ParsedTheme;

/**
 * Generate CSS styles from parsed theme
 * @param theme - Parsed theme configuration
 * @param useCssVariables - Whether to use CSS custom properties (variables)
 * @returns CSS string containing theme styles
 */
export function genStyles(theme: ParsedTheme, useCssVariables?: boolean): string;

/**
 * Generate color variations (lighten1-5, darken1-4) for a base color
 * @param _unused - Unused parameter (reserved for future use)
 * @param colorInt - Base color as integer representation
 * @returns Object containing base color and all variations in hex format
 */
export function genVariations(_unused: number, colorInt: number): ThemeColor;

/**
 * Lighten a color by a specified amount using CIELAB color space
 * @param colorInt - Color as integer representation
 * @param amount - Amount to lighten (1-5, each step adds 10 to L* value)
 * @returns Lightened color as integer
 */
export function lighten(colorInt: number, amount: number): number;

/**
 * Darken a color by a specified amount using CIELAB color space
 * @param colorInt - Color as integer representation
 * @param amount - Amount to darken (1-4, each step subtracts 10 from L* value)
 * @returns Darkened color as integer
 */
export function darken(colorInt: number, amount: number): number;