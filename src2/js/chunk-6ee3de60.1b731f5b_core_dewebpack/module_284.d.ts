/**
 * Represents an arc entity in DXF (Drawing Exchange Format).
 * An arc is defined by a center point, radius, and start/end angles.
 */
export class Arc {
  /**
   * X-coordinate of the arc's center point
   */
  x1: number;

  /**
   * Y-coordinate of the arc's center point
   */
  y1: number;

  /**
   * Radius of the arc
   */
  r: number;

  /**
   * Starting angle of the arc in degrees
   */
  startAngle: number;

  /**
   * Ending angle of the arc in degrees
   */
  endAngle: number;

  /**
   * Layer information for the arc entity
   */
  layer: {
    /**
     * Name of the layer this arc belongs to
     */
    name: string;
  };

  /**
   * Creates a new Arc instance.
   * 
   * @param x1 - X-coordinate of the arc's center point
   * @param y1 - Y-coordinate of the arc's center point
   * @param r - Radius of the arc
   * @param startAngle - Starting angle in degrees
   * @param endAngle - Ending angle in degrees
   */
  constructor(x1: number, y1: number, r: number, startAngle: number, endAngle: number);

  /**
   * Converts the arc entity to DXF format string representation.
   * The output follows the DXF file format specification for ARC entities.
   * 
   * @returns DXF formatted string representing this arc entity
   * 
   * @example
   *