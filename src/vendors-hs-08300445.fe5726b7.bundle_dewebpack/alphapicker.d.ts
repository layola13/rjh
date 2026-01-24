/**
 * AlphaPicker Component Type Definitions
 * A color picker component that provides an alpha (transparency) slider
 */

import * as React from 'react';
import { ColorResult, HSLColor, RGBColor } from 'react-color';

/**
 * Props for the AlphaPicker component
 */
export interface AlphaPickerProps {
  /**
   * RGB color value
   */
  rgb?: RGBColor;

  /**
   * HSL color value
   */
  hsl?: HSLColor;

  /**
   * Width of the picker component
   * @default "316px"
   */
  width?: string | number;

  /**
   * Height of the picker component
   * @default "16px"
   */
  height?: string | number;

  /**
   * Callback fired when the alpha value changes
   */
  onChange?: (color: ColorResult) => void;

  /**
   * Direction of the alpha slider
   * @default "horizontal"
   */
  direction?: 'horizontal' | 'vertical';

  /**
   * Custom inline styles for the picker
   */
  style?: React.CSSProperties;

  /**
   * Custom renderers for color display
   */
  renderers?: Record<string, unknown>;

  /**
   * Custom pointer component for the slider
   */
  pointer?: React.ComponentType<unknown>;

  /**
   * Additional CSS class name
   */
  className?: string;
}

/**
 * AlphaPicker - A standalone alpha/transparency slider component
 * 
 * Provides a simple interface for adjusting the alpha channel of a color.
 * Can be oriented horizontally or vertically.
 */
export declare const AlphaPicker: React.ComponentType<AlphaPickerProps>;

/**
 * Default export is a ColorWrap-enhanced version of AlphaPicker
 * that includes color state management
 */
declare const AlphaPickerWrapped: React.ComponentType<AlphaPickerProps>;
export default AlphaPickerWrapped;