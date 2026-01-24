/**
 * Represents a LINE entity in DXF (Drawing Exchange Format).
 * A line is defined by two points in 2D space: (x1, y1) and (x2, y2).
 */
export declare class Line {
  /**
   * X-coordinate of the start point
   */
  x1: number;

  /**
   * Y-coordinate of the start point
   */
  y1: number;

  /**
   * X-coordinate of the end point
   */
  x2: number;

  /**
   * Y-coordinate of the end point
   */
  y2: number;

  /**
   * The layer this line belongs to
   */
  layer: Layer;

  /**
   * Creates a new Line instance.
   * 
   * @param x1 - X-coordinate of the start point
   * @param y1 - Y-coordinate of the start point
   * @param x2 - X-coordinate of the end point
   * @param y2 - Y-coordinate of the end point
   */
  constructor(x1: number, y1: number, x2: number, y2: number);

  /**
   * Converts the line entity to DXF string format.
   * 
   * @returns DXF-formatted string representation of the line
   */
  toDxfString(): string;
}

/**
 * Represents a layer in a DXF drawing.
 */
export interface Layer {
  /**
   * The name of the layer
   */
  name: string;
}