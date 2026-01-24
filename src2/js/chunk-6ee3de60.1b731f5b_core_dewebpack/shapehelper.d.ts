/**
 * Shape transformation matrix helper utilities
 * Provides methods to reset and clear transformation properties from shapes
 */

/**
 * Shape object with transformation attributes
 */
interface Shape {
  /**
   * Clears any cached rendering data
   */
  clearCache(): void;

  /**
   * Clears internal transformation matrices
   */
  _clearTransform(): void;

  /**
   * Shape attributes including transformation properties
   */
  attrs: ShapeAttributes;
}

/**
 * Shape transformation and positioning attributes
 */
interface ShapeAttributes {
  /** Horizontal offset from origin */
  offsetX?: number;

  /** Vertical offset from origin */
  offsetY?: number;

  /** Horizontal skew angle in degrees */
  skewX?: number;

  /** Vertical skew angle in degrees */
  skewY?: number;

  /** X-axis position */
  x?: number;

  /** Y-axis position */
  y?: number;

  /** Horizontal scale factor */
  scaleX?: number;

  /** Vertical scale factor */
  scaleY?: number;

  /** Rotation angle in degrees */
  rotation?: number;
}

/**
 * Helper class for managing shape transformations
 */
export class ShapeHelper {
  /**
   * Restores a shape to its default transformation state by clearing
   * all transformation-related properties (position, scale, rotation, skew, offset)
   * 
   * @param shape - The shape object to reset
   * 
   * @example
   *