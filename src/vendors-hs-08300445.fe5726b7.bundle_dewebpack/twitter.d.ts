/**
 * Twitter Color Picker Component
 * A compact color picker with a Twitter-style UI design
 */

import React from 'react';

/**
 * RGB color representation
 */
export interface RGBColor {
  r: number;
  g: number;
  b: number;
  a?: number;
}

/**
 * HSL color representation
 */
export interface HSLColor {
  h: number;
  s: number;
  l: number;
  a?: number;
}

/**
 * Color change result containing multiple color format representations
 */
export interface ColorResult {
  hex: string;
  rgb: RGBColor;
  hsl: HSLColor;
  source?: string;
}

/**
 * Triangle position options for the picker's pointer
 */
export type TrianglePosition = 'hide' | 'top-left' | 'top-right';

/**
 * Custom style overrides for Twitter picker sub-components
 */
export interface TwitterPickerStyles {
  card?: React.CSSProperties;
  body?: React.CSSProperties;
  label?: React.CSSProperties;
  triangle?: React.CSSProperties;
  triangleShadow?: React.CSSProperties;
  hash?: React.CSSProperties;
  input?: React.CSSProperties;
  swatch?: React.CSSProperties;
  clear?: React.CSSProperties;
}

/**
 * Props for the Twitter color picker component
 */
export interface TwitterPickerProps {
  /**
   * Width of the color picker in pixels or CSS string
   * @default 276
   */
  width?: number | string;

  /**
   * Position of the triangle pointer
   * @default 'top-left'
   */
  triangle?: TrianglePosition;

  /**
   * Array of preset color values in hex format
   * @default ['#FF6900', '#FCB900', '#7BDCB5', '#00D084', '#8ED1FC', '#0693E3', '#ABB8C3', '#EB144C', '#F78DA7', '#9900EF']
   */
  colors?: string[];

  /**
   * Current selected color in hex format
   */
  hex?: string;

  /**
   * Callback fired when color changes
   * @param color - The new color result
   * @param event - The triggering event
   */
  onChange?: (color: ColorResult, event: React.ChangeEvent | React.MouseEvent) => void;

  /**
   * Callback fired when hovering over a color swatch
   * @param color - The hovered color result
   * @param event - The triggering event
   */
  onSwatchHover?: (color: ColorResult, event: React.MouseEvent) => void;

  /**
   * Custom style overrides for internal elements
   * @default {}
   */
  styles?: TwitterPickerStyles;

  /**
   * Additional CSS class name
   * @default ''
   */
  className?: string;
}

/**
 * Twitter-style color picker component
 * Provides a compact interface for selecting colors from a predefined palette
 * with manual hex input capability
 */
export declare class Twitter extends React.Component<TwitterPickerProps> {
  static defaultProps: TwitterPickerProps;
}

/**
 * Default export: Twitter color picker wrapped with color utilities
 */
declare const TwitterColorPicker: React.ComponentType<TwitterPickerProps>;

export default TwitterColorPicker;