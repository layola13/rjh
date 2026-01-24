import { Component, PureComponent, ComponentType } from 'react';

/**
 * Color state representation with HSL and alpha values
 */
export interface ColorState {
  /** Hue (0-360) */
  h: number;
  /** Saturation (0-1) */
  s: number;
  /** Lightness (0-1) */
  l: number;
  /** Alpha/Opacity (0-1) */
  a: number;
  /** Previous hue value for state preservation */
  oldHue?: number;
}

/**
 * Color input - can be HSL object, hex string, RGB object, etc.
 */
export type ColorInput = Partial<ColorState> | string | Record<string, unknown>;

/**
 * Color change event data
 */
export interface ColorResult extends ColorState {
  hex?: string;
  rgb?: { r: number; g: number; b: number; a: number };
  hsl?: { h: number; s: number; l: number; a: number };
  hsv?: { h: number; s: number; v: number; a: number };
}

/**
 * Base props for color picker components
 */
export interface ColorPickerProps<T = ColorResult> {
  /** Current color value */
  color?: ColorInput;
  
  /** 
   * Callback fired when color changes
   * @param color - The new color state
   * @param event - The triggering event
   */
  onChange?: (color: T, event: Event | React.SyntheticEvent) => void;
  
  /** 
   * Callback fired when color change is complete (debounced)
   * @param color - The final color state
   * @param event - The triggering event
   */
  onChangeComplete?: (color: T, event: Event | React.SyntheticEvent) => void;
  
  /** 
   * Callback fired when hovering over color swatches
   * @param color - The hovered color state
   * @param event - The mouse event
   */
  onSwatchHover?: (color: T, event: React.MouseEvent) => void;
}

/**
 * Internal state for ColorWrap HOC
 */
interface ColorWrapState extends ColorState {}

/**
 * Props for wrapped color picker component
 */
interface WrappedColorPickerProps extends ColorState {
  onChange: (color: ColorInput, event: Event | React.SyntheticEvent) => void;
  onSwatchHover?: (color: ColorInput, event: React.MouseEvent) => void;
}

/**
 * Higher-Order Component that wraps color picker components with:
 * - Color state management
 * - Color validation
 * - Debounced change callbacks
 * - Swatch hover handling
 * 
 * @template P - Props type of the wrapped component
 * @param WrappedComponent - The color picker component to wrap
 * @returns Enhanced component with color state management
 * 
 * @example
 *