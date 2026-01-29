/**
 * Represents a color in HSLA (Hue, Saturation, Lightness, Alpha) format
 */
export interface HSLAColor {
  /** Hue value (0-360 degrees) */
  h: number;
  /** Saturation value (0-100%) */
  s: number;
  /** Lightness value (0-100%) */
  l: number;
  /** Alpha/opacity value (0-1) */
  a: number;
  /** Source color space identifier */
  source: string;
}

/**
 * Mouse or touch event that contains page coordinates
 */
export type PointerEvent = MouseEvent | TouchEvent;

/**
 * Orientation mode for the color picker slider
 */
export type SliderOrientation = 'vertical' | 'horizontal';

/**
 * Calculates the hue change based on pointer position within a container element.
 * Used for color picker slider interactions.
 * 
 * @param event - The pointer event (mouse or touch) containing position data
 * @param orientation - The orientation of the slider ('vertical' or 'horizontal')
 * @param currentColor - The current HSLA color state
 * @param containerElement - The DOM element serving as the interaction container
 * @returns Updated HSLA color object if hue changed, null otherwise
 * 
 * @remarks
 * - Vertical mode: hue decreases from bottom (359°) to top (0°)
 * - Horizontal mode: hue increases from left (0°) to right (359°)
 * - Clamps values when pointer is outside container bounds
 */
export function calculateChange(
  event: PointerEvent,
  orientation: SliderOrientation,
  currentColor: HSLAColor,
  containerElement: HTMLElement
): HSLAColor | null;