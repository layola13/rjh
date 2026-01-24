/**
 * Color model representation with all formats
 */
interface ColorModel {
  /** Alpha channel value (0-1) */
  alpha: number;
  /** Hex color string without alpha (#RRGGBB) */
  hex: string;
  /** Hex color string with alpha (#RRGGBBAA) */
  hexa: string;
  /** HSLA color object */
  hsla: HSLA;
  /** HSVA color object */
  hsva: HSVA;
  /** Hue value (0-360) */
  hue: number;
  /** RGBA color object */
  rgba: RGBA;
}

/**
 * RGBA color representation
 */
interface RGBA {
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
interface HSLA {
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
interface HSVA {
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
type ColorInput = string | Partial<RGBA> | Partial<HSLA> | Partial<HSVA>;

/**
 * Converts HSVA color to all color formats
 * @param hsva - HSVA color object
 * @returns Complete color model with all format representations
 */
export declare function fromHSVA(hsva: HSVA): ColorModel;

/**
 * Converts HSLA color to all color formats
 * @param hsla - HSLA color object
 * @returns Complete color model with all format representations
 */
export declare function fromHSLA(hsla: HSLA): ColorModel;

/**
 * Converts RGBA color to all color formats
 * @param rgba - RGBA color object
 * @returns Complete color model with all format representations
 */
export declare function fromRGBA(rgba: RGBA): ColorModel;

/**
 * Converts hex color string (with alpha) to all color formats
 * @param hexa - Hex color string with alpha (#RRGGBBAA)
 * @returns Complete color model with all format representations
 */
export declare function fromHexa(hexa: string): ColorModel;

/**
 * Converts hex color string to all color formats
 * @param hex - Hex color string (#RGB, #RRGGBB, #RRGGBBAA)
 * @returns Complete color model with all format representations
 */
export declare function fromHex(hex: string): ColorModel;

/**
 * Parses various color input formats into a color model
 * @param color - Color input (string, RGBA, HSLA, or HSVA)
 * @param currentColor - Optional current color for optimization
 * @returns Complete color model with all format representations
 */
export declare function parseColor(
  color: ColorInput,
  currentColor?: ColorModel
): ColorModel;

/**
 * Extracts specific color format from color model based on format template
 * @param colorModel - Complete color model
 * @param format - Desired format template (string, RGBA, HSLA, HSVA, or null)
 * @returns Color in the specified format
 */
export declare function extractColor(
  colorModel: ColorModel,
  format: ColorInput | null
): string | RGBA | HSLA | HSVA | ColorModel;

/**
 * Checks if a color input contains alpha channel information
 * @param color - Color input to check
 * @returns True if color contains alpha channel
 */
export declare function hasAlpha(color: ColorInput): boolean;