/**
 * Represents a 2D point entity for DXF file format.
 * Used to define point geometry in CAD drawings.
 */
export declare class Point {
  /**
   * The X coordinate of the point.
   */
  x: number;

  /**
   * The Y coordinate of the point.
   */
  y: number;

  /**
   * The layer this point belongs to.
   */
  layer: Layer;

  /**
   * Creates a new Point instance.
   * @param x - The X coordinate of the point
   * @param y - The Y coordinate of the point
   */
  constructor(x: number, y: number);

  /**
   * Converts the point to DXF string format.
   * Generates a DXF-compliant string representation including layer information
   * and 3D coordinates (Z defaults to 0).
   * 
   * @returns DXF formatted string representation of the point entity
   */
  toDxfString(): string;
}

/**
 * Represents a layer in a DXF drawing.
 * Layers are used to organize entities in CAD drawings.
 */
export interface Layer {
  /**
   * The name of the layer.
   */
  name: string;
}