/**
 * Sketch Color Picker Component
 * A complete color picker component with saturation, hue, alpha controls and preset colors
 */

import React from 'react';

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
 * HSL color representation
 */
export interface HSL {
  /** Hue (0-360) */
  h: number;
  /** Saturation (0-1) */
  s: number;
  /** Lightness (0-1) */
  l: number;
  /** Alpha channel (0-1) */
  a?: number;
}

/**
 * HSV color representation
 */
export interface HSV {
  /** Hue (0-360) */
  h: number;
  /** Saturation (0-1) */
  s: number;
  /** Value/Brightness (0-1) */
  v: number;
  /** Alpha channel (0-1) */
  a?: number;
}

/**
 * Color change event data
 */
export interface ColorResult {
  /** Hexadecimal color string */
  hex: string;
  /** RGB color object */
  rgb: RGB;
  /** HSL color object */
  hsl: HSL;
  /** HSV color object */
  hsv: HSV;
}

/**
 * Custom style overrides for Sketch picker components
 */
export interface SketchStyles {
  /** Root picker container styles */
  picker?: React.CSSProperties;
  /** Saturation area container styles */
  saturation?: React.CSSProperties;
  /** Saturation component styles */
  Saturation?: React.CSSProperties;
  /** Controls container styles */
  controls?: React.CSSProperties;
  /** Sliders container styles */
  sliders?: React.CSSProperties;
  /** Color preview box styles */
  color?: React.CSSProperties;
  /** Active color display styles */
  activeColor?: React.CSSProperties;
  /** Hue slider container styles */
  hue?: React.CSSProperties;
  /** Hue component styles */
  Hue?: React.CSSProperties;
  /** Alpha slider container styles */
  alpha?: React.CSSProperties;
  /** Alpha component styles */
  Alpha?: React.CSSProperties;
}

/**
 * Custom renderers for color picker components
 */
export interface CustomRenderers {
  [key: string]: React.ComponentType<any>;
}

/**
 * Props for the Sketch color picker component
 */
export interface SketchProps {
  /**
   * Current RGB color value
   */
  rgb: RGB;

  /**
   * Current hexadecimal color value
   */
  hex: string;

  /**
   * Current HSV color value
   */
  hsv: HSV;

  /**
   * Current HSL color value
   */
  hsl: HSL;

  /**
   * Callback fired when color changes
   * @param color - The new color value in multiple formats
   */
  onChange: (color: ColorResult) => void;

  /**
   * Callback fired when hovering over preset color swatches
   * @param color - The hovered color value
   */
  onSwatchHover?: (color: ColorResult) => void;

  /**
   * Width of the picker in pixels or CSS string
   * @default 200
   */
  width?: number | string;

  /**
   * Hide the alpha (transparency) slider
   * @default false
   */
  disableAlpha?: boolean;

  /**
   * Array of preset color hex strings to display
   * @default ['#D0021B', '#F5A623', '#F8E71C', '#8B572A', '#7ED321', '#417505', '#BD10E0', '#9013FE', '#4A90E2', '#50E3C2', '#B8E986', '#000000', '#4A4A4A', '#9B9B9B', '#FFFFFF']
   */
  presetColors?: string[];

  /**
   * Custom component renderers
   */
  renderers?: CustomRenderers;

  /**
   * Custom style overrides for picker components
   * @default {}
   */
  styles?: SketchStyles;

  /**
   * Additional CSS class name
   * @default ''
   */
  className?: string;
}

/**
 * Sketch Color Picker Component
 * 
 * A feature-rich color picker inspired by Sketch app's color picker.
 * Includes saturation/brightness area, hue slider, alpha slider,
 * RGB/Hex input fields, and customizable preset color swatches.
 * 
 * @example
 *