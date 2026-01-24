/**
 * Color model representation with all formats
 */
export interface Color {
  /** Alpha channel value (0-1) */
  alpha: number;
  /** Hex color without alpha (#RRGGBB) */
  hex: string;
  /** Hex color with alpha (#RRGGBBAA) */
  hexa: string;
  /** HSLA color representation */
  hsla: HSLA;
  /** HSVA color representation */
  hsva: HSVA;
  /** Hue value (0-360) */
  hue: number;
  /** RGBA color representation */
  rgba: RGBA;
}

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
 * HSLA color representation
 */
export interface HSLA {
  /** Hue (0-360) */
  h: number;
  /** Saturation (0-1) */
  s: number;
  /** Lightness (0-1) */
  l: number;
  /** Alpha channel (0-1) */
  a: number;
}

/**
 * HSVA color representation
 */
export interface HSVA {
  /** Hue (0-360) */
  h: number;
  /** Saturation (0-1) */
  s: number;
  /** Value/Brightness (0-1) */
  v: number;
  /** Alpha channel (0-1) */
  a: number;
}

/**
 * Partial color input types
 */
export type ColorInput = string | Partial<RGBA> | Partial<HSLA> | Partial<HSVA>;

/**
 * Color output types (can be Color object or specific format)
 */
export type ColorOutput = Color | RGBA | HSLA | HSVA | string;

/**
 * Convert HSVA color to all color formats
 * @param hsva - HSVA color object
 * @returns Color object with all format representations
 */
export declare function fromHSVA(hsva: HSVA): Color;

/**
 * Convert HSLA color to all color formats
 * @param hsla - HSLA color object
 * @returns Color object with all format representations
 */
export declare function fromHSLA(hsla: HSLA): Color;

/**
 * Convert RGBA color to all color formats
 * @param rgba - RGBA color object
 * @returns Color object with all format representations
 */
export declare function fromRGBA(rgba: RGBA): Color;

/**
 * Convert hexadecimal color string (with alpha) to all color formats
 * @param hexa - Hex color string with alpha (#RRGGBBAA or #RRGGBB)
 * @returns Color object with all format representations
 */
export declare function fromHexa(hexa: string): Color;

/**
 * Convert hexadecimal color string to all color formats
 * Parses various hex formats and converts to full Color object
 * @param hex - Hex color string (#RGB, #RRGGBB, #RRGGBBAA, etc.)
 * @returns Color object with all format representations
 */
export declare function fromHex(hex: string): Color;

/**
 * Parse any color input and convert to Color object
 * Handles strings (hex, named colors), RGBA, HSLA, and HSVA objects
 * @param colorInput - Color in any supported format
 * @param currentColor - Optional current color for comparison/optimization
 * @returns Parsed Color object, defaults to red (#FF0000) if invalid
 */
export declare function parseColor(
  colorInput: ColorInput | null | undefined,
  currentColor?: Color
): Color;

/**
 * Extract specific color format from Color object
 * Converts Color object to requested format based on template
 * @param color - Full Color object
 * @param template - Desired output format (string for hex, object for RGBA/HSLA/HSVA)
 * @returns Color in requested format, or full Color object if no template
 */
export declare function extractColor(
  color: Color,
  template?: ColorInput | null
): ColorOutput;

/**
 * Check if color input includes alpha channel information
 * @param colorInput - Color in any format
 * @returns True if color has alpha information, false otherwise
 */
export declare function hasAlpha(colorInput: ColorInput | null | undefined): boolean;