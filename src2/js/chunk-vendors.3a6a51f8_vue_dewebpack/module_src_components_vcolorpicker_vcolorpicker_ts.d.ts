/**
 * VColorPicker Component Type Definitions
 * A comprehensive color picker component with canvas, preview, edit controls, and swatches
 */

import Vue, { VNode, PropType } from 'vue';
import { ColorObject, RGBAColor } from './util';

/**
 * Supported color modes for the color picker
 */
export type ColorMode = 'rgba' | 'rgb' | 'hsla' | 'hsl' | 'hex' | 'hexa';

/**
 * Color value can be either a color object or a string representation
 */
export type ColorValue = ColorObject | string;

/**
 * Props interface for VColorPicker component
 */
export interface VColorPickerProps {
  /**
   * Height of the color canvas area
   * @default 150
   */
  canvasHeight?: string | number;

  /**
   * Disables the color picker interactions
   * @default false
   */
  disabled?: boolean;

  /**
   * Size of the color selection dot on the canvas
   * @default 10
   */
  dotSize?: number | string;

  /**
   * Removes elevation/shadow from the picker
   * @default false
   */
  flat?: boolean;

  /**
   * Hides the color canvas area
   * @default false
   */
  hideCanvas?: boolean;

  /**
   * Hides the color input fields
   * @default false
   */
  hideInputs?: boolean;

  /**
   * Hides the mode switch button
   * @default false
   */
  hideModeSwitch?: boolean;

  /**
   * Current color input mode
   * @default 'rgba'
   */
  mode?: ColorMode;

  /**
   * Shows the swatches panel
   * @default false
   */
  showSwatches?: boolean;

  /**
   * Array of predefined color swatches
   */
  swatches?: string[][];

  /**
   * Maximum height of the swatches panel
   * @default 150
   */
  swatchesMaxHeight?: number | string;

  /**
   * Current color value (v-model)
   */
  value?: ColorValue;

  /**
   * Width of the color picker component
   * @default 300
   */
  width?: number | string;
}

/**
 * Data interface for VColorPicker component
 */
export interface VColorPickerData {
  /**
   * Internal color representation in HSVA format
   */
  internalValue: ColorObject;
}

/**
 * Computed properties interface for VColorPicker component
 */
export interface VColorPickerComputed {
  /**
   * Determines if alpha channel should be hidden based on the input value
   */
  hideAlpha: boolean;
}

/**
 * Methods interface for VColorPicker component
 */
export interface VColorPickerMethods {
  /**
   * Updates the internal color state and emits change events
   * @param color - New color object to set
   */
  updateColor(color: ColorObject): void;

  /**
   * Generates the color canvas VNode
   * @returns VNode for the canvas component
   */
  genCanvas(): VNode;

  /**
   * Generates the controls container VNode
   * @returns VNode containing preview and edit controls
   */
  genControls(): VNode;

  /**
   * Generates the color edit controls VNode
   * @returns VNode for the edit component
   */
  genEdit(): VNode;

  /**
   * Generates the color preview VNode
   * @returns VNode for the preview component
   */
  genPreview(): VNode;

  /**
   * Generates the color swatches VNode
   * @returns VNode for the swatches component
   */
  genSwatches(): VNode;
}

/**
 * Events emitted by VColorPicker component
 */
export interface VColorPickerEvents {
  /**
   * Emitted when color value changes (v-model)
   * @param value - New color value in the format of the input
   */
  input: ColorValue;

  /**
   * Emitted when internal color object changes
   * @param color - New color object
   */
  'update:color': ColorObject;

  /**
   * Emitted when color mode changes
   * @param mode - New color mode
   */
  'update:mode': ColorMode;
}

/**
 * VColorPicker Component
 * 
 * A full-featured color picker with:
 * - Interactive canvas for hue/saturation selection
 * - Color preview with alpha channel support
 * - Multiple input modes (RGBA, HSLA, HEX, etc.)
 * - Optional predefined color swatches
 * - Themeable and elevation support
 * 
 * @example
 *