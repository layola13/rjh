/**
 * HSVA Color Model
 * Represents color in Hue, Saturation, Value, Alpha format
 */
interface HSVAColor {
  /** Hue: 0-360 degrees */
  h: number;
  /** Saturation: 0-1 (0% to 100%) */
  s: number;
  /** Value (Brightness): 0-1 (0% to 100%) */
  v: number;
  /** Alpha (Opacity): 0-1 (0% to 100%) */
  a: number;
}

/**
 * Color Object
 * Contains color information in HSVA format
 */
interface ColorObject {
  /** Color data in HSVA format */
  hsva: HSVAColor;
}

/**
 * 2D Coordinate Position
 * Represents x,y coordinates in pixels
 */
interface DotPosition {
  /** Horizontal position in pixels */
  x: number;
  /** Vertical position in pixels */
  y: number;
}

/**
 * Color Picker Dot Context
 * The 'this' context for the dot position calculation function
 */
interface DotContext {
  /** Current color object, may be undefined if no color is selected */
  color?: ColorObject;
  /** Width of the color picker area (as string for parsing) */
  width: string | number;
  /** Height of the color picker area (as string for parsing) */
  height: string | number;
}

/**
 * Calculate Dot Position
 * 
 * Calculates the position of the color picker dot based on the current color's
 * saturation and value components in the HSVA color model.
 * 
 * - X position is determined by saturation (0-1) multiplied by picker width
 * - Y position is determined by inverted value (1-v) multiplied by picker height
 *   (inverted because canvas coordinates start from top-left)
 * 
 * @this {DotContext} The color picker context containing color and dimensions
 * @returns {DotPosition} The calculated x,y coordinates for the dot position
 * 
 * @example
 * const context = {
 *   color: { hsva: { h: 180, s: 0.5, v: 0.8, a: 1 } },
 *   width: '200',
 *   height: '150'
 * };
 * const position = calculateDotPosition.call(context);
 * // Returns: { x: 100, y: 30 }
 */
declare function calculateDotPosition(this: DotContext): DotPosition;

export type { HSVAColor, ColorObject, DotPosition, DotContext };
export { calculateDotPosition };