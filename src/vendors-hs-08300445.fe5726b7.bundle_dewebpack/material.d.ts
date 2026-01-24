/**
 * Material Design color picker component
 * Provides hex and RGB color input fields with Material Design styling
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
  /** Optional alpha channel (0-1) */
  a?: number;
}

/**
 * Color change event data
 */
export interface ColorResult {
  /** Hexadecimal color string */
  hex?: string;
  /** RGB color object */
  rgb?: RGBColor;
  /** Red channel value */
  r?: number;
  /** Green channel value */
  g?: number;
  /** Blue channel value */
  b?: number;
  /** Source of the color change */
  source: 'hex' | 'rgb';
}

/**
 * Style configuration for input components
 */
export interface EditableInputStyles {
  /** Wrapper element styles */
  wrap?: React.CSSProperties;
  /** Input element styles */
  input?: React.CSSProperties;
  /** Label element styles */
  label?: React.CSSProperties;
}

/**
 * Custom styles for Material picker sub-components
 */
export interface MaterialPickerStyles {
  /** Main container styles */
  material?: React.CSSProperties;
  /** HEX input wrapper styles */
  HEXwrap?: React.CSSProperties;
  /** HEX input field styles */
  HEXinput?: React.CSSProperties;
  /** HEX label styles */
  HEXlabel?: React.CSSProperties;
  /** RGB input wrapper styles */
  RGBwrap?: React.CSSProperties;
  /** RGB input field styles */
  RGBinput?: React.CSSProperties;
  /** RGB label styles */
  RGBlabel?: React.CSSProperties;
  /** Split container styles (for RGB inputs) */
  split?: React.CSSProperties;
  /** Individual RGB input column styles */
  third?: React.CSSProperties;
  /** Hex component styles */
  Hex?: { style?: React.CSSProperties };
}

/**
 * Props for the Material color picker component
 */
export interface MaterialPickerProps {
  /**
   * Callback fired when color changes
   * @param color - New color value
   * @param event - DOM event that triggered the change
   */
  onChange?: (color: ColorResult, event: React.ChangeEvent<HTMLInputElement>) => void;
  
  /** Current hexadecimal color value (e.g., "#ff0000") */
  hex?: string;
  
  /** Current RGB color value */
  rgb?: RGBColor;
  
  /** Custom styles to override default styling */
  styles?: Partial<MaterialPickerStyles>;
  
  /** Additional CSS class name */
  className?: string;
}

/**
 * Material Design color picker component
 * 
 * Features:
 * - Hex color input with dynamic border color
 * - Individual RGB channel inputs
 * - Material Design visual styling
 * - Real-time color validation
 * 
 * @example
 *