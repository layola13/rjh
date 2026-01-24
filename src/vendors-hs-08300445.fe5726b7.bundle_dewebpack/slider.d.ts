/**
 * Slider color picker component module
 * Provides a horizontal slider interface for HSL color selection
 */

import React from 'react';
import { HSLColor } from './types';

/**
 * HSL color representation
 */
export interface HSL {
  /** Hue value (0-360) */
  h: number;
  /** Saturation value (0-100) */
  s: number;
  /** Lightness value (0-100) */
  l: number;
  /** Optional alpha/opacity value (0-1) */
  a?: number;
}

/**
 * Color change event handler
 */
export interface ColorChangeHandler {
  (color: ColorResult): void;
}

/**
 * Color result object returned on change events
 */
export interface ColorResult {
  /** HSL color representation */
  hsl: HSL;
  /** Hex color string */
  hex?: string;
  /** RGB color representation */
  rgb?: {
    r: number;
    g: number;
    b: number;
    a?: number;
  };
}

/**
 * Custom styles for Slider component parts
 */
export interface SliderStyles {
  /** Styles for the root wrapper element */
  wrap?: React.CSSProperties;
  /** Styles for the hue slider container */
  hue?: React.CSSProperties;
  /** Styles for the Hue component */
  Hue?: React.CSSProperties;
  /** Styles for the swatches container */
  swatches?: React.CSSProperties;
}

/**
 * Props for custom pointer component
 */
export interface PointerProps {
  /** Direction of the pointer */
  direction?: 'horizontal' | 'vertical';
}

/**
 * Custom pointer component type
 */
export type PointerComponent = React.ComponentType<PointerProps>;

/**
 * Props for the Slider color picker component
 */
export interface SliderProps {
  /** Current HSL color value */
  hsl: HSL;
  
  /** Callback fired when color changes */
  onChange: ColorChangeHandler;
  
  /** Custom pointer component for the slider */
  pointer?: PointerComponent;
  
  /** Custom styles object for component parts */
  styles?: SliderStyles;
  
  /** Additional CSS class name */
  className?: string;
}

/**
 * Slider color picker component
 * 
 * A minimalist color picker with a horizontal hue slider and color swatches.
 * Allows users to select colors by dragging along the hue spectrum.
 * 
 * @example
 *