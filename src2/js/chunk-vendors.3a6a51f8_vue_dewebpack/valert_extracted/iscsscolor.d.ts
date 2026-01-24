/**
 * Color utility types and functions for CSS color manipulation and conversion
 * @module colorUtils
 */

/**
 * RGBA color representation
 */
export interface RGBA {
  /** Red channel (0-255) */
  r: number;
  /** Green channel (0-255) */
  g: number;
  /** Blue channel (0-255) */
  b: number;
  /** Alpha channel (0-1) */
  a: number;
}

/**
 * HSVA color representation (Hue, Saturation, Value, Alpha)
 */
export interface HSVA {
  /** Hue angle in degrees (0-360) */
  h: number;
  /** Saturation (0-1) */
  s: number;
  /** Value/Brightness (0-1) */
  v: number;
  /** Alpha channel (0-1) */
  a: number;
}

/**
 * HSLA color representation (Hue, Saturation, Lightness, Alpha)
 */
export interface HSLA {
  /** Hue angle in degrees (0-360) */
  h: number;
  /** Saturation (0-1) */
  s: number;
  /** Lightness (0-1) */
  l: number;
  /** Alpha channel (0-1) */
  a: number;
}

/**
 * RGB color representation (without alpha)
 */
export interface RGB {
  /** Red channel (0-255) */
  r: number;
  /** Green channel (0-255) */
  g: number;
  /** Blue channel (0-255) */
  b: number;
}

/**
 * Theme color mapping structure
 */
export interface ThemeColors {
  [className: string]: {
    [variant: string]: string;
    base?: string;
  };
}

/**
 * Check if a string is a valid CSS color
 * @param color - String to check
 * @returns True if the string matches CSS color patterns (hex, rgb, hsl, or CSS variables)
 */
export function isCssColor(color: string): boolean;

/**
 * Convert a color value to an integer representation
 * @param color - Color as number (already integer) or hex string
 * @returns Integer representation of the RGB color (0x000000 - 0xFFFFFF)
 * @throws {TypeError} If color is neither a number nor a string
 */
export function colorToInt(color: string | number): number;

/**
 * Convert a CSS class name to its hex color value using theme mappings
 * @param className - Space-separated class name (e.g., "primary darken-1")
 * @param themes - Theme color mappings
 * @param defaults - Default color mappings
 * @returns Hex color string or empty string if not found
 */
export function classToHex(
  className: string,
  themes: ThemeColors,
  defaults: Record<string, string>
): string;

/**
 * Convert an integer color value to hex string
 * @param color - Integer color value (0-16777215)
 * @returns Hex color string with # prefix (e.g., "#FF5733")
 */
export function intToHex(color: number): string;

/**
 * Convert any color format to hex string
 * @param color - Color as string or number
 * @returns Hex color string with # prefix
 */
export function colorToHex(color: string | number): string;

/**
 * Convert HSVA color to RGBA
 * @param hsva - HSVA color object
 * @returns RGBA color object
 */
export function HSVAtoRGBA(hsva: HSVA): RGBA;

/**
 * Convert RGBA color to HSVA
 * @param rgba - RGBA color object (optional, defaults to red with full opacity)
 * @returns HSVA color object
 */
export function RGBAtoHSVA(rgba?: RGBA): HSVA;

/**
 * Convert HSVA color to HSLA
 * @param hsva - HSVA color object
 * @returns HSLA color object
 */
export function HSVAtoHSLA(hsva: HSVA): HSLA;

/**
 * Convert HSLA color to HSVA
 * @param hsla - HSLA color object
 * @returns HSVA color object
 */
export function HSLAtoHSVA(hsla: HSLA): HSVA;

/**
 * Convert RGBA color to CSS rgba() string
 * @param rgba - RGBA color object
 * @returns CSS rgba string (e.g., "rgba(255, 87, 51, 0.8)")
 */
export function RGBAtoCSS(rgba: RGBA): string;

/**
 * Convert RGB color to CSS rgb() string (with alpha = 1)
 * @param rgb - RGB color object
 * @returns CSS rgba string with full opacity
 */
export function RGBtoCSS(rgb: RGB): string;

/**
 * Convert RGBA color to 8-character hex string
 * @param rgba - RGBA color object
 * @returns Hex color string with alpha (e.g., "#FF5733CC")
 */
export function RGBAtoHex(rgba: RGBA): string;

/**
 * Parse 8-character hex string to RGBA
 * @param hex - Hex color string with alpha channel
 * @returns RGBA color object
 */
export function HexToRGBA(hex: string): RGBA;

/**
 * Parse hex string to HSVA
 * @param hex - Hex color string
 * @returns HSVA color object
 */
export function HexToHSVA(hex: string): HSVA;

/**
 * Convert HSVA color to hex string
 * @param hsva - HSVA color object
 * @returns 8-character hex color string with alpha
 */
export function HSVAtoHex(hsva: HSVA): string;

/**
 * Normalize and parse hex color string
 * Handles 3, 4, 6, or 8 character hex codes (with or without #)
 * @param hex - Hex color string to parse
 * @returns Normalized 9-character hex string with # prefix and alpha
 */
export function parseHex(hex: string): string;

/**
 * Parse CSS gradient string and replace class names with hex colors
 * @param gradient - CSS gradient string
 * @param themes - Theme color mappings
 * @param defaults - Default color mappings
 * @returns Gradient string with class names replaced by hex colors
 */
export function parseGradient(
  gradient: string,
  themes: ThemeColors,
  defaults: Record<string, string>
): string;

/**
 * Convert RGB color to integer representation
 * @param rgb - RGB color object
 * @returns Integer representation (R << 16 | G << 8 | B)
 */
export function RGBtoInt(rgb: RGB): number;

/**
 * Calculate WCAG contrast ratio between two colors
 * @param color1 - First RGBA color
 * @param color2 - Second RGBA color
 * @returns Contrast ratio (1-21, where 21 is maximum contrast)
 */
export function contrastRatio(color1: RGBA, color2: RGBA): number;