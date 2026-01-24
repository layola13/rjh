/**
 * Color manipulation and conversion utilities
 * Provides functions for color format conversions, validation, and contrast calculations
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
 * Theme color classes mapping structure
 */
export interface ThemeColors {
  [className: string]: {
    base?: string;
    [variant: string]: string | undefined;
  };
}

/**
 * Checks if a string is a valid CSS color format
 * Supports hex (#), CSS variables (var(--)), rgb/rgba, and hsl/hsla
 * @param color - String to validate
 * @returns True if the string matches a valid CSS color pattern
 */
export function isCssColor(color: string): boolean;

/**
 * Converts a color string or number to an integer representation
 * @param color - Hex string (with or without #) or numeric color value
 * @returns Integer color value (0-16777215)
 * @throws TypeError if color is not a string or number
 */
export function colorToInt(color: string | number): number;

/**
 * Resolves a CSS class name to its corresponding hex color value
 * @param className - Space-separated class name (e.g., "primary darken-1")
 * @param colors - Theme colors mapping
 * @param currentTheme - Current theme colors
 * @returns Hex color string or empty string if not found
 */
export function classToHex(
  className: string,
  colors: ThemeColors,
  currentTheme: Record<string, string>
): string;

/**
 * Converts an integer color value to hex string format
 * @param color - Integer color value (0-16777215)
 * @returns Hex color string with # prefix (e.g., "#FF5733")
 */
export function intToHex(color: number): string;

/**
 * Converts any color format to hex string
 * @param color - String or numeric color value
 * @returns Hex color string with # prefix
 */
export function colorToHex(color: string | number): string;

/**
 * Converts HSVA color to RGBA format
 * @param hsva - HSVA color object
 * @returns RGBA color object with values 0-255 for RGB and 0-1 for alpha
 */
export function HSVAtoRGBA(hsva: HSVA): RGBA;

/**
 * Converts RGBA color to HSVA format
 * @param rgba - RGBA color object (or undefined for default white)
 * @returns HSVA color object with hue 0-360, saturation/value/alpha 0-1
 */
export function RGBAtoHSVA(rgba?: RGBA): HSVA;

/**
 * Converts HSVA color to HSLA format
 * @param hsva - HSVA color object
 * @returns HSLA color object
 */
export function HSVAtoHSLA(hsva: HSVA): HSLA;

/**
 * Converts HSLA color to HSVA format
 * @param hsla - HSLA color object
 * @returns HSVA color object
 */
export function HSLAtoHSVA(hsla: HSLA): HSVA;

/**
 * Converts RGBA color to CSS rgba() string
 * @param rgba - RGBA color object
 * @returns CSS rgba string (e.g., "rgba(255, 87, 51, 0.8)")
 */
export function RGBAtoCSS(rgba: RGBA): string;

/**
 * Converts RGB color to CSS rgb() string (alpha set to 1)
 * @param rgb - RGB color object (alpha ignored)
 * @returns CSS rgb string (e.g., "rgba(255, 87, 51, 1)")
 */
export function RGBtoCSS(rgb: Omit<RGBA, 'a'>): string;

/**
 * Converts RGBA color to 8-character hex string including alpha
 * @param rgba - RGBA color object
 * @returns Hex color string with alpha (e.g., "#FF5733CC")
 */
export function RGBAtoHex(rgba: RGBA): string;

/**
 * Parses an 8-character hex color string to RGBA object
 * @param hex - Hex color string with alpha channel (e.g., "#FF5733CC")
 * @returns RGBA color object
 */
export function HexToRGBA(hex: string): RGBA;

/**
 * Parses a hex color string and converts to HSVA format
 * @param hex - Hex color string
 * @returns HSVA color object
 */
export function HexToHSVA(hex: string): HSVA;

/**
 * Converts HSVA color to hex string format
 * @param hsva - HSVA color object
 * @returns 8-character hex color string with alpha
 */
export function HSVAtoHex(hsva: HSVA): string;

/**
 * Normalizes and validates a hex color string
 * Handles 3, 4, 6, and 8 character hex codes, expanding and padding as needed
 * @param hex - Hex color string (with or without #)
 * @returns Normalized 9-character hex string with # prefix
 */
export function parseHex(hex: string): string;

/**
 * Parses CSS gradient strings, replacing class names with hex colors
 * @param gradient - CSS gradient string containing class names
 * @param colors - Theme colors mapping
 * @param currentTheme - Current theme colors
 * @returns Gradient string with resolved hex colors
 */
export function parseGradient(
  gradient: string,
  colors: ThemeColors,
  currentTheme: Record<string, string>
): string;

/**
 * Converts RGB color to a single integer value
 * Uses bit-shifting: (R << 16) | (G << 8) | B
 * @param rgb - RGB color object
 * @returns Integer representation of the color
 */
export function RGBtoInt(rgb: Omit<RGBA, 'a'>): number;

/**
 * Calculates the contrast ratio between two colors (WCAG standard)
 * @param color1 - First RGBA color
 * @param color2 - Second RGBA color
 * @returns Contrast ratio (1-21), where higher values indicate better contrast
 */
export function contrastRatio(color1: RGBA, color2: RGBA): number;