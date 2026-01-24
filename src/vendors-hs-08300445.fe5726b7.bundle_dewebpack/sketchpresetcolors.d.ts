import React from 'react';

/**
 * Color preset configuration
 * Can be either a hex string or an object with color and title
 */
export type ColorPreset = string | {
  /** Hex color value */
  color: string;
  /** Optional tooltip title for the color */
  title?: string;
};

/**
 * Color change event data
 */
export interface ColorResult {
  /** Hex color value */
  hex: string;
  /** Source of the color change event */
  source: 'hex';
}

/**
 * Props for SketchPresetColors component
 */
export interface SketchPresetColorsProps {
  /** Array of preset colors to display */
  colors: ColorPreset[];
  
  /** 
   * Callback fired when a color is clicked
   * @param color - The selected color result
   * @param event - The mouse event
   */
  onClick?: (color: ColorResult, event: React.MouseEvent) => void;
  
  /** 
   * Callback fired when hovering over a color swatch
   * @param color - The hovered color result
   * @param event - The mouse event
   */
  onSwatchHover?: (color: ColorResult, event: React.MouseEvent) => void;
}

/**
 * SketchPresetColors component
 * Displays a grid of preset color swatches for the Sketch color picker
 * 
 * @example
 *