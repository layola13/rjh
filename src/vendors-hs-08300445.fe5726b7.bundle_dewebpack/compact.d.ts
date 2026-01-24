/**
 * Compact color picker component
 * A compact grid-based color picker with predefined color palette
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
  a?: number;
}

/**
 * Color change event payload
 */
export interface ColorResult {
  /** Hexadecimal color value */
  hex?: string;
  /** RGB color value */
  rgb?: RGB;
  /** Source of the color change */
  source?: string;
}

/**
 * Style overrides for Compact component
 */
export interface CompactStyles {
  /** Root container styles */
  Compact?: React.CSSProperties;
  /** Inner compact grid styles */
  compact?: React.CSSProperties;
  /** Clear float styles */
  clear?: React.CSSProperties;
}

/**
 * Props for the Compact color picker component
 */
export interface CompactProps {
  /**
   * Current hexadecimal color value
   * @example "#FF0000"
   */
  hex?: string;

  /**
   * Current RGB color value
   */
  rgb?: RGB;

  /**
   * Array of color swatches to display in the picker
   * @default Predefined 36-color palette
   */
  colors?: string[];

  /**
   * Callback fired when color changes
   * @param color - The new color value
   * @param event - The triggering event
   */
  onChange?: (color: ColorResult, event: React.ChangeEvent<HTMLInputElement> | React.MouseEvent) => void;

  /**
   * Callback fired when hovering over a color swatch
   * @param color - The hovered color value
   * @param event - The mouse event
   */
  onSwatchHover?: (color: ColorResult, event: React.MouseEvent) => void;

  /**
   * Custom styles to override default component styles
   */
  styles?: CompactStyles;

  /**
   * Additional CSS class name
   */
  className?: string;
}

/**
 * Compact color picker component
 * 
 * A space-efficient color picker displaying colors in a grid layout.
 * Features a predefined palette and optional custom color input.
 * 
 * @example
 *