/**
 * Colorable Mixin
 * 
 * A Vue mixin that provides methods for applying color to components.
 * Supports both CSS color values and theme color names.
 */

import Vue from 'vue';

/**
 * Data object structure for style and class bindings
 */
export interface ColorableData {
  /** Inline style object */
  style?: Record<string, string | number>;
  /** CSS class object (class names as keys, boolean values) */
  class?: Record<string, boolean>;
}

/**
 * Props for the Colorable mixin
 */
export interface ColorableProps {
  /** Color value - can be a CSS color string or theme color name */
  color?: string;
}

/**
 * Methods provided by the Colorable mixin
 */
export interface ColorableMethods {
  /**
   * Sets the background color and border color on the provided data object
   * 
   * @param color - Color value (CSS color or theme color name)
   * @param data - Data object containing style and class bindings (default: empty object)
   * @returns Modified data object with color applied
   * 
   * @remarks
   * - If color is a valid CSS color, adds inline styles for background-color and border-color
   * - If color is a theme color name, adds a CSS class with the color name
   * 
   * @example
   *