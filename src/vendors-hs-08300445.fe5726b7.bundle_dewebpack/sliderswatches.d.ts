import React from 'react';

/**
 * HSL color representation
 */
export interface HSL {
  /** Hue: 0-360 degrees */
  h: number;
  /** Saturation: 0-1 (0-100%) */
  s: number;
  /** Lightness: 0-1 (0-100%) */
  l: number;
}

/**
 * Props for the SliderSwatches component
 */
export interface SliderSwatchesProps {
  /**
   * Callback function triggered when a swatch is clicked
   * @param color - The selected color in HSL format
   * @param event - The mouse event
   */
  onClick: (color: HSL, event: React.MouseEvent) => void;
  
  /**
   * Current HSL color value
   */
  hsl: HSL;
}

/**
 * A slider-based color swatch selector component that displays 5 preset lightness values
 * (80%, 65%, 50%, 35%, 20%) at 50% saturation
 * 
 * @component
 * @example
 *