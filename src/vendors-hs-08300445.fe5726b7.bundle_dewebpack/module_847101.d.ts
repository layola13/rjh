/**
 * Calculates the change in color alpha value based on mouse/touch position
 * within a color picker element.
 * 
 * @param event - The mouse or touch event containing position data
 * @param color - The current color object with HSLA values
 * @param direction - The orientation of the alpha slider ('vertical' or 'horizontal')
 * @param currentAlpha - The current alpha value (0-1)
 * @param container - The DOM element serving as the color picker container
 * @returns A new color object with updated alpha, or null if no change occurred
 */
export declare function calculateChange(
  event: MouseEvent | TouchEvent,
  color: HSLAColor,
  direction: SliderDirection,
  currentAlpha: number,
  container: HTMLElement
): HSLAColorResult | null;

/**
 * Represents a color in HSLA (Hue, Saturation, Lightness, Alpha) format
 */
export interface HSLAColor {
  /** Hue value (0-360 degrees) */
  h: number;
  /** Saturation value (0-1) */
  s: number;
  /** Lightness value (0-1) */
  l: number;
  /** Alpha/opacity value (0-1) */
  a: number;
}

/**
 * Represents the result of a color change calculation
 */
export interface HSLAColorResult extends HSLAColor {
  /** The source format of the color change */
  source: 'rgb';
}

/**
 * Valid directions for the alpha slider component
 */
export type SliderDirection = 'vertical' | 'horizontal';