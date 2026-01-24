/**
 * Alpha component for color picker - controls opacity/transparency
 * @module Alpha
 */

import * as React from 'react';

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
  /** Alpha/opacity (0-1) */
  a?: number;
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
  /** Alpha/opacity (0-1) */
  a?: number;
}

/**
 * Color change event data
 */
export interface ColorResult {
  /** RGB color values */
  rgb?: RGB;
  /** HSL color values */
  hsl?: HSL;
  /** Hex color string */
  hex?: string;
  /** Alpha/opacity value (0-1) */
  a?: number;
}

/**
 * Custom renderer components for the alpha slider
 */
export interface AlphaRenderers {
  /** Custom canvas renderer */
  canvas?: React.ComponentType<any>;
}

/**
 * Direction of the alpha gradient slider
 */
export type AlphaDirection = 'horizontal' | 'vertical';

/**
 * Custom pointer component props
 */
export interface AlphaPointerProps {
  /** Current RGB color */
  rgb: RGB;
  /** Current HSL color */
  hsl: HSL;
  /** Slider direction */
  direction: AlphaDirection;
}

/**
 * Props for the Alpha component
 */
export interface AlphaProps {
  /** Current RGB color values */
  rgb: RGB;
  
  /** Current HSL color values */
  hsl: HSL;
  
  /** Current alpha/opacity value (0-1) */
  a?: number;
  
  /** Slider direction - 'horizontal' or 'vertical' */
  direction?: AlphaDirection;
  
  /** Border radius for the slider */
  radius?: string;
  
  /** Box shadow for the gradient */
  shadow?: string;
  
  /** Custom style overrides */
  style?: React.CSSProperties;
  
  /** Custom renderers (e.g., checkboard pattern) */
  renderers?: AlphaRenderers;
  
  /** Custom pointer component */
  pointer?: React.ComponentType<AlphaPointerProps>;
  
  /**
   * Callback fired when alpha value changes
   * @param color - New color values including updated alpha
   * @param event - Mouse or touch event that triggered the change
   */
  onChange?: (color: ColorResult, event: MouseEvent | TouchEvent) => void;
}

/**
 * Alpha slider component for adjusting color opacity/transparency.
 * Displays a gradient from transparent to opaque and allows users to
 * select an alpha value by clicking or dragging.
 * 
 * @example
 *