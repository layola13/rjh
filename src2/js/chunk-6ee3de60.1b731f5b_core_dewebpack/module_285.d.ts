/**
 * Represents a circle entity for DXF (Drawing Exchange Format) file generation.
 * This class encapsulates the geometric properties of a circle and provides
 * methods to convert it to DXF string format.
 */
export declare class Circle {
  /**
   * The x-coordinate of the circle's center point.
   */
  x1: number;

  /**
   * The y-coordinate of the circle's center point.
   */
  y1: number;

  /**
   * The radius of the circle.
   */
  r: number;

  /**
   * The layer to which this circle belongs.
   * Contains layer-specific properties like name.
   */
  layer: Layer;

  /**
   * Creates a new Circle instance.
   * 
   * @param x1 - The x-coordinate of the circle's center
   * @param y1 - The y-coordinate of the circle's center
   * @param r - The radius of the circle
   */
  constructor(x1: number, y1: number, r: number);

  /**
   * Converts the circle to a DXF-formatted string representation.
   * 
   * The generated string follows the DXF format specification for CIRCLE entities,
   * including group codes for layer (8), center point coordinates (10, 20, 30),
   * and radius (40).
   * 
   * @returns A DXF-formatted string representing this circle entity
   */
  toDxfString(): string;
}

/**
 * Represents a layer in a DXF drawing.
 * Layers are used to organize and group drawing entities.
 */
export interface Layer {
  /**
   * The name of the layer.
   */
  name: string;
}