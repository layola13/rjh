/**
 * Sets the end point coordinates for a gradient element.
 * 
 * For radial gradients, this sets the center point (cx, cy).
 * For linear gradients, this sets the end point (x2, y2).
 * 
 * @param x - The x-coordinate of the end point (or center for radial)
 * @param y - The y-coordinate of the end point (or center for radial)
 * @returns The gradient instance for method chaining
 */
export function to(x: number, y: number): this;

/**
 * Represents a numeric value wrapper used in SVG attribute operations
 */
declare class SVGNumber {
  constructor(value: number);
}

/**
 * Base gradient interface with common properties and methods
 */
interface GradientElement {
  /**
   * The type of gradient: 'radial' or 'linear'
   */
  type: 'radial' | 'linear';
  
  /**
   * Sets attributes on the gradient element
   * @param attributes - Object containing attribute key-value pairs
   * @returns The gradient instance for method chaining
   */
  attr(attributes: Record<string, SVGNumber>): this;
}

/**
 * Radial gradient specific attributes
 */
interface RadialGradientAttributes {
  /** Center x-coordinate */
  cx: SVGNumber;
  /** Center y-coordinate */
  cy: SVGNumber;
}

/**
 * Linear gradient specific attributes
 */
interface LinearGradientAttributes {
  /** End point x-coordinate */
  x2: SVGNumber;
  /** End point y-coordinate */
  y2: SVGNumber;
}