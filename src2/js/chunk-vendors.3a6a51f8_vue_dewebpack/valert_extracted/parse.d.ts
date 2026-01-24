/**
 * Theme utility functions for parsing theme configurations and generating CSS styles.
 * @module theme/utils
 */

/**
 * Theme color configuration object with optional color variations.
 */
export interface ThemeColor {
  /** Base color value (hex or named color) */
  base?: string;
  /** Anchor/link color */
  anchor?: string;
  /** Lightened variations (lighten1-5) */
  [key: `lighten${1 | 2 | 3 | 4 | 5}`]: string;
  /** Darkened variations (darken1-4) */
  [key: `darken${1 | 2 | 3 | 4}`]: string;
}

/**
 * Theme configuration object containing color definitions.
 */
export interface ThemeConfig {
  /** Anchor/link color override */
  anchor?: string;
  /** Primary color palette */
  primary?: string | ThemeColor;
  /** Secondary color palette */
  secondary?: string | ThemeColor;
  /** Accent color palette */
  accent?: string | ThemeColor;
  /** Error state color palette */
  error?: string | ThemeColor;
  /** Warning state color palette */
  warning?: string | ThemeColor;
  /** Info state color palette */
  info?: string | ThemeColor;
  /** Success state color palette */
  success?: string | ThemeColor;
  /** Additional custom color palettes */
  [colorName: string]: string | ThemeColor | undefined;
}

/**
 * Parsed theme output with all color variations generated.
 */
export interface ParsedTheme {
  /** Anchor/link color */
  anchor: string;
  /** Color palettes with base and variations */
  [colorName: string]: string | ThemeColor;
}

/**
 * Color variations object containing base and lightened/darkened variants.
 */
export interface ColorVariations {
  /** Base color in hex format */
  base: string;
  /** Lightened variation level 1 */
  lighten1: string;
  /** Lightened variation level 2 */
  lighten2: string;
  /** Lightened variation level 3 */
  lighten3: string;
  /** Lightened variation level 4 */
  lighten4: string;
  /** Lightened variation level 5 */
  lighten5: string;
  /** Darkened variation level 1 */
  darken1: string;
  /** Darkened variation level 2 */
  darken2: string;
  /** Darkened variation level 3 */
  darken3: string;
  /** Darkened variation level 4 */
  darken4: string;
}

/**
 * Parses a theme configuration object and generates color variations.
 * 
 * @param theme - The theme configuration object to parse
 * @param nested - Whether this is a nested parse call (default: false)
 * @param generateVariations - Whether to generate lighten/darken variations (default: true)
 * @returns Parsed theme object with all color variations
 * 
 * @example
 *