import React from 'react';
import { EditableInput } from './EditableInput';

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
 * Color change event data with hex format
 */
export interface HexColorChange {
  /** Hexadecimal color value */
  hex: string;
  /** Change source identifier */
  source: 'hex';
}

/**
 * Color change event data with RGB format
 */
export interface RGBColorChange extends RGBColor {
  /** Change source identifier */
  source: 'rgb';
}

/**
 * Union type for all possible color change events
 */
export type ColorChangeData = HexColorChange | RGBColorChange;

/**
 * Props for the SketchFields component
 */
export interface SketchFieldsProps {
  /**
   * Callback invoked when color values change
   * @param color - The new color data
   * @param event - The original DOM event
   */
  onChange: (color: ColorChangeData, event: React.SyntheticEvent) => void;
  
  /** Current RGB color values */
  rgb: RGBColor;
  
  /** Current HSL color values */
  hsl: HSLColor;
  
  /** Current hexadecimal color value */
  hex: string;
  
  /** Whether to hide the alpha channel input */
  disableAlpha?: boolean;
}

/**
 * Input field group component for Sketch color picker
 * Renders hex, RGB, and alpha input fields with drag-to-change support
 * 
 * @param props - Component properties
 * @returns React element containing color input fields
 */
export declare const SketchFields: React.FC<SketchFieldsProps>;

export default SketchFields;