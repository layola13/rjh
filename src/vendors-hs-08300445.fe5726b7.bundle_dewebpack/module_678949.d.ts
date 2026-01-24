/**
 * Color picker change calculation utilities
 * Calculates HSV color values based on mouse/touch position within a color picker element
 */

/**
 * HSV color representation with alpha channel
 */
export interface HSVColor {
  /** Hue (0-360) */
  h: number;
  /** Saturation (0-100) */
  s: number;
  /** Value/Brightness (0-100) */
  v: number;
  /** Alpha/Opacity (0-1) */
  a: number;
  /** Color source identifier */
  source: string;
}

/**
 * Mouse or touch event with position information
 */
export type PointerEvent = MouseEvent | TouchEvent;

/**
 * Calculates the HSV color change based on pointer position within a color picker element
 * 
 * @param event - Mouse or touch event containing position data
 * @param currentColor - Current HSV color state
 * @param element - DOM element representing the color picker bounds
 * @returns Updated HSV color based on pointer position
 * 
 * @remarks
 * - X position maps to saturation (0-100%)
 * - Y position maps to value/brightness (100-0%, inverted)
 * - Hue and alpha are preserved from currentColor
 * - Position is clamped to element boundaries
 */
export function calculateChange(
  event: PointerEvent,
  currentColor: HSVColor,
  element: HTMLElement
): HSVColor;