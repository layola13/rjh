/**
 * Random color generation module with customizable hue, saturation, and luminosity options.
 * Supports multiple color formats and seeded random generation for reproducibility.
 * @module RandomColor
 */

import type { TinyColor } from './TinyColor';

/**
 * Color range definition with hue and saturation/brightness bounds
 */
export interface ColorBounds {
  /** Name of the color range (e.g., "red", "blue", "monochrome") */
  name: string;
  /** Hue range as [min, max] in degrees (0-360), or null for monochrome */
  hueRange: [number, number] | null;
  /** Array of [saturation, brightness] coordinate pairs defining the lower bounds */
  lowerBounds: Array<[number, number]>;
}

/**
 * Extended color bounds with computed saturation and brightness ranges
 */
interface ColorDefinition {
  /** Name of the color range */
  name: string;
  /** Hue range as [min, max] in degrees (0-360), or null for monochrome */
  hueRange: [number, number] | null;
  /** Array of [saturation, brightness] coordinate pairs defining the lower bounds */
  lowerBounds: Array<[number, number]>;
  /** Computed saturation range [min, max] */
  saturationRange: [number, number];
  /** Computed brightness range [min, max] */
  brightnessRange: [number, number];
}

/**
 * Luminosity presets for color generation
 */
type Luminosity = 'bright' | 'light' | 'dark' | 'random';

/**
 * Hue specification - can be a color name, hex value, or specific degree
 */
type HueValue = string | number;

/**
 * Options for random color generation
 */
export interface RandomColorOptions {
  /** 
   * Desired hue - can be a color name (e.g., "red"), hex color, or degree (0-360).
   * Use "random" for any hue, "monochrome" for grayscale.
   */
  hue?: HueValue;
  
  /** 
   * Desired luminosity preset.
   * - "bright": vivid, saturated colors
   * - "light": pastel colors
   * - "dark": deep, dark colors
   * - "random": any luminosity
   */
  luminosity?: Luminosity;
  
  /** 
   * Seed for deterministic random generation.
   * Same seed produces same color sequence.
   */
  seed?: number;
  
  /** 
   * Number of colors to generate.
   * If specified, returns an array of TinyColor instances.
   */
  count?: number | null;
  
  /** 
   * Alpha transparency value (0-1).
   * 0 = fully transparent, 1 = fully opaque.
   */
  alpha?: number;
}

/**
 * HSV color representation with optional alpha
 */
interface HSVColor {
  /** Hue (0-360 degrees) */
  h: number;
  /** Saturation (0-100 percent) */
  s: number;
  /** Value/Brightness (0-100 percent) */
  v: number;
  /** Optional alpha transparency (0-1) */
  a?: number;
}

/**
 * Predefined color ranges with hue and saturation/brightness bounds.
 * Used to generate colors within specific color families.
 */
export declare const bounds: readonly ColorBounds[];

/**
 * Generate a random color with customizable parameters.
 * 
 * @param options - Configuration options for color generation
 * @returns A TinyColor instance, or an array of TinyColor instances if count is specified
 * 
 * @example
 *