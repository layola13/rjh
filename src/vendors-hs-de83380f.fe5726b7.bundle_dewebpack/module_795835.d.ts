/**
 * Color palette generation module
 * Provides preset colors and dynamic palette generation with light/dark theme support
 */

import type { TinyColor } from '@ctrl/tinycolor';

/**
 * HSV color representation
 */
interface HSV {
  /** Hue: 0-360 */
  h: number;
  /** Saturation: 0-1 */
  s: number;
  /** Value/Brightness: 0-1 */
  v: number;
}

/**
 * Dark palette generation configuration
 */
interface DarkColorMap {
  /** Index in the light palette to reference */
  index: number;
  /** Opacity for mixing with background */
  opacity: number;
}

/**
 * Options for palette generation
 */
interface GenerateOptions {
  /** Theme mode: 'dark' or 'light' (default) */
  theme?: 'dark' | 'light';
  /** Background color for dark theme mixing (default: '#141414') */
  backgroundColor?: string;
}

/**
 * Color palette array with primary color
 */
interface ColorPalette extends Array<string> {
  /** The primary color (index 5) */
  primary?: string;
}

/**
 * Preset primary colors collection
 */
interface PresetPrimaryColors {
  red: string;
  volcano: string;
  orange: string;
  gold: string;
  yellow: string;
  lime: string;
  green: string;
  cyan: string;
  blue: string;
  geekblue: string;
  purple: string;
  magenta: string;
  grey: string;
}

/**
 * Preset color palettes (light or dark)
 */
type PresetPalettes = {
  [K in keyof PresetPrimaryColors]: ColorPalette;
};

/**
 * Generates a 10-color palette from a base color
 * @param color - Base color in any valid CSS format
 * @param options - Generation options for theme and background
 * @returns Array of 10 colors (5 lighter + base + 4 darker)
 */
export declare function generate(color: string, options?: GenerateOptions): string[];

/**
 * Preset primary colors for Ant Design color system
 */
export declare const presetPrimaryColors: PresetPrimaryColors;

/**
 * Light theme color palettes
 */
export declare const presetPalettes: PresetPalettes;

/**
 * Dark theme color palettes
 */
export declare const presetDarkPalettes: PresetPalettes;

/**
 * Individual color palette exports (light theme)
 */
export declare const red: ColorPalette;
export declare const volcano: ColorPalette;
export declare const orange: ColorPalette;
export declare const gold: ColorPalette;
export declare const yellow: ColorPalette;
export declare const lime: ColorPalette;
export declare const green: ColorPalette;
export declare const cyan: ColorPalette;
export declare const blue: ColorPalette;
export declare const geekblue: ColorPalette;
export declare const purple: ColorPalette;
export declare const magenta: ColorPalette;
export declare const grey: ColorPalette;