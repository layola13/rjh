/**
 * Numerical epsilon threshold for floating-point comparisons.
 * Used to handle precision errors in geometric calculations.
 */
export const EPSILON: number;

/**
 * Enumeration representing the orientation of three points in 2D space.
 */
export enum Orientation {
  /** Clockwise orientation */
  CW = 1,
  /** Counter-clockwise orientation */
  CCW = -1,
  /** Collinear (points lie on the same line) */
  COLLINEAR = 0
}

/**
 * Represents a point in 2D Cartesian coordinate system.
 */
export interface Point2D {
  /** X-coordinate */
  x: number;
  /** Y-coordinate */
  y: number;
}

/**
 * Determines the orientation of three points in 2D space.
 * 
 * @param pointA - First point
 * @param pointB - Second point
 * @param pointC - Third point (reference point)
 * @returns The orientation: CW (clockwise), CCW (counter-clockwise), or COLLINEAR
 * 
 * @remarks
 * Uses the cross product to determine orientation.
 * EPSILON threshold handles floating-point precision errors.
 */
export function orient2d(
  pointA: Point2D,
  pointB: Point2D,
  pointC: Point2D
): Orientation;

/**
 * Checks if a point lies within the scan area defined by three other points.
 * 
 * @param pointA - First boundary point
 * @param pointB - Second boundary point (pivot)
 * @param pointC - Third boundary point
 * @param testPoint - Point to test
 * @returns `true` if the test point is within the scan area, `false` otherwise
 * 
 * @remarks
 * Commonly used in sweep-line algorithms and triangulation.
 */
export function inScanArea(
  pointA: Point2D,
  pointB: Point2D,
  pointC: Point2D,
  testPoint: Point2D
): boolean;

/**
 * Determines if the angle formed by three points is obtuse (greater than 90 degrees).
 * 
 * @param vertexA - First point (angle vertex)
 * @param vertexB - Second point (forms one ray from vertex)
 * @param vertexC - Third point (forms another ray from vertex)
 * @returns `true` if the angle at vertexA is obtuse, `false` otherwise
 * 
 * @remarks
 * Uses dot product of vectors. Negative dot product indicates obtuse angle.
 */
export function isAngleObtuse(
  vertexA: Point2D,
  vertexB: Point2D,
  vertexC: Point2D
): boolean;