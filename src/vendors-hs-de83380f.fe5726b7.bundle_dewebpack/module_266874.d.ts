/**
 * Color conversion utilities module
 * Provides functions for converting between different color formats (RGB, HSL, HSV, Hex)
 */

/**
 * RGB color representation with values in range [0, 255]
 */
export interface RgbColor {
  /** Red channel (0-255) */
  r: number;
  /** Green channel (0-255) */
  g: number;
  /** Blue channel (0-255) */
  b: number;
}

/**
 * HSL color representation
 */
export interface HslColor {
  /** Hue (0-1, representing 0-360 degrees) */
  h: number;
  /** Saturation (0-1) */
  s: number;
  /** Lightness (0-1) */
  l: number;
}

/**
 * HSV color representation
 */
export interface HsvColor {
  /** Hue (0-1, representing 0-360 degrees) */
  h: number;
  /** Saturation (0-1) */
  s: number;
  /** Value/Brightness (0-1) */
  v: number;
}

/**
 * Converts a decimal alpha value (0-1) to a hexadecimal string (00-FF)
 * @param alpha - Alpha value in range [0, 1]
 * @returns Two-digit hexadecimal string representing the alpha channel
 */
export function convertDecimalToHex(alpha: number): string;

/**
 * Converts a hexadecimal string to a decimal value (0-1)
 * @param hex - Hexadecimal string (e.g., "FF", "80")
 * @returns Decimal value in range [0, 1]
 */
export function convertHexToDecimal(hex: string): number;

/**
 * Converts HSL color values to RGB
 * @param h - Hue (0-360 degrees)
 * @param s - Saturation (0-100%)
 * @param l - Lightness (0-100%)
 * @returns RGB color object with values in range [0, 255]
 */
export function hslToRgb(h: number, s: number, l: number): RgbColor;

/**
 * Converts HSV color values to RGB
 * @param h - Hue (0-360 degrees)
 * @param s - Saturation (0-100%)
 * @param v - Value/Brightness (0-100%)
 * @returns RGB color object with values in range [0, 255]
 */
export function hsvToRgb(h: number, s: number, v: number): RgbColor;

/**
 * Converts a 24-bit integer color value to RGB components
 * @param color - Integer color value (e.g., 0xFF5733)
 * @returns RGB color object with extracted channel values
 */
export function numberInputToObject(color: number): RgbColor;

/**
 * Parses a hexadecimal string to an integer
 * @param hex - Hexadecimal string
 * @returns Parsed integer value
 */
export function parseIntFromHex(hex: string): number;

/**
 * Converts RGB color values to a hexadecimal string
 * @param r - Red channel (0-255)
 * @param g - Green channel (0-255)
 * @param b - Blue channel (0-255)
 * @param allowShorthand - If true, returns 3-digit hex when possible (e.g., "F00" instead of "FF0000")
 * @returns Hexadecimal color string without '#' prefix
 */
export function rgbToHex(r: number, g: number, b: number, allowShorthand?: boolean): string;

/**
 * Converts RGB color values to HSL
 * @param r - Red channel (0-255)
 * @param g - Green channel (0-255)
 * @param b - Blue channel (0-255)
 * @returns HSL color object with normalized values [0, 1]
 */
export function rgbToHsl(r: number, g: number, b: number): HslColor;

/**
 * Converts RGB color values to HSV
 * @param r - Red channel (0-255)
 * @param g - Green channel (0-255)
 * @param b - Blue channel (0-255)
 * @returns HSV color object with normalized values [0, 1]
 */
export function rgbToHsv(r: number, g: number, b: number): HsvColor;

/**
 * Normalizes RGB color values to the range [0, 255]
 * @param r - Red channel (0-255)
 * @param g - Green channel (0-255)
 * @param b - Blue channel (0-255)
 * @returns Normalized RGB color object
 */
export function rgbToRgb(r: number, g: number, b: number): RgbColor;

/**
 * Converts RGBA color values to ARGB hexadecimal format
 * @param r - Red channel (0-255)
 * @param g - Green channel (0-255)
 * @param b - Blue channel (0-255)
 * @param a - Alpha channel (0-1)
 * @returns 8-digit ARGB hexadecimal string (alpha first)
 */
export function rgbaToArgbHex(r: number, g: number, b: number, a: number): string;

/**
 * Converts RGBA color values to a hexadecimal string
 * @param r - Red channel (0-255)
 * @param g - Green channel (0-255)
 * @param b - Blue channel (0-255)
 * @param a - Alpha channel (0-1)
 * @param allowShorthand - If true, returns 4-digit hex when possible (e.g., "F00F" instead of "FF0000FF")
 * @returns Hexadecimal color string with alpha channel (RGBA format)
 */
export function rgbaToHex(r: number, g: number, b: number, a: number, allowShorthand?: boolean): string;