/**
 * Photoshop Color Picker Component
 * A comprehensive color picker styled after Adobe Photoshop's color picker interface.
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
  /** Alpha channel (0-1) */
  a?: number;
}

/**
 * HSL color representation
 */
export interface HSLColor {
  /** Hue (0-360) */
  h: number;
  /** Saturation (0-100) */
  s: number;
  /** Lightness (0-100) */
  l: number;
  /** Alpha channel (0-1) */
  a?: number;
}

/**
 * HSV color representation
 */
export interface HSVColor {
  /** Hue (0-360) */
  h: number;
  /** Saturation (0-100) */
  s: number;
  /** Value/Brightness (0-100) */
  v: number;
  /** Alpha channel (0-1) */
  a?: number;
}

/**
 * Color change event data
 */
export interface ColorResult {
  /** Hexadecimal color string */
  hex: string;
  /** RGB color object */
  rgb: RGBColor;
  /** HSL color object */
  hsl: HSLColor;
  /** HSV color object */
  hsv: HSVColor;
}

/**
 * Custom styles for Photoshop picker components
 */
export interface PhotoshopPickerStylesProps {
  /** Root picker container styles */
  picker?: React.CSSProperties;
  /** Header section styles */
  head?: React.CSSProperties;
  /** Body container styles */
  body?: React.CSSProperties;
  /** Saturation selector styles */
  saturation?: React.CSSProperties;
  /** Hue slider styles */
  hue?: React.CSSProperties;
  /** Controls container styles */
  controls?: React.CSSProperties;
  /** Top section styles */
  top?: React.CSSProperties;
  /** Color previews styles */
  previews?: React.CSSProperties;
  /** Action buttons container styles */
  actions?: React.CSSProperties;
}

/**
 * Props for the Photoshop color picker component
 */
export interface PhotoshopPickerProps {
  /** Current color in hexadecimal format */
  hex?: string;
  /** Current RGB color */
  rgb?: RGBColor;
  /** Current HSL color */
  hsl?: HSLColor;
  /** Current HSV color */
  hsv?: HSVColor;
  /** Custom header text */
  header?: string;
  /** Custom styles override */
  styles?: PhotoshopPickerStylesProps;
  /** Additional CSS class name */
  className?: string;
  /** Callback fired when color changes */
  onChange?: (color: ColorResult) => void;
  /** Callback fired when OK button is clicked */
  onAccept?: () => void;
  /** Callback fired when Cancel button is clicked */
  onCancel?: () => void;
}

/**
 * Internal state for Photoshop picker
 */
export interface PhotoshopPickerState {
  /** The initial color when picker was opened */
  currentColor: string;
}

/**
 * Photoshop-style color picker component
 * 
 * Features:
 * - Large saturation/brightness selector
 * - Vertical hue slider
 * - Color preview (current vs original)
 * - RGB/HSV/Hex input fields
 * - Accept/Cancel action buttons
 * 
 * @example
 *