/**
 * TinyColor options for initialization
 */
export interface TinyColorOptions {
  /** Color format (e.g., 'rgb', 'hex', 'hsl', 'hsv', 'name', 'prgb') */
  format?: string;
  /** Gradient type for gradient color representations */
  gradientType?: string;
}

/**
 * RGB color representation
 */
export interface RGB {
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
 * RGBA color representation (same as RGB)
 */
export interface RGBA extends RGB {}

/**
 * HSL color representation
 */
export interface HSL {
  /** Hue (0-360 degrees) */
  h: number;
  /** Saturation (0-1) */
  s: number;
  /** Lightness (0-1) */
  l: number;
  /** Alpha channel (0-1) */
  a: number;
}

/**
 * HSLA color representation (same as HSL)
 */
export interface HSLA extends HSL {}

/**
 * HSV color representation
 */
export interface HSV {
  /** Hue (0-360 degrees) */
  h: number;
  /** Saturation (0-1) */
  s: number;
  /** Value/Brightness (0-1) */
  v: number;
  /** Alpha channel (0-1) */
  a: number;
}

/**
 * HSVA color representation (same as HSV)
 */
export interface HSVA extends HSV {}

/**
 * Percentage-based RGB color representation
 */
export interface PercentageRGB {
  /** Red channel as percentage string */
  r: string;
  /** Green channel as percentage string */
  g: string;
  /** Blue channel as percentage string */
  b: string;
  /** Alpha channel (0-1) */
  a: number;
}

/**
 * Accepted color input types
 */
export type ColorInput = string | number | RGB | RGBA | HSL | HSLA | HSV | HSVA | TinyColor;

/**
 * TinyColor class for color manipulation and conversion
 */
export declare class TinyColor {
  /** Original input value */
  originalInput: ColorInput;
  /** Red channel value (0-255) */
  r: number;
  /** Green channel value (0-255) */
  g: number;
  /** Blue channel value (0-255) */
  b: number;
  /** Alpha channel value (0-1) */
  a: number;
  /** Rounded alpha value (0-1, rounded to 2 decimal places) */
  roundA: number;
  /** Detected or specified color format */
  format: string;
  /** Gradient type if applicable */
  gradientType?: string;
  /** Whether the color input was valid */
  isValid: boolean;

  /**
   * Creates a new TinyColor instance
   * @param color - Color input (string, number, RGB object, HSL object, etc.)
   * @param options - Optional configuration
   */
  constructor(color?: ColorInput, options?: TinyColorOptions);

  /**
   * Check if the color is dark (brightness < 128)
   * @returns True if the color is dark
   */
  isDark(): boolean;

  /**
   * Check if the color is light (brightness >= 128)
   * @returns True if the color is light
   */
  isLight(): boolean;

  /**
   * Get the perceived brightness of the color (0-255)
   * Uses the formula: (299*R + 587*G + 114*B) / 1000
   * @returns Brightness value
   */
  getBrightness(): number;

  /**
   * Get the relative luminance of the color (0-1)
   * Follows WCAG standards
   * @returns Luminance value
   */
  getLuminance(): number;

  /**
   * Get the alpha channel value
   * @returns Alpha value (0-1)
   */
  getAlpha(): number;

  /**
   * Set the alpha channel value
   * @param alpha - New alpha value (0-1)
   * @returns This instance for chaining
   */
  setAlpha(alpha: number): this;

  /**
   * Check if the color is monochrome (no saturation)
   * @returns True if saturation is 0
   */
  isMonochrome(): boolean;

  /**
   * Convert to HSV color object
   * @returns HSV representation
   */
  toHsv(): HSV;

  /**
   * Convert to HSV color string
   * @returns HSV string (e.g., "hsv(120, 50%, 75%)" or "hsva(120, 50%, 75%, 0.5)")
   */
  toHsvString(): string;

  /**
   * Convert to HSL color object
   * @returns HSL representation
   */
  toHsl(): HSL;

  /**
   * Convert to HSL color string
   * @returns HSL string (e.g., "hsl(120, 50%, 50%)" or "hsla(120, 50%, 50%, 0.5)")
   */
  toHslString(): string;

  /**
   * Convert to hexadecimal color string (without #)
   * @param allow3Char - Allow 3-character hex shorthand if possible
   * @returns Hex string (e.g., "ff0000" or "f00")
   */
  toHex(allow3Char?: boolean): string;

  /**
   * Convert to hexadecimal color string (with #)
   * @param allow3Char - Allow 3-character hex shorthand if possible
   * @returns Hex string (e.g., "#ff0000" or "#f00")
   */
  toHexString(allow3Char?: boolean): string;

  /**
   * Convert to 8-character hexadecimal with alpha (without #)
   * @param allow4Char - Allow 4-character hex shorthand if possible
   * @returns Hex8 string (e.g., "ff0000ff" or "f00f")
   */
  toHex8(allow4Char?: boolean): string;

  /**
   * Convert to 8-character hexadecimal with alpha (with #)
   * @param allow4Char - Allow 4-character hex shorthand if possible
   * @returns Hex8 string (e.g., "#ff0000ff" or "#f00f")
   */
  toHex8String(allow4Char?: boolean): string;

  /**
   * Convert to shortest hexadecimal representation
   * Uses hex6 if alpha is 1, otherwise hex8
   * @param allowShorthand - Allow 3/4-character shorthand if possible
   * @returns Shortest hex string
   */
  toHexShortString(allowShorthand?: boolean): string;

  /**
   * Convert to RGB color object
   * @returns RGB representation with rounded values
   */
  toRgb(): RGB;

  /**
   * Convert to RGB color string
   * @returns RGB string (e.g., "rgb(255, 0, 0)" or "rgba(255, 0, 0, 0.5)")
   */
  toRgbString(): string;

  /**
   * Convert to percentage-based RGB object
   * @returns Percentage RGB representation
   */
  toPercentageRgb(): PercentageRGB;

  /**
   * Convert to percentage-based RGB string
   * @returns Percentage RGB string (e.g., "rgb(100%, 0%, 0%)")
   */
  toPercentageRgbString(): string;

  /**
   * Get the CSS color name if available
   * @returns Color name or false if no match found
   */
  toName(): string | false;

  /**
   * Convert to string representation in specified format
   * @param format - Desired format ('rgb', 'prgb', 'hex', 'hex3', 'hex4', 'hex6', 'hex8', 'name', 'hsl', 'hsv')
   * @returns String representation in the specified format
   */
  toString(format?: string): string;

  /**
   * Convert to numeric representation (24-bit RGB number)
   * @returns Number representation (e.g., 0xff0000 for red)
   */
  toNumber(): number;

  /**
   * Create a clone of this TinyColor instance
   * @returns New TinyColor instance with the same color
   */
  clone(): TinyColor;

  /**
   * Lighten the color by increasing lightness
   * @param amount - Amount to lighten (0-100, default 10)
   * @returns New lightened TinyColor instance
   */
  lighten(amount?: number): TinyColor;

  /**
   * Brighten the color by increasing RGB values
   * @param amount - Amount to brighten (0-100, default 10)
   * @returns New brightened TinyColor instance
   */
  brighten(amount?: number): TinyColor;

  /**
   * Darken the color by decreasing lightness
   * @param amount - Amount to darken (0-100, default 10)
   * @returns New darkened TinyColor instance
   */
  darken(amount?: number): TinyColor;

  /**
   * Tint the color by mixing with white
   * @param amount - Amount to tint (0-100, default 10)
   * @returns New tinted TinyColor instance
   */
  tint(amount?: number): TinyColor;

  /**
   * Shade the color by mixing with black
   * @param amount - Amount to shade (0-100, default 10)
   * @returns New shaded TinyColor instance
   */
  shade(amount?: number): TinyColor;

  /**
   * Desaturate the color by decreasing saturation
   * @param amount - Amount to desaturate (0-100, default 10)
   * @returns New desaturated TinyColor instance
   */
  desaturate(amount?: number): TinyColor;

  /**
   * Saturate the color by increasing saturation
   * @param amount - Amount to saturate (0-100, default 10)
   * @returns New saturated TinyColor instance
   */
  saturate(amount?: number): TinyColor;

  /**
   * Convert to greyscale (fully desaturated)
   * @returns New greyscale TinyColor instance
   */
  greyscale(): TinyColor;

  /**
   * Spin the hue by specified degrees
   * @param degrees - Degrees to rotate hue (-360 to 360)
   * @returns New TinyColor instance with rotated hue
   */
  spin(degrees: number): TinyColor;

  /**
   * Mix this color with another color
   * @param color - Color to mix with
   * @param amount - Mix amount (0-100, default 50)
   * @returns New mixed TinyColor instance
   */
  mix(color: ColorInput, amount?: number): TinyColor;

  /**
   * Generate analogous color scheme
   * @param results - Number of colors to generate (default 6)
   * @param slices - Degrees between each color (default 30)
   * @returns Array of analogous TinyColor instances
   */
  analogous(results?: number, slices?: number): TinyColor[];

  /**
   * Get the complementary color (180° hue rotation)
   * @returns Complementary TinyColor instance
   */
  complement(): TinyColor;

  /**
   * Generate monochromatic color scheme
   * @param results - Number of colors to generate (default 6)
   * @returns Array of monochromatic TinyColor instances
   */
  monochromatic(results?: number): TinyColor[];

  /**
   * Generate split-complementary color scheme
   * @returns Array of 3 TinyColor instances (original, +72°, +216°)
   */
  splitcomplement(): TinyColor[];

  /**
   * Blend this color on top of a background color
   * @param background - Background color
   * @returns New TinyColor instance representing the blended result
   */
  onBackground(background: ColorInput): TinyColor;

  /**
   * Generate triadic color scheme (3 evenly spaced colors)
   * @returns Array of 3 TinyColor instances
   */
  triad(): TinyColor[];

  /**
   * Generate tetradic color scheme (4 evenly spaced colors)
   * @returns Array of 4 TinyColor instances
   */
  tetrad(): TinyColor[];

  /**
   * Generate polyadic color scheme (n evenly spaced colors)
   * @param n - Number of colors in the scheme
   * @returns Array of n TinyColor instances
   */
  polyad(n: number): TinyColor[];

  /**
   * Check if this color equals another color
   * @param color - Color to compare with
   * @returns True if RGB string representations are equal
   */
  equals(color: ColorInput): boolean;
}

/**
 * Factory function to create a TinyColor instance
 * @param color - Color input (string, number, RGB object, HSL object, etc.)
 * @param options - Optional configuration
 * @returns New TinyColor instance
 */
export declare function tinycolor(color?: ColorInput, options?: TinyColorOptions): TinyColor;