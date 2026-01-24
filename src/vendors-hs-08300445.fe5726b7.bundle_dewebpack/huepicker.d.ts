/**
 * HuePicker Component Type Definitions
 * A color picker component that allows users to select hue values
 */

import React from 'react';
import { ColorWrapChangeHandler, HSLColor } from './ColorWrap';

/**
 * Style configuration for HuePicker component parts
 */
export interface HuePickerStyles {
  /** Styles for the root picker container */
  picker?: React.CSSProperties;
  /** Styles for the hue slider component */
  hue?: React.CSSProperties;
}

/**
 * Props for the HuePicker component
 */
export interface HuePickerProps {
  /** Width of the picker component */
  width?: string;
  /** Height of the picker component */
  height?: string;
  /** Callback fired when the hue value changes */
  onChange?: ColorWrapChangeHandler;
  /** Current HSL color value */
  hsl?: HSLColor;
  /** Direction of the hue slider ('horizontal' or 'vertical') */
  direction?: 'horizontal' | 'vertical';
  /** Custom pointer component for the hue slider */
  pointer?: React.ComponentType<any>;
  /** Custom styles for component parts */
  styles?: HuePickerStyles;
  /** Additional CSS class name */
  className?: string;
}

/**
 * HuePicker - A component for selecting hue values from the color spectrum
 * 
 * @example
 *