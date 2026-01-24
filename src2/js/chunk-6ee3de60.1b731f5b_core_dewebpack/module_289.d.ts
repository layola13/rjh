/**
 * Represents a 3D face entity in DXF (Drawing Exchange Format).
 * A 3D face is a quadrilateral surface defined by four vertices in 3D space.
 */
export default class Face3D {
  /** X coordinate of the first vertex */
  x1: number;
  
  /** Y coordinate of the first vertex */
  y1: number;
  
  /** Z coordinate of the first vertex */
  z1: number;
  
  /** X coordinate of the second vertex */
  x2: number;
  
  /** Y coordinate of the second vertex */
  y2: number;
  
  /** Z coordinate of the second vertex */
  z2: number;
  
  /** X coordinate of the third vertex */
  x3: number;
  
  /** Y coordinate of the third vertex */
  y3: number;
  
  /** Z coordinate of the third vertex */
  z3: number;
  
  /** X coordinate of the fourth vertex */
  x4: number;
  
  /** Y coordinate of the fourth vertex */
  y4: number;
  
  /** Z coordinate of the fourth vertex */
  z4: number;
  
  /** DXF layer information containing the layer name and properties */
  layer: { name: string };

  /**
   * Creates a new 3D face with four vertices.
   * 
   * @param x1 - X coordinate of vertex 1
   * @param y1 - Y coordinate of vertex 1
   * @param z1 - Z coordinate of vertex 1
   * @param x2 - X coordinate of vertex 2
   * @param y2 - Y coordinate of vertex 2
   * @param z2 - Z coordinate of vertex 2
   * @param x3 - X coordinate of vertex 3
   * @param y3 - Y coordinate of vertex 3
   * @param z3 - Z coordinate of vertex 3
   * @param x4 - X coordinate of vertex 4
   * @param y4 - Y coordinate of vertex 4
   * @param z4 - Z coordinate of vertex 4
   */
  constructor(
    x1: number,
    y1: number,
    z1: number,
    x2: number,
    y2: number,
    z2: number,
    x3: number,
    y3: number,
    z3: number,
    x4: number,
    y4: number,
    z4: number
  );

  /**
   * Converts the 3D face to DXF format string representation.
   * The output follows the DXF file format specification for 3DFACE entities.
   * 
   * @returns A DXF-formatted string representing this 3D face entity
   */
  toDxfString(): string;
}