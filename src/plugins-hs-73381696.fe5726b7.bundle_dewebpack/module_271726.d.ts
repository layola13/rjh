/**
 * Checks if a vertex can be deleted from a sketch
 * @param sketch - The sketch object containing geometry data
 * @param point - The extraordinary point (vertex) to check for deletion
 * @returns True if the vertex can be safely deleted, false otherwise
 */
export declare function couldDeleteVertex(
  sketch: SketchObject,
  point: ExtraordinaryPoint
): boolean;

/**
 * Represents a sketch object containing geometric elements
 */
interface SketchObject {
  /**
   * Gets the underlying 2D sketch data
   */
  getSketch(): Sketch2d;
}

/**
 * Represents a 2D sketch with background regions and edges
 */
interface Sketch2d {
  /**
   * Background layer containing geometric regions
   */
  background: {
    /**
     * List of geometric regions in the background
     */
    regions: Region[];
  };
}

/**
 * Represents an extraordinary point (vertex) in the sketch
 */
interface ExtraordinaryPoint {
  /**
   * Checks equality with another point
   * @param other - Point to compare with
   */
  equals(other: ExtraordinaryPoint): boolean;
}

/**
 * Represents a geometric edge in the sketch
 */
interface Edge {
  /**
   * Indicates if this edge is part of the background
   */
  isBackground: boolean;
  
  /**
   * Gets the starting point of the edge
   */
  getStartPt(): ExtraordinaryPoint;
  
  /**
   * Checks if a point lies on this edge
   * @param point - Point to check
   */
  containsPoint(point: ExtraordinaryPoint): boolean;
}

/**
 * Represents a 2D line segment
 */
declare class Line2d implements Edge {
  isBackground: boolean;
  getStartPt(): ExtraordinaryPoint;
  containsPoint(point: ExtraordinaryPoint): boolean;
}

/**
 * Represents a closed geometric region
 */
interface Region {
  /**
   * Outer boundary edges forming the region
   */
  outer: Edge[];
}