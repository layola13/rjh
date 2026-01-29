/**
 * CompactColor component - A compact color swatch with dot indicator
 * @module CompactColor
 */

import React from 'react';
import { Swatch } from './Swatch';

/**
 * Props for the CompactColor component
 */
export interface CompactColorProps {
  /**
   * The color value to display (hex, rgb, hsl, or 'transparent')
   */
  color: string;

  /**
   * Callback fired when the color swatch is clicked
   * @param color - The color value
   * @param event - The click event
   */
  onClick?: (color: string, event: React.MouseEvent) => void;

  /**
   * Callback fired when hovering over the color swatch
   * @param color - The color value
   * @param event - The mouse event
   */
  onSwatchHover?: (color: string, event: React.MouseEvent) => void;

  /**
   * Whether this color is currently active/selected
   */
  active?: boolean;
}

/**
 * Style object for the color swatch container
 */
interface ColorStyle {
  background: string;
  width: string;
  height: string;
  float: string;
  marginRight: string;
  marginBottom: string;
  position: string;
  cursor: string;
  boxShadow?: string;
}

/**
 * Style object for the active indicator dot
 */
interface DotStyle {
  absolute: string;
  background: string;
  borderRadius: string;
  opacity: string;
}

/**
 * Combined styles for the CompactColor component
 */
interface CompactColorStyles {
  color: ColorStyle;
  dot: DotStyle;
}

/**
 * Compact color swatch component with active state indicator
 * 
 * Displays a small 15x15px color square with a centered dot that appears
 * when the color is active. Automatically adjusts contrast for white and
 * transparent colors.
 */
export declare const CompactColor: React.FC<CompactColorProps>;

export default CompactColor;