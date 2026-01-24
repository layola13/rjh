/**
 * Color utility functions for validation, conversion, and manipulation.
 * Provides helpers for working with hex, RGB, HSL, and HSV color formats.
 */

/**
 * RGB color representation
 */
export interface RGBColor {
  /** Red channel (0-255) */
  r: number;
  /** Green channel (0-255) */
  g: number;
  /** Blue channel (0-255) */
  b: number;
  /** Alpha/opacity (0-1) */
  a: number;
}

/**
 * HSL color representation
 */
export interface HSLColor {
  /** Hue angle (0-360) */
  h: number;
  /** Saturation (0-1 or percentage string) */
  s: number | string;
  /** Lightness (0-1 or percentage string) */
  l: number | string;
  /** Alpha/opacity (0-1) */
  a: number;
}

/**
 * HSV/HSB color representation
 */
export interface HSVColor {
  /** Hue angle (0-360) */
  h: number;
  /** Saturation (0-1) */
  s: number;
  /** Value/Brightness (0-1) */
  v: number;
  /** Alpha/opacity (0-1) */
  a: number;
}

/**
 * Input color object that can contain any color format properties
 */
export interface ColorInput {
  r?: number;
  g?: number;
  b?: number;
  h?: number;
  s?: number | string;
  l?: number | string;
  v?: number;
  a?: number;
  hex?: string;
  source?: string;
}

/**
 * Complete color state with all format representations
 */
export interface ColorState {
  /** HSL representation */
  hsl: HSLColor;
  /** Hex string representation (e.g. "#ff0000" or "transparent") */
  hex: string;
  /** RGB representation */
  rgb: RGBColor;
  /** HSV representation */
  hsv: HSVColor;
  /** Previous hue value for maintaining hue when saturation is 0 */
  oldHue: number;
  /** Source identifier for tracking color origin */
  source?: string;
}

/**
 * Predefined red color constant in all formats
 */
export const red: ColorState;

/**
 * Validates that a color object contains valid numeric values.
 * Checks that all present color channel properties (r, g, b, a, h, s, l, v) 
 * contain valid numbers, with special handling for percentage strings in s and l.
 * 
 * @param color - Color object to validate
 * @returns The input color object if valid, undefined otherwise
 */
export function simpleCheckForValidColor(color: ColorInput): ColorInput | undefined;

/**
 * Converts a color input to a complete color state object with all format representations.
 * Handles hex strings, RGB, HSL, and HSV inputs. Preserves hue when saturation is 0.
 * 
 * @param color - Color input in any supported format
 * @param oldHue - Optional previous hue value to preserve when saturation is 0
 * @returns Complete color state with hsl, hex, rgb, hsv representations
 */
export function toState(color: ColorInput, oldHue?: number): ColorState;

/**
 * Validates whether a string is a valid hexadecimal color code.
 * Supports both 3-digit (#rgb) and 6-digit (#rrggbb) formats, with or without # prefix.
 * 
 * @param hex - Hex color string to validate
 * @returns True if the hex string represents a valid color
 */
export function isValidHex(hex: string): boolean;

/**
 * Determines an appropriate contrasting color (black or white) for text display.
 * Uses the relative luminance formula to determine if light or dark text 
 * would be more readable against the given background color.
 * 
 * @param color - Background color to contrast against
 * @returns "#000" for black text, "#fff" for white text, or "rgba(0, 0, 0, 0.4)" for transparent backgrounds
 */
export function getContrastingColor(color: ColorInput): string;

export default {
  simpleCheckForValidColor,
  toState,
  isValidHex,
  getContrastingColor,
  red
};