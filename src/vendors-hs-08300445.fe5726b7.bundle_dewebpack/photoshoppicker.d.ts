/**
 * PhotoshopPicker Component - A color picker component styled after Adobe Photoshop's color picker interface.
 * 
 * This component provides input fields for HSV, RGB, and HEX color values with labels and units.
 * 
 * @module PhotoshopPicker
 */

import React from 'react';

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
  /** Alpha channel (0-1), optional */
  a?: number;
}

/**
 * HSV color representation
 */
export interface HSVColor {
  /** Hue (0-360 degrees) */
  h: number;
  /** Saturation (0-1) */
  s: number;
  /** Value/Brightness (0-1) */
  v: number;
  /** Alpha channel (0-1), optional */
  a?: number;
}

/**
 * Color change event data
 */
export interface ColorChangeData {
  /** Hexadecimal color string */
  hex?: string;
  /** RGB color values */
  rgb?: RGBColor;
  /** HSV color values */
  hsv?: HSVColor;
  /** Red channel value */
  r?: number;
  /** Green channel value */
  g?: number;
  /** Blue channel value */
  b?: number;
  /** Hue value */
  h?: number;
  /** Saturation value */
  s?: number;
  /** Value/Brightness */
  v?: number;
  /** Hash symbol for hex input */
  '#'?: string;
  /** Source of the color change */
  source: 'hex' | 'rgb' | 'hsv';
}

/**
 * Props for the PhotoshopPicker component
 */
export interface PhotoshopPickerProps {
  /**
   * Current RGB color values
   */
  rgb: RGBColor;
  
  /**
   * Current HSV color values
   */
  hsv: HSVColor;
  
  /**
   * Current hexadecimal color string (with or without # prefix)
   */
  hex: string;
  
  /**
   * Callback fired when color value changes
   * @param color - The new color data
   * @param event - The original DOM event that triggered the change
   */
  onChange: (color: ColorChangeData, event: React.ChangeEvent<HTMLInputElement>) => void;
}

/**
 * PhotoshopPicker - A color picker component with HSV, RGB, and HEX input fields
 * 
 * Features:
 * - HSV input fields (Hue in degrees, Saturation and Value in percentages)
 * - RGB input fields (Red, Green, Blue channels 0-255)
 * - HEX input field for hexadecimal color codes
 * - Real-time color value synchronization across all formats
 * 
 * @example
 *