/**
 * Chrome color picker component module
 * A Chrome-style color picker with saturation, hue, and alpha controls
 */

import React from 'react';
import PropTypes from 'prop-types';

/**
 * RGB color representation
 */
export interface RGBColor {
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
export interface HSLColor {
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
export interface HSVColor {
  /** Hue (0-360) */
  h: number;
  /** Saturation (0-1) */
  s: number;
  /** Brightness/Value (0-1) */
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
  /** RGB color values */
  rgb: RGBColor;
  /** HSL color values */
  hsl: HSLColor;
  /** HSV color values */
  hsv: HSVColor;
}

/**
 * Custom renderers for color picker components
 */
export interface Renderers {
  [key: string]: React.ComponentType<any>;
}

/**
 * Style overrides for Chrome picker components
 */
export interface ChromePickerStyles {
  /** Root picker container styles */
  picker?: React.CSSProperties;
  /** Saturation area container styles */
  saturation?: React.CSSProperties;
  /** Saturation component styles */
  Saturation?: React.CSSProperties;
  /** Body container styles */
  body?: React.CSSProperties;
  /** Controls container styles */
  controls?: React.CSSProperties;
  /** Color swatch container styles */
  color?: React.CSSProperties;
  /** Swatch circle styles */
  swatch?: React.CSSProperties;
  /** Active color display styles */
  active?: React.CSSProperties;
  /** Toggles container styles */
  toggles?: React.CSSProperties;
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
 * Props for the Chrome color picker component
 */
export interface ChromePickerProps {
  /** Width of the picker (pixels or CSS string) */
  width?: number | string;
  /** Callback fired when color changes */
  onChange?: (color: ColorResult) => void;
  /** Disable alpha channel controls */
  disableAlpha?: boolean;
  /** Current RGB color values */
  rgb?: RGBColor;
  /** Current HSL color values */
  hsl?: HSLColor;
  /** Current HSV color values */
  hsv?: HSVColor;
  /** Current hexadecimal color value */
  hex?: string;
  /** Custom component renderers */
  renderers?: Renderers;
  /** Custom style overrides */
  styles?: ChromePickerStyles;
  /** Additional CSS class name */
  className?: string;
}

/**
 * Chrome-style color picker component
 * 
 * Features:
 * - Saturation/brightness selector
 * - Hue slider
 * - Alpha/opacity slider (optional)
 * - Hex and RGB input fields
 * - Color preview with checkboard background
 * 
 * @example
 *