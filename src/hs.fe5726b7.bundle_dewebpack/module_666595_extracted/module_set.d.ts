/**
 * Module: module_set
 * Original ID: set
 * 
 * Sets a CSS color property on a DOM element with RGBA fallback handling.
 * Handles transparency by blending with parent background colors when RGBA is not supported.
 */

/**
 * Parsed color components (RGB or RGBA)
 */
interface ColorComponents {
  _rgba: [number, number, number, number];
}

/**
 * Color object with blending and conversion capabilities
 */
interface Color extends ColorComponents {
  /**
   * Blends this color with a background color
   * @param backgroundColor - Background color string or "_default" for default background
   * @returns New blended color instance
   */
  blend(backgroundColor: string): Color;
  
  /**
   * Converts color to RGBA string format
   * @returns RGBA string representation (e.g., "rgba(255, 0, 0, 1)")
   */
  toRgbaString(): string;
}

/**
 * jQuery-like utility object for type checking and CSS operations
 */
interface JQueryUtil {
  /**
   * Determines the type of a value
   * @param value - Value to check
   * @returns Type string (e.g., "string", "object")
   */
  type(value: unknown): string;
  
  /**
   * Gets computed CSS property value from an element
   * @param element - Target DOM element
   * @param property - CSS property name
   * @returns Computed CSS value
   */
  css(element: HTMLElement, property: string): string;
}

/**
 * Browser capability flags
 */
interface SupportFlags {
  /** Whether RGBA color format is supported */
  rgba: boolean;
}

/**
 * Parses a color string into color components
 * @param colorString - CSS color string to parse
 * @returns Parsed color components or undefined if invalid
 */
declare function parseColor(colorString: string): ColorComponents | undefined;

/**
 * Creates a Color object from components or color string
 * @param input - Color components or color string
 * @returns Color object with manipulation methods
 */
declare function createColor(input: ColorComponents | string): Color;

/**
 * Sets a color CSS property on a DOM element with transparency fallback.
 * When RGBA is not supported and alpha < 1, blends with parent background.
 * 
 * @param element - Target DOM element to style
 * @param propertyName - CSS property name (e.g., "backgroundColor", "color")
 * @param colorValue - Color value as string or parsed color
 * @param util - jQuery-like utility object for type checking and CSS operations
 * @param support - Browser support flags
 */
declare function setColorProperty(
  element: HTMLElement,
  propertyName: string,
  colorValue: string | unknown,
  util: JQueryUtil,
  support: SupportFlags
): void;

/**
 * Implementation of color property setter with transparency handling
 */
declare const moduleSet: {
  (
    element: HTMLElement,
    propertyName: string,
    colorValue: string | unknown,
    util: JQueryUtil,
    support: SupportFlags
  ): void;
};

export { setColorProperty, moduleSet, Color, ColorComponents, SupportFlags };
export default moduleSet;