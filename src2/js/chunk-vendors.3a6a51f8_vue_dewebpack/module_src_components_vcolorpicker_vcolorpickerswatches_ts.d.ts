/**
 * VColorPickerSwatches Component Type Definitions
 * A color picker component that displays color swatches in a grid layout
 */

import Vue from 'vue';
import { RGBAColor } from '../../util/colorUtils';

/**
 * Parsed color object containing RGBA values
 */
export interface ParsedColor {
  /** RGBA color representation */
  rgba: RGBAColor;
  /** Hexadecimal color representation */
  hex?: string;
  /** HSV color representation */
  hsv?: {
    h: number;
    s: number;
    v: number;
  };
  /** Alpha channel value (0-1) */
  alpha: number;
}

/**
 * Material Design color palette structure
 */
export interface ColorPalette {
  /** Base color */
  base?: string;
  /** Darkened variations */
  darken1?: string;
  darken2?: string;
  darken3?: string;
  darken4?: string;
  /** Lightened variations */
  lighten1?: string;
  lighten2?: string;
  lighten3?: string;
  lighten4?: string;
  lighten5?: string;
  /** Standard colors */
  black?: string;
  white?: string;
  transparent?: string;
}

/**
 * VColorPickerSwatches Component Props
 */
export interface VColorPickerSwatchesProps {
  /**
   * Array of color swatches to display
   * Each swatch can be an array of hex color strings
   * @default Material Design color palette
   */
  swatches?: string[][];
  
  /**
   * Currently selected color object
   */
  color?: ParsedColor;
  
  /**
   * Maximum width of the swatches container
   */
  maxWidth?: number | string;
  
  /**
   * Maximum height of the swatches container
   */
  maxHeight?: number | string;
  
  /**
   * Applies the dark theme variant
   */
  dark?: boolean;
  
  /**
   * Applies the light theme variant
   */
  light?: boolean;
}

/**
 * VColorPickerSwatches Component Events
 */
export interface VColorPickerSwatchesEvents {
  /**
   * Emitted when a color swatch is clicked
   * @param color - The selected color object
   */
  'update:color': (color: ParsedColor) => void;
}

/**
 * VColorPickerSwatches Component Methods
 */
export interface VColorPickerSwatchesMethods {
  /**
   * Generate a single color swatch element
   * @param hexColor - Hex color string (e.g., "#FF0000" or "transparent")
   * @returns VNode representing the color swatch
   */
  genColor(hexColor: string): Vue.VNode;
  
  /**
   * Generate all color swatch groups
   * @returns Array of VNodes representing swatch groups
   */
  genSwatches(): Vue.VNode[];
}

/**
 * VColorPickerSwatches Component
 * 
 * Displays a grid of color swatches for quick color selection.
 * Supports Material Design color palette by default.
 * 
 * @example
 *