/**
 * Represents a 3D polyline entity for DXF file format.
 * A polyline is a connected sequence of line segments defined by a series of points.
 */
export declare class Polyline {
  /**
   * Array of 3D points that define the polyline.
   * Each point is represented as a tuple of [x, y, z] coordinates.
   */
  points: [number, number, number][];

  /**
   * The layer to which this polyline belongs.
   */
  layer: {
    /**
     * Name of the layer.
     */
    name: string;
  };

  /**
   * Creates a new Polyline instance.
   * @param points - Array of 3D coordinate points defining the polyline path
   */
  constructor(points: [number, number, number][]);

  /**
   * Converts the polyline to DXF string format.
   * Generates a DXF-compliant representation including:
   * - POLYLINE header with layer information
   * - VERTEX entries for each point with x, y, z coordinates
   * - SEQEND terminator
   * 
   * @returns DXF formatted string representation of the polyline
   */
  toDxfString(): string;
}