/**
 * Polygon utility class for geometric operations on 2D polygons
 * @module PolygonUtil
 */

/**
 * Represents a polygon segment with its offset delta
 */
interface PolygonSegment {
  /** The polygon points defining this segment */
  polygon: THREE.Vector2[];
  /** The offset delta applied to this segment */
  delta: number;
}

/**
 * Result of finding the closest point on a polygon to a given point
 */
interface PointIndexPosition {
  /** The fractional index position along the polygon (e.g., 2.5 means halfway between vertices 2 and 3) */
  indexPos: number;
  /** The closest point on the polygon to the query point */
  closetPoint: THREE.Vector2;
  /** The distance from the query point to the closest point */
  distance: number;
}

/**
 * A 2D point structure
 */
interface Point2D {
  x: number;
  y: number;
}

/**
 * Utility class for polygon operations including offsetting and point queries
 */
export class PolygonUtil {
  /**
   * Apply offset to a polygon with specified weights per vertex
   * @param polygon - The polygon vertices to offset (modified in-place)
   * @param weights - Offset weight for each vertex, or a single weight for all vertices
   * @param segments - Optional array to collect offset segment information
   */
  static indexOffset(
    polygon: THREE.Vector2[],
    weights: number | number[],
    segments?: PolygonSegment[]
  ): void;

  /**
   * Find the closest point on a polygon to a given point
   * @param point - The query point
   * @param polygon - The polygon to search
   * @returns Position information including fractional index, closest point, and distance, or null if polygon is invalid
   */
  static getPointIndexPosOnPolygon(
    point: THREE.Vector2,
    polygon: THREE.Vector2[]
  ): PointIndexPosition | null;

  /**
   * Extract a sub-path between two points along a polygon
   * @param startPoint - The starting point
   * @param endPoint - The ending point
   * @param polygon - The polygon to extract from
   * @returns Array of points forming the sub-path, or null if extraction fails
   */
  static getSubPathBetweenPoints(
    startPoint: THREE.Vector2,
    endPoint: THREE.Vector2,
    polygon: THREE.Vector2[]
  ): Point2D[] | null;
}

/**
 * Represents a 2D line in implicit form: Ax + By + C = 0
 * The coefficients are normalized so that A² + B² = 1
 */
declare class Line2D {
  /** Coefficient A in the line equation */
  A: number;
  /** Coefficient B in the line equation */
  B: number;
  /** Coefficient C in the line equation */
  C: number;

  /**
   * Create a line passing through two points
   * @param point1 - First point on the line
   * @param point2 - Second point on the line
   */
  constructor(point1: THREE.Vector2, point2: THREE.Vector2);

  /**
   * Redefine the line to pass through two new points
   * @param point1 - First point on the line
   * @param point2 - Second point on the line
   */
  remake(point1: THREE.Vector2, point2: THREE.Vector2): void;

  /**
   * Find the intersection point of this line with another line
   * @param other - The other line to intersect with
   * @returns The intersection point
   */
  cross(other: Line2D): THREE.Vector2;

  /**
   * Find the intersection of this line with a line segment
   * @param segmentStart - Start point of the line segment
   * @param segmentEnd - End point of the line segment
   * @returns The intersection point
   */
  crossLineSeg(segmentStart: THREE.Vector2, segmentEnd: THREE.Vector2): THREE.Vector2;

  /**
   * Offset the line by a perpendicular distance
   * @param distance - The distance to offset (positive or negative)
   */
  offset(distance: number): void;

  /**
   * Check if this line is parallel to another line
   * @param other - The other line to check
   * @returns True if the lines are parallel
   */
  parallel(other: Line2D): boolean;

  /**
   * Calculate the signed distance from a point to this line
   * @param point - The point to measure distance from
   * @returns The signed distance (Ax + By + C)
   */
  calc(point: THREE.Vector2): number;
}

/**
 * Calculate the angle between two line segments sharing a common point
 * @param point1 - First endpoint
 * @param sharedPoint - The shared vertex
 * @param point2 - Second starting point
 * @param point3 - Second endpoint
 * @returns The angle in radians between the two segments
 */
declare function calculateAngleBetweenSegments(
  point1: THREE.Vector2,
  sharedPoint: THREE.Vector2,
  point2: THREE.Vector2,
  point3: THREE.Vector2
): number;

/**
 * Calculate the offset vector at a vertex given neighboring edges
 * @param prevPoint - The previous vertex
 * @param currentPoint - The current vertex (where offset is calculated)
 * @param nextPoint - The next vertex
 * @param prevWeight - Offset weight for the edge to previous vertex
 * @param nextWeight - Offset weight for the edge to next vertex
 * @returns The offset vector to apply at the current vertex
 */
declare function calculateVertexOffset(
  prevPoint: THREE.Vector2,
  currentPoint: THREE.Vector2,
  nextPoint: THREE.Vector2,
  prevWeight: number,
  nextWeight: number
): THREE.Vector2;

/**
 * Apply offset to polygon edges and return the maximum safe offset distance
 * @param polygon - The polygon vertices (modified in-place)
 * @param weights - Offset weights per vertex
 * @param maxOffset - Maximum allowed offset distance
 * @param isClosed - Whether the polygon is closed (first and last vertices are connected)
 * @param isPositive - Whether the offset is outward (true) or inward (false)
 * @returns The actual offset distance applied
 */
declare function applyPolygonOffset(
  polygon: THREE.Vector2[],
  weights: number[],
  maxOffset: number,
  isClosed: boolean,
  isPositive: boolean
): number;

/**
 * Check if two points are approximately equal within a tolerance
 * @param point1 - First point
 * @param point2 - Second point
 * @param epsilon - Tolerance for comparison (default: 1e-6)
 * @returns True if points are within epsilon distance of each other
 */
declare function arePointsEqual(
  point1: THREE.Vector2,
  point2: THREE.Vector2,
  epsilon?: number
): boolean;

/**
 * Calculate a safe scaling factor to avoid self-intersection
 * @param numerator - Numerator value
 * @param denominator - Denominator value
 * @param epsilon - Tolerance for zero comparison (default: 1e-6)
 * @returns The safe scaling factor
 */
declare function calculateSafeScaleFactor(
  numerator: number,
  denominator: number,
  epsilon?: number
): number;

/**
 * Calculate intersection parameter for two offset edges
 * @param offset1Start - Start of first offset vector
 * @param offset1End - End of first offset vector
 * @param offset2Start - Start of second offset vector
 * @param offset2End - End of second offset vector
 * @param epsilon - Tolerance for comparison (default: 1e-6)
 * @returns The parameter t for intersection, or Infinity if no valid intersection
 */
declare function calculateEdgeIntersectionParameter(
  offset1Start: THREE.Vector2,
  offset1End: THREE.Vector2,
  offset2Start: THREE.Vector2,
  offset2End: THREE.Vector2,
  epsilon?: number
): number;