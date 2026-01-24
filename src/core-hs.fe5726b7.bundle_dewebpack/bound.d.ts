/**
 * Represents a 2D point with x and y coordinates
 */
export interface Point {
  x: number;
  y: number;
}

/**
 * Represents a bounding box defined by its left-bottom corner and dimensions.
 * Used for tracking the spatial extent of geometric objects.
 */
export class Bound {
  /**
   * The x-coordinate of the left edge of the bounding box
   * @default Infinity (uninitialized state)
   */
  left: number;

  /**
   * The y-coordinate of the bottom edge of the bounding box
   * @default Infinity (uninitialized state)
   */
  bottom: number;

  /**
   * The width of the bounding box
   * @default 0
   */
  width: number;

  /**
   * The height of the bounding box
   * @default 0
   */
  height: number;

  /**
   * Creates a new uninitialized Bound instance
   */
  constructor();

  /**
   * Expands the bounding box to include the specified point.
   * If the bound is uninitialized, sets the point as the initial corner.
   * Otherwise, adjusts left/bottom/width/height to encompass the new point.
   * 
   * @param point - The point to include in the bounding box
   */
  appendPoint(point: Point): void;

  /**
   * Calculates and returns the center point of the bounding box
   * 
   * @returns The center point with x and y coordinates
   */
  getCenter(): Point;

  /**
   * Alias for getCenter(). Returns the center point of the bounding box.
   * 
   * @returns The center point with x and y coordinates
   */
  center(): Point;
}