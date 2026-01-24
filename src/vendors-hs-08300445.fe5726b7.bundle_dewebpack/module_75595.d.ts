/**
 * Color picker change calculation module
 * Calculates HSL color values based on mouse/touch interaction with a color picker element
 */

/**
 * HSL color representation with alpha channel
 */
export interface HSLColor {
  /** Hue value (0-359 degrees) */
  h: number;
  /** Saturation value (0-100%) */
  s: number;
  /** Lightness value (0-100%) */
  l: number;
  /** Alpha/opacity value (0-1) */
  a: number;
  /** Source format identifier */
  source: string;
}

/**
 * Orientation mode for color picker interaction
 */
export type PickerOrientation = 'vertical' | 'horizontal';

/**
 * Mouse or touch event that can provide page coordinates
 */
export type PointerEvent = MouseEvent | TouchEvent;

/**
 * Calculates color change based on user interaction with a color picker element
 * 
 * @param event - Mouse or touch event containing pointer coordinates
 * @param orientation - Direction of the color picker ('vertical' or 'horizontal')
 * @param currentColor - Current HSL color state
 * @param containerElement - DOM element representing the color picker container
 * @returns Updated HSL color object if hue changed, null otherwise
 * 
 * @example
 *