/**
 * VColorPickerSwatches Component Type Definitions
 * A component for displaying and selecting colors from a swatch palette
 */

import Vue from 'vue';
import { PropType } from 'vue';

/**
 * RGBA color representation
 */
export interface RGBAColor {
  r: number;
  g: number;
  b: number;
  a: number;
}

/**
 * Parsed color object with multiple representations
 */
export interface ParsedColor {
  hex: string;
  hexa: string;
  rgba: RGBAColor;
  hsla: {
    h: number;
    s: number;
    l: number;
    a: number;
  };
  hsva: {
    h: number;
    s: number;
    v: number;
    a: number;
  };
  alpha: number;
}

/**
 * Material Design color palette structure
 */
export interface MaterialColorPalette {
  base?: string;
  lighten5?: string;
  lighten4?: string;
  lighten3?: string;
  lighten2?: string;
  lighten1?: string;
  darken1?: string;
  darken2?: string;
  darken3?: string;
  darken4?: string;
  black?: string;
  white?: string;
  transparent?: string;
}

/**
 * VColorPickerSwatches component props
 */
export interface VColorPickerSwatchesProps {
  /**
   * Array of color swatches to display. Each swatch is an array of color strings.
   * Defaults to Material Design color palette.
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
 * VColorPickerSwatches component events
 */
export interface VColorPickerSwatchesEvents {
  /**
   * Emitted when a color swatch is clicked
   * @param color - The parsed color object
   */
  'update:color': (color: ParsedColor) => void;
}

/**
 * VColorPickerSwatches component
 * Displays a grid of color swatches for quick color selection
 */
declare const VColorPickerSwatches: Vue.extend<
  Vue,
  {}, // data
  {
    /**
     * Generates a single color swatch element
     * @param colorHex - Hex color string
     * @returns VNode for the color swatch
     */
    genColor(colorHex: string): Vue.VNode;
    
    /**
     * Generates all swatch rows
     * @returns Array of VNodes for swatch rows
     */
    genSwatches(): Vue.VNode[];
  },
  {}, // computed
  VColorPickerSwatchesProps
>;

export default VColorPickerSwatches;