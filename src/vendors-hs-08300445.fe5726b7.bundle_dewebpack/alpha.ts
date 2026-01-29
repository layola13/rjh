/**
 * Alpha component module
 * Provides an alpha (opacity) slider control for color picking
 */

import { PureComponent, Component, MouseEvent, TouchEvent } from 'react';

/**
 * HSL color representation
 */
export interface HSL {
  /** Hue (0-360) */
  h: number;
  /** Saturation (0-1) */
  s: number;
  /** Lightness (0-1) */
  l: number;
}

/**
 * RGB color representation
 */
export interface RGB {
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
 * Color change result containing multiple color formats
 */
export interface ColorResult {
  /** RGB representation */
  rgb?: RGB;
  /** HSL representation */
  hsl?: HSL;
  /** Hex color string */
  hex?: string;
  /** Alpha value (0-1) */
  a?: number;
}

/**
 * Custom renderers for checkboard pattern
 */
export interface Renderers {
  [key: string]: unknown;
}

/**
 * Custom pointer component props
 */
export interface PointerComponentProps extends AlphaProps {
  [key: string]: unknown;
}

/**
 * Custom pointer component type
 */
export type PointerComponent = React.ComponentType<PointerComponentProps>;

/**
 * Slider orientation direction
 */
export type Direction = 'horizontal' | 'vertical';

/**
 * Style overrides for Alpha component sub-elements
 */
export interface AlphaStyles {
  /** Root alpha container styles */
  alpha?: React.CSSProperties;
  /** Checkboard background styles */
  checkboard?: React.CSSProperties;
  /** Gradient overlay styles */
  gradient?: React.CSSProperties;
  /** Interactive container styles */
  container?: React.CSSProperties;
  /** Pointer wrapper styles */
  pointer?: React.CSSProperties;
  /** Default slider indicator styles */
  slider?: React.CSSProperties;
}

/**
 * Props for the Alpha component
 */
export interface AlphaProps {
  /** HSL color value */
  hsl: HSL;
  /** RGB color value */
  rgb: RGB;
  /** Current alpha value (0-1) */
  a?: number;
  /** Slider direction (horizontal or vertical) */
  direction?: Direction;
  /** Border radius for the slider */
  radius?: string;
  /** Box shadow for the gradient */
  shadow?: string;
  /** Custom style overrides */
  style?: AlphaStyles;
  /** Custom renderers for checkboard */
  renderers?: Renderers;
  /** Custom pointer component */
  pointer?: PointerComponent;
  /** Callback fired when alpha value changes */
  onChange?: (color: ColorResult, event: MouseEvent | TouchEvent) => void;
}

/**
 * Alpha slider component for adjusting color opacity
 * 
 * Renders a slider control that allows users to adjust the alpha (transparency)
 * channel of a color. Supports both horizontal and vertical orientations.
 * 
 * @example
 *