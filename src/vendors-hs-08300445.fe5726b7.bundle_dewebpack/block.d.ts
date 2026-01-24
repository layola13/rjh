import React from 'react';
import { CustomPickerInjectedProps } from 'react-color';

/**
 * Block color picker component props
 */
export interface BlockPickerProps extends Partial<CustomPickerInjectedProps> {
  /**
   * Width of the picker component
   * @default 170
   */
  width?: string | number;

  /**
   * Array of preset color values in hex format
   * @default ["#D9E3F0", "#F47373", "#697689", "#37D67A", "#2CCCE4", "#555555", "#dce775", "#ff8a65", "#ba68c8"]
   */
  colors?: string[];

  /**
   * Triangle indicator position
   * @default "top"
   */
  triangle?: 'top' | 'hide';

  /**
   * Custom styles for internal elements
   * @default {}
   */
  styles?: Partial<BlockPickerStyles>;

  /**
   * Additional CSS class name
   * @default ""
   */
  className?: string;

  /**
   * Current hex color value
   */
  hex?: string;

  /**
   * Callback fired when color changes
   */
  onChange?: (color: ColorResult, event: React.ChangeEvent) => void;

  /**
   * Callback fired when hovering over color swatches
   */
  onSwatchHover?: (color: ColorResult, event: React.MouseEvent) => void;
}

/**
 * Style definitions for Block picker internal elements
 */
export interface BlockPickerStyles {
  card?: React.CSSProperties;
  head?: React.CSSProperties;
  body?: React.CSSProperties;
  label?: React.CSSProperties;
  triangle?: React.CSSProperties;
  input?: React.CSSProperties;
}

/**
 * Color result object returned by callbacks
 */
export interface ColorResult {
  hex: string;
  source: string;
  [key: string]: any;
}

/**
 * Block Color Picker Component
 * 
 * A simple color picker with preset swatches and a preview header.
 * Displays the selected color in a block-style interface with customizable triangle indicator.
 * 
 * @example
 *