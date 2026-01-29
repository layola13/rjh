/**
 * PhotoshopPicker Component Type Definitions
 * A color picker component mimicking Adobe Photoshop's color picker interface
 */

import { CSSProperties } from 'react';

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
 * HSV color representation
 */
export interface HSVColor {
  /** Hue (0-360 degrees) */
  h: number;
  /** Saturation (0-1) */
  s: number;
  /** Value/Brightness (0-1) */
  v: number;
  /** Optional alpha channel (0-1) */
  a?: number;
}

/**
 * Hex color string (e.g., "#FF0000")
 */
export type HexColor = string;

/**
 * Color change source identifier
 */
export type ColorSource = 'hex' | 'rgb' | 'hsv';

/**
 * Partial color change data - can contain hex, rgb, or hsv values
 */
export interface ColorChangeData {
  /** Hex color value */
  hex?: HexColor;
  /** RGB color values (partial allowed) */
  r?: number;
  g?: number;
  b?: number;
  /** HSV color values (partial allowed) */
  h?: number;
  s?: number;
  v?: number;
  /** Source of the color change */
  source?: ColorSource;
}

/**
 * Complete color state
 */
export interface ColorResult {
  /** RGB representation */
  rgb: RGBColor;
  /** HSV representation */
  hsv: HSVColor;
  /** Hex representation */
  hex: HexColor;
  /** Source of the change */
  source: ColorSource;
}

/**
 * Color change event handler
 */
export type ColorChangeHandler = (
  color: ColorResult,
  event?: React.ChangeEvent<HTMLInputElement>
) => void;

/**
 * PhotoshopPicker component props
 */
export interface PhotoshopPickerProps {
  /**
   * Callback fired when color changes
   */
  onChange: ColorChangeHandler;
  
  /**
   * Current RGB color value
   */
  rgb: RGBColor;
  
  /**
   * Current HSV color value
   */
  hsv: HSVColor;
  
  /**
   * Current hex color value (with or without # prefix)
   */
  hex: HexColor;
  
  /**
   * Optional CSS class name
   */
  className?: string;
  
  /**
   * Optional inline styles
   */
  styles?: Partial<PhotoshopPickerStyles>;
}

/**
 * Internal style definitions for PhotoshopPicker
 */
export interface PhotoshopPickerStyles {
  /** Container for all input fields */
  fields: CSSProperties;
  /** Divider between sections */
  divider: CSSProperties;
  /** Wrapper for RGB/HSV inputs */
  RGBwrap: CSSProperties;
  /** RGB/HSV input field styles */
  RGBinput: CSSProperties;
  /** RGB/HSV label styles */
  RGBlabel: CSSProperties;
  /** Wrapper for hex input */
  HEXwrap: CSSProperties;
  /** Hex input field styles */
  HEXinput: CSSProperties;
  /** Hex label styles */
  HEXlabel: CSSProperties;
  /** Container for degree/percent symbols */
  fieldSymbols: CSSProperties;
  /** Individual symbol styles */
  symbol: CSSProperties;
}

/**
 * PhotoshopPicker - A Photoshop-style color picker component
 * 
 * Provides input fields for:
 * - HSV (Hue, Saturation, Value)
 * - RGB (Red, Green, Blue)
 * - Hex color code
 * 
 * @example
 *