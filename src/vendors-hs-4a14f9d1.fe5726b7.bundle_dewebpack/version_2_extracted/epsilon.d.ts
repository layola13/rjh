/**
 * Geometric computation module providing 2D orientation tests and spatial analysis utilities.
 * @module Geometry2D
 */

/**
 * Numerical tolerance threshold for floating-point comparisons.
 * Used to handle precision errors in geometric calculations.
 */
export declare const EPSILON: number;

/**
 * Enumeration representing the orientation of three points in 2D space.
 */
export declare enum Orientation {
  /** Clockwise orientation */
  CW = 1,
  /** Counter-clockwise orientation */
  CCW = -1,
  /** Collinear (points lie on the same line) */
  COLLINEAR = 0
}

/**
 * 2D point representation.
 */
export interface Point2D {
  /** X-coordinate */
  x: number;
  /** Y-coordinate */
  y: number;
}

/**
 * Determines the orientation of three points in 2D space using the cross product method.
 * 
 * @param pointA - First point
 * @param pointB - Second point
 * @param pointC - Third point (pivot)
 * @returns The orientation: CW (clockwise), CCW (counter-clockwise), or COLLINEAR
 * 
 * @remarks
 * Computes the signed area of the triangle formed by the three points.
 * Uses EPSILON threshold to handle floating-point precision issues.
 */
export declare function orient2d(
  pointA: Point2D,
  pointB: Point2D,
  pointC: Point2D
): Orientation;

/**
 * Tests if a point lies within the scan area defined by three other points.
 * 
 * @param pointA - First boundary point
 * @param pointB - Second boundary point (pivot)
 * @param pointC - Third boundary point
 * @param testPoint - Point to test
 * @returns `true` if the test point is inside the scan area, `false` otherwise
 * 
 * @remarks
 * Used in sweep-line algorithms and spatial partitioning.
 * Performs two cross-product tests with EPSILON tolerance.
 */
export declare function inScanArea(
  pointA: Point2D,
  pointB: Point2D,
  pointC: Point2D,
  testPoint: Point2D
): boolean;

/**
 * Determines if the angle formed by three points is obtuse (greater than 90 degrees).
 * 
 * @param vertexPoint - The vertex point where the angle is measured
 * @param pointB - Second point forming the angle
 * @param pointC - Third point forming the angle
 * @returns `true` if the angle at vertexPoint is obtuse, `false` otherwise
 * 
 * @remarks
 * Uses dot product test: if dot product < 0, the angle is obtuse.
 */
export declare function isAngleObtuse(
  vertexPoint: Point2D,
  pointB: Point2D,
  pointC: Point2D
): boolean;